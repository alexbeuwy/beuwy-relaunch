import type { Metadata } from "next";
import { GameLoader } from "@/components/game/GameLoader";

export const metadata: Metadata = {
  title: "Die beuwy-Kanone — Floskeln abschießen über Frankfurt",
  description:
    "Ein kleines 3D-Spiel: Flieg über Frankfurt und schieß Marketing-Floskeln und Boomer-Logos ab, bevor sie auf der nächsten Website landen. 30 Sekunden Spaß, danach räumen wir deine echte Seite auf.",
  alternates: { canonical: "/spiel" },
  openGraph: {
    title: "Die beuwy-Kanone",
    description: "Flieg über Frankfurt. Schieß Marketing-Floskeln ab. Rette das Internet vor „Synergien nutzen“.",
    type: "website",
    url: "https://beuwy.com/spiel",
  },
  twitter: { card: "summary_large_image" },
};

export default function SpielPage() {
  return <GameLoader />;
}
