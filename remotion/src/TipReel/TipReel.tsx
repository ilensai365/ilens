import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { loadFont as loadFraunces } from '@remotion/google-fonts/Fraunces';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadMono } from '@remotion/google-fonts/JetBrainsMono';

/**
 * TipReel: 16s vertical teaching reel for TikTok / Reels in the black + gold carousel style.
 * Hook → three tips → "DM us PROMPTS". Content lives in ./presets.ts.
 * Layout keeps text inside TikTok's safe zone (clear of the top tabs, bottom caption and right icon column).
 */

const { fontFamily: serif } = loadFraunces();
const { fontFamily: sans } = loadInter();
const { fontFamily: mono } = loadMono();

// Dark = black + gold (default). Light = cream + deep gold: the brand gold #E2B464 is too pale for text on cream.
const THEMES = {
  dark: {
    bg: '#0B0A08', ink: '#F5F1E8', gold: '#E2B464', muted: 'rgba(245,241,232,.72)', faint: 'rgba(245,241,232,.55)', track: 'rgba(245,241,232,.12)',
    glow: 'rgba(226,180,100,.28)', glowEnd: 'rgba(226,180,100,.05)', ring: 'rgba(226,180,100,.28)', ghost: 'rgba(226,180,100,.18)',
    codeBg: 'rgba(226,180,100,.1)', codeBorder: 'rgba(226,180,100,.3)', btnBg: '#E2B464', btnInk: '#0B0A08',
  },
  light: {
    bg: '#F4EFE4', ink: '#16130E', gold: '#9A7128', muted: 'rgba(22,19,14,.68)', faint: 'rgba(22,19,14,.5)', track: 'rgba(22,19,14,.1)',
    glow: 'rgba(226,180,100,.45)', glowEnd: 'rgba(226,180,100,.08)', ring: 'rgba(154,113,40,.3)', ghost: 'rgba(154,113,40,.2)',
    codeBg: 'rgba(154,113,40,.08)', codeBorder: 'rgba(154,113,40,.35)', btnBg: '#16130E', btnInk: '#F4EFE4',
  },
};
type Theme = typeof THEMES.dark;
const ThemeCtx = React.createContext<Theme>(THEMES.dark);
const useTheme = () => React.useContext(ThemeCtx);

export const HOOK = 75, TIP = 105, CTA = 90;
export const tipReelDuration = (tips: number) => HOOK + tips * TIP + CTA;

export type Tip = { num: string; title: string; body: string };
export type TipReelProps = { tag: string; eyebrow: string; hook: string; tips: Tip[]; cta?: string; ctaSub?: string; ctaTitle?: string; light?: boolean };

const SAFE = { top: 260, left: 88, right: 170, bottom: 460 };
const SPRING = { damping: 200, mass: 0.6, stiffness: 120 } as const;

/** "Plain *gold italic* plain" → spans; words animate in one by one. */
export const Rich: React.FC<{ text: string; start?: number; stagger?: number }> = ({ text, start = 0, stagger = 2.2 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = useTheme();
  let i = 0;
  return (
    <>
      {text.split(/(\*[^*]+\*)/).filter(Boolean).map((part, p) => {
        const gold = part.startsWith('*');
        return part.replace(/\*/g, '').split(/(\s+|\n)/).map((w, k) => {
          if (w === '\n') return <br key={`${p}-${k}`} />;
          if (!w.trim()) return ' ';
          const s = spring({ frame: frame - start - i++ * stagger, fps, config: SPRING });
          return (
            <span key={`${p}-${k}`} style={{
              display: 'inline-block', opacity: s, transform: `translateY(${(1 - s) * 40}px)`,
              ...(gold ? { color: t.gold, fontStyle: 'italic', fontWeight: 400 } : {}),
            }}>{w}</span>
          );
        });
      })}
    </>
  );
};

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = useTheme();
  const drift = interpolate(frame, [0, durationInFrames], [-30, 30], { easing: Easing.inOut(Easing.ease) });
  return (
    <AbsoluteFill style={{ backgroundColor: t.bg }}>
      <div style={{
        position: 'absolute', left: `${30 + drift * 0.1}%`, top: '-30%', width: 520, height: 1900,
        transform: 'rotate(24deg)', filter: 'blur(80px)',
        background: `linear-gradient(to bottom, ${t.glow}, ${t.glowEnd} 60%, transparent)`,
      }} />
      <div style={{
        position: 'absolute', right: -440, bottom: -420 + drift, width: 1100, height: 1100,
        borderRadius: '50%', border: `2px solid ${t.ring}`,
      }} />
    </AbsoluteFill>
  );
};

const TopBar: React.FC<{ tag: string }> = ({ tag }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = useTheme();
  return (
    <div style={{ position: 'absolute', top: SAFE.top - 90, left: SAFE.left, right: SAFE.right }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: serif, fontSize: 38, fontWeight: 500, color: t.ink }}>iLens</span>
        <span style={{ fontFamily: sans, fontSize: 22, letterSpacing: '.32em', textTransform: 'uppercase', color: t.faint }}>{tag}</span>
      </div>
      <div style={{ marginTop: 22, height: 3, background: t.track, borderRadius: 2 }}>
        <div style={{ height: 3, width: `${(frame / durationInFrames) * 100}%`, background: t.gold, borderRadius: 2 }} />
      </div>
    </div>
  );
};

