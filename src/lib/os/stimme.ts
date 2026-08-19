import { aendereSkript, protokolliere } from "./db";

/**
 * ElevenLabs-Pipeline: Skript-Body wird mit Alex' geklonter Stimme
 * vertont, die MP3 landet in Supabase Storage (Bucket "os-audio"),
 * die URL am Skript. Damit ist Faceless-Content einen Klick entfernt.
 *
 * Env:
 *   ELEVENLABS_API_KEY
 *   ELEVENLABS_VOICE_ID   — die geklonte Stimme
 *   ELEVENLABS_MODEL      — optional, Default eleven_multilingual_v2
 *   SUPABASE_SERVICE_KEY  — optional; ohne ihn kommt das Audio als Datei
 *                           zurück statt gespeichert zu werden
 */

const API = "https://api.elevenlabs.io/v1";
const BUCKET = "os-audio";

export function stimmeKonfiguriert(): boolean {
  return Boolean(process.env.ELEVENLABS_API_KEY && process.env.ELEVENLABS_VOICE_ID);
}

/**
 * Bereitet gesprochenen Text auf: Zahlen und Abkürzungen, über die eine
 * synthetische Stimme stolpert, werden ausgeschrieben. Regie-Anweisungen
 * in Klammern fliegen raus.
 */
export function fuerStimme(text: string): string {
  return text
    .replace(/\([^)]*\)/g, "")
    .replace(/\b(\d{1,3})\.(\d{3})\b/g, "$1$2")
    .replace(/(\d+)\s*€/g, "$1 Euro")
    .replace(/(\d+)\s*%/g, "$1 Prozent")
    .replace(/\bz\.\s?B\./gi, "zum Beispiel")
    .replace(/\bca\./gi, "circa")
    .replace(/\bu\.\s?a\./gi, "unter anderem")
    .replace(/[ \t]+/g, " ")
    .trim();
}

async function nachStorage(
  audio: ArrayBuffer,
  name: string,
): Promise<string | null> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return null;
  try {
    const res = await fetch(`${url}/storage/v1/object/${BUCKET}/${name}`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "audio/mpeg",
        "x-upsert": "true",
      },
      body: audio,
    });
    if (!res.ok) {
      console.error("[os/stimme] Upload fehlgeschlagen:", await res.text());
      return null;
    }
    return `${url}/storage/v1/object/public/${BUCKET}/${name}`;
  } catch (e) {
    console.error("[os/stimme] Upload-Exception:", e);
    return null;
  }
}

export async function vertone(opts: {
  skriptId: string;
  text: string;
}): Promise<{ ok: boolean; url: string | null; audio: ArrayBuffer | null; detail: string }> {
  if (!stimmeKonfiguriert()) {
    return { ok: false, url: null, audio: null, detail: "ElevenLabs-Zugangsdaten fehlen" };
  }

  try {
    const res = await fetch(
      `${API}/text-to-speech/${process.env.ELEVENLABS_VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY as string,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text: fuerStimme(opts.text),
          model_id: process.env.ELEVENLABS_MODEL || "eleven_multilingual_v2",
          /* Etwas Varianz statt Nachrichtensprecher — der Ton soll nach
             Sprachmemo klingen, nicht nach Werbespot. */
          voice_settings: {
            stability: 0.42,
            similarity_boost: 0.85,
            style: 0.35,
            use_speaker_boost: true,
          },
        }),
      },
    );

    if (!res.ok) {
      throw new Error(`ElevenLabs ${res.status}: ${(await res.text()).slice(0, 200)}`);
    }

    const audio = await res.arrayBuffer();
    const url = await nachStorage(audio, `${opts.skriptId}.mp3`);
    if (url) await aendereSkript(opts.skriptId, { audio_url: url });

    const detail = url ? "vertont und gespeichert" : "vertont, Storage nicht konfiguriert";
    await protokolliere("elevenlabs", true, 1, detail);
    return { ok: true, url, audio, detail };
  } catch (e) {
    const detail = e instanceof Error ? e.message : "Unbekannter Fehler";
    await protokolliere("elevenlabs", false, 0, detail);
    return { ok: false, url: null, audio: null, detail };
  }
}
