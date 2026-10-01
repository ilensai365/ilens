import type { ProductShowcaseProps } from './schema';

/* Demo brands below are fictional — swap in the client's copy and photo. */

export const serumPreset: ProductShowcaseProps = {
  brand: 'LUMA',
  eyebrow: 'Nowość · Serum',
  headline: 'Skóra, która świeci własnym światłem.',
  productName: 'Serum Vitamin C 15%',
  subtitle: 'Rozświetla, wyrównuje koloryt, chroni.',
  features: [
    '15% stabilnej witaminy C',
    'Kwas hialuronowy + niacynamid',
    'Wegańskie · bez zapachu',
  ],
  price: '149 zł',
  oldPrice: '189 zł',
  cta: 'Kup teraz',
  url: 'twojsklep.pl',
  disclaimer: '',
  visual: 'serum',
  image: '',
  font: 'cormorant',
  theme: {
    background: '#F3ECE3',
    ink: '#2B211A',
    muted: '#7C6B5D',
    accent: '#C0662A',
    onAccent: '#FFF7EF',
  },
};

export const jewelryPreset: ProductShowcaseProps = {
  brand: 'AURÉA',
  eyebrow: 'Kolekcja Soleil',
  headline: 'Światło, które nosisz na zawsze.',
  productName: 'Pierścionek Soleil',
  subtitle: 'Złoto 14K · diament 0,30 ct',
  features: [
    'Złoto próby 585',
    'Ręcznie wykonany w Polsce',
    'Grawer i pudełko gratis',
  ],
  price: '2 490 zł',
  oldPrice: '',
  cta: 'Zamów z grawerem',
  url: 'twojsklep.pl',
  disclaimer: '',
  visual: 'jewelry',
  image: '',
  font: 'bodoni',
  theme: {
    background: '#0B0A09',
    ink: '#F5EEE3',
    muted: '#A89A86',
    accent: '#D9B46C',
    onAccent: '#14110D',
  },
};

export const portofinoPreset: ProductShowcaseProps = {
  brand: 'CASA ALBA',
  eyebrow: 'Portofino · Liguria',
  headline: 'Wake up above the bay.',
  productName: 'Sea View Suite',
  subtitle: 'Private terrace · breakfast at sunrise',
  features: [
    'Panoramic terrace over the harbour',
    'Breakfast served on your balcony',
    '5 minutes to the Piazzetta',
  ],
  price: 'from €480 / night',
  oldPrice: '',
  cta: 'Book your stay',
  url: 'yourhotel.com',
  disclaimer: '',
  visual: 'portofino',
  image: '',
  font: 'playfair',
  theme: {
    background: '#0D2736',
    ink: '#FFF6EA',
    muted: '#BFD0D8',
    accent: '#F2B27A',
    onAccent: '#0D2736',
  },
};

/* iGaming demo — for regulated markets only (casino ads are banned in Poland). */
export const casinoPreset: ProductShowcaseProps = {
  brand: 'ACE & AURA',
  eyebrow: 'Welcome offer',
  headline: 'Your table is waiting.',
  productName: '100% up to €500',
  subtitle: '+ 200 free spins on your first deposit',
  features: [
    'Live roulette & blackjack 24/7',
    'Withdrawals in under 24 hours',
    'Licensed operator · secure payments',
  ],
  price: 'Code AURA200',
  oldPrice: '',
  cta: 'Claim bonus',
  url: 'yourcasino.com',
  disclaimer: '18+ · Play responsibly · T&Cs apply',
  visual: 'casino',
  image: '',
  font: 'playfair',
  theme: {
    background: '#0A0710',
    ink: '#FFF6E6',
    muted: '#B9A9C9',
    accent: '#E7C06A',
    onAccent: '#1A1206',
  },
};
