import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { prefersReducedMotion } from "../lib/motion";

const KEY = "ilens-loaded";

function shouldShow() {
  if (prefersReducedMotion()) return false;
  try {
    return !sessionStorage.getItem(KEY);
  } catch {
    return true;
  }
}

/** Short monogram shimmer on the first visit of a session; skipped afterwards. */
export default function Loader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(shouldShow);

  useEffect(() => {
    if (!visible) {
      onDone();
      return;
    }
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* storage unavailable — loader just shows again next time */
      }
      setVisible(false);
      onDone();
    }, 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[90] grid place-items-center bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          aria-hidden="true"
        >
          <span
            className="animate-shimmer bg-clip-text font-display text-7xl italic text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(100deg, rgba(245,241,232,0.25) 30%, rgb(var(--accent)) 50%, rgba(245,241,232,0.25) 70%)",
              backgroundSize: "200% 100%",
            }}
          >
            iL
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
