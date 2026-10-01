import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { loadFont as loadFraunces } from '@remotion/google-fonts/Fraunces';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadMono } from '@remotion/google-fonts/JetBrainsMono';
import { Rich } from '../TipReel/TipReel';

/**
 * ClaudeReel: ~29s vertical reel built around a 10s AI talking clip (public/claude-reel/*.mp4).
 * Talk (her voice, reframed so the burned-in captions fall off the top, word-by-word captions)
 * → bridge card → three "how it works" steps → CTA. Variants live in ./presets.ts.
 * Text stays inside the Reels safe zone (clear of the top bar, bottom caption and right icon column).
 */

const { fontFamily: serif } = loadFraunces();
const { fontFamily: sans } = loadInter('normal', { weights: ['400', '600', '800'] });
const { fontFamily: mono } = loadMono();

const BG = '#0B0A08';
const INK = '#F5F1E8';
const GOLD = '#E2B464';
// Matte caption gold: flatter and less saturated than GOLD, with a soft shadow instead of a glow.
const MATTE = '#C4A57A';
const MUTED = 'rgba(245,241,232,.72)';
const SPRING = { damping: 200, mass: 0.6, stiffness: 120 } as const;
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

// The AI clips speak until their very last frame, so the voice is cut at the last clean pause (7.2s)
// and the final line becomes the bridge card instead of a word clipped in half.
export const TALK = 216, BRIDGE = 66, STEP = 150, CTA = 135;
export const CLAUDE_REEL_FRAMES = TALK + BRIDGE + 3 * STEP + CTA;

type Caption = { from: number; to: number; text: string };
export type ClaudeReelProps = {
  src: string;
  /** Frames at 30fps, following the clip's own burned-in captions. *word* = matte gold italic. */
  captions: Caption[];
  bridge: string;
  /** build: step 2 shows the Remotion code. edit: step 2 shows plain-word edit requests. */
  mode: 'build' | 'edit';
  prompt: string;
  steps: [string, string][];
  ctaTitle: string;
};

const Ctx = React.createContext<ClaudeReelProps | null>(null);
const useReel = () => React.useContext(Ctx)!;

/* ---------- Scene 1: the talking clip ---------- */

const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cap = useReel().captions.find((c) => frame >= c.from && frame < c.to);
  if (!cap) return null;
  const words = cap.text.split(/(\*[^*]+\*)/).filter(Boolean).flatMap((part) => {
    const gold = part.startsWith('*');
    return part.replace(/\*/g, '').split(/\s+/).filter(Boolean).map((w) => ({ w, gold }));
  });
  const per = Math.min(6, (cap.to - cap.from - 12) / words.length);
  return (
    <div style={{
      position: 'absolute', left: 88, right: 150, top: 1250, textAlign: 'center',
      fontFamily: serif, fontWeight: 700, fontSize: 88, lineHeight: 1.05, letterSpacing: '-.03em',
    }}>
      {words.map(({ w, gold }, i) => {
        const at = cap.from + i * per;
        const s = spring({ frame: frame - at, fps, config: { damping: 12, stiffness: 220, mass: 0.5 } });
        const active = frame >= at && frame < at + per + 4;
        return (
          <span key={i} style={{
            display: 'inline-block', margin: '0 10px', opacity: Math.min(1, s * 1.5),
            transform: `translateY(${(1 - s) * 30}px) scale(${0.7 + s * 0.3 + (active ? 0.06 : 0)})`,
            color: gold ? MATTE : INK, ...(gold ? { fontStyle: 'italic', fontWeight: 400 } : {}),
            textShadow: '0 2px 12px rgba(0,0,0,.55)',
          }}>{w}</span>
        );
      })}
    </div>
  );
};

