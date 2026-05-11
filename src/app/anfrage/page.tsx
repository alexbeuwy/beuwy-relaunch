import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "Brief schicken — Wir antworten in < 6h | beuwy",
  description:
    "Drei Felder, ein Submit. Wir antworten in < 6h mit Termin, Festpreis oder ehrlichem Ja/Nein-Match.",
};

export default function AnfragePage() {
  return (
    <>
      <section className="pt-[140px] md:pt-[180px] pb-[40px]">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <Reveal>
            <span className="eyebrow"><span className="num">/</span> Brief · 2026</span>
          </Reveal>
          <Reveal delay={80}>
            <h1
              className="h-display mt-7 text-[44px] sm:text-[64px] md:text-[88px] leading-[0.98] max-w-[1100px]"
              style={{ letterSpacing: "-0.025em" }}
            >
              Drei Felder. Ein Submit.{" "}
              <em className="font-display italic">Ehrliche</em> Antwort.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p
              className="mt-7 max-w-[640px] text-[17px] leading-[1.55]"
              style={{ color: "var(--ink-muted)" }}
            >
              Schick uns, woran du gerade hängst. Wir antworten in &lt; 6h — mit Termin, Festpreis
              oder klarem Nicht-passt. Wir nehmen 6 Projekte pro Jahr. Q3/2026 hat noch 2 Slots.
            </p>
          </Reveal>
        </div>
      </section>

      <Section chapter="01 Form" title="Was wir brauchen" date="2026 / 01">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <Reveal>
              <form
                method="post"
                action="mailto:hi@beuwy.com"
                className="space-y-5"
              >
                <Field label="Name" name="name" placeholder="Wie sollen wir dich nennen?" />
                <Field label="Marke / Unternehmen" name="company" placeholder="beuwy" />
                <Field
                  label="E-Mail"
                  name="email"
                  type="email"
                  placeholder="hi@deine-marke.de"
                />
                <Field
                  label="Stand der Marke"
                  name="stage"
                  placeholder="Pre-Launch · Pre-Series-A · profitabel · Re-Brand etc."
                />
                <FieldArea
                  label="Worum geht's"
                  name="brief"
                  placeholder="2–3 Sätze reichen. Was ist das Problem, was wäre die ideale Lösung, was hindert dich gerade?"
                />
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button type="submit" className="btn-primary">
                    Brief senden
                    <span aria-hidden>→</span>
                  </button>
                  <span
                    style={{
                      color: "var(--ink-dim)",
                      fontSize: 12,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    Ø Reply &lt; 6h · Mo–Fr · 09–18 CET
                  </span>
                </div>
              </form>
            </Reveal>
          </div>

          <div className="md:col-span-5">
            <Reveal delay={120}>
              <div
                className="rounded-[12px] p-7 sticky top-[96px]"
                style={{
                  background: "var(--bg-raised)",
                  border: "1px solid var(--line-subtle)",
                }}
              >
                <p
                  style={{
                    color: "var(--ink-dim)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.06em",
                  }}
                >
                  WAS DANACH PASSIERT
                </p>
                <ul className="mt-5 space-y-5">
                  {[
                    {
                      n: "01",
                      h: "&lt; 6h: Antwort",
                      s: "Termin, Festpreis-Range oder ehrliches Nicht-passt.",
                    },
                    {
                      n: "02",
                      h: "Tag 1–2: Frame Call",
                      s: "30 Minuten Loom oder Live. Wir kommen mit einer Hypothese.",
                    },
                    {
                      n: "03",
                      h: "Tag 3+: Live-Build",
                      s: "Wenn es matcht, starten wir spätestens 14 Tage nach dem Frame.",
                    },
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
                        <p
                          style={{
                            color: "var(--ink-cream)",
                            fontSize: 15,
                            fontWeight: 510,
                          }}
                          dangerouslySetInnerHTML={{ __html: row.h }}
                        />
                        <p
                          className="mt-1"
                          style={{
                            color: "var(--ink-muted)",
                            fontSize: 13,
                            lineHeight: "20px",
                          }}
                        >
                          {row.s}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div
                  className="mt-7 pt-5"
                  style={{ borderTop: "1px solid var(--line-subtle)" }}
                >
                  <p
                    style={{
                      color: "var(--ink-dim)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.06em",
                    }}
                  >
                    LIEBER DIREKT
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li>
                      <a
                        href="mailto:hi@beuwy.com"
                        className="btn-link"
                        style={{ fontSize: 14 }}
                      >
                        hi@beuwy.com
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://cal.com/beuwy"
                        className="btn-link"
                        style={{ fontSize: 14 }}
                      >
                        cal.com/beuwy
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span
        style={{
          color: "var(--ink-dim)",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="mt-2 w-full px-4 py-3 rounded-[10px]"
        style={{
          background: "var(--bg-raised)",
          color: "var(--ink-cream)",
          fontSize: 15,
          outline: "none",
          border: "1px solid var(--line-subtle)",
        }}
      />
    </label>
  );
}

function FieldArea({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span
        style={{
          color: "var(--ink-dim)",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <textarea
        name={name}
        placeholder={placeholder}
        rows={5}
        className="mt-2 w-full px-4 py-3 rounded-[10px]"
        style={{
          background: "var(--bg-raised)",
          color: "var(--ink-cream)",
          fontSize: 15,
          outline: "none",
          border: "1px solid var(--line-subtle)",
          resize: "vertical",
        }}
      />
    </label>
  );
}
