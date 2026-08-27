"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

/**
 * KontoAuswahl — Konto-Wahl für /intern/wochenbericht als ui/select statt
 * der bisherigen Sidebar-Linkliste (CRM-UX-Politur Leaf U4). Ein Wechsel
 * navigiert per router.push() auf dieselbe ?konto=…-Route wie zuvor die
 * <Link>-Liste — die Server-Komponente (page.tsx) lädt Vorschau/Stats für
 * das neue Konto exakt wie gehabt, nur der Auswahl-Mechanismus ist jetzt
 * ein Dropdown statt einer Liste (kompakter bei vielen Konten). Wie bei
 * KontoListe.tsx in /intern/tickets bringt Radix Select ohnehin
 * JavaScript mit — ein No-JS-Fallback ist hier kein Ziel.
 */

export type KontoOption = { email: string; label: string; statusLabel: string };

export function KontoAuswahl({
  konten,
  ausgewaehltEmail,
  platzhalter,
}: {
  konten: KontoOption[];
  ausgewaehltEmail: string | null;
  platzhalter: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function waehlen(email: string) {
    if (email === ausgewaehltEmail) return;
    startTransition(() => {
      router.push(`/intern/wochenbericht?konto=${encodeURIComponent(email)}`);
    });
  }

  return (
    <Select value={ausgewaehltEmail ?? undefined} onValueChange={waehlen} disabled={isPending}>
      <SelectTrigger className="w-full bg-white">
        <SelectValue placeholder={platzhalter} />
      </SelectTrigger>
      <SelectContent>
        {konten.map((k) => (
          <SelectItem key={k.email} value={k.email}>
            <span className="flex w-full min-w-0 items-center justify-between gap-3">
              <span className="truncate">{k.label}</span>
              <span className="shrink-0 text-[11px] text-ink-dim">{k.statusLabel}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
