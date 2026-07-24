"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "sending" | "done" | "demo" | "error";

/** Kompaktes Anfrage-Formular für die Video-Analyse (ersetzt den mailto-Link). */
export function VideoAnalyseForm({ submitLabel, note }: { submitLabel: string; note: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    const fd = new FormData(e.currentTarget);
    try {
      const r = await fetch("/api/video-analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(fd.entries())),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data.ok) throw new Error("delivery");
      setStatus(data.demo ? "demo" : "done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done" || status === "demo") {
    return (
      <div className="panel rounded-2xl p-6 md:p-8 max-w-[620px]">
        <p className="t-h3">Angefragt.</p>
        <p className="t-body mt-3 is-cream">
          Sie hören binnen 24 Stunden von mir — auch, wenn die Antwort Nein ist.
        </p>
        {status === "demo" && (
          <p className="t-small mt-4">
            Hinweis: Der Mail-Versand ist auf dieser Umgebung noch nicht
            konfiguriert. Sicherheitshalber direkt an{" "}
            <a href="mailto:ap@beuwy.com" className="underline underline-offset-4">
              ap@beuwy.com
            </a>{" "}
            schreiben.
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="panel rounded-2xl p-6 md:p-8 max-w-[620px]">
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          name="name"
          required
          autoComplete="name"
          placeholder="Ihr Name"
          className="booking-input"
        />
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Ihre E-Mail"
          className="booking-input"
        />
        <input
          name="domain"
          required
          inputMode="url"
          placeholder="Ihre Domain, z. B. beispiel.de"
          className="booking-input sm:col-span-2"
        />
        <textarea
          name="message"
          rows={3}
          placeholder="Optional: Worum geht es bei Ihnen gerade?"
          className="booking-input resize-none sm:col-span-2"
        />
        {/* Honeypot — bleibt bei Menschen leer */}
        <input
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" className="btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Wird gesendet …" : submitLabel}
          <span aria-hidden>→</span>
        </button>
        <p className="t-data">{note}</p>
      </div>
      {status === "error" && (
        <p className="t-small mt-4">
          Das hat nicht geklappt. Bitte direkt an{" "}
          <a href="mailto:ap@beuwy.com" className="underline underline-offset-4">
            ap@beuwy.com
          </a>{" "}
          schreiben.
        </p>
      )}
    </form>
  );
}
