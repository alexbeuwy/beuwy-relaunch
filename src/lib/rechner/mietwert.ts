/**
 * Mietwertrechner — Kaltmiete-Spanne, analog zum Verkaufswertrechner
 * aufgebaut (siehe verkaufswert.ts für die grundsätzliche Modell-
 * Begründung). Reine Funktion, keine Seiteneffekte. Die UI unter
 * /tools/mietpreisrechner importiert ausschließlich von hier.
 *
 * Modell: Basis-Kaltmiete je m² (Objekttyp × Stadtgröße) wird
 * multiplikativ über Zustand, Ausstattung und Baujahr korrigiert und
 * mit der Wohnfläche multipliziert. Um den Mittelwert wird eine
 * symmetrische Spanne gelegt (enger als beim Verkaufswert, weil
 * Mietpreise typischerweise weniger streuen als Kaufpreise).
 */

import {
  type Objekttyp,
  OBJEKTTYPEN,
  type StadtGroesse,
  STADTGROESSEN,
  STADTGROESSE_LABEL,
  type Ausstattung,
  DREI_STUFEN,
  DREI_STUFEN_LABEL,
  type Zustand,
  ZUSTAENDE,
  ZUSTAND_LABEL,
  type MietwertEingaben,
  type MietwertErgebnis,
  type RechenSchritt,
  PFLICHTTEXT_ORIENTIERUNG,
  aktuellesJahr,
  pruefeZahl,
  pruefeGanzzahl,
  pruefeEnum,
  rundeCent,
  formatEuro,
  formatEuroProM2,
  formatQm,
  formatFaktor,
} from "./typen";

/* ────────────────────────────────────────────────────────────────
 * Konstanten — jede Annahme dokumentiert mit Herleitung.
 * ──────────────────────────────────────────────────────────────── */

/**
 * Kaltmiete-Basispreise je Objekttyp × Stadtgröße, in EUR je m² und
 * Monat. Referenzpunkt: Zustand "gepflegt", Ausstattung "mittel",
 * Baujahr um 2000.
 *
 * Herleitung: konservative Näherung an bundesweite Mietspiegel-/
 * Marktberichte 2026 (u. a. F+B-Wohn-Index, Marktdaten großer
 * Immobilienportale), bewusst am unteren Rand der jeweiligen
 * Bandbreite gewählt. Kein Mietspiegel-Ersatz und keine ortsübliche
 * Vergleichsmiete im Sinne des BGB (siehe PFLICHTTEXT_ORIENTIERUNG).
 *
 * MFH bildet hier die durchschnittliche Einheit in einem Mehrfamilien-
 * haus ab, tendenziell etwas unter ETW-Niveau wegen des typischen
 * Bestandsmix (kleinere/ältere Einheiten im Schnitt).
 */
const BASISMIETE_PRO_M2: Record<Objekttyp, Record<StadtGroesse, number>> = {
  ETW: { kleinstadt: 6.5, mittelstadt: 8.5, grossstadt: 11.5, metropole: 16.0 },
  EFH: { kleinstadt: 6.0, mittelstadt: 7.5, grossstadt: 9.5, metropole: 13.0 },
  MFH: { kleinstadt: 5.5, mittelstadt: 7.0, grossstadt: 9.0, metropole: 12.5 },
};

/**
 * Zustandsfaktor Miete, multiplikativ. Bandbreite enger als beim
 * Verkaufswert (±10–15 % statt ±15–20 %) — der Zustand eines Objekts
 * schlägt sich bei Mieten typischerweise schwächer nieder als beim
 * Kaufpreis, weil Mieter kurzfristiger denken als Käufer.
 */
const ZUSTANDSFAKTOR_MIETE: Record<Zustand, number> = {
  sanierungsbeduerftig: 0.85,
  gepflegt: 1.0,
  neuwertig: 1.1,
};

/**
 * Ausstattungsfaktor, multiplikativ — bildet den Unterschied zwischen
 * einfacher Grundausstattung und gehobener Ausstattung (Einbauküche,
 * hochwertige Bäder, Fußbodenheizung o. Ä.) ab. Bandbreite ±10–15 %,
 * an dieselbe Größenordnung wie den Zustandsfaktor angelehnt.
 */
const AUSSTATTUNGSFAKTOR: Record<Ausstattung, number> = {
  einfach: 0.9,
  mittel: 1.0,
  gehoben: 1.15,
};

/**
 * Baujahrsfaktor (Altersfaktor) Miete, multiplikativ. Herleitung:
 * flachere Kurve als beim Verkaufswert — energetischer Zustand und
 * Baujahr wirken sich auf die erzielbare Miete schwächer aus als auf
 * den Kaufpreis, weil Nebenkosten (die stärker vom energetischen
 * Zustand abhängen) separat von der Kaltmiete abgerechnet werden.
 * Stufen absteigend sortiert, die erste zutreffende gewinnt.
 */
const ALTERSSTUFEN_MIETE: readonly { abBaujahr: number; faktor: number }[] = [
  { abBaujahr: 2020, faktor: 1.12 },
  { abBaujahr: 2010, faktor: 1.05 },
  { abBaujahr: 1995, faktor: 1.0 },
  { abBaujahr: 1979, faktor: 0.96 },
  { abBaujahr: 1949, faktor: 0.92 },
  { abBaujahr: -Infinity, faktor: 0.9 },
];

