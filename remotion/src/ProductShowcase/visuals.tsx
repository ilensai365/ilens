import React from 'react';
import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from 'remotion';

/**
 * Built-in vector "photos" for the demo presets (1080x1920 canvas).
 * Used only when the client hasn't supplied an image.
 */

type VisualProps = { brand: string; serif: string; sans: string };

const W = 1080;
const H = 1920;

const Canvas: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill>
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      {children}
    </svg>
  </AbsoluteFill>
);

/* ------------------------------------------------------------------ */
/*  Serum — amber dropper bottle on a stone podium, citrus accents     */
/* ------------------------------------------------------------------ */

const CitrusSlice: React.FC<{ cx: number; cy: number; r: number; blur?: number }> = ({ cx, cy, r, blur = 0 }) => (
  <g filter={blur ? `url(#blur${blur})` : undefined}>
    <circle cx={cx} cy={cy} r={r} fill="#EE9B34" />
    <circle cx={cx} cy={cy} r={r * 0.9} fill="#FBE3B0" />
    <circle cx={cx} cy={cy} r={r * 0.84} fill="#F7BE5C" />
    {Array.from({ length: 9 }).map((_, i) => {
      const a = (i / 9) * Math.PI * 2;
      return (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={cx + Math.cos(a) * r * 0.84}
          y2={cy + Math.sin(a) * r * 0.84}
          stroke="#FCE7BE"
          strokeWidth={r * 0.05}
        />
      );
    })}
    <circle cx={cx} cy={cy} r={r * 0.1} fill="#FCE7BE" />
  </g>
);

export const SerumVisual: React.FC<VisualProps> = ({ brand, serif, sans }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const float = Math.sin((frame / fps) * 1.3) * 9;

  return (
    <Canvas>
      <defs>
        <linearGradient id="serumBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F7F0E7" />
          <stop offset="1" stopColor="#E6D4BE" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6A3310" />
          <stop offset="0.3" stopColor="#B8702F" />
          <stop offset="0.5" stopColor="#DE9D5A" />
          <stop offset="0.72" stopColor="#A95F24" />
          <stop offset="1" stopColor="#5E2C0C" />
        </linearGradient>
        <linearGradient id="goldCollar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7E5E30" />
          <stop offset="0.45" stopColor="#EFD9A6" />
          <stop offset="1" stopColor="#8F6D3C" />
        </linearGradient>
        <linearGradient id="bulb" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0F0D0C" />
          <stop offset="0.4" stopColor="#3A3531" />
          <stop offset="1" stopColor="#0F0D0C" />
        </linearGradient>
        <linearGradient id="podium" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#D9C6B0" />
          <stop offset="0.5" stopColor="#EFE3D5" />
          <stop offset="1" stopColor="#CDB79E" />
        </linearGradient>
        <radialGradient id="serumGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#F6D3AA" stopOpacity="0.9" />
          <stop offset="1" stopColor="#F6D3AA" stopOpacity="0" />
        </radialGradient>
        <filter id="blur6"><feGaussianBlur stdDeviation="6" /></filter>
        <filter id="blur14"><feGaussianBlur stdDeviation="14" /></filter>
        <filter id="blur24"><feGaussianBlur stdDeviation="24" /></filter>
      </defs>

      <rect width={W} height={H} fill="url(#serumBg)" />
      <circle cx={540} cy={860} r={520} fill="url(#serumGlow)" />
      <CitrusSlice cx={905} cy={520} r={90} blur={14} />
      <CitrusSlice cx={150} cy={380} r={60} blur={24} />

      {/* Podium */}
      <rect x={250} y={1250} width={580} height={420} fill="url(#podium)" />
      <ellipse cx={540} cy={1250} rx={290} ry={52} fill="#F5EDE3" />
      <ellipse cx={540} cy={1246} rx={170} ry={24} fill="#5A3212" opacity={0.28} filter="url(#blur6)" />

      {/* Bottle */}
      <g transform={`translate(0 ${float})`}>
        <path d="M500 660 C 494 560, 506 480, 540 468 C 574 480, 586 560, 580 660 Z" fill="url(#bulb)" />
        <path d="M522 500 C 516 540, 516 600, 520 640" stroke="#fff" strokeOpacity={0.25} strokeWidth={6} fill="none" strokeLinecap="round" />
        <rect x={468} y={650} width={144} height={104} rx={14} fill="url(#goldCollar)" />
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={i} x1={484 + i * 19} y1={660} x2={484 + i * 19} y2={744} stroke="#6E522B" strokeOpacity={0.35} strokeWidth={3} />
        ))}
        <rect x={488} y={748} width={104} height={60} rx={10} fill="url(#glass)" />
        <rect x={405} y={796} width={270} height={450} rx={52} fill="url(#glass)" />
        <rect x={428} y={830} width={22} height={380} rx={11} fill="#fff" opacity={0.3} />
        <rect x={640} y={840} width={10} height={360} rx={5} fill="#fff" opacity={0.12} />
        {/* Label */}
        <rect x={442} y={930} width={196} height={210} rx={6} fill="#F8F2EA" />
        <text x={540} y={1006} textAnchor="middle" fontFamily={serif} fontSize={46} letterSpacing={8} fill="#33261C">
          {brand}
        </text>
        <line x1={490} y1={1030} x2={590} y2={1030} stroke="#C0662A" strokeWidth={2} />
        <text x={540} y={1068} textAnchor="middle" fontFamily={sans} fontSize={17} letterSpacing={4} fill="#5B4A3D">
          VITAMIN C 15%
        </text>
        <text x={540} y={1110} textAnchor="middle" fontFamily={sans} fontSize={15} letterSpacing={3} fill="#8A796B">
          30 ML
        </text>
      </g>

      {/* Foreground slice + droplets */}
      <CitrusSlice cx={215} cy={1470} r={128} />
      {[
        [760, 1330, 16],
        [812, 1372, 10],
        [330, 1300, 9],
      ].map(([x, y, r], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx={r} ry={r * 1.15} fill="#fff" opacity={0.55} />
          <circle cx={x - r * 0.35} cy={y - r * 0.4} r={r * 0.28} fill="#fff" />
        </g>
      ))}
    </Canvas>
  );
};

