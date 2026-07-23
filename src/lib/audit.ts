import { lookup } from "node:dns/promises";

/**
 * Gemeinsame Helfer für den Website-Check (Masterplan §6):
 * Domain-Normalisierung, SSRF-Schutz, Seiten-Fetch, deterministische Checks,
 * Text-Extraktion und Server-Screenshot.
 */

export function normalizeDomain(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "")
    .replace(/[^a-z0-9.\-äöüß]/g, "");
}

const PRIVATE_V4 =
  /^(0\.|10\.|127\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.)/;

/** SSRF-Schutz: nur öffentlich auflösbare Hosts zulassen. */
export async function assertPublicHost(hostname: string): Promise<void> {
  if (!hostname || hostname === "localhost" || hostname.endsWith(".local")) {
    throw new Error("blocked_host");
  }
  const res = await lookup(hostname, { all: true }).catch(() => {
    throw new Error("dns_failed");
  });
  for (const { address, family } of res) {
    if (family === 4 && PRIVATE_V4.test(address)) throw new Error("blocked_host");
    if (
      family === 6 &&
      (address === "::1" ||
        address.startsWith("fc") ||
        address.startsWith("fd") ||
        address.startsWith("fe80"))
    ) {
      throw new Error("blocked_host");
    }
  }
}

export async function fetchPage(
  domain: string
): Promise<{ html: string; finalUrl: string } | null> {
  for (const url of [`https://${domain}`, `https://www.${domain}`]) {
    try {
      const r = await fetch(url, {
        redirect: "follow",
        signal: AbortSignal.timeout(9000),
        headers: {
          "user-agent":
            "Mozilla/5.0 (compatible; beuwy-check/1.0; +https://beuwy.com)",
          accept: "text/html,application/xhtml+xml",
        },
      });
      if (!r.ok) continue;
      const html = await r.text();
      if (html.length > 0) return { html: html.slice(0, 900_000), finalUrl: r.url };
    } catch {
      continue;
    }
  }
  return null;
}

export async function fileExists(domain: string, path: string): Promise<boolean> {
  try {
    const r = await fetch(`https://${domain}${path}`, {
      redirect: "follow",
      signal: AbortSignal.timeout(6000),
      headers: { "user-agent": "beuwy-check/1.0" },
    });
    if (!r.ok) return false;
    const text = await r.text();
    // Viele Hosts liefern für 404 eine HTML-Fehlerseite mit Status 200:
    return text.length > 0 && !/^\s*<!doctype html/i.test(text.slice(0, 200));
  } catch {
    return false;
  }
}

export type Check = {
  id: string;
  label: string;
  ok: boolean;
  detail: string;
};

