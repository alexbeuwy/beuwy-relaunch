"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

/**
 * StatusAuswahl — Ticket-Status als ui/select statt der drei Status-
 * Buttons (CRM-UX-Politur Leaf U4). Radix Select rendert kein natives
 * <select> und braucht damit ohnehin JavaScript zum Bedienen — der bisher
 * mögliche No-JS-Formular-Fallback entfällt hier zwangsläufig, exakt wie
 * bei der Verlust-Grund-Auswahl in KanbanBoard.tsx. Die Anfrage geht per
 * fetch() an dieselbe /api/intern-tickets-Route wie zuvor der klassische
 * Formular-POST (gleicher FormData-Kontrakt: aktion=status), optimistisch
 * mit Rollback bei Fehler + Toast + router.refresh(), damit die
 * serverseitig geladene Ticket-Liste (SLA-Sortierung etc.) aktuell bleibt.
 */

const STATUS_ORDER = ["offen", "in-arbeit", "erledigt"] as const;
const STATUS_LABEL: Record<string, string> = { offen: "Offen", "in-arbeit": "In Arbeit", erledigt: "Erledigt" };

export function StatusAuswahl({
  ticketId,
  kontoEmail,
  status,
  toastErfolg,
  toastFehler,
}: {
  ticketId: number;
  kontoEmail: string;
  status: string;
  toastErfolg: string;
  toastFehler: string;
}) {
  const router = useRouter();
  const [aktuell, setAktuell] = useState(status);
  const [speichert, setSpeichert] = useState(false);

  async function aendern(wert: string) {
    if (wert === aktuell || speichert) return;
    const vorher = aktuell;
    setAktuell(wert);
    setSpeichert(true);
    try {
      const form = new FormData();
      form.set("aktion", "status");
      form.set("id", String(ticketId));
      form.set("wert", wert);
      form.set("konto", kontoEmail);
      const res = await fetch("/api/intern-tickets", { method: "POST", body: form });
      if (!res.ok) throw new Error("status fehlgeschlagen");
      toast.success(toastErfolg.replace("{status}", STATUS_LABEL[wert] ?? wert));
      router.refresh();
    } catch {
      setAktuell(vorher);
      toast.error(toastFehler);
    } finally {
      setSpeichert(false);
    }
  }

  return (
    <Select value={aktuell} onValueChange={aendern} disabled={speichert}>
      <SelectTrigger className="w-44 bg-white">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {STATUS_ORDER.map((s) => (
          <SelectItem key={s} value={s}>
            {STATUS_LABEL[s]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
