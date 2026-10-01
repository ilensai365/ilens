import { z } from 'zod';
import { zColor } from '@remotion/zod-types';

/**
 * ProductShowcase — editable props.
 * Every field shows up in Remotion Studio's props panel, so a new client
 * version is just new text, colours and (optionally) a photo.
 */
export const productShowcaseSchema = z.object({
  brand: z.string(),
  eyebrow: z.string(),
  headline: z.string(),
  productName: z.string(),
  subtitle: z.string(),
  features: z.array(z.string()).max(4),
  price: z.string(),
  /** Leave empty to hide the crossed-out price. */
  oldPrice: z.string(),
  cta: z.string(),
  url: z.string(),
  /** Small print pinned to the bottom (18+, T&Cs…). Leave empty to hide. */
  disclaimer: z.string(),
  /** Built-in illustration used when `image` is empty. */
  visual: z.enum(['serum', 'jewelry', 'portofino', 'casino']),
  /** File in remotion/public/ (e.g. "client/serum.jpg") or a full https URL. */
  image: z.string(),
  font: z.enum(['cormorant', 'bodoni', 'playfair']),
  theme: z.object({
    background: zColor(),
    ink: zColor(),
    muted: zColor(),
    accent: zColor(),
    onAccent: zColor(),
  }),
});

export type ProductShowcaseProps = z.infer<typeof productShowcaseSchema>;
