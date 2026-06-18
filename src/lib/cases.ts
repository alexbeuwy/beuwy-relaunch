/**
 * Single source of truth for case studies. Consumed by:
 *  - /work          (index page — all cases as cards linking to detail pages)
 *  - /work/[slug]   (detail page per case, statically generated)
 *  - sitemap        (so every case URL is indexed by search + agent crawlers)
 *
 * Keep every figure cite-able: if a number isn't real or sourced, don't ship
 * it. Place unverifiable claims in `note` (qualitative), not `kpi`.
 */
export type CaseSource = {
  /** Short human label, e.g. "vision.de" or "cash-online Hitliste 2024" */
  label: string;
  /** Optional outbound URL — leave undefined if internal/confidential. */
  href?: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  cat: string;
  years: string;
  kpi: string;
  kpiLabel: string;
  headline: string;
  /** One-paragraph summary used on the /work index card. */
  body: string;
  deliverables: string[];

  /* ---- detail-page fields ---- */

  /** Hero tagline shown above the headline on the detail page. */
  eyebrow: string;
  /** Short context — why this matters / what the brief was. */
  context: string;
  /** Before-state of the brand. */
  before: string;
  /** After-state — what the work changed. */
  after: string;
  /** Three-to-five bullet breakdown of what we actually built. */
  breakdown: { t: string; d: string }[];
  /** Cite-able sources for every numeric claim. */
  sources: CaseSource[];
  /** Optional one-line takeaway pulled from the work. */
  quote?: string;
};

