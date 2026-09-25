import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav } from "../data/site";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "border-b hairline bg-ink/70 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between">
        <a href="#top" className="font-display text-2xl" aria-label="iLens home">
          iLens
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[14px]">
            {nav.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-muted transition-colors hover:text-ivory">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" className="btn btn-ghost px-5 py-2 text-[14px]">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <button
          className="relative h-10 w-10 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span
            className={`absolute left-2 right-2 h-px bg-ivory transition-transform ${open ? "top-5 rotate-45" : "top-[15px]"}`}
          />
          <span
            className={`absolute left-2 right-2 h-px bg-ivory transition-transform ${open ? "top-5 -rotate-45" : "top-[25px]"}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="container-x flex flex-col gap-1 pb-6">
              {[...nav, { label: "Contact", href: "#contact" }].map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)} className="block py-3 font-display text-2xl">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
