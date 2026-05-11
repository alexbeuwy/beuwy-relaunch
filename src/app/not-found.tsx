import Link from "next/link";

export default function NotFound() {
  return (
    <section className="pt-[160px] pb-[120px]">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <p
          className="font-display"
          style={{
            fontSize: 14,
            letterSpacing: "0.08em",
            color: "var(--ink-dim)",
            textTransform: "uppercase",
          }}
        >
          404 · not found
        </p>
        <h1
          className="h-display mt-6 text-[44px] md:text-[88px] leading-[0.98]"
          style={{ letterSpacing: "-0.025em" }}
        >
          Diese Seite gibt es noch{" "}
          <em className="font-display italic">nicht</em>.
        </h1>
        <p
          className="mt-6 max-w-[480px] text-[17px] leading-[1.55]"
          style={{ color: "var(--ink-muted)" }}
        >
          Vielleicht ist sie geplant für Q4/2026. Vielleicht hast du dich vertippt. Zurück zur
          Startseite — oder direkt einen Brief schicken.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/" className="btn-secondary">
            Zur Startseite
          </Link>
          <Link href="/anfrage" className="btn-primary">
            Brief schicken
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
