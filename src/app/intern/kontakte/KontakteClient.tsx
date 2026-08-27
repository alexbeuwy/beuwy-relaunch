"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  Building2,
  ChevronDown,
  ChevronUp,
  Loader2,
  Mail,
  Phone,
  Plus,
  Search,
  SearchX,
  User,
  Users,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Reveal } from "@/components/Reveal";
import type { BwKontakt } from "@/lib/crm/db";
import type { VorschauEintrag, VorschauTyp } from "./page";

/**
 * KontakteClient — Client-Komponente für /intern/kontakte (LEAF U3, 27.08).
 * Neue Geschwisterdatei neben page.tsx (Muster: CommandPalette.tsx neben
 * layout.tsx aus Leaf U1) — alles, was useState/onClick/ui-dialog/ui-sheet
 * braucht, lebt hier; page.tsx bleibt reine Server-Komponente (Supabase-
 * Zugriff darf nie in den Client-Bundle).
 *
 * Trägt vier von fünf Auftragspunkten:
 *  1) Zeilenklick → ui/sheet von rechts (Kopf + letzte 5 Chronik-
 *     Einträge, nachgeladen per Server Action `vorschauAction` — kein
 *     N+1-Fetch beim Rendern der Liste, siehe page.tsx-Kopfkommentar).
 *  2) "Kontakt anlegen" auf ui/dialog mit ui/input; Formular behält
 *     action="/api/intern-kontakte" method="POST" als echten Fallback
 *     (funktioniert auch ohne JS/Hydration, Client-Komponenten werden
 *     weiterhin serverseitig zu echtem HTML gerendert) — onSubmit
 *     fängt bei vorhandenem JS ab, sendet per fetch, liest den
 *     ?fehler=-Code aus der gefolgten Redirect-URL und zeigt toast()
 *     aus sonner statt eines vollen Seitenwechsels.
 *  4) Kopfzeile klickbar sortierbar (Name/Firma/Seit, ChevronUp/Down).
 *  5) lucide durchgängig statt handgezeichneter SVGs.
 *
 * ui/select bleibt hier bewusst ungenutzt: alle Felder im Kontakt-Dialog
 * sind Freitext (Name/E-Mail/Telefon/Firma/Rolle), keins ist eine echte
 * Auswahl aus fester Menge — die Aufgaben-Seite (AufgabenClient.tsx)
 * setzt ui/select für ihren Kontakt-Picker ein, wo eine echte Auswahl
 * aus bestehenden Kontakten sinnvoll ist.
 *
 * `?neu=1` öffnet den Dialog beim Laden (Sprungziel, das die
 * CommandPalette aus Leaf U1 bereits verlinkt) und wird danach aus der
 * URL entfernt.
 */

const BTN_PRIMARY =
  "inline-flex shrink-0 items-center gap-1.5 rounded-full bg-akzent px-5 py-2.5 text-[13.5px] font-semibold text-ink-cream transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-akzent-hover active:scale-[0.98] cursor-pointer disabled:pointer-events-none disabled:opacity-60";
const BTN_QUIET =
  "inline-flex shrink-0 items-center rounded-full border border-line-subtle px-5 py-2.5 text-[13.5px] font-medium text-ink-muted transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:border-ink-cream/30 hover:text-ink-cream cursor-pointer";

/* Feste Domain-Vokabel für die Chronik-Typ-Badges in der Schnellansicht —
   identisch zu ART_LABEL in kontakte/[id]/page.tsx, bewusst dupliziert
   statt geteilt (siehe Konventions-Kommentar in intern-kontakte.ts). */
const ART_LABEL: Record<VorschauTyp, string> = {
  lead: "Anfrage",
  mail: "Mail",
  deal: "Deal",
  notiz: "Notiz",
  konto: "Konto",
};

type SortKey = "name" | "firma" | "seit";
type SortDir = "asc" | "desc";

type Texte = {
  neuButton: string;
  suchePlatzhalter: string;
  spalteName: string;
  spalteFirma: string;
  spalteRolle: string;
  spalteEmail: string;
  spalteSeit: string;
  keineTreffer: string;
  leerText: string;
  leerCta: string;
  dialogTitel: string;
  dialogBeschreibung: string;
  feldName: string;
  feldEmail: string;
  feldTelefon: string;
  feldFirma: string;
  feldRolle: string;
  dialogSpeichern: string;
  dialogAbbrechen: string;
  dialogErfolg: string;
  dialogFehlerAllgemein: string;
  fehlerEmail: string;
  sheetGanzeAkte: string;
  sheetLaedt: string;
  akteKontaktSeit: string;
  akteKeineTelefon: string;
  akteMailLabel: string;
  akteTelLabel: string;
  akteChronikTitel: string;
  akteChronikLeer: string;
};

