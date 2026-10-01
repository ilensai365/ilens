import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
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

/**
 * CourseLesson: 16:9 lesson video for iLens Academy. One lesson = a list of scenes (title, statement, funnel,
 * points, compare, numbers, task, outro), each with its own narration file and burned-in captions.
 * Lesson text lives in ./lessons/<slug>.json, scene audio lengths in ./lessons/<slug>.audio.json
 * (written by tools/course-voice.mjs). Scene length follows the narration, so swapping in a pro voice re-times the video.
 */

const { fontFamily: serif } = loadFraunces();
const { fontFamily: sans } = loadInter();
const { fontFamily: mono } = loadMono();

// Dark = black + gold. Light = cream + deep gold (the brand gold #E2B464 is too pale for text on cream).
const THEMES = {
  dark: {
    bg: '#0B0A08', ink: '#F5F1E8', gold: '#E2B464', muted: 'rgba(245,241,232,.72)', faint: 'rgba(245,241,232,.5)',
    line: 'rgba(245,241,232,.12)', card: 'rgba(245,241,232,.04)', goldSoft: 'rgba(226,180,100,.12)', goldLine: 'rgba(226,180,100,.35)',
    rgb: '226,180,100', onGold: '#0B0A08', onGoldMuted: 'rgba(11,10,8,.7)', strike: 'rgba(245,241,232,.3)',
    capBg: 'rgba(11,10,8,.72)', capShadow: '0 2px 10px rgba(0,0,0,.5)', glow: 'rgba(226,180,100,.2)', ring: 'rgba(226,180,100,.18)',
  },
  light: {
    bg: '#F4EFE4', ink: '#16130E', gold: '#9A7128', muted: 'rgba(22,19,14,.7)', faint: 'rgba(22,19,14,.5)',
    line: 'rgba(22,19,14,.1)', card: 'rgba(255,255,255,.6)', goldSoft: 'rgba(154,113,40,.1)', goldLine: 'rgba(154,113,40,.38)',
    rgb: '154,113,40', onGold: '#F4EFE4', onGoldMuted: 'rgba(244,239,228,.8)', strike: 'rgba(22,19,14,.3)',
    capBg: 'rgba(255,255,255,.82)', capShadow: 'none', glow: 'rgba(226,180,100,.45)', ring: 'rgba(154,113,40,.25)',
  },
};
type Theme = typeof THEMES.dark;
const ThemeCtx = React.createContext<Theme>(THEMES.dark);
const useC = () => React.useContext(ThemeCtx);
const FPS = 30;
const PAD_IN = 12; // frames of silence before the voice starts
const PAD_OUT = 18; // frames after it ends, before the next scene
const X = 150; // side margin
const SPRING = { damping: 200, mass: 0.6, stiffness: 120 } as const;

type Item = { label: string; note?: string };
export type Scene = {
  type: 'title' | 'statement' | 'funnel' | 'points' | 'compare' | 'numbers' | 'task' | 'outro';
  say: string;
  eyebrow?: string;
  title?: string;
  sub?: string;
  text?: string;
  points?: string[];
  stages?: Item[];
  rows?: { value: string; label: string }[];
  left?: { title: string; items: string[] };
  right?: { title: string; items: string[] };
};
export type LessonLang = { course: string; module: string; scenes: Scene[] };
export type AudioTrack = ({ src: string; seconds: number } | null)[];
export type CourseLessonProps = { lesson: LessonLang; audio: AudioTrack; cover?: boolean; light?: boolean };

/** Voice length in frames, or a reading-speed estimate while a scene has no audio yet. */
const sceneFrames = (scene: Scene, a: AudioTrack[number]) =>
  PAD_IN + Math.ceil((a ? a.seconds : scene.say.length / 14) * FPS) + PAD_OUT;
export const lessonDuration = ({ lesson, audio }: CourseLessonProps) =>
  lesson.scenes.reduce((sum, s, i) => sum + sceneFrames(s, audio[i]), 0);

const useIn = (delay = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: SPRING });
};

/** "Plain *gold italic* plain" with words rising in one by one. */
const Rich: React.FC<{ text: string; start?: number; stagger?: number }> = ({ text, start = 0, stagger = 2.4 }) => {
  const C = useC();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
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
              display: 'inline-block', opacity: s, transform: `translateY(${(1 - s) * 36}px)`,
              ...(gold ? { color: C.gold, fontStyle: 'italic', fontWeight: 400 } : {}),
            }}>{w}</span>
          );
        });
      })}
    </>
  );
};

const Eyebrow: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const C = useC();
  const s = useIn(delay);
  return (
    <p style={{
      fontFamily: mono, fontSize: 24, letterSpacing: '.34em', textTransform: 'uppercase', color: C.gold,
      margin: '0 0 34px', opacity: s, transform: `translateX(${(1 - s) * -24}px)`,
    }}>{children}</p>
  );
};

