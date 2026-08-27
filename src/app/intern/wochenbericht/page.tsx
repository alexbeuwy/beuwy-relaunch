import type { Metadata } from "next";
import { Eye, Send } from "lucide-react";
import {
  crmKonfiguriert,
  kontakteListe,
  kontoDetail,
  type BwKontakt,
  type BwKontoDetail,
} from "@/lib/crm/db";
import { getContent } from "@/lib/content";
import { INTERN_KUNDEN_DEFAULTS } from "@/lib/texte/intern-kunden";
import { GelbeKarte, SektionsKopf } from "@/components/MaklerElemente";
import { emailLayout, emailRows } from "@/lib/email";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KontoAuswahl, type KontoOption } from "./KontoAuswahl";
import { SendenButton, StatusToast } from "./SendenAktionen";

/**
 * /intern/wochenbericht — Vorschau + Versand des Montags-Berichts (R5
 * Leaf G7, Stufe 1a laut R5-FUNKTIONEN.md Modul 8). bw_konto_status_event
 * existiert nicht in crm/db.ts (nur Projektstatus als aktueller Wert über
 * kontoDetail, kein Wechsel-Protokoll) — die Berichtsgrundlage ist daher
 * bewusst schmaler als der volle Modul-8-Auftrag: aktueller Projektstatus
 * + diese Woche erledigte/aktuell offene Tickets, keine erfundene
 * "Statusänderung der Woche". Wie /intern/tickets gibt es kein
 * bw_konten_liste-RPC, die Konten-Auswahl baut deshalb ebenso über
 * kontakteListe() + kontoDetail() je E-Mail (bewusst dupliziert statt
 * geteilt, siehe Kommentar dort).
 *
 * Konto-Auswahl und "Vorschau aktualisieren" laufen weiterhin über
 * GET-Query-Parameter (?konto=&notiz=), "Jetzt senden" und "Als gesendet
 * protokollieren" bleiben zwei benannte Submit-Buttons desselben
 * Formulars, die per formAction/formMethod auf /api/intern-wochenbericht
 * (POST) umleiten — Standard-HTML-Formular-Kontrakt unverändert. Die
 * Vorschau selbst ist ein <iframe srcDoc=…> mit der echten
 * emailLayout()-Ausgabe, damit "was Alex sieht" exakt "was der Kunde
 * bekommt" entspricht.
 *
 * LEAF U4 (27.08, CRM-UX-Politur): drei kleine Client-Bausteine kommen
 * dazu. KontoAuswahl.tsx ersetzt die Sidebar-Linkliste durch ui/select
 * (navigiert per router.push() auf dieselbe ?konto=…-Route). Vorschau und
 * Versand stecken jetzt in ui/tabs — die Vorschau-Tab zeigt nur das
 * iframe, die Versand-Tab bündelt Notiz-Formular + alle drei Buttons in
 * einem Block (wichtig: Radix TabsContent hängt inaktive Panels aus dem
 * DOM aus, das Notiz-Feld muss also im selben Panel wie die Sende-Buttons
 * liegen, sonst würde sein Wert beim Submit fehlen). SendenAktionen.tsx
 * liefert SendenButton (derselbe Submit-Button wie zuvor — ohne
 * JavaScript sendet ein Klick sofort, mit JavaScript öffnet er erst
 * einen Bestätigungs-Dialog und löst den echten Submit über
 * requestSubmit() aus) und StatusToast (feuert einmalig einen Toast
 * passend zum ?status=…-Redirect-Parameter, der bestehende Text-Banner
 * bleibt zusätzlich stehen).
 */

