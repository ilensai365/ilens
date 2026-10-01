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
 * FollowReel: 12s "follow @ilens.co" invite for Instagram + Facebook.
 * Hook → four value cards with real iLens work → animated profile with a tapped Follow button → CTA.
 * One component, two canvases: 1080×1920 (Reels / Stories, keeps clear of the app's UI) and 1080×1350 (feed post).
 * Media lives in public/follow/.
 */

const { fontFamily: serif } = loadFraunces();
const { fontFamily: sans } = loadInter();
const { fontFamily: mono } = loadMono();

const BG = '#0B0A08';
const INK = '#F5F1E8';
const GOLD = '#E2B464';
const MUTED = 'rgba(245,241,232,.72)';
const SPRING = { damping: 200, mass: 0.6, stiffness: 120 } as const;

export const HOOK = 66, CARD = 38, CARDS = 4, PROFILE = 96, CTA = 72;
const VALUE = CARD * CARDS;
export const FOLLOW_REEL_FRAMES = HOOK + VALUE + PROFILE + CTA;

export type FollowReelProps = { feed?: boolean };

/** Safe block per canvas: Reels hide the top tabs, the caption at the bottom and the icon column on the right. */
const useSafe = (feed?: boolean) =>
  feed ? { top: 150, left: 88, right: 88, bottom: 110 } : { top: 300, left: 88, right: 150, bottom: 380 };

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const drift = interpolate(frame, [0, durationInFrames], [-30, 30], { easing: Easing.inOut(Easing.ease) });
  // A bright sweep across the frame in the first second: the "stop scrolling" flash.
  const sweep = interpolate(frame, [0, 26], [-60, 130], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(245,241,232,.07) 1.4px, transparent 1.4px)', backgroundSize: '36px 36px',
      }} />
      <div style={{
        position: 'absolute', left: `${28 + drift * 0.1}%`, top: '-30%', width: 520, height: 2200,
        transform: 'rotate(24deg)', filter: 'blur(80px)',
        background: 'linear-gradient(to bottom, rgba(226,180,100,.30), rgba(226,180,100,.05) 60%, transparent)',
      }} />
      <div style={{
        position: 'absolute', right: -460, bottom: -460 + drift, width: 1100, height: 1100,
        borderRadius: '50%', border: '2px solid rgba(226,180,100,.26)',
      }} />
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: `${sweep}%`, width: 260, transform: 'skewX(-18deg)',
        background: 'linear-gradient(90deg, transparent, rgba(226,180,100,.22), transparent)', filter: 'blur(20px)',
      }} />
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
        <span style={{ fontFamily: mono, fontSize: 21, letterSpacing: '.34em', textTransform: 'uppercase', color: 'rgba(245,241,232,.55)' }}>@ilens.co</span>
      </div>
      <div style={{ marginTop: 20, height: 3, background: 'rgba(245,241,232,.12)', borderRadius: 2 }}>
        <div style={{ height: 3, width: `${(frame / durationInFrames) * 100}%`, background: GOLD, borderRadius: 2 }} />
      </div>
    </div>
  );
};

const Block: React.FC<{ feed?: boolean; children: React.ReactNode; justify?: React.CSSProperties['justifyContent'] }> = ({ feed, children, justify = 'center' }) => {
  const safe = useSafe(feed);
  return (
    <div style={{ position: 'absolute', top: safe.top, left: safe.left, right: safe.right, bottom: safe.bottom, display: 'flex', flexDirection: 'column', justifyContent: justify }}>
      {children}
    </div>
  );
};

const Eyebrow: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const frame = useCurrentFrame();
  return (
    <p style={{
      fontFamily: mono, fontSize: 28, letterSpacing: '.36em', textTransform: 'uppercase', color: GOLD, margin: 0,
      opacity: interpolate(frame - delay, [0, 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    }}>{children}</p>
  );
};

/** Fade a scene out over its last frames. */
const Out: React.FC<{ len: number; children: React.ReactNode }> = ({ len, children }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [len - 8, len], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return <AbsoluteFill style={{ opacity: o }}>{children}</AbsoluteFill>;
};

// ---------- 1 · Hook ----------
const Hook: React.FC<{ feed?: boolean }> = ({ feed }) => (
  <Out len={HOOK}>
    <Block feed={feed}>
      <Eyebrow>New on Instagram</Eyebrow>
      <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: feed ? 128 : 156, lineHeight: 0.98, letterSpacing: '-.03em', color: INK, margin: '34px 0 0' }}>
        <Rich text={'Create smarter.\n*Sell faster.*'} start={4} stagger={3} />
      </h1>
      <p style={{ fontFamily: sans, fontSize: 38, color: MUTED, margin: '40px 0 0' }}>
        <Rich text="AI, design and content that sells." start={22} stagger={2} />
      </p>
    </Block>
  </Out>
);

