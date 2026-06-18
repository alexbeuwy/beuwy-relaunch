import type { Config } from "@measured/puck";
import { HeroBlock } from "@/blocks/HeroBlock";
import { PainBlock } from "@/blocks/PainBlock";
import { DreamBlock } from "@/blocks/DreamBlock";
import { MechanismBlock } from "@/blocks/MechanismBlock";
import { ProofBlock } from "@/blocks/ProofBlock";
import { OfferBlock } from "@/blocks/OfferBlock";
import { ScarcityBlock } from "@/blocks/ScarcityBlock";
import { IdentificationBlock } from "@/blocks/IdentificationBlock";
import { MagnetBlock } from "@/blocks/MagnetBlock";
import { BigCtaBlock } from "@/blocks/BigCtaBlock";
import { ImageWithTextBlock } from "@/blocks/ImageWithTextBlock";
import { SingleImageBlock } from "@/blocks/SingleImageBlock";
import { QuoteBlock } from "@/blocks/QuoteBlock";
import { LogoWallBlock } from "@/blocks/LogoWallBlock";
import { FaqBlock } from "@/blocks/FaqBlock";

const toneOptions = [
  { label: "Base (dunkel)", value: "base" },
  { label: "Raised", value: "raised" },
  { label: "Elevated", value: "elevated" },
  { label: "Cream (hell)", value: "cream" },
  { label: "Bright", value: "bright" },
];