const Talk: React.FC<{ muted?: boolean }> = ({ muted }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { src, captions } = useReel();
  // Jump-cut punch-in: alternate zoom per caption segment, eased over 6 frames, plus a slow push.
  const seg = captions.findIndex((c) => frame >= c.from && frame < c.to);
  const punch = captions.reduce((z, c, i) => {
    const t = interpolate(frame, [c.from, c.from + 6], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
    return i === 0 ? z : z + (i % 2 ? 0.05 : -0.05) * t;
  }, 1);
  const zoom = punch + interpolate(frame, [0, TALK], [0, 0.04]);
  const tag = spring({ frame: frame - 4, fps, config: SPRING });
  const badge = spring({ frame: frame - 20, fps, config: { damping: 14, stiffness: 140 } });
  const out = interpolate(frame, [TALK - 8, TALK], [1, 0], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, opacity: out }}>
      {/* 720×1280 source at 1.875x, shifted up so its burned-in caption pill sits above the frame */}
      <div style={{ position: 'absolute', left: -135, top: -470, width: 1350, height: 2400, transform: `scale(${zoom})`, transformOrigin: '50% 45%' }}>
        <OffthreadVideo
          src={staticFile(src)} muted={muted} style={{ width: '100%', height: '100%' }}
          volume={(f) => interpolate(f, [TALK - 7, TALK], [1, 0], clamp)}
        />
      </div>
      <AbsoluteFill style={{ background: 'linear-gradient(to bottom, rgba(11,10,8,.55) 0%, transparent 18%, transparent 55%, rgba(11,10,8,.8) 80%, #0B0A08 90%)' }} />

      <div style={{
        position: 'absolute', top: 250, left: 88, opacity: tag, transform: `translateY(${(1 - tag) * -24}px)`,
        display: 'flex', alignItems: 'center', gap: 14, padding: '14px 26px', borderRadius: 999,
        background: 'rgba(11,10,8,.62)', border: '1px solid rgba(226,180,100,.55)',
        fontFamily: mono, fontSize: 24, letterSpacing: '.22em', textTransform: 'uppercase', color: GOLD,
      }}>
        <span style={{ width: 12, height: 12, borderRadius: 6, background: GOLD, opacity: 0.5 + 0.5 * Math.sin(frame / 5) }} />
        Claude Code × Remotion
      </div>

      <Captions />

      <div style={{
        position: 'absolute', top: 1470, left: 0, right: 0, display: 'flex', justifyContent: 'center',
        opacity: badge * interpolate(frame, [110, 125], [1, 0], clamp), transform: `scale(${0.7 + badge * 0.3})`,
      }}>
        <span style={{ fontFamily: sans, fontWeight: 600, fontSize: 30, color: BG, background: GOLD, padding: '14px 28px', borderRadius: 999 }}>
          This whole edit was made with code ↓
        </span>
      </div>

      {/* segment progress ticks */}
      <div style={{ position: 'absolute', top: 214, left: 88, right: 150, display: 'flex', gap: 8 }}>
        {captions.map((c, i) => (
          <div key={i} style={{ flex: 1, height: 5, borderRadius: 3, background: 'rgba(245,241,232,.25)', overflow: 'hidden' }}>
            <div style={{ height: '100%', background: GOLD, width: `${interpolate(frame, [c.from, c.to], [0, 100], clamp)}%`, opacity: i <= seg ? 1 : 0 }} />
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

/* ---------- Scenes 2–5: bridge, how it works, CTA ---------- */

const Backdrop: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const drift = interpolate(frame, [0, durationInFrames], [-30, 30]);
  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <AbsoluteFill style={{ transform: 'scale(1.3)', filter: 'blur(50px) brightness(.28) saturate(.7)' }}>
        <OffthreadVideo src={staticFile(useReel().src)} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </AbsoluteFill>
      <div style={{
        position: 'absolute', left: `${28 + drift * 0.1}%`, top: '-30%', width: 520, height: 1900,
        transform: 'rotate(24deg)', filter: 'blur(80px)',
        background: 'linear-gradient(to bottom, rgba(226,180,100,.22), rgba(226,180,100,.04) 60%, transparent)',
      }} />
      <div style={{ position: 'absolute', right: -440, bottom: -420 + drift, width: 1100, height: 1100, borderRadius: '50%', border: '2px solid rgba(226,180,100,.22)' }} />
    </AbsoluteFill>
  );
};

const Bridge: React.FC = () => (
  <AbsoluteFill>
    <h1 style={{
      position: 'absolute', top: 700, left: 88, right: 150, margin: 0, textAlign: 'left',
      fontFamily: serif, fontWeight: 700, fontSize: 112, lineHeight: 1.02, letterSpacing: '-.035em', color: INK,
    }}>
      <Rich text={useReel().bridge} start={2} stagger={3} />
    </h1>
  </AbsoluteFill>
);

/** Characters of `text` visible at `frame` when typing starts at `start`. */
const typed = (text: string, frame: number, start: number, cps = 1.6) =>
  text.slice(0, Math.max(0, Math.floor((frame - start) * cps)));

const Cursor: React.FC = () => {
  const frame = useCurrentFrame();
  return <span style={{ display: 'inline-block', width: 16, height: 34, marginLeft: 4, verticalAlign: -6, background: GOLD, opacity: Math.floor(frame / 8) % 2 ? 0 : 1 }} />;
};

const Window: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 10, fps, config: SPRING });
  return (
    <div style={{
      position: 'absolute', top: 760, left: 70, right: 70, height: 640, borderRadius: 26, overflow: 'hidden',
      background: 'rgba(18,16,13,.94)', border: '1px solid rgba(226,180,100,.4)', boxShadow: '0 60px 140px -30px #000',
      opacity: s, transform: `translateY(${(1 - s) * 80}px) scale(${0.94 + s * 0.06})`,
    }}>
      <div style={{ height: 64, display: 'flex', alignItems: 'center', gap: 12, padding: '0 26px', borderBottom: '1px solid rgba(245,241,232,.08)' }}>
        {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <span key={c} style={{ width: 16, height: 16, borderRadius: 8, background: c, opacity: 0.85 }} />)}
        <span style={{ marginLeft: 18, fontFamily: mono, fontSize: 22, color: 'rgba(245,241,232,.5)' }}>{title}</span>
      </div>
      <div style={{ padding: '30px 34px', fontFamily: mono, fontSize: 29, lineHeight: 1.5, color: INK, whiteSpace: 'pre-wrap' }}>{children}</div>
    </div>
  );
};

