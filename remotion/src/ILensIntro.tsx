import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from 'remotion';
import { loadFont as loadFraunces } from '@remotion/google-fonts/Fraunces';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';

/**
 * iLens — brand motion intro.
 * 1080x1920 · 30fps · 5s (150 frames)
 * Registered as composition "ILensIntro" in ./Root.tsx
 */

const { fontFamily: serifFont } = loadFraunces();
const { fontFamily: sansFont } = loadInter();

const BG = '#050505';
const INK = '#F5F1EA';
const GOLD = '#C9A45C';
const GOLD_SOFT = 'rgba(201, 164, 92, 0.28)';
const GOLD_FAINT = 'rgba(201, 164, 92, 0.08)';

const APPLE_SPRING = { damping: 200, mass: 0.6, stiffness: 120 } as const;

/** Smooth 0→1→0 fade for the tail end of a sequence. */
const holdThenFadeOut = (
  frame: number,
  durationInFrames: number,
  fadeInFrames: number,
  fadeOutFrames: number
) =>
  interpolate(
    frame,
    [
      0,
      fadeInFrames,
      durationInFrames - fadeOutFrames,
      durationInFrames,
    ],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

/* ------------------------------------------------------------------ */
/*  Background — deep black, faint grid, animated golden glow          */
/* ------------------------------------------------------------------ */

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Slow, almost imperceptible glow breathing across the whole spot.
  const pulse = interpolate(
    Math.sin((frame / fps) * 0.6),
    [-1, 1],
    [0.75, 1]
  );

  const drift = interpolate(frame, [0, durationInFrames], [-40, 40], {
    easing: Easing.inOut(Easing.ease),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      {/* Golden glow, off-center like a soft studio light */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(60% 45% at ${50 + drift * 0.05}% 32%, rgba(201,164,92,${
            0.16 * pulse
          }) 0%, rgba(201,164,92,0) 65%)`,
        }}
      />

      {/* Fine editorial grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(245,241,234,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(245,241,234,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '90px 90px',
          transform: `translateY(${drift * 0.15}px)`,
          maskImage:
            'radial-gradient(85% 70% at 50% 40%, black 40%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(85% 70% at 50% 40%, black 40%, transparent 100%)',
        }}
      />

      {/* Vignette for depth */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(120% 90% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* Faint grain-like top sheen */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${GOLD_FAINT} 0%, transparent 30%)`,
        }}
      />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/*  Scene 1 — Intro: "iLens" emerging from blur + tag line             */
/* ------------------------------------------------------------------ */

const SceneIntro: React.FC<{
  durationInFrames: number;
  tagDelay?: number;
  fadeInFrames?: number;
  fadeOutFrames?: number;
}> = ({ durationInFrames, tagDelay = 20, fadeInFrames = 6, fadeOutFrames = 14 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const reveal = spring({ frame, fps, config: APPLE_SPRING });
  const scale = interpolate(reveal, [0, 1], [0.86, 1]);
  const blurPx = interpolate(reveal, [0, 1], [20, 0], {
    extrapolateRight: 'clamp',
  });
  const wordmarkOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const tagReveal = spring({
    frame: frame - tagDelay,
    fps,
    config: APPLE_SPRING,
  });
  const tagOpacity = interpolate(tagReveal, [0, 1], [0, 1]);
  const tagY = interpolate(tagReveal, [0, 1], [14, 0]);

  const sceneOpacity = holdThenFadeOut(frame, durationInFrames, fadeInFrames, fadeOutFrames);

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        opacity: sceneOpacity,
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontFamily: serifFont,
            fontWeight: 500,
            fontSize: 168,
            color: INK,
            letterSpacing: '-0.01em',
            opacity: wordmarkOpacity,
            filter: `blur(${blurPx}px)`,
            transform: `scale(${scale})`,
            transformOrigin: 'center',
          }}
        >
          iLens
        </div>

        <div
          style={{
            marginTop: 34,
            fontFamily: sansFont,
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
            color: GOLD,
            opacity: tagOpacity,
            transform: `translateY(${tagY}px)`,
          }}
        >
          AI &amp; Creative Strategy
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/*  Scene 2 — Kinetic typography lines with gold underline             */
/* ------------------------------------------------------------------ */

const KineticLine: React.FC<{
  text: string;
  startFrame: number;
  align?: 'left' | 'center';
}> = ({ text, startFrame, align = 'center' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;

  const enter = spring({ frame: local, fps, config: APPLE_SPRING });
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const y = interpolate(enter, [0, 1], [46, 0]);

  const underline = spring({
    frame: local - 8,
    fps,
    config: { damping: 200, mass: 0.4, stiffness: 140 },
  });
  const underlineScale = interpolate(underline, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          fontFamily: serifFont,
          fontWeight: 500,
          fontSize: 108,
          lineHeight: 1.04,
          color: INK,
          letterSpacing: '-0.01em',
        }}
      >
        {text}
      </div>
      <div
        style={{
          marginTop: 18,
          height: 4,
          width: 220,
          background: `linear-gradient(90deg, ${GOLD}, rgba(201,164,92,0))`,
          transform: `scaleX(${underlineScale})`,
          transformOrigin: align === 'center' ? 'center' : 'left',
        }}
      />
    </div>
  );
};

const SceneKinetic: React.FC<{
  durationInFrames: number;
  stagger?: number;
  fadeInFrames?: number;
  fadeOutFrames?: number;
}> = ({ durationInFrames, stagger = 12, fadeInFrames = 4, fadeOutFrames = 16 }) => {
  const frame = useCurrentFrame();
  const sceneOpacity = holdThenFadeOut(frame, durationInFrames, fadeInFrames, fadeOutFrames);

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        opacity: sceneOpacity,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
        <KineticLine text="AI," startFrame={0} />
        <KineticLine text="Creativity," startFrame={stagger} />
        <KineticLine text="& Strategy." startFrame={stagger * 2} />
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/*  Scene 3 — Outro / Packshot                                         */
/* ------------------------------------------------------------------ */

const SceneOutro: React.FC<{
  durationInFrames: number;
  lineDelay?: number;
  taglineDelay?: number;
}> = ({ durationInFrames, lineDelay = 10, taglineDelay = 22 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mark = spring({ frame, fps, config: APPLE_SPRING });
  const markScale = interpolate(mark, [0, 1], [0.9, 1]);
  const markOpacity = interpolate(frame, [0, 16], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const lineGrow = spring({
    frame: frame - lineDelay,
    fps,
    config: APPLE_SPRING,
  });
  const lineScale = interpolate(lineGrow, [0, 1], [0, 1]);

  const tagline = spring({
    frame: frame - taglineDelay,
    fps,
    config: APPLE_SPRING,
  });
  const taglineOpacity = interpolate(tagline, [0, 1], [0, 1]);
  const taglineY = interpolate(tagline, [0, 1], [16, 0]);

  const sceneOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        opacity: sceneOpacity,
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontFamily: serifFont,
            fontWeight: 500,
            fontSize: 128,
            color: INK,
            letterSpacing: '-0.01em',
            opacity: markOpacity,
            transform: `scale(${markScale})`,
          }}
        >
          iLens<span style={{ color: GOLD }}>.</span>
        </div>

        <div
          style={{
            margin: '28px auto 0',
            height: 2,
            width: 140,
            background: GOLD,
            opacity: 0.85,
            transform: `scaleX(${lineScale})`,
            transformOrigin: 'center',
          }}
        />

        <div
          style={{
            marginTop: 30,
            fontFamily: sansFont,
            fontWeight: 400,
            fontStyle: 'italic',
            fontSize: 30,
            color: 'rgba(245,241,234,0.82)',
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
          }}
        >
          Designed to Move Ideas Forward.
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/*  Root component                                                     */
/* ------------------------------------------------------------------ */

export const ILensIntro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <Background />

      {/* Scene 1 — Intro (0–55) */}
      <Sequence from={0} durationInFrames={55}>
        <SceneIntro durationInFrames={55} />
      </Sequence>

      {/* Scene 2 — Kinetic typography (45–110), 10f crossfade with Scene 1 */}
      <Sequence from={45} durationInFrames={65}>
        <SceneKinetic durationInFrames={65} />
      </Sequence>

      {/* Scene 3 — Outro / packshot (100–150), 10f crossfade with Scene 2 */}
      <Sequence from={100} durationInFrames={50}>
        <SceneOutro durationInFrames={50} />
      </Sequence>
    </AbsoluteFill>
  );
};

export default ILensIntro;

/* ------------------------------------------------------------------ */
/*  TikTok variant — same 1080x1920 canvas, snappier 4s cut            */
/*  (shorter intro hook: 30f instead of 55f, tighter stagger/fades     */
/*  throughout so the payoff lands before a fast-scrolling viewer      */
/*  swipes past). Registered as composition "ILensIntroTikTok".        */
/* ------------------------------------------------------------------ */

export const ILensIntroTikTok: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <Background />

      {/* Scene 1 — Intro (0–30) */}
      <Sequence from={0} durationInFrames={30}>
        <SceneIntro
          durationInFrames={30}
          tagDelay={10}
          fadeInFrames={4}
          fadeOutFrames={8}
        />
      </Sequence>

      {/* Scene 2 — Kinetic typography (24–94), 6f crossfade with Scene 1 */}
      <Sequence from={24} durationInFrames={70}>
        <SceneKinetic
          durationInFrames={70}
          stagger={8}
          fadeInFrames={4}
          fadeOutFrames={10}
        />
      </Sequence>

      {/* Scene 3 — Outro / packshot (88–120), 6f crossfade with Scene 2 */}
      <Sequence from={88} durationInFrames={32}>
        <SceneOutro durationInFrames={32} lineDelay={6} taglineDelay={14} />
      </Sequence>
    </AbsoluteFill>
  );
};
