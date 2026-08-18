import type { Metadata } from "next";
import { BookingTool } from "@/components/BookingTool";
import { getContent } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Systemgespräch buchen — beuwy",
  description:
    "30 Minuten, Video oder Telefon. Danach wissen Sie, wo Ihre Aufträge verloren gehen — den größten Hebel bekommen Sie schriftlich.",
};

/* Aufbau nach dem Seiten-System: Kopf (Wert des Gesprächs) → wo Aufträge
   verloren gehen (Pain-Recap) → was im Gespräch passiert (nimmt die Angst
   vorm getarnten Pitch) → Buchung. Sonst nichts. */
export default async function TerminPage() {
  const c = await getContent();
  const loss = [1, 2, 3].map((n) => c[`termin.loss${n}`]);
  const flow = [1, 2, 3].map((n) => c[`termin.flow${n}`]);

  return (
    <div className="mx-auto max-w-[1120px] px-6 lg:px-10 pt-32 pb-24">
      <div className="max-w-[720px]">
        <h1 className="t-h2">{c["termin.title"]}</h1>
        <p className="t-body-lg mt-5 max-w-[560px]">{c["termin.intro"]}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-x-14 gap-y-10 mt-12 max-w-[960px]">
        <div>
          <p className="t-label">{c["termin.loss_label"]}</p>
          <ul className="mt-5 space-y-4">
            {loss.map((l) => (
              <li key={l} className="t-body is-cream border-l-2 border-(--orange) pl-4">
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
                <span className="tnum t-data text-sky w-5 shrink-0">{i + 1}</span>
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