const StepHead: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [num, title] = useReel().steps[index];
  const s = spring({ frame, fps, config: SPRING });
  return (
    <>
      <p style={{ position: 'absolute', top: 300, left: 88, margin: 0, opacity: s, fontFamily: mono, fontSize: 26, letterSpacing: '.3em', textTransform: 'uppercase', color: GOLD }}>{num}</p>
      <h1 style={{ position: 'absolute', top: 370, left: 88, right: 150, margin: 0, fontFamily: serif, fontWeight: 700, fontSize: 96, lineHeight: 1.02, letterSpacing: '-.03em', color: INK }}>
        <Rich text={title} start={3} />
      </h1>
    </>
  );
};

const StepPrompt: React.FC = () => {
  const frame = useCurrentFrame();
  const { prompt, mode } = useReel();
  const t = typed(prompt, frame, 26);
  const reply = interpolate(frame, [110, 118], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <StepHead index={0} />
      <Window title="~/reels — claude">
        <span style={{ color: MUTED }}>~/reels $ </span>claude{'\n\n'}
        <span style={{ color: GOLD }}>&gt; </span>{t}{t.length < prompt.length && <Cursor />}{'\n\n'}
        <span style={{ opacity: reply, color: GOLD }}>● </span>
        <span style={{ opacity: reply, color: MUTED }}>{mode === 'build' ? 'On it. Writing Reel.tsx…' : 'First cut ready. Preview it in the Studio.'}</span>
      </Window>
    </AbsoluteFill>
  );
};

