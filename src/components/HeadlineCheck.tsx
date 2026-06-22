"use client";

/**
 * Der 5-Sekunden-Test — Klartext-Check für die wichtigste Zeile einer Seite.
 *
 * Sales-Logik (Suby HVCO): das Werkzeug deckt ein Problem auf, das der Kunde
 * selbst nicht sieht — "mein Satz ist vage" — und zeigt damit genau die
 * Fähigkeit, die beuwy verkauft (klare Headlines). Es bewertet, es schreibt
 * NICHT um (das wäre ein leeres AI-Versprechen). Der klare Satz kommt im Audit.
 *
 * Rein heuristisch, client-side. Die Jargon-Liste ist beuwys eigene
 * Verbotswort-Liste aus docs/VOICE.md — dadurch ehrlich markenkonform.
 */

import { useMemo, useState } from "react";
import Link from "next/link";

// beuwys No-Go-Wörter (aus VOICE.md) + Klassiker des Agentur-Deutsch.
const JARGON = [
  "innovativ", "ganzheitlich", "maßgeschneidert", "massgeschneidert", "synergie", "synergien",
  "nachhaltig", "lösung", "lösungen", "loesung", "loesungen", "leidenschaft", "experte", "experten",
  "kompetent", "kompetenz", "qualität", "qualitaet", "zukunftsorientiert", "kundenorientiert",
  "mehrwert", "optimal", "effizient", "premium", "kategorie-definierend", "agent-layer", "skalierbar",
  "disruptiv", "state of the art", "best-in-class", "weltklasse", "marktführer", "marktfuehrer",
  "full-service", "rundum-sorglos", "passgenau", "zielgerichtet", "professionell", "dynamisch",
];

const ENGLISH = [
  "solutions", "scale", "scaling", "growth", "next", "level", "powered", "driven", "smart", "seamless",
  "future", "empower", "unlock", "boost", "performance", "experience", "journey", "leverage", "ai-powered",
  "innovation", "trust", "deliver", "your", "we", "the",
];

function tokenize(s: string): string[] {
  return s.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, " ").split(/\s+/).filter(Boolean);
}

type Check = { ok: boolean; weight: number; good: string; bad: string };

export function HeadlineCheck() {
  const [text, setText] = useState("");

  const { score, checks, touched } = useMemo(() => {
    const t = text.trim();
    const touched = t.length > 0;
    const tokens = tokenize(t);
    const words = tokens.length;
    const lower = " " + tokens.join(" ") + " ";

    const jargonHits = JARGON.filter((j) => lower.includes(" " + j + " ") || lower.includes(j));
    const englishHits = ENGLISH.filter((e) => tokens.includes(e));
    const hasNumber = /\d/.test(t);
    const addressesWho = /\bfür\b|\bfuer\b|\bdich\b|\bdu\b|\bdein/i.test(t);

    const checks: Check[] = [
      {
        ok: words > 0 && words <= 12,
        weight: 22,
        good: `Kurz genug — ${words} ${words === 1 ? "Wort" : "Wörter"}.`,
        bad: words === 0 ? "Noch nichts eingegeben." : `Zu lang — ${words} Wörter. Ziel: höchstens 12.`,
      },
      {
        ok: jargonHits.length === 0 && touched,
        weight: 24,
        good: "Kein Marketing-Sprech.",
        bad: jargonHits.length ? `Marketing-Wort gefunden: „${jargonHits.slice(0, 3).join("“, „")}“.` : "—",
      },
      {
        ok: englishHits.length === 0 && touched,
        weight: 16,
        good: "Auf Deutsch — versteht jeder.",
        bad: englishHits.length ? `Englisch gefunden: „${englishHits.slice(0, 3).join("“, „")}“.` : "—",
      },
      {
        ok: addressesWho,
        weight: 20,
        good: "Sagt, für wen es ist.",
        bad: "Sagt nicht, für wen es ist (für …, dich, dein …).",
      },
      {
        ok: hasNumber,
        weight: 18,
        good: "Hat eine konkrete Zahl.",
        bad: "Keine konkrete Zahl. Zahlen machen es glaubhaft (Preis, Zeit, Ergebnis).",
      },
    ];

    const score = touched
      ? Math.round(checks.reduce((s, c) => s + (c.ok ? c.weight : 0), 0))
      : 0;

    return { score, checks, touched };
  }, [text]);

  const scoreClass = score >= 75 ? "audit-score-good" : score >= 45 ? "audit-score-ok" : "audit-score-bad";
  const verdict = !touched
    ? "Schreib oben rein, was ganz oben auf deiner Seite steht."
    : score >= 75
    ? "Stark. Ein Fremder versteht das in fünf Sekunden."
    : score >= 45
    ? "Geht in die richtige Richtung — ein, zwei Sachen kosten dich noch Klarheit."
    : "Ein Fremder muss raten, was du tust. Genau hier verlierst du Anfragen.";

  return (
    <div className="hcheck">
      <div className="hcheck-input glass">
        <label className="hcheck-label">Was steht ganz oben auf deiner Seite?</label>
        <textarea
          className="hcheck-textarea"
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="z. B. Wir bieten innovative, ganzheitliche Lösungen für Ihren Erfolg."
          spellCheck={false}
        />
        <p className="hcheck-note">Schneller Selbst-Test, kein Urteil über dein Geschäft.</p>
      </div>

      <div className="hcheck-result glass">
        <div className="hcheck-score-row">
          <span className={`hcheck-score ${scoreClass}`}>{score}</span>
          <span className="hcheck-score-denom">/ 100</span>
        </div>
        <p className="hcheck-verdict">{verdict}</p>

        <ul className="hcheck-checks">
          {checks.map((c, i) => (
            <li key={i} className={`hcheck-check ${c.ok ? "is-ok" : "is-bad"}`} data-idle={!touched}>
              <span className="hcheck-mark" aria-hidden>{c.ok ? "✓" : "✕"}</span>
              <span>{touched ? (c.ok ? c.good : c.bad) : c.good}</span>
            </li>
          ))}
        </ul>

        <div className="hcheck-cta">
          <Link href="/audit" className="btn-primary">
            Den klaren Satz schreib ich dir <span aria-hidden>→</span>
          </Link>
          <Link href="/anfrage" className="btn-secondary">
            Brief schicken
          </Link>
        </div>
      </div>
    </div>
  );
}