const H: React.FC<{ text: string; size?: number; start?: number }> = ({ text, size = 84, start = 4 }) => {
  const C = useC();
  return (
  <h1 style={{ fontFamily: serif, fontWeight: 500, fontSize: size, lineHeight: 1.08, letterSpacing: '-.02em', color: C.ink, margin: 0 }}>
    <Rich text={text} start={start} />
  </h1>
  );
};

/** Content area between the top bar and the caption strip. */
const Stage: React.FC<{ children: React.ReactNode; center?: boolean }> = ({ children, center }) => (
  <div style={{
    position: 'absolute', top: 170, bottom: 190, left: X, right: X, display: 'flex', flexDirection: 'column',
    justifyContent: 'center', alignItems: center ? 'center' : 'stretch', textAlign: center ? 'center' : 'left',
  }}>{children}</div>
);

// ─── Scene layouts ─────────────────────────────────────────────────────────────

const Title: React.FC<{ s: Scene }> = ({ s }) => {
  const C = useC();
  const line = useIn(22);
  return (
    <Stage>
      <Eyebrow>{s.eyebrow}</Eyebrow>
      <H text={s.title!} size={118} />
      <div style={{ width: 160 * line, height: 3, background: C.gold, margin: '52px 0 34px' }} />
      <p style={{ fontFamily: sans, fontSize: 36, color: C.muted, margin: 0, opacity: line }}>{s.sub}</p>
    </Stage>
  );
};

const Statement: React.FC<{ s: Scene }> = ({ s }) => (
  <Stage center>
    <Eyebrow>{s.eyebrow}</Eyebrow>
    <H text={s.text!} size={96} />
  </Stage>
);

const Funnel: React.FC<{ s: Scene; len: number }> = ({ s, len }) => {
  const C = useC();
  const frame = useCurrentFrame();
  const n = s.stages!.length;
  // Stages light up one after another across the narration, roughly when the voice names them.
  const at = (i: number) => PAD_IN + ((len - PAD_IN - PAD_OUT) * (0.12 + i * 0.17));
  return (
    <Stage>
      <Eyebrow>{s.eyebrow}</Eyebrow>
      <H text={s.title!} size={64} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginTop: 50 }}>
        {s.stages!.map((st, i) => {
          const on = interpolate(frame, [at(i), at(i) + 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
          const w = 1360 - i * 190;
          return (
            <div key={i} style={{
              width: w, height: 84, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0 40px', boxSizing: 'border-box', opacity: 0.25 + on * 0.75, transform: `scale(${0.96 + on * 0.04})`,
              background: i === n - 1 ? `rgba(${C.rgb},${0.08 + on * 0.9})` : `rgba(${C.rgb},${0.04 + on * 0.1})`,
              border: `1.5px solid ${C.goldLine}`,
            }}>
              <span style={{ fontFamily: mono, fontSize: 22, color: i === n - 1 && on > 0.5 ? C.onGold : C.gold }}>0{i + 1}</span>
              <span style={{ fontFamily: serif, fontSize: 42, fontWeight: 500, color: i === n - 1 && on > 0.5 ? C.onGold : C.ink }}>{st.label}</span>
              <span style={{ fontFamily: sans, fontSize: 22, color: i === n - 1 && on > 0.5 ? C.onGoldMuted : C.faint, minWidth: 60, textAlign: 'right' }}>
                {w > 900 ? st.note : ''}
              </span>
            </div>
          );
        })}
      </div>
    </Stage>
  );
};