export const cases: CaseStudy[] = [
  {
    slug: "vision",
    client: "Vision Real Estate",
    cat: "Real Estate · DACH",
    years: "2019 → 2023",
    kpi: "€160M",
    kpiLabel: "KKR Joint Venture",
    headline: "3 Gründer → 70 Mitarbeitende. Brand vor KKR.",
    body: "Vor dem Rebranding: drei Mitarbeitende, ein lokaler Player. Nach beuwy: 70 Köpfe, eine bundesweit zitierte Brand, CMO-Sitz und ein Joint Venture mit dem größten Private Equity der Welt.",
    deliverables: ["Brand-Architektur", "vision.de Relaunch", "Investor-Narrativ", "Sales-Material für institutionelle Kapitalgeber"],
    eyebrow: "01 Vision Real Estate · 2019 → 2023",
    context:
      "Ein lokaler Real-Estate-Player wollte aus dem regionalen Schatten heraus. Die Brand musste tragen können, was im Hintergrund verhandelt wurde — institutionelles Kapital, nicht das nächste Reihenhausgeschäft.",
    before:
      "Drei Gründer, ein lokales Profil, eine Website, die das Geschäft kleiner aussehen ließ als es war. Kein gemeinsames Vokabular zwischen Sales und Investor-Pitch.",
    after:
      "70 Mitarbeitende, eine bundesweit zitierte Brand, CMO-Sitz im Team. 2023: Joint Venture mit KKR über €160M — der Deal kam, nachdem die Marke stand, nicht vorher.",
    breakdown: [
      { t: "Brand-Architektur", d: "Eine Sprache für Sales, Recruiting und Investor-Gespräche — kein Stilbruch zwischen Pitchdeck und Hero." },
      { t: "vision.de Relaunch", d: "Plattform, die Wachstum trägt: skalierbares CMS, klare Sektion-Logik, sauberer Code." },
      { t: "Investor-Narrativ", d: "Ein One-Pager, der ohne Übersetzer in einen KKR-Termin geht." },
      { t: "Sales-Material", d: "Material für institutionelle Kapitalgeber — Format, Tonalität, Belege." },
    ],
    sources: [
      { label: "vision.de · KKR-Joint-Venture-Kommunikation", href: "https://vision.de" },
      { label: "Pressemeldungen 2023 (Branchenpresse)" },
    ],
    quote: "Die Brand stand, bevor KKR auf den Tisch kam — nicht andersherum.",
  },
  {
    slug: "koenigswege",
    client: "Königswege",
    cat: "Finanzberatung · DE",
    years: "2017 → live",
    kpi: "170 → 2.240",
    kpiLabel: "Partner · Top-10 DE",
    headline: "Vom No-Name in die Top-10 DE.",
    body: "139.774 Kunden. 74 Standorte. Cited Top-10 DE Finance auf der cash-online Hitliste 2024. Der Relaunch 2020 hat das Unternehmen explodieren lassen — von 170 auf 2.240 Partner.",
    deliverables: ["Brand-Strategie", "Web-System", "Partner-Materialien", "Recruiting-Funnel"],
    eyebrow: "02 Königswege · 2017 → live",
    context:
      "Finanzberatung in einem überfüllten Markt, in dem alle dieselben Worte benutzen. Aufgabe: ein Vokabular, das Partner anzieht — nicht nur Kunden — und Skalierung trägt.",
    before:
      "170 Partner, austauschbares Branchen-Vokabular, eine Webpräsenz, die zwischen Branchen-Peers verschwand.",
    after:
      "2.240 Partner. 139.774 Kunden. 74 Standorte. Cited Top-10 DE Finance auf der cash-online Hitliste 2024 — ohne den großen Werbedruck der etablierten Häuser.",
    breakdown: [
      { t: "Brand-Strategie", d: "Eine Positionierung, die Partner anzieht — nicht nur Endkunden — und in einer Verkaufsschulung trägt." },
      { t: "Web-System", d: "Skalierbare Site mit Standort- und Partner-Logik, ohne Stilbruch zwischen Marke und Lokal." },
      { t: "Partner-Materialien", d: "Recruiting-Material in der Brand-Sprache, das in Erstgesprächen funktioniert." },
      { t: "Recruiting-Funnel", d: "Der Trichter, der aus 170 Partnern über die Jahre 2.240 gemacht hat." },
    ],
    sources: [
      { label: "cash-online Hitliste 2024 — Top-10 DE Finance", href: "https://www.cash-online.de" },
      { label: "Königswege — öffentliche Standort- und Partnerdaten" },
    ],
    quote: "Wer das Vokabular setzt, gewinnt das Partner-Gespräch — nicht den Pitch.",
  },
  {
    slug: "acta",
    client: "acta",
    cat: "Real Estate · DE",
    years: "2023 → live",
    kpi: "315 / €48,4M",
    kpiLabel: "Wohnungen · Instagram-only",
    headline: "315 Wohnungen in der Zinskrise. Über Instagram.",
    body: "Ø Ticket €153.842. Owner-led, zero Outside Marketing Team. Drei Geschäftspartner. 15 Mitarbeitende in der Spitze. Etwas, wofür man vor Jahren ausgelacht worden wäre: Wohnungen über's Internet, teilweise ohne Besichtigung.",
    deliverables: ["Brand-Identität", "Paid-Social-System", "Funnel-Architektur", "Sales-Enablement"],
    eyebrow: "03 acta · 2023 → live",
    context:
      "Eigene Firma, eigene Kohorte. Aufgabe: Wohnungen mitten in der Zinskrise verkaufen — ohne klassische Vertriebsstruktur, ohne externes Marketing-Team.",
    before:
      "Drei Geschäftspartner, ein neues Geschäft, eine Asset-Klasse, die im Sommer 2023 niemand mehr anfassen wollte. Klassischer Vertriebskanal: tot.",
    after:
      "315 Wohnungen verkauft. Volumen €48,4M. Ø Ticket €153.842. Owner-led, ohne Outside Marketing Team. Teilweise Verkäufe ohne physische Besichtigung — über einen Instagram-Funnel.",
    breakdown: [
      { t: "Brand-Identität", d: "Eine eigene Sprache für ein Geschäft, das gegen die Marktstimmung verkauft hat." },
      { t: "Paid-Social-System", d: "Funnel mit Hook, Story, Angebot — kalibriert auf Ø Ticket €153k, nicht auf €19,90-Hooks." },
      { t: "Funnel-Architektur", d: "Vom ersten Reel bis zur Notar-Unterschrift, ohne Telefon-Vertrieb." },
      { t: "Sales-Enablement", d: "Material, das ein Geschäftspartner ohne Outside Marketing alleine fahren kann." },
    ],
    sources: [
      { label: "Intern dokumentiert · Verkaufsdaten 2023–2025" },
      { label: "Ø Ticket €153.842 — abgeleitet aus €48,4M / 315 Wohnungen" },
    ],
    quote: "Wir kennen Kaufentscheidungen bei hohem Ticket nicht aus der Studie. Wir lösen sie selbst aus.",
  },
  {
    slug: "purelei",
    client: "PURELEI",
    cat: "DTC · Lifestyle",
    years: "2018 → live",
    kpi: "1M+",
    kpiLabel: "Follower · 20–30 Mio. Ø Umsatz/Jahr",
    headline: "Founder-led Brand-Build. Aus dem Wohnzimmer.",
    body: "2018 intensiv mitgebaut, heute fast 1 Mio. Follower auf Instagram und konstant 20–30 Mio. Umsatz pro Jahr. Brand-Sprache, Content-System, Founder-Stimme — eingerichtet, dass es ohne uns weiter skaliert.",
    deliverables: ["Brand-Language", "Content-System", "Influencer-Brief", "Founder-Voice"],
    eyebrow: "04 PURELEI · 2018 → live",
    context:
      "DTC-Lifestyle-Brand, die aus einem Wohnzimmer-Setup wachsen wollte. Aufgabe: ein Voice-System, das die Founder-Stimme skaliert, ohne sie zu verlieren.",
    before:
      "Frühphase DTC, kein gemeinsames Vokabular über Content, Sales, Influencer-Briefings. Das, was die Founder mündlich konnten, war nirgendwo aufgeschrieben.",
    after:
      "1M+ Follower auf Instagram. Konstant 20–30 Mio. Ø Umsatz pro Jahr. Ein Voice-System, das ohne den Operator weiterläuft.",
    breakdown: [
      { t: "Brand-Language", d: "Voice-Charter, Forbidden Phrases, Content-Vokabular — übergeben, nicht im Kopf behalten." },
      { t: "Content-System", d: "Ein wiederholbares System für tägliches Content-Volumen, ohne Stilbruch." },
      { t: "Influencer-Brief", d: "Briefs, die externe Creator in der Brand-Stimme produzieren lassen." },
      { t: "Founder-Voice", d: "Die mündliche Stimme der Gründer schriftlich festgehalten, sodass sie übergeben werden kann." },
    ],
    sources: [
      { label: "Instagram · @purelei (public follower count)" },
      { label: "Branchenberichte 2022–2024 (DTC-Umsatzgrößenordnung)" },
    ],
    quote: "Skaliert, weil das System die Founder-Stimme weiterspricht, wenn die Founder nicht im Raum sind.",
  },
  {
    slug: "hellogetsafe",
    client: "hellogetsafe",
    cat: "Insurtech · 2019",
    years: "2019",
    kpi: "Pre-Series-A",
    kpiLabel: "Brand-Build vor Funding",
    headline: "Die Brand, die der Demo vorausläuft.",
    body: "Pre-Series-A Brand-Build. Der Wert war: das Pitchdeck hat sich von selbst verkauft, weil die Marke schon stand.",
    deliverables: ["Brand-Build", "Investor-Materials"],
    eyebrow: "05 hellogetsafe · 2019",
    context:
      "Pre-Series-A Insurtech. Aufgabe: eine Brand, die das Funding-Gespräch trägt, bevor das Produkt es kann.",
    before:
      "Frühes Startup, Produkt in Entwicklung, ein Investor-Briefing, das alles erklären musste, statt nichts zu erklären.",
    after:
      "Eine Brand, die im Pitchdeck nicht erklärt werden musste — sondern bereits Position bezogen hat, bevor die erste Folie kam.",
    breakdown: [
      { t: "Brand-Build", d: "Positionierung, Vokabular, visuelle Sprache — auf den Funding-Use-Case kalibriert." },
      { t: "Investor-Materials", d: "Pitchdeck und Begleitmaterial, das nicht aussieht wie das nächste Startup." },
    ],
    sources: [
      { label: "Engagement-Umfang dokumentiert · 2019" },
    ],
  },
  {
    slug: "snocks",
    client: "Snocks",
    cat: "DTC · Apparel",
    years: "Selected Content",
    kpi: "—",
    kpiLabel: "Einzelne Content-Pieces",
    headline: "Hand-picked Content-Drops.",
    body: "Einzelne Content-Pieces in einer Phase, in der Snocks selbst dabei war, sein Format zu finden.",
    deliverables: ["Content-Drops"],
    eyebrow: "06 Snocks · Selected",
    context:
      "Eine Sammlung einzelner Content-Drops in einer Phase, in der die Brand selbst ihr Format gesucht hat. Kein vollständiges Engagement — bewusst klein, bewusst ausgewählt.",
    before: "Eine wachsende DTC-Brand auf der Suche nach dem nächsten wiederholbaren Content-Format.",
    after: "Einzelne Pieces, die in dieser Suche als Referenz funktioniert haben.",
    breakdown: [
      { t: "Content-Drops", d: "Hand-ausgewählte, einzelne Pieces — keine Retainer-Logik, keine laufende Begleitung." },
    ],
    sources: [],
  },
];

export function caseBySlug(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}
