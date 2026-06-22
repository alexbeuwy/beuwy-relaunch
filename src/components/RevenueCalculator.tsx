"use client";

/**
 * Umsatz-Leck-Rechner — der Preis-Einwand-Killer.
 *
 * Sales-Logik (Hormozi value equation / cost of inaction): solange jemand
 * "8.900 €" als KOSTEN liest, vergleicht er mit dem 500-€-Freelancer. Diese
 * Rechnung übersetzt den Preis in das, was die JETZIGE Seite jeden Monat
 * kostet — entgangene Anfragen. Danach ist der Preis kein Thema mehr.
 *
 * Bewusst ehrlich: alles, was eine Annahme ist, ist als Annahme markiert und
 * vom Nutzer verstellbar. Kein Versprechen — eine Größenordnung. Das passt zur
 * beuwy-Stimme ("Ich verspreche nur, was ich halten kann").
 *
 * Pure client-side. Kein Backend, läuft 24/7 für jeden Besucher.
 */

import { useState } from "react";
import Link from "next/link";

const PRICE = 8900;
const eur = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const num = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 });
const dec = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 1 });

type RangeProps = {
  label: string;
  hint?: string;
  assumption?: boolean;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
};

function Range({ label, hint, assumption, value, min, max, step, onChange, display }: RangeProps) {
  return (
    <div className="calc-field">
      <div className="calc-field-head">
        <label className="calc-field-label">
          {label}
          {assumption && <span className="calc-assume" title="Annahme — verstell sie ruhig">Annahme</span>}
        </label>
        <span className="calc-field-value">{display}</span>
      </div>
      <input
        className="calc-range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ ["--calc-pct" as string]: `${((value - min) / (max - min)) * 100}%` }}
      />
      {hint && <p className="calc-field-hint">{hint}</p>}
    </div>
  );
}

export function RevenueCalculator() {
  const [besucher, setBesucher] = useState(800);
  const [kundenwert, setKundenwert] = useState(2500);
  const [anfragenJetzt, setAnfragenJetzt] = useState(1.0);
  const [anfragenZiel, setAnfragenZiel] = useState(2.5);
  const [abschluss, setAbschluss] = useState(3);

  // Ziel kann nie unter "heute" liegen.
  const ziel = Math.max(anfragenZiel, anfragenJetzt);

  const anfragenNow = (besucher * anfragenJetzt) / 100;
  const anfragenZielAbs = (besucher * ziel) / 100;
  const extraAnfragen = Math.max(0, anfragenZielAbs - anfragenNow);
  const extraKunden = extraAnfragen * (abschluss / 10);
  const leakMonat = extraKunden * kundenwert;
  const leakJahr = leakMonat * 12;
  const paybackTage = leakMonat > 0 ? (PRICE / leakMonat) * 30 : Infinity;

  const paybackLabel =
    leakMonat <= 0
      ? "—"
      : paybackTage < 31
      ? `~${Math.max(1, Math.round(paybackTage))} Tagen`
      : `~${dec.format(paybackTage / 30)} Monaten`;

  return (
    <div className="calc">
      {/* ---- Eingaben ---- */}
      <div className="calc-inputs glass">
        <p className="calc-card-kicker">Deine Zahlen</p>
        <Range
          label="Leute pro Monat auf deiner Seite"
          value={besucher}
          min={100}
          max={10000}
          step={50}
          onChange={setBesucher}
          display={num.format(besucher)}
        />
        <Range
          label="Was ist dir ein neuer Kunde wert?"
          hint="Was du im Schnitt an einem gewonnenen Kunden verdienst."
          value={kundenwert}
          min={300}
          max={50000}
          step={100}
          onChange={setKundenwert}
          display={eur.format(kundenwert)}
        />
        <Range
          label="Von 100 Besuchern: wie viele fragen heute an?"
          value={anfragenJetzt}
          min={0.2}
          max={8}
          step={0.1}
          onChange={setAnfragenJetzt}
          display={`${dec.format(anfragenJetzt)} von 100`}
        />
        <Range
          label="Mit einer klaren Seite: wie viele könnten es sein?"
          assumption
          value={ziel}
          min={0.2}
          max={10}
          step={0.1}
          onChange={setAnfragenZiel}
          display={`${dec.format(ziel)} von 100`}
        />
        <Range
          label="Von 10 Anfragen — wie viele werden Kunde?"
          assumption
          value={abschluss}
          min={1}
          max={8}
          step={1}
          onChange={setAbschluss}
          display={`${abschluss} von 10`}
        />
      </div>

      {/* ---- Ergebnis ---- */}
      <div className="calc-result glass">
        <p className="calc-card-kicker">Was dich das kostet</p>

        <div className="calc-leak">
          <span className="calc-leak-prefix">Dir entgehen rund</span>
          <span className="calc-leak-big">{eur.format(leakMonat)}</span>
          <span className="calc-leak-suffix">pro Monat</span>
        </div>

        <div className="calc-rows">
          <div className="calc-row">
            <span>Über ein Jahr</span>
            <strong>{eur.format(leakJahr)}</strong>
          </div>
          <div className="calc-row">
            <span>Zusätzliche Anfragen / Monat</span>
            <strong>+{dec.format(extraAnfragen)}</strong>
          </div>
          <div className="calc-row">
            <span>Zusätzliche Kunden / Monat</span>
            <strong>+{dec.format(extraKunden)}</strong>
          </div>
        </div>

        <div className="calc-payback">
          <span className="calc-payback-num">{eur.format(PRICE)}</span> für die neue Seite —
          drin nach <em>{paybackLabel}</em>.
        </div>

        <p className="calc-disclaimer">
          Rechenbeispiel mit deinen Zahlen — kein Versprechen. Wie viel wirklich kommt, hängt an
          deinem Produkt, deinem Preis und deinem Verkauf. Aber so siehst du die Größenordnung.
        </p>

        <div className="calc-cta">
          <Link href="/audit" className="btn-primary">
            Seite gratis prüfen <span aria-hidden>→</span>
          </Link>
          <Link href="/anfrage" className="btn-secondary">
            Direkt Brief schicken
          </Link>
        </div>
      </div>
    </div>
  );
}
