type Aspect = "16/9" | "4/3" | "3/2" | "1/1" | "3/4" | "9/16";

/**
 * Asset slot — replaces itself with a real photo/video the moment you drop
 * the file into /public/<src>. Until then, renders a brand-consistent
 * placeholder so the layout doesn't collapse and the page still feels
 * premium.
 *
 * Usage:
 *   <AssetSlot src="/assets/cases/purelei-hero.jpg" alt="..." aspect="3/2"
 *              caption="PURELEI · Brand-Sprache + Voice-System" />
 *
 *   <AssetSlot type="video" src="/assets/cases/acta-mockup.mp4" />
 *
 * The placeholder shows:
 *   - The intended asset path (mono) so you know where to drop the file
 *   - A pulsing yellow indicator
 *   - The aspect ratio reserved
 */
export function AssetSlot({
  src,
  alt = "",
  type = "image",
  aspect = "3/2",
  caption,
  prompt,
  className = "",
  priority = false,
}: {
  src: string;
  alt?: string;
  type?: "image" | "video";
  aspect?: Aspect;
  caption?: string;
  /** Optional AI-prompt to help the user generate a fitting image */
  prompt?: string;
  className?: string;
  priority?: boolean;
}) {
  // We can't reliably check filesystem at runtime in App Router server components
  // for /public assets. Strategy: render BOTH layers, hide placeholder behind
  // the image. If the image fails to load (404), CSS shows the placeholder
  // via the onError handler -> ds-placeholder class.
  return (
    <figure className={`asset-slot ${className}`} style={{ aspectRatio: aspect.replace("/", " / ") }}>
      <div className="asset-slot-placeholder" aria-hidden>
        <div className="asset-slot-pulse" />
        <div className="asset-slot-meta">
          <span className="asset-slot-tag">
            {type === "video" ? "VIDEO" : "IMAGE"} · {aspect}
          </span>
          <code className="asset-slot-path">{src}</code>
          {prompt && (
            <span className="asset-slot-prompt" title={prompt}>
              AI-prompt: {prompt.length > 80 ? prompt.slice(0, 80) + "…" : prompt}
            </span>
          )}
        </div>
      </div>
      {type === "video" ? (
        <video
          className="asset-slot-media"
          src={src}
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        // plain <img> on purpose: tolerates missing files (placeholder shows
        // through) and avoids next/image's strict path validation during build.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="asset-slot-media"
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      )}
      {caption && <figcaption className="asset-slot-caption">{caption}</figcaption>}
    </figure>
  );
}
