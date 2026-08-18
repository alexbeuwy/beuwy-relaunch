"use client";

import { useId, useState } from "react";

type FaqItem = { q: string; a: string };

/**
 * Accordion nach dem transitions-dev-Muster (grid-rows-Technik, Chevron-Flip).
 * Styling kommt vollständig aus globals.css (.faq-*-Klassen).
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  // Erster Eintrag initial offen, alle anderen zu.
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(() => new Set([0]));
  const baseId = useId();

  function toggle(index: number) {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <div>
      {items.map((item, index) => {
        const isOpen = openIndexes.has(index);
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={triggerId} className="faq-item" data-open={isOpen ? "true" : "false"}>
            <button
              type="button"
              className="faq-trigger"
              aria-expanded={isOpen}
              aria-controls={panelId}
              id={triggerId}
              onClick={() => toggle(index)}
            >
              <span className="t-h3">{item.q}</span>
              <svg
                className="faq-chevron"
                viewBox="0 0 24 24"
                aria-hidden
                focusable="false"
              >
                <path
                  d="M6 10l6 5 6-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </button>
            <div className="faq-panel" id={panelId} role="region" aria-labelledby={triggerId}>
              <div>
                <p className="faq-panel-inner t-body">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
