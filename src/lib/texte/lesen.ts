/**
 * Lesehelfer für Studio-Texte auf Unterseiten (R11, 14.09 — „Studio ist
 * immer 1:1 live").
 *
 * Konvention: jede öffentliche Seite registriert ihre Texte in
 * src/lib/texte/seiten/<slug>.ts (DEFAULTS + LABELS, Präfix `s.<slug>.`),
 * tools/texte-index.mjs sammelt alle Seiten in seiten/index.ts, content.ts
 * spreadet sie. Die Seite liest über getContent() und diesen Helfer:
 *
 *   const c = await getContent();
 *   const t = seitenTexte(c, "geo-checkliste");
 *   t("hero.titel")                       → c["s.geo-checkliste.hero.titel"]
 *   t.liste("daten", ["titel", "text"])   → [{ titel, text }, …] aus
 *                                            s.geo-checkliste.daten.1.titel …
 *
 * Listen sind 1-basiert nummeriert und enden beim ersten fehlenden
 * Index — Alex kann im Studio Einträge leeren, aber nicht umsortieren
 * (bewusst: kein Struktur-Editor, nur Texte).
 */

export type SeitenTexte = ((feld: string) => string) & {
  liste: <F extends string>(name: string, felder: readonly F[]) => Array<Record<F, string>>;
  slug: string;
};

export function seitenTexte(c: Record<string, string>, slug: string): SeitenTexte {
  const praefix = `s.${slug}.`;
  const t = ((feld: string) => c[`${praefix}${feld}`] ?? "") as SeitenTexte;
  t.slug = slug;
  t.liste = <F extends string>(name: string, felder: readonly F[]) => {
    const aus: Array<Record<F, string>> = [];
    for (let i = 1; i < 500; i++) {
      const erster = `${praefix}${name}.${i}.${felder[0]}`;
      if (!(erster in c)) break;
      const eintrag = {} as Record<F, string>;
      for (const f of felder) eintrag[f] = c[`${praefix}${name}.${i}.${f}`] ?? "";
      aus.push(eintrag);
    }
    return aus;
  };
  return t;
}

/** Hilfe beim Registrieren: Liste → nummerierte Keys (Defaults + Labels). */
export function listeRegistrieren<F extends string>(
  slug: string,
  name: string,
  label: string,
  eintraege: Array<Record<F, string>>,
  feldLabels: Record<F, string>,
): { defaults: Record<string, string>; labels: Record<string, string> } {
  const defaults: Record<string, string> = {};
  const labels: Record<string, string> = {};
  eintraege.forEach((e, i) => {
    for (const f of Object.keys(e) as F[]) {
      const key = `s.${slug}.${name}.${i + 1}.${f}`;
      defaults[key] = e[f];
      labels[key] = `${label} ${i + 1} · ${feldLabels[f]}`;
    }
  });
  return { defaults, labels };
}
