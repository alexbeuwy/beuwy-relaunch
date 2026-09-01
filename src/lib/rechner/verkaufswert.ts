/**
 * Verkaufswertrechner — vereinfachtes Vergleichswert-/Sachwert-Modell.
 * Reine Funktion, keine Seiteneffekte. Siehe typen.ts für den Kontrakt
 * (nur diese Datei ist die Quelle der Wahrheit für den Rechenweg, die
 * UI unter /tools/verkaufspreisrechner importiert ausschließlich von
 * hier).
 *
 * Modell: Basis-Quadratmeterpreis (Objekttyp × Stadtgröße) wird
 * multiplikativ über Zustand, Mikrolage und Baujahr korrigiert, mit
 * der Wohnfläche multipliziert (= Gebäudewert), und bei EFH/MFH mit
 * angegebener Grundstücksfläche um einen separaten Bodenwert ergänzt
 * (Sachwert-Logik: Grund und Gebäude altern unterschiedlich). Um den
 * Mittelwert wird eine symmetrische Spanne gelegt, weil ein Modell
 * ohne Objektbesichtigung nie einen Punktwert liefern kann.
 */

import {
  type Objekttyp,
  OBJEKTTYPEN,
  type StadtGroesse,
  STADTGROESSEN,
  STADTGROESSE_LABEL,
  type Mikrolage,
  DREI_STUFEN,
  DREI_STUFEN_LABEL,
  type Zustand,
  ZUSTAENDE,
  ZUSTAND_LABEL,
  type VerkaufswertEingaben,
  type VerkaufswertErgebnis,
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
 * Basis-Quadratmeterpreise je Objekttyp × Stadtgröße, in EUR je m²
 * Wohnfläche. Referenzpunkt: Zustand "gepflegt", Baujahr um 2000,
 * mittlere Mikrolage — Zustands-/Lage-/Altersfaktoren korrigieren von
 * hier ausgehend nach oben oder unten.
 *
 * Herleitung: konservative Näherung an bundesweite Marktberichte für
 * Bestandsimmobilien 2026 (u. a. Gutachterausschuss-Marktberichte,
 * vdp-Preisindizes), bewusst am unteren Rand der jeweiligen
 * Bandbreite gewählt — dieser Rechner soll eine vorsichtige Hausnummer
 * liefern, keine geschönte. Kein amtlicher Bodenrichtwert und kein
 * Ersatz für ein Vergleichswertgutachten (siehe PFLICHTTEXT_ORIENTIERUNG).
 *
 * EFH/MFH: reiner Gebäudewert je m² Wohnfläche — die Grundstücksfläche
 * fließt separat über BODENWERT_PRO_M2 ein (Grund und Gebäude altern
 * unterschiedlich). ETW: Der Miteigentumsanteil am Grundstück steckt
 * marktüblich bereits im Wohnungspreis, deshalb keine separate
 * Bodenwert-Addition bei ETW.
 */
const BASISPREIS_PRO_M2: Record<Objekttyp, Record<StadtGroesse, number>> = {
  ETW: { kleinstadt: 1700, mittelstadt: 2400, grossstadt: 3400, metropole: 5000 },
  EFH: { kleinstadt: 1900, mittelstadt: 2500, grossstadt: 3200, metropole: 4200 },
  MFH: { kleinstadt: 1500, mittelstadt: 2100, grossstadt: 2900, metropole: 4000 },
};

/**
 * Bodenwert je m² Grundstücksfläche, nach Stadtgröße. Nur relevant bei
 * EFH/MFH mit angegebener Grundstücksfläche. Grobe, bewusst
 * konservativ gewählte Näherung an durchschnittliche Bodenrichtwerte
 * 2026 — reale Bodenrichtwerte streuen je nach Kommune um ein
 * Vielfaches; ein amtlicher BORIS-Bodenrichtwert ersetzt diese Zeile
 * in jedem echten Gutachten.
 */
const BODENWERT_PRO_M2: Record<StadtGroesse, number> = {
  kleinstadt: 120,
  mittelstadt: 280,
  grossstadt: 650,
  metropole: 1400,
};

/**
 * Zustandsfaktor, multiplikativ auf den Basis-Quadratmeterpreis.
 * Herleitung: übliche Bandbreite für Instandhaltungsrückstand vs.
 * Neuwertigkeit in Vergleichswertverfahren, auf 3 griffige Stufen
 * vereinfacht (±15–20 % um den Basiswert).
 */
const ZUSTANDSFAKTOR: Record<Zustand, number> = {
  sanierungsbeduerftig: 0.8,
  gepflegt: 1.0,
  neuwertig: 1.15,
};

/**
 * Lagefaktor (Mikrolage INNERHALB der gewählten Stadtgröße),
 * multiplikativ. Die Stadtgröße selbst steckt schon in
 * BASISPREIS_PRO_M2 — dieser Faktor bildet nur noch Randlage vs.
 * bevorzugte Wohnlage ab, Bandbreite ±10–15 %.
 */
const MIKROLAGEFAKTOR: Record<Mikrolage, number> = {
  einfach: 0.9,
  mittel: 1.0,
  gehoben: 1.15,
};

/**
 * Altersfaktor nach Baujahr, multiplikativ. Herleitung: grobe,
 * stufenweise Näherung an den in Vergleichswertverfahren üblichen
 * Alterswertabschlag — je älter der Baujahrgang, desto niedriger der
 * Faktor, mit einem deutlichen Sprung nach oben für Neubauten ab 2020
 * (aktuelle EnEV/GEG-Standards, energetisch werthaltiger). Stufen
 * absteigend sortiert, die erste zutreffende (baujahr >= abBaujahr)
 * gewinnt.
 */
const ALTERSSTUFEN_VERKAUF: readonly { abBaujahr: number; faktor: number }[] = [
  { abBaujahr: 2020, faktor: 1.15 },
  { abBaujahr: 2010, faktor: 1.08 },
  { abBaujahr: 1995, faktor: 1.0 },
  { abBaujahr: 1979, faktor: 0.95 },
  { abBaujahr: 1949, faktor: 0.9 },
  { abBaujahr: -Infinity, faktor: 0.85 },
];

function altersfaktorVerkauf(baujahr: number): number {
  const stufe = ALTERSSTUFEN_VERKAUF.find((s) => baujahr >= s.abBaujahr);
  return (stufe ?? ALTERSSTUFEN_VERKAUF[ALTERSSTUFEN_VERKAUF.length - 1]).faktor;
}

/**
 * Spannenbreite um den Mittelwert, symmetrisch. Bildet die Unschärfe
 * eines vereinfachten Modells ohne Objektbesichtigung ab — reale
 * Vergleichswertgutachten liegen selten enger zusammen als das.
 */
const SPANNE_VERKAUF = 0.1; // ±10 %

// Guardrails gegen Tippfehler/Unsinn, keine fachlichen Grenzen.
const MIN_WOHNFLAECHE = 10; // m² — kleinster realistisch verkaufbarer Wohnraum
const MAX_WOHNFLAECHE = 5000; // m²
const MIN_GRUNDSTUECKSFLAECHE = 1; // m²
const MAX_GRUNDSTUECKSFLAECHE = 500_000; // m² (50 ha)
const MIN_BAUJAHR = 1700;

/* ────────────────────────────────────────────────────────────────
 * Rechenfunktion
 * ──────────────────────────────────────────────────────────────── */

export function berechneVerkaufswert(eingaben: VerkaufswertEingaben): VerkaufswertErgebnis {
  const wohnflaeche = pruefeZahl(eingaben.wohnflaeche, "Wohnfläche", { min: MIN_WOHNFLAECHE, max: MAX_WOHNFLAECHE });
  const baujahr = pruefeGanzzahl(eingaben.baujahr, "Baujahr", { min: MIN_BAUJAHR, max: aktuellesJahr() + 3 });
  const objekttyp = pruefeEnum(eingaben.objekttyp, OBJEKTTYPEN, "Objekttyp");
  const zustand = pruefeEnum(eingaben.zustand, ZUSTAENDE, "Zustand");
  const stadtgroesse = pruefeEnum(eingaben.stadtgroesse, STADTGROESSEN, "Stadtgröße");
  const mikrolage = pruefeEnum(eingaben.mikrolage, DREI_STUFEN, "Mikrolage");

  let grundstuecksflaeche: number | undefined;
  if (eingaben.grundstuecksflaeche !== undefined) {
    grundstuecksflaeche = pruefeZahl(eingaben.grundstuecksflaeche, "Grundstücksfläche", {
      min: MIN_GRUNDSTUECKSFLAECHE,
      max: MAX_GRUNDSTUECKSFLAECHE,
    });
  }

  const basispreis = BASISPREIS_PRO_M2[objekttyp][stadtgroesse];
  const zustandsfaktor = ZUSTANDSFAKTOR[zustand];
  const mikrolagefaktor = MIKROLAGEFAKTOR[mikrolage];
  const altersfaktor = altersfaktorVerkauf(baujahr);

  const gebaeudewertProM2 = basispreis * zustandsfaktor * mikrolagefaktor * altersfaktor;
  const gebaeudewertGesamt = gebaeudewertProM2 * wohnflaeche;

  const schritte: RechenSchritt[] = [
    { label: `Basispreis (${objekttyp}, ${STADTGROESSE_LABEL[stadtgroesse]})`, wert: formatEuroProM2(basispreis) },
    { label: `× Zustandsfaktor (${ZUSTAND_LABEL[zustand]})`, wert: formatFaktor(zustandsfaktor) },
    { label: `× Lagefaktor (Mikrolage ${DREI_STUFEN_LABEL[mikrolage]})`, wert: formatFaktor(mikrolagefaktor) },
    { label: `× Altersfaktor (Baujahr ${baujahr})`, wert: formatFaktor(altersfaktor) },
    { label: "= Gebäudewert je m²", wert: formatEuroProM2(rundeCent(gebaeudewertProM2)) },
    { label: "× Wohnfläche", wert: formatQm(wohnflaeche) },
    { label: "= Gebäudewert gesamt", wert: formatEuro(gebaeudewertGesamt) },
  ];

  let bodenwert = 0;
  if (grundstuecksflaeche !== undefined) {
    if (objekttyp === "ETW") {
      schritte.push({
        label: "Grundstücksfläche",
        wert: "bei ETW nicht separat bewertet — Miteigentumsanteil steckt im m²-Preis",
      });
    } else {
      bodenwert = BODENWERT_PRO_M2[stadtgroesse] * grundstuecksflaeche;
      schritte.push({
        label: `+ Bodenwert (${formatQm(grundstuecksflaeche)} × ${formatEuroProM2(BODENWERT_PRO_M2[stadtgroesse])})`,
        wert: formatEuro(bodenwert),
      });
    }
  }

  const mittelwert = gebaeudewertGesamt + bodenwert;
  const von = mittelwert * (1 - SPANNE_VERKAUF);
  const bis = mittelwert * (1 + SPANNE_VERKAUF);

  schritte.push({ label: "= Verkaufswert (Mittelwert)", wert: formatEuro(mittelwert) });

  return {
    vonEuro: rundeCent(von),
    bisEuro: rundeCent(bis),
    mittelwertEuro: rundeCent(mittelwert),
    schritte,
    hinweis: PFLICHTTEXT_ORIENTIERUNG,
  };
}