// ---------- 2 · Value cards ----------
type Card = { n: string; title: string; media: string; video?: boolean; pos?: string };
// Only the owner's own iLens guides (store-dark images from ilens-ebooks/covers/store-dark).
const CARDS_DATA: Card[] = [
  { n: '01', title: 'Content with AI *that sells.*', media: 'follow/ebook-ai.png', pos: '50% 42%' },
  { n: '02', title: 'Your shop *in 60 minutes.*', media: 'follow/ebook-60.png', pos: '50% 42%' },
  { n: '03', title: 'Your ebook *in 24 hours.*', media: 'follow/ebook-24.png', pos: '50% 42%' },
  { n: '04', title: 'Videos *made with Claude.*', media: 'follow/ebook-cr.png', pos: '50% 42%' },
];

const ValueCard: React.FC<{ card: Card; feed?: boolean; last: boolean }> = ({ card, feed, last }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inS = spring({ frame, fps, config: { damping: 18, mass: 0.7, stiffness: 140 } });
  const outP = last ? 0 : interpolate(frame, [CARD - 7, CARD], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.cubic) });
  const x = (1 - inS) * 700 - outP * 900;
  const rot = (1 - inS) * 8 - outP * 6;
  const mediaH = feed ? 640 : 1010;
  const style: React.CSSProperties = { width: '100%', height: '100%', objectFit: 'cover', objectPosition: card.pos ?? '50% 35%' };
  return (
    <Block feed={feed}>
      <Eyebrow>iLens guides · {card.n}/04</Eyebrow>
      <div style={{ marginTop: 30, transform: `translateX(${x}px) rotate(${rot}deg)`, opacity: Math.min(1, inS * 1.4) * (1 - outP) }}>
        <div style={{
          position: 'relative', height: mediaH, borderRadius: 34, overflow: 'hidden', background: '#000',
          boxShadow: '0 0 0 2px rgba(226,180,100,.35), 0 60px 110px -30px rgba(0,0,0,.95)',
        }}>
          {card.video ? <OffthreadVideo src={staticFile(card.media)} muted style={style} /> : <Img src={staticFile(card.media)} style={style} />}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,10,8,.95) 8%, rgba(11,10,8,.1) 55%, transparent)' }} />
          <div style={{ position: 'absolute', left: 44, right: 44, bottom: 40 }}>
            <div style={{ fontFamily: mono, fontSize: 30, letterSpacing: '.3em', color: GOLD }}>{card.n}</div>
            <div style={{ fontFamily: serif, fontWeight: 700, fontSize: feed ? 78 : 86, lineHeight: 1, letterSpacing: '-.02em', color: INK, marginTop: 14 }}>
              <Rich text={card.title} start={4} stagger={2} />
            </div>
          </div>
        </div>
      </div>
    </Block>
  );
};

// ---------- 3 · Profile with a tapped Follow button ----------
const GRID = ['cover-ClaudeSetup.png', 'cover-Prompts.png', 'cover-DesignThinking.png', 'cover-Ebook.png', 'cover-NoSales.png', 'cover-FirstSale.png'];
const TAP = 52; // frame (inside the scene) where the finger taps Follow

