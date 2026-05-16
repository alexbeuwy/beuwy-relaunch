import { Section } from "@/components/Section";
import { FunnelForm } from "@/components/FunnelForm";

export const metadata = {
  title: "Brief schicken — Wir antworten in < 6h | beuwy",
  description:
    "Fünf Schritte, ein Submit. Wir antworten in < 6h mit Termin, Festpreis oder ehrlichem Ja/Nein-Match.",
};

export default function AnfragePage() {
  return (
    <>
      <section className="section-band section-band-base pt-[140px] md:pt-[180px] pb-[40px]">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <span className="eyebrow">
            <span className="num">/</span> Brief · 2026
          </span>
          <h1
            className="h-display mt-7 text-[44px] sm:text-[64px] md:text-[80px] leading-[0.98] max-w-[1100px]"
            style={{ letterSpacing: "-0.025em" }}
          >
            Fünf Klicks. <em className="font-display italic">Ehrliche</em> Antwort in &lt; 6h.
          </h1>
          <p
            className="mt-7 max-w-[640px] text-[17px] leading-[1.55]"
            style={{ color: "var(--ink-muted)" }}
          >
            Wir nehmen 6 Projekte / Jahr. Q3/2026 hat noch 2 Slots. Such dir die nächst-passende
            Antwort aus — wir antworten mit Termin, Festpreis-Range oder klarem Nicht-passt.
          </p>
        </div>
      </section>

      <Section
        id="form"
        chapter="01 Form"
        title="Was wir brauchen"
        date="2026 / 01"
        tone="raised"
      >
        <FunnelForm />

        <div
          className="mt-[88px] grid md:grid-cols-12 gap-10 pt-10"
          style={{ borderTop: "1px solid var(--line-subtle)" }}
        >
          <div className="md:col-span-6">
            <p
              style={{
                color: "var(--ink-dim)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Was danach passiert
            </p>
            <ul className="mt-5 space-y-5">
              {[
                { n: "01", h: "< 6 h: Antwort", s: "Termin, Festpreis-Range oder ehrliches Nicht-passt." },
                { n: "02", h: "Tag 1–2: Frame Call", s: "30 Minuten Loom oder Live. Wir kommen mit einer Hypothese." },
                { n: "03", h: "Tag 3+: Live-Build", s: "Wenn es matcht, starten wir spätestens 14 Tage nach dem Frame." },
              ].map((row) => (
                <li key={row.n} className="flex items-start gap-4">
                  <span
                    className="font-display shrink-0"
                    style={{
                      fontSize: 22,
                      letterSpacing: "-0.02em",
                      color: "var(--ink-yellow)",
                      width: 28,
                      lineHeight: 1,
                    }}
                  >
                    {row.n}
                  </span>
                  <div>
                    <p style={{ color: "var(--ink-cream)", fontSize: 15, fontWeight: 510 }}>{row.h}</p>
                    <p
                      className="mt-1"
                      style={{ color: "var(--ink-muted)", fontSize: 13, lineHeight: "20px" }}
                    >
                      {row.s}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-6">
            <p
              style={{
                color: "var(--ink-dim)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Lieber direkt
            </p>
            <ul className="mt-5 space-y-3">
              <li>
                <a href="mailto:hi@beuwy.com" className="btn-link" style={{ fontSize: 15 }}>
                  hi@beuwy.com
                </a>
                <p
                  className="mt-1"
                  style={{ color: "var(--ink-muted)", fontSize: 13 }}
                >
                  Antwort Mo–Fr in &lt; 6 h, CET.
                </p>
              </li>
              <li>
                <a href="https://cal.com/beuwy" className="btn-link" style={{ fontSize: 15 }}>
                  cal.com/beuwy
                </a>
                <p
                  className="mt-1"
                  style={{ color: "var(--ink-muted)", fontSize: 13 }}
                >
                  30 Min Frame-Call. Slots Mi + Do.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
