import { motion } from "framer-motion";
import { SHOP_URL } from "../../data/site";

export default function HeroCtas({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <motion.a href={SHOP_URL} className="btn btn-accent" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        Get the bundle — €120 <span aria-hidden="true">→</span>
      </motion.a>
      <motion.a href="#method" className="btn btn-ghost" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        See the method
      </motion.a>
    </div>
  );
}