/* ------------------------------------------------------------------ */
/*  Jewelry — gold solitaire on a dark stone plinth under a spotlight  */
/* ------------------------------------------------------------------ */

const Sparkle: React.FC<{ x: number; y: number; size: number; phase: number }> = ({ x, y, size, phase }) => {
  const frame = useCurrentFrame();
  const s = Math.max(0, Math.sin(frame / 9 + phase)) * size;
  return (
    <path
      d={`M${x} ${y - s} Q${x} ${y} ${x + s} ${y} Q${x} ${y} ${x} ${y + s} Q${x} ${y} ${x - s} ${y} Q${x} ${y} ${x} ${y - s} Z`}
      fill="#FFFFFF"
      opacity={0.95}
    />
  );
};

export const JewelryVisual: React.FC<VisualProps> = () => {
  const frame = useCurrentFrame();
  const bokeh = Array.from({ length: 26 }).map((_, i) => ({
    x: random(`bx${i}`) * W,
    y: 200 + random(`by${i}`) * 1200,
    r: 3 + random(`br${i}`) * 9,
    p: random(`bp${i}`) * 6,
  }));

  const crown = [
    { pts: '465,640 515,640 500,700 445,700', f: '#E8EEF6' },
    { pts: '515,640 565,640 540,700 500,700', f: '#FFFFFF' },
    { pts: '565,640 615,640 635,700 580,700', f: '#C9D5E3' },
    { pts: '565,640 580,700 540,700', f: '#F2F6FC' },
  ];
  const pavilion = [
    { pts: '445,700 500,700 540,800', f: '#AFC0D4' },
    { pts: '500,700 540,700 540,800', f: '#EEF3FA' },
    { pts: '540,700 580,700 540,800', f: '#D3DDEA' },
    { pts: '580,700 635,700 540,800', f: '#8EA2BA' },
  ];

  return (
    <Canvas>
      <defs>
        <radialGradient id="jBg" cx="0.5" cy="0.42" r="0.7">
          <stop offset="0" stopColor="#2B2219" />
          <stop offset="1" stopColor="#0A0908" />
        </radialGradient>
        <linearGradient id="spot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF4DD" stopOpacity="0.16" />
          <stop offset="1" stopColor="#FFF4DD" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8A6428" />
          <stop offset="0.3" stopColor="#F4DB9C" />
          <stop offset="0.55" stopColor="#B88A3E" />
          <stop offset="0.8" stopColor="#FBE8B4" />
          <stop offset="1" stopColor="#7A5620" />
        </linearGradient>
        <linearGradient id="plinth" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#141210" />
          <stop offset="0.5" stopColor="#2A2520" />
          <stop offset="1" stopColor="#100E0C" />
        </linearGradient>
        <filter id="jBlur"><feGaussianBlur stdDeviation="5" /></filter>
        <filter id="jBlurBig"><feGaussianBlur stdDeviation="18" /></filter>
      </defs>

      <rect width={W} height={H} fill="url(#jBg)" />
      <polygon points="430,0 650,0 900,1320 180,1320" fill="url(#spot)" />
      {bokeh.map((b, i) => (
        <circle
          key={i}
          cx={b.x}
          cy={b.y - frame * 0.25}
          r={b.r}
          fill="#E6C27A"
          opacity={0.12 + 0.18 * Math.max(0, Math.sin(frame / 20 + b.p))}
          filter="url(#jBlur)"
        />
      ))}

      {/* Plinth */}
      <rect x={230} y={1270} width={620} height={450} fill="url(#plinth)" />
      <ellipse cx={540} cy={1270} rx={310} ry={58} fill="#27221D" />
      <ellipse cx={540} cy={1268} rx={200} ry={26} fill="#F4D593" opacity={0.18} filter="url(#jBlurBig)" />

      {/* Ring band — back edge, then front edge for depth */}
      <ellipse cx={540} cy={1022} rx={196} ry={212} fill="none" stroke="#6B4C1C" strokeWidth={14} />
      <ellipse cx={540} cy={1015} rx={212} ry={228} fill="none" stroke="url(#gold)" strokeWidth={38} />
      <path d="M360 930 C 380 860, 430 815, 470 800" stroke="#FFF3D1" strokeOpacity={0.55} strokeWidth={6} fill="none" strokeLinecap="round" />

      {/* Setting + diamond */}
      <path d="M492 800 L 588 800 L 566 760 L 514 760 Z" fill="url(#gold)" />
      {[470, 520, 560, 610].map((x, i) => (
        <rect key={i} x={x - 5} y={628} width={10} height={100} rx={5} fill="url(#gold)" />
      ))}
      {crown.map((f, i) => (
        <polygon key={`c${i}`} points={f.pts} fill={f.f} stroke="#9FB0C4" strokeWidth={1.5} />
      ))}
      {pavilion.map((f, i) => (
        <polygon key={`p${i}`} points={f.pts} fill={f.f} stroke="#8497AF" strokeWidth={1.5} />
      ))}

      <Sparkle x={500} y={655} size={34} phase={0} />
      <Sparkle x={612} y={690} size={22} phase={2.1} />
      <Sparkle x={380} y={880} size={18} phase={4} />
      <Sparkle x={560} y={760} size={14} phase={1.2} />
    </Canvas>
  );
};

