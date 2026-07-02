"use client";

/**
 * Client-Wrapper: lädt das Three.js-Spiel nur im Browser (ssr: false) und
 * nur auf dieser Route — three (~160 KB gz) landet nicht im globalen Bundle.
 */

import dynamic from "next/dynamic";

const BeuwyGame = dynamic(() => import("./BeuwyGame").then((m) => m.BeuwyGame), {
  ssr: false,
  loading: () => (
    <div className="bgame bgame-loading">
      <p>Lade die Kanone…</p>
    </div>
  ),
});

export function GameLoader() {
  return <BeuwyGame />;
}
