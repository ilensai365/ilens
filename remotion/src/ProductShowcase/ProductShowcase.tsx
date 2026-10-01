import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { loadFont as loadCormorant } from '@remotion/google-fonts/CormorantGaramond';
import { loadFont as loadBodoni } from '@remotion/google-fonts/BodoniModa';
import { loadFont as loadPlayfair } from '@remotion/google-fonts/PlayfairDisplay';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import type { ProductShowcaseProps } from './schema';
import { CasinoVisual, JewelryVisual, PortofinoVisual, SerumVisual } from './visuals';

/**
 * ProductShowcase — 9:16 product reel template.
 * 1080x1920 · 30fps · 15s (450 frames)
 * Hook → product reveal → benefits → price + CTA.
 * Registered in ./Root.tsx as ProductShowcase-Serum / -Jewelry / -Portofino.
 */

export const SHOWCASE_DURATION = 450;

// latin-ext is required for Polish diacritics (ą, ę, ś, ż…)
const fontOpts = { subsets: ['latin', 'latin-ext'] as ('latin' | 'latin-ext')[] };
const SERIFS = {
  cormorant: loadCormorant('normal', { weights: ['500', '600'], ...fontOpts }).fontFamily,
  bodoni: loadBodoni('normal', { weights: ['400', '500'], ...fontOpts }).fontFamily,
  playfair: loadPlayfair('normal', { weights: ['400', '500'], ...fontOpts }).fontFamily,
};
const { fontFamily: sansFont } = loadInter('normal', { weights: ['400', '500', '600'], ...fontOpts });

const APPLE_SPRING = { damping: 200, mass: 0.6, stiffness: 120 } as const;
const CLAMP = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/** Scene timeline (frames). Neighbouring scenes overlap for crossfades. */
const T = {
  hook: [0, 80],
  reveal: 60,
  name: [78, 255],
  features: [245, 362],
  cta: [350, SHOWCASE_DURATION],
} as const;

/** Works with any CSS colour the Studio colour picker produces. */
const alpha = (color: string, pct: number) => `color-mix(in srgb, ${color} ${pct}%, transparent)`;

const fadeInOut = (frame: number, duration: number, fadeIn: number, fadeOut: number) =>
  interpolate(frame, [0, fadeIn, duration - fadeOut, duration], [0, 1, 1, 0], CLAMP);

const useEnter = (delay = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: APPLE_SPRING });
};

/** Shrink long strings so they stay on one or two lines. */
const fitSize = (text: string, max: number, min: number, idealChars: number) =>
  Math.round(Math.max(min, Math.min(max, max * (idealChars / Math.max(text.length, 1)))));

type SceneProps = ProductShowcaseProps & { serif: string };

/* ------------------------------------------------------------------ */
/*  Visual layer — client photo or built-in illustration               */
/* ------------------------------------------------------------------ */

