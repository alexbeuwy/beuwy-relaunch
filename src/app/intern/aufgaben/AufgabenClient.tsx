"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AlertTriangle, CircleCheckBig, Loader2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Reveal } from "@/components/Reveal";

/**
 * AufgabenClient — Client-Komponente für /intern/aufgaben (LEAF U3, 27.08).
 * Neue Geschwisterdatei neben page.tsx (Muster: CommandPalette.tsx neben
 * layout.tsx aus Leaf U1 bzw. KontakteClient.tsx neben kontakte/page.tsx
 * in diesem selben Leaf) — Dialog-State, Checkbox-Mikro-Moment (motion/
 * react) und der fetch+toast-Flow brauchen zwingend eine Client-Komponente.
 *
 * Trägt:
 *  2) "Aufgabe anlegen" löst die bisher permanent sichtbare Schnell-Anlage-
 *     Leiste durch einen Button + ui/dialog ab (konsistent zu Kontakte und
 *     zum bereits bestehenden "?neu=1"-Sprungziel der CommandPalette aus
 *     Leaf U1) — Titel/Fällig als ui/input, Kontakt als ui/select
 *     (bestehende Kontakte statt Freitext-E-Mail — echte Auswahl aus fester
 *     Menge, siehe Kommentar in KontakteClient.tsx zur ui/select-Aufteilung
 *     zwischen den beiden Dialogen). Formular behält action/method als
 *     echten No-JS-Fallback für Titel + Fällig (Pflichtfelder); die
 *     Select-Kontaktzuordnung braucht JS (Radix Select nimmt nicht nativ
 *     an FormData teil) — vertretbar, weil das Feld optional ist und der
 *     Dialog selbst ohnehin erst mit JS aufgeht (Radix-Trigger).
 *  3) Checkbox-Mikro-Moment: Klick → Checkmark zeichnet sich per
 *     motion.path/pathLength (SVG stroke-dashoffset unter der Haube),
 *     fast (0.25s) + --ease-bounce; erst wenn die Zeichnung fertig ist
 *     (onAnimationComplete), verlässt die ganze Zeile die Liste
 *     (AnimatePresence-exit, quick/0.15s, --ease-smooth-out — kürzer als
 *     die 0.25s "Öffnen"-Zeichnung, siehe transitions-dev-Disziplin:
 *     Exit kürzer als Enter). Optimistisch entfernt, echte Mutation läuft
 *     im Hintergrund gegen /api/intern-aufgaben — schlägt sie fehl, kehrt
 *     die Zeile zurück (Toast). useReducedMotion() schaltet Transform-
 *     Animationen (Zeichnung + Höhen-/Layout-Kollaps) hart ab.
 *  5) lucide durchgängig (AlertTriangle für die Überfällig-Gruppe u. a.).
 *
 * Die "Erledigt (letzte 7 Tage)"-Historie bleibt bewusst in page.tsx
 * (Server-Komponente, natives <details>, kein Mikro-Moment gefordert) —
 * nur die drei offenen Gruppen brauchen die animierte Liste hier.
 */

const BTN_PRIMARY =
  "inline-flex shrink-0 items-center gap-1.5 rounded-full bg-akzent px-5 py-2.5 text-[13.5px] font-semibold text-ink-cream transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-akzent-hover active:scale-[0.98] cursor-pointer disabled:pointer-events-none disabled:opacity-60";
const BTN_QUIET =
  "inline-flex shrink-0 items-center rounded-full border border-line-subtle px-5 py-2.5 text-[13.5px] font-medium text-ink-muted transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:border-ink-cream/30 hover:text-ink-cream cursor-pointer";

const KEIN_KONTAKT = "__kein__";
const TAG_MS = 86_400_000;

export type AufgabeItem = { id: string; titel: string; faelligAm: string | null; bezug: string | null };
export type KontaktOption = { email: string; label: string };

type Texte = {
  trigger: string;
  dialogTitel: string;
  dialogBeschreibung: string;
  titelLabel: string;
  titelPlatzhalter: string;
  faelligLabelText: string;
  kontaktLabel: string;
  kontaktKein: string;
  kontaktSelectPlatzhalter: string;
  dialogAbbrechen: string;
  button: string;
  dialogErfolg: string;
  dialogFehlerAllgemein: string;
  fehlerTitel: string;
  fehlerEmail: string;
  checkFehler: string;
  gruppeUeberfaellig: string;
  gruppeHeuteMorgen: string;
  gruppeSpaeter: string;
  leerUeberfaellig: string;
  leerHeuteMorgen: string;
  leerSpaeter: string;
  leerGesamt: string;
};