export const puckConfig: Config = {
  components: {
    Hero: {
      label: "Hero",
      fields: {
        eyebrow: { type: "text", label: "Eyebrow Chip" },
        title_top: { type: "text", label: "Headline Zeile 1" },
        title_mid_before: { type: "text", label: "Headline vor Emphasis" },
        title_emphasis: { type: "text", label: "Headline goldener Begriff" },
        title_mid_after: { type: "text", label: "Headline nach Emphasis" },
        subtitle: { type: "textarea", label: "Subtitle" },
        audit_placeholder: { type: "text", label: "Audit Placeholder" },
        audit_cta: { type: "text", label: "Audit CTA-Label" },
        audit_hint: { type: "textarea", label: "Audit Hint" },
        secondary_link_label: { type: "text", label: "Sekundärer Link" },
        meta_response: { type: "text", label: "Antwortzeit-Hinweis" },
        meta_slots: { type: "text", label: "Slot-Hinweis" },
      },
      defaultProps: {
        eyebrow: "Für Marken, die mehr sind als ihre Website zeigt",
        title_top: "Dein Produkt ist besser.",
        title_mid_before: "Wir sorgen dafür, dass",
        title_emphasis: "alle",
        title_mid_after: "es erfahren.",
        subtitle: "Premium-Design auf Agent-Layer.",
        audit_placeholder: "deine-marke.de",
        audit_cta: "Marke prüfen",
        audit_hint: "15 Sek · kostenlos · kein Login",
        secondary_link_label: "Oder direkt Brief schicken",
        meta_response: "Ø Antwort < 6h",
        meta_slots: "Q3 · 2 Slots",
      },
      render: ({ puck, editMode, id, ...props }) => <HeroBlock {...props} />,
    },

    Pain: {
      label: "Pain (Diagnose-Tabelle)",
      fields: {
        eyebrow_num: { type: "text", label: "Eyebrow Zahl" },
        eyebrow_text: { type: "text", label: "Eyebrow Text" },
        title_top: { type: "text", label: "Headline Zeile 1" },
        title_emphasis: { type: "text", label: "Headline goldener Begriff" },
        title_bottom: { type: "text", label: "Headline Zeile 2" },
        description: { type: "textarea", label: "Beschreibung" },
        rows: {
          type: "array",
          label: "Tabellen-Zeilen",
          getItemSummary: (item: { k?: string }) => item.k || "Neue Zeile",
          arrayFields: {
            k: { type: "text", label: "Key" },
            now: { type: "text", label: "Jetzt (HTML erlaubt)" },
            after: { type: "text", label: "Nach beuwy" },
          },
          defaultItemProps: { k: "Neue Zeile", now: "", after: "" },
        },
      },
      defaultProps: {
        eyebrow_num: "85 %",
        eyebrow_text: "deiner Pipeline = Empfehlungen",
        title_top: "Dein Potential ist da.",
        title_emphasis: "Deine Website",
        title_bottom: "zeigt es nicht.",
        description: "",
        rows: [],
      },
      render: ({ puck, editMode, id, ...props }) => <PainBlock {...props} />,
    },

    Dream: {
      label: "Dream State (Bild + Email-Mockup)",
      fields: {
        title_top: { type: "text", label: "Headline Teil 1" },
        title_emphasis: { type: "text", label: "Italic-Wort" },
        title_bottom: { type: "text", label: "Headline Teil 2" },
        description: { type: "textarea", label: "Beschreibung (HTML erlaubt)" },
        image_src: { type: "text", label: "Bild URL (oder Path)" },
        image_alt: { type: "text", label: "Alt-Text" },
        image_caption: { type: "text", label: "Caption" },
        image_prompt: { type: "textarea", label: "AI-Prompt" },
      },
      defaultProps: {
        title_top: "Bald nennt der Agent",
        title_emphasis: "dich",
        title_bottom: "— bevor dein Wettbewerber auftaucht.",
        description: "",
        image_src: "",
        image_alt: "",
        image_caption: "",
        image_prompt: "",
      },
      render: ({ puck, editMode, id, ...props }) => <DreamBlock {...props} />,
    },

    Mechanism: {
      label: "Mechanism (3-Layer-Flow)",
      fields: {
        title_top: { type: "text", label: "Headline Zeile 1" },
        title_bottom_before: { type: "text", label: "Vor Emphasis" },
        title_emphasis: { type: "text", label: "Goldener Begriff" },
        title_bottom_after: { type: "text", label: "Nach Emphasis" },
        description: { type: "textarea", label: "Beschreibung" },
        input_chip: { type: "text", label: "Input-Chip" },
        output_chip: { type: "text", label: "Output-Chip" },
        output_meta: { type: "text", label: "Output-Meta" },
        layers: {
          type: "array",
          label: "Layer (3)",
          getItemSummary: (item: { t?: string }) => item.t || "Neuer Layer",
          arrayFields: {
            num: { type: "text", label: "Nummer (z.B. 01)" },
            t: { type: "text", label: "Titel" },
            sub: { type: "text", label: "Untertitel" },
            out: { type: "text", label: "Output-Label" },
          },
          defaultItemProps: { num: "01", t: "", sub: "", out: "" },
        },
      },
      defaultProps: {
        title_top: "Drei Layer, zehn Tage —",
        title_bottom_before: "und der Agent",
        title_emphasis: "versteht dich",
        title_bottom_after: ".",
        description: "",
        input_chip: "INPUT · dein Brief",
        output_chip: "OUTPUT · Tag 10 live",
        output_meta: "inkl. 30 Tage Standby",
        layers: [],
      },
      render: ({ puck, editMode, id, ...props }) => <MechanismBlock {...props} />,
    },

    Proof: {
      label: "Proof Stack (Counter + Cases + Founder)",
      fields: {
        title_emphasis: { type: "text", label: "Goldener Betrag" },
        title_top_after: { type: "text", label: "Nach Betrag" },
        title_bottom: { type: "text", label: "Headline Zeile 2" },
        description: { type: "textarea", label: "Beschreibung" },
        counters: {
          type: "array",
          label: "Counter-Wand",
          getItemSummary: (item: { label?: string }) => item.label || "Neuer Counter",
          arrayFields: {
            prefix: { type: "text", label: "Prefix (€, $)" },
            value: { type: "number", label: "Endwert (Zahl)" },
            suffix: { type: "text", label: "Suffix (M, %)" },
            display: { type: "text", label: "Anzeige (Screenreader)" },
            label: { type: "text", label: "Label" },
            source: { type: "text", label: "Quelle" },
          },
          defaultItemProps: { prefix: "", value: 0, suffix: "", display: "", label: "", source: "" },
        },
        cases: {
          type: "array",
          label: "Case Cards",
          getItemSummary: (item: { client?: string }) => item.client || "Neuer Case",
          arrayFields: {
            client: { type: "text", label: "Kunde" },
            years: { type: "text", label: "Zeitraum" },
            kpi: { type: "text", label: "KPI (groß)" },
            kpiLabel: { type: "text", label: "KPI-Label" },
            note: { type: "textarea", label: "Notiz" },
            href: { type: "text", label: "Link" },
          },
          defaultItemProps: { client: "", years: "", kpi: "", kpiLabel: "", note: "", href: "#" },
        },
        testimonials_eyebrow: { type: "text", label: "Testimonials Eyebrow" },
        founder_eyebrow: { type: "text", label: "Founder Eyebrow" },
        founder_bio: { type: "textarea", label: "Founder Bio (HTML erlaubt)" },
        founder_initials: { type: "text", label: "Founder Initialen" },
        founder_name: { type: "text", label: "Founder Name" },
        founder_role: { type: "text", label: "Founder Rolle" },
        founder_quote: { type: "textarea", label: "Founder Zitat (HTML erlaubt)" },
        founder_image: { type: "text", label: "Founder Foto (Pfad, optional)" },
        founder_image_alt: { type: "text", label: "Founder Foto Alt-Text" },
      },
      defaultProps: {
        title_emphasis: "€300M+",
        title_top_after: "in den Büchern unserer Kunden.",
        title_bottom: "Gebaut von einem, der selbst skaliert hat.",
        description: "",
        counters: [],
        cases: [],
        testimonials_eyebrow: "Stimmen aus dem Maschinenraum",
        founder_eyebrow: "Du sprichst mit dem, der baut",
        founder_bio: "",
        founder_initials: "AP",
        founder_name: "",
        founder_role: "",
        founder_quote: "",
        founder_image: "",
        founder_image_alt: "",
      },
      render: ({ puck, editMode, id, ...props }) => <ProofBlock {...props} />,
    },

    Offer: {
      label: "Offer (Deliverables + Code-Editor)",
      fields: {
        title_top: { type: "text", label: "Headline Zeile 1" },
        title_emphasis: { type: "text", label: "Italic-Phrase" },
        title_bottom: { type: "text", label: "Headline Zeile 2 (z.B. Punkt)" },
        deliverables: {
          type: "array",
          label: "Deliverables",
          getItemSummary: (item: { t?: string }) => item.t || "Neues Deliverable",
          arrayFields: {
            t: { type: "text", label: "Titel" },
            d: { type: "textarea", label: "Beschreibung" },
          },
          defaultItemProps: { t: "", d: "" },
        },
        guarantee_title: { type: "text", label: "Garantie-Titel (optional)" },
        guarantee_body: { type: "textarea", label: "Garantie-Body" },
        guarantee_seal_label: { type: "text", label: "Siegel-Hauptzeile" },
        guarantee_seal_sub: { type: "text", label: "Siegel-Unterzeile" },
        guarantee_href: { type: "text", label: "Garantie-Link (optional)" },
      },
      defaultProps: {
        title_top: "Am Tag 10: Marke, Website und KI-Sichtbarkeit —",
        title_emphasis: "live, nicht in Figma",
        title_bottom: ".",
        deliverables: [],
        guarantee_title: "",
        guarantee_body: "",
        guarantee_seal_label: "Tag 10",
        guarantee_seal_sub: "live oder 0 €",
        guarantee_href: "",
      },
      render: ({ puck, editMode, id, ...props }) => <OfferBlock {...props} />,
    },

    Scarcity: {
      label: "Scarcity (Slot-Plan)",
      fields: {
        title_top: { type: "text", label: "Headline Zeile 1" },
        title_emphasis: { type: "text", label: "Goldener Begriff" },
        title_mid: { type: "text", label: "Headline Mid" },
        title_bottom: { type: "text", label: "Headline Zeile 2" },
        description: { type: "textarea", label: "Beschreibung" },
        cta_label: { type: "text", label: "CTA-Label" },
        cta_href: { type: "text", label: "CTA-Link" },
        slots: {
          type: "array",
          label: "Slot-Plan",
          getItemSummary: (item: { q?: string }) => item.q || "Neuer Slot",
          arrayFields: {
            q: { type: "text", label: "Quartal (z.B. Q3/2026)" },
            state: {
              type: "select",
              label: "Status",
              options: [
                { label: "shipped", value: "shipped" },
                { label: "open", value: "open" },
                { label: "waitlist", value: "waitlist" },
              ],
            },
          },
          defaultItemProps: { q: "Q1/2026", state: "open" },
        },
      },
      defaultProps: {
        title_top: "6 Plätze im Jahr.",
        title_emphasis: "2 frei",
        title_mid: "für Q3.",
        title_bottom: "Danach Warteliste.",
        description: "",
        cta_label: "Slot sichern",
        cta_href: "/anfrage",
        slots: [],
      },
      render: ({ puck, editMode, id, ...props }) => <ScarcityBlock {...props} />,
    },

    Identification: {
      label: "Identification (5-Card Grid)",
      fields: {
        eyebrow_num: { type: "text", label: "Eyebrow erstes Wort" },
        eyebrow_text: { type: "text", label: "Eyebrow Rest" },
        title_top: { type: "text", label: "Headline Zeile 1" },
        title_bottom_before: { type: "text", label: "Vor Emphasis" },
        title_emphasis: { type: "text", label: "Goldener Begriff" },
        title_bottom_after: { type: "text", label: "Nach Emphasis" },
        cards: {
          type: "array",
          label: "Karten",
          getItemSummary: (item: { t?: string }) => item.t || "Neue Karte",
          arrayFields: {
            n: { type: "text", label: "Nummer (z.B. 01)" },
            t: { type: "text", label: "Titel" },
            s: { type: "textarea", label: "Body (HTML erlaubt)" },
          },
          defaultItemProps: { n: "01", t: "", s: "" },
        },
        kicker: { type: "textarea", label: "Kicker-Zeile (HTML erlaubt)" },
      },
      defaultProps: {
        eyebrow_num: "Für",
        eyebrow_text: "dich, wenn du dich hier wiedererkennst",
        title_top: "Dein Produkt verdient ein Schaufenster,",
        title_bottom_before: "das seiner",
        title_emphasis: "Qualität",
        title_bottom_after: "entspricht.",
        cards: [],
        kicker: "",
      },
      render: ({ puck, editMode, id, ...props }) => <IdentificationBlock {...props} />,
    },

    Magnet: {
      label: "Magnet (Free Audit)",
      fields: {
        title_top: { type: "text", label: "Headline Zeile 1" },
        title_emphasis: { type: "text", label: "Italic-Wort" },
        title_bottom: { type: "text", label: "Headline Zeile 2" },
        description: { type: "textarea", label: "Beschreibung" },
        audit_placeholder: { type: "text", label: "Audit Placeholder" },
        audit_cta: { type: "text", label: "Audit Button" },
        audit_hint: { type: "text", label: "Audit Hint" },
      },
      defaultProps: {
        title_top: "In 15 Sekunden siehst du, was die",
        title_emphasis: "Agenten",
        title_bottom: "über dich sagen.",
        description: "",
        audit_placeholder: "deine-marke.de",
        audit_cta: "Audit",
        audit_hint: "kostenlos · kein Login",
      },
      render: ({ puck, editMode, id, ...props }) => <MagnetBlock {...props} />,
    },

    BigCta: {
      label: "Big CTA (Footer-Block)",
      fields: {
        title_top: { type: "text", label: "Headline Zeile 1" },
        title_emphasis: { type: "text", label: "Italic-Frage" },
        primary_label: { type: "text", label: "Primary Button Label" },
        primary_href: { type: "text", label: "Primary Link" },
        secondary_label: { type: "text", label: "Secondary Button Label" },
        secondary_href: { type: "text", label: "Secondary Link" },
        meta: { type: "text", label: "Meta-Hinweis" },
      },
      defaultProps: {
        title_top: "Dein nächster Kunde fragt jetzt gerade einen Agenten.",
        title_emphasis: "Was antwortet er?",
        primary_label: "Brief schicken",
        primary_href: "/anfrage",
        secondary_label: "Erst die Marke prüfen →",
        secondary_href: "/audit",
        meta: "Ø Reply < 6h",
      },
      render: ({ puck, editMode, id, ...props }) => <BigCtaBlock {...props} />,
    },

    ImageWithText: {
      label: "Bild + Text",
      fields: {
        eyebrow: { type: "text", label: "Eyebrow" },
        title_top: { type: "text", label: "Headline Anfang" },
        title_emphasis: { type: "text", label: "Goldener Begriff" },
        title_bottom: { type: "text", label: "Headline Ende" },
        body: { type: "textarea", label: "Body (HTML erlaubt)" },
        image_src: { type: "text", label: "Bild URL (oder Path)" },
        image_alt: { type: "text", label: "Alt-Text" },
        image_caption: { type: "text", label: "Caption" },
        layout: {
          type: "select",
          label: "Layout",
          options: [
            { label: "Bild links", value: "image_left" },
            { label: "Bild rechts", value: "image_right" },
          ],
        },
        tone: { type: "select", label: "Tone", options: toneOptions },
        cta_label: { type: "text", label: "CTA Label (optional)" },
        cta_href: { type: "text", label: "CTA Link" },
      },
      defaultProps: {
        eyebrow: "",
        title_top: "Überschrift",
        title_emphasis: "",
        title_bottom: "",
        body: "Beschreibung des Abschnitts.",
        image_src: "",
        image_alt: "",
        image_caption: "",
        layout: "image_left",
        tone: "raised",
        cta_label: "",
        cta_href: "#",
      },
      render: ({ puck, editMode, id, ...props }) => <ImageWithTextBlock {...props} />,
    },

    SingleImage: {
      label: "Einzelnes Bild",
      fields: {
        image_src: { type: "text", label: "Bild URL" },
        image_alt: { type: "text", label: "Alt-Text" },
        image_caption: { type: "text", label: "Caption" },
        aspect: {
          type: "select",
          label: "Aspect Ratio",
          options: [
            { label: "16:9", value: "16/9" },
            { label: "4:3", value: "4/3" },
            { label: "3:2", value: "3/2" },
            { label: "1:1 (quadratisch)", value: "1/1" },
            { label: "3:4 (portrait)", value: "3/4" },
          ],
        },
        max_width: { type: "number", label: "Max-Breite (px)" },
        tone: { type: "select", label: "Tone", options: toneOptions },
      },
      defaultProps: {
        image_src: "",
        image_alt: "",
        image_caption: "",
        aspect: "16/9",
        max_width: 1040,
        tone: "raised",
      },
      render: ({ puck, editMode, id, ...props }) => <SingleImageBlock {...props} />,
    },

    Quote: {
      label: "Zitat (groß)",
      fields: {
        quote: { type: "textarea", label: "Zitat (HTML erlaubt)" },
        author_name: { type: "text", label: "Autor Name" },
        author_role: { type: "text", label: "Autor Rolle" },
        author_initials: { type: "text", label: "Autor Initialen" },
        tone: { type: "select", label: "Tone", options: toneOptions },
      },
      defaultProps: {
        quote: "Ein zitierfähiger Gedanke.",
        author_name: "",
        author_role: "",
        author_initials: "",
        tone: "elevated",
      },
      render: ({ puck, editMode, id, ...props }) => <QuoteBlock {...props} />,
    },

    LogoWall: {
      label: "Logo-Wand",
      fields: {
        eyebrow: { type: "text", label: "Eyebrow (optional)" },
        tone: { type: "select", label: "Tone", options: toneOptions },
      },
      defaultProps: {
        eyebrow: "",
        tone: "raised",
      },
      render: ({ puck, editMode, id, ...props }) => <LogoWallBlock {...props} />,
    },

    Faq: {
      label: "FAQ-Accordion",
      fields: {
        eyebrow: { type: "text", label: "Eyebrow" },
        title_top: { type: "text", label: "Headline Anfang" },
        title_emphasis: { type: "text", label: "Goldener Begriff" },
        title_bottom: { type: "text", label: "Headline Ende" },
        items: {
          type: "array",
          label: "Fragen",
          getItemSummary: (item: { q?: string }) => item.q || "Neue Frage",
          arrayFields: {
            q: { type: "text", label: "Frage" },
            a: { type: "textarea", label: "Antwort (HTML erlaubt)" },
          },
          defaultItemProps: { q: "", a: "" },
        },
        tone: { type: "select", label: "Tone", options: toneOptions },
      },
      defaultProps: {
        eyebrow: "FAQ",
        title_top: "Häufige Fragen",
        title_emphasis: "",
        title_bottom: "",
        items: [],
        tone: "raised",
      },
      render: ({ puck, editMode, id, ...props }) => <FaqBlock {...props} />,
    },
  },
};

export type PuckData = {
  content: Array<{ type: string; props: Record<string, unknown> }>;
  root: { props?: Record<string, unknown> };
};

export const emptyPuckData: PuckData = {
  content: [],
  root: { props: {} },
};