/* ------------------------------------------------------------------ */
/*  Portofino — golden-hour harbour seen from a hotel terrace          */
/* ------------------------------------------------------------------ */

const HOUSE_COLORS = ['#E8A15C', '#D9674A', '#F2C46B', '#E9B7A0', '#C9573E', '#F0D9A8', '#DE8F6E', '#EBC98F'];
const WATERLINE = 905;

type House = { x: number; w: number; h: number; c: string; base: number; key: string };

const makeRow = (prefix: string, startX: number, endX: number, base: number, minH: number, maxH: number): House[] => {
  const houses: House[] = [];
  let x = startX;
  let i = 0;
  while (x < endX) {
    const w = 46 + random(`${prefix}w${i}`) * 34;
    const h = minH + random(`${prefix}h${i}`) * (maxH - minH);
    const c = HOUSE_COLORS[Math.floor(random(`${prefix}c${i}`) * HOUSE_COLORS.length)];
    houses.push({ x, w, h, c, base, key: `${prefix}${i}` });
    x += w - 2;
    i++;
  }
  return houses;
};

const backRow = makeRow('b', 60, 470, WATERLINE - 70, 70, 120);
const frontRow = makeRow('f', 20, 600, WATERLINE, 100, 190);

const HouseShape: React.FC<{ h: House }> = ({ h }) => {
  const top = h.base - h.h;
  const cols = Math.max(1, Math.floor((h.w - 14) / 24));
  const rows = Math.max(1, Math.floor((h.h - 30) / 38));
  return (
    <g>
      <rect x={h.x} y={top} width={h.w} height={h.h} fill={h.c} />
      <rect x={h.x - 2} y={top - 8} width={h.w + 4} height={10} fill="#8C4B32" />
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((__, c) => (
          <rect
            key={`${r}-${c}`}
            x={h.x + 10 + c * 24}
            y={top + 16 + r * 38}
            width={11}
            height={19}
            fill="#3F5B45"
            opacity={0.85}
          />
        ))
      )}
    </g>
  );
};

