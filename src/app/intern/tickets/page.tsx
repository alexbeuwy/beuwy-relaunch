import type { Metadata } from "next";
import Link from "next/link";
import {
  crmKonfiguriert,
  kontakteListe,
  kontoDetail,
  ticketAntworten,
  type BwKontakt,
  type BwKontoDetail,
} from "@/lib/crm/db";
import { getContent } from "@/lib/content";
import { INTERN_KUNDEN_DEFAULTS } from "@/lib/texte/intern-kunden";
import { GelbeKarte, SektionsKopf } from "@/components/MaklerElemente";

/**
 * /intern/tickets — Tickets mit Threads (R5 Leaf G7). Es gibt kein
 * bw_tickets_liste-RPC über alle Konten hinweg (siehe crm/db.ts) — die
 * Ansicht baut daher kontobasiert: links alle Konten mit mindestens einem
 * Ticket (kontakteListe() für die E-Mail-Liste, je E-Mail kontoDetail()
 * für Stammdaten + Tickets), rechts die Tickets des gewählten Kontos samt
 * Thread (ticketAntworten), Antwortformular (ticketAntwortAnlegen von
 * "beuwy" über /api/intern-tickets) und Status-Wechsel
 * (offen/in-arbeit/erledigt, Schema-Vokabular aus bw_ticket — siehe
 * R5-FUNKTIONEN.md Modul 7 zum Label-Mismatch mit dem Kundenkonto, dort
 * bewusst nicht angefasst, da KontoBereich.tsx nur additiv verändert
 * werden darf).
 *
 * Konto- und Ticket-Auswahl laufen komplett über Query-Parameter
 * (?konto=E-Mail&ticket=ID) statt Client-State — kein "use client" nötig,
 * exakt das Muster aus src/app/intern/leads/[id]/page.tsx (Formulare als
 * klassische POSTs, Redirect 303 zurück auf dieselbe Auswahl).
 *
 * SLA: ein Ticket gilt als überfällig, wenn es seit über 48 Std. nicht
 * erledigt ist UND keine Antwort mit von="beuwy" hat. Um das nicht für
 * jedes Ticket jedes Kontos einzeln nachzuladen, wird ticketAntworten()
 * nur für Kandidaten aufgerufen (nicht erledigt, älter als 48 Std.) —
 * bei kleinen Ticketmengen (Design-Direktive Regel 24: Datendeckel
 * sichtbar machen, hier unnötig, weil die Fallzahl naturgemäß klein
 * bleibt) unkritisch.
 */