// [text, colour] tokens per line of the code shown in step 2 (build mode).
const K = '#C792EA', T = GOLD, S = '#A5D6A7', P = MUTED;
const CODE: [string, string][][] = [
  [['export const ', K], ['Reel', INK], [' = () => (', P]],
  [['  <', P], ['AbsoluteFill', T], ['>', P]],
  [['    <', P], ['Sequence', T], [' durationInFrames', INK], ['={216}>', P]],
  [['      <', P], ['OffthreadVideo', T], [' src', INK], ['={', P], ["'talk.mp4'", S], ['} />', P]],
  [['      <', P], ['Captions', T], [' style', INK], ['=', P], ['"gold"', S], [' />', P]],
  [['    </', P], ['Sequence', T], ['>', P]],
  [['    <', P], ['Sequence', T], [' from', INK], ['={216}>', P]],
  [['      <', P], ['HowItWorks', T], [' steps', INK], ['={3} />', P]],
  [['    </', P], ['Sequence', T], ['>', P]],
  [['  </', P], ['AbsoluteFill', T], ['>', P]],
  [[');', P]],
];

const StepCode: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <StepHead index={1} />
      <Window title="src/Reel.tsx">
        <div style={{ fontSize: 27, lineHeight: 1.55 }}>
          {CODE.map((line, i) => {
            const o = interpolate(frame, [22 + i * 7, 28 + i * 7], [0, 1], clamp);
            return (
              <div key={i} style={{ opacity: o, transform: `translateX(${(1 - o) * -20}px)`, display: 'flex' }}>
                <span style={{ width: 44, color: 'rgba(245,241,232,.25)' }}>{i + 1}</span>
                <span>{line.map(([txt, c], k) => <span key={k} style={{ color: c }}>{txt}</span>)}</span>
              </div>
            );
          })}
        </div>
      </Window>
    </AbsoluteFill>
  );
};

// Plain-word edit requests shown in step 2 (edit mode) — the real edits made to these reels.
const EDITS: [string, string][] = [
  ['Captions in Fraunces, matte gold.', 'Captions restyled'],
  ['Cut her voice at the last pause.', 'Clean ending, no clipped word'],
  ['End with my guide cover.', 'CTA updated'],
];

const StepEdit: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <StepHead index={1} />
      <Window title="~/reels — claude">
        {EDITS.map(([ask, reply], i) => {
          const start = 20 + i * 36;
          const t = typed(ask, frame, start, 1.4);
          const r = interpolate(frame, [start + 26, start + 32], [0, 1], clamp);
          return (
            <div key={i} style={{ marginBottom: 26, opacity: frame >= start ? 1 : 0 }}>
              <span style={{ color: GOLD }}>&gt; </span>{t}{t.length < ask.length && <Cursor />}{'\n'}
              <span style={{ opacity: r, color: '#28C840' }}>✓ </span><span style={{ opacity: r, color: MUTED }}>{reply}</span>
            </div>
          );
        })}
      </Window>
    </AbsoluteFill>
  );
};