const Points: React.FC<{ s: Scene; len: number; numbered?: boolean }> = ({ s, len, numbered }) => {
  const C = useC();
  const frame = useCurrentFrame();
  const pts = s.points!;
  const at = (i: number) => PAD_IN + 20 + ((len - PAD_IN - PAD_OUT - 40) * (i + 0.6)) / (pts.length + 0.6);
  return (
    <Stage>
      <div style={{ display: 'flex', gap: 110, alignItems: 'center' }}>
        <div style={{ width: 560, flexShrink: 0 }}>
          <Eyebrow>{s.eyebrow}</Eyebrow>
          <H text={s.title!} size={s.title!.length > 14 ? 88 : 116} />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 26 }}>
          {pts.map((p, i) => {
            const on = interpolate(frame, [at(i), at(i) + 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 30, padding: '30px 36px', borderRadius: 16,
                background: C.card, border: `1px solid ${C.line}`, opacity: on, transform: `translateX(${(1 - on) * 60}px)`,
              }}>
                <span style={{
                  width: 58, height: 58, borderRadius: '50%', border: `1.5px solid ${C.goldLine}`, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, fontSize: 22, color: C.gold,
                }}>{numbered ? i + 1 : '✓'}</span>
                <span style={{ fontFamily: sans, fontSize: 38, fontWeight: 500, color: C.ink, lineHeight: 1.25 }}>{p}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Stage>
  );
};

const Compare: React.FC<{ s: Scene; len: number }> = ({ s, len }) => {
  const C = useC();
  const frame = useCurrentFrame();
  const right = interpolate(frame, [len * 0.42, len * 0.42 + 16], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const col = (c: { title: string; items: string[] }, good: boolean, on: number) => (
    <div style={{
      flex: 1, padding: '48px 52px', borderRadius: 20, opacity: good ? on : 1, transform: `translateY(${(1 - on) * 30}px)`,
      background: good ? C.goldSoft : C.card, border: `1.5px solid ${good ? C.goldLine : C.line}`,
    }}>
      <p style={{ fontFamily: mono, fontSize: 22, letterSpacing: '.28em', textTransform: 'uppercase', color: good ? C.gold : C.faint, margin: '0 0 30px' }}>{c.title}</p>
      {c.items.map((it, i) => (
        <p key={i} style={{ fontFamily: sans, fontSize: 36, color: good ? C.ink : C.faint, margin: '0 0 24px', display: 'flex', gap: 22 }}>
          <span style={{ color: good ? C.gold : C.strike }}>{good ? '→' : '×'}</span>
          <span style={good ? {} : { textDecoration: 'line-through', textDecorationColor: C.strike }}>{it}</span>
        </p>
      ))}
    </div>
  );
  return (
    <Stage>
      <Eyebrow>{s.eyebrow}</Eyebrow>
      <div style={{ display: 'flex', gap: 44 }}>
        {col(s.left!, false, 1)}
        {col(s.right!, true, right)}
      </div>
    </Stage>
  );
};

const Numbers: React.FC<{ s: Scene; len: number }> = ({ s, len }) => {
  const C = useC();
  const frame = useCurrentFrame();
  const rows = s.rows!;
  const at = (i: number) => PAD_IN + (len - PAD_IN - PAD_OUT) * (0.28 + i * 0.13);
  return (
    <Stage>
      <Eyebrow>{s.eyebrow}</Eyebrow>
      <H text={s.title!} size={70} />
      <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, marginTop: 64 }}>
        {rows.map((r, i) => {
          const on = interpolate(frame, [at(i), at(i) + 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
          const shown = Math.round(Number(r.value) * on);
          return (
            <React.Fragment key={i}>
              {i > 0 && <div style={{ width: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.goldLine, fontSize: 40, opacity: on }}>›</div>}
              <div style={{
                flex: 1, padding: '40px 20px', borderRadius: 18, textAlign: 'center', opacity: 0.2 + on * 0.8,
                background: i === rows.length - 1 ? C.goldSoft : C.card, border: `1px solid ${i === rows.length - 1 ? C.goldLine : C.line}`,
              }}>
                <div style={{ fontFamily: serif, fontSize: 104, fontWeight: 500, color: i === rows.length - 1 ? C.gold : C.ink, lineHeight: 1 }}>{shown}</div>
                <div style={{ fontFamily: sans, fontSize: 26, color: C.muted, marginTop: 18 }}>{r.label}</div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </Stage>
  );
};

const Task: React.FC<{ s: Scene; len: number }> = ({ s, len }) => {
  const C = useC();
  return (
  <div style={{ position: 'absolute', inset: 0 }}>
    <div style={{
      position: 'absolute', top: 150, bottom: 180, left: X - 40, right: X - 40, borderRadius: 28,
      border: `1.5px solid ${C.goldLine}`, background: `linear-gradient(135deg, ${C.goldSoft}, transparent)`,
    }} />
    <Points s={s} len={len} numbered />
  </div>
  );
};

const Outro: React.FC<{ s: Scene; course: string }> = ({ s, course }) => {
  const C = useC();
  const line = useIn(24);
  return (
    <Stage center>
      <Eyebrow>{s.eyebrow}</Eyebrow>
      <H text={s.title!} size={104} />
      <p style={{ fontFamily: sans, fontSize: 36, color: C.muted, margin: '40px 0 0', opacity: line }}>{s.sub}</p>
      <p style={{ fontFamily: serif, fontSize: 34, color: C.faint, margin: '90px 0 0', opacity: line }}>
        {course} · <span style={{ color: C.gold, fontStyle: 'italic' }}>ilens.co</span>
      </p>
    </Stage>
  );
};

// ─── Chrome: background, top bar, captions ────────────────────────────────────

const Background: React.FC = () => {
  const C = useC();
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 240) * 40;
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <div style={{
        position: 'absolute', left: `${62 + drift * 0.05}%`, top: '-40%', width: 520, height: 1800, transform: 'rotate(28deg)',
        filter: 'blur(90px)', background: `linear-gradient(to bottom, ${C.glow}, transparent 70%)`,
      }} />
      <div style={{ position: 'absolute', right: -380, bottom: -520 + drift, width: 1000, height: 1000, borderRadius: '50%', border: `2px solid ${C.ring}` }} />
    </AbsoluteFill>
  );
};

const TopBar: React.FC<{ course: string; module: string }> = ({ course, module }) => {
  const C = useC();
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <div style={{ position: 'absolute', top: 64, left: X, right: X }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontFamily: serif, fontSize: 34, fontWeight: 500, color: C.ink }}>
          {course.split(' ')[0]} <span style={{ color: C.gold, fontStyle: 'italic', fontWeight: 400 }}>{course.split(' ').slice(1).join(' ')}</span>
        </span>
        <span style={{ fontFamily: mono, fontSize: 20, letterSpacing: '.3em', textTransform: 'uppercase', color: C.faint }}>{module}</span>
      </div>
      <div style={{ marginTop: 20, height: 2, background: C.line }}>
        <div style={{ height: 2, width: `${(frame / durationInFrames) * 100}%`, background: C.gold }} />
      </div>
    </div>
  );
};

/** Narration split into sentences; each is shown for a share of the voice time proportional to its length. */
const Captions: React.FC<{ say: string; voiceFrames: number }> = ({ say, voiceFrames }) => {
  const C = useC();
  const frame = useCurrentFrame() - PAD_IN;
  const parts = say.match(/[^.!?]+[.!?]+/g)?.map((p) => p.trim()) ?? [say];
  const total = parts.reduce((a, p) => a + p.length, 0);
  let acc = 0;
  const idx = Math.max(0, parts.findIndex((p) => (acc += p.length) / total * voiceFrames > frame));
  const current = frame < 0 ? '' : frame > voiceFrames ? '' : parts[idx === -1 ? parts.length - 1 : idx];
  return (
    <div style={{ position: 'absolute', left: X, right: X, bottom: 70, display: 'flex', justifyContent: 'center' }}>
      {current && (
        <p style={{
          fontFamily: sans, fontSize: 34, lineHeight: 1.35, fontWeight: 500, color: C.ink, textAlign: 'center', margin: 0,
          padding: '14px 28px', borderRadius: 12, background: C.capBg, maxWidth: 1400,
          textShadow: C.capShadow,
        }}>{current}</p>
      )}
    </div>
  );
};

const SceneFade: React.FC<{ len: number; children: React.ReactNode }> = ({ len, children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 8, len - 8, len], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

const SceneView: React.FC<{ scene: Scene; len: number; course: string }> = ({ scene, len, course }) => {
  switch (scene.type) {
    case 'title': return <Title s={scene} />;
    case 'statement': return <Statement s={scene} />;
    case 'funnel': return <Funnel s={scene} len={len} />;
    case 'points': return <Points s={scene} len={len} />;
    case 'compare': return <Compare s={scene} len={len} />;
    case 'numbers': return <Numbers s={scene} len={len} />;
    case 'task': return <Task s={scene} len={len} />;
    case 'outro': return <Outro s={scene} course={course} />;
  }
};

export const CourseLesson: React.FC<CourseLessonProps> = ({ light, ...props }) => (
  <ThemeCtx.Provider value={light ? THEMES.light : THEMES.dark}><LessonBody {...props} /></ThemeCtx.Provider>
);

const LessonBody: React.FC<CourseLessonProps> = ({ lesson, audio, cover }) => {
  const C = useC();
  if (cover) return <LessonCover lesson={lesson} />;
  let from = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Background />
      {lesson.scenes.map((scene, i) => {
        const len = sceneFrames(scene, audio[i]);
        const start = from;
        from += len;
        const voice = len - PAD_IN - PAD_OUT;
        return (
          <Sequence key={i} from={start} durationInFrames={len} name={`${i + 1} · ${scene.type}`}>
            <SceneFade len={len}><SceneView scene={scene} len={len} course={lesson.course} /></SceneFade>
            {audio[i] && <Sequence from={PAD_IN}><Audio src={staticFile(audio[i]!.src)} /></Sequence>}
            <Captions say={scene.say} voiceFrames={voice} />
          </Sequence>
        );
      })}
      <TopBar course={lesson.course} module={lesson.module} />
    </AbsoluteFill>
  );
};

/** Thumbnail for the course platform: the title scene, fully built, no captions. */
const LessonCover: React.FC<{ lesson: LessonLang }> = ({ lesson }) => {
  const C = useC();
  return (
  <AbsoluteFill style={{ backgroundColor: C.bg }}>
    <Background />
    <Sequence from={-90}><Title s={lesson.scenes[0]} /></Sequence>
    <TopBar course={lesson.course} module={lesson.module} />
  </AbsoluteFill>
  );
};
