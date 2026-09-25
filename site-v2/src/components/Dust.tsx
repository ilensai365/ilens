import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/motion";

/** Lightweight drifting dust particles on a canvas; static when motion is reduced. */
export default function Dust({ count = 70 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const n = window.innerWidth < 768 ? Math.round(count / 2) : count;
    const ps = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.3 + 0.3,
      vx: (Math.random() - 0.5) * 0.12,
      vy: -(Math.random() * 0.18 + 0.04),
      a: Math.random() * 0.5 + 0.15,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,241,232,${p.a})`;
        ctx.fill();
      }
    };

    let raf = 0;
    let visible = true;
    const tick = () => {
      for (const p of ps) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -4) p.y = h + 4;
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
      }
      draw();
      if (visible) raf = requestAnimationFrame(tick);
    };

    const reduced = prefersReducedMotion();
    if (reduced) draw();
    else raf = requestAnimationFrame(tick);

    // Stop animating while the hero is off-screen.
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !reduced) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(canvas);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />;
}
