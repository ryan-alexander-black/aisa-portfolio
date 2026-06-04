import Image from "next/image";

// Full-page background — the glowing low-poly "signal" network (the look of the
// Signal-over-Noise newsletter hero), fixed behind all content. A scrim darkens
// it for legibility and melts the edges into the solid brand bg; text sits on
// its own frosted plates (.text-plate) above. The image is a dark composition,
// so in light theme it's faded right back (handled in globals via .site-bg).
export function SiteBackground() {
  return (
    <div aria-hidden className="site-bg pointer-events-none fixed inset-0 z-[-2] overflow-hidden">
      <Image src="/bg-network.png" alt="" fill priority sizes="100vw" className="object-cover object-center" />
      {/* even darken for contrast */}
      <div
        className="absolute inset-0"
        style={{ background: "color-mix(in srgb, var(--color-bg) 34%, transparent)" }}
      />
      {/* fade the top and bottom into the solid bg so there's no hard image edge */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-bg) 0%, transparent 22%, transparent 62%, var(--color-bg) 100%)",
        }}
      />
    </div>
  );
}