export const PortofinoVisual: React.FC<VisualProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const trees = Array.from({ length: 30 }).map((_, i) => {
    const x = 10 + random(`tx${i}`) * 520;
    // roughly follow the hill silhouette
    const ridge = 520 + (x / 600) * 330;
    return { x, y: ridge + 20 + random(`ty${i}`) * 150, r: 16 + random(`tr${i}`) * 22 };
  });

  const flowers = Array.from({ length: 80 }).map((_, i) => {
    const a = Math.PI * (0.5 + random(`fa${i}`) * 0.75);
    const d = random(`fd${i}`) * 300;
    return {
      x: 1080 + Math.cos(a) * d,
      y: -20 + Math.sin(a) * d,
      r: 12 + random(`fr${i}`) * 20,
      c: ['#D6336C', '#E35D8F', '#B8285A', '#F07BA5'][Math.floor(random(`fc${i}`) * 4)],
      leaf: random(`fl${i}`) > 0.62,
    };
  });

  const sway = Math.sin(t * 0.9) * 0.8;

  return (
    <Canvas>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5E80AE" />
          <stop offset="0.25" stopColor="#B7A7B4" />
          <stop offset="0.42" stopColor="#F2C69E" />
          <stop offset="0.48" stopColor="#F7B47E" />
        </linearGradient>
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3B7C92" />
          <stop offset="0.4" stopColor="#17506A" />
          <stop offset="1" stopColor="#0A2C40" />
        </linearGradient>
        <linearGradient id="hill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3D5A3F" />
          <stop offset="1" stopColor="#223826" />
        </linearGradient>
        <linearGradient id="haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFE2C2" stopOpacity="0" />
          <stop offset="0.5" stopColor="#FFE2C2" stopOpacity="0.35" />
          <stop offset="1" stopColor="#FFE2C2" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="stone" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#D8C8B3" />
          <stop offset="0.5" stopColor="#F4EADC" />
          <stop offset="1" stopColor="#CDBBA4" />
        </linearGradient>
        <radialGradient id="sunGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFE9C4" stopOpacity="0.8" />
          <stop offset="1" stopColor="#FFE9C4" stopOpacity="0" />
        </radialGradient>
        <filter id="pBlur"><feGaussianBlur stdDeviation="4" /></filter>
      </defs>

      <rect width={W} height={H} fill="url(#sky)" />
      <circle cx={820} cy={830} r={260} fill="url(#sunGlow)" />
      <circle cx={820} cy={840} r={64} fill="#FFE6BC" />

      {/* Distant headland */}
      <path d={`M600 ${WATERLINE} C 740 872, 900 858, 1080 850 L1080 ${WATERLINE} Z`} fill="#7D8E98" opacity={0.75} />

      {/* Sea + sun reflection */}
      <rect y={WATERLINE} width={W} height={H - WATERLINE} fill="url(#sea)" />
      {Array.from({ length: 26 }).map((_, i) => {
        const y = WATERLINE + 10 + i * 18;
        const w = (190 - i * 6) * (0.6 + 0.4 * random(`sw${i}`));
        const shimmer = 0.35 + 0.45 * Math.max(0, Math.sin(t * 3 + i * 1.7));
        return <rect key={i} x={820 - w / 2 + Math.sin(t + i) * 8} y={y} width={w} height={4} rx={2} fill="#FFD9A8" opacity={shimmer} />;
      })}

      {/* Hill with village */}
      <path d={`M0 500 C 120 450, 260 470, 380 590 C 460 670, 540 790, 610 ${WATERLINE} L0 ${WATERLINE} Z`} fill="url(#hill)" />
      <rect x={150} y={420} width={42} height={110} fill="#EAD2A8" />
      <polygon points="150,420 171,372 192,420" fill="#9A5B3A" />
      <rect x={200} y={470} width={90} height={60} fill="#E3B98A" />
      {trees.map((tr, i) =>
        i % 5 === 0 ? (
          <ellipse key={i} cx={tr.x} cy={tr.y - tr.r} rx={tr.r * 0.35} ry={tr.r * 1.6} fill="#253D2A" />
        ) : (
          <circle key={i} cx={tr.x} cy={tr.y} r={tr.r} fill={i % 2 ? '#2F4B33' : '#3A5A3C'} />
        )
      )}
      {backRow.map((h) => <HouseShape key={h.key} h={h} />)}
      {frontRow.map((h) => <HouseShape key={h.key} h={h} />)}
      {/* House reflections */}
      {frontRow.map((h) => (
        <rect key={`r${h.key}`} x={h.x} y={WATERLINE + 2} width={h.w} height={h.h * 0.55} fill={h.c} opacity={0.22} filter="url(#pBlur)" />
      ))}
      <rect y={780} width={W} height={190} fill="url(#haze)" />

      {/* Boats */}
      {[
        [300, 1010, 1],
        [480, 1080, 0.85],
        [180, 1150, 1.2],
        [640, 1200, 0.9],
      ].map(([x, y, s], i) => {
        const bob = Math.sin(t * 1.4 + i) * 4;
        return (
          <g key={i} transform={`translate(${x} ${y + bob}) scale(${s})`}>
            <path d="M-46 0 L46 0 L34 16 L-34 16 Z" fill="#F8F4EC" />
            <rect x={-14} y={-14} width={28} height={14} fill="#E9E1D4" />
            <line x1={0} y1={-14} x2={0} y2={-70} stroke="#F8F4EC" strokeWidth={3} />
            <path d="M-40 18 L40 18" stroke="#FFFFFF" strokeOpacity={0.35} strokeWidth={3} />
          </g>
        );
      })}

      {/* Terrace balustrade */}
      <rect y={1560} width={W} height={36} fill="url(#stone)" />
      {Array.from({ length: 12 }).map((_, i) => {
        const cx = 45 + i * 90;
        return (
          <path
            key={i}
            d={`M${cx - 20} 1596 L${cx + 20} 1596 Q${cx + 6} 1612 ${cx + 9} 1630 Q${cx + 28} 1690 ${cx + 14} 1760 L${cx + 20} 1780 L${cx - 20} 1780 L${cx - 14} 1760 Q${cx - 28} 1690 ${cx - 9} 1630 Q${cx - 6} 1612 ${cx - 20} 1596 Z`}
            fill="url(#stone)"
          />
        );
      })}
      <rect y={1780} width={W} height={34} fill="url(#stone)" />
      <rect y={1814} width={W} height={H - 1814} fill="#C99A74" />

      {/* Bougainvillea framing the top-right corner */}
      <g transform={`rotate(${sway} 1080 0)`}>
        {flowers.map((f, i) =>
          f.leaf ? (
            <ellipse key={i} cx={f.x} cy={f.y} rx={f.r * 1.1} ry={f.r * 0.55} fill="#3E6B3A" transform={`rotate(${i * 37} ${f.x} ${f.y})`} />
          ) : (
            <circle key={i} cx={f.x} cy={f.y} r={f.r} fill={f.c} opacity={0.95} />
          )
        )}
      </g>
    </Canvas>
  );
};

