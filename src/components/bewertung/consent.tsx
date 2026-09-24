"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { Icon } from "@/components/bewertung/icon";

/**
 * Einwilligungsverwaltung für den Bewertungs-Wizard (TDDDG § 25 / DSGVO).
 * Port aus Riegel `components/consent.tsx` — Struktur/Verhalten unverändert,
 * nur der Anlass ist enger gefasst: beuwy lädt hier ausschließlich das
 * Satellitenbild (Esri World Imagery via LocationMap), kein CARTO wie im
 * Original — die Erklärung nennt deshalb nur, was tatsächlich lädt.
 *
 * Drei gleichwertige Wege: „Alle akzeptieren" · „Nur notwendige" (= ablehnen)
 * · „Einstellungen". Ablehnen ist optisch gleich stark wie Akzeptieren.
 * Widerruf (Art. 7 Abs. 3 DSGVO) läuft über denselben Dialog, erreichbar
 * über <ConsentSettingsLink />.
 *
 * Gespeichert wird lokal (kein Cookie, kein Serverkontakt) inkl. Zeitpunkt
 * und Textversion.
 */
type Choice = "all" | "essential";
type ConsentState = {
  ready: boolean;
  decided: boolean;
  maps: boolean;
  acceptAll: () => void;
  essentialOnly: () => void;
  grantMaps: () => void;
  /** Öffnet den Einstellungs-Dialog — auch der Widerrufsweg. */
  reopen: () => void;
};

const Ctx = createContext<ConsentState | null>(null);
const KEY = "beuwy:bewertung-consent";
/** Bei inhaltlicher Änderung der Hinweistexte hochzählen (Neu-Einwilligung). */
const CONSENT_VERSION = 1;

interface Stored {
  choice: Choice;
  version: number;
  at: string;
}

