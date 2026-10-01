import type { ClaudeReelCoverProps, ClaudeReelProps } from './ClaudeReel';

// Source clips: AI talking videos copied from Desktop/iLENS.co ALL FILES/NEW REELS ANGIELSKI into public/claude-reel.
// Caption frames (30fps) follow each clip's burned-in captions / speech pauses; the voice is cut at 216 (7.2s).
const BRIDGE = 'The magic is in your *creative direction.*';

export const claudeReels: { id: string; props: ClaudeReelProps; cover: ClaudeReelCoverProps }[] = [
  {
    id: 'ClaudeReel',
    props: {
      src: 'claude-reel/talk.mp4',
      captions: [
        { from: 0, to: 57, text: 'AI courses & *digital guides*' },
        { from: 57, to: 137, text: 'Turn ideas *into videos*' },
        { from: 137, to: 216, text: '*Claude Code* + *Remotion*' },
      ],
      bridge: BRIDGE,
      mode: 'build',
      prompt: 'Turn talk.mp4 into a 30s vertical reel. Big captions, black & gold, 3 steps, CTA at the end.',
      steps: [
        ['Step 01 · Prompt', 'Tell Claude *what you want.*'],
        ['Step 02 · Code', 'Claude writes *the Remotion code.*'],
        ['Step 03 · Render', 'One command. *One MP4.*'],
      ],
      ctaTitle: 'Want the full\n*workflow?*',
    },
    cover: { image: 'claude-reel/me.jpg', title: 'Reels made', accent: 'with code.' },
  },
  {
    id: 'ClaudeReel-Edit',
    props: {
      src: 'claude-reel/talk2.mp4',
      captions: [
        { from: 0, to: 60, text: 'AI courses & *digital guides*' },
        { from: 60, to: 135, text: 'Turn ideas *into videos*' },
        { from: 135, to: 216, text: '*Claude Code* + *Remotion*' },
      ],
      bridge: BRIDGE,
      mode: 'edit',
      prompt: 'Make a 30s reel from talk.mp4 in my iLens brand style. Captions, 3 steps, CTA.',
      steps: [
        ['Step 01 · Draft', 'Claude builds *the first cut.*'],
        ['Step 02 · Edit', 'Change it *in plain words.*'],
        ['Step 03 · Render', 'One command. *One MP4.*'],
      ],
      ctaTitle: 'Save this for\n*your next reel.*',
    },
    cover: { image: 'claude-reel/me2.jpg', title: 'Edit reels', accent: 'in plain words.' },
  },
];
