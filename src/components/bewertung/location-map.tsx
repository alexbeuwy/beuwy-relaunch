"use client";

import { useEffect, useRef } from "react";
// maplibre-gl 6 exportiert keinen Default mehr (nur benannte Exporte) —
// anders als in Riegels älterer Version. Named Imports statt `import
// maplibregl from "maplibre-gl"`.
import { Map as MaplibreMap, Marker, NavigationControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

/**
 * Satelliten-Vorschau der eingegebenen Adresse — Port aus Riegel
 * `calculator/location-map.tsx`. Der Marker nutzt jetzt den beuwy-Akzent
 * (Pastellgelb) statt Riegels Markenfarbe; Kachel-Quelle (Esri World
 * Imagery, kostenlos, kein Key) unverändert.
 */

const AKZENT_RGB = "243, 226, 127"; // var(--akzent) #f3e27f als r,g,b für den Glow-Schatten

const SAT_STYLE = {
  version: 8 as const,
  sources: {
    sat: {
      type: "raster" as const,
      tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],
      tileSize: 256,
      attribution: "© Esri, Maxar, Earthstar Geographics",
    },
  },
  layers: [{ id: "sat", type: "raster" as const, source: "sat" }],
};

export function LocationMap({ lat, lng, zoom = 17 }: { lat: number; lng: number; zoom?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MaplibreMap | null>(null);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;
    const map = new MaplibreMap({
      container: ref.current,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      style: SAT_STYLE as any,
      center: [lng, lat],
      zoom,
    });
    map.addControl(new NavigationControl({ showCompass: false }), "top-right");

    const el = document.createElement("div");
    el.style.cssText =
      `width:18px;height:18px;border-radius:9999px;background:#f3e27f;border:3px solid #161613;box-shadow:0 0 0 6px rgba(${AKZENT_RGB},0.4),0 2px 8px rgba(22,22,19,0.5);`;
    new Marker({ element: el, anchor: "center" }).setLngLat([lng, lat]).addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [lat, lng, zoom]);

  return <div ref={ref} className="h-full w-full" role="img" aria-label="Satellitenansicht der Immobilie" />;
}