function read(): Choice | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Stored;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed.choice === "all" || parsed.choice === "essential" ? parsed.choice : null;
  } catch {
    return null;
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [ready, setReady] = useState(false);
  /** "banner" = Erstabfrage, "settings" = Dialog (auch Widerruf), null = zu. */
  const [view, setView] = useState<"banner" | "settings" | null>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const c = read();
      setChoice(c);
      setView(c === null ? "banner" : null);
      setReady(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const persist = useCallback((c: Choice) => {
    try {
      const payload: Stored = { choice: c, version: CONSENT_VERSION, at: new Date().toISOString() };
      localStorage.setItem(KEY, JSON.stringify(payload));
    } catch {
      /* fail-soft: Private-Mode / gesperrter Storage darf den Rechner nie stören */
    }
    setChoice(c);
    setView(null);
  }, []);

  const value: ConsentState = {
    ready,
    decided: choice !== null,
    maps: choice === "all",
    acceptAll: () => persist("all"),
    essentialOnly: () => persist("essential"),
    grantMaps: () => persist("all"),
    reopen: () => setView("settings"),
  };

  return (
    <Ctx.Provider value={value}>
      {children}
      {ready && view === "banner" && (
        <ConsentBanner onAccept={value.acceptAll} onEssential={value.essentialOnly} onSettings={() => setView("settings")} />
      )}
      {ready && view === "settings" && (
        <ConsentSettings current={choice} onSave={persist} onClose={() => setView(choice === null ? "banner" : null)} />
      )}
    </Ctx.Provider>
  );
}

export function useConsent(): ConsentState {
  const c = useContext(Ctx);
  if (!c) throw new Error("useConsent must be used within ConsentProvider");
  return c;
}

/** Erklärtext, einmal definiert — Banner und Dialog informieren identisch. */
function Erklaerung() {
  return (
    <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
      Der Bewertungs-Rechner lädt ein interaktives Satellitenbild (Esri World Imagery) erst mit
      Ihrer Einwilligung. Dabei wird Ihre IP-Adresse an den Anbieter übermittelt. Ohne Einwilligung
      funktioniert der Rechner vollständig, nur das Kartenbild bleibt ein Platzhalter. Mehr in der{" "}
      <Link href="/datenschutz" className="btn-link">
        Datenschutzerklärung
      </Link>
      .
    </p>
  );
}

const btnPrimary =
  "rounded-full bg-akzent px-4 py-2 text-[13.5px] font-semibold text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover active:scale-[0.98]";
/** Gleich gewichtet wie btnPrimary: Akzeptieren/Ablehnen dürfen kein Dark Pattern bilden. */
const btnEqual =
  "rounded-full border border-line-medium bg-white px-4 py-2 text-[13.5px] font-semibold text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:border-transparent hover:bg-akzent-wash active:scale-[0.98]";
const btnQuiet =
  "rounded-full px-4 py-2 text-[13.5px] text-ink-muted underline decoration-line-medium underline-offset-4 transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:text-ink-cream";

function ConsentBanner({
  onAccept,
  onEssential,
  onSettings,
}: {
  onAccept: () => void;
  onEssential: () => void;
  onSettings: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="bw-consent-title"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-md rounded-[18px] border border-line-medium bg-white p-5 shadow-[0_18px_50px_-20px_rgba(20,20,18,0.35)] sm:inset-x-auto sm:bottom-4 sm:left-4 sm:right-auto sm:w-[24rem]"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-medium bg-akzent-wash text-ink-cream">
          <Icon name="shield" size={17} />
        </span>
        <div>
          <h2 id="bw-consent-title" className="text-[14.5px] font-semibold text-ink-cream">
            Datenschutz &amp; Karte
          </h2>
          <Erklaerung />
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button type="button" onClick={onAccept} className={btnPrimary}>
              Alle akzeptieren
            </button>
            <button type="button" onClick={onEssential} className={btnEqual}>
              Nur notwendige
            </button>
            <button type="button" onClick={onSettings} className={btnQuiet}>
              Einstellungen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConsentSettings({
  current,
  onSave,
  onClose,
}: {
  current: Choice | null;
  onSave: (c: Choice) => void;
  onClose: () => void;
}) {
  const [maps, setMaps] = useState(current === "all");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-ink-cream/50 p-3 backdrop-blur-sm sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bw-consent-settings-title"
        className="w-full max-w-md rounded-[18px] border border-line-medium bg-white p-5 shadow-[0_24px_60px_-24px_rgba(20,20,18,0.45)]"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="bw-consent-settings-title" className="text-[15px] font-semibold text-ink-cream">
            Datenschutz-Einstellungen
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Schließen"
            className="-m-2 rounded-md p-2 text-ink-dim transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:text-ink-cream"
          >
            <Icon name="close" size={17} />
          </button>
        </div>
        <Erklaerung />

        <div className="mt-4 space-y-3">
          <div className="rounded-[12px] border border-line-medium bg-bg-elevated p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[13.5px] font-medium text-ink-cream">Technisch notwendig</span>
              <span className="rounded-full border border-line-medium px-2 py-0.5 text-[10px] uppercase tracking-wide text-ink-dim">
                immer aktiv
              </span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
              Speichert ausschließlich Ihre Auswahl hier sowie den Formularstand dieses Rechners.
              Keine Weitergabe an Dritte.
            </p>
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-[12px] border border-line-medium bg-bg-elevated p-4 transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:border-transparent hover:bg-akzent-wash">
            <input
              type="checkbox"
              checked={maps}
              onChange={(e) => setMaps(e.target.checked)}
              style={{ accentColor: "var(--akzent)" }}
              className="mt-0.5 h-4 w-4 shrink-0"
            />
            <span>
              <span className="block text-[13.5px] font-medium text-ink-cream">Satellitenbild</span>
              <span className="mt-1.5 block text-xs leading-relaxed text-ink-muted">
                Lädt Luftbilder von Esri. Ihre IP-Adresse wird dabei an den Anbieter übermittelt.
                Ohne diese Einwilligung sehen Sie an der Kartenstelle einen Platzhalter.
              </span>
            </span>
          </label>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => onSave(maps ? "all" : "essential")} className={btnPrimary}>
            Auswahl speichern
          </button>
          <button type="button" onClick={() => onSave("essential")} className={btnEqual}>
            Alle ablehnen
          </button>
        </div>
      </div>
    </div>
  );
}

/** Widerrufsweg — jederzeit erreichbar (Art. 7 Abs. 3 DSGVO). */
export function ConsentSettingsLink({ className = "" }: { className?: string }) {
  const { reopen } = useConsent();
  return (
    <button type="button" onClick={reopen} className={className}>
      Datenschutz-Einstellungen
    </button>
  );
}

/** Lädt die eingebettete Karte erst nach Einwilligung; sonst Klick-to-Load-Platzhalter. */
export function MapConsentGate({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { ready, maps, grantMaps } = useConsent();
  if (!ready) return <div className={`h-full w-full bg-bg-elevated ${className}`} />;
  if (maps) return <>{children}</>;
  return (
    <div className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-bg-elevated p-6 text-center ${className}`}>
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line-medium bg-white text-ink-cream">
        <Icon name="pin" size={20} />
      </span>
      <p className="max-w-xs text-[13px] leading-relaxed text-ink-muted">
        Das Satellitenbild wird über einen externen Dienst geladen. Mit Klick stimmen Sie der
        Datenübermittlung zu — widerrufbar über die Datenschutz-Einstellungen.
      </p>
      <button
        type="button"
        onClick={grantMaps}
        className="rounded-full bg-akzent px-5 py-2.5 text-[13.5px] font-semibold text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover active:scale-[0.98]"
      >
        Karte laden
      </button>
    </div>
  );
}
