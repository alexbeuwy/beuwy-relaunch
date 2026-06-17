"use client";

import { useEffect, useState } from "react";
import { Puck, type Data } from "@measured/puck";
import "@measured/puck/puck.css";
import { puckConfig } from "@/puck/config";

export function PuckEditor({ slug, initialData }: { slug: string; initialData: Data }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    if (saved) {
      const t = setTimeout(() => setSaved(null), 2500);
      return () => clearTimeout(t);
    }
  }, [saved]);

  async function handlePublish(data: Data) {
    setSaving(true);
    try {
      const res = await fetch(`/api/puck/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("save failed");
      setSaved(new Date().toLocaleTimeString());
    } catch (e) {
      console.error(e);
      alert("Speichern fehlgeschlagen — siehe Console.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      {(saving || saved) && (
        <div
          style={{
            position: "fixed",
            top: 12,
            right: 12,
            zIndex: 9999,
            background: saving ? "#F7E99A" : "#10B981",
            color: "#1A0404",
            padding: "10px 14px",
            borderRadius: 8,
            fontFamily: "ui-monospace, monospace",
            fontSize: 12,
            letterSpacing: "0.06em",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          }}
        >
          {saving ? "SPEICHERE…" : `GESPEICHERT · ${saved}`}
        </div>
      )}
      <Puck config={puckConfig} data={initialData} onPublish={handlePublish} />
    </>
  );
}
