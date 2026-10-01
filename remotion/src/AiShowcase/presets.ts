import type { AiShowcaseProps } from './AiShowcase';

// Source clips are AI-generated (copied from Desktop/iLENS.co ALL FILES into public/ai). *text* = gold italic.
// Hooks say what the clip replaces; they never claim a specific prompt we can't show.
export const aiShowcases: { id: string; props: AiShowcaseProps }[] = [
  { id: 'AiShowcase-Mountain', props: { src: 'ai/mountain.mp4', hook: 'No drone. No flight. *No camera.*', label: 'Drone shot · 100% AI' } },
  { id: 'AiShowcase-CarNeon', props: { src: 'ai/car-neon.mp4', hook: 'This car doesn’t exist. *Neither does the shoot.*', label: 'Car ad · 100% AI' } },
  { id: 'AiShowcase-CarSunset', props: { src: 'ai/car-sunset.mp4', hook: 'A golden-hour car ad *with zero budget.*', label: 'Commercial · 100% AI' } },
  { id: 'AiShowcase-Studio', props: { src: 'ai/studio.mp4', hook: 'Brand footage *without a photoshoot.*', label: 'Brand b-roll · 100% AI' } },
  { id: 'AiShowcase-Mirror', props: { src: 'ai/mirror.mp4', hook: 'Cinematic scenes in *minutes, not days.*', label: 'Film scene · 100% AI' } },
];
