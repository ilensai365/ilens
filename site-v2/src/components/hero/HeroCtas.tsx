import { motion } from "framer-motion";
import type { Product } from "../../data/products";
import { SHOP_URL } from "../../data/site";

export default function HeroCtas({ p, className = "" }: { p: Product; className?: string }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <motion.a href={p.href} className="btn btn-accent" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        Get the guide — {p.price} <span aria-hidden="true">→</span>
      </motion.a>
      <motion.a href={SHOP_URL} className="btn btn-ghost" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        See all guides
      </motion.a>
    </div>
  );
}
