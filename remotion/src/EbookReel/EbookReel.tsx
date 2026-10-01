import React from 'react';
import { AbsoluteFill, Easing, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont as loadFraunces } from '@remotion/google-fonts/Fraunces';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadMono } from '@remotion/google-fonts/JetBrainsMono';
import { Rich } from '../TipReel/TipReel';

/**
 * EbookReel: ~16s launch reel for the "Claude × Remotion" guide (€29, payhip.com/b/QbEwq).
 * Hook (pain) → typed prompt → "it renders" (real Studio screenshot + reels made this way) → cover + price → CTA.
 * Same canvases as FollowReel: 1080×1920 (Reels/Stories) and 1080×1350 (feed). Media in public/ebook/.
 */

const { fontFamily: serif } = loadFraunces();
const { fontFamily: sans } = loadInter();
const { fontFamily: mono } = loadMono();

const BG = '#0B0A08';
const INK = '#F5F1E8';
const GOLD = '#E2B464';
const MUTED = 'rgba(245,241,232,.72)';
const SPRING = { damping: 200, mass: 0.6, stiffness: 120 } as const;

export const HOOK = 72, PROMPT = 105, RENDER = 96, BOOK = 105, CTA = 90;
export const EBOOK_REEL_FRAMES = HOOK + PROMPT + RENDER + BOOK + CTA;

export type EbookReelProps = { feed?: boolean };

const useSafe = (feed?: boolean) =>
  feed ? { top: 150, left: 88, right: 88, bottom: 110 } : { top: 300, left: 88, right: 150, bottom: 380 };

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const drift = interpolate(frame, [0, durationInFrames], [-30, 30], { easing: Easing.inOut(Easing.ease) });
  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(245,241,232,.07) 1.4px, transparent 1.4px)', backgroundSize: '36px 36px' }} />
      <div style={{
        position: 'absolute', left: `${-8 + drift * 0.1}%`, top: '-18%', width: 1100, height: 1100, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(226,180,100,.20), transparent 62%)',
      }} />
      <div style={{ position: 'absolute', right: -460, bottom: -460 + drift, width: 1100, height: 1100, borderRadius: '50%', border: '2px solid rgba(226,180,100,.22)' }} />
    </AbsoluteFill>
  );
};

const Header: React.FC<{ feed?: boolean }> = ({ feed }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const safe = useSafe(feed);
  return (
    <div style={{ position: 'absolute', top: safe.top - 100, left: safe.left, right: safe.right }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: serif, fontSize: 40, fontWeight: 600, color: INK }}>iLens</span>
        <span style={{ fontFamily: mono, fontSize: 21, letterSpacing: '.34em', textTransform: 'uppercase', color: 'rgba(245,241,232,.55)' }}>Claude × Remotion</span>
      </div>
      <div style={{ marginTop: 20, height: 3, background: 'rgba(245,241,232,.12)', borderRadius: 2 }}>
        <div style={{ height: 3, width: `${(frame / durationInFrames) * 100}%`, background: GOLD, borderRadius: 2 }} />
      </div>
    </div>
  );
};

const Block: React.FC<{ feed?: boolean; children: React.ReactNode }> = ({ feed, children }) => {
  const safe = useSafe(feed);
  return (
    <div style={{ position: 'absolute', top: safe.top, left: safe.left, right: safe.right, bottom: safe.bottom, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {children}
    </div>
  );
};

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  return (
    <p style={{ fontFamily: mono, fontSize: 28, letterSpacing: '.36em', textTransform: 'uppercase', color: GOLD, margin: 0, opacity: interpolate(frame, [0, 8], [0, 1], { extrapolateRight: 'clamp' }) }}>
      {children}
    </p>
  );
};

const Out: React.FC<{ len: number; children: React.ReactNode }> = ({ len, children }) => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{ opacity: interpolate(frame, [len - 8, len], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>{children}</AbsoluteFill>;
};

const H1: React.FC<{ text: string; size: number; start?: number }> = ({ text, size, start = 4 }) => (
  <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: size, lineHeight: 0.98, letterSpacing: '-.03em', color: INK, margin: '32px 0 0' }}>
    <Rich text={text} start={start} stagger={3} />
  </h1>
);

// 1 · Hook: the pain.
const Hook: React.FC<{ feed?: boolean }> = ({ feed }) => (
  <Out len={HOOK}>
    <Block feed={feed}>
      <Eyebrow>Still editing by hand?</Eyebrow>
      <H1 text={'Stop editing\nreels.\n*Describe them.*'} size={feed ? 124 : 148} />
    </Block>
  </Out>
);

