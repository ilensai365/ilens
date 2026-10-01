import React from 'react';
import { AbsoluteFill, Easing, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont as loadFraunces } from '@remotion/google-fonts/Fraunces';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadMono } from '@remotion/google-fonts/JetBrainsMono';

/**
 * ChatGPTAdsReel: ~25s promo for the "Your Business in ChatGPT" guide, in the ClaudeReel motion language.
 * Hook (word pops) → chat demo (answer vs. sponsored ad) → Ads Manager → "earn the answer" checklist
 * → the iLens shop: the guide zooms out of the grid and a cursor clicks "Add to cart" → buy CTA.
 * Two themes (dark / light). Facts follow OpenAI's Help Center (Oct 2026). Generic chat UI, no OpenAI branding.
 */

const { fontFamily: serif } = loadFraunces();
const { fontFamily: sans } = loadInter('normal', { weights: ['400', '500', '600', '700'] });
const { fontFamily: mono } = loadMono();

type Theme = {
  bg: string; ink: string; gold: string; fill: string; onFill: string; muted: string; faint: string;
  /** ink at alpha */ a: (x: number) => string;
  /** accent at alpha */ g: (x: number) => string;
  surface: string; shadow: string;
};
const DARK: Theme = {
  bg: '#0B0A08', ink: '#F5F1E8', gold: '#E2B464', fill: '#E2B464', onFill: '#0B0A08',
  muted: 'rgba(245,241,232,.72)', faint: 'rgba(245,241,232,.4)',
  a: (x) => `rgba(245,241,232,${x})`, g: (x) => `rgba(226,180,100,${x})`,
  surface: 'rgba(18,16,13,.95)', shadow: '#000',
};
const LIGHT: Theme = {
  bg: '#F3EEE4', ink: '#16140F', gold: '#A57C3A', fill: '#E2B464', onFill: '#16140F',
  muted: 'rgba(22,20,15,.66)', faint: 'rgba(22,20,15,.4)',
  a: (x) => `rgba(22,20,15,${x})`, g: (x) => `rgba(165,124,58,${x})`,
  surface: 'rgba(255,253,249,.97)', shadow: 'rgba(70,52,22,.4)',
};
const Th = React.createContext<Theme>(DARK);
const useT = () => React.useContext(Th);

const SPRING = { damping: 200, mass: 0.6, stiffness: 120 } as const;
const POP = { damping: 12, stiffness: 220, mass: 0.5 } as const;
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const GREEN = '#28C840';

const PRICE = '€39';
const COVER = 'shop/product-chatgpt-visibility.jpg';

export const HOOK = 96, CHAT = 180, ADS = 135, EARN = 120, SHOP = 255;
export const CHATGPT_REEL_FRAMES = HOOK + CHAT + ADS + EARN + SHOP;
const SCENES = [HOOK, CHAT, ADS, EARN, SHOP];

/* ---------- shared ---------- */

const Backdrop: React.FC = () => {
  const t = useT();
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, CHATGPT_REEL_FRAMES], [-30, 30]);
  return (
    <AbsoluteFill style={{ backgroundColor: t.bg }}>
      <AbsoluteFill style={{ backgroundImage: `radial-gradient(${t.a(0.07)} 2px, transparent 2px)`, backgroundSize: '56px 56px', backgroundPosition: `0 ${-frame * 0.5}px` }} />
      <div style={{
        position: 'absolute', left: `${28 + drift * 0.1}%`, top: '-30%', width: 520, height: 1900, transform: 'rotate(24deg)', filter: 'blur(80px)',
        background: `linear-gradient(to bottom, ${t.g(0.26)}, ${t.g(0.04)} 60%, transparent)`,
      }} />
      <div style={{ position: 'absolute', right: -440, bottom: -420 + drift, width: 1100, height: 1100, borderRadius: '50%', border: `2px solid ${t.g(0.25)}` }} />
    </AbsoluteFill>
  );
};

