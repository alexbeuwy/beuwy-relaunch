import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { crmKonfiguriert, trackAuswertung, trackHeatmap } from "@/lib/crm/db";
import { getContent } from "@/lib/content";
import { INTERN_EINBLICK_DEFAULTS } from "@/lib/texte/intern-einblick";
import { SektionsKopf, GelbeKarte } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { Heatmap } from "./Heatmap";

/**
 * /intern/einblick — Erstanbieter-Analytics (R5 Leaf G5, „Einblick").
 * Server-Komponente: lädt Zeitraum-Auswertung + Heatmap-Punkte über die
 * einzig erlaubte Datenschicht (src/lib/crm/db.ts::trackAuswertung /
 * trackHeatmap) und rendert komplett serverseitig — Zeitraum-Wahl,
 * Pfad-Auswahl und Geräte-Umschalter laufen über Query-Parameter
 * (<Link href="?...">), kein Client-State nötig außer im Canvas selbst
 * (Heatmap.tsx).
 *
 * RPC-Verträge (per Supabase-Introspektion geprüft, siehe Kommentar-Kopf
 * von src/lib/track-client.ts):
 *   trackAuswertung(von, bis) → { seiten:[{pfad,views,besuche}],
 *     events:[{event,n}], geraete:[{geraet,besuche}] }
 *   trackHeatmap(pfad, geraet|null, von) → [{x,y,n}] (0..200-Raster)
 * Beide fail-open (src/lib/crm/db.ts) — ohne Migration/Env liefert die
 * RPC einfach leer, jedes Panel zeigt dann ehrlich seinen Leerzustand
 * statt zu raten (Demo-Hinweis erscheint separat, nur bei
 * crmKonfiguriert()===false).
 *
 * KENNZAHLEN-HERLEITUNG (bewusst aus den UNGEKAPPTEN Teilen der Antwort,
 * nicht aus der auf 50 Pfade gedeckelten `seiten`-Liste):
 *   Seitenaufrufe = events["pageview"].n · Klicks = events["klick"].n ·
 *   Besuche = Summe aller geraete[].besuche (jede pageload_id trägt
 *   genau EIN geraet, die Summe ist also eine exakte Gesamtzahl, kein
 *   Top-50-Ausschnitt).
 */