const Profile: React.FC<{ feed?: boolean }> = ({ feed }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inS = spring({ frame, fps, config: SPRING });
  const tapped = frame >= TAP;
  const press = interpolate(frame, [TAP - 4, TAP, TAP + 6], [1, 0.92, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ripple = interpolate(frame, [TAP, TAP + 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  // Finger (a soft gold dot) glides onto the button, taps, lifts away.
  const fx = interpolate(frame, [18, TAP - 2, TAP + 20], [520, 0, 60], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) });
  const fy = interpolate(frame, [18, TAP - 2, TAP + 20], [420, 0, 90], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) });
  const fo = interpolate(frame, [16, 24, TAP + 12, TAP + 22], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tile = feed ? 200 : 290;
  return (
    <Out len={PROFILE}>
      <Block feed={feed}>
        <div style={{
          transform: `translateY(${(1 - inS) * 80}px)`, opacity: inS, borderRadius: 40, padding: feed ? '40px 44px' : '52px 48px',
          background: 'linear-gradient(180deg, rgba(30,27,22,.96), rgba(16,15,12,.98))',
          boxShadow: 'inset 0 0 0 2px rgba(245,241,232,.08), 0 70px 120px -40px rgba(0,0,0,.95), 0 0 160px -60px rgba(226,180,100,.45)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
            <div style={{ width: 150, height: 150, borderRadius: '50%', padding: 6, background: `conic-gradient(${GOLD}, #8A6A35, ${GOLD})`, flex: 'none' }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: BG, display: 'grid', placeItems: 'center', border: `5px solid ${BG}` }}>
                <span style={{ fontFamily: serif, fontSize: 52, fontWeight: 600, color: INK }}>iL</span>
              </div>
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: sans, fontWeight: 600, fontSize: 44, color: INK }}>ilens.co</div>
              <div style={{ fontFamily: sans, fontSize: 30, color: MUTED, marginTop: 6 }}>iLens Creative Studio</div>
            </div>
          </div>
          <p style={{ fontFamily: sans, fontSize: 31, lineHeight: 1.4, color: INK, margin: '30px 0 0' }}>
            AI × Design × Content that sells.<br /><span style={{ color: GOLD }}>Free prompts every week ↓</span>
          </p>
          <div style={{ position: 'relative', marginTop: 32 }}>
            <div style={{
              transform: `scale(${press})`, height: 96, borderRadius: 20, display: 'grid', placeItems: 'center',
              fontFamily: sans, fontWeight: 600, fontSize: 38,
              background: tapped ? 'rgba(245,241,232,.1)' : GOLD, color: tapped ? INK : BG,
              boxShadow: tapped ? 'inset 0 0 0 2px rgba(245,241,232,.2)' : '0 0 50px -6px rgba(226,180,100,.7)',
            }}>
              {tapped ? 'Following ✓' : 'Follow'}
            </div>
            {/* ripple + finger */}
            <div style={{
              position: 'absolute', left: '50%', top: '50%', width: 420, height: 420, marginLeft: -210, marginTop: -210, borderRadius: '50%',
              border: `4px solid ${GOLD}`, opacity: (1 - ripple) * (ripple > 0 ? 0.8 : 0), transform: `scale(${0.2 + ripple})`,
            }} />
            <div style={{
              position: 'absolute', left: '50%', top: '50%', width: 74, height: 74, marginLeft: -37 + fx, marginTop: -37 + fy, borderRadius: '50%',
              background: 'rgba(245,241,232,.85)', boxShadow: '0 0 0 10px rgba(245,241,232,.2)', opacity: fo,
            }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 34 }}>
            {GRID.map((g, i) => {
              const s = spring({ frame: frame - 10 - i * 3, fps, config: SPRING });
              return <Img key={g} src={staticFile(`follow/${g}`)} style={{ width: '100%', height: tile, objectFit: 'cover', borderRadius: 10, opacity: s, transform: `scale(${0.9 + s * 0.1})` }} />;
            })}
          </div>
        </div>
      </Block>
    </Out>
  );
};

// ---------- 4 · CTA ----------
const Cta: React.FC<{ feed?: boolean }> = ({ feed }) => {
  const frame = useCurrentFrame();
  const bob = Math.sin(frame / 5) * 10;
  const glow = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <Block feed={feed}>
      <Eyebrow>Don’t miss the next one</Eyebrow>
      <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: feed ? 150 : 180, lineHeight: 0.95, letterSpacing: '-.03em', color: INK, margin: '34px 0 0' }}>
        <Rich text={'Follow\n*@ilens.co*'} start={2} stagger={4} />
      </h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22, marginTop: 50, opacity: glow }}>
        {/* Instagram-style glyph: rounded square + lens + dot, drawn in gold */}
        <div style={{ position: 'relative', width: 76, height: 76, borderRadius: 22, border: `5px solid ${GOLD}`, flex: 'none', boxShadow: `0 0 ${30 * glow}px rgba(226,180,100,.6)` }}>
          <div style={{ position: 'absolute', left: '50%', top: '50%', width: 30, height: 30, margin: '-15px 0 0 -15px', borderRadius: '50%', border: `5px solid ${GOLD}` }} />
          <div style={{ position: 'absolute', right: 9, top: 9, width: 8, height: 8, borderRadius: '50%', background: GOLD }} />
        </div>
        <span style={{ fontFamily: sans, fontSize: 38, color: MUTED }}>New posts every week</span>
      </div>
      <div style={{ fontFamily: mono, fontSize: 30, letterSpacing: '.3em', textTransform: 'uppercase', color: GOLD, marginTop: 56, transform: `translateY(${bob}px)`, opacity: glow }}>
        Tap follow ↑
      </div>
    </Block>
  );
};

export const FollowReel: React.FC<FollowReelProps> = ({ feed }) => (
  <AbsoluteFill style={{ fontFamily: sans }}>
    <Background />
    <Header feed={feed} />
    <Sequence durationInFrames={HOOK}><Hook feed={feed} /></Sequence>
    {CARDS_DATA.map((c, i) => (
      <Sequence key={c.n} from={HOOK + i * CARD} durationInFrames={CARD + (i === CARDS - 1 ? 8 : 0)}>
        <Out len={CARD + (i === CARDS - 1 ? 8 : 0)}><ValueCard card={c} feed={feed} last={i === CARDS - 1} /></Out>
      </Sequence>
    ))}
    <Sequence from={HOOK + VALUE} durationInFrames={PROFILE}><Profile feed={feed} /></Sequence>
    <Sequence from={HOOK + VALUE + PROFILE} durationInFrames={CTA}><Cta feed={feed} /></Sequence>
  </AbsoluteFill>
);
