"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

/**
 * AntwortForm — das Antwortformular im Ticket-Thread (CRM-UX-Politur
 * Leaf U4). Bleibt ein echtes <form action="/api/intern-tickets"
 * method="POST">, damit ohne JavaScript exakt das bisherige Verhalten
 * greift (voller Form-POST, 303-Redirect zurück auf dieselbe Auswahl).
 * Mit JavaScript übernimmt onSubmit: preventDefault(), derselbe FormData-
 * Body per fetch() an dieselbe Route, danach Toast + router.refresh()
 * statt vollem Seitenwechsel — Formular-Post → fetch+Toast bei erhaltenem
 * No-JS-Fallback, wie an anderer Stelle im Repo (Leaf-Vorgabe) verlangt.
 */

export function AntwortForm({
  ticketId,
  kontoEmail,
  platzhalter,
  sendenLabel,
  toastErfolg,
  toastFehler,
}: {
  ticketId: number;
  kontoEmail: string;
  platzhalter: string;
  sendenLabel: string;
  toastErfolg: string;
  toastFehler: string;
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [text, setText] = useState("");
  const [sendet, setSendet] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!text.trim() || sendet || !formRef.current) return;
    setSendet(true);
    try {
      const form = new FormData(formRef.current);
      const res = await fetch("/api/intern-tickets", { method: "POST", body: form });
      if (!res.ok) throw new Error("antwort fehlgeschlagen");
      toast.success(toastErfolg);
      setText("");
      router.refresh();
    } catch {
      toast.error(toastFehler);
    } finally {
      setSendet(false);
    }
  }

  return (
    <form ref={formRef} action="/api/intern-tickets" method="POST" onSubmit={submit} className="mt-3 flex flex-col gap-3">
      <input type="hidden" name="aktion" value="antwort" />
      <input type="hidden" name="id" value={ticketId} />
      <input type="hidden" name="konto" value={kontoEmail} />
      <textarea
        name="text"
        required
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={platzhalter}
        className="booking-input w-full resize-y"
      />
      <button
        type="submit"
        disabled={sendet}
        className="self-start rounded-full bg-akzent px-6 py-2.5 text-[14px] font-semibold text-ink-cream transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-akzent-hover disabled:opacity-60"
      >
        {sendenLabel}
      </button>
    </form>
  );
}
