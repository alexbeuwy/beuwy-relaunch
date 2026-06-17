import type { Config } from "@measured/puck";
import { HeroBlock } from "@/blocks/HeroBlock";
import { PainBlock } from "@/blocks/PainBlock";
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
        title_top: "",
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
