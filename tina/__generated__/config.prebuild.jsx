// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  // Cloud credentials (optional — empty = pure local mode, edits write to disk).
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "assets",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "json",
        ui: {
          router: ({ document }) => document._sys.filename === "home" ? "/" : `/${document._sys.filename}`
        },
        fields: [
          /* ---------------- HERO ---------------- */
          {
            type: "object",
            name: "hero",
            label: "01 \xB7 Hero",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow chip" },
              { type: "string", name: "title_top", label: "Headline \xB7 Zeile 1" },
              { type: "string", name: "title_mid_before", label: "Headline \xB7 Vor Emphasis" },
              { type: "string", name: "title_emphasis", label: "Headline \xB7 Goldener Emphasis-Begriff" },
              { type: "string", name: "title_mid_after", label: "Headline \xB7 Nach Emphasis" },
              { type: "string", name: "subtitle", label: "Subtitle", ui: { component: "textarea" } },
              { type: "string", name: "audit_placeholder", label: "Audit \xB7 Input-Placeholder" },
              { type: "string", name: "audit_cta", label: "Audit \xB7 Button-Label" },
              { type: "string", name: "audit_hint", label: "Audit \xB7 Hint-Text", ui: { component: "textarea" } },
              { type: "string", name: "secondary_link_label", label: "Sekund\xE4rer Link" },
              { type: "string", name: "meta_response", label: "Meta \xB7 Antwortzeit" },
              { type: "string", name: "meta_slots", label: "Meta \xB7 Slot-Hinweis" }
            ]
          },
          /* ---------------- PAIN ---------------- */
          {
            type: "object",
            name: "pain",
            label: "02 \xB7 Pain (Diagnose-Tabelle)",
            fields: [
              { type: "string", name: "eyebrow_num", label: "Eyebrow \xB7 Zahl" },
              { type: "string", name: "eyebrow_text", label: "Eyebrow \xB7 Text" },
              { type: "string", name: "title_top", label: "Headline \xB7 Zeile 1" },
              { type: "string", name: "title_emphasis", label: "Headline \xB7 Goldener Begriff" },
              { type: "string", name: "title_bottom", label: "Headline \xB7 Zeile 2" },
              { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } },
              {
                type: "object",
                name: "rows",
                label: "Tabellen-Zeilen",
                list: true,
                ui: { itemProps: (item) => ({ label: item.k || "Neue Zeile" }) },
                fields: [
                  { type: "string", name: "k", label: "Spalte 1 \xB7 Key" },
                  { type: "string", name: "now", label: "Spalte 2 \xB7 Jetzt (HTML erlaubt)" },
                  { type: "string", name: "after", label: "Spalte 3 \xB7 Nach beuwy" }
                ]
              }
            ]
          },
          /* ---------------- DREAM ---------------- */
          {
            type: "object",
            name: "dream",
            label: "03 \xB7 Dream State",
            fields: [
              { type: "string", name: "title_top", label: "Headline \xB7 Teil 1" },
              { type: "string", name: "title_emphasis", label: "Headline \xB7 Italic-Wort" },
              { type: "string", name: "title_bottom", label: "Headline \xB7 Teil 2" },
              { type: "string", name: "description", label: "Beschreibung (HTML erlaubt)", ui: { component: "textarea" } },
              { type: "image", name: "image_src", label: "Bild (Drag&Drop oder Pfad)" },
              { type: "string", name: "image_alt", label: "Bild \xB7 Alt-Text" },
              { type: "string", name: "image_caption", label: "Bild \xB7 Caption" },
              { type: "string", name: "image_prompt", label: "Bild \xB7 AI-Prompt (f\xFCr Generierung)", ui: { component: "textarea" } }
            ]
          },
          /* ---------------- MECHANISM ---------------- */
          {
            type: "object",
            name: "mechanism",
            label: "04 \xB7 Mechanism",
            fields: [
              { type: "string", name: "title_top", label: "Headline \xB7 Zeile 1" },
              { type: "string", name: "title_bottom_before", label: "Headline \xB7 Vor Emphasis" },
              { type: "string", name: "title_emphasis", label: "Headline \xB7 Goldener Begriff" },
              { type: "string", name: "title_bottom_after", label: "Headline \xB7 Nach Emphasis" },
              { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } },
              { type: "string", name: "input_chip", label: "Input-Chip" },
              { type: "string", name: "output_chip", label: "Output-Chip" },
              { type: "string", name: "output_meta", label: "Output-Meta" },
              {
                type: "object",
                name: "layers",
                label: "Layer (3)",
                list: true,
                ui: { itemProps: (item) => ({ label: item.t || "Neuer Layer" }) },
                fields: [
                  { type: "string", name: "num", label: "Nummer (z. B. 01)" },
                  { type: "string", name: "t", label: "Titel" },
                  { type: "string", name: "sub", label: "Untertitel" },
                  { type: "string", name: "out", label: "Output-Label" }
                ]
              }
            ]
          },
          /* ---------------- PROOF ---------------- */
          {
            type: "object",
            name: "proof",
            label: "05 \xB7 Proof Stack",
            fields: [
              { type: "string", name: "title_emphasis", label: "Headline \xB7 Goldener Betrag" },
              { type: "string", name: "title_top_after", label: "Headline \xB7 Nach Betrag" },
              { type: "string", name: "title_bottom", label: "Headline \xB7 Zeile 2" },
              { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } },
              {
                type: "object",
                name: "counters",
                label: "Counter-Wand (4)",
                list: true,
                ui: { itemProps: (item) => ({ label: item.label || "Neuer Counter" }) },
                fields: [
                  { type: "string", name: "prefix", label: "Prefix (\u20AC, $, \u2026)" },
                  { type: "number", name: "value", label: "Endwert (Zahl)" },
                  { type: "string", name: "suffix", label: "Suffix (M, M+, %, \u2026)" },
                  { type: "string", name: "display", label: "Anzeige (f\xFCr Screenreader)" },
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "source", label: "Quelle" }
                ]
              },
              {
                type: "object",
                name: "cases",
                label: "Case Cards (3)",
                list: true,
                ui: { itemProps: (item) => ({ label: item.client || "Neuer Case" }) },
                fields: [
                  { type: "string", name: "client", label: "Kunde" },
                  { type: "string", name: "years", label: "Zeitraum" },
                  { type: "string", name: "kpi", label: "KPI (gro\xDF)" },
                  { type: "string", name: "kpiLabel", label: "KPI-Label" },
                  { type: "string", name: "note", label: "Notiz", ui: { component: "textarea" } },
                  { type: "string", name: "href", label: "Link" }
                ]
              },
              { type: "string", name: "testimonials_eyebrow", label: "Testimonials \xB7 Eyebrow" },
              { type: "string", name: "founder_eyebrow", label: "Founder \xB7 Eyebrow" },
              { type: "string", name: "founder_bio", label: "Founder \xB7 Bio (HTML erlaubt)", ui: { component: "textarea" } },
              { type: "string", name: "founder_initials", label: "Founder \xB7 Initialen" },
              { type: "string", name: "founder_name", label: "Founder \xB7 Name" },
              { type: "string", name: "founder_role", label: "Founder \xB7 Rolle" },
              { type: "string", name: "founder_quote", label: "Founder \xB7 Zitat (HTML erlaubt)", ui: { component: "textarea" } }
            ]
          },
          /* ---------------- OFFER ---------------- */
          {
            type: "object",
            name: "offer",
            label: "07 \xB7 Offer",
            fields: [
              { type: "string", name: "title_top", label: "Headline \xB7 Zeile 1" },
              { type: "string", name: "title_emphasis", label: "Headline \xB7 Italic-Phrase" },
              { type: "string", name: "title_bottom", label: "Headline \xB7 Zeile 2 (z. B. Punkt)" },
              {
                type: "object",
                name: "deliverables",
                label: "Deliverables (4)",
                list: true,
                ui: { itemProps: (item) => ({ label: item.t || "Neues Deliverable" }) },
                fields: [
                  { type: "string", name: "t", label: "Titel" },
                  { type: "string", name: "d", label: "Beschreibung", ui: { component: "textarea" } }
                ]
              }
            ]
          },
          /* ---------------- SCARCITY ---------------- */
          {
            type: "object",
            name: "scarcity",
            label: "08 \xB7 Scarcity",
            fields: [
              { type: "string", name: "title_top", label: "Headline \xB7 Zeile 1" },
              { type: "string", name: "title_emphasis", label: "Headline \xB7 Goldener Begriff" },
              { type: "string", name: "title_mid", label: "Headline \xB7 Mid" },
              { type: "string", name: "title_bottom", label: "Headline \xB7 Zeile 2" },
              { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } },
              { type: "string", name: "cta_label", label: "CTA-Label" },
              { type: "string", name: "cta_href", label: "CTA-Link" },
              {
                type: "object",
                name: "slots",
                label: "Slot-Plan",
                list: true,
                ui: { itemProps: (item) => ({ label: item.q || "Neuer Slot" }) },
                fields: [
                  { type: "string", name: "q", label: "Quartal (z. B. Q3/2026)" },
                  {
                    type: "string",
                    name: "state",
                    label: "Status",
                    options: ["shipped", "open", "waitlist"]
                  }
                ]
              }
            ]
          },
          /* ---------------- IDENTIFICATION ---------------- */
          {
            type: "object",
            name: "identification",
            label: "09 \xB7 Identification",
            fields: [
              { type: "string", name: "eyebrow_num", label: "Eyebrow \xB7 Erstes Wort" },
              { type: "string", name: "eyebrow_text", label: "Eyebrow \xB7 Rest" },
              { type: "string", name: "title_top", label: "Headline \xB7 Zeile 1" },
              { type: "string", name: "title_bottom_before", label: "Headline \xB7 Vor Emphasis" },
              { type: "string", name: "title_emphasis", label: "Headline \xB7 Goldener Begriff" },
              { type: "string", name: "title_bottom_after", label: "Headline \xB7 Nach Emphasis" },
              {
                type: "object",
                name: "cards",
                label: "Karten (5)",
                list: true,
                ui: { itemProps: (item) => ({ label: item.t || "Neue Karte" }) },
                fields: [
                  { type: "string", name: "n", label: "Nummer" },
                  { type: "string", name: "t", label: "Titel" },
                  { type: "string", name: "s", label: "Body (HTML erlaubt)", ui: { component: "textarea" } }
                ]
              },
              { type: "string", name: "kicker", label: "Kicker-Zeile (HTML erlaubt)", ui: { component: "textarea" } }
            ]
          },
          /* ---------------- MAGNET ---------------- */
          {
            type: "object",
            name: "magnet",
            label: "10 \xB7 Magnet (Free Audit)",
            fields: [
              { type: "string", name: "title_top", label: "Headline \xB7 Zeile 1" },
              { type: "string", name: "title_emphasis", label: "Headline \xB7 Italic-Wort" },
              { type: "string", name: "title_bottom", label: "Headline \xB7 Zeile 2" },
              { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } },
              { type: "string", name: "audit_placeholder", label: "Audit \xB7 Placeholder" },
              { type: "string", name: "audit_cta", label: "Audit \xB7 Button" },
              { type: "string", name: "audit_hint", label: "Audit \xB7 Hint" }
            ]
          },
          /* ---------------- BIG CTA ---------------- */
          {
            type: "object",
            name: "bigCta",
            label: "11 \xB7 Big CTA (Footer-Block)",
            fields: [
              { type: "string", name: "title_top", label: "Headline \xB7 Zeile 1" },
              { type: "string", name: "title_emphasis", label: "Headline \xB7 Italic-Frage" },
              { type: "string", name: "primary_label", label: "Primary-CTA \xB7 Label" },
              { type: "string", name: "primary_href", label: "Primary-CTA \xB7 Link" },
              { type: "string", name: "secondary_label", label: "Secondary-CTA \xB7 Label" },
              { type: "string", name: "secondary_href", label: "Secondary-CTA \xB7 Link" },
              { type: "string", name: "meta", label: "Meta-Hinweis (z. B. Reply-Zeit)" }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