/** Top bar: one progress tick per scene and a pulsing tag. */
const Chrome: React.FC = () => {
  const t = useT();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tag = spring({ frame: frame - 4, fps, config: SPRING });
  let acc = 0;
  return (
    <>
      <div style={{ position: 'absolute', top: 252, left: 88, right: 150, display: 'flex', gap: 8 }}>
        {SCENES.map((len, i) => {
          const from = acc;
          acc += len;
          return (
            <div key={i} style={{ flex: 1, height: 5, borderRadius: 3, background: t.a(0.18), overflow: 'hidden' }}>
              <div style={{ height: '100%', background: t.fill, width: `${interpolate(frame, [from, from + len], [0, 100], clamp)}%` }} />
            </div>
          );
        })}
      </div>
      <div style={{
        position: 'absolute', top: 278, left: 88, opacity: tag, transform: `translateY(${(1 - tag) * -24}px)`,
        display: 'flex', alignItems: 'center', gap: 14, padding: '14px 26px', borderRadius: 999,
        background: t.surface, border: `1px solid ${t.g(0.55)}`,
        fontFamily: mono, fontSize: 24, letterSpacing: '.22em', textTransform: 'uppercase', color: t.gold,
      }}>
        <span style={{ width: 12, height: 12, borderRadius: 6, background: t.fill, opacity: 0.5 + 0.5 * Math.sin(frame / 5) }} />
        New ebook · only on ilens.co
      </div>
    </>
  );
};

/** Pop-in words (ClaudeReel caption style); *word* = accent italic. */
const Pop: React.FC<{ text: string; start?: number; per?: number; size: number }> = ({ text, start = 0, per = 4, size }) => {
  const t = useT();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(/(\*[^*]+\*)/).filter(Boolean).flatMap((part) => {
    const gold = part.startsWith('*');
    return part.replace(/\*/g, '').split(/\s+/).filter(Boolean).map((w) => ({ w, gold }));
  });
  return (
    <>
      {words.map(({ w, gold }, i) => {
        const at = start + i * per;
        const s = spring({ frame: frame - at, fps, config: POP });
        const active = frame >= at && frame < at + per + 5;
        return (
          <span key={i} style={{
            display: 'inline-block', marginRight: size * 0.22, opacity: Math.min(1, s * 1.5),
            transform: `translateY(${(1 - s) * 34}px) scale(${0.7 + s * 0.3 + (active ? 0.05 : 0)})`, transformOrigin: 'left bottom',
            color: gold ? t.gold : t.ink, ...(gold ? { fontStyle: 'italic', fontWeight: 400 } : {}),
          }}>{w}</span>
        );
      })}
    </>
  );
};

const Head: React.FC<{ num: string; title: string }> = ({ num, title }) => {
  const t = useT();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: SPRING });
  return (
    <>
      <p style={{ position: 'absolute', top: 366, left: 88, margin: 0, opacity: s, fontFamily: mono, fontSize: 26, letterSpacing: '.3em', textTransform: 'uppercase', color: t.gold }}>{num}</p>
      <h1 style={{ position: 'absolute', top: 418, left: 88, right: 150, margin: 0, fontFamily: serif, fontWeight: 700, fontSize: 88, lineHeight: 1.02, letterSpacing: '-.03em' }}>
        <Pop text={title} start={3} per={3} size={88} />
      </h1>
    </>
  );
};

