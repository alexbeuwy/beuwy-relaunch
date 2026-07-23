import { Fragment, type ReactNode } from "react";

/**
 * Mini-Markup für CMS-Texte: *Wort* → gelbes <em>, _Wort_ → cream <em>.
 * Pure Funktion — nutzbar in Server- und Client-Komponenten.
 */
export function rich(text: string): ReactNode[] {
  return text.split(/(\*[^*\n]+\*|_[^_\n]+_)/g).map((part, i) => {
    if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    if (part.length > 2 && part.startsWith("_") && part.endsWith("_")) {
      return (
        <em key={i} className="em-cream">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

/** \n-getrennte CMS-Listenfelder → Array (leere Zeilen raus). */
export function lines(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}