const Fade: React.FC<{ len: number; children: React.ReactNode }> = ({ len, children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [len - 10, len], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

const Block: React.FC<{ children: React.ReactNode; center?: boolean }> = ({ children, center = true }) => (
  <div style={{
    position: 'absolute', top: SAFE.top, left: SAFE.left, right: SAFE.right, bottom: SAFE.bottom,
    display: 'flex', flexDirection: 'column', justifyContent: center ? 'center' : 'flex-start',
  }}>{children}</div>
);

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const t = useTheme();
  return (
    <p style={{
      fontFamily: mono, fontSize: 28, letterSpacing: '.36em', textTransform: 'uppercase', color: t.gold, margin: 0,
      opacity: interpolate(frame, [0, 8], [0, 1], { extrapolateRight: 'clamp' }),
    }}>{children}</p>
  );
};

const Hook: React.FC<{ eyebrow: string; hook: string }> = ({ eyebrow, hook }) => {
  const t = useTheme();
  return (
    <Block>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: 118, lineHeight: 0.98, letterSpacing: '-.03em', color: t.ink, margin: '36px 0 0' }}>
        <Rich text={hook} start={4} />
      </h1>
    </Block>
  );
};

const TipScene: React.FC<{ tip: Tip; index: number }> = ({ tip, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = useTheme();
  const ghost = spring({ frame, fps, config: { damping: 200, stiffness: 60 } });
  const bodyIn = interpolate(frame, [22, 34], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <>
      <div style={{
        position: 'absolute', right: SAFE.right - 40, bottom: SAFE.bottom - 60, fontFamily: serif, fontStyle: 'italic',
        fontSize: 620, lineHeight: 0.8, color: 'transparent', WebkitTextStroke: `2px ${t.ghost}`,
        opacity: ghost, transform: `translateY(${(1 - ghost) * 80}px)`,
      }}>{String(index + 1).padStart(2, '0')}</div>
      <Block>
        <Eyebrow>{tip.num}</Eyebrow>
        <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: 96, lineHeight: 1, letterSpacing: '-.03em', color: t.ink, margin: '30px 0 0' }}>
          <Rich text={tip.title} start={3} />
        </h2>
        <p style={{
          fontFamily: sans, fontSize: 44, lineHeight: 1.4, color: t.muted, margin: '48px 0 0',
          opacity: bodyIn, transform: `translateY(${(1 - bodyIn) * 20}px)`,
        }}>
          {/* `code` in a tip body renders as a terminal command */}
          {tip.body.split(/(`[^`]+`)/).map((part, k) => part.startsWith('`') ? (
            <span key={k} style={{
              fontFamily: mono, fontSize: 36, color: t.gold, background: t.codeBg,
              border: `1px solid ${t.codeBorder}`, borderRadius: 10, padding: '4px 14px', whiteSpace: 'nowrap',
            }}>{part.slice(1, -1)}</span>
          ) : part)}
        </p>
      </Block>
    </>
  );
};

const Cta: React.FC<{ cta: string; sub: string; title: string }> = ({ cta, sub, title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = useTheme();
  const pop = spring({ frame: frame - 14, fps, config: { damping: 12, stiffness: 140 } });
  return (
    <Block>
      <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: 124, lineHeight: 0.98, letterSpacing: '-.03em', color: t.ink, margin: 0 }}>
        <Rich text={title} />
      </h2>
      <p style={{ fontFamily: sans, fontSize: 42, lineHeight: 1.4, color: t.muted, margin: '40px 0 0', opacity: interpolate(frame, [8, 18], [0, 1], { extrapolateRight: 'clamp' }) }}>{sub}</p>
      <div style={{ marginTop: 60, transform: `scale(${pop})`, transformOrigin: 'left center' }}>
        <span style={{ display: 'inline-block', background: t.btnBg, color: t.btnInk, borderRadius: 999, padding: '30px 56px', fontFamily: sans, fontWeight: 600, fontSize: 52 }}>{cta}</span>
      </div>
    </Block>
  );
};

export const TipReel: React.FC<TipReelProps> = ({
  tag, eyebrow, hook, tips, cta = 'DM us PROMPTS', ctaSub = 'Free PDF. We reply in your DMs.', ctaTitle = 'Want all\n*ten prompts?*', light = false,
}) => (
  <ThemeCtx.Provider value={light ? THEMES.light : THEMES.dark}>
  <AbsoluteFill style={{ fontFamily: sans }}>
    <Background />
    <TopBar tag={tag} />
    <Sequence durationInFrames={HOOK}><Fade len={HOOK}><Hook eyebrow={eyebrow} hook={hook} /></Fade></Sequence>
    {tips.map((tip, i) => (
      <Sequence key={i} from={HOOK + i * TIP} durationInFrames={TIP}>
        <Fade len={TIP}><TipScene tip={tip} index={i} /></Fade>
      </Sequence>
    ))}
    <Sequence from={HOOK + tips.length * TIP}><Cta cta={cta} sub={ctaSub} title={ctaTitle} /></Sequence>
  </AbsoluteFill>
  </ThemeCtx.Provider>
);
