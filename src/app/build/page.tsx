import Link from "next/link";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

async function listPuckPages(): Promise<string[]> {
  const dir = path.join(process.cwd(), "content", "puck");
  try {
    const files = await fs.readdir(dir);
    return files
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(/\.json$/, ""))
      .sort();
  } catch {
    return [];
  }
}

export default async function BuildIndex() {
  const pages = await listPuckPages();
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#1A0404",
        color: "#F2EBDA",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "80px 24px" }}>
        <p
          style={{
            color: "#F7E99A",
            fontFamily: "ui-monospace, monospace",
            fontSize: 12,
            letterSpacing: "0.08em",
            marginBottom: 24,
          }}
        >
          / BUILD MODE · PUCK
        </p>
        <h1 style={{ fontSize: 48, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 12 }}>
          Drag-Drop Page Builder
        </h1>
        <p style={{ color: "rgba(242,235,218,0.7)", fontSize: 17, lineHeight: 1.55, marginBottom: 40 }}>
          Hier baust du neue Landingpages mit Maus-Drag-Drop. Tina (
          <Link href="/admin/index.html" style={{ color: "#F7E99A" }}>
            /admin
          </Link>
          ) bleibt für die kanonische Homepage. Puck-Seiten sind unter <code>/p/[slug]</code> live.
        </p>

        <form
          action="/api/puck-redirect"
          method="get"
          style={{
            display: "flex",
            gap: 8,
            padding: 8,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
            marginBottom: 40,
          }}
        >
          <input
            type="text"
            name="slug"
            required
            pattern="[a-z0-9][a-z0-9-]{0,62}"
            placeholder="neuer-page-slug"
            style={{
              flex: 1,
              padding: "12px 14px",
              background: "transparent",
              color: "#F2EBDA",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 8,
              fontFamily: "ui-monospace, monospace",
              fontSize: 14,
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px 20px",
              background: "#F7E99A",
              color: "#1A0404",
              border: "none",
              borderRadius: 8,
              fontWeight: 510,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Neue Page →
          </button>
        </form>

        <p
          style={{
            color: "rgba(242,235,218,0.5)",
            fontFamily: "ui-monospace, monospace",
            fontSize: 11,
            letterSpacing: "0.06em",
            marginBottom: 12,
          }}
        >
          BESTEHENDE PAGES · {pages.length}
        </p>
        {pages.length === 0 ? (
          <p style={{ color: "rgba(242,235,218,0.5)" }}>
            Noch keine Pages. Lege oben eine an.
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {pages.map((slug) => (
              <li
                key={slug}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px 0",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    fontSize: 14,
                    color: "#F2EBDA",
                  }}
                >
                  /{slug}
                </span>
                <span style={{ display: "flex", gap: 12 }}>
                  <Link
                    href={`/p/${slug}`}
                    style={{ color: "rgba(242,235,218,0.6)", fontSize: 13 }}
                  >
                    Preview →
                  </Link>
                  <Link
                    href={`/build/${slug}`}
                    style={{ color: "#F7E99A", fontSize: 13, fontWeight: 510 }}
                  >
                    Edit →
                  </Link>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