/** Kurze relative Zeitangabe (deutsch) — dieselbe kleine Implementierung
 *  wie in page.tsx/[id]/page.tsx, bewusst dupliziert (Konvention dort). */
function zeitRelativ(iso: string): string {
  const dann = new Date(iso).getTime();
  if (Number.isNaN(dann)) return "–";
  const minuten = Math.round((Date.now() - dann) / 60_000);
  if (minuten < 1) return "gerade eben";
  if (minuten < 60) return `vor ${minuten} Min.`;
  const stunden = Math.round(minuten / 60);
  if (stunden < 24) return `vor ${stunden} Std.`;
  const tage = Math.round(stunden / 24);
  if (tage < 7) return `vor ${tage} Tag${tage === 1 ? "" : "en"}`;
  const wochen = Math.round(tage / 7);
  if (wochen < 5) return `vor ${wochen} Woche${wochen === 1 ? "" : "n"}`;
  const monate = Math.round(tage / 30);
  return `vor ${monate} Monat${monate === 1 ? "" : "en"}`;
}

function sucheText(k: BwKontakt): string {
  return [k.name, k.firma, k.rolle, k.email].filter(Boolean).join(" ").toLowerCase();
}

function sortiere(liste: BwKontakt[], key: SortKey, dir: SortDir): BwKontakt[] {
  const faktor = dir === "asc" ? 1 : -1;
  return [...liste].sort((a, b) => {
    if (key === "seit") {
      return (new Date(a.erstellt).getTime() - new Date(b.erstellt).getTime()) * faktor;
    }
    const av = key === "name" ? a.name || a.firma || a.email : a.firma || "";
    const bv = key === "name" ? b.name || b.firma || b.email : b.firma || "";
    return av.localeCompare(bv, "de") * faktor;
  });
}

function SortIndikator({ aktiv, dir }: { aktiv: boolean; dir: SortDir }) {
  if (!aktiv) return <span className="inline-block w-[13px]" aria-hidden />;
  return dir === "asc" ? (
    <ChevronUp size={13} className="shrink-0" aria-hidden />
  ) : (
    <ChevronDown size={13} className="shrink-0" aria-hidden />
  );
}

