import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isDesktop = () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;

/** Fade/slide in every [data-reveal] element as it scrolls into view. */
export function initReveals(root: HTMLElement) {
  if (prefersReducedMotion()) return () => {};
  const ctx = gsap.context(() => {
    ScrollTrigger.batch("[data-reveal]", {
      start: "top 88%",
      once: true,
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, overwrite: true },
        ),
    });
  }, root);
  return () => ctx.revert();
}
