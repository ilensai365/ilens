// window.gtag is defined by public/consent.js (Google tag + Consent Mode); optional so pages work if it's blocked.
interface Window {
  gtag?: (...args: unknown[]) => void;
}
