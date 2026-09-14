"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * ThreadVerlauf — die Antwort-Blasen im Ticket-Thread von /intern/tickets
 * (CRM-UX-Politur Leaf U4). Jede Blase blendet sanft mit leichtem
 * Versatz von unten ein, im 40ms-Stagger (Design-Direktive
 * "--duration-stagger" in globals.css) — bei useReducedMotion() entfällt
 * jede Transform-Animation, die Blasen erscheinen sofort.
 *
 * zeitRelativ() ist bewusst wie an mehreren anderen Stellen im Repo
 * dupliziert statt importiert (siehe Kommentar in page.tsx) — dieser
 * Client-Baustein braucht sie unabhängig von der Server-Komponente.
 */

type AntwortZeile = { id: number; erstellt: string; von: string; text: string };

const EASE_SMOOTH_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

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

export function ThreadVerlauf({ antworten, leerText }: { antworten: AntwortZeile[]; leerText: string }) {
  const reduceMotion = useReducedMotion();

  if (antworten.length === 0) {
    return <p className="t-small !text-ink-dim">{leerText}</p>;
  }

  return (
    <div className="flex flex-col gap-2.5">
      {antworten.map((antwort, i) => {
        const vonBeuwy = antwort.von === "beuwy";
        return (
          <motion.div
            key={antwort.id}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: EASE_SMOOTH_OUT, delay: reduceMotion ? 0 : i * 0.04 }}
            className={`flex ${vonBeuwy ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-3.5 py-2.5 ${
                vonBeuwy ? "bg-akzent-wash" : "border border-line-subtle bg-bg-elevated"
              }`}
            >
              <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-ink-cream">{antwort.text}</p>
              <p className="t-data tnum mt-1 !text-ink-dim">
                {vonBeuwy ? "beuwy" : "Kunde"} · {zeitRelativ(antwort.erstellt)}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