export function KontakteClient({
  kopf,
  kontakte,
  vorschauAction,
  neuOffen,
  texte,
}: {
  kopf: ReactNode;
  kontakte: BwKontakt[];
  vorschauAction: (id: string) => Promise<VorschauEintrag[]>;
  neuOffen: boolean;
  texte: Texte;
}) {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const [sheetId, setSheetId] = useState<string | null>(null);
  const [vorschauMap, setVorschauMap] = useState<Record<string, VorschauEintrag[] | "lade">>({});

  const [dialogOpen, setDialogOpen] = useState(neuOffen);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (neuOffen) {
      router.replace("/intern/kontakte");
    }
    // Nur beim Mount auswerten — ?neu=1 soll den Dialog genau einmal öffnen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gefiltert = useMemo(() => {
    const q = query.trim().toLowerCase();
    const basis = q ? kontakte.filter((k) => sucheText(k).includes(q)) : kontakte;
    return sortiere(basis, sortKey, sortDir);
  }, [kontakte, query, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function openSheet(id: string) {
    setSheetId(id);
    if (!(id in vorschauMap)) {
      setVorschauMap((prev) => ({ ...prev, [id]: "lade" }));
      vorschauAction(id)
        .then((eintraege) => setVorschauMap((prev) => ({ ...prev, [id]: eintraege })))
        .catch(() => setVorschauMap((prev) => ({ ...prev, [id]: [] })));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setSubmitting(true);
    try {
      const res = await fetch(form.action, { method: form.method, body: fd });
      const zielUrl = new URL(res.url);
      const fehlerCode = zielUrl.searchParams.get("fehler");
      if (fehlerCode) {
        toast.error(fehlerCode === "email" ? texte.fehlerEmail : texte.dialogFehlerAllgemein);
        return;
      }
      toast.success(texte.dialogErfolg);
      setDialogOpen(false);
      form.reset();
      router.push(zielUrl.pathname);
      router.refresh();
    } catch {
      toast.error(texte.dialogFehlerAllgemein);
    } finally {
      setSubmitting(false);
    }
  }

  const selected = sheetId ? kontakte.find((k) => k.id === sheetId) ?? null : null;
  const selectedVorschau = sheetId ? vorschauMap[sheetId] : undefined;

  const anlegenDialog = (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <button type="button" className={BTN_PRIMARY}>
          <Plus size={15} aria-hidden />
          {texte.neuButton}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{texte.dialogTitel}</DialogTitle>
          <DialogDescription>{texte.dialogBeschreibung}</DialogDescription>
        </DialogHeader>
        <form action="/api/intern-kontakte" method="POST" onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input type="hidden" name="aktion" value="anlegen" />
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="kontakt-name">{texte.feldName}</Label>
            <Input id="kontakt-name" name="name" autoComplete="name" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="kontakt-email">{texte.feldEmail}</Label>
            <Input id="kontakt-email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="kontakt-telefon">{texte.feldTelefon}</Label>
            <Input id="kontakt-telefon" name="telefon" type="tel" autoComplete="tel" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="kontakt-firma">{texte.feldFirma}</Label>
            <Input id="kontakt-firma" name="firma" autoComplete="organization" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="kontakt-rolle">{texte.feldRolle}</Label>
            <Input id="kontakt-rolle" name="rolle" autoComplete="organization-title" />
          </div>
          <DialogFooter>
            <button type="button" onClick={() => setDialogOpen(false)} className={BTN_QUIET}>
              {texte.dialogAbbrechen}
            </button>
            <button type="submit" disabled={submitting} className={BTN_PRIMARY}>
              {submitting && <Loader2 size={14} className="animate-spin" aria-hidden />}
              {texte.dialogSpeichern}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          {kopf}
          {anlegenDialog}
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-8">
          <div className="relative max-w-[360px]">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-dim">
              <Search size={15} aria-hidden />
            </span>
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={texte.suchePlatzhalter}
              className="pl-9"
              aria-label={texte.suchePlatzhalter}
            />
          </div>

          {kontakte.length === 0 ? (
            <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-line-subtle px-8 py-16 text-center">
              <Users size={32} className="text-ink-dim" aria-hidden />
              <p className="t-body mt-4 max-w-[26rem]">{texte.leerText}</p>
              <button type="button" onClick={() => setDialogOpen(true)} className={`${BTN_PRIMARY} mt-5`}>
                <Plus size={15} aria-hidden />
                {texte.leerCta}
              </button>
            </div>
          ) : gefiltert.length === 0 ? (
            <div className="mt-5 flex flex-col items-center rounded-2xl border border-dashed border-line-subtle px-8 py-12 text-center">
              <SearchX size={26} className="text-ink-dim" aria-hidden />
              <p className="t-small mt-3 !text-ink-dim">{texte.keineTreffer}</p>
            </div>
          ) : (
            <>
              <div className="mt-5 hidden overflow-x-auto rounded-2xl border border-line-subtle lg:block">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-line-subtle bg-bg-elevated">
                      <th className="px-4 py-3 font-medium">
                        <button
                          type="button"
                          onClick={() => toggleSort("name")}
                          className="t-label inline-flex items-center gap-1 transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream"
                        >
                          {texte.spalteName}
                          <SortIndikator aktiv={sortKey === "name"} dir={sortDir} />
                        </button>
                      </th>
                      <th className="px-4 py-3 font-medium">
                        <button
                          type="button"
                          onClick={() => toggleSort("firma")}
                          className="t-label inline-flex items-center gap-1 transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream"
                        >
                          {texte.spalteFirma}
                          <SortIndikator aktiv={sortKey === "firma"} dir={sortDir} />
                        </button>
                      </th>
                      <th className="t-label px-4 py-3 font-medium">{texte.spalteRolle}</th>
                      <th className="t-label px-4 py-3 font-medium">{texte.spalteEmail}</th>
                      <th className="px-4 py-3 text-right font-medium">
                        <button
                          type="button"
                          onClick={() => toggleSort("seit")}
                          className="t-label inline-flex flex-row-reverse items-center gap-1 transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream"
                        >
                          {texte.spalteSeit}
                          <SortIndikator aktiv={sortKey === "seit"} dir={sortDir} />
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {gefiltert.map((k) => (
                      <tr
                        key={k.id}
                        onClick={() => openSheet(k.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            openSheet(k.id);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label={k.name || k.email}
                        className="cursor-pointer border-b border-line-subtle transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) last:border-0 hover:bg-bg-elevated focus-visible:bg-bg-elevated focus-visible:outline-none"
                      >
                        <td className="px-4 py-3">
                          <span className="truncate text-[13.5px] font-medium text-ink-cream">{k.name || "Ohne Namen"}</span>
                        </td>
                        <td className="px-4 py-3 text-[13px] text-ink-muted">{k.firma || "–"}</td>
                        <td className="px-4 py-3 text-[13px] text-ink-muted">{k.rolle || "–"}</td>
                        <td className="px-4 py-3 text-[13px] text-ink-muted">{k.email}</td>
                        <td className="t-data tnum px-4 py-3 text-right !text-ink-dim">{zeitRelativ(k.erstellt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-5 flex flex-col gap-3 lg:hidden">
                {gefiltert.map((k) => (
                  <div
                    key={k.id}
                    onClick={() => openSheet(k.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openSheet(k.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={k.name || k.email}
                    className="cursor-pointer rounded-xl border border-line-subtle bg-white p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="truncate text-[14px] font-semibold text-ink-cream">{k.name || "Ohne Namen"}</p>
                      <span className="t-data tnum shrink-0 !text-ink-dim">{zeitRelativ(k.erstellt)}</span>
                    </div>
                    {(k.firma || k.rolle) && (
                      <p className="mt-1 truncate text-[12.5px] text-ink-muted">
                        {[k.firma, k.rolle].filter(Boolean).join(" · ")}
                      </p>
                    )}
                    <p className="mt-1.5 truncate text-[12.5px] text-ink-dim">{k.email}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </Reveal>

      <Sheet open={sheetId !== null} onOpenChange={(open) => !open && setSheetId(null)}>
        <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{selected.name || selected.email}</SheetTitle>
                {(selected.firma || selected.rolle) && (
                  <SheetDescription>{[selected.firma, selected.rolle].filter(Boolean).join(" · ")}</SheetDescription>
                )}
              </SheetHeader>

              <div className="flex-1 overflow-y-auto px-4 pb-4">
                <div className="flex flex-col gap-2">
                  <a
                    href={`mailto:${selected.email}`}
                    aria-label={texte.akteMailLabel}
                    className="inline-flex items-center gap-2 text-[13px] text-ink-muted transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream"
                  >
                    <Mail size={14} className="shrink-0" aria-hidden />
                    {selected.email || "–"}
                  </a>
                  {selected.telefon ? (
                    <a
                      href={`tel:${selected.telefon}`}
                      aria-label={texte.akteTelLabel}
                      className="inline-flex items-center gap-2 text-[13px] text-ink-muted transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream"
                    >
                      <Phone size={14} className="shrink-0" aria-hidden />
                      {selected.telefon}
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-[13px] text-ink-dim">
                      <Phone size={14} className="shrink-0" aria-hidden />
                      {texte.akteKeineTelefon}
                    </span>
                  )}
                  {selected.firma && (
                    <span className="inline-flex items-center gap-2 text-[13px] text-ink-muted">
                      <Building2 size={14} className="shrink-0" aria-hidden />
                      {selected.firma}
                    </span>
                  )}
                  {selected.rolle && (
                    <span className="inline-flex items-center gap-2 text-[13px] text-ink-muted">
                      <User size={14} className="shrink-0" aria-hidden />
                      {selected.rolle}
                    </span>
                  )}
                  <span className="t-data tnum mt-1 !text-ink-dim">
                    {texte.akteKontaktSeit} {zeitRelativ(selected.erstellt)}
                  </span>
                </div>

                <div className="mt-6">
                  <p className="t-label">{texte.akteChronikTitel}</p>
                  <div className="mt-3">
                    {selectedVorschau === "lade" || selectedVorschau === undefined ? (
                      <div className="flex flex-col gap-3" aria-live="polite" aria-busy="true">
                        <span className="sr-only">{texte.sheetLaedt}</span>
                        <Skeleton className="h-12 w-full rounded-lg" />
                        <Skeleton className="h-12 w-full rounded-lg" />
                        <Skeleton className="h-12 w-full rounded-lg" />
                      </div>
                    ) : selectedVorschau.length === 0 ? (
                      <p className="t-small !text-ink-dim py-1.5">{texte.akteChronikLeer}</p>
                    ) : (
                      selectedVorschau.map((e) => (
                        <div key={e.key} className="border-b border-line-subtle py-3 last:border-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="t-data tnum w-14 shrink-0 !text-ink-dim">{zeitRelativ(e.erstellt)}</span>
                            <span className="inline-flex shrink-0 items-center rounded-full border border-line-subtle bg-bg-elevated px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.04em] text-ink-muted">
                              {ART_LABEL[e.typ]}
                            </span>
                            <p className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink-cream">{e.titel}</p>
                          </div>
                          {e.text && <p className="t-small mt-1 line-clamp-2 pl-16">{e.text}</p>}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <SheetFooter>
                <Link
                  href={`/intern/kontakte/${selected.id}`}
                  onClick={() => setSheetId(null)}
                  className={`${BTN_PRIMARY} justify-center`}
                >
                  {texte.sheetGanzeAkte}
                </Link>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