/* ------------------------------------------------------------------ */
/*  Casino — spinning roulette wheel, chips, cards, falling gold       */
/* ------------------------------------------------------------------ */

// European wheel order, clockwise from zero
const WHEEL = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];

const polar = (cx: number, cy: number, r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
};

const wedge = (r0: number, r1: number, a0: number, a1: number) => {
  const [x0, y0] = polar(0, 0, r1, a0);
  const [x1, y1] = polar(0, 0, r1, a1);
  const [x2, y2] = polar(0, 0, r0, a1);
  const [x3, y3] = polar(0, 0, r0, a0);
  return `M${x0} ${y0} A${r1} ${r1} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${r0} ${r0} 0 0 0 ${x3} ${y3} Z`;
};

const Chip: React.FC<{ x: number; y: number; r: number; color: string; tilt: number }> = ({ x, y, r, color, tilt }) => (
  <g transform={`translate(${x} ${y}) rotate(${tilt}) scale(1 0.62)`}>
    <circle r={r} cy={r * 0.28} fill="#000" opacity={0.45} />
    <circle r={r} fill={color} />
    {Array.from({ length: 8 }).map((_, i) => (
      <path key={i} d={wedge(r * 0.78, r, i * 45 - 7, i * 45 + 7)} fill="#FFF6E6" />
    ))}
    <circle r={r * 0.62} fill="none" stroke="#FFF6E6" strokeWidth={r * 0.05} strokeDasharray={`${r * 0.12} ${r * 0.08}`} />
    <circle r={r * 0.5} fill={color} stroke="#E7C06A" strokeWidth={r * 0.04} />
  </g>
);

