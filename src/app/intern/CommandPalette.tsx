"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  CheckSquare,
  FileText,
  Kanban,
  Mail,
  MessageSquare,
  PenLine,
  Radio,
  Search,
  Sun,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { INTERN_SHELL_DEFAULTS } from "@/lib/texte/intern-shell";

/**
 * CommandPalette — globale Cmd/Ctrl+K-Palette für /intern (R5 Leaf U1).
 * Rendert zwei Dinge in einer Komponente: den dezenten "⌘K"-Chip für die
 * Kopfzeile (layout.tsx platziert <CommandPalette /> dort) UND den
 * ui/command-Dialog selbst — die Position im Baum ist für den Dialog
 * ohnehin egal (Radix portalt ihn), für den sichtbaren Chip aber genau
 * die Kopfzeile, deshalb beides zusammen statt zwei getrennter Dateien.
 *
 * Ziel-Liste ist bewusst hier lokal dupliziert und NICHT aus layout.tsx
 * importiert: layout.tsx ist eine Server-Komponente (cookies()/redirect()),
 * ein Import von dort in eine "use client"-Datei würde next/headers in
 * den Client-Bundle ziehen und den Build brechen. Icon-Zuordnung ist
 * identisch zur Sidebar (sh. layout.tsx), damit ein Ziel in beiden Listen
 * gleich aussieht.
 *
 * Navigationslabels + Aktionslabels bleiben hart im Code, nicht als
 * Studio-Keys: sie sind Struktur/IA wie die Sidebar-Labels selbst (siehe
 * Ausschluss-Regel im Kopfkommentar von src/lib/texte/intern-shell.ts) —
 * dieselben Ziele müssten sonst in zwei Quellen synchron gehalten werden.
 * Die Palette-„Chrome"-Texte (Platzhalter, Leerzustand, Titel/Beschreibung
 * für Screenreader, Chip-Label) sind dagegen echte, austauschbare Copy und
 * laufen über intern.shell.palette.* in intern-shell.ts — layout.tsx liest
 * sie serverseitig per getContent() (Supabase-Overrides, fail-open) und
 * reicht sie als texte-Prop durch, exakt das Muster aus
 * ErgebnisSchleuse.tsx (texte?: {...}, „use client" kann getContent()
 * selbst nicht awaiten). Ohne Prop gelten dieselben INTERN_SHELL_DEFAULTS.
 */

type Ziel = { href: string; label: string; Icon: LucideIcon };

const NAVIGATION_ZIELE: Ziel[] = [
  { href: "/intern", label: "Heute", Icon: Sun },
  { href: "/intern/pipeline", label: "Pipeline", Icon: Kanban },
  { href: "/intern/kontakte", label: "Kontakte", Icon: Users },
  { href: "/intern/aufgaben", label: "Aufgaben", Icon: CheckSquare },
  { href: "/intern/flows", label: "Flows", Icon: Workflow },
  { href: "/intern/einblick", label: "Einblick", Icon: Activity },
  { href: "/intern/tickets", label: "Tickets", Icon: MessageSquare },
  { href: "/intern/wochenbericht", label: "Wochenbericht", Icon: FileText },
  { href: "/intern/mails", label: "Mails", Icon: Mail },
  { href: "/studio", label: "Studio", Icon: PenLine },
  { href: "/os", label: "OS", Icon: Radio },
];

const AKTIONEN_ZIELE: Ziel[] = [
  { href: "/intern/pipeline?neu=1", label: "Deal anlegen", Icon: Kanban },
  { href: "/intern/kontakte?neu=1", label: "Kontakt anlegen", Icon: Users },
  { href: "/intern/aufgaben?neu=1", label: "Aufgabe anlegen", Icon: CheckSquare },
];

type PaletteTexte = {
  titel?: string;
  beschreibung?: string;
  platzhalter?: string;
  leer?: string;
  oeffnenLabel?: string;
};

export function CommandPalette({ texte }: { texte?: PaletteTexte } = {}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const titel = texte?.titel ?? INTERN_SHELL_DEFAULTS["intern.shell.palette.titel"];
  const beschreibung = texte?.beschreibung ?? INTERN_SHELL_DEFAULTS["intern.shell.palette.beschreibung"];
  const platzhalter = texte?.platzhalter ?? INTERN_SHELL_DEFAULTS["intern.shell.palette.platzhalter"];
  const leer = texte?.leer ?? INTERN_SHELL_DEFAULTS["intern.shell.palette.leer"];
  const oeffnenLabel = texte?.oeffnenLabel ?? INTERN_SHELL_DEFAULTS["intern.shell.palette.oeffnen_label"];

  useEffect(() => {
    function aufTaste(event: KeyboardEvent) {
      if ((event.key === "k" || event.key === "K") && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((offen) => !offen);
      }
    }
    document.addEventListener("keydown", aufTaste);
    return () => document.removeEventListener("keydown", aufTaste);
  }, []);

  const gehZu = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router],
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={oeffnenLabel}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-line-subtle px-2.5 py-1.5 text-ink-dim transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:border-line-medium hover:text-ink-muted"
      >
        <Search size={14} className="shrink-0" aria-hidden />
        <span className="font-mono text-[10.5px] tracking-wide">⌘K</span>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen} title={titel} description={beschreibung}>
        <CommandInput placeholder={platzhalter} />
        <CommandList>
          <CommandEmpty>{leer}</CommandEmpty>
          <CommandGroup heading="Navigation">
            {NAVIGATION_ZIELE.map((ziel) => (
              <CommandItem key={ziel.href} value={ziel.label} onSelect={() => gehZu(ziel.href)}>
                <ziel.Icon aria-hidden />
                <span>{ziel.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Aktionen">
            {AKTIONEN_ZIELE.map((ziel) => (
              <CommandItem key={ziel.href} value={ziel.label} onSelect={() => gehZu(ziel.href)}>
                <ziel.Icon aria-hidden />
                <span>{ziel.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
