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
import { Rich } from '../TipReel/TipReel';

/**
 * DesignThinking: ~37s vertical reel, "build a business the way designers do".
 * Hook → five design-thinking stages (each with a line-drawn icon and a prompt typed into a card) → CTA.
 * A stage map at the top tracks progress; text stays inside TikTok's safe zone.
 */

const { fontFamily: serif } = loadFraunces();
const { fontFamily: sans } = loadInter();
const { fontFamily: mono } = loadMono();

const BG = '#0B0A08';
const INK = '#F5F1E8';
const GOLD = '#E2B464';
const MUTED = 'rgba(245,241,232,.72)';
const FAINT = 'rgba(245,241,232,.28)';

export const HOOK = 90, STAGE = 180, CTA = 120;

type Stage = { name: string; title: string; icon: keyof typeof ICONS; prompt: string };

export const STAGES: Stage[] = [
  {
    name: 'Empathize', icon: 'eye', title: 'Find what people *struggle* with.',
    prompt: 'Connect to my browser. Read the top TikTok and Reddit comments about [your topic]. List the 15 frustrations people repeat most, in their own words.',
  },
  {
    name: 'Define', icon: 'target', title: 'Pick *one* problem.',
    prompt: 'From that list, pick the one problem people would pay to fix fastest. Write it as: [who] needs [what] because [why].',
  },
  {
    name: 'Ideate', icon: 'bulb', title: 'Turn it into *product ideas.*',
    prompt: 'Give me 10 digital product ideas that solve it: ebooks, templates, mini-courses. Rank them by how fast I can make them and how easy they are to sell.',
  },
  {
    name: 'Prototype', icon: 'layers', title: 'Build it in *a weekend.*',
    prompt: 'Plan idea #1 as a product I can finish in 48 hours: title, promise, chapters and price. Then write a one-page sales page for it.',
  },
  {
    name: 'Test', icon: 'chart', title: 'Launch small. *Learn fast.*',
    prompt: 'Write a 7-day launch plan for under 1,000 followers and zero ad budget. Tell me which 3 numbers to track and what to change if they are low.',
  },
];

export const DESIGN_THINKING_FRAMES = HOOK + STAGES.length * STAGE + CTA;

const SAFE = { top: 260, left: 88, right: 170, bottom: 460 };
const W = 1080 - SAFE.left - SAFE.right;
const SPRING = { damping: 200, mass: 0.6, stiffness: 120 } as const;
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/** 24×24 line icons, drawn on with stroke-dashoffset. */
const ICONS = {
  eye: ['M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z', 'M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z'],
  target: ['M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z', 'M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10z', 'M12 11a1 1 0 1 1 0 2 1 1 0 0 1 0-2z'],
  bulb: ['M9 18h6', 'M10 21h4', 'M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z'],
  layers: ['M12 3l9 5-9 5-9-5 9-5z', 'M3 13l9 5 9-5', 'M3 17.5l9 5 9-5'],
  chart: ['M3 20h18', 'M5 16l5-5 4 3 6-7', 'M16 7h4v4'],
};

const Icon: React.FC<{ name: keyof typeof ICONS; size: number; start?: number }> = ({ name, size, start = 0 }) => {
  const frame = useCurrentFrame();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {ICONS[name].map((d, i) => {
        const p = interpolate(frame, [start + i * 6, start + i * 6 + 22], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
        return <path key={i} d={d} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} stroke={GOLD} strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />;
      })}
    </svg>
  );
};

/** Which stage is on screen: -1 during the hook, STAGES.length during the CTA. */
const activeAt = (frame: number) => (frame < HOOK ? -1 : Math.min(STAGES.length, Math.floor((frame - HOOK) / STAGE)));

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  // glow glides to the active stage over the first 25 frames of each stage
  const t = (frame - HOOK) / STAGE;
  const idx = Math.floor(t);
  const ease = Easing.inOut(Easing.cubic)(Math.min(1, ((t - idx) * STAGE) / 25));
  const pos = Math.max(0, Math.min(STAGES.length - 1, idx - 1 + ease));
  const glowX = SAFE.left + (pos / (STAGES.length - 1)) * W;
  return (
    <AbsoluteFill style={{ backgroundColor: BG, overflow: 'hidden' }}>
      {/* designer's canvas: slowly drifting dot grid */}
      <AbsoluteFill style={{
        backgroundImage: 'radial-gradient(rgba(245,241,232,.09) 1.5px, transparent 1.5px)',
        backgroundSize: '48px 48px', backgroundPosition: `0 ${-frame * 0.4}px`,
        maskImage: 'radial-gradient(ellipse at 50% 40%, black 30%, transparent 80%)',
      }} />
      <div style={{
        position: 'absolute', left: glowX - 450, top: -200, width: 900, height: 900, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(226,180,100,.22), transparent 65%)', filter: 'blur(30px)',
      }} />
    </AbsoluteFill>
  );
};

const TopBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <div style={{ position: 'absolute', top: SAFE.top - 90, left: SAFE.left, right: SAFE.right }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: serif, fontSize: 38, fontWeight: 500, color: INK }}>iLens</span>
        <span style={{ fontFamily: sans, fontSize: 22, letterSpacing: '.32em', textTransform: 'uppercase', color: 'rgba(245,241,232,.55)' }}>Design × AI</span>
      </div>
      <div style={{ marginTop: 22, height: 3, background: 'rgba(245,241,232,.12)', borderRadius: 2 }}>
        <div style={{ height: 3, width: `${(frame / durationInFrames) * 100}%`, background: GOLD, borderRadius: 2 }} />
      </div>
    </div>
  );
};

/** Five-node stage map; the gold line runs to the active stage and a ripple marks each arrival. */
const StageMap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = activeAt(frame);
  const n = STAGES.length;
  const target = active < 0 ? 0 : Math.min(active, n - 1) / (n - 1);
  const since = active < 0 ? 0 : active >= n ? frame - HOOK - n * STAGE : (frame - HOOK) % STAGE;
  const prev = active <= 0 ? 0 : (Math.min(active, n) - 1) / (n - 1);
  const grow = spring({ frame: since, fps, config: { damping: 200, stiffness: 80 } });
  const fill = active < 0 ? 0 : prev + (target - prev) * grow;
  const top = SAFE.top + 40;
  return (
    <div style={{ position: 'absolute', top, left: SAFE.left, width: W, height: 90 }}>
      <div style={{ position: 'absolute', top: 11, left: 0, right: 0, height: 2, background: 'rgba(245,241,232,.14)' }} />
      <div style={{ position: 'absolute', top: 11, left: 0, width: W * fill, height: 2, background: GOLD }} />
      {STAGES.map((s, i) => {
        const x = (i / (n - 1)) * W;
        const appear = spring({ frame: frame - 8 - i * 7, fps, config: { damping: 14, stiffness: 160 } });
        const on = active >= i;
        const isActive = active === i;
        const ripple = isActive ? interpolate(since, [0, 30], [0, 1], clamp) : 1;
        return (
          <div key={s.name} style={{ position: 'absolute', left: x, top: 0, transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: 24, height: 24 }}>
              {isActive && (
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: '50%', border: `2px solid ${GOLD}`,
                  transform: `scale(${1 + ripple * 3})`, opacity: 1 - ripple,
                }} />
              )}
              <div style={{
                width: 24, height: 24, borderRadius: '50%', transform: `scale(${appear * (isActive ? 1.25 : 1)})`,
                background: on ? GOLD : BG, border: `2px solid ${on ? GOLD : FAINT}`,
                boxShadow: isActive ? '0 0 28px rgba(226,180,100,.7)' : 'none',
              }} />
            </div>
            <span style={{
              marginTop: 18, fontFamily: mono, fontSize: 17, letterSpacing: '.18em', textTransform: 'uppercase',
              color: isActive ? GOLD : on ? MUTED : FAINT, opacity: appear, whiteSpace: 'nowrap',
            }}>{s.name}</span>
          </div>
        );
      })}
    </div>
  );
};

const Block: React.FC<{ top?: number; children: React.ReactNode }> = ({ top = SAFE.top + 240, children }) => (
  <div style={{ position: 'absolute', top, left: SAFE.left, right: SAFE.right, bottom: SAFE.bottom, display: 'flex', flexDirection: 'column' }}>{children}</div>
);

/** Content leaves by lifting and fading over the last frames of its scene. */
const Exit: React.FC<{ len: number; children: React.ReactNode }> = ({ len, children }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [len - 12, len], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  return <AbsoluteFill style={{ opacity: 1 - t, transform: `translateY(${-50 * t}px)` }}>{children}</AbsoluteFill>;
};

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Block top={SAFE.top + 300}>
      <p style={{ fontFamily: mono, fontSize: 28, letterSpacing: '.36em', textTransform: 'uppercase', color: GOLD, margin: 0 }}>Design thinking × AI</p>
      <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: 116, lineHeight: 0.98, letterSpacing: '-.03em', color: INK, margin: '36px 0 0' }}>
        <Rich text={'Build your\nbusiness like\na *designer.*'} stagger={2} />
      </h1>
      <p style={{
        fontFamily: sans, fontSize: 44, color: MUTED, margin: '48px 0 0',
        opacity: interpolate(frame, [30, 42], [0, 1], clamp),
      }}>5 steps. 5 prompts. <span style={{ color: INK }}>Save this.</span></p>
    </Block>
  );
};

