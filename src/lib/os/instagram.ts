import { protokolliere, speichereReel, speichereTagesstand } from "./db";

/**
 * Instagram-Anbindung über die Graph API (Business-/Creator-Konto).
 *
 * Env auf Vercel:
 *   IG_USER_ID        — ID des Instagram-Business-Kontos (nicht der Username)
 *   IG_ACCESS_TOKEN    — langlebiges Token (60 Tage)
 *   META_APP_ID        — optional, nur für die Token-Verlängerung
 *   META_APP_SECRET    — optional, nur für die Token-Verlängerung
 *
 * Der Lauf holt die letzten Reels, ihre Insights und den Kontostand des
 * Tages. Nicht verfügbare Kennzahlen (Meta ändert die Metrik-Namen
 * regelmäßig) werden übersprungen statt den ganzen Lauf zu kippen.
 *
 * Watchtime in Prozent braucht die Videolänge. Die Graph API liefert sie
 * für Reels nicht mit, deshalb rechnet erst die Zuordnung im OS sie aus:
 * Länge kommt aus dem verknüpften Skript (os_reel_zuordnen). Bis dahin
 * steht die durchschnittliche Sehdauer in Sekunden.
 */

const API = "https://graph.facebook.com/v21.0";

/* Reels-Insights, Stand 2026-08. Nicht jede Metrik existiert für jedes
   Konto — der Abruf fällt einzeln zurück, statt komplett zu scheitern. */
const REEL_METRIKEN = [
  "views",
  "reach",
  "saved",
  "shares",
  "comments",
  "likes",
  "ig_reels_avg_watch_time",
];

type GraphFehler = { error?: { message?: string; code?: number } };

async function graph<T>(pfad: string, params: Record<string, string>): Promise<T> {
  const url = new URL(`${API}/${pfad}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url, { cache: "no-store" });
  const daten = (await res.json()) as T & GraphFehler;
  if (!res.ok || daten.error) {
    throw new Error(daten.error?.message || `Graph API ${res.status}`);
  }
  return daten;
}

type Medium = {
  id: string;
  caption?: string;
  media_product_type?: string;
  permalink?: string;
  timestamp: string;
};

type InsightWert = { name: string; values: { value: number }[] };

/** Insights eines Mediums als flache Map; fehlende Metriken fehlen einfach. */
async function insights(mediumId: string): Promise<Record<string, number>> {
  try {
    const res = await graph<{ data: InsightWert[] }>(`${mediumId}/insights`, {
      metric: REEL_METRIKEN.join(","),
      access_token: token(),
    });
    return Object.fromEntries(
      res.data.map((m) => [m.name, m.values[0]?.value ?? 0]),
    );
  } catch {
    /* Zweiter Versuch mit dem kleinsten gemeinsamen Nenner — ein einzelner
       nicht unterstützter Metrikname lässt sonst den ganzen Abruf scheitern. */
    try {
      const res = await graph<{ data: InsightWert[] }>(`${mediumId}/insights`, {
        metric: "views,reach,saved,shares,comments,likes",
        access_token: token(),
      });
      return Object.fromEntries(
        res.data.map((m) => [m.name, m.values[0]?.value ?? 0]),
      );
    } catch {
      return {};
    }
  }
}

function token(): string {
  const t = process.env.IG_ACCESS_TOKEN;
  if (!t) throw new Error("IG_ACCESS_TOKEN fehlt");
  return t;
}

export function instagramKonfiguriert(): boolean {
  return Boolean(process.env.IG_USER_ID && process.env.IG_ACCESS_TOKEN);
}

/**
 * Verlängert das langlebige Token. Meta gibt 60 Tage; wer alle 30 Tage
 * verlängert, läuft nie ab. Das neue Token muss in die Vercel-Env — die
 * Funktion meldet es zurück, sie kann es nicht selbst setzen.
 */
export async function tokenVerlaengern(): Promise<string | null> {
  const id = process.env.META_APP_ID;
  const secret = process.env.META_APP_SECRET;
  if (!id || !secret) return null;
  try {
    const res = await graph<{ access_token: string; expires_in: number }>(
      "oauth/access_token",
      {
        grant_type: "fb_exchange_token",
        client_id: id,
        client_secret: secret,
        fb_exchange_token: token(),
      },
    );
    return res.access_token;
  } catch (e) {
    console.error("[os/instagram] Token-Verlängerung fehlgeschlagen:", e);
    return null;
  }
}

/** Ein Durchlauf: Reels der letzten Wochen + Kontostand von heute. */
export async function instagramSync(limit = 25): Promise<{
  ok: boolean;
  anzahl: number;
  detail: string;
}> {
  if (!instagramKonfiguriert()) {
    return { ok: false, anzahl: 0, detail: "IG_USER_ID oder IG_ACCESS_TOKEN fehlt" };
  }
  const userId = process.env.IG_USER_ID as string;

  try {
    /* 1. Kontostand: Follower heute. */
    const konto = await graph<{ followers_count?: number }>(userId, {
      fields: "followers_count",
      access_token: token(),
    });

    /* 2. Profilaufrufe des Tages — auf Reel-Ebene gibt die API sie nicht her. */
    let profilbesuche = 0;
    try {
      const ins = await graph<{ data: InsightWert[] }>(`${userId}/insights`, {
        metric: "profile_views",
        period: "day",
        metric_type: "total_value",
        access_token: token(),
      });
      profilbesuche = ins.data[0]?.values?.[0]?.value ?? 0;
    } catch {
      /* Für sehr junge Konten liefert Meta hier nichts — kein Grund abzubrechen. */
    }

    await speichereTagesstand({
      datum: new Date().toISOString().slice(0, 10),
      plattform: "instagram",
      follower: konto.followers_count ?? 0,
      profilbesuche,
    });

    /* 3. Reels samt Kennzahlen. */
    const medien = await graph<{ data: Medium[] }>(`${userId}/media`, {
      fields: "id,caption,media_product_type,permalink,timestamp",
      limit: String(limit),
      access_token: token(),
    });

    const reels = medien.data.filter((m) => m.media_product_type === "REELS");
    let gespeichert = 0;

    for (const reel of reels) {
      const w = await insights(reel.id);
      const avgMs = w["ig_reels_avg_watch_time"];
      const ok = await speichereReel({
        plattform: "instagram",
        extern_id: reel.id,
        veroeffentlicht_am: reel.timestamp,
        titel: reel.caption?.split("\n")[0]?.slice(0, 120) ?? null,
        permalink: reel.permalink ?? null,
        views: w["views"] ?? 0,
        reichweite: w["reach"] ?? 0,
        /* Meta liefert die Sehdauer in Millisekunden. */
        avg_watchtime_sek: avgMs ? Math.round((avgMs / 1000) * 10) / 10 : null,
        saves: w["saved"] ?? 0,
        shares: w["shares"] ?? 0,
        kommentare: w["comments"] ?? 0,
        likes: w["likes"] ?? 0,
      });
      if (ok) gespeichert++;
    }

    const detail = `${gespeichert} Reels, ${konto.followers_count ?? 0} Follower`;
    await protokolliere("instagram", true, gespeichert, detail);
    return { ok: true, anzahl: gespeichert, detail };
  } catch (e) {
    const detail = e instanceof Error ? e.message : "Unbekannter Fehler";
    await protokolliere("instagram", false, 0, detail);
    return { ok: false, anzahl: 0, detail };
  }
}
