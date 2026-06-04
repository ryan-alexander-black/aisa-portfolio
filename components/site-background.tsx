import Image from "next/image";

// Full-page background — the glowing low-poly "signal" network (the look of the
// Signal-over-Noise newsletter hero), fixed behind all content. Two renders: a
// dark one for the dark theme and a light one for the light theme (the dark
// image is invisible on a light page), toggled by the <html> theme class. A
// scrim feathers the top and bottom into the solid brand bg so there's no hard
// edge; text sits on its own frosted plates (.text-plate) above.
//
// In the dark theme the still is the poster behind an autoplaying video loop
// (same first frame), so it animates where supported and falls back to the
// still on mobile / reduced-motion / slow load.
export function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[-2] overflow-hidden">
      {/* Dark theme: animated network (poster = the matching still) */}
      <video
        className="site-bg-dark absolute inset-0 h-full w-full scale-105 object-cover object-center blur-[2px]"
        autoPlay
        loop
        muted
        playsInline
        poster="/bg-network.png"
      >
        {/* ?v= busts the browser cache for the updated clip (valid on plain video) */}
        <source src="/bg-network.mp4?v=3" type="video/mp4" />
      </video>

      {/* Dark theme, reduced-motion: the still instead of the video loop */}
      <Image
        src="/bg-network.png"
        alt=""
        fill
        sizes="100vw"
        className="site-bg-dark-still object-cover object-center"
      />

      {/* Light theme: the light render (still). Versioned filename busts cache
          (next/image rejects query strings, so we rename instead). */}
      <Image
        src="/bg-network-light-v2.png"
        alt=""
        fill
        sizes="100vw"
        className="site-bg-light object-cover object-center"
      />

      {/* Dark theme: a gentle uniform veil to calm the video's bright signal line. */}
      <div
        className="site-scrim-dark absolute inset-0"
        style={{ background: "color-mix(in srgb, var(--color-bg) 22%, transparent)" }}
      />

      {/* Feather the top and bottom into the solid bg (theme-aware). */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-bg) 0%, transparent 18%, transparent 64%, var(--color-bg) 100%)",
        }}
      />
    </div>
  );
}
