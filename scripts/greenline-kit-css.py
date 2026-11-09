"""Snapshot the Greenline AI design system into one stylesheet for the portfolio site.

Reads the kit's tokens.json (light theme) and components/bundle.css and writes one stylesheet: tokens as
CSS variables + the type classes, scoped to .gl-root, then the kit's gl-* component rules.
Usage: python scripts/greenline-kit-css.py <Nexus>/brand/greenline/project "app/(greenline)/greenline-kit.css"
Re-run whenever the kit changes; page-only rules live in greenline-page.css.
"""
import json, re, sys

KIT, OUT = sys.argv[1], sys.argv[2]
tokens = json.load(open(f"{KIT}/tokens.json", encoding="utf-8"))
bundle = open(f"{KIT}/components/bundle.css", encoding="utf-8").read()

first = tokens["color"]["themes"][0]["id"]
lines = []
for t in tokens["color"]["tokens"]:
    v = t["value"]
    lines.append(f"  --{t['name']}: {v[first] if isinstance(v, dict) else v};")
for fam in ("spacing", "radius"):
    for t in tokens[fam]["tokens"]:
        lines.append(f"  --{t['name']}: {t['value']};")
for t in tokens["shadow"]["tokens"]:
    v = t["value"]
    lines.append(f"  --{t['name']}: {v[first] if isinstance(v, dict) else v};")
for k, stack in tokens["type"]["families"].items():
    lines.append(f"  --font-{k}: {stack};")

type_rules = []
for g in tokens["type"]["groups"]:
    for s in g["styles"]:
        fam = s.get("family", g["family"])
        decl = [f"font-family: var(--font-{fam})", f"font-size: {s['fontSize']}", f"line-height: {s['lineHeight']}",
                f"font-weight: {s['fontWeight']}"]
        if "letterSpacing" in s:
            decl.append(f"letter-spacing: {s['letterSpacing']}")
        type_rules.append(f".gl-root .{s['name']} {{ {'; '.join(decl)}; }}")

# the kit's component rules, minus its document-level body rule and font @import (the layout loads fonts)
comp = re.sub(r"^@import[^\n]*\n", "", bundle, flags=re.M)
comp = re.sub(r"^body \{[^\n]*\}\n", "", comp, flags=re.M)

css = f"""/* Greenline AI — generated from the Greenline design system (Nexus brand/greenline/project, v1 locked 10 Nov 2026).
   Don't edit the token or component blocks by hand: change the kit, then re-run scripts/greenline-kit-css.py.
   Light theme only: the page is light with a dark band. Fonts load in app/(greenline)/layout.tsx. */

.gl-root {{
{chr(10).join(lines)}
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}}

/* type styles */
{chr(10).join(type_rules)}

/* ---- components (from the kit's components/bundle.css) ---- */
{comp}"""
open(OUT, "w", encoding="utf-8", newline="\n").write(css)
print("wrote", OUT, len(css), "bytes;", len(lines), "vars;", len(type_rules), "type styles")