export const metadata: Metadata = {
  title: "Einblick — beuwy",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/* ── Feste Vokabular-Zuordnung — Struktur, kein Fließtext (Konvention
   aus src/app/intern/page.tsx::QUELLE_LABEL), daher NICHT im Studio. ── */
const EVENT_LABEL: Record<string, string> = {
  pageview: "Seitenaufruf",
  klick: "Klick",
  scroll_tiefe: "Scroll-Marke erreicht",
};
const GERAET_LABEL: Record<string, string> = {
  desktop: "Desktop",
  mobil: "Mobil",
  unbekannt: "Unbekannt",
};

const ZAHL = new Intl.NumberFormat("de-DE");
const ZAHL_1 = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/* ── Typen + defensives Parsing der jsonb-Antwort ──────────────────── */

type SeiteZeile = { pfad: string; views: number; besuche: number };
type EventZeile = { event: string; n: number };
type GeraetZeile = { geraet: string; besuche: number };
type Auswertung = { seiten: SeiteZeile[]; events: EventZeile[]; geraete: GeraetZeile[] };
type HeatmapPunkt = { x: number; y: number; n: number };

function zahl(v: unknown): number {
  return typeof v === "number" && Number.isFinite(v) ? v : Number(v) || 0;
}

function zuAuswertung(raw: Record<string, unknown> | null): Auswertung {
  const roh = raw ?? {};
  const seitenRoh = Array.isArray(roh.seiten) ? roh.seiten : [];
  const eventsRoh = Array.isArray(roh.events) ? roh.events : [];
  const geraeteRoh = Array.isArray(roh.geraete) ? roh.geraete : [];
  return {
    seiten: seitenRoh.map((e) => {
      const o = e && typeof e === "object" ? (e as Record<string, unknown>) : {};
      return {
        pfad: typeof o.pfad === "string" && o.pfad ? o.pfad : "/",
        views: zahl(o.views),
        besuche: zahl(o.besuche),
      };
    }),
    events: eventsRoh.map((e) => {
      const o = e && typeof e === "object" ? (e as Record<string, unknown>) : {};
      return { event: typeof o.event === "string" ? o.event : "", n: zahl(o.n) };
    }),
    geraete: geraeteRoh.map((e) => {
      const o = e && typeof e === "object" ? (e as Record<string, unknown>) : {};
      return {
        geraet: typeof o.geraet === "string" && o.geraet ? o.geraet : "unbekannt",
        besuche: zahl(o.besuche),
      };
    }),
  };
}

function zeitraumVon(zeitraum: string, jetzt: Date): Date {
  if (zeitraum === "heute") {
    const start = new Date(jetzt);
    start.setHours(0, 0, 0, 0);
    return start;
  }
  const tage = zeitraum === "30" ? 30 : 7;
  return new Date(jetzt.getTime() - tage * 86_400_000);
}

/* ── Demo-Daten (crmKonfiguriert()===false) — dasselbe Antwortformat wie
   die echten RPCs, damit die Seite ihr volles Bild zeigt. ────────────── */

const DEMO_AUSWERTUNG: Auswertung = {
  seiten: [
    { pfad: "/", views: 842, besuche: 610 },
    { pfad: "/makler-crm-einfuehren", views: 410, besuche: 322 },
    { pfad: "/leistungen", views: 268, besuche: 201 },
    { pfad: "/kontakt", views: 190, besuche: 168 },
    { pfad: "/wissen/immobilie-bewerten", views: 144, besuche: 121 },
  ],
  events: [
    { event: "pageview", n: 1854 },
    { event: "klick", n: 3220 },
    { event: "scroll_tiefe", n: 2110 },
  ],
  geraete: [
    { geraet: "desktop", besuche: 530 },
    { geraet: "mobil", besuche: 422 },
  ],
};
const DEMO_LIVE_BESUCHE = 4;

/** Deterministischer Pseudo-Zufall (mulberry32) — feste Demo-Klickwolken,
 *  die bei jedem Reload gleich aussehen statt bei jedem Aufruf zu flackern. */
function demoHeatmapPunkte(): HeatmapPunkt[] {
  let state = 42;
  function rnd(): number {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  const zentren = [
    { x: 100, y: 14, staerke: 60 }, // Hero-CTA oben
    { x: 100, y: 34, staerke: 34 },
    { x: 70, y: 58, staerke: 20 },
    { x: 130, y: 82, staerke: 26 },
    { x: 100, y: 96, staerke: 40 }, // Fuß-CTA
  ];
  const punkte: HeatmapPunkt[] = [];
  for (const z of zentren) {
    const anzahl = 8 + Math.round(rnd() * 6);
    for (let i = 0; i < anzahl; i++) {
      const x = Math.min(200, Math.max(0, Math.round(z.x + (rnd() - 0.5) * 30)));
      const y = Math.min(200, Math.max(0, Math.round(z.y + (rnd() - 0.5) * 12)));
      const n = 1 + Math.round(rnd() * z.staerke);
      punkte.push({ x, y, n });
    }
  }
  return punkte;
}

/* ── Kleine, selbst gezeichnete Glyphen — kein Icon-Import ─────────── */

function TrendGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--ink-dim)" strokeWidth="1.5" aria-hidden>
      <path d="M2.5 15.5 6.8 9l3.4 3 6.8-8.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 17.5h15" strokeLinecap="round" />
    </svg>
  );
}

function LeerPanel({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-line-subtle px-6 py-10 text-center">
      <TrendGlyph />
      <p className="t-small mt-3 max-w-[22rem] !text-ink-dim">{text}</p>
    </div>
  );
}

