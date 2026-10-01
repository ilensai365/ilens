import React from 'react';
import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { loadFont as loadFraunces } from '@remotion/google-fonts/Fraunces';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadMono } from '@remotion/google-fonts/JetBrainsMono';

/**
 * AiShowcase: 10s vertical "Made with AI" clip. A landscape AI-generated video (public/ai/*.mp4) sits in the
 * middle over a blurred copy of itself, with a hook above and "DM us PROMPTS" arriving for the last 3 seconds.
 * The source audio is muted so a TikTok sound can be added on upload.
 */

const { fontFamily: serif } = loadFraunces();
const { fontFamily: sans } = loadInter();
const { fontFamily: mono } = loadMono();

const BG = '#0B0A08';
const INK = '#F5F1E8';
const GOLD = '#E2B464';
const SPRING = { damping: 200, mass: 0.6, stiffness: 120 } as const;

export const AI_SHOWCASE_FRAMES = 300;
export type AiShowcaseProps = { src: string; hook: string; label: string };

/** "Plain *gold italic*" → spans that rise in word by word. */
const Rich: React.FC<{ text: string; start: number }> = ({ text, start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  let i = 0;
  return (
    <>
      {text.split(/(\*[^*]+\*)/).filter(Boolean).map((part, p) => {
        const gold = part.startsWith('*');
        return part.replace(/\*/g, '').split(/(\s+)/).map((w, k) => {
          if (!w.trim()) return ' ';
          const s = spring({ frame: frame - start - i++ * 2.5, fps, config: SPRING });
          return (
            <span key={`${p}-${k}`} style={{
              display: 'inline-block', opacity: s, transform: `translateY(${(1 - s) * 36}px)`,
              ...(gold ? { color: GOLD, fontStyle: 'italic', fontWeight: 400 } : {}),
            }}>{w}</span>
          );
        });
      })}
    </>
  );
};

export const AiShowcase: React.FC<AiShowcaseProps> = ({ src, hook, label }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const video = staticFile(src);
  const zoom = interpolate(frame, [0, durationInFrames], [1, 1.08]);
  const frameIn = spring({ frame: frame - 6, fps, config: SPRING });
  const ctaStart = durationInFrames - 90;
  const cta = spring({ frame: frame - ctaStart, fps, config: { damping: 14, stiffness: 140 } });
  const labelIn = interpolate(frame, [20, 32], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      {/* Blurred, darkened fill so the 16:9 clip reads as a full-screen vertical video */}
      <AbsoluteFill style={{ transform: 'scale(1.6)', filter: 'blur(40px) brightness(.35)' }}>
        <OffthreadVideo src={video} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: 'linear-gradient(to bottom, rgba(11,10,8,.85) 0%, rgba(11,10,8,.2) 40%, rgba(11,10,8,.2) 60%, rgba(11,10,8,.9) 100%)' }} />

      <div style={{ position: 'absolute', top: 170, left: 88, right: 170, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: serif, fontSize: 38, fontWeight: 500, color: INK }}>iLens</span>
        <span style={{ fontFamily: sans, fontSize: 22, letterSpacing: '.32em', textTransform: 'uppercase', color: 'rgba(245,241,232,.6)' }}>Made with AI</span>
      </div>

      <h1 style={{
        position: 'absolute', top: 290, left: 88, right: 170, margin: 0,
        fontFamily: serif, fontWeight: 700, fontSize: 92, lineHeight: 1, letterSpacing: '-.03em', color: INK,
      }}>
        <Rich text={hook} start={2} />
      </h1>

      {/* The AI clip, framed like a screen, with a slow push-in */}
      <div style={{
        position: 'absolute', top: 720, left: 60, right: 60, height: 540, borderRadius: 28, overflow: 'hidden',
        border: '1px solid rgba(226,180,100,.45)', boxShadow: '0 50px 120px -30px #000',
        opacity: frameIn, transform: `translateY(${(1 - frameIn) * 60}px)`,
      }}>
        <OffthreadVideo src={video} muted style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${zoom})` }} />
      </div>

      <p style={{
        position: 'absolute', top: 1300, left: 88, right: 170, margin: 0, opacity: labelIn,
        fontFamily: mono, fontSize: 26, letterSpacing: '.3em', textTransform: 'uppercase', color: GOLD,
      }}>{label}</p>

      <div style={{ position: 'absolute', top: 1370, left: 88, opacity: cta, transform: `scale(${0.6 + cta * 0.4})`, transformOrigin: 'left center' }}>
        <span style={{ display: 'inline-block', background: GOLD, color: BG, borderRadius: 999, padding: '24px 44px', fontFamily: sans, fontWeight: 600, fontSize: 40 }}>
          Want prompts that sell? DM us PROMPTS
        </span>
      </div>
    </AbsoluteFill>
  );
};