const StepRender: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cmd = 'npx remotion render Reel';
  const t = typed(cmd, frame, 20, 1.2);
  const p = interpolate(frame, [48, 100], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const bar = 22;
  const filled = Math.round(p * bar);
  const doneO = interpolate(frame, [102, 108], [0, 1], clamp);
  const phone = spring({ frame: frame - 104, fps, config: { damping: 15, stiffness: 120 } });
  return (
    <AbsoluteFill>
      <StepHead index={2} />
      <Window title="~/reels — zsh">
        <span style={{ color: MUTED }}>~/reels $ </span>{t}{t.length < cmd.length && <Cursor />}{'\n\n'}
        {frame > 46 && (
          <>
            <span style={{ color: GOLD }}>{'█'.repeat(filled)}</span>
            <span style={{ color: 'rgba(245,241,232,.2)' }}>{'░'.repeat(bar - filled)}</span>
            {'  '}{Math.round(p * 100)}%{'\n'}
            <span style={{ color: MUTED }}>Rendered {Math.round(p * CLAUDE_REEL_FRAMES)}/{CLAUDE_REEL_FRAMES} frames</span>{'\n\n'}
          </>
        )}
        <span style={{ opacity: doneO, color: '#28C840' }}>✓ </span>
        <span style={{ opacity: doneO }}>out/Reel.mp4</span>
      </Window>
      {/* The finished reel pops out as a phone preview */}
      <div style={{
        position: 'absolute', top: 980, right: 130, width: 300, height: 533, borderRadius: 38, overflow: 'hidden',
        border: `6px solid ${GOLD}`, boxShadow: '0 40px 100px -20px #000',
        opacity: phone, transform: `translateY(${(1 - phone) * 200}px) rotate(${(1 - phone) * 12 + 4}deg)`,
      }}>
        <Sequence from={104} layout="none">
          <div style={{ width: 1080, height: 1920, transform: 'scale(0.2778)', transformOrigin: 'top left' }}><Talk muted /></div>
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};

const Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pill = spring({ frame: frame - 34, fps, config: { damping: 14, stiffness: 140 } });
  const sub = interpolate(frame, [50, 62], [0, 1], clamp);
  const book = spring({ frame: frame - 14, fps, config: { damping: 16, stiffness: 110 } });
  return (
    <AbsoluteFill>
      <p style={{ position: 'absolute', top: 300, left: 88, margin: 0, fontFamily: mono, fontSize: 26, letterSpacing: '.3em', textTransform: 'uppercase', color: GOLD }}>Claude × Remotion</p>
      <h1 style={{ position: 'absolute', top: 370, left: 88, right: 150, margin: 0, fontFamily: serif, fontWeight: 700, fontSize: 118, lineHeight: 1, letterSpacing: '-.035em', color: INK }}>
        <Rich text={useReel().ctaTitle} start={2} stagger={3} />
      </h1>
      <Img src={staticFile('ebook/cover.png')} style={{
        position: 'absolute', top: 640, left: 88, width: 380, borderRadius: 10, border: '1px solid rgba(226,180,100,.45)',
        boxShadow: '0 50px 120px -20px #000', opacity: book, transform: `translateY(${(1 - book) * 120}px) rotate(${-4 + (1 - book) * -8}deg)`,
      }} />
      <div style={{ position: 'absolute', top: 1250, left: 88, opacity: pill, transform: `scale(${0.6 + pill * 0.4})`, transformOrigin: 'left center' }}>
        <span style={{ display: 'inline-block', background: GOLD, color: BG, borderRadius: 999, padding: '26px 46px', fontFamily: sans, fontWeight: 600, fontSize: 42 }}>
          Guide → link in bio
        </span>
      </div>
      <p style={{ position: 'absolute', top: 1390, left: 88, right: 150, margin: 0, opacity: sub, fontFamily: sans, fontSize: 36, lineHeight: 1.4, color: MUTED }}>
        Follow <span style={{ color: INK, fontWeight: 600 }}>@ilens.co</span> for more AI video workflows.
      </p>
    </AbsoluteFill>
  );
};

/** Short fade between scenes. */
const Scene: React.FC<{ children: React.ReactNode; length: number }> = ({ children, length }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 8, length - 8, length], [0, 1, 1, 0], clamp);
  return <AbsoluteFill style={{ opacity: o }}>{children}</AbsoluteFill>;
};

