"""
Regenerates the strata aggregate inside components/home/GeoCrossSection.tsx.

Deterministic (fixed seed), so re-running produces the identical file. Run
from the project root:  python <this file>
"""

import io
import math
import random

random.seed(20260819)

TARGET = "components/home/GeoCrossSection.tsx"
IND = " " * 10


def poly(cx, cy, r, sides, squash=1.0, rough=0.35):
    """Irregular closed polygon — reads as a stone rather than a circle."""
    pts = []
    for i in range(sides):
        a = (i / sides) * math.tau + random.uniform(-0.18, 0.18)
        rr = r * random.uniform(1 - rough, 1 + rough)
        pts.append((cx + rr * math.cos(a), cy + rr * math.sin(a) * squash))
    return " ".join("%.1f,%.1f" % p for p in pts)


def stones(n, y0, y1, rmin, rmax, fills, sides, squash, rough, omin, omax):
    rows = []
    for _ in range(n):
        cx = random.uniform(6, 594)
        cy = random.uniform(y0, y1)
        r = random.uniform(rmin, rmax)
        rows.append(
            '%s<polygon points="%s" fill="%s" opacity="%.2f" />'
            % (
                IND,
                poly(cx, cy, r, sides, squash, rough),
                random.choice(fills),
                random.uniform(omin, omax),
            )
        )
    return "\n".join(rows)


soil = stones(36, 104, 244, 2.2, 7.8,
              ["#9C7448", "#6A4A2C", "#B08A5C", "#563A22"], 6, 0.85, 0.35, 0.5, 0.95)
weath = stones(22, 268, 470, 11, 30,
               ["#6E7161", "#4E5145", "#7C7F6C", "#585B4C"], 7, 0.68, 0.28, 0.45, 0.8)
frac = stones(20, 502, 726, 14, 38,
              ["#44677F", "#2E4A63", "#4F7690", "#274056"], 5, 0.75, 0.42, 0.5, 0.85)
aqrock = stones(18, 756, 1030, 16, 42,
                ["#0B3A55", "#15597C", "#092E45", "#1A6A90"], 5, 0.70, 0.45, 0.45, 0.8)

_fis = []
for _ in range(12):
    x = random.uniform(0, 540)
    y = random.uniform(500, 726)
    seg = [(x, y)]
    for _ in range(random.randint(2, 4)):
        x += random.uniform(30, 90)
        y += random.uniform(-34, 44)
        seg.append((x, y))
    _fis.append(
        '%s<path d="M%s" strokeOpacity="%.2f" strokeWidth="%.1f" />'
        % (IND + "  ", " L".join("%.0f,%.0f" % p for p in seg),
           random.uniform(0.25, 0.5), random.uniform(1.1, 2.2))
    )
fissures = "\n".join(_fis)

_wat = []
for _ in range(4):
    y = random.uniform(770, 1010)
    _wat.append(
        '%s<path d="M0,%.0f C140,%.0f 300,%.0f 600,%.0f" strokeOpacity="%.2f" strokeWidth="%.1f" />'
        % (IND + "  ", y, y + random.uniform(-26, 26), y + random.uniform(-26, 26),
           y + random.uniform(-20, 20), random.uniform(0.4, 0.7), random.uniform(1.8, 3.0))
    )
for _ in range(24):
    _wat.append(
        '%s<circle cx="%.0f" cy="%.0f" r="%.1f" fill="#BFF2FA" opacity="%.2f" />'
        % (IND + "  ", random.uniform(20, 580), random.uniform(760, 1030),
           random.uniform(1.6, 4.4), random.uniform(0.25, 0.7))
    )
water = "\n".join(_wat)

# ── <defs> ───────────────────────────────────────────────────────────────
BAND_GRADS = [("#8A6440", "#63432A"), ("#6E7161", "#4B4E40"),
              ("#446780", "#2C4761"), ("#14608A", "#082B41")]