/** "Heute fällig" / "Morgen fällig" / "Überfällig seit X Tagen" / TT.MM. —
 *  dieselbe kleine Implementierung wie in page.tsx, bewusst dupliziert
 *  (Konvention dieses Moduls, siehe dortige Kommentare). */
function faelligLabel(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const heuteTag = new Date().toISOString().slice(0, 10);
  const faelligTag = d.toISOString().slice(0, 10);
  if (faelligTag === heuteTag) return "Heute fällig";
  const diffTage = Math.round((new Date(heuteTag).getTime() - new Date(faelligTag).getTime()) / TAG_MS);
  if (diffTage === -1) return "Morgen fällig";
  if (diffTage > 0) return `Überfällig seit ${diffTage} Tag${diffTage === 1 ? "" : "en"}`;
  return d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
}

function OffeneZeile({
  aufgabe,
  akzentDestruktiv,
  onFertig,
  reduceMotion,
}: {
  aufgabe: AufgabeItem;
  akzentDestruktiv?: boolean;
  onFertig: (id: string) => void;
  reduceMotion: boolean;
}) {
  const [checking, setChecking] = useState(false);

  return (
    <motion.div
      layout={!reduceMotion}
      initial={false}
      exit={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, height: 0, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }
      }
      transition={{ duration: reduceMotion ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-3 overflow-hidden border-b border-line-subtle py-3 last:border-0"
    >
      <button
        type="button"
        disabled={checking}
        onClick={() => setChecking(true)}
        aria-label={`„${aufgabe.titel}“ als erledigt markieren`}
        className="grid h-5 w-5 shrink-0 place-items-center rounded-[5px] border border-line-medium text-akzent transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:border-ink-cream hover:bg-akzent-wash disabled:cursor-default"
      >
        {checking && (
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden>
            <motion.path
              d="M3 7.2l2.8 2.8L11 4"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.25, ease: [0.34, 1.36, 0.64, 1] }}
              onAnimationComplete={() => onFertig(aufgabe.id)}
            />
          </svg>
        )}
      </button>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13.5px] font-medium text-ink-cream">{aufgabe.titel}</p>
        {(aufgabe.faelligAm || aufgabe.bezug) && (
          <div className="mt-0.5 flex items-center gap-2">
            {aufgabe.faelligAm && (
              <span className={`t-data tnum ${akzentDestruktiv ? "!text-destructive" : "!text-ink-dim"}`}>
                {faelligLabel(aufgabe.faelligAm)}
              </span>
            )}
            {aufgabe.bezug && (
              <span className="inline-flex shrink-0 items-center rounded-full border border-line-subtle bg-bg-elevated px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.04em] text-ink-muted">
                {aufgabe.bezug}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function GruppenPanel({
  titel,
  items,
  akzent = false,
  leerText,
  onFertig,
  reduceMotion,
}: {
  titel: string;
  items: AufgabeItem[];
  akzent?: boolean;
  leerText: string;
  onFertig: (id: string) => void;
  reduceMotion: boolean;
}) {
  return (
    <section className="rounded-2xl border border-line-subtle p-6">
      <div className="flex items-center gap-2.5">
        {akzent && <AlertTriangle size={14} className="shrink-0 text-destructive" aria-hidden />}
        <p className={`t-label ${akzent ? "!text-destructive" : ""}`}>{titel}</p>
        <span className="t-data tnum !text-ink-dim">{items.length}</span>
      </div>
      <div className="mt-3">
        {items.length === 0 ? (
          <p className="t-small !text-ink-dim py-1.5">{leerText}</p>
        ) : (
          <AnimatePresence initial={false}>
            {items.map((a) => (
              <OffeneZeile key={a.id} aufgabe={a} akzentDestruktiv={akzent} onFertig={onFertig} reduceMotion={reduceMotion} />
            ))}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}

export function AufgabenClient({
  kopf,
  gruppen,
  kontakte,
  neuOffen,
  texte,
}: {
  kopf: ReactNode;
  gruppen: { ueberfaellig: AufgabeItem[]; heuteMorgen: AufgabeItem[]; spaeter: AufgabeItem[] };
  kontakte: KontaktOption[];
  neuOffen: boolean;
  texte: Texte;
}) {
  const router = useRouter();
  const reduceMotion = useReducedMotion() ?? false;

  const [entferntIds, setEntferntIds] = useState<Set<string>>(new Set());
  const [dialogOpen, setDialogOpen] = useState(neuOffen);
  const [submitting, setSubmitting] = useState(false);
  const [kontaktEmail, setKontaktEmail] = useState(KEIN_KONTAKT);

  useEffect(() => {
    if (neuOffen) {
      router.replace("/intern/aufgaben");
    }
    // Nur beim Mount auswerten — ?neu=1 soll den Dialog genau einmal öffnen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ueberfaellig = gruppen.ueberfaellig.filter((a) => !entferntIds.has(a.id));
  const heuteMorgen = gruppen.heuteMorgen.filter((a) => !entferntIds.has(a.id));
  const spaeter = gruppen.spaeter.filter((a) => !entferntIds.has(a.id));
  const gesamt = ueberfaellig.length + heuteMorgen.length + spaeter.length;

  async function erledigenFetch(id: string) {
    const fd = new FormData();
    fd.set("aktion", "erledigen");
    fd.set("id", id);
    fd.set("zurueck", "/intern/aufgaben");
    try {
      const res = await fetch("/api/intern-aufgaben", { method: "POST", body: fd });
      if (!res.ok) throw new Error("fehlgeschlagen");
      router.refresh();
    } catch {
      // Ehrlich statt lautlos falsch: Zeile kehrt zurück, Toast erklärt warum.
      setEntferntIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      toast.error(texte.checkFehler);
    }
  }

  function onFertig(id: string) {
    setEntferntIds((prev) => new Set(prev).add(id));
    void erledigenFetch(id);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set("kontaktEmail", kontaktEmail === KEIN_KONTAKT ? "" : kontaktEmail);
    setSubmitting(true);
    try {
      const res = await fetch(form.action, { method: form.method, body: fd });
      const zielUrl = new URL(res.url);
      const fehlerCode = zielUrl.searchParams.get("fehler");
      if (fehlerCode) {
        const meldung: Record<string, string> = { titel: texte.fehlerTitel, email: texte.fehlerEmail };
        toast.error(meldung[fehlerCode] ?? texte.dialogFehlerAllgemein);
        return;
      }
      toast.success(texte.dialogErfolg);
      setDialogOpen(false);
      form.reset();
      setKontaktEmail(KEIN_KONTAKT);
      router.push(zielUrl.pathname);
      router.refresh();
    } catch {
      toast.error(texte.dialogFehlerAllgemein);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          {kopf}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <button type="button" className={BTN_PRIMARY}>
                <Plus size={15} aria-hidden />
                {texte.trigger}
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{texte.dialogTitel}</DialogTitle>
                <DialogDescription>{texte.dialogBeschreibung}</DialogDescription>
              </DialogHeader>
              <form action="/api/intern-aufgaben" method="POST" onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input type="hidden" name="aktion" value="anlegen" />
                <input type="hidden" name="zurueck" value="/intern/aufgaben" />
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="aufgabe-titel">{texte.titelLabel}</Label>
                  <Input id="aufgabe-titel" name="titel" required maxLength={300} placeholder={texte.titelPlatzhalter} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="aufgabe-faellig">{texte.faelligLabelText}</Label>
                  <Input id="aufgabe-faellig" name="faellig" type="date" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="aufgabe-kontakt">{texte.kontaktLabel}</Label>
                  <Select value={kontaktEmail} onValueChange={setKontaktEmail}>
                    <SelectTrigger id="aufgabe-kontakt" className="w-full">
                      <SelectValue placeholder={texte.kontaktSelectPlatzhalter} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={KEIN_KONTAKT}>{texte.kontaktKein}</SelectItem>
                      {kontakte.map((k) => (
                        <SelectItem key={k.email} value={k.email}>
                          {k.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <button type="button" onClick={() => setDialogOpen(false)} className={BTN_QUIET}>
                    {texte.dialogAbbrechen}
                  </button>
                  <button type="submit" disabled={submitting} className={BTN_PRIMARY}>
                    {submitting && <Loader2 size={14} className="animate-spin" aria-hidden />}
                    {texte.button}
                  </button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </Reveal>

      <Reveal delay={80}>
        {gesamt === 0 ? (
          <div className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-line-subtle px-8 py-14 text-center">
            <CircleCheckBig size={30} className="text-ink-dim" aria-hidden />
            <p className="t-body mt-4 max-w-[26rem]">{texte.leerGesamt}</p>
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-5">
            <GruppenPanel
              titel={texte.gruppeUeberfaellig}
              items={ueberfaellig}
              akzent
              leerText={texte.leerUeberfaellig}
              onFertig={onFertig}
              reduceMotion={reduceMotion}
            />
            <GruppenPanel
              titel={texte.gruppeHeuteMorgen}
              items={heuteMorgen}
              leerText={texte.leerHeuteMorgen}
              onFertig={onFertig}
              reduceMotion={reduceMotion}
            />
            <GruppenPanel
              titel={texte.gruppeSpaeter}
              items={spaeter}
              leerText={texte.leerSpaeter}
              onFertig={onFertig}
              reduceMotion={reduceMotion}
            />
          </div>
        )}
      </Reveal>
    </>
  );
}
