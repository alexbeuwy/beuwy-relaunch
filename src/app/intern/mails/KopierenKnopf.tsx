"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";

/**
 * KopierenKnopf — kleinster mögliche Client-Baustein für /intern/mails
 * (CRM-UX-Politur Leaf U4). Die Seite selbst bleibt eine Server-Komponente
 * (Cookie-Auth über isStudioAuthed() läuft dort serverseitig) — nur das
 * Kopieren braucht echten Browser-Zugriff (navigator.clipboard) und ein
 * Toast, deshalb dieser eine winzige eigene "use client"-Baustein statt
 * die ganze Seite zum Client zu machen (Muster: FlowEditor.tsx neben
 * flows/page.tsx, KanbanBoard.tsx neben pipeline/page.tsx).
 */

export function KopierenKnopf({ betreff }: { betreff: string }) {
  async function kopieren() {
    try {
      await navigator.clipboard.writeText(betreff);
      toast.success("Betreff kopiert");
    } catch {
      toast.error("Kopieren fehlgeschlagen — bitte manuell markieren.");
    }
  }

  return (
    <button
      type="button"
      onClick={kopieren}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line-subtle px-3 py-1.5 text-[12px] font-medium text-ink-muted transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:border-ink-cream/30 hover:text-ink-cream"
    >
      <Copy size={13} aria-hidden />
      Betreff kopieren
    </button>
  );
}