d = ["      <defs>",
     '        <linearGradient id="geo-sky" x1="0" y1="0" x2="0" y2="1">',
     '          <stop offset="0%" stopColor="#041B2D" />',
     '          <stop offset="100%" stopColor="#0A3A5C" stopOpacity="0.45" />',
     "        </linearGradient>"]
for i, (a, b) in enumerate(BAND_GRADS):
    d += ['        <linearGradient id="geo-band-%d" x1="0" y1="0" x2="0" y2="1">' % i,
          '          <stop offset="0%%" stopColor="%s" />' % a,
          '          <stop offset="100%%" stopColor="%s" />' % b,
          "        </linearGradient>"]
d += ['        <radialGradient id="geo-bloom" cx="50%" cy="50%" r="50%">',
      '          <stop offset="0%" stopColor="#3FD0E8" stopOpacity="0.95" />',
      '          <stop offset="45%" stopColor="#3FD0E8" stopOpacity="0.28" />',
      '          <stop offset="100%" stopColor="#3FD0E8" stopOpacity="0" />',
      "        </radialGradient>",
      '        <linearGradient id="geo-bore-grad" x1="0" y1="0" x2="0" y2="1">',
      '          <stop offset="0%" stopColor="#E8C766" />',
      '          <stop offset="35%" stopColor="#3FD0E8" />',
      '          <stop offset="100%" stopColor="#3FD0E8" />',
      "        </linearGradient>",
      "        {/* Fractal grain, blended over the strata so the bands read as",
      "            material rather than as flat fills. */}",
      '        <filter id="geo-grain" x="0" y="0" width="100%" height="100%">',
      '          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" seed="11" stitchTiles="stitch" />',
      '          <feColorMatrix type="saturate" values="0" />',
      "        </filter>",
      "      </defs>"]
defs = "\n".join(d)

