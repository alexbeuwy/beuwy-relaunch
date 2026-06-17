import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const toneOptions = ["base", "raised", "elevated", "cream", "bright"];

export default defineConfig({
  branch,

  // Cloud credentials (optional — empty = pure local mode, edits write to disk).
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "assets",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "json",
        ui: {
          router: ({ document }) =>
            document._sys.filename === "home" ? "/" : `/${document._sys.filename}`,
        },
        fields: [
          {
            type: "object",
            name: "blocks",
            label: "Sektionen (reorder, hinzufügen, entfernen)",
            list: true,
            ui: {
              visualSelector: true,
            },
            templates: [
              /* ---------------- HERO ---------------- */
              {
                name: "hero",
                label: "01 · Hero",
                fields: [
                  { type: "string", name: "eyebrow", label: "Eyebrow chip" },
                  { type: "string", name: "title_top", label: "Headline · Zeile 1" },
                  { type: "string", name: "title_mid_before", label: "Headline · Vor Emphasis" },
                  { type: "string", name: "title_emphasis", label: "Headline · Goldener Emphasis-Begriff" },
                  { type: "string", name: "title_mid_after", label: "Headline · Nach Emphasis" },
                  { type: "string", name: "subtitle", label: "Subtitle", ui: { component: "textarea" } },
                  { type: "string", name: "audit_placeholder", label: "Audit · Input-Placeholder" },
                  { type: "string", name: "audit_cta", label: "Audit · Button-Label" },
                  { type: "string", name: "audit_hint", label: "Audit · Hint-Text", ui: { component: "textarea" } },
                  { type: "string", name: "secondary_link_label", label: "Sekundärer Link" },
                  { type: "string", name: "meta_response", label: "Meta · Antwortzeit" },
                  { type: "string", name: "meta_slots", label: "Meta · Slot-Hinweis" },
                ],
              },

              /* ---------------- PAIN ---------------- */
              {
                name: "pain",
                label: "02 · Pain (Diagnose-Tabelle)",
                fields: [
                  { type: "string", name: "eyebrow_num", label: "Eyebrow · Zahl" },
                  { type: "string", name: "eyebrow_text", label: "Eyebrow · Text" },
                  { type: "string", name: "title_top", label: "Headline · Zeile 1" },
                  { type: "string", name: "title_emphasis", label: "Headline · Goldener Begriff" },
                  { type: "string", name: "title_bottom", label: "Headline · Zeile 2" },
                  { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } },
                  {
                    type: "object",
                    name: "rows",
                    label: "Tabellen-Zeilen",
                    list: true,
                    ui: { itemProps: (item: { k?: string }) => ({ label: item.k || "Neue Zeile" }) },
                    fields: [
                      { type: "string", name: "k", label: "Spalte 1 · Key" },
                      { type: "string", name: "now", label: "Spalte 2 · Jetzt (HTML erlaubt)" },
                      { type: "string", name: "after", label: "Spalte 3 · Nach beuwy" },
                    ],
                  },
                ],
              },

              /* ---------------- DREAM ---------------- */
              {
                name: "dream",
                label: "03 · Dream State",
                fields: [
                  { type: "string", name: "title_top", label: "Headline · Teil 1" },
                  { type: "string", name: "title_emphasis", label: "Headline · Italic-Wort" },
                  { type: "string", name: "title_bottom", label: "Headline · Teil 2" },
                  { type: "string", name: "description", label: "Beschreibung (HTML erlaubt)", ui: { component: "textarea" } },
                  { type: "image", name: "image_src", label: "Bild (Drag&Drop oder Pfad)" },
                  { type: "string", name: "image_alt", label: "Bild · Alt-Text" },
                  { type: "string", name: "image_caption", label: "Bild · Caption" },
                  { type: "string", name: "image_prompt", label: "Bild · AI-Prompt", ui: { component: "textarea" } },
                ],
              },

              /* ---------------- MECHANISM ---------------- */
              {
                name: "mechanism",
                label: "04 · Mechanism",
                fields: [
                  { type: "string", name: "title_top", label: "Headline · Zeile 1" },
                  { type: "string", name: "title_bottom_before", label: "Headline · Vor Emphasis" },
                  { type: "string", name: "title_emphasis", label: "Headline · Goldener Begriff" },
                  { type: "string", name: "title_bottom_after", label: "Headline · Nach Emphasis" },
                  { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } },
                  { type: "string", name: "input_chip", label: "Input-Chip" },
                  { type: "string", name: "output_chip", label: "Output-Chip" },
                  { type: "string", name: "output_meta", label: "Output-Meta" },
                  {
                    type: "object",
                    name: "layers",
                    label: "Layer (3)",
                    list: true,
                    ui: { itemProps: (item: { t?: string }) => ({ label: item.t || "Neuer Layer" }) },
                    fields: [
                      { type: "string", name: "num", label: "Nummer (z. B. 01)" },
                      { type: "string", name: "t", label: "Titel" },
                      { type: "string", name: "sub", label: "Untertitel" },
                      { type: "string", name: "out", label: "Output-Label" },
                    ],
                  },
                ],
              },

              /* ---------------- PROOF ---------------- */
              {
                name: "proof",
                label: "05 · Proof Stack",
                fields: [
                  { type: "string", name: "title_emphasis", label: "Headline · Goldener Betrag" },
                  { type: "string", name: "title_top_after", label: "Headline · Nach Betrag" },
                  { type: "string", name: "title_bottom", label: "Headline · Zeile 2" },
                  { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } },
                  {
                    type: "object",
                    name: "counters",
                    label: "Counter-Wand (4)",
                    list: true,
                    ui: { itemProps: (item: { label?: string }) => ({ label: item.label || "Neuer Counter" }) },
                    fields: [
                      { type: "string", name: "prefix", label: "Prefix (€, $, …)" },
                      { type: "number", name: "value", label: "Endwert (Zahl)" },
                      { type: "string", name: "suffix", label: "Suffix (M, M+, %, …)" },
                      { type: "string", name: "display", label: "Anzeige (für Screenreader)" },
                      { type: "string", name: "label", label: "Label" },
                      { type: "string", name: "source", label: "Quelle" },
                    ],
                  },
                  {
                    type: "object",
                    name: "cases",
                    label: "Case Cards (3)",
                    list: true,
                    ui: { itemProps: (item: { client?: string }) => ({ label: item.client || "Neuer Case" }) },
                    fields: [
                      { type: "string", name: "client", label: "Kunde" },
                      { type: "string", name: "years", label: "Zeitraum" },
                      { type: "string", name: "kpi", label: "KPI (groß)" },
                      { type: "string", name: "kpiLabel", label: "KPI-Label" },
                      { type: "string", name: "note", label: "Notiz", ui: { component: "textarea" } },
                      { type: "string", name: "href", label: "Link" },
                    ],
                  },
                  { type: "string", name: "testimonials_eyebrow", label: "Testimonials · Eyebrow" },
                  { type: "string", name: "founder_eyebrow", label: "Founder · Eyebrow" },
                  { type: "string", name: "founder_bio", label: "Founder · Bio (HTML erlaubt)", ui: { component: "textarea" } },
                  { type: "string", name: "founder_initials", label: "Founder · Initialen" },
                  { type: "string", name: "founder_name", label: "Founder · Name" },
                  { type: "string", name: "founder_role", label: "Founder · Rolle" },
                  { type: "string", name: "founder_quote", label: "Founder · Zitat (HTML erlaubt)", ui: { component: "textarea" } },
                ],
              },

              /* ---------------- OFFER ---------------- */
              {
                name: "offer",
                label: "06 · Offer",
                fields: [
                  { type: "string", name: "title_top", label: "Headline · Zeile 1" },
                  { type: "string", name: "title_emphasis", label: "Headline · Italic-Phrase" },
                  { type: "string", name: "title_bottom", label: "Headline · Zeile 2 (z. B. Punkt)" },
                  {
                    type: "object",
                    name: "deliverables",
                    label: "Deliverables (4)",
                    list: true,
                    ui: { itemProps: (item: { t?: string }) => ({ label: item.t || "Neues Deliverable" }) },
                    fields: [
                      { type: "string", name: "t", label: "Titel" },
                      { type: "string", name: "d", label: "Beschreibung", ui: { component: "textarea" } },
                    ],
                  },
                ],
              },

              /* ---------------- SCARCITY ---------------- */
              {
                name: "scarcity",
                label: "07 · Scarcity",
                fields: [
                  { type: "string", name: "title_top", label: "Headline · Zeile 1" },
                  { type: "string", name: "title_emphasis", label: "Headline · Goldener Begriff" },
                  { type: "string", name: "title_mid", label: "Headline · Mid" },
                  { type: "string", name: "title_bottom", label: "Headline · Zeile 2" },
                  { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } },
                  { type: "string", name: "cta_label", label: "CTA-Label" },
                  { type: "string", name: "cta_href", label: "CTA-Link" },
                  {
                    type: "object",
                    name: "slots",
                    label: "Slot-Plan",
                    list: true,
                    ui: { itemProps: (item: { q?: string }) => ({ label: item.q || "Neuer Slot" }) },
                    fields: [
                      { type: "string", name: "q", label: "Quartal (z. B. Q3/2026)" },
                      {
                        type: "string",
                        name: "state",
                        label: "Status",
                        options: ["shipped", "open", "waitlist"],
                      },
                    ],
                  },
                ],
              },

              /* ---------------- IDENTIFICATION ---------------- */
              {
                name: "identification",
                label: "08 · Identification",
                fields: [
                  { type: "string", name: "eyebrow_num", label: "Eyebrow · Erstes Wort" },
                  { type: "string", name: "eyebrow_text", label: "Eyebrow · Rest" },
                  { type: "string", name: "title_top", label: "Headline · Zeile 1" },
                  { type: "string", name: "title_bottom_before", label: "Headline · Vor Emphasis" },
                  { type: "string", name: "title_emphasis", label: "Headline · Goldener Begriff" },
                  { type: "string", name: "title_bottom_after", label: "Headline · Nach Emphasis" },
                  {
                    type: "object",
                    name: "cards",
                    label: "Karten (5)",
                    list: true,
                    ui: { itemProps: (item: { t?: string }) => ({ label: item.t || "Neue Karte" }) },
                    fields: [
                      { type: "string", name: "n", label: "Nummer" },
                      { type: "string", name: "t", label: "Titel" },
                      { type: "string", name: "s", label: "Body (HTML erlaubt)", ui: { component: "textarea" } },
                    ],
                  },
                  { type: "string", name: "kicker", label: "Kicker-Zeile (HTML erlaubt)", ui: { component: "textarea" } },
                ],
              },

              /* ---------------- MAGNET ---------------- */
              {
                name: "magnet",
                label: "09 · Magnet (Free Audit)",
                fields: [
                  { type: "string", name: "title_top", label: "Headline · Zeile 1" },
                  { type: "string", name: "title_emphasis", label: "Headline · Italic-Wort" },
                  { type: "string", name: "title_bottom", label: "Headline · Zeile 2" },
                  { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } },
                  { type: "string", name: "audit_placeholder", label: "Audit · Placeholder" },
                  { type: "string", name: "audit_cta", label: "Audit · Button" },
                  { type: "string", name: "audit_hint", label: "Audit · Hint" },
                ],
              },

              /* ---------------- BIG CTA ---------------- */
              {
                name: "bigCta",
                label: "10 · Big CTA (Footer-Block)",
                fields: [
                  { type: "string", name: "title_top", label: "Headline · Zeile 1" },
                  { type: "string", name: "title_emphasis", label: "Headline · Italic-Frage" },
                  { type: "string", name: "primary_label", label: "Primary-CTA · Label" },
                  { type: "string", name: "primary_href", label: "Primary-CTA · Link" },
                  { type: "string", name: "secondary_label", label: "Secondary-CTA · Label" },
                  { type: "string", name: "secondary_href", label: "Secondary-CTA · Link" },
                  { type: "string", name: "meta", label: "Meta-Hinweis (z. B. Reply-Zeit)" },
                ],
              },

              /* ============= LIBRARY (generische Blöcke) ============= */

              {
                name: "imageWithText",
                label: "📐 Bild + Text",
                fields: [
                  { type: "string", name: "eyebrow", label: "Eyebrow" },
                  { type: "string", name: "title_top", label: "Headline · Anfang" },
                  { type: "string", name: "title_emphasis", label: "Headline · Goldener Begriff (optional)" },
                  { type: "string", name: "title_bottom", label: "Headline · Ende" },
                  { type: "string", name: "body", label: "Body (HTML erlaubt)", ui: { component: "textarea" } },
                  { type: "image", name: "image_src", label: "Bild" },
                  { type: "string", name: "image_alt", label: "Alt-Text" },
                  { type: "string", name: "image_caption", label: "Caption" },
                  { type: "string", name: "image_prompt", label: "AI-Prompt", ui: { component: "textarea" } },
                  { type: "string", name: "layout", label: "Layout", options: ["image_left", "image_right"] },
                  { type: "string", name: "tone", label: "Tone", options: toneOptions },
                  { type: "string", name: "cta_label", label: "CTA-Label (optional)" },
                  { type: "string", name: "cta_href", label: "CTA-Link" },
                ],
              },

              {
                name: "singleImage",
                label: "🖼 Einzelnes Bild",
                fields: [
                  { type: "image", name: "image_src", label: "Bild" },
                  { type: "string", name: "image_alt", label: "Alt-Text" },
                  { type: "string", name: "image_caption", label: "Caption" },
                  { type: "string", name: "image_prompt", label: "AI-Prompt", ui: { component: "textarea" } },
                  { type: "string", name: "aspect", label: "Aspect Ratio", options: ["16/9", "4/3", "3/2", "1/1", "3/4"] },
                  { type: "number", name: "max_width", label: "Max-Breite (px)" },
                  { type: "string", name: "tone", label: "Tone", options: toneOptions },
                ],
              },

              {
                name: "quote",
                label: "❝ Zitat groß",
                fields: [
                  { type: "string", name: "quote", label: "Zitat (HTML erlaubt)", ui: { component: "textarea" } },
                  { type: "string", name: "author_name", label: "Autor · Name" },
                  { type: "string", name: "author_role", label: "Autor · Rolle" },
                  { type: "string", name: "author_initials", label: "Autor · Initialen" },
                  { type: "string", name: "tone", label: "Tone", options: toneOptions },
                ],
              },

              {
                name: "logoWall",
                label: "🏷 Logo-Wand",
                fields: [
                  { type: "string", name: "eyebrow", label: "Eyebrow (optional)" },
                  { type: "string", name: "tone", label: "Tone", options: toneOptions },
                ],
              },

              {
                name: "faq",
                label: "❓ FAQ-Accordion",
                fields: [
                  { type: "string", name: "eyebrow", label: "Eyebrow" },
                  { type: "string", name: "title_top", label: "Headline · Anfang" },
                  { type: "string", name: "title_emphasis", label: "Headline · Goldener Begriff" },
                  { type: "string", name: "title_bottom", label: "Headline · Ende" },
                  {
                    type: "object",
                    name: "items",
                    label: "Fragen",
                    list: true,
                    ui: { itemProps: (item: { q?: string }) => ({ label: item.q || "Neue Frage" }) },
                    fields: [
                      { type: "string", name: "q", label: "Frage" },
                      { type: "string", name: "a", label: "Antwort (HTML erlaubt)", ui: { component: "textarea" } },
                    ],
                  },
                  { type: "string", name: "tone", label: "Tone", options: toneOptions },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