export const ClaudeReel: React.FC<ClaudeReelProps> = (props) => {
  const scenes: [React.FC, number][] = [
    [Bridge, BRIDGE], [StepPrompt, STEP], [props.mode === 'build' ? StepCode : StepEdit, STEP], [StepRender, STEP], [Cta, CTA],
  ];
  let from = 0;
  return (
    <Ctx.Provider value={props}>
      <AbsoluteFill style={{ backgroundColor: BG }}>
        <Sequence durationInFrames={TALK}><Talk /></Sequence>
        <Sequence from={TALK} durationInFrames={CLAUDE_REEL_FRAMES - TALK}>
          <Backdrop />
          {scenes.map(([C, len], i) => {
            const at = from;
            from += len;
            const last = i === scenes.length - 1;
            return <Sequence key={i} from={at} durationInFrames={len}><Scene length={last ? len + 8 : len}><C /></Scene></Sequence>;
          })}
        </Sequence>
      </AbsoluteFill>
    </Ctx.Provider>
  );
};

/* ---------- Cover (still) ---------- */

export type ClaudeReelCoverProps = { image: string; title: string; accent: string };

/**
 * Her at the laptop (first second of the clip) + the guide + buy / follow invitation.
 * Title, face and guide sit inside the 3:4 profile-grid crop; the solid top band hides the burned-in caption.
 */
export const ClaudeReelCover: React.FC<ClaudeReelCoverProps> = ({ image, title, accent }) => (
  <AbsoluteFill style={{ backgroundColor: BG }}>
    <Img src={staticFile(image)} style={{ position: 'absolute', left: 0, top: -120, width: 1080, height: 1920, filter: 'saturate(.9) contrast(1.04)' }} />
    <AbsoluteFill style={{ background: 'linear-gradient(to bottom, #0B0A08 0%, #0B0A08 17%, rgba(11,10,8,.85) 22%, rgba(11,10,8,.45) 27%, rgba(11,10,8,.12) 33%, transparent 38%, transparent 80%, rgba(11,10,8,.7) 88%, #0B0A08 97%)' }} />
    <div style={{
      position: 'absolute', left: -200, top: -300, width: 900, height: 900, borderRadius: '50%', filter: 'blur(90px)',
      background: 'radial-gradient(circle, rgba(226,180,100,.2), transparent 70%)',
    }} />
    <div style={{ position: 'absolute', top: 232, left: 88, display: 'flex', alignItems: 'center', gap: 14, fontFamily: mono, fontSize: 24, letterSpacing: '.3em', textTransform: 'uppercase', color: GOLD }}>
      <span style={{ width: 44, height: 2, background: GOLD }} />Claude Code × Remotion
    </div>
    <h1 style={{ position: 'absolute', top: 282, left: 84, right: 80, margin: 0, fontFamily: serif, fontWeight: 700, fontSize: 104, lineHeight: 0.98, letterSpacing: '-.04em', color: INK }}>
      {title}<br /><span style={{ fontStyle: 'italic', fontWeight: 400, color: MATTE }}>{accent}</span>
    </h1>
    <Img src={staticFile('ebook/cover.png')} style={{
      position: 'absolute', top: 1060, left: 56, width: 290, borderRadius: 8, border: '1px solid rgba(226,180,100,.55)',
      boxShadow: '0 40px 90px -10px rgba(0,0,0,.85)', transform: 'rotate(-6deg)',
    }} />
    <div style={{ position: 'absolute', top: 1650, left: 88, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 18 }}>
      <span style={{ background: GOLD, color: BG, borderRadius: 999, padding: '20px 36px', fontFamily: sans, fontWeight: 600, fontSize: 36 }}>
        Get the guide → link in bio
      </span>
      <span style={{
        borderRadius: 999, padding: '16px 32px', background: 'rgba(11,10,8,.6)', border: '1px solid rgba(226,180,100,.55)',
        fontFamily: sans, fontWeight: 600, fontSize: 32, color: INK,
      }}>
        Follow <span style={{ color: MATTE }}>@ilens.co</span> for more
      </span>
    </div>
  </AbsoluteFill>
);
