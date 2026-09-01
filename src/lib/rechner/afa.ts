/**
 * AfA-Rechner — der Kern der Rechner-Engine. Vergleicht die reguläre
 * Gebäude-AfA nach § 7 EStG mit der AfA auf Basis einer Restnutzungs-
 * dauer (RND) nach ImmoWertV-Logik und zeigt den Steuereffekt bei
 * einem wählbaren Grenzsteuersatz. Reine Funktion, keine Seiteneffekte.
 * Die UI unter /tools/afa-rechner importiert ausschließlich von hier.
 *
 * Jedes Ergebnis trägt PFLICHTTEXT_ORIENTIERUNG_AFA — dieser Rechner
 * ersetzt weder ein Restnutzungsdauer-Gutachten noch eine
 * Steuerberatung, er zeigt nur, ob sich ein Gutachten überhaupt lohnen
 * könnte.
 */

import {
  type AfaEingaben,
  type AfaErgebnis,
  type ModernisierungsPunkte,
  type RechenSchritt,
  PFLICHTTEXT_ORIENTIERUNG_AFA,
  aktuellesJahr,
  pruefeZahl,
  pruefeGanzzahl,
  rundeCent,
  formatEuro,
  formatProzent,
  formatZahl,
} from "./typen";

/* ────────────────────────────────────────────────────────────────
 * (a) Reguläre Gebäude-AfA nach § 7 Abs. 4 EStG
 * ──────────────────────────────────────────────────────────────── */

/**
 * Regulärer AfA-Satz, abhängig vom Baujahr/Fertigstellungsjahr des
 * Gebäudes (NICHT vom Erwerbsjahr — der Satz hängt am Gebäude, nicht
 * am Käufer):
 *  - Fertigstellung vor 1925: 2,5 % (§ 7 Abs. 4 Satz 1 Nr. 1 EStG)
 *  - Fertigstellung ab 1.1.2023: 3 % (§ 7 Abs. 4 Satz 1 Nr. 2 Buchst. a,
 *    eingeführt durch das JStG 2022)
 *  - dazwischen (1925–2022): 2 % (§ 7 Abs. 4 Satz 1 Nr. 2 Buchst. b)
 *
 * Vereinfachung: Sonderfälle (denkmalgeschützte Gebäude §§ 7h/7i EStG,
 * befristete degressive AfA-Fenster, Betriebsvermögen mit abweichender
 * Nutzungsdauer) bildet dieser Rechner bewusst NICHT ab — er ist auf
 * den Standardfall "vermietete Bestandsimmobilie im Privatvermögen"
 * zugeschnitten. Siehe PFLICHTTEXT_ORIENTIERUNG_AFA.
 */
function regulaererAfaSatz(baujahr: number): number {
  if (baujahr < 1925) return 0.025;
  if (baujahr >= 2023) return 0.03;
  return 0.02;
}

/* ────────────────────────────────────────────────────────────────
 * (b) Restnutzungsdauer-Modell nach ImmoWertV-Logik
 * ──────────────────────────────────────────────────────────────── */

/**
 * Gesamtnutzungsdauer für Wohnimmobilien, vereinfacht auf einen festen
 * Wert. Herleitung: ImmoWertV Anlage 4 nennt für Wohngebäude
 * typischerweise Gesamtnutzungsdauern von 60–80 Jahren je nach
 * Bauart/Baujahresklasse — dieser Rechner setzt konservativ (= zu
 * Ungunsten einer künstlich kurzen RND) den oberen Wert von 80 Jahren
 * an, der für die meisten massiv gebauten Wohnimmobilien gilt.
 */
const GESAMTNUTZUNGSDAUER_JAHRE = 80;

/**
 * Mindest-Restnutzungsdauer als Untergrenze: Ein bewohntes/vermietetes
 * Gebäude ist per Definition noch wirtschaftlich nutzbar, egal wie alt
 * es ist — die RND fällt in der Sachwertrichtlinie-Praxis deshalb
 * selbst bei hohem Alter und ohne jede Modernisierung selten unter
 * ca. 30 % der Gesamtnutzungsdauer. Hier: 30 % von 80 Jahren = 24 Jahre.
 * Ohne diese Untergrenze würde die reine Alterssubtraktion bei sehr
 * alten Gebäuden negative oder unrealistisch niedrige Werte liefern.
 */