// 2 · A prompt types itself into a Claude Code card.
const PROMPT_TEXT = 'Make a 15-second vertical reel.\nBlack and gold, serif headlines.\nHook first, three tips, then\n“Follow @ilens.co”.';
const Prompt: React.FC<{ feed?: boolean }> = ({ feed }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inS = spring({ frame, fps, config: SPRING });
  const chars = Math.floor(interpolate(frame, [12, 80], [0, PROMPT_TEXT.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const done = chars >= PROMPT_TEXT.length;
  const outOp = interpolate(frame, [84, 94], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <Out len={PROMPT}>
      <Block feed={feed}>
        <Eyebrow>Step 1 · Say it</Eyebrow>
        <div style={{
          marginTop: 34, borderRadius: 30, padding: '40px 44px', transform: `translateY(${(1 - inS) * 60}px)`, opacity: inS,
          background: 'linear-gradient(180deg,#15130F,#0F0E0B)', boxShadow: 'inset 0 0 0 2px rgba(245,241,232,.1), 0 60px 110px -40px rgba(0,0,0,.95)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 30 }}>
            {[0, 1, 2].map((i) => <span key={i} style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(245,241,232,.18)' }} />)}
            <span style={{ marginLeft: 'auto', fontFamily: mono, fontSize: 20, letterSpacing: '.3em', color: 'rgba(245,241,232,.45)' }}>CLAUDE CODE</span>
          </div>
          <pre style={{ fontFamily: mono, fontSize: feed ? 34 : 38, lineHeight: 1.6, color: 'rgba(245,241,232,.9)', whiteSpace: 'pre-wrap', margin: 0, minHeight: feed ? 230 : 250 }}>
            <span style={{ color: GOLD }}>&gt; </span>{PROMPT_TEXT.slice(0, chars)}
            {!done || Math.floor(frame / 8) % 2 === 0 ? <span style={{ display: 'inline-block', width: 20, height: 40, background: GOLD, verticalAlign: -6, marginLeft: 4 }} /> : null}
          </pre>
          <div style={{ marginTop: 26, paddingTop: 24, borderTop: '2px solid rgba(245,241,232,.1)', display: 'flex', alignItems: 'center', gap: 18, fontFamily: mono, fontSize: 28, color: INK, opacity: outOp }}>
            <span style={{ width: 52, height: 52, borderRadius: '50%', background: GOLD, color: BG, display: 'grid', placeItems: 'center', fontSize: 22 }}>▶</span>
            out/reel.mp4 <span style={{ color: 'rgba(245,241,232,.45)' }}>· rendered</span>
          </div>
        </div>
      </Block>
    </Out>
  );
};

// 3 · It renders: real Studio screenshot, then reels made this way fan in.
const REELS = ['cover-ClaudeSetup.png', 'cover-Prompts.png', 'cover-Ebook.png'];
const Render: React.FC<{ feed?: boolean }> = ({ feed }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const shot = spring({ frame, fps, config: SPRING });
  const w = feed ? 904 : 842;
  return (
    <Out len={RENDER}>
      <Block feed={feed}>
        <Eyebrow>Step 2 · Watch it render</Eyebrow>
        <H1 text={'Your brand.\n*Every frame.*'} size={feed ? 96 : 110} start={2} />
        <div style={{ position: 'relative', marginTop: 44, height: feed ? 440 : 620 }}>
          <Img src={staticFile('ebook/studio.jpg')} style={{
            width: w, borderRadius: 18, boxShadow: '0 0 0 2px rgba(245,241,232,.1), 0 50px 90px -30px rgba(0,0,0,.95)',
            opacity: shot, transform: `translateY(${(1 - shot) * 50}px)`,
          }} />
          {REELS.map((r, i) => {
            const s = spring({ frame: frame - 26 - i * 6, fps, config: { damping: 16, mass: 0.7, stiffness: 130 } });
            const rw = feed ? 170 : 210;
            return (
              <Img key={r} src={staticFile(`ebook/${r}`)} style={{
                position: 'absolute', bottom: feed ? -30 : 0, left: 40 + i * (rw * 0.78), width: rw, borderRadius: 16,
                boxShadow: `0 0 0 2px ${i === 0 ? 'rgba(226,180,100,.7)' : 'rgba(245,241,232,.14)'}, 0 40px 70px -20px rgba(0,0,0,.95)`,
                opacity: s, transform: `translateY(${(1 - s) * 200}px) rotate(${(i - 1) * 5}deg)`,
              }} />
            );
          })}
        </div>
      </Block>
    </Out>
  );
};

// 4 · The book: cover rises in, price and what's inside.
const Book: React.FC<{ feed?: boolean }> = ({ feed }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 18, mass: 0.8, stiffness: 110 } });
  const coverW = feed ? 330 : 420;
  const points = ['Setup in 10 minutes', 'The prompt behind a finished reel', 'Templates for series & clients'];
  return (
    <Out len={BOOK}>
      <Block feed={feed}>
        <Eyebrow>New guide · 38 pages</Eyebrow>
        <div style={{ display: 'flex', gap: 48, alignItems: 'center', marginTop: 40 }}>
          <Img src={staticFile('ebook/cover.png')} style={{
            width: coverW, borderRadius: 8, flex: 'none', opacity: s, transform: `translateY(${(1 - s) * 120}px) rotate(${(1 - s) * -6}deg)`,
            boxShadow: '0 0 0 2px rgba(245,241,232,.08), 0 60px 110px -30px rgba(0,0,0,.95), 0 0 140px -40px rgba(226,180,100,.5)',
          }} />
          <div>
            {points.map((pt, i) => {
              const ps = spring({ frame: frame - 18 - i * 7, fps, config: SPRING });
              return (
                <div key={pt} style={{ display: 'flex', gap: 18, alignItems: 'flex-start', marginBottom: 30, opacity: ps, transform: `translateX(${(1 - ps) * 40}px)` }}>
                  <span style={{ flex: 'none', width: 40, height: 40, borderRadius: '50%', background: 'rgba(226,180,100,.16)', color: GOLD, display: 'grid', placeItems: 'center', fontSize: 22, marginTop: 4 }}>✓</span>
                  <span style={{ fontFamily: sans, fontSize: feed ? 34 : 38, lineHeight: 1.3, color: INK }}>{pt}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, marginTop: 44, opacity: interpolate(frame, [40, 52], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
          <span style={{ fontFamily: sans, fontWeight: 600, fontSize: feed ? 110 : 128, letterSpacing: '-.03em', color: INK, lineHeight: 1 }}>€29</span>
          <span style={{ fontFamily: mono, fontSize: 24, letterSpacing: '.28em', textTransform: 'uppercase', color: MUTED }}>Instant PDF</span>
        </div>
      </Block>
    </Out>
  );
};

// 5 · CTA.
const Cta: React.FC<{ feed?: boolean }> = ({ feed }) => {
  const frame = useCurrentFrame();
  const bob = Math.sin(frame / 5) * 10;
  const on = interpolate(frame, [10, 26], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <Block feed={feed}>
      <Eyebrow>Claude × Remotion</Eyebrow>
      <H1 text={'Get the guide\n*at ilens.co*'} size={feed ? 132 : 150} start={2} />
      <div style={{
        marginTop: 50, alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 16, padding: '26px 44px', borderRadius: 999,
        background: GOLD, color: BG, fontFamily: sans, fontWeight: 600, fontSize: 40, opacity: on, boxShadow: `0 0 ${60 * on}px -10px rgba(226,180,100,.7)`,
      }}>
        Link in bio →
      </div>
      <div style={{ fontFamily: mono, fontSize: 28, letterSpacing: '.3em', textTransform: 'uppercase', color: MUTED, marginTop: 48, transform: `translateY(${bob}px)`, opacity: on }}>
        Save this for your next reel
      </div>
    </Block>
  );
};

export const EbookReel: React.FC<EbookReelProps> = ({ feed }) => {
  let t = 0;
  const at = (len: number) => { const from = t; t += len; return from; };
  return (
    <AbsoluteFill style={{ fontFamily: sans }}>
      <Background />
      <Header feed={feed} />
      <Sequence from={at(HOOK)} durationInFrames={HOOK}><Hook feed={feed} /></Sequence>
      <Sequence from={at(PROMPT)} durationInFrames={PROMPT}><Prompt feed={feed} /></Sequence>
      <Sequence from={at(RENDER)} durationInFrames={RENDER}><Render feed={feed} /></Sequence>
      <Sequence from={at(BOOK)} durationInFrames={BOOK}><Book feed={feed} /></Sequence>
      <Sequence from={at(CTA)} durationInFrames={CTA}><Cta feed={feed} /></Sequence>
    </AbsoluteFill>
  );
};
