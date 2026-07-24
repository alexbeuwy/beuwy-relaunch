import type { Metadata } from "next";
import { BookingTool } from "@/components/BookingTool";

export const metadata: Metadata = {
  title: "Termin buchen — beuwy",
  description:
    "Systemgespräch buchen: 30 Minuten, Video oder Telefon, kostenlos. Sie sprechen mit dem, der baut.",
};

export default function TerminPage() {
  return (
    <div className="mx-auto max-w-[1120px] px-6 lg:px-10 pt-32 pb-24">
      <div className="max-w-[720px]">
        <h1 className="t-h2">
          Ein Gespräch, kein <em>Pitch</em>.
        </h1>
        <p className="t-body-lg mt-5 max-w-[560px]">
          Wählen Sie Anlass, Tag und Uhrzeit. Sie sprechen direkt mit
          Alexander Pütter — nicht mit einem Account-Manager.
        </p>
      </div>
      <div className="mt-12">
        <BookingTool />
      </div>
    </div>
  );
}
