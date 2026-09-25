import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BUNDLE, SHOP_URL } from "../data/site";

/** Bundle pill that appears after the hero and hides again near the contact section. */
export default function FloatingCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById("contact");
      const pastHero = window.scrollY > window.innerHeight * 0.9;
      const atContact = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.8 : false;
      setShow(pastHero && !atContact);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={SHOP_URL}
          aria-label={`Go to the shop — Build. Launch. Sell. bundle, ${BUNDLE.price}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
          className="glass fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full py-2 pl-5 pr-2 text-[14px] shadow-2xl"
        >
          <span className="hidden text-ivory/70 sm:inline">All 4 guides · {BUNDLE.price}</span>
          <span className="btn btn-accent px-4 py-2 text-[14px]">Get the bundle →</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
