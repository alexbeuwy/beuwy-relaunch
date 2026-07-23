"use client";

import { useState } from "react";

/**
 * Studio-Login-Formular: ein Passwort-Feld, POST an /api/studio/login,
 * bei Erfolg Redirect auf /studio (der Server rendert dann den Editor).
 */
export function StudioLogin() {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy || !password) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/studio/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;
      if (res.ok && data?.ok) {
        // Voller Reload, damit der Server das frische Cookie sieht.
        window.location.assign("/studio");
        return;
      }
      setError(data?.error || "Anmeldung fehlgeschlagen — bitte erneut versuchen.");
    } catch {
      setError("Netzwerkfehler — bitte erneut versuchen.");
    }
    setBusy(false);
  }

  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor="studio-password" className="t-label">
        Passwort
      </label>
      <input
        id="studio-password"
        type="password"
        name="password"
        autoComplete="current-password"
        autoFocus
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError(null);
        }}
        className="booking-input mt-3 w-full"
        placeholder="••••••••"
      />
      {error && (
        <p className="t-small is-fail mt-3" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={busy || !password}
        className="btn-primary mt-6 w-full justify-center disabled:opacity-40 disabled:pointer-events-none"
      >
        <span>{busy ? "Einen Moment …" : "Anmelden"}</span>
        <span aria-hidden>→</span>
      </button>
    </form>
  );
}
