import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer
      className="relative z-[2] mt-[120px] border-t"
      style={{ borderColor: "var(--line-subtle)" }}
    >
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-[64px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-6">
            <Logo height={40} />
            <p
              className="font-display text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.02em] max-w-[420px]"
              style={{ color: "var(--ink-yellow)" }}
            >
              Die <em className="font-display italic">Ära</em> der{" "}
              <em className="font-display italic">Taste</em>.
              <br />
              Gebaut von einem <em className="font-display italic">Operator</em>.
            </p>
            <p style={{ color: "var(--ink-muted)", fontSize: 14, lineHeight: "22px", maxWidth: 380 }}>
              beuwy ist seit 2017 ein Operator-led Studio. Heidelberg · Mannheim · Berlin · Remote EU.
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-8 text-[14px]">
            <FooterCol title="Studio">
              <FooterLink href="/method">Methode</FooterLink>
              <FooterLink href="/work">Arbeit</FooterLink>
              <FooterLink href="/system">System</FooterLink>
              <FooterLink href="/manifesto">Manifest</FooterLink>
              <FooterLink href="/audit">GPT-Audit</FooterLink>
            </FooterCol>
            <FooterCol title="Cases">
              <FooterLink href="/work#vision">Vision Real Estate</FooterLink>
              <FooterLink href="/work#koenigswege">Königswege</FooterLink>
              <FooterLink href="/work#acta">acta</FooterLink>
              <FooterLink href="/work#purelei">PURELEI</FooterLink>
            </FooterCol>
            <FooterCol title="Sag hi">
              <FooterLink href="mailto:hi@beuwy.com">hi@beuwy.com</FooterLink>
              <FooterLink href="/anfrage">Brief schicken</FooterLink>
              <FooterLink href="https://cal.com/beuwy">cal.com/beuwy</FooterLink>
            </FooterCol>
            <FooterCol title="Wo">
              <FooterLink href="#">Heidelberg</FooterLink>
              <FooterLink href="#">Mannheim</FooterLink>
              <FooterLink href="#">Berlin</FooterLink>
              <FooterLink href="#">Remote EU</FooterLink>
            </FooterCol>
          </div>
        </div>

        <div
          className="mt-[64px] pt-[24px] flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
          style={{ borderTop: "1px solid var(--line-subtle)" }}
        >
          <p style={{ color: "var(--ink-dim)", fontSize: 12, letterSpacing: "0.04em" }}>
            © beuwy 2017–2026 · Operator seit 2009 · Mo–Fr · 09–18 CET · Reply &lt; 6h
            <span style={{ marginLeft: 10, opacity: 0.6, fontFamily: "var(--font-mono)" }}>
              build {(process.env.VERCEL_GIT_COMMIT_SHA || "local").slice(0, 7)}
            </span>
          </p>
          <div className="flex items-center gap-4 text-[12px]" style={{ color: "var(--ink-dim)" }}>
            <Link href="#" className="hover:text-[var(--ink-yellow)]">Impressum</Link>
            <Link href="#" className="hover:text-[var(--ink-yellow)]">Datenschutz</Link>
            <span className="chip">
              <span className="dot" />
              <span>Q3/2026 · 2 Slots offen</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <p
        style={{
          color: "var(--ink-dim)",
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontWeight: 510,
        }}
      >
        {title}
      </p>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="transition-colors hover:text-[var(--ink-yellow)]"
        style={{ color: "var(--ink-cream)" }}
      >
        {children}
      </Link>
    </li>
  );
}