const Window: React.FC<{ title: string; top?: number; height: number; children: React.ReactNode; delay?: number }> = ({ title, top = 640, height, children, delay = 10 }) => {
  const t = useT();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: SPRING });
  return (
    <div style={{
      position: 'absolute', top, left: 70, right: 70, height, borderRadius: 26, overflow: 'hidden',
      background: t.surface, border: `1px solid ${t.g(0.4)}`, boxShadow: `0 60px 140px -30px ${t.shadow}`,
      opacity: s, transform: `translateY(${(1 - s) * 80}px) scale(${0.94 + s * 0.06})`,
    }}>
      <div style={{ height: 62, display: 'flex', alignItems: 'center', gap: 12, padding: '0 26px', borderBottom: `1px solid ${t.a(0.08)}` }}>
        {['#FF5F57', '#FEBC2E', GREEN].map((c) => <span key={c} style={{ width: 15, height: 15, borderRadius: 8, background: c, opacity: 0.85 }} />)}
        <span style={{ marginLeft: 18, fontFamily: mono, fontSize: 22, color: t.faint }}>{title}</span>
      </div>
      <div style={{ position: 'relative', height: height - 62 }}>{children}</div>
    </div>
  );
};

const typed = (text: string, frame: number, start: number, cps = 1.5) => text.slice(0, Math.max(0, Math.floor((frame - start) * cps)));
const Cursor: React.FC = () => {
  const t = useT();
  const frame = useCurrentFrame();
  return <span style={{ display: 'inline-block', width: 12, height: 30, marginLeft: 3, verticalAlign: -5, background: t.gold, opacity: Math.floor(frame / 8) % 2 ? 0 : 1 }} />;
};
const Sponsored: React.FC<{ size?: number }> = ({ size = 18 }) => {
  const t = useT();
  return <span style={{ fontFamily: mono, fontSize: size, letterSpacing: '.2em', textTransform: 'uppercase', color: t.gold, border: `1.5px solid ${t.g(0.6)}`, borderRadius: 999, padding: `${size * 0.3}px ${size * 0.8}px` }}>Sponsored</span>;
};

/* ---------- 1 · Hook ---------- */

const HookCtx = React.createContext('');
const Hook: React.FC = () => {
  const hook = React.useContext(HookCtx);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const chip = spring({ frame: frame - 44, fps, config: { damping: 9, stiffness: 160 } });
  return (
    <AbsoluteFill>
      <h1 style={{ position: 'absolute', top: 560, left: 88, right: 120, margin: 0, fontFamily: serif, fontWeight: 700, fontSize: 116, lineHeight: 1.0, letterSpacing: '-.035em' }}>
        <Pop text={hook} start={6} per={4} size={116} />
      </h1>
      <div style={{ position: 'absolute', top: 1260, left: 88, opacity: chip, transform: `scale(${0.5 + chip * 0.5}) rotate(${(1 - chip) * -12 + Math.sin(frame / 7) * 1.5}deg)`, transformOrigin: 'left center' }}>
        <Sponsored size={30} />
      </div>
    </AbsoluteFill>
  );
};

/* ---------- 2 · Chat demo: answer vs. ad ---------- */