function altersfaktorMiete(baujahr: number): number {
  const stufe = ALTERSSTUFEN_MIETE.find((s) => baujahr >= s.abBaujahr);
  return (stufe ?? ALTERSSTUFEN_MIETE[ALTERSSTUFEN_MIETE.length - 1]).faktor;
}

/**
 * Spannenbreite um den Mittelwert, symmetrisch. Enger als beim
 * Verkaufswert (±8 % statt ±10 %) — Mietpreise streuen in der Praxis
 * typischerweise enger als Kaufpreise, weil Mietspiegel/Vergleichs-
 * mieten den Markt stärker vereinheitlichen.
 */
const SPANNE_MIETE = 0.08; // ±8 %

/**
 * Stadtgrößen, in denen die Mietpreisbremse (§ 556d BGB) typischerweise
 * relevant ist — sie gilt nur in von Landesregierungen ausgewiesenen
 * "Gebieten mit angespanntem Wohnungsmarkt", die überproportional in
 * größeren Städten liegen. Reine Orientierungs-Heuristik nach
 * Stadtgröße, kein Abgleich mit einer echten Gebietskulisse — deshalb
 * nur als Hinweis-Flag, nie als Berechnungsgrundlage.
 */
const MIETPREISBREMSE_STADTGROESSEN: readonly StadtGroesse[] = ["grossstadt", "metropole"];

// Guardrails gegen Tippfehler/Unsinn, keine fachlichen Grenzen.
const MIN_WOHNFLAECHE = 10; // m²
const MAX_WOHNFLAECHE = 5000; // m²
const MIN_BAUJAHR = 1700;

/* ────────────────────────────────────────────────────────────────
 * Rechenfunktion
 * ──────────────────────────────────────────────────────────────── */

export function berechneMietwert(eingaben: MietwertEingaben): MietwertErgebnis {
  const wohnflaeche = pruefeZahl(eingaben.wohnflaeche, "Wohnfläche", { min: MIN_WOHNFLAECHE, max: MAX_WOHNFLAECHE });
  const baujahr = pruefeGanzzahl(eingaben.baujahr, "Baujahr", { min: MIN_BAUJAHR, max: aktuellesJahr() + 3 });
  const objekttyp = pruefeEnum(eingaben.objekttyp, OBJEKTTYPEN, "Objekttyp");
  const zustand = pruefeEnum(eingaben.zustand, ZUSTAENDE, "Zustand");
  const ausstattung = pruefeEnum(eingaben.ausstattung, DREI_STUFEN, "Ausstattung");
  const stadtgroesse = pruefeEnum(eingaben.stadtgroesse, STADTGROESSEN, "Stadtgröße");

  const basismiete = BASISMIETE_PRO_M2[objekttyp][stadtgroesse];
  const zustandsfaktor = ZUSTANDSFAKTOR_MIETE[zustand];
  const ausstattungsfaktor = AUSSTATTUNGSFAKTOR[ausstattung];
  const altersfaktor = altersfaktorMiete(baujahr);

  const kaltmieteProM2 = basismiete * zustandsfaktor * ausstattungsfaktor * altersfaktor;
  const kaltmieteGesamt = kaltmieteProM2 * wohnflaeche;

  const von = kaltmieteGesamt * (1 - SPANNE_MIETE);
  const bis = kaltmieteGesamt * (1 + SPANNE_MIETE);

  const schritte: RechenSchritt[] = [
    { label: `Basismiete (${objekttyp}, ${STADTGROESSE_LABEL[stadtgroesse]})`, wert: formatEuroProM2(basismiete, 2) },
    { label: `× Zustandsfaktor (${ZUSTAND_LABEL[zustand]})`, wert: formatFaktor(zustandsfaktor) },
    { label: `× Ausstattungsfaktor (${DREI_STUFEN_LABEL[ausstattung]})`, wert: formatFaktor(ausstattungsfaktor) },
    { label: `× Baujahrsfaktor (Baujahr ${baujahr})`, wert: formatFaktor(altersfaktor) },
    { label: "= Kaltmiete je m²", wert: formatEuroProM2(rundeCent(kaltmieteProM2), 2) },
    { label: "× Wohnfläche", wert: formatQm(wohnflaeche) },
    { label: "= Kaltmiete gesamt (Mittelwert, monatlich)", wert: formatEuro(kaltmieteGesamt, 2) },
  ];

  const mietpreisbremse = MIETPREISBREMSE_STADTGROESSEN.includes(stadtgroesse);
  if (mietpreisbremse) {
    schritte.push({
      label: "Hinweis Mietpreisbremse",
      wert: "In dieser Stadtgröße kann die Mietpreisbremse die zulässige Neuvermietungsmiete begrenzen.",
    });
  }

  return {
    vonEuro: rundeCent(von),
    bisEuro: rundeCent(bis),
    mittelwertEuro: rundeCent(kaltmieteGesamt),
    mietpreisbremse,
    schritte,
    hinweis: PFLICHTTEXT_ORIENTIERUNG,
  };
}