/** Prompt typed into a chat-style card; [placeholders] turn gold; the chip flips to "Copied" when done. */
const PromptCard: React.FC<{ text: string; start: number }> = ({ text, start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rise = spring({ frame: frame - start + 14, fps, config: SPRING });
  const typed = Math.max(0, Math.floor((frame - start) * 3));
  const done = typed >= text.length;
  const doneAt = start + Math.ceil(text.length / 3);
  const flip = spring({ frame: frame - doneAt - 12, fps, config: { damping: 12, stiffness: 160 } });
  let left = typed;
  return (
    <div style={{
      marginTop: 56, padding: '36px 40px 44px', borderRadius: 30,
      background: 'rgba(245,241,232,.045)', border: '1.5px solid rgba(226,180,100,.32)',
      boxShadow: '0 40px 80px rgba(0,0,0,.45)', opacity: rise, transform: `translateY(${(1 - rise) * 80}px)`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 26 }}>
        <span style={{ fontFamily: mono, fontSize: 22, letterSpacing: '.3em', color: GOLD }}>PROMPT</span>
        <span style={{
          fontFamily: sans, fontSize: 22, fontWeight: 600, borderRadius: 999, padding: '10px 22px',
          background: flip > 0.5 ? GOLD : 'transparent', color: flip > 0.5 ? BG : MUTED,
          border: `1.5px solid ${flip > 0.5 ? GOLD : FAINT}`, transform: `scale(${1 + Math.sin(Math.min(flip, 1) * Math.PI) * 0.12})`,
        }}>{flip > 0.5 ? '✓ Copied' : 'Copy'}</span>
      </div>
      <p style={{ fontFamily: sans, fontSize: 38, lineHeight: 1.45, color: INK, margin: 0 }}>
        {/* untyped text is laid out but invisible, so the card keeps its final height while typing */}
        {text.split(/(\[[^\]]+\])/).flatMap((part, k) => {
          const cut = Math.max(0, Math.min(part.length, left));
          const wasTyping = left > 0 && left <= part.length;
          left -= part.length;
          const color = part.startsWith('[') ? GOLD : INK;
          return [
            <span key={`${k}a`} style={{ color }}>{part.slice(0, cut)}</span>,
            wasTyping && !done ? <span key={`${k}c`} style={{ color: GOLD, fontWeight: 300 }}>▍</span> : null,
            <span key={`${k}b`} style={{ color: 'transparent' }}>{part.slice(cut)}</span>,
          ];
        })}
        {typed === 0 || (done && Math.floor(frame / 8) % 2 === 0) ? <span style={{ color: GOLD, fontWeight: 300 }}>▍</span> : null}
      </p>
    </div>
  );
};

const StageScene: React.FC<{ stage: Stage; index: number }> = ({ stage, index }) => {
  const frame = useCurrentFrame();
  const eyebrow = interpolate(frame, [2, 12], [0, 1], clamp);
  return (
    <Block>
      <div style={{ display: 'flex', alignItems: 'center', gap: 28, opacity: eyebrow }}>
        <Icon name={stage.icon} size={84} start={2} />
        <p style={{ fontFamily: mono, fontSize: 28, letterSpacing: '.3em', textTransform: 'uppercase', color: GOLD, margin: 0 }}>
          {String(index + 1).padStart(2, '0')} · {stage.name}
        </p>
      </div>
      <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: 96, lineHeight: 1.02, letterSpacing: '-.03em', color: INK, margin: '34px 0 0' }}>
        <Rich text={stage.title} start={6} />
      </h2>
      <PromptCard text={stage.prompt} start={30} />
    </Block>
  );
};

const Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - 18, fps, config: { damping: 12, stiffness: 140 } });
  return (
    <Block top={SAFE.top + 300}>
      <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: 118, lineHeight: 0.98, letterSpacing: '-.03em', color: INK, margin: 0 }}>
        <Rich text={'Save this\n*before you\nneed it.*'} />
      </h2>
      <p style={{ fontFamily: sans, fontSize: 42, lineHeight: 1.4, color: MUTED, margin: '40px 0 0', opacity: interpolate(frame, [10, 20], [0, 1], clamp) }}>
        Want 10 more prompts like these? Free.
      </p>
      <div style={{ marginTop: 56, transform: `scale(${pop})`, transformOrigin: 'left center' }}>
        <span style={{ display: 'inline-block', background: GOLD, color: BG, borderRadius: 999, padding: '30px 56px', fontFamily: sans, fontWeight: 600, fontSize: 52 }}>DM us PROMPTS</span>
      </div>
      <p style={{ fontFamily: mono, fontSize: 30, letterSpacing: '.12em', color: GOLD, margin: '36px 0 0', opacity: interpolate(frame, [30, 40], [0, 1], clamp) }}>ilens.co/free</p>
    </Block>
  );
};

export const DesignThinking: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: sans }}>
    <Background />
    <TopBar />
    <StageMap />
    <Sequence durationInFrames={HOOK}><Exit len={HOOK}><Hook /></Exit></Sequence>
    {STAGES.map((stage, i) => (
      <Sequence key={stage.name} from={HOOK + i * STAGE} durationInFrames={STAGE}>
        <Exit len={STAGE}><StageScene stage={stage} index={i} /></Exit>
      </Sequence>
    ))}
    <Sequence from={HOOK + STAGES.length * STAGE}><Cta /></Sequence>
  </AbsoluteFill>
);