# ── camera group ─────────────────────────────────────────────────────────
g = ['      <g className="geo-camera">',
     "        {/* Open air above the ground line. */}",
     '        <rect x="0" y="0" width="600" height="130" fill="url(#geo-sky)" />',
     "",
     "        {/* Bands, shallowest first: each fills to the bottom of the frame",
     "            and the next paints over its lower half. A vertical gradient",
     "            gives every layer its own light falloff. */}",
     "        {EDGES.map((edge, index) => (",
     "          <path",
     "            key={`band-${index}`}",
     '            className="geo-band"',
     "            d={`${edge} L600,1040 L0,1040 Z`}",
     "            fill={`url(#geo-band-${index})`}",
     "          />",
     "        ))}",
     "",
     "        {/* Dark organic crust sitting on the ground line. */}",
     "        <path",
     "          d={EDGES[0]}",
     '          fill="none"',
     '          stroke="#2E2013"',
     '          strokeOpacity="0.5"',
     '          strokeWidth="16"',
     "        />",
     "",
     "        {/* Topsoil: loose grit and small stones. */}",
     '        <g className="geo-texture" data-band="0">',
     soil,
     "        </g>",
     "",
     "        {/* Weathered rock: rounded blocks, edges already breaking down. */}",
     '        <g className="geo-texture" data-band="1">',
     weath,
     "        </g>",
     "",
     "        {/* Fractured bedrock: angular shards split by the fractures that",
     "            water actually travels along. */}",
     '        <g className="geo-texture" data-band="2">',
     frac,
     '          <g stroke="#A8E8F5" fill="none" strokeLinecap="round">',
     fissures,
     "          </g>",
     "        </g>",
     "",
     "        {/* The aquifer: rock holding water under pressure. */}",
     '        <g className="geo-texture" data-band="3">',
     aqrock,
     '          <g stroke="#7FE5F5" fill="none" strokeLinecap="round">',
     water,
     "          </g>",
     "        </g>",
     "",
     "        {/* Grain across the whole profile, unifying the aggregate. */}",
     "        <rect",
     '          x="0"',
     '          y="0"',
     '          width="600"',
     '          height="1040"',
     '          filter="url(#geo-grain)"',
     '          opacity="0.16"',
     '          style={{ mixBlendMode: "overlay" }}',
     "        />",
     "",
     "        {/* Boundary lines between layers. */}",
     "        {EDGES.map((edge, index) => (",
     "          <path",
     "            key={`edge-${index}`}",
     '            className="geo-edge"',
     "            d={edge}",
     '            fill="none"',
     "            stroke={EDGE_STROKES[index]}",
     "            strokeOpacity={EDGE_OPACITY[index]}",
     "            strokeWidth={index === 0 ? 2.6 : 2}",
     '            strokeLinecap="round"',
     "          />",
     "        ))}",
     "",
     "        {/* Aquifer bloom, behind the bore tip. */}",
     "        <circle",
     '          id="geo-glow"',
     '          cx="300"',
     '          cy="900"',
     '          r="150"',
     '          fill="url(#geo-bloom)"',
     "          opacity={isStatic ? 1 : 0}",
     "        />",
     "",
     "        {/* The bore: an open shaft, its casing walls, then the bright",
     "            progress line the timeline draws downward. */}",
     '        <line className="geo-casing" x1="300" y1="70" x2="300" y2="900" stroke="#0A1119" strokeOpacity="0.85" strokeWidth="17" strokeLinecap="round" />',
     '        <line className="geo-casing" x1="291" y1="86" x2="291" y2="900" stroke="#EAF6FA" strokeOpacity="0.3" strokeWidth="1.4" />',
     '        <line className="geo-casing" x1="309" y1="86" x2="309" y2="900" stroke="#EAF6FA" strokeOpacity="0.3" strokeWidth="1.4" />',
     '        <line id="geo-bore" x1="300" y1="56" x2="300" y2="900" stroke="url(#geo-bore-grad)" strokeWidth="3.4" strokeLinecap="round" />',
     "",
     "        {/* Drill bit, tip pointing down, centred on y=0 so the narrative",
     "            can simply translate it down the bore. */}",
     '        <g id="geo-bit">',
     '          <circle cx="300" cy="2" r="26" fill="#041B2D" fillOpacity="0.35" stroke="#E8C766" strokeOpacity="0.45" strokeWidth="1.6" />',
     '          <path d="M300,20 C300,20 314,0 314,-9 a14,14 0 0 0 -28,0 C286,0 300,20 300,20 Z" fill="#E8C766" />',
     '          <circle cx="300" cy="-7" r="4.5" fill="#041B2D" opacity="0.5" />',
     "        </g>",
     "",
     "        {/* Depth ruler. */}",
     '        <g className="geo-ruler">',
     "          {TICKS.map((metres) => (",
     '            <g key={metres} className="geo-tick" opacity={isStatic ? 1 : 0}>',
     '              <line x1="536" y1={tickY(metres)} x2="566" y2={tickY(metres)} stroke="#EAF6FA" strokeOpacity="0.45" strokeWidth="1.2" />',
     "              <text",
     '                x="572"',
     "                y={tickY(metres) + 4}",
     '                fill="#EAF6FA"',
     '                fillOpacity="0.55"',
     '                fontSize="15"',
     '                fontFamily="var(--font-manrope), sans-serif"',
     '                letterSpacing="1"',
     "              >",
     "                {metres}m",
     "              </text>",
     "            </g>",
     "          ))}",
     "        </g>",
     "      </g>"]
camera = "\n".join(g)

src = io.open(TARGET, encoding="utf-8").read()

a = src.index("      <defs>")
b = src.index("</defs>") + len("</defs>")
src = src[:a] + defs + src[b:]

a = src.index('      <g className="geo-camera">')
b = src.rindex("</g>") + len("</g>")
src = src[:a] + camera + src[b:]

io.open(TARGET, "w", encoding="utf-8", newline="\n").write(src)
print("regenerated %s (%d lines)" % (TARGET, len(src.splitlines())))
print("shapes: soil=%d weathered=%d fractured=%d fissures=%d aquifer=%d water=%d"
      % (len(soil.splitlines()), len(weath.splitlines()), len(frac.splitlines()),
         len(fissures.splitlines()), len(aqrock.splitlines()), len(water.splitlines())))