export const metadata: Metadata = {
  title: "Wochenbericht — beuwy",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type TicketZeile = BwKontoDetail["tickets"][number];
type KontoZeile = { email: string; name: string; firma: string; projektStatus: string; tickets: TicketZeile[] };

/* Dieselben fünf Projektstufen wie KontoBereich.tsx (STUFEN) — feste
   Domain-Vokabel, dupliziert statt geteilt (KontoBereich.tsx ist nur
   additiv veränderbar, ein gemeinsamer Import läge außerhalb der für
   dieses Leaf erlaubten Dateiliste). */
const STUFEN_LABEL: Record<string, string> = {
  aufnahme: "Aufnahme",
  design: "Design",
  umsetzung: "Umsetzung",
  livegang: "Livegang",
  betrieb: "Betrieb",
};

/* Deckt beide im Repo vorkommenden Ticket-Status-Vokabulare ab (Schema:
   offen/in-arbeit/erledigt, Kundenkonto-Frontend: neu/in_bearbeitung/
   erledigt — Mismatch dokumentiert in R5-FUNKTIONEN.md Modul 7, hier
   nur robust angezeigt statt korrigiert). */
const STATUS_ANZEIGE: Record<string, string> = {
  offen: "Offen",
  "in-arbeit": "In Arbeit",
  erledigt: "Erledigt",
  neu: "Neu",
  in_bearbeitung: "In Bearbeitung",
};

const WOCHE_MS = 7 * 24 * 3_600_000;

const BTN_QUIET =
  "inline-flex shrink-0 items-center rounded-full border border-line-subtle px-5 py-2.5 text-[13.5px] font-medium text-ink-muted transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:border-ink-cream/30 hover:text-ink-cream";
const BTN_PRIMARY =
  "inline-flex shrink-0 items-center rounded-full bg-akzent px-5 py-2.5 text-[13.5px] font-semibold text-ink-cream transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-akzent-hover";

/* ── Demo-Daten (crmKonfiguriert()===false) ──────────────────────────── */
const TAG = 24 * 3_600_000;

const DEMO_KONTEN: KontoZeile[] = [
  {
    email: "julia.berger@beispiel.de",
    name: "Julia Berger",
    firma: "Berger Immobilien",
    projektStatus: "umsetzung",
    tickets: [
      { id: -101, erstellt: new Date(Date.now() - 3 * TAG).toISOString(), titel: "Exposé-Vorlage anpassen", status: "offen", detail: "" },
      { id: -102, erstellt: new Date(Date.now() - 4 * TAG).toISOString(), titel: "Domain-Weiterleitung geklärt", status: "erledigt", detail: "" },
    ],
  },
  {
    email: "m.vogt@beispiel.de",
    name: "Markus Vogt",
    firma: "Vogt & Partner",
    projektStatus: "design",
    tickets: [
      { id: -103, erstellt: new Date(Date.now() - 5 * TAG).toISOString(), titel: "Google-Profil nicht erreichbar", status: "in-arbeit", detail: "" },
    ],
  },
];

/* ── Datenzugriff ─────────────────────────────────────────────────── */

async function ladeKonten(): Promise<KontoZeile[]> {
  const kontakte = await kontakteListe();
  const emailMap = new Map<string, BwKontakt>();
  for (const k of kontakte) {
    const email = (k.email || "").trim().toLowerCase();
    if (email) emailMap.set(email, k);
  }
  const emails = Array.from(emailMap.keys());
  const details = await Promise.all(emails.map((e) => kontoDetail(e)));

  const konten: KontoZeile[] = [];
  details.forEach((d, i) => {
    if (!d) return;
    const email = emails[i];
    const kontakt = emailMap.get(email);
    konten.push({
      email,
      name: d.konto.name || kontakt?.name || "",
      firma: d.konto.firma || kontakt?.firma || "",
      projektStatus: d.konto.projekt_status || "aufnahme",
      tickets: d.tickets,
    });
  });
  return konten;
}

/* ── E-Mail-HTML — dieselbe Hülle wie src/lib/email-vorlagen.ts
   (emailLayout/emailRows, esc/absatz/liste im selben Stil), hier bewusst
   dupliziert statt in email-vorlagen.ts ergänzt: diese Datei liegt außerhalb
   der für dieses Leaf erlaubten Dateiliste, und page.tsx (Vorschau) sowie
   die API-Route (Versand) brauchen exakt dieselbe Ausgabe. ─────────────── */

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function absatz(html: string): string {
  return `<p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#141414;">${html}</p>`;
}

function liste(punkte: string[]): string {
  const items = punkte.map((p) => `<li style="margin:0 0 8px;">${p}</li>`).join("");
  return `<ul style="margin:0 0 16px;padding-left:20px;font-size:14px;line-height:1.6;color:#141414;">${items}</ul>`;
}

function abschnittstitel(text: string): string {
  return `<p style="margin:20px 0 8px;font-size:13px;font-weight:700;color:#141414;">${esc(text)}</p>`;
}

function vorname(name: string): string {
  const trimmed = String(name ?? "").trim();
  return esc(trimmed.split(/\s+/)[0] || trimmed) || "Sie";
}

function bauWochenbericht(input: {
  name: string;
  projektStatusLabel: string;
  erledigt: string[];
  offen: string[];
  notiz: string;
  headingVorlage: string;
  introText: string;
  erledigtTitel: string;
  erledigtLeer: string;
  offenTitel: string;
  offenLeer: string;
  projektstatusTitel: string;
  notizLabel: string;
}): { betreff: string; html: string } {
  const betreff = "Ihr Wochenbericht";
  const html = emailLayout({
    heading: input.headingVorlage.replace("{name}", vorname(input.name)),
    intro: esc(input.introText),
    bodyHtml:
      emailRows([{ label: input.projektstatusTitel, value: esc(input.projektStatusLabel) }]) +
      abschnittstitel(input.erledigtTitel) +
      (input.erledigt.length ? liste(input.erledigt.map(esc)) : absatz(esc(input.erledigtLeer))) +
      abschnittstitel(input.offenTitel) +
      (input.offen.length ? liste(input.offen.map(esc)) : absatz(esc(input.offenLeer))) +
      (input.notiz.trim()
        ? abschnittstitel(input.notizLabel) + absatz(esc(input.notiz).replace(/\n/g, "<br />"))
        : ""),
  });
  return { betreff, html };
}

/* ── Glyph — selbst gezeichnet, kein Icon-Import ─────────────────────── */

function BerichtGlyph() {
  return (
    <svg width="34" height="34" viewBox="0 0 40 40" fill="none" stroke="var(--ink-dim)" strokeWidth="1.6" aria-hidden>
      <rect x="5" y="9" width="30" height="22" rx="3" />
      <path d="M6 12l14 10 14-10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function WochenberichtPage({
  searchParams,
}: {
  searchParams: Promise<{ konto?: string; notiz?: string; status?: string }>;
}) {
  const { konto: kontoParam, notiz: notizParam, status: statusParam } = await searchParams;
  const konfiguriert = crmKonfiguriert();
  const content = await getContent();
  const t = (key: string) => content[key] ?? INTERN_KUNDEN_DEFAULTS[key] ?? key;

  const kontenRoh = konfiguriert ? await ladeKonten() : DEMO_KONTEN;
  const konten = [...kontenRoh].sort((a, b) =>
    (a.name || a.firma || a.email).localeCompare(b.name || b.firma || b.email, "de"),
  );

  const ausgewaehlt = konten.find((k) => k.email === kontoParam) ?? konten[0] ?? null;
  const notiz = notizParam ?? "";

  let vorschau: { betreff: string; html: string } | null = null;
  let erledigtDieseWoche: TicketZeile[] = [];
  let offenAktuell: TicketZeile[] = [];

  if (ausgewaehlt) {
    const jetzt = Date.now();
    const wochenTickets = ausgewaehlt.tickets.filter(
      (ti) => jetzt - new Date(ti.erstellt).getTime() <= WOCHE_MS,
    );
    erledigtDieseWoche = wochenTickets.filter((ti) => ti.status === "erledigt");
    offenAktuell = ausgewaehlt.tickets.filter((ti) => ti.status !== "erledigt");

    vorschau = bauWochenbericht({
      name: ausgewaehlt.name || ausgewaehlt.firma || ausgewaehlt.email,
      projektStatusLabel: STUFEN_LABEL[ausgewaehlt.projektStatus] ?? ausgewaehlt.projektStatus,
      erledigt: erledigtDieseWoche.map((ti) => ti.titel),
      offen: offenAktuell.map((ti) => `${ti.titel} (${STATUS_ANZEIGE[ti.status] ?? ti.status})`),
      notiz,
      headingVorlage: t("intern.kunden.wochenbericht.mail_heading"),
      introText: t("intern.kunden.wochenbericht.mail_intro"),
      erledigtTitel: t("intern.kunden.wochenbericht.erledigt_titel"),
      erledigtLeer: t("intern.kunden.wochenbericht.erledigt_leer"),
      offenTitel: t("intern.kunden.wochenbericht.offen_titel"),
      offenLeer: t("intern.kunden.wochenbericht.offen_leer"),
      projektstatusTitel: t("intern.kunden.wochenbericht.projektstatus_titel"),
      notizLabel: t("intern.kunden.wochenbericht.notiz_label"),
    });
  }

  const statusBanner =
    statusParam === "gesendet"
      ? { text: t("intern.kunden.wochenbericht.status_gesendet"), fehler: false }
      : statusParam === "demo"
        ? { text: t("intern.kunden.wochenbericht.status_demo"), fehler: false }
        : statusParam === "fehler"
          ? { text: t("intern.kunden.wochenbericht.status_fehler"), fehler: true }
          : null;

  /* Für KontoAuswahl.tsx (ui/select statt Sidebar-Linkliste, Leaf U4). */
  const kontoOptions: KontoOption[] = konten.map((k) => ({
    email: k.email,
    label: k.name || k.firma || k.email,
    statusLabel: STUFEN_LABEL[k.projektStatus] ?? k.projektStatus,
  }));

  return (
    <div className="px-5 py-7 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-[1200px]">
        <SektionsKopf
          eyebrow={t("intern.kunden.wochenbericht.eyebrow")}
          titel={t("intern.kunden.wochenbericht.titel")}
          sub={t("intern.kunden.wochenbericht.sub")}
        />

        {!konfiguriert && (
          <div className="mt-8 max-w-[640px]">
            <GelbeKarte
              label={t("intern.kunden.wochenbericht.demo_label")}
              titel={t("intern.kunden.wochenbericht.demo_titel")}
            >
              {t("intern.kunden.wochenbericht.demo_text")}
            </GelbeKarte>
          </div>
        )}

        {konten.length === 0 ? (
          <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-line-subtle px-8 py-16 text-center">
            <BerichtGlyph />
            <p className="t-h3 mt-4 !text-[17px]">{t("intern.kunden.wochenbericht.konten_leer_titel")}</p>
            <p className="t-body mt-2 max-w-[26rem]">{t("intern.kunden.wochenbericht.konten_leer_text")}</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 lg:grid-cols-[280px_1fr]">
            {/* ── Kunde wählen (ui/select, Leaf U4) ────────────────────── */}
            <aside className="h-fit rounded-2xl border border-line-subtle p-4 lg:sticky lg:top-6">
              <p className="t-label">{t("intern.kunden.wochenbericht.konten_titel")}</p>
              <div className="mt-2.5">
                <KontoAuswahl
                  konten={kontoOptions}
                  ausgewaehltEmail={ausgewaehlt?.email ?? null}
                  platzhalter={t("intern.kunden.wochenbericht.konten_titel")}
                />
              </div>
            </aside>

            {/* ── Vorschau + Versand ───────────────────────────────────── */}
            <div className="rounded-2xl border border-line-subtle p-6">
              {!ausgewaehlt || !vorschau ? (
                <p className="t-small !text-ink-dim">{t("intern.kunden.wochenbericht.konten_leer_text")}</p>
              ) : (
                <>
                  <StatusToast
                    status={statusParam ?? null}
                    gesendetText={t("intern.kunden.wochenbericht.status_gesendet")}
                    demoText={t("intern.kunden.wochenbericht.status_demo")}
                    fehlerText={t("intern.kunden.wochenbericht.status_fehler")}
                  />

                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="t-label">Konto</p>
                      <p className="t-h3 mt-1 truncate !text-[18px]">
                        {ausgewaehlt.name || ausgewaehlt.firma || ausgewaehlt.email}
                      </p>
                      <p className="t-small mt-0.5 truncate">
                        {[ausgewaehlt.firma, ausgewaehlt.email].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-4 text-right">
                      <div>
                        <p className="t-data tnum !text-ink-dim">{t("intern.kunden.wochenbericht.erledigt_titel")}</p>
                        <p className="tnum text-[17px] font-semibold text-ink-cream">{erledigtDieseWoche.length}</p>
                      </div>
                      <div>
                        <p className="t-data tnum !text-ink-dim">{t("intern.kunden.wochenbericht.offen_titel")}</p>
                        <p className="tnum text-[17px] font-semibold text-ink-cream">{offenAktuell.length}</p>
                      </div>
                    </div>
                  </div>

                  {statusBanner && (
                    <div
                      className={`mt-5 flex items-center justify-between gap-3 rounded-xl px-4 py-3 ${
                        statusBanner.fehler ? "border border-destructive/30 bg-destructive/10" : "bg-akzent-wash"
                      }`}
                    >
                      <p className={`text-[13px] ${statusBanner.fehler ? "text-destructive" : "text-ink-cream"}`}>
                        {statusBanner.text}
                      </p>
                    </div>
                  )}

                  <Tabs defaultValue="vorschau" className="mt-6 gap-4">
                    <TabsList>
                      <TabsTrigger value="vorschau" className="gap-1.5">
                        <Eye size={14} aria-hidden />
                        {t("intern.kunden.wochenbericht.tab_vorschau")}
                      </TabsTrigger>
                      <TabsTrigger value="versand" className="gap-1.5">
                        <Send size={14} aria-hidden />
                        {t("intern.kunden.wochenbericht.tab_versand")}
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="vorschau">
                      <iframe
                        title={t("intern.kunden.wochenbericht.vorschau_titel")}
                        srcDoc={vorschau.html}
                        className="h-[520px] w-full rounded-xl border border-line-subtle bg-white"
                      />
                    </TabsContent>

                    <TabsContent value="versand">
                      <form action="/intern/wochenbericht" method="get">
                        <input type="hidden" name="konto" value={ausgewaehlt.email} />
                        <label htmlFor="wb-notiz" className="t-label block">
                          {t("intern.kunden.wochenbericht.notiz_label")}
                        </label>
                        <p className="t-small mt-1">{t("intern.kunden.wochenbericht.notiz_hinweis")}</p>
                        <textarea
                          id="wb-notiz"
                          name="notiz"
                          rows={3}
                          defaultValue={notiz}
                          placeholder={t("intern.kunden.wochenbericht.notiz_platzhalter")}
                          className="booking-input mt-2 w-full resize-y"
                        />
                        <div className="mt-4 flex flex-wrap gap-2">
                          <button type="submit" formMethod="get" formAction="/intern/wochenbericht" className={BTN_QUIET}>
                            {t("intern.kunden.wochenbericht.button_vorschau")}
                          </button>
                          <SendenButton
                            label={t("intern.kunden.wochenbericht.button_senden")}
                            dialogTitel={t("intern.kunden.wochenbericht.senden_dialog_titel")}
                            dialogText={t("intern.kunden.wochenbericht.senden_dialog_text").replace(
                              "{email}",
                              ausgewaehlt.email,
                            )}
                            bestaetigenLabel={t("intern.kunden.wochenbericht.senden_dialog_bestaetigen")}
                            abbrechenLabel={t("intern.kunden.wochenbericht.senden_dialog_abbrechen")}
                            className={BTN_PRIMARY}
                          />
                          <button
                            type="submit"
                            formMethod="post"
                            formAction="/api/intern-wochenbericht"
                            name="aktion"
                            value="protokollieren"
                            className={BTN_QUIET}
                          >
                            {t("intern.kunden.wochenbericht.button_protokollieren")}
                          </button>
                        </div>
                      </form>
                    </TabsContent>
                  </Tabs>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
