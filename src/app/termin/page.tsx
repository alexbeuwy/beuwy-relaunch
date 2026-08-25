import type { Metadata } from "next";
import Link from "next/link";
import { BookingTool } from "@/components/BookingTool";
import { getContent } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Systemgespräch buchen — beuwy",
  description:
    "30 Minuten, Video oder Telefon. Danach wissen Sie, wo Ihre Aufträge verloren gehen — den größten Hebel bekommen Sie schriftlich.",
};

/* Aufbau nach dem Seiten-System: Hinweis-Kopf (empfohlener Weg /anfrage)
   → Kopf (Wert des Gesprächs) → wo Aufträge verloren gehen (Pain-Recap)
   → was im Gespräch passiert (nimmt die Angst vorm getarnten Pitch) →
   Direktbuchung. Die Vorqualifizierung ersetzt die Direktbuchung nicht —
   sie bleibt darunter voll funktionsfähig, BookingTool unangetastet. */
export default async function TerminPage() {
  const c = await getContent();
  const loss = [1, 2, 3].map((n) => c[`termin.loss${n}`]);
  const flow = [1, 2, 3].map((n) => c[`termin.flow${n}`]);

  return (
    <div className="mx-auto max-w-[1120px] px-6 lg:px-10 pt-32 pb-24">
      {/* ── Schlanker Hinweis-Kopf: empfohlener Weg ist /anfrage ─────── */}
      <div className="mb-10 flex flex-wrap items-baseline gap-x-3 gap-y-2 border-b border-line-subtle pb-8 max-w-[860px]">
        <span className="t-label !text-ink-yellow shrink-0">Empfohlener Weg</span>
        <p className="t-small">
          Der kürzeste Weg zu einem passenden Termin führt über die kurze
          Vorqualifizierung unter{" "}
          <Link
            href="/anfrage"
            className="font-medium text-ink-cream underline decoration-line-medium underline-offset-4 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] hover:text-ink-yellow"
          >
            /anfrage
          </Link>{" "}
          — danach wissen wir, ob und wie wir zusammenpassen. Wer direkt buchen
          will, findet die Terminauswahl unten weiterhin funktionsfähig.
        </p>
      </div>

      <div className="max-w-[720px]">
        <h1 className="t-display">{c["termin.title"]}</h1>
        <p className="t-body-lg mt-5 max-w-[560px]">{c["termin.intro"]}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-x-14 gap-y-10 mt-12 max-w-[960px]">
        <div>
          <p className="t-label">{c["termin.loss_label"]}</p>
          <ul className="mt-5 space-y-4">
            {loss.map((l) => (
              <li key={l} className="t-body is-cream border-l-2 border-ink-yellow pl-4">
                {l}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="t-label">{c["termin.flow_label"]}</p>
          <ol className="mt-5 space-y-4">
            {flow.map((f, i) => (
              <li key={f} className="flex items-baseline gap-4">
                <span className="tnum t-data text-ink-yellow w-5 shrink-0">{i + 1}</span>
                <span className="t-body is-cream">{f}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-14">
        <BookingTool />
      </div>
    </div>
  );
}