const VisualLayer: React.FC<SceneProps> = (p) => {
  const frame = useCurrentFrame();
  const { theme } = p;

  const wipe = interpolate(frame, [T.reveal, T.reveal + 34], [100, 0], {
    ...CLAMP,
    easing: Easing.bezier(0.65, 0, 0.35, 1),
  });
  const scale = interpolate(frame, [T.reveal, SHOWCASE_DURATION], [1.12, 1], {
    ...CLAMP,
    easing: Easing.out(Easing.quad),
  });
  const sheenX = interpolate(frame, [105, 150], [-110, 110], CLAMP);
  const ctaDim = interpolate(frame, [T.cta[0], T.cta[0] + 20], [0, 1], CLAMP);
  // Packshot move: lift the product so price + CTA get the lower third
  const ctaLift = interpolate(frame, [T.cta[0], T.cta[0] + 30], [0, -9], {
    ...CLAMP,
    easing: Easing.bezier(0.65, 0, 0.35, 1),
  });

  const visualProps = { brand: p.brand, serif: p.serif, sans: sansFont };
  const content = p.image ? (
    <Img
      src={/^https?:\/\//.test(p.image) ? p.image : staticFile(p.image)}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  ) : p.visual === 'serum' ? (
    <SerumVisual {...visualProps} />
  ) : p.visual === 'jewelry' ? (
    <JewelryVisual {...visualProps} />
  ) : p.visual === 'casino' ? (
    <CasinoVisual {...visualProps} />
  ) : (
    <PortofinoVisual {...visualProps} />
  );

  return (
    <AbsoluteFill style={{ clipPath: `inset(${wipe}% 0 0 0)` }}>
      <AbsoluteFill style={{ transform: `translateY(${ctaLift}%) scale(${scale})` }}>{content}</AbsoluteFill>

      {/* Light sweep across the product */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.45) 50%, transparent 62%)',
          transform: `translateX(${sheenX}%)`,
          mixBlendMode: 'soft-light',
        }}
      />

      {/* Legibility gradients in the brand background colour */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(to bottom, ${alpha(theme.background, 70)} 0%, ${alpha(theme.background, 0)} 16%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(to top, ${theme.background} 0%, ${alpha(theme.background, 88)} 20%, ${alpha(
            theme.background,
            0
          )} 46%)`,
        }}
      />
      <AbsoluteFill style={{ backgroundColor: alpha(theme.background, 40), opacity: ctaDim }} />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/*  Scene 1 — Hook: brand eyebrow + headline, word by word             */
/* ------------------------------------------------------------------ */

const Hook: React.FC<SceneProps & { duration: number }> = ({ brand, headline, theme, serif, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = headline.split(' ');
  const eyebrow = useEnter(0);
  const line = useEnter(10);

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 90px',
        opacity: fadeInOut(frame, duration, 1, 16),
        background: `radial-gradient(70% 45% at 50% 45%, ${alpha(theme.accent, 22)} 0%, ${alpha(theme.accent, 0)} 70%)`,
      }}
    >
      <div
        style={{
          fontFamily: sansFont,
          fontWeight: 500,
          fontSize: 28,
          letterSpacing: '0.42em',
          textTransform: 'uppercase',
          color: theme.accent,
          opacity: eyebrow,
          transform: `translateY(${interpolate(eyebrow, [0, 1], [14, 0])}px)`,
        }}
      >
        {brand}
      </div>
      <div
        style={{
          margin: '34px 0 40px',
          height: 2,
          width: 120,
          background: theme.accent,
          transform: `scaleX(${line})`,
        }}
      />
      <div
        style={{
          fontFamily: serif,
          fontWeight: 500,
          fontSize: fitSize(headline, 112, 76, 26),
          lineHeight: 1.08,
          letterSpacing: '-0.01em',
          color: theme.ink,
          textAlign: 'center',
        }}
      >
        {words.map((w, i) => {
          const s = spring({ frame: frame - 8 - i * 4, fps, config: APPLE_SPRING });
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                marginRight: '0.26em',
                opacity: s,
                filter: `blur(${interpolate(s, [0, 1], [12, 0])}px)`,
                transform: `translateY(${interpolate(s, [0, 1], [30, 0])}px)`,
              }}
            >
              {w}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/*  Persistent brand mark (top)                                        */
/* ------------------------------------------------------------------ */

const TopBrand: React.FC<SceneProps> = ({ brand, theme, serif }) => {
  const enter = useEnter(0);
  return (
    <AbsoluteFill style={{ alignItems: 'center', paddingTop: 150 }}>
      <div
        style={{
          fontFamily: serif,
          fontWeight: 500,
          fontSize: 40,
          letterSpacing: '0.3em',
          paddingLeft: '0.3em',
          textTransform: 'uppercase',
          color: theme.ink,
          opacity: enter,
        }}
      >
        {brand}
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/*  Bottom block wrapper — sits above the Reels/TikTok caption area    */
/* ------------------------------------------------------------------ */

const BottomBlock: React.FC<{ duration: number; children: React.ReactNode }> = ({ duration, children }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '0 80px 340px',
        textAlign: 'center',
        opacity: fadeInOut(frame, duration, 1, 14),
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/*  Scene 2 — Product name                                             */
/* ------------------------------------------------------------------ */

const ProductName: React.FC<SceneProps & { duration: number }> = ({
  eyebrow,
  productName,
  subtitle,
  theme,
  serif,
  duration,
}) => {
  const a = useEnter(0);
  const b = useEnter(8);
  const c = useEnter(16);
  const rise = (s: number) => `translateY(${interpolate(s, [0, 1], [40, 0])}px)`;

  return (
    <BottomBlock duration={duration}>
      <div
        style={{
          fontFamily: sansFont,
          fontWeight: 600,
          fontSize: 26,
          letterSpacing: '0.34em',
          textTransform: 'uppercase',
          color: theme.accent,
          opacity: a,
          transform: rise(a),
        }}
      >
        {eyebrow}
      </div>
      <div
        style={{
          marginTop: 22,
          fontFamily: serif,
          fontWeight: 500,
          fontSize: fitSize(productName, 104, 66, 16),
          lineHeight: 1.05,
          color: theme.ink,
          opacity: b,
          transform: rise(b),
        }}
      >
        {productName}
      </div>
      <div
        style={{
          marginTop: 26,
          fontFamily: sansFont,
          fontSize: 34,
          lineHeight: 1.35,
          color: theme.muted,
          opacity: c,
          transform: rise(c),
        }}
      >
        {subtitle}
      </div>
    </BottomBlock>
  );
};

/* ------------------------------------------------------------------ */
/*  Scene 3 — Benefits card                                            */
/* ------------------------------------------------------------------ */

const Features: React.FC<SceneProps & { duration: number }> = ({ features, theme, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = useEnter(0);

  return (
    <BottomBlock duration={duration}>
      <div
        style={{
          width: '100%',
          padding: '48px 56px',
          borderRadius: 32,
          background: alpha(theme.background, 62),
          border: `1px solid ${alpha(theme.ink, 14)}`,
          backdropFilter: 'blur(18px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 34,
          opacity: card,
          transform: `translateY(${interpolate(card, [0, 1], [50, 0])}px)`,
        }}
      >
        {features.map((f, i) => {
          const s = spring({ frame: frame - 8 - i * 9, fps, config: APPLE_SPRING });
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 28,
                textAlign: 'left',
                opacity: s,
                transform: `translateX(${interpolate(s, [0, 1], [-30, 0])}px)`,
              }}
            >
              <div
                style={{
                  flex: '0 0 auto',
                  width: 16,
                  height: 16,
                  background: theme.accent,
                  transform: `rotate(45deg) scale(${s})`,
                }}
              />
              <div style={{ fontFamily: sansFont, fontSize: 38, lineHeight: 1.3, color: theme.ink }}>{f}</div>
            </div>
          );
        })}
      </div>
    </BottomBlock>
  );
};

/* ------------------------------------------------------------------ */
/*  Scene 4 — Price + CTA                                              */
/* ------------------------------------------------------------------ */

const Offer: React.FC<SceneProps> = ({ price, oldPrice, cta, url, theme, serif }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = useEnter(0);
  const b = useEnter(10);
  const c = useEnter(20);
  const pulse = 1 + 0.025 * Math.max(0, Math.sin((frame - 30) / fps * 4));
  const rise = (s: number) => `translateY(${interpolate(s, [0, 1], [40, 0])}px)`;

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '0 80px 330px',
        textAlign: 'center',
        opacity: interpolate(frame, [0, 10], [0, 1], CLAMP),
      }}
    >
      {oldPrice ? (
        <div
          style={{
            fontFamily: sansFont,
            fontSize: 38,
            color: theme.muted,
            textDecoration: 'line-through',
            opacity: a,
            transform: rise(a),
          }}
        >
          {oldPrice}
        </div>
      ) : null}
      <div
        style={{
          fontFamily: serif,
          fontWeight: 500,
          fontSize: fitSize(price, 132, 84, 8),
          lineHeight: 1.05,
          color: theme.ink,
          opacity: a,
          transform: rise(a),
        }}
      >
        {price}
      </div>
      <div
        style={{
          marginTop: 48,
          padding: '30px 72px',
          borderRadius: 999,
          background: theme.accent,
          color: theme.onAccent,
          fontFamily: sansFont,
          fontWeight: 600,
          fontSize: 36,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          boxShadow: `0 18px 50px ${alpha(theme.accent, 35)}`,
          opacity: b,
          transform: `${rise(b)} scale(${pulse})`,
        }}
      >
        {cta}
      </div>
      <div
        style={{
          marginTop: 36,
          fontFamily: sansFont,
          fontSize: 30,
          letterSpacing: '0.14em',
          color: theme.muted,
          opacity: c,
        }}
      >
        {url}
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/*  Small print — visible for the whole spot when set (regulated ads)  */
/* ------------------------------------------------------------------ */

const Disclaimer: React.FC<SceneProps> = ({ disclaimer, theme }) => (
  <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 250 }}>
    <div
      style={{
        fontFamily: sansFont,
        fontWeight: 500,
        fontSize: 24,
        letterSpacing: '0.12em',
        color: theme.muted,
        padding: '10px 26px',
        borderRadius: 999,
        border: `1px solid ${alpha(theme.muted, 40)}`,
        background: alpha(theme.background, 70),
      }}
    >
      {disclaimer}
    </div>
  </AbsoluteFill>
);

/* ------------------------------------------------------------------ */
/*  Root component                                                     */
/* ------------------------------------------------------------------ */

export const ProductShowcase: React.FC<ProductShowcaseProps> = (props) => {
  const p: SceneProps = { ...props, serif: SERIFS[props.font] };
  const len = (r: readonly [number, number]) => r[1] - r[0];

  return (
    <AbsoluteFill style={{ backgroundColor: props.theme.background }}>
      <VisualLayer {...p} />

      <Sequence from={T.hook[0]} durationInFrames={len(T.hook)}>
        <Hook {...p} duration={len(T.hook)} />
      </Sequence>

      <Sequence from={T.name[0] + 8}>
        <TopBrand {...p} />
      </Sequence>

      <Sequence from={T.name[0]} durationInFrames={len(T.name)}>
        <ProductName {...p} duration={len(T.name)} />
      </Sequence>

      <Sequence from={T.features[0]} durationInFrames={len(T.features)}>
        <Features {...p} duration={len(T.features)} />
      </Sequence>

      <Sequence from={T.cta[0]} durationInFrames={len(T.cta)}>
        <Offer {...p} />
      </Sequence>

      {props.disclaimer ? <Disclaimer {...p} /> : null}
    </AbsoluteFill>
  );
};
