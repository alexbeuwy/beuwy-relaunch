"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * Passwort ändern — aufgeklappt, damit es niemanden stört, aber auffindbar
 * ist. Verlangt bewusst das aktuelle Passwort: ein abgegriffenes Cookie
 * allein soll nicht reichen, um jemanden auszusperren.
 */
export function PasswortAendern() {
  const [offen, setOffen] = useState(false);
  const [aktuell, setAktuell] = useState("");
  const [neu, setNeu] = useState("");
  const [wiederholung, setWiederholung] = useState("");
  const [laeuft, setLaeuft] = useState(false);
  const [meldung, setMeldung] = useState<{ art: "ok" | "fehler"; text: string } | null>(null);

  const id = useId();
  const zuKurz = neu.length > 0 && neu.length < 10;
  const passtNicht = wiederholung.length > 0 && neu !== wiederholung;
  const bereit = aktuell.length > 0 && neu.length >= 10 && neu === wiederholung && !laeuft;

  async function absenden(e: React.FormEvent) {
    e.preventDefault();
    if (!bereit) return;
    setLaeuft(true);
    setMeldung(null);
    try {
      const res = await fetch("/api/studio/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current: aktuell, next: neu }),
      });
      const daten = (await res.json()) as { ok?: boolean; error?: string };
      if (res.ok && daten.ok) {
        setMeldung({ art: "ok", text: "Passwort geändert. Andere Geräte sind jetzt abgemeldet." });
        setAktuell("");
        setNeu("");
        setWiederholung("");
      } else {
        setMeldung({
          art: "fehler",
          text: daten.error || "Das hat nicht geklappt. Bitte noch einmal versuchen.",
        });
      }
    } catch {
      setMeldung({ art: "fehler", text: "Keine Verbindung zum Server." });
    } finally {
      setLaeuft(false);
    }
  }

  if (!offen) {
    return (
      <button type="button" className="pw-oeffner t-small" onClick={() => setOffen(true)}>
        Passwort ändern
      </button>
    );
  }

  return (
    <form onSubmit={absenden} className="pw-form panel rounded-xl p-6">
      <p className="t-label">Passwort ändern</p>

      <label className="pw-feld" htmlFor={`${id}-aktuell`}>
        <span className="t-small">Aktuelles Passwort</span>
        <input
          id={`${id}-aktuell`}
          type="password"
          autoComplete="current-password"
          className="pw-eingabe"
          value={aktuell}
          onChange={(e) => setAktuell(e.target.value)}
          required
        />
      </label>

      <label className="pw-feld" htmlFor={`${id}-neu`}>
        <span className="t-small">Neues Passwort</span>
        <input
          id={`${id}-neu`}
          type="password"
          autoComplete="new-password"
          className="pw-eingabe"
          value={neu}
          onChange={(e) => setNeu(e.target.value)}
          aria-describedby={`${id}-hinweis`}
          required
        />
        <span
          id={`${id}-hinweis`}
          className={`t-small pw-hinweis${zuKurz ? " is-fehler" : ""}`}
        >
          {zuKurz ? `Noch ${10 - neu.length} Zeichen zu kurz.` : "Mindestens 10 Zeichen."}
        </span>
      </label>

      <label className="pw-feld" htmlFor={`${id}-wdh`}>
        <span className="t-small">Neues Passwort wiederholen</span>
        <input
          id={`${id}-wdh`}
          type="password"
          autoComplete="new-password"
          className="pw-eingabe"
          value={wiederholung}
          onChange={(e) => setWiederholung(e.target.value)}
          required
        />
        {passtNicht ? (
          <span className="t-small pw-hinweis is-fehler">
            Die beiden Eingaben sind nicht gleich.
          </span>
        ) : null}
      </label>

      {meldung ? (
        <p
          className={`t-small pw-meldung${meldung.art === "fehler" ? " is-fehler" : " is-ok"}`}
          role="status"
        >
          {meldung.text}
        </p>
      ) : null}

      <div className="pw-knoepfe">
        <Button type="submit" size="sm" disabled={!bereit}>
          {laeuft ? "Wird gespeichert …" : "Passwort speichern"}
        </Button>
        <button
          type="button"
          className="pw-abbruch t-small"
          onClick={() => {
            setOffen(false);
            setMeldung(null);
            setAktuell("");
            setNeu("");
            setWiederholung("");
          }}
        >
          Abbrechen
        </button>
      </div>
    </form>
  );
}
