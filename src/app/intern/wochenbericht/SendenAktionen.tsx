"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * SendenAktionen — zwei kleine Client-Bausteine für /intern/wochenbericht
 * (CRM-UX-Politur Leaf U4), beide ohne eigenes <form>: sie greifen auf das
 * umschließende, serverseitig gerenderte Formular in page.tsx zu (GET auf
 * /intern/wochenbericht für "Vorschau aktualisieren", zwei benannte
 * Submit-Buttons mit formMethod="post"/formAction="/api/intern-
 * wochenbericht" für senden/protokollieren — unverändert aus dem
 * bestehenden Leaf G7).
 *
 * SendenButton ersetzt nur den "Jetzt senden"-Button: er bleibt ein
 * echter type="submit"-Button mit denselben formMethod/formAction/name/
 * value-Attributen wie zuvor (No-JS-Fallback: ohne JavaScript sendet ein
 * Klick sofort, exakt das alte Verhalten). Mit JavaScript verhindert
 * onClick das native Submit und öffnet erst einen Bestätigungs-Dialog
 * (ui/dialog); "Ja, jetzt senden" löst dieselbe native Formular-
 * Übermittlung über HTMLFormElement.requestSubmit(this Button) aus —
 * requestSubmit mit einem Submitter respektiert dessen formAction/
 * formMethod/name/value genau wie ein echter Klick, ruft aber KEINEN
 * weiteren Klick-Handler auf, also keine Endlosschleife zurück in den
 * Dialog.
 *
 * StatusToast feuert einmalig beim Mounten einen Toast passend zum
 * ?status=…-Parameter, den /api/intern-wochenbericht per 303-Redirect
 * anhängt — der bestehende Status-Banner in page.tsx bleibt als
 * dauerhafter Text zusätzlich sichtbar, der Toast ist die zusätzliche
 * kurze Rückmeldung.
 */

export function SendenButton({
  label,
  dialogTitel,
  dialogText,
  bestaetigenLabel,
  abbrechenLabel,
  className,
}: {
  label: string;
  dialogTitel: string;
  dialogText: string;
  bestaetigenLabel: string;
  abbrechenLabel: string;
  className: string;
}) {
  const [offen, setOffen] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <button
        ref={btnRef}
        type="submit"
        formMethod="post"
        formAction="/api/intern-wochenbericht"
        name="aktion"
        value="senden"
        onClick={(e) => {
          e.preventDefault();
          formRef.current = e.currentTarget.form;
          setOffen(true);
        }}
        className={className}
      >
        {label}
      </button>

      <Dialog open={offen} onOpenChange={setOffen}>
        <DialogContent
          showCloseButton={false}
          className="w-full max-w-sm gap-0 rounded-[18px] border border-line-medium bg-white p-5 shadow-[0_24px_60px_-24px_rgba(20,20,18,0.45)] sm:max-w-sm"
        >
          <DialogHeader className="text-left">
            <DialogTitle className="text-[15px] font-semibold text-ink-cream">{dialogTitel}</DialogTitle>
            <DialogDescription className="mt-1 text-[12.5px] text-ink-muted">{dialogText}</DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setOffen(false);
                formRef.current?.requestSubmit(btnRef.current ?? undefined);
              }}
              className="rounded-full bg-akzent px-5 py-2.5 text-[13.5px] font-semibold text-ink-cream transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-akzent-hover"
            >
              {bestaetigenLabel}
            </button>
            <DialogClose asChild>
              <button
                type="button"
                className="rounded-full border border-line-subtle px-5 py-2.5 text-[13.5px] font-medium text-ink-muted transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:border-ink-cream/30 hover:text-ink-cream"
              >
                {abbrechenLabel}
              </button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function StatusToast({
  status,
  gesendetText,
  demoText,
  fehlerText,
}: {
  status: string | null;
  gesendetText: string;
  demoText: string;
  fehlerText: string;
}) {
  const gezeigt = useRef(false);

  useEffect(() => {
    if (!status || gezeigt.current) return;
    gezeigt.current = true;
    if (status === "gesendet") toast.success(gesendetText);
    else if (status === "demo") toast.info(demoText);
    else if (status === "fehler") toast.error(fehlerText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return null;
}