export function runChecks(
  html: string,
  opts: { llmsTxt: boolean; robotsTxt: boolean }
): { checks: Check[]; techScore: number } {
  const pick = (re: RegExp) => html.match(re)?.[1]?.trim() ?? "";
  const title = pick(/<title[^>]*>([^<]*)<\/title>/i);
  const metaDesc = pick(
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i
  ) || pick(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
  const ogImage =
    /<meta[^>]+property=["']og:image["']/i.test(html) ||
    /<meta[^>]+name=["']og:image["']/i.test(html);
  const jsonLdBlocks =
    html.match(
      /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
    ) ?? [];
  const jsonLdTypes = Array.from(
    new Set(
      jsonLdBlocks
        .flatMap((b) => b.match(/"@type"\s*:\s*"([^"]+)"/g) ?? [])
        .map((m) => m.replace(/.*"@type"\s*:\s*"/, "").replace(/"$/, ""))
    )
  );
  const hasFaqSchema = jsonLdTypes.includes("FAQPage");
  const hasH1 = /<h1[\s>]/i.test(html);
  const hasLang = /<html[^>]+lang=/i.test(html);

  const checks: Check[] = [
    {
      id: "title",
      label: "Seitentitel",
      ok: title.length >= 10 && title.length <= 70,
      detail: title ? `„${title.slice(0, 60)}${title.length > 60 ? "…" : ""}“` : "fehlt",
    },
    {
      id: "meta",
      label: "Meta-Beschreibung",
      ok: metaDesc.length >= 50,
      detail: metaDesc ? `${metaDesc.length} Zeichen` : "fehlt",
    },
    {
      id: "og",
      label: "Social-Vorschau (OG-Image)",
      ok: ogImage,
      detail: ogImage ? "vorhanden" : "fehlt — Links zeigen kein Vorschaubild",
    },
    {
      id: "schema",
      label: "Strukturierte Daten (schema.org)",
      ok: jsonLdBlocks.length > 0,
      detail:
        jsonLdBlocks.length > 0
          ? jsonLdTypes.slice(0, 4).join(", ") || `${jsonLdBlocks.length} Block/Blöcke`
          : "keine — Maschinen müssen raten, wer Sie sind",
    },
    {
      id: "faq",
      label: "FAQ-Schema",
      ok: hasFaqSchema,
      detail: hasFaqSchema
        ? "vorhanden"
        : "fehlt — Ihre Antworten sind nicht zitierfähig",
    },
    {
      id: "llms",
      label: "llms.txt",
      ok: opts.llmsTxt,
      detail: opts.llmsTxt ? "vorhanden" : "fehlt — keine Anweisung an AI-Crawler",
    },
    {
      id: "robots",
      label: "robots.txt",
      ok: opts.robotsTxt,
      detail: opts.robotsTxt ? "vorhanden" : "fehlt",
    },
    {
      id: "h1",
      label: "Überschriften-Struktur (H1)",
      ok: hasH1,
      detail: hasH1 ? "vorhanden" : "keine H1 gefunden",
    },
    {
      id: "lang",
      label: "Sprach-Auszeichnung",
      ok: hasLang,
      detail: hasLang ? "vorhanden" : "html[lang] fehlt",
    },
  ];

  const okCount = checks.filter((c) => c.ok).length;
  const techScore = Math.round((okCount / checks.length) * 100);
  return { checks, techScore };
}

export function extractText(html: string, maxLen = 4000): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(nbsp|amp|quot|#39|lt|gt);/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLen);
}

/** Server-Screenshot — best effort, darf den Scan nie scheitern lassen.
    Hartes Gesamt-Timeout: eine hängende Chromium-Instanz darf die Route
    nicht blockieren. */
export async function takeScreenshot(url: string): Promise<string | null> {
  const attempt = (async () => {
    if (process.env.VERCEL) {
      // Vercel: puppeteer-core + @sparticuz/chromium — die nativ unterstützte
      // Paarung (playwright-core scheiterte hier am Launch).
      const chromium = (await import("@sparticuz/chromium")).default;
      const puppeteer = await import("puppeteer-core");
      const browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        defaultViewport: { width: 1280, height: 800 },
        headless: "shell",
      });
      try {
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 12_000 });
        await new Promise((r) => setTimeout(r, 1200));
        const buf = await page.screenshot({ type: "jpeg", quality: 70 });
        return `data:image/jpeg;base64,${Buffer.from(buf).toString("base64")}`;
      } finally {
        await browser.close().catch(() => {});
      }
    }

    // Lokale Dev-Umgebung: vorinstalliertes Playwright-Chromium + Session-Proxy
    // (TLS-Interception des Proxys -> Zertifikats-Toleranz NUR lokal).
    const { chromium: pw } = await import("playwright-core");
    const proxyServer = process.env.HTTPS_PROXY || process.env.https_proxy;
    const browser = await pw.launch({
      executablePath:
        process.env.LOCAL_CHROMIUM_PATH || "/opt/pw-browsers/chromium",
      args: [
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--ignore-certificate-errors",
      ],
      headless: true,
      ...(proxyServer ? { proxy: { server: proxyServer } } : {}),
      timeout: 15_000,
    });
    try {
      const page = await browser.newPage({
        viewport: { width: 1280, height: 800 },
        deviceScaleFactor: 1,
      });
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 12_000 });
      await page.waitForTimeout(1200);
      const buf = await page.screenshot({ type: "jpeg", quality: 70 });
      return `data:image/jpeg;base64,${buf.toString("base64")}`;
    } finally {
      await browser.close().catch(() => {});
    }
  })();

  const timeout = new Promise<null>((resolve) =>
    setTimeout(() => resolve(null), 25_000)
  );
  return Promise.race([
    attempt.catch((e) => {
      console.error(
        "[screenshot] fehlgeschlagen:",
        e instanceof Error ? e.message.split("\n").slice(0, 3).join(" | ") : e
      );
      return null;
    }),
    timeout,
  ]);
}
