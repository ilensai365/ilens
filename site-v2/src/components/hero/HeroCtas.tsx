import { motion } from "framer-motion";
import { BUNDLE_URL } from "../../data/site";

export default function HeroCtas({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <motion.a href={BUNDLE_URL} className="btn btn-accent" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        Get the bundle — €120 <span aria-hidden="true">→</span>
      </motion.a>
      <motion.a href="#shop" className="btn btn-ghost" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        Browse the shop
      </motion.a>
    </div>
  );
}