const Chat: React.FC = () => {
  const t = useT();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const q = 'What’s a good guide to sell my first digital product?';
  const tq = typed(q, frame, 22, 2);
  const dots = frame > 52 && frame < 70;
  const ans = interpolate(frame, [70, 80], [0, 1], clamp);
  const pick = spring({ frame: frame - 82, fps, config: POP });
  const glow = 0.4 + 0.3 * Math.sin(frame / 6);
  const ad = spring({ frame: frame - 112, fps, config: { damping: 15, stiffness: 120 } });
  const lbl = interpolate(frame, [135, 145], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <Head num="Fact 01 · Placement" title="Ads sit *below* the answer." />
      <Window title="AI chat" height={820}>
        <div style={{ padding: '30px 32px', fontFamily: sans, fontSize: 30, lineHeight: 1.45 }}>
          <div style={{ marginLeft: 'auto', maxWidth: '86%', width: 'fit-content', background: t.a(0.08), borderRadius: '26px 26px 6px 26px', padding: '16px 24px', color: t.ink, minHeight: 60 }}>
            {tq}{tq.length < q.length && <Cursor />}
          </div>
          {dots && (
            <div style={{ marginTop: 26, display: 'flex', gap: 10 }}>
              {[0, 1, 2].map((d) => <span key={d} style={{ width: 14, height: 14, borderRadius: 7, background: t.muted, opacity: 0.3 + 0.7 * Math.abs(Math.sin((frame - d * 4) / 5)) }} />)}
            </div>
          )}
          <div style={{ opacity: ans, marginTop: 26, color: t.muted, display: 'flex', justifyContent: 'space-between' }}>
            Here’s what people recommend:
            <span style={{ opacity: lbl, fontFamily: mono, fontSize: 22, letterSpacing: '.16em', color: t.gold, textTransform: 'uppercase', alignSelf: 'center' }}>Earned ↓</span>
          </div>
          <div style={{
            marginTop: 18, display: 'flex', alignItems: 'center', gap: 20, padding: '20px 22px', borderRadius: 20,
            background: t.g(0.1), border: `2px solid ${t.g(glow + 0.2)}`, boxShadow: `0 0 ${40 * glow}px ${t.g(glow * 0.5)}`,
            opacity: pick, transform: `scale(${0.85 + pick * 0.15})`, transformOrigin: 'left center',
          }}>
            <span style={{ display: 'grid', placeItems: 'center', width: 46, height: 46, borderRadius: 23, background: t.fill, color: t.onFill, fontWeight: 700, flex: 'none' }}>1</span>
            <span><b style={{ color: t.ink, fontWeight: 600 }}>Your product, here.</b><br /><span style={{ fontSize: 24, color: t.muted }}>Clear promise · real reviews</span></span>
          </div>
          <div style={{ opacity: ans * 0.6, marginTop: 14, display: 'flex', alignItems: 'center', gap: 20, padding: '8px 22px', color: t.faint }}>
            <span style={{ display: 'grid', placeItems: 'center', width: 46, height: 46, borderRadius: 23, border: `2px solid ${t.a(0.25)}`, fontWeight: 600 }}>2</span>Another option
          </div>
          <div style={{ marginTop: 20, height: 1, background: t.a(0.15), opacity: ad }} />
          <div style={{
            marginTop: 20, display: 'flex', alignItems: 'center', gap: 20, padding: 18, borderRadius: 18,
            background: t.a(0.04), border: `1px solid ${t.a(0.16)}`, opacity: ad, transform: `translateY(${(1 - ad) * 90}px)`,
          }}>
            <div style={{ width: 96, height: 96, borderRadius: 14, background: 'linear-gradient(135deg,#3A3226,#1D1A14)', flex: 'none' }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 22, color: t.muted }}>
                <span style={{ width: 18, height: 18, borderRadius: 9, background: t.fill }} />Your brand<span style={{ marginLeft: 'auto' }}><Sponsored /></span>
              </div>
              <div style={{ color: t.ink, fontWeight: 600, marginTop: 6 }}>Sell your first ebook in 30 days</div>
            </div>
          </div>
          <div style={{ marginTop: 16, textAlign: 'right', opacity: lbl, fontFamily: mono, fontSize: 22, letterSpacing: '.16em', color: t.muted, textTransform: 'uppercase' }}>Bought ↑</div>
        </div>
      </Window>
    </AbsoluteFill>
  );
};

/* ---------- 3 · Ads Manager ---------- */