export const metadata: Metadata = {
  title: "Tickets — beuwy",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type TicketZeile = BwKontoDetail["tickets"][number];
type KontoMitTickets = { email: string; name: string; firma: string; tickets: TicketZeile[] };
type AntwortZeile = { id: number; erstellt: string; von: string; text: string };

const STATUS_ORDER = ["offen", "in-arbeit", "erledigt"] as const;
const STATUS_LABEL: Record<string, string> = { offen: "Offen", "in-arbeit": "In Arbeit", erledigt: "Erledigt" };
const STATUS_DOT: Record<string, string> = { offen: "bg-ink-cream", "in-arbeit": "bg-ink-muted", erledigt: "bg-line-medium" };

const SLA_MS = 48 * 3_600_000;

const BTN_QUIET =
  "inline-flex shrink-0 items-center rounded-full border border-line-subtle px-5 py-2.5 text-[13.5px] font-medium text-ink-muted transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:border-ink-cream/30 hover:text-ink-cream";

/* ── Demo-Daten (crmKonfiguriert()===false) — negative IDs markieren sie
   eindeutig als nicht-persistent, dieselbe Konvention wie die optimistischen
   Ticket-IDs in KontoBereich.tsx. ─────────────────────────────────────── */
const TAG = 24 * 3_600_000;

const DEMO_KONTEN: KontoMitTickets[] = [
  {
    email: "julia.berger@beispiel.de",
    name: "Julia Berger",
    firma: "Berger Immobilien",
    tickets: [
      {
        id: -101,
        erstellt: new Date(Date.now() - 3 * TAG).toISOString(),
        titel: "Exposé-Vorlage anpassen",
        status: "offen",
        detail: "Können wir das Logo im Exposé etwas größer machen?",
      },
      {
        id: -102,
        erstellt: new Date(Date.now() - 12 * TAG).toISOString(),
        titel: "Domain-Weiterleitung geklärt",
        status: "erledigt",
        detail: "Alte Domain leitet jetzt korrekt weiter.",
      },
    ],
  },
  {
    email: "m.vogt@beispiel.de",
    name: "Markus Vogt",
    firma: "Vogt & Partner",
    tickets: [
      {
        id: -103,
        erstellt: new Date(Date.now() - 5 * TAG).toISOString(),
        titel: "Google-Profil nicht erreichbar",
        status: "in-arbeit",
        detail: "Der Link im Footer zeigt auf eine 404-Seite.",
      },
    ],
  },
];

const DEMO_ANTWORTEN: Record<number, AntwortZeile[]> = {
  [-101]: [
    {
      id: -1,
      erstellt: new Date(Date.now() - 3 * TAG).toISOString(),
      von: "kunde",
      text: "Können wir das Logo im Exposé etwas größer machen?",
    },
  ],
  [-102]: [
    {
      id: -2,
      erstellt: new Date(Date.now() - 12 * TAG).toISOString(),
      von: "kunde",
      text: "Die alte Domain landet noch auf einer Fehlerseite.",
    },
    {
      id: -3,
      erstellt: new Date(Date.now() - 11 * TAG).toISOString(),
      von: "beuwy",
      text: "Behoben — die Weiterleitung greift jetzt.",
    },
  ],
  [-103]: [
    {
      id: -4,
      erstellt: new Date(Date.now() - 5 * TAG).toISOString(),
      von: "kunde",
      text: "Der Link im Footer zeigt auf eine 404-Seite.",
    },
  ],
};

/* Konsistent mit den obigen Demo-Daten von Hand geführt (nicht berechnet):
   -101 (offen, 3 Tage, nur Kundennachricht) und -103 (in-arbeit, 5 Tage,
   nur Kundennachricht) sind überfällig, -102 ist erledigt. */
const DEMO_SLA = new Set<number>([-101, -103]);

/* ── Datenzugriff ─────────────────────────────────────────────────── */

async function ladeKontenMitTickets(): Promise<KontoMitTickets[]> {
  const kontakte = await kontakteListe();
  const emailMap = new Map<string, BwKontakt>();
  for (const k of kontakte) {
    const email = (k.email || "").trim().toLowerCase();
    if (email) emailMap.set(email, k);
  }
  const emails = Array.from(emailMap.keys());
  const details = await Promise.all(emails.map((e) => kontoDetail(e)));

  const konten: KontoMitTickets[] = [];
  details.forEach((d, i) => {
    if (!d || d.tickets.length === 0) return;
    const email = emails[i];
    const kontakt = emailMap.get(email);
    konten.push({
      email,
      name: d.konto.name || kontakt?.name || "",
      firma: d.konto.firma || kontakt?.firma || "",
      tickets: d.tickets,
    });
  });
  return konten;
}

function istSlaKandidat(ticket: TicketZeile): boolean {
  return ticket.status !== "erledigt" && Date.now() - new Date(ticket.erstellt).getTime() > SLA_MS;
}

/** Nur für Kandidaten (nicht erledigt, älter als 48 Std.) wird der Thread
 *  überhaupt geladen — spart Anfragen gegenüber "jedes Ticket prüfen". */
async function ermittleUeberfaelligeTickets(konten: KontoMitTickets[]): Promise<Set<number>> {
  const kandidaten = konten.flatMap((k) => k.tickets.filter(istSlaKandidat));
  if (kandidaten.length === 0) return new Set();
  const ergebnisse = await Promise.all(
    kandidaten.map(async (ticket) => {
      const antworten = await ticketAntworten(ticket.id);
      const beantwortet = antworten.some((a) => a.von === "beuwy");
      return { id: ticket.id, ueberfaellig: !beantwortet };
    }),
  );
  return new Set(ergebnisse.filter((e) => e.ueberfaellig).map((e) => e.id));
}

/** Kurze relative Zeitangabe (deutsch) — dieselbe kleine Implementierung
 *  wie in mehreren anderen /intern-Seiten, bewusst dupliziert statt geteilt. */
function zeitRelativ(iso: string): string {
  const dann = new Date(iso).getTime();
  if (Number.isNaN(dann)) return "–";
  const minuten = Math.round((Date.now() - dann) / 60_000);
  if (minuten < 1) return "gerade eben";
  if (minuten < 60) return `vor ${minuten} Min.`;
  const stunden = Math.round(minuten / 60);
  if (stunden < 24) return `vor ${stunden} Std.`;
  const tage = Math.round(stunden / 24);
  if (tage < 7) return `vor ${tage} Tag${tage === 1 ? "" : "en"}`;
  const wochen = Math.round(tage / 7);
  if (wochen < 5) return `vor ${wochen} Woche${wochen === 1 ? "" : "n"}`;
  const monate = Math.round(tage / 30);
  return `vor ${monate} Monat${monate === 1 ? "" : "en"}`;
}

/** "3 Tagen" / "9 Std." — für den SLA-Hinweistext, ohne "vor"-Präfix. */
function dauerText(ms: number): string {
  const stunden = Math.round(ms / 3_600_000);
  if (stunden < 48) return `${stunden} Std.`;
  const tage = Math.round(stunden / 24);
  return `${tage} Tag${tage === 1 ? "" : "en"}`;
}

/* ── Glyphen — selbst gezeichnet, kein Icon-Import (Konvention aus
   src/components/MaklerElemente.tsx / .../intern/kontakte/page.tsx) ──── */

function TicketGlyph() {
  return (
    <svg width="34" height="34" viewBox="0 0 40 40" fill="none" stroke="var(--ink-dim)" strokeWidth="1.6" aria-hidden>
      <path d="M8 10h24a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V13a3 3 0 0 1 3-3Z" />
      <path d="M12 18h16M12 24h10" strokeLinecap="round" />
    </svg>
  );
}

/* ── Bausteine ────────────────────────────────────────────────────── */

function AntwortBubble({ antwort }: { antwort: AntwortZeile }) {
  const vonBeuwy = antwort.von === "beuwy";
  return (
    <div className={`flex ${vonBeuwy ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-xl px-3.5 py-2.5 ${
          vonBeuwy ? "bg-akzent-wash" : "border border-line-subtle bg-bg-elevated"
        }`}
      >
        <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-ink-cream">{antwort.text}</p>
        <p className="t-data tnum mt-1 !text-ink-dim">
          {vonBeuwy ? "beuwy" : "Kunde"} · {zeitRelativ(antwort.erstellt)}
        </p>
      </div>
    </div>
  );
}

export default async function TicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ konto?: string; ticket?: string }>;
}) {
  const { konto: kontoParam, ticket: ticketParam } = await searchParams;
  const konfiguriert = crmKonfiguriert();
  const content = await getContent();
  const t = (key: string) => content[key] ?? INTERN_KUNDEN_DEFAULTS[key] ?? key;

  const kontenRoh = konfiguriert ? await ladeKontenMitTickets() : DEMO_KONTEN;
  const slaSet = konfiguriert ? await ermittleUeberfaelligeTickets(kontenRoh) : DEMO_SLA;

  const konten = [...kontenRoh].sort((a, b) => {
    const aUeberfaellig = a.tickets.some((ti) => slaSet.has(ti.id));
    const bUeberfaellig = b.tickets.some((ti) => slaSet.has(ti.id));
    if (aUeberfaellig !== bUeberfaellig) return aUeberfaellig ? -1 : 1;
    return (a.name || a.firma || a.email).localeCompare(b.name || b.firma || b.email, "de");
  });

  const ausgewaehltesKonto = konten.find((k) => k.email === kontoParam) ?? konten[0] ?? null;

  const sortierteTickets = ausgewaehltesKonto
    ? [...ausgewaehltesKonto.tickets].sort((a, b) => {
        const aUeb = slaSet.has(a.id);
        const bUeb = slaSet.has(b.id);
        if (aUeb !== bUeb) return aUeb ? -1 : 1;
        const aOffen = a.status !== "erledigt";
        const bOffen = b.status !== "erledigt";
        if (aOffen !== bOffen) return aOffen ? -1 : 1;
        return new Date(b.erstellt).getTime() - new Date(a.erstellt).getTime();
      })
    : [];

  const ausgewaehltesTicket =
    sortierteTickets.find((ti) => String(ti.id) === ticketParam) ?? sortierteTickets[0] ?? null;

  let antworten: AntwortZeile[] = [];
  if (ausgewaehltesTicket) {
    antworten = konfiguriert
      ? await ticketAntworten(ausgewaehltesTicket.id)
      : DEMO_ANTWORTEN[ausgewaehltesTicket.id] ?? [];
  }

  return (
    <div className="px-5 py-7 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-[1200px]">
        <SektionsKopf
          eyebrow={t("intern.kunden.tickets.eyebrow")}
          titel={t("intern.kunden.tickets.titel")}
          sub={t("intern.kunden.tickets.sub")}
        />

        {!konfiguriert && (
          <div className="mt-8 max-w-[640px]">
            <GelbeKarte
              label={t("intern.kunden.tickets.demo_label")}
              titel={t("intern.kunden.tickets.demo_titel")}
            >
              {t("intern.kunden.tickets.demo_text")}
            </GelbeKarte>
          </div>
        )}

        {konten.length === 0 ? (
          <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-line-subtle px-8 py-16 text-center">
            <TicketGlyph />
            <p className="t-h3 mt-4 !text-[17px]">{t("intern.kunden.tickets.konten_leer_titel")}</p>
            <p className="t-body mt-2 max-w-[26rem]">{t("intern.kunden.tickets.konten_leer_text")}</p>
            <Link href="/intern/kontakte" className={`${BTN_QUIET} mt-5`}>
              {t("intern.kunden.tickets.konten_leer_cta")}
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 lg:grid-cols-[280px_1fr]">
            {/* ── Konten-Spalte ────────────────────────────────────────── */}
            <aside className="h-fit rounded-2xl border border-line-subtle lg:sticky lg:top-6">
              <div className="border-b border-line-subtle px-4 py-3">
                <p className="t-label">{t("intern.kunden.tickets.konten_titel")}</p>
              </div>
              <div className="flex flex-col lg:max-h-[calc(100vh-260px)] lg:overflow-y-auto">
                {konten.map((k) => {
                  const aktiv = ausgewaehltesKonto?.email === k.email;
                  const ueberfaellig = k.tickets.some((ti) => slaSet.has(ti.id));
                  const offenAnzahl = k.tickets.filter((ti) => ti.status !== "erledigt").length;
                  return (
                    <Link
                      key={k.email}
                      href={`/intern/tickets?konto=${encodeURIComponent(k.email)}`}
                      className={`flex items-center justify-between gap-2 border-b border-line-subtle px-4 py-3 transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) last:border-0 hover:bg-bg-elevated ${
                        aktiv ? "bg-akzent-wash" : ""
                      }`}
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-[13.5px] font-medium text-ink-cream">
                          {k.name || k.firma || k.email}
                        </span>
                        {k.firma && k.name && <span className="block truncate text-[12px] text-ink-muted">{k.firma}</span>}
                      </span>
                      <span className="flex shrink-0 items-center gap-1.5">
                        {ueberfaellig && <span className="h-1.5 w-1.5 rounded-full bg-destructive" aria-hidden />}
                        <span className="t-data tnum !text-ink-dim">{offenAnzahl || k.tickets.length}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </aside>

            {/* ── Tickets des gewählten Kontos ─────────────────────────── */}
            <div className="rounded-2xl border border-line-subtle p-6">
              {!ausgewaehltesKonto ? (
                <p className="t-small !text-ink-dim">{t("intern.kunden.tickets.kein_ticket_text")}</p>
              ) : (
                <>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="t-label">Konto</p>
                      <p className="t-h3 mt-1 truncate !text-[18px]">
                        {ausgewaehltesKonto.name || ausgewaehltesKonto.firma || ausgewaehltesKonto.email}
                      </p>
                      <p className="t-small mt-0.5 truncate">
                        {[ausgewaehltesKonto.firma, ausgewaehltesKonto.email].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                  </div>

                  {sortierteTickets.length > 1 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {sortierteTickets.map((ticket) => {
                        const aktiv = ausgewaehltesTicket?.id === ticket.id;
                        const ueb = slaSet.has(ticket.id);
                        return (
                          <Link
                            key={ticket.id}
                            href={`/intern/tickets?konto=${encodeURIComponent(ausgewaehltesKonto.email)}&ticket=${ticket.id}`}
                            className={
                              aktiv
                                ? "inline-flex items-center rounded-full bg-akzent px-4 py-2 text-[13px] font-semibold text-ink-cream"
                                : "inline-flex items-center rounded-full border border-line-subtle px-4 py-2 text-[13px] font-medium text-ink-muted transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:border-ink-cream/30 hover:text-ink-cream"
                            }
                          >
                            <span
                              className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${
                                ueb ? "bg-destructive" : STATUS_DOT[ticket.status] ?? "bg-ink-dim"
                              }`}
                              aria-hidden
                            />
                            {ticket.titel}
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  {ausgewaehltesTicket && (
                    <div className="mt-6 border-t border-line-subtle pt-6">
                      <p className="t-h3 !text-[16px]">{ausgewaehltesTicket.titel}</p>
                      {ausgewaehltesTicket.detail && (
                        <p className="t-body mt-2">{ausgewaehltesTicket.detail}</p>
                      )}
                      <p className="t-data tnum mt-2 !text-ink-dim">{zeitRelativ(ausgewaehltesTicket.erstellt)}</p>

                      {slaSet.has(ausgewaehltesTicket.id) && (
                        <div className="mt-4 flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" aria-hidden />
                          <p className="text-[12.5px] font-medium text-destructive">
                            {t("intern.kunden.tickets.sla_badge")} ·{" "}
                            {t("intern.kunden.tickets.sla_zeile").replace(
                              "{zeit}",
                              dauerText(Date.now() - new Date(ausgewaehltesTicket.erstellt).getTime()),
                            )}
                          </p>
                        </div>
                      )}

                      {/* ── Status-Wechsel ─────────────────────────────── */}
                      <div className="mt-5">
                        <p className="t-label">{t("intern.kunden.tickets.status_titel")}</p>
                        <div className="mt-2.5 flex flex-wrap gap-2">
                          {STATUS_ORDER.map((status) => {
                            const aktiv = status === ausgewaehltesTicket.status;
                            return (
                              <form action="/api/intern-tickets" method="POST" key={status}>
                                <input type="hidden" name="aktion" value="status" />
                                <input type="hidden" name="id" value={ausgewaehltesTicket.id} />
                                <input type="hidden" name="wert" value={status} />
                                <input type="hidden" name="konto" value={ausgewaehltesKonto.email} />
                                <button
                                  type="submit"
                                  disabled={aktiv}
                                  className={
                                    aktiv
                                      ? "rounded-full bg-akzent px-4 py-2 text-[13px] font-semibold text-ink-cream"
                                      : "rounded-full border border-line-subtle px-4 py-2 text-[13px] font-medium text-ink-muted transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:border-ink-cream/30 hover:text-ink-cream"
                                  }
                                >
                                  {STATUS_LABEL[status]}
                                </button>
                              </form>
                            );
                          })}
                        </div>
                      </div>

                      {/* ── Verlauf ─────────────────────────────────────── */}
                      <div className="mt-6">
                        <p className="t-label">{t("intern.kunden.tickets.thread_titel")}</p>
                        <div className="mt-3 flex flex-col gap-2.5">
                          {antworten.length === 0 ? (
                            <p className="t-small !text-ink-dim">{t("intern.kunden.tickets.thread_leer")}</p>
                          ) : (
                            antworten.map((a) => <AntwortBubble key={a.id} antwort={a} />)
                          )}
                        </div>
                      </div>

                      {/* ── Antwortformular ─────────────────────────────── */}
                      <div className="mt-6 rounded-xl border border-line-subtle p-5">
                        <p className="t-label">{t("intern.kunden.tickets.antwort_titel")}</p>
                        <form action="/api/intern-tickets" method="POST" className="mt-3 flex flex-col gap-3">
                          <input type="hidden" name="aktion" value="antwort" />
                          <input type="hidden" name="id" value={ausgewaehltesTicket.id} />
                          <input type="hidden" name="konto" value={ausgewaehltesKonto.email} />
                          <textarea
                            name="text"
                            required
                            rows={3}
                            placeholder={t("intern.kunden.tickets.antwort_platzhalter")}
                            className="booking-input w-full resize-y"
                          />
                          <button
                            type="submit"
                            className="self-start rounded-full bg-akzent px-6 py-2.5 text-[14px] font-semibold text-ink-cream transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-akzent-hover"
                          >
                            {t("intern.kunden.tickets.antwort_senden")}
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