function KpiKachel({ label, wert }: { label: string; wert: string }) {
  return (
    <div className="rounded-xl border border-line-subtle bg-white px-5 py-4">
      <p className="t-label">{label}</p>
      <p className="tnum mt-2 font-mono text-[22px] font-semibold leading-none text-ink-cream">{wert}</p>
    </div>
  );
}

function Pille({ href, aktiv, children }: { href: string; aktiv: boolean; children: ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={aktiv ? "true" : undefined}
      className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) ${
        aktiv
          ? "border-akzent bg-akzent-wash font-semibold text-ink-cream"
          : "border-line-subtle text-ink-muted hover:border-ink-cream/30 hover:text-ink-cream"
      }`}
    >
      {children}
    </Link>
  );
}

function UmschalterLink({ href, aktiv, children }: { href: string; aktiv: boolean; children: ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={aktiv ? "true" : undefined}
      className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) ${
        aktiv ? "bg-akzent font-semibold text-ink-cream" : "text-ink-muted hover:text-ink-cream"
      }`}
    >
      {children}
    </Link>
  );
}

export default async function InternEinblickPage({
  searchParams,
}: {
  searchParams: Promise<{ zeitraum?: string; pfad?: string; geraet?: string }>;
}) {
  const sp = await searchParams;
  const konfiguriert = crmKonfiguriert();
  const content = await getContent();
  const t = (key: string) => content[key] ?? INTERN_EINBLICK_DEFAULTS[key] ?? key;

  const zeitraum = sp.zeitraum === "heute" || sp.zeitraum === "30" ? sp.zeitraum : "7";
  const jetzt = new Date();
  const von = zeitraumVon(zeitraum, jetzt);

  let auswertung: Auswertung;
  let liveBesuche: number;
  if (konfiguriert) {
    const [auswertungRoh, liveRoh] = await Promise.all([
      trackAuswertung(von.toISOString(), jetzt.toISOString()),
      trackAuswertung(new Date(jetzt.getTime() - 30 * 60_000).toISOString(), jetzt.toISOString()),
    ]);
    auswertung = zuAuswertung(auswertungRoh);
    liveBesuche = zuAuswertung(liveRoh).geraete.reduce((a, g) => a + g.besuche, 0);
  } else {
    auswertung = DEMO_AUSWERTUNG;
    liveBesuche = DEMO_LIVE_BESUCHE;
  }

  const seitenaufrufe = auswertung.events.find((e) => e.event === "pageview")?.n ?? 0;
  const klicks = auswertung.events.find((e) => e.event === "klick")?.n ?? 0;
  const besucheGesamt = auswertung.geraete.reduce((a, g) => a + g.besuche, 0);
  const proBesuch = besucheGesamt > 0 ? seitenaufrufe / besucheGesamt : 0;
  const geraeteMax = Math.max(1, ...auswertung.geraete.map((g) => g.besuche));

  const topSeiten = auswertung.seiten.slice(0, 8);
  const heatmapPfad =
    sp.pfad && topSeiten.some((s) => s.pfad === sp.pfad) ? sp.pfad : (topSeiten[0]?.pfad ?? null);
  const heatmapGeraetParam: "alle" | "desktop" | "mobil" =
    sp.geraet === "desktop" || sp.geraet === "mobil" ? sp.geraet : "alle";

  let heatmapPunkte: HeatmapPunkt[] = [];
  if (heatmapPfad) {
    heatmapPunkte = konfiguriert
      ? await trackHeatmap(heatmapPfad, heatmapGeraetParam === "alle" ? null : heatmapGeraetParam, von.toISOString())
      : demoHeatmapPunkte();
  }

  function link(override: Partial<{ zeitraum: string; pfad: string; geraet: string }>): string {
    const params = new URLSearchParams({
      zeitraum,
      ...(heatmapPfad ? { pfad: heatmapPfad } : {}),
      geraet: heatmapGeraetParam,
      ...override,
    });
    return `/intern/einblick?${params.toString()}`;
  }

  return (
    <div className="px-6 pb-24 pt-12 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <SektionsKopf
            eyebrow={t("intern.einblick.eyebrow")}
            titel={t("intern.einblick.titel")}
            sub={t("intern.einblick.sub")}
          />
        </Reveal>

        {!konfiguriert && (
          <Reveal delay={40}>
            <div className="mt-8 max-w-[640px]">
              <GelbeKarte label={t("intern.einblick.demo_label")} titel={t("intern.einblick.demo_titel")}>
                {t("intern.einblick.demo_text")}
              </GelbeKarte>
            </div>
          </Reveal>
        )}

        <Reveal delay={80}>
          <div className="mt-8 flex items-center gap-2.5 rounded-xl border border-line-subtle bg-bg-elevated px-4 py-3">
            {/* Statischer Punkt, keine Ad-hoc-Animation — Muster: die
                „Läuft gerade"-Zeile in src/app/intern/page.tsx. */}
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-akzent" aria-hidden />
            <p className="t-small !text-ink-muted">
              {t("intern.einblick.live_titel")} ·{" "}
              <span className="tnum font-mono font-semibold !text-ink-cream">{ZAHL.format(liveBesuche)}</span>{" "}
              Besuch{liveBesuche === 1 ? "" : "e"} (letzte 30 Min.)
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pille href={link({ zeitraum: "heute" })} aktiv={zeitraum === "heute"}>
              {t("intern.einblick.zeitraum_heute")}
            </Pille>
            <Pille href={link({ zeitraum: "7" })} aktiv={zeitraum === "7"}>
              {t("intern.einblick.zeitraum_7")}
            </Pille>
            <Pille href={link({ zeitraum: "30" })} aktiv={zeitraum === "30"}>
              {t("intern.einblick.zeitraum_30")}
            </Pille>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <KpiKachel label={t("intern.einblick.kpi_seitenaufrufe")} wert={ZAHL.format(seitenaufrufe)} />
            <KpiKachel label={t("intern.einblick.kpi_besuche")} wert={ZAHL.format(besucheGesamt)} />
            <KpiKachel label={t("intern.einblick.kpi_pro_besuch")} wert={ZAHL_1.format(proBesuch)} />
            <KpiKachel label={t("intern.einblick.kpi_klicks")} wert={ZAHL.format(klicks)} />
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_320px]">
            <section className="rounded-2xl border border-line-subtle p-6">
              <p className="t-label">{t("intern.einblick.seiten_titel")}</p>
              <div className="mt-4">
                {auswertung.seiten.length === 0 ? (
                  <LeerPanel text={t("intern.einblick.seiten_leer")} />
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-left">
                        <thead>
                          <tr className="border-b border-line-subtle">
                            <th className="t-label px-2 py-2 font-medium">{t("intern.einblick.seiten_spalte_pfad")}</th>
                            <th className="t-label px-2 py-2 text-right font-medium">
                              {t("intern.einblick.seiten_spalte_views")}
                            </th>
                            <th className="t-label px-2 py-2 text-right font-medium">
                              {t("intern.einblick.seiten_spalte_besuche")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {auswertung.seiten.map((s) => (
                            <tr
                              key={s.pfad}
                              className="border-b border-line-subtle transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) last:border-0 hover:bg-bg-elevated"
                            >
                              <td className="px-2 py-2.5">
                                <Link
                                  href={`${link({ pfad: s.pfad })}#heatmap`}
                                  className="text-[13px] font-medium text-ink-cream underline decoration-transparent underline-offset-2 transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:decoration-line-medium"
                                >
                                  {s.pfad}
                                </Link>
                              </td>
                              <td className="tnum px-2 py-2.5 text-right font-mono text-[13px] text-ink-muted">
                                {ZAHL.format(s.views)}
                              </td>
                              <td className="tnum px-2 py-2.5 text-right font-mono text-[13px] text-ink-dim">
                                {ZAHL.format(s.besuche)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {auswertung.seiten.length >= 50 && (
                      <p className="t-small mt-3 !text-ink-dim">{t("intern.einblick.seiten_deckel")}</p>
                    )}
                  </>
                )}
              </div>
            </section>

            <div className="flex flex-col gap-5">
              <section className="rounded-2xl border border-line-subtle p-6">
                <p className="t-label">{t("intern.einblick.events_titel")}</p>
                <div className="mt-4">
                  {auswertung.events.length === 0 ? (
                    <LeerPanel text={t("intern.einblick.events_leer")} />
                  ) : (
                    <div className="flex flex-col">
                      {auswertung.events.map((e) => (
                        <div
                          key={e.event}
                          className="flex items-center justify-between border-b border-line-subtle py-2.5 last:border-0"
                        >
                          <span className="text-[13px] text-ink-muted">{EVENT_LABEL[e.event] ?? e.event}</span>
                          <span className="tnum font-mono text-[13px] font-medium text-ink-cream">
                            {ZAHL.format(e.n)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>

              <section className="rounded-2xl border border-line-subtle p-6">
                <p className="t-label">{t("intern.einblick.geraete_titel")}</p>
                <div className="mt-4">
                  {auswertung.geraete.length === 0 ? (
                    <LeerPanel text={t("intern.einblick.geraete_leer")} />
                  ) : (
                    <div className="flex flex-col gap-3">
                      {auswertung.geraete.map((g) => (
                        <div key={g.geraet}>
                          <div className="flex items-center justify-between text-[12.5px]">
                            <span className="text-ink-muted">{GERAET_LABEL[g.geraet] ?? g.geraet}</span>
                            <span className="tnum font-mono font-medium text-ink-cream">{ZAHL.format(g.besuche)}</span>
                          </div>
                          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-bg-elevated">
                            <div
                              className="h-full rounded-full bg-akzent transition-[width] duration-(--duration-slow) ease-(--ease-smooth-out)"
                              style={{ width: `${Math.round((g.besuche / geraeteMax) * 100)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <section id="heatmap" className="mt-6 scroll-mt-20 rounded-2xl border border-line-subtle p-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="t-label">{t("intern.einblick.heatmap_titel")}</p>
                <p className="t-small mt-1 !text-ink-muted">{t("intern.einblick.heatmap_sub")}</p>
              </div>
              <div className="inline-flex rounded-full border border-line-subtle p-0.5">
                <UmschalterLink href={link({ geraet: "alle" })} aktiv={heatmapGeraetParam === "alle"}>
                  {t("intern.einblick.heatmap_geraet_alle")}
                </UmschalterLink>
                <UmschalterLink href={link({ geraet: "desktop" })} aktiv={heatmapGeraetParam === "desktop"}>
                  {t("intern.einblick.heatmap_geraet_desktop")}
                </UmschalterLink>
                <UmschalterLink href={link({ geraet: "mobil" })} aktiv={heatmapGeraetParam === "mobil"}>
                  {t("intern.einblick.heatmap_geraet_mobil")}
                </UmschalterLink>
              </div>
            </div>

            {topSeiten.length === 0 || !heatmapPfad ? (
              <div className="mt-5">
                <LeerPanel text={t("intern.einblick.heatmap_keine_seiten")} />
              </div>
            ) : (
              <>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {topSeiten.map((s) => (
                    <Pille key={s.pfad} href={`${link({ pfad: s.pfad })}#heatmap`} aktiv={s.pfad === heatmapPfad}>
                      {s.pfad}
                      <span className="tnum ml-1.5 font-mono opacity-70">{ZAHL.format(s.views)}</span>
                    </Pille>
                  ))}
                </div>

                <div className="mt-5 max-w-[640px]">
                  <Heatmap
                    punkte={heatmapPunkte}
                    pfad={heatmapPfad}
                    geraet={heatmapGeraetParam}
                    leerText={t("intern.einblick.heatmap_leer")}
                  />
                </div>
              </>
            )}

            <p className="t-small mt-4 !text-ink-dim">{t("intern.einblick.heatmap_platzhalter_hinweis")}</p>
            <p className="t-small mt-1 !text-ink-dim">{t("intern.einblick.heatmap_deckel")}</p>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