const Ads: React.FC = () => {
  const t = useT();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sw = interpolate(frame, [40, 52], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const bid = interpolate(frame, [56, 90], [0, 3], { ...clamp, easing: Easing.out(Easing.cubic) });
  const live = spring({ frame: frame - 98, fps, config: POP });
  const row = (i: number) => interpolate(frame, [18 + i * 8, 28 + i * 8], [0, 1], clamp);
  const box = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px 0', borderBottom: `1px solid ${t.a(0.08)}` } as const;
  return (
    <AbsoluteFill>
      <Head num="Fact 02 · Access" title="Any business *can buy them.*" />
      <Window title="Ads Manager · beta" height={640}>
        <div style={{ padding: '14px 34px', fontFamily: sans, fontSize: 30, color: t.ink }}>
          <div style={{ ...box, opacity: row(0) }}><span style={{ color: t.muted }}>Campaign</span><b style={{ fontWeight: 600 }}>First test</b></div>
          <div style={{ ...box, opacity: row(1) }}>
            <span style={{ color: t.muted }}>Pay per</span>
            <span style={{ position: 'relative', display: 'flex', background: t.a(0.07), borderRadius: 999, padding: 6 }}>
              <span style={{ position: 'absolute', top: 6, bottom: 6, left: 6 + sw * 150, width: 150, borderRadius: 999, background: t.fill }} />
              {['View', 'Click'].map((x, k) => (
                <span key={x} style={{ position: 'relative', width: 150, textAlign: 'center', padding: '10px 0', fontWeight: 600, color: (k === 1 ? sw : 1 - sw) > 0.5 ? t.onFill : t.muted }}>{x}</span>
              ))}
            </span>
          </div>
          <div style={{ ...box, opacity: row(2) }}><span style={{ color: t.muted }}>Max bid per click</span><b style={{ fontFamily: mono, fontWeight: 500, color: t.gold }}>${bid.toFixed(2)}</b></div>
          <div style={{ ...box, opacity: row(3) }}><span style={{ color: t.muted }}>Matched to</span><span>the conversation’s topic</span></div>
          <div style={{ marginTop: 34, opacity: live, transform: `scale(${0.6 + live * 0.4})`, transformOrigin: 'left center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14, background: GREEN, color: '#0B0A08', fontWeight: 700, borderRadius: 999, padding: '16px 30px' }}>● Live</span>
            <span style={{ marginLeft: 22, color: t.muted, fontSize: 26 }}>Self-serve since May 2026</span>
          </div>
        </div>
      </Window>
    </AbsoluteFill>
  );
};

/* ---------- 4 · Earn the answer ---------- */

const ITEMS = ['A one-sentence promise', 'Price & who it’s for, as text', 'Real reviews', 'A site ChatGPT can read'];

const Earn: React.FC = () => {
  const t = useT();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Head num="Your move" title="Earn the answer *first.*" />
      <div style={{ position: 'absolute', top: 700, left: 88, right: 150 }}>
        {ITEMS.map((it, i) => {
          const s = spring({ frame: frame - 16 - i * 14, fps, config: SPRING });
          const tick = spring({ frame: frame - 26 - i * 14, fps, config: POP });
          return (
            <div key={it} style={{ display: 'flex', alignItems: 'center', gap: 28, padding: '26px 0', borderBottom: `1px solid ${t.a(0.12)}`, opacity: s, transform: `translateX(${(1 - s) * -60}px)` }}>
              <span style={{ display: 'grid', placeItems: 'center', width: 60, height: 60, borderRadius: 30, border: `2px solid ${t.gold}`, background: t.g(tick * 0.9), color: t.onFill, fontSize: 34, fontWeight: 700, transform: `scale(${0.6 + tick * 0.4})` }}>{tick > 0.5 ? '✓' : ''}</span>
              <span style={{ fontFamily: sans, fontSize: 44, color: t.ink }}>{it}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ---------- 5 · Shop → guide → Add to cart → CTA ---------- */

const GRID = [COVER, 'shop/product-claude-remotion.webp', 'shop/product-bundle-build-launch-sell.svg', 'shop/product-ai-content-system.svg', 'shop/product-first-ebook-24h.svg', 'shop/product-site-shop-1h.svg'];
const WIN_TOP = 640, WIN_H = 800, CW = 212, CH = 300, GX = 116, GAP = 36;

const Shop: React.FC = () => {
  const t = useT();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const focus = interpolate(frame, [62, 92], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const details = interpolate(frame, [88, 104], [0, 1], clamp);
  const curT = interpolate(frame, [104, 132], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const press = frame >= 134 && frame < 142;
  const added = frame >= 140;
  const outro = interpolate(frame, [168, 186], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const cta = spring({ frame: frame - 184, fps, config: { damping: 13, stiffness: 140 } });
  const sub = interpolate(frame, [200, 212], [0, 1], clamp);
  const head = spring({ frame, fps, config: SPRING });

  // the new guide moves from grid slot 0 to a big cover on the left
  const fx = interpolate(focus, [0, 1], [GX, 40]);
  const fy = interpolate(focus, [0, 1], [70, 60]);
  const fw = interpolate(focus, [0, 1], [CW, 400]);
  // cursor path (window coords) → "Add to cart"
  const cx = interpolate(curT, [0, 1], [860, 640]);
  const cy = interpolate(curT, [0, 1], [700, 420]);

  return (
    <AbsoluteFill>
      <div style={{ opacity: 1 - outro }}>
        <p style={{ position: 'absolute', top: 366, left: 88, margin: 0, opacity: head, fontFamily: mono, fontSize: 26, letterSpacing: '.3em', textTransform: 'uppercase', color: t.gold }}>The guide · {PRICE}</p>
        <h1 style={{ position: 'absolute', top: 418, left: 88, right: 150, margin: 0, fontFamily: serif, fontWeight: 700, fontSize: 88, lineHeight: 1.02, letterSpacing: '-.03em' }}>
          <Pop text={'Make ChatGPT *recommend you.*'} start={3} per={3} size={88} />
        </h1>
        <Window title="ilens.co / shop" top={WIN_TOP} height={WIN_H} delay={6}>
          {GRID.map((src, i) => {
            const col = i % 3, rowI = Math.floor(i / 3);
            const inS = spring({ frame: frame - 14 - i * 5, fps, config: SPRING });
            if (i === 0) {
              return (
                <div key={src} style={{ position: 'absolute', left: fx, top: fy, width: fw, opacity: inS, transform: `translateY(${(1 - inS) * 60}px)`, zIndex: 2 }}>
                  <Img src={staticFile(src)} style={{ width: '100%', display: 'block', borderRadius: 8, boxShadow: `0 30px 70px -20px ${t.shadow}, 0 0 ${60 * focus}px ${t.g(0.35 * focus)}`, border: `${1 + focus}px solid ${t.g(0.3 + focus * 0.4)}` }} />
                  <div style={{ marginTop: 10, fontFamily: sans, fontSize: 22, color: t.ink, opacity: 1 - focus }}>New · {PRICE}</div>
                </div>
              );
            }
            return (
              <div key={src} style={{
                position: 'absolute', left: GX + col * (CW + GAP), top: 70 + rowI * (CH + 40), width: CW,
                opacity: inS * (1 - focus), transform: `translateY(${(1 - inS) * 60}px) scale(${1 - focus * 0.15})`,
              }}>
                <Img src={staticFile(src)} style={{ width: '100%', height: CH, objectFit: 'cover', display: 'block', borderRadius: 8 }} />
              </div>
            );
          })}
          <div style={{ position: 'absolute', left: 476, right: 30, top: 70, opacity: details, transform: `translateX(${(1 - details) * 40}px)`, fontFamily: sans }}>
            <div style={{ fontFamily: mono, fontSize: 20, letterSpacing: '.24em', textTransform: 'uppercase', color: t.gold }}>New · PDF · 34 pages</div>
            <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 52, lineHeight: 1.02, color: t.ink, marginTop: 16 }}>Your Business in ChatGPT</div>
            <div style={{ fontSize: 64, fontWeight: 700, color: t.ink, marginTop: 22, letterSpacing: '-.02em' }}>{PRICE}</div>
            <div style={{
              marginTop: 24, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 340, height: 92, borderRadius: 999,
              background: added ? GREEN : t.fill, color: '#0B0A08', fontWeight: 700, fontSize: 34, transform: `scale(${press ? 0.93 : 1})`,
              boxShadow: added ? '0 0 50px rgba(40,200,64,.45)' : `0 0 40px ${t.g(0.35)}`,
            }}>{added ? '✓ Added' : 'Add to cart'}</div>
            <div style={{ marginTop: 20, fontSize: 24, color: t.muted }}>Only on ilens.co · instant download</div>
          </div>
          {frame > 100 && (
            <svg width="60" height="60" viewBox="0 0 24 24" style={{ position: 'absolute', left: cx, top: cy, zIndex: 3, filter: 'drop-shadow(0 6px 10px rgba(0,0,0,.5))', transform: `scale(${press ? 0.85 : 1})` }}>
              <path d="M4 2l14 9-6.5 1.4L15 20l-3 1.3-3.4-7.5L4 18z" fill="#F5F1E8" stroke="#0B0A08" strokeWidth="1.2" />
            </svg>
          )}
        </Window>
      </div>

      <div style={{ opacity: outro }}>
        <div style={{ position: 'absolute', top: 352, left: 0, right: 0, textAlign: 'center', fontFamily: mono, fontSize: 28, letterSpacing: '.3em', textTransform: 'uppercase', color: t.gold }}>New ebook</div>
        <div style={{ position: 'absolute', top: 420, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', top: 120, width: 820, height: 820, borderRadius: '50%', background: `radial-gradient(circle, ${t.g(0.32)}, transparent 62%)` }} />
          <Img src={staticFile(COVER)} style={{
            position: 'relative', width: 470, borderRadius: 10, border: `2px solid ${t.g(0.6)}`, boxShadow: `0 60px 120px -20px ${t.shadow}`,
            transform: `rotate(${-5 + Math.sin(frame / 20) * 1.2}deg) translateY(${(1 - outro) * 80 + Math.sin(frame / 14) * 6}px)`,
          }} />
        </div>
        <div style={{ position: 'absolute', top: 1170, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: cta, transform: `scale(${0.6 + cta * 0.4})` }}>
          <span style={{ background: t.fill, color: '#0B0A08', borderRadius: 999, padding: '28px 54px', fontFamily: sans, fontWeight: 700, fontSize: 46, boxShadow: `0 0 60px ${t.g(0.4)}` }}>
            Get the ebook — {PRICE} →
          </span>
        </div>
        <p style={{ position: 'absolute', top: 1310, left: 0, right: 0, margin: 0, textAlign: 'center', opacity: sub, fontFamily: sans, fontSize: 38, color: t.muted }}>
          Only on <span style={{ color: t.ink, fontWeight: 600 }}>ilens.co</span> · link in bio
        </p>
      </div>
    </AbsoluteFill>
  );
};

const Scene: React.FC<{ children: React.ReactNode; length: number }> = ({ children, length }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 8, length - 8, length], [0, 1, 1, 0], clamp);
  return <AbsoluteFill style={{ opacity: o }}>{children}</AbsoluteFill>;
};

export const ChatGPTAdsReel: React.FC<{ light?: boolean; hook?: string }> = ({ light = false, hook = 'Promote your business in ChatGPT *so it recommends you.*' }) => {
  const scenes: [React.FC, number][] = [[Hook, HOOK], [Chat, CHAT], [Ads, ADS], [Earn, EARN], [Shop, SHOP]];
  let from = 0;
  return (
    <HookCtx.Provider value={hook}>
    <Th.Provider value={light ? LIGHT : DARK}>
      <AbsoluteFill style={{ backgroundColor: light ? LIGHT.bg : DARK.bg }}>
        <Backdrop />
        {scenes.map(([C, len], i) => {
          const at = from;
          from += len;
          const last = i === scenes.length - 1;
          return <Sequence key={i} from={at} durationInFrames={len}><Scene length={last ? len + 8 : len}><C /></Scene></Sequence>;
        })}
        <Chrome />
      </AbsoluteFill>
    </Th.Provider>
    </HookCtx.Provider>
  );
};