const Card: React.FC<{ x: number; y: number; rot: number; rank: string; suit: string; red: boolean; serif: string }> = ({
  x,
  y,
  rot,
  rank,
  suit,
  red,
  serif,
}) => {
  const ink = red ? '#B3122E' : '#141018';
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <rect x={-82} y={-114} width={184} height={256} rx={16} fill="#000" opacity={0.4} />
      <rect x={-92} y={-128} width={184} height={256} rx={16} fill="#FBF7EF" />
      <rect x={-80} y={-116} width={160} height={232} rx={10} fill="none" stroke="#E7C06A" strokeWidth={2} />
      <text x={-64} y={-72} fontFamily={serif} fontSize={46} fill={ink}>
        {rank}
      </text>
      <text x={-64} y={-32} fontSize={34} fill={ink}>
        {suit}
      </text>
      <text x={0} y={52} textAnchor="middle" fontSize={110} fill={ink}>
        {suit}
      </text>
    </g>
  );
};

export const CasinoVisual: React.FC<VisualProps> = ({ serif }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const CX = 540;
  const CY = 960;
  const TILT = 0.55;
  const spin = frame * 1.4;
  // ball runs against the wheel and slows down over the spot
  const ballDeg = -(frame * 5.2 - frame * frame * 0.004);
  const [bx, by] = polar(0, 0, 392, ballDeg);

  const coins = Array.from({ length: 34 }).map((_, i) => {
    const speed = 3 + random(`cs${i}`) * 4;
    return {
      x: random(`cx${i}`) * W,
      y: ((random(`cy${i}`) * 2200 + frame * speed) % 2200) - 150,
      s: 10 + random(`cz${i}`) * 16,
      rot: frame * (2 + random(`cr${i}`) * 6) + i * 40,
      flip: Math.abs(Math.cos(frame / (8 + (i % 5)) + i)),
    };
  });

  const float = (phase: number) => Math.sin(t * 1.4 + phase) * 12;

  return (
    <Canvas>
      <defs>
        <radialGradient id="cBg" cx="0.5" cy="0.48" r="0.75">
          <stop offset="0" stopColor="#2A1240" />
          <stop offset="0.55" stopColor="#12091C" />
          <stop offset="1" stopColor="#07050B" />
        </radialGradient>
        <radialGradient id="felt" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#1F6B4A" />
          <stop offset="1" stopColor="#0B2F21" />
        </radialGradient>
        <linearGradient id="wood" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5A2A12" />
          <stop offset="0.5" stopColor="#8E4A22" />
          <stop offset="1" stopColor="#3E1B0B" />
        </linearGradient>
        <linearGradient id="cGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8A6428" />
          <stop offset="0.35" stopColor="#F6DFA0" />
          <stop offset="0.65" stopColor="#B88A3E" />
          <stop offset="1" stopColor="#FBE8B4" />
        </linearGradient>
        <filter id="cGlow"><feGaussianBlur stdDeviation="22" /></filter>
        <filter id="cSoft"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>

      <rect width={W} height={H} fill="url(#cBg)" />
      <polygon points="400,0 680,0 980,1500 100,1500" fill="#FFE9C0" opacity={0.06} />

      {/* Felt table under the wheel */}
      <ellipse cx={CX} cy={CY + 120} rx={640} ry={420} fill="url(#felt)" />
      <ellipse cx={CX} cy={CY + 120} rx={640} ry={420} fill="none" stroke="#E7C06A" strokeOpacity={0.35} strokeWidth={4} />

      {/* Neon halo */}
      <ellipse
        cx={CX}
        cy={CY}
        rx={470}
        ry={470 * TILT}
        fill="none"
        stroke="#C04BFF"
        strokeWidth={18}
        opacity={0.55 + 0.25 * Math.sin(t * 3)}
        filter="url(#cGlow)"
      />

      {/* Wheel body thickness */}
      <ellipse cx={CX} cy={CY + 44} rx={432} ry={432 * TILT} fill="#2A1208" />

      <g transform={`translate(${CX} ${CY}) scale(1 ${TILT})`}>
        <circle r={432} fill="url(#wood)" />
        <circle r={410} fill="none" stroke="url(#cGold)" strokeWidth={6} />
        <circle r={392} fill="#1B0C05" stroke="#3B1D0C" strokeWidth={30} />

        <g transform={`rotate(${spin})`}>
          {WHEEL.map((n, i) => {
            const a0 = (i / WHEEL.length) * 360;
            const a1 = ((i + 1) / WHEEL.length) * 360;
            const fill = n === 0 ? '#138A4E' : i % 2 ? '#141018' : '#B3122E';
            const [tx, ty] = polar(0, 0, 334, (a0 + a1) / 2);
            return (
              <g key={n}>
                <path d={wedge(250, 360, a0, a1)} fill={fill} stroke="#E7C06A" strokeWidth={2} />
                <text
                  x={tx}
                  y={ty}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily={serif}
                  fontSize={26}
                  fill="#FFF6E6"
                  transform={`rotate(${(a0 + a1) / 2 + 90} ${tx} ${ty})`}
                >
                  {n}
                </text>
              </g>
            );
          })}
          <circle r={250} fill="url(#wood)" stroke="url(#cGold)" strokeWidth={6} />
          <circle r={170} fill="#6B3417" />
          {[0, 90, 180, 270].map((a) => {
            const [x, y] = polar(0, 0, 150, a);
            return (
              <g key={a}>
                <line x1={0} y1={0} x2={x} y2={y} stroke="url(#cGold)" strokeWidth={16} strokeLinecap="round" />
                <circle cx={x} cy={y} r={16} fill="url(#cGold)" />
              </g>
            );
          })}
          <circle r={46} fill="url(#cGold)" />
        </g>
      </g>

      {/* Ball */}
      <circle cx={CX + bx} cy={CY + by * TILT + 6} r={14} fill="#000" opacity={0.35} filter="url(#cSoft)" />
      <circle cx={CX + bx} cy={CY + by * TILT} r={14} fill="#F8F8F4" />
      <circle cx={CX + bx - 4} cy={CY + by * TILT - 5} r={5} fill="#FFFFFF" />

      {/* Chips + cards floating around the wheel */}
      <Chip x={170} y={560 + float(0)} r={78} color="#B3122E" tilt={-12} />
      <Chip x={250} y={640 + float(0.6)} r={62} color="#141018" tilt={8} />
      <Chip x={930} y={1250 + float(1.4)} r={74} color="#1B5FB8" tilt={14} />
      <Card x={860} y={520 + float(2)} rot={14} rank="A" suit="♠" red={false} serif={serif} />
      <Card x={960} y={600 + float(2.4)} rot={24} rank="K" suit="♥" red serif={serif} />

      {/* Falling gold */}
      {coins.map((c, i) => (
        <g key={i} transform={`translate(${c.x} ${c.y}) rotate(${c.rot}) scale(1 ${0.25 + 0.75 * c.flip})`}>
          <circle r={c.s} fill="url(#cGold)" />
          <circle r={c.s * 0.7} fill="none" stroke="#8A6428" strokeWidth={2} />
        </g>
      ))}
    </Canvas>
  );
};