const MINDEST_RND_ANTEIL = 0.3;
const MINDEST_RND_JAHRE = Math.round(GESAMTNUTZUNGSDAUER_JAHRE * MINDEST_RND_ANTEIL); // 24

interface ModernisierungsStufe {
  minPunkte: number;
  verlaengerungJahre: number;
  label: string;
}

/**
 * Gestaffelte Tabelle: Summe der Modernisierungspunkte (6 Bauteile ×
 * 0–2 Punkte, Maximum 12) → zusätzliche Jahre Restnutzungsdauer
 * gegenüber der reinen Alterssubtraktion (Gesamtnutzungsdauer − Alter).
 *
 * Herleitung: eigene, bewusst grob gestufte Vereinfachung der
 * Modernisierungsgrad-Tabellen aus der Sachwertrichtlinie (Anlage 4,
 * "Wirtschaftliche Restnutzungsdauer bei Modernisierungen") — dort
 * hängt die Verlängerung zusätzlich vom Gebäudealter und der genauen
 * Nutzungsdauerklasse ab, was für ein Online-Orientierungstool zu
 * granular wäre. Die Stufen sind linear zwischen 0 und dem Maximum von
 * 32 Jahren (bei 10–12 Punkten) gestaffelt; die Höchststufe
 * ("umfassend modernisiert") kommt einem Neubau wirtschaftlich nahe,
 * ohne die Gesamtnutzungsdauer formal zu überschreiten (RND wird unten
 * ohnehin auf GESAMTNUTZUNGSDAUER_JAHRE gedeckelt).
 * Absteigend sortiert, die erste zutreffende Stufe (punkte >= minPunkte) gewinnt.
 */
const MODERNISIERUNGS_STUFEN: readonly ModernisierungsStufe[] = [
  { minPunkte: 10, verlaengerungJahre: 32, label: "umfassend modernisiert" },
  { minPunkte: 8, verlaengerungJahre: 26, label: "weitgehend modernisiert" },
  { minPunkte: 6, verlaengerungJahre: 20, label: "überwiegend modernisiert" },
  { minPunkte: 4, verlaengerungJahre: 14, label: "teilmodernisiert" },
  { minPunkte: 2, verlaengerungJahre: 8, label: "leicht modernisiert" },
  { minPunkte: 0, verlaengerungJahre: 0, label: "nicht modernisiert" },
];

function modernisierungsStufe(punkteGesamt: number): ModernisierungsStufe {
  const treffer = MODERNISIERUNGS_STUFEN.find((s) => punkteGesamt >= s.minPunkte);
  return treffer ?? MODERNISIERUNGS_STUFEN[MODERNISIERUNGS_STUFEN.length - 1];
}

const BAUTEILE: readonly (keyof ModernisierungsPunkte)[] = ["dach", "fenster", "heizung", "bad", "elektrik", "grundriss"];
const BAUTEIL_LABEL: Record<keyof ModernisierungsPunkte, string> = {
  dach: "Dach",
  fenster: "Fenster",
  heizung: "Heizung",
  bad: "Bad",
  elektrik: "Elektrik",
  grundriss: "Grundriss",
};

function pruefeModernisierung(m: ModernisierungsPunkte): ModernisierungsPunkte {
  const geprueft = {} as ModernisierungsPunkte;
  for (const bauteil of BAUTEILE) {
    geprueft[bauteil] = pruefeGanzzahl(m?.[bauteil], `Modernisierung ${BAUTEIL_LABEL[bauteil]}`, { min: 0, max: 2 });
  }
  return geprueft;
}

/* ────────────────────────────────────────────────────────────────
 * (c) Gutachten-Effekt
 * ──────────────────────────────────────────────────────────────── */

