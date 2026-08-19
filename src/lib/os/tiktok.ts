import { protokolliere, speichereReel, speichereTagesstand } from "./db";

/**
 * TikTok-Anbindung über die Display API v2.
 *
 * Env auf Vercel:
 *   TIKTOK_CLIENT_KEY     — aus dem TikTok-Developer-Portal
 *   TIKTOK_CLIENT_SECRET
 *   TIKTOK_REFRESH_TOKEN  — einmalig per OAuth geholt, danach selbsterneuernd
 *
 * Das Zugriffstoken lebt 24 Stunden und wird bei jedem Lauf frisch aus dem
 * Refresh-Token geholt — deshalb muss nur der Refresh-Token in der Env
 * stehen, und der hält ein Jahr.
 *
 * Wichtig: Die Display API liefert Aufrufe, Likes, Kommentare, Shares und
 * die Videolänge — aber keine Watchtime. Die Sehdauer kommt bei TikTok
 * nur über die Business API (eigener Antrag). Watchtime-Entscheidungen
 * fällt das OS deshalb auf Basis der Instagram-Zahlen.
 */

const AUTH = "https://open.tiktokapis.com/v2/oauth/token/";
const VIDEOS = "https://open.tiktokapis.com/v2/video/list/";
const USER = "https://open.tiktokapis.com/v2/user/info/";

export function tiktokKonfiguriert(): boolean {
  return Boolean(
    process.env.TIKTOK_CLIENT_KEY &&
      process.env.TIKTOK_CLIENT_SECRET &&
      process.env.TIKTOK_REFRESH_TOKEN,
  );
}

/** Frisches Zugriffstoken aus dem Refresh-Token. */
async function zugriffstoken(): Promise<string> {
  const res = await fetch(AUTH, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_key: process.env.TIKTOK_CLIENT_KEY as string,
      client_secret: process.env.TIKTOK_CLIENT_SECRET as string,
      grant_type: "refresh_token",
      refresh_token: process.env.TIKTOK_REFRESH_TOKEN as string,
    }),
    cache: "no-store",
  });
  const daten = (await res.json()) as {
    access_token?: string;
    error?: string;
    error_description?: string;
  };
  if (!res.ok || !daten.access_token) {
    throw new Error(daten.error_description || daten.error || `OAuth ${res.status}`);
  }
  return daten.access_token;
}

type Video = {
  id: string;
  title?: string;
  video_description?: string;
  duration?: number;
  create_time?: number;
  share_url?: string;
  view_count?: number;
  like_count?: number;
  comment_count?: number;
  share_count?: number;
};

export async function tiktokSync(limit = 20): Promise<{
  ok: boolean;
  anzahl: number;
  detail: string;
}> {
  if (!tiktokKonfiguriert()) {
    return { ok: false, anzahl: 0, detail: "TikTok-Zugangsdaten fehlen" };
  }

  try {
    const token = await zugriffstoken();
    const kopf = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    /* Followerstand. */
    const profil = await fetch(`${USER}?fields=follower_count`, {
      headers: kopf,
      cache: "no-store",
    });
    const profilDaten = (await profil.json()) as {
      data?: { user?: { follower_count?: number } };
    };
    const follower = profilDaten.data?.user?.follower_count ?? 0;
    await speichereTagesstand({
      datum: new Date().toISOString().slice(0, 10),
      plattform: "tiktok",
      follower,
    });

    /* Videoliste samt Kennzahlen. */
    const felder = [
      "id",
      "title",
      "video_description",
      "duration",
      "create_time",
      "share_url",
      "view_count",
      "like_count",
      "comment_count",
      "share_count",
    ].join(",");

    const res = await fetch(`${VIDEOS}?fields=${felder}`, {
      method: "POST",
      headers: kopf,
      body: JSON.stringify({ max_count: limit }),
      cache: "no-store",
    });
    const daten = (await res.json()) as {
      data?: { videos?: Video[] };
      error?: { message?: string; code?: string };
    };
    if (!res.ok || (daten.error?.code && daten.error.code !== "ok")) {
      throw new Error(daten.error?.message || `Video-Liste ${res.status}`);
    }

    const videos = daten.data?.videos ?? [];
    let gespeichert = 0;
    for (const v of videos) {
      const ok = await speichereReel({
        plattform: "tiktok",
        extern_id: v.id,
        veroeffentlicht_am: new Date((v.create_time ?? 0) * 1000).toISOString(),
        titel: (v.title || v.video_description || "").slice(0, 120) || null,
        permalink: v.share_url ?? null,
        laenge_sek: v.duration ?? null,
        views: v.view_count ?? 0,
        reichweite: v.view_count ?? 0,
        saves: 0,
        shares: v.share_count ?? 0,
        kommentare: v.comment_count ?? 0,
        likes: v.like_count ?? 0,
      });
      if (ok) gespeichert++;
    }

    const detail = `${gespeichert} Videos, ${follower} Follower`;
    await protokolliere("tiktok", true, gespeichert, detail);
    return { ok: true, anzahl: gespeichert, detail };
  } catch (e) {
    const detail = e instanceof Error ? e.message : "Unbekannter Fehler";
    await protokolliere("tiktok", false, 0, detail);
    return { ok: false, anzahl: 0, detail };
  }
}