// Guardrails gegen Tippfehler/Unsinn.
const MIN_KAUFPREIS = 1000; // EUR
const MAX_KAUFPREIS = 500_000_000; // EUR
const MIN_BAUJAHR = 1700;
const MIN_BEWERTUNGSJAHR = 1900;
const MAX_BEWERTUNGSJAHR = 2200;
const DEFAULT_GEBAEUDEANTEIL_PROZENT = 80;
const DEFAULT_GRENZSTEUERSATZ_PROZENT = 42;
const JAHRE_MEHRJAHRESBETRACHTUNG = 10;

export function berechneAfa(eingaben: AfaEingaben): AfaErgebnis {
  const kaufpreisGesamt = pruefeZahl(eingaben.kaufpreisGesamt, "Kaufpreis", { min: MIN_KAUFPREIS, max: MAX_KAUFPREIS });

  const gebaeudeanteilProzent =
    eingaben.gebaeudeanteilProzent === undefined
      ? DEFAULT_GEBAEUDEANTEIL_PROZENT
      : pruefeZahl(eingaben.gebaeudeanteilProzent, "Gebäudeanteil", { min: 1, max: 100 });

  const bewertungsjahr =
    eingaben.bewertungsjahr === undefined
      ? aktuellesJahr()
      : pruefeGanzzahl(eingaben.bewertungsjahr, "Bewertungsjahr", { min: MIN_BEWERTUNGSJAHR, max: MAX_BEWERTUNGSJAHR });

  // Baujahr darf das Bewertungsjahr nicht überschreiten — ein Gebäude
  // kann nicht abgeschrieben werden, bevor es fertiggestellt ist.
  const baujahr = pruefeGanzzahl(eingaben.baujahr, "Baujahr", { min: MIN_BAUJAHR, max: bewertungsjahr });

  const grenzsteuersatzProzent =
    eingaben.grenzsteuersatzProzent === undefined
      ? DEFAULT_GRENZSTEUERSATZ_PROZENT
      : pruefeZahl(eingaben.grenzsteuersatzProzent, "Grenzsteuersatz", { min: 0, max: 100 });

  const modernisierung = pruefeModernisierung(eingaben.modernisierung);

  const gebaeudewert = kaufpreisGesamt * (gebaeudeanteilProzent / 100);
  const alter = bewertungsjahr - baujahr;

  const punkteGesamt = BAUTEILE.reduce((summe, bauteil) => summe + modernisierung[bauteil], 0);
  const stufe = modernisierungsStufe(punkteGesamt);

  const rndRoh = GESAMTNUTZUNGSDAUER_JAHRE - alter + stufe.verlaengerungJahre;
  const restnutzungsdauer = Math.max(MINDEST_RND_JAHRE, Math.min(GESAMTNUTZUNGSDAUER_JAHRE, rndRoh));

  const afaSatzRegulaer = regulaererAfaSatz(baujahr);

  /**
   * "Gesetzliche Nutzungsdauer" = die Gesamtlaufzeit, die der flache
   * gesetzliche Satz implizit unterstellt (1 / Satz, z. B. 50 Jahre bei
   * 2 %). Das ist die Vergleichsgröße für den Gutachten-Effekt: eine
   * per Gutachten ermittelte RND lohnt sich nur, wenn sie KÜRZER ist
   * als diese gesetzlich unterstellte Nutzungsdauer — denn nur dann
   * ist 100/RND rechnerisch größer als der reguläre Satz und die AfA
   * pro Jahr höher. Bewusst NICHT um "alter" reduziert: Der reguläre
   * Satz gilt für jeden Erwerber unverändert ab Anschaffung weiter,
   * unabhängig vom Gebäudealter — die gesetzliche Nutzungsdauer
   * "startet" also gedanklich nicht neu bei jedem Verkauf, sie ist die
   * feste Bezugsgröße des Prozentsatzes selbst.
   */
  const gesetzlicheNutzungsdauerJahre = 1 / afaSatzRegulaer;
  const gutachtenGreift = restnutzungsdauer < gesetzlicheNutzungsdauerJahre;
  const afaSatzGutachten = gutachtenGreift ? 1 / restnutzungsdauer : afaSatzRegulaer;

  const afaRegulaerProJahr = gebaeudewert * afaSatzRegulaer;
  const afaGutachtenProJahr = gebaeudewert * afaSatzGutachten;
  const mehrAbschreibungProJahr = Math.max(0, afaGutachtenProJahr - afaRegulaerProJahr);
  const mehrAbschreibungUeber10Jahre = mehrAbschreibungProJahr * JAHRE_MEHRJAHRESBETRACHTUNG;

  const steuerersparnisProJahr = mehrAbschreibungProJahr * (grenzsteuersatzProzent / 100);
  const steuerersparnisUeber10Jahre = steuerersparnisProJahr * JAHRE_MEHRJAHRESBETRACHTUNG;

  const schritte: RechenSchritt[] = [
    {
      label: "Gebäudewert (Kaufpreis × Gebäudeanteil)",
      wert: `${formatEuro(kaufpreisGesamt)} × ${formatProzent(gebaeudeanteilProzent, 0)} = ${formatEuro(gebaeudewert)}`,
    },
    { label: "Alter des Gebäudes", wert: `${bewertungsjahr} − ${baujahr} = ${formatZahl(alter)} Jahre` },
    { label: "Gesamtnutzungsdauer (Wohnimmobilie, ImmoWertV-Logik)", wert: `${GESAMTNUTZUNGSDAUER_JAHRE} Jahre` },
    {
      label: `Modernisierung (${punkteGesamt} von 12 Punkten)`,
      wert: `${stufe.label}, +${stufe.verlaengerungJahre} Jahre`,
    },
    { label: "Restnutzungsdauer (RND)", wert: `${formatZahl(restnutzungsdauer)} Jahre` },
    {
      label: "Regulärer AfA-Satz (§ 7 EStG)",
      wert: `${formatProzent(afaSatzRegulaer * 100, 1)} → ${formatEuro(afaRegulaerProJahr)}/Jahr`,
    },
    {
      label: "AfA-Satz mit Restnutzungsdauer-Gutachten",
      wert: gutachtenGreift
        ? `100 / ${formatZahl(restnutzungsdauer)} = ${formatProzent(afaSatzGutachten * 100, 1)} → ${formatEuro(afaGutachtenProJahr)}/Jahr`
        : "kein Vorteil — Restnutzungsdauer liegt nicht unter der gesetzlich unterstellten Nutzungsdauer",
    },
    { label: "Mehr-Abschreibung pro Jahr", wert: formatEuro(mehrAbschreibungProJahr) },
    { label: `Mehr-Abschreibung über ${JAHRE_MEHRJAHRESBETRACHTUNG} Jahre`, wert: formatEuro(mehrAbschreibungUeber10Jahre) },
    {
      label: `Steuereffekt bei ${formatProzent(grenzsteuersatzProzent, 0)} Grenzsteuersatz`,
      wert: `${formatEuro(steuerersparnisProJahr)}/Jahr, ${formatEuro(steuerersparnisUeber10Jahre)} über ${JAHRE_MEHRJAHRESBETRACHTUNG} Jahre`,
    },
  ];

  return {
    gebaeudewertEuro: rundeCent(gebaeudewert),
    alterJahre: alter,
    gesamtnutzungsdauerJahre: GESAMTNUTZUNGSDAUER_JAHRE,
    modernisierungspunkteGesamt: punkteGesamt,
    modernisierungsgrad: stufe.label,
    restnutzungsdauerJahre: restnutzungsdauer,
    gutachtenGreift,
    afaSatzRegulaerProzent: rundeCent(afaSatzRegulaer * 100),
    afaSatzGutachtenProzent: rundeCent(afaSatzGutachten * 100),
    afaRegulaerProJahrEuro: rundeCent(afaRegulaerProJahr),
    afaGutachtenProJahrEuro: rundeCent(afaGutachtenProJahr),
    mehrAbschreibungProJahrEuro: rundeCent(mehrAbschreibungProJahr),
    mehrAbschreibungUeber10JahreEuro: rundeCent(mehrAbschreibungUeber10Jahre),
    grenzsteuersatzProzent,
    steuerersparnisProJahrEuro: rundeCent(steuerersparnisProJahr),
    steuerersparnisUeber10JahreEuro: rundeCent(steuerersparnisUeber10Jahre),
    schritte,
    hinweis: PFLICHTTEXT_ORIENTIERUNG_AFA,
  };
}
