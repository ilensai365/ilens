import { motion } from "framer-motion";
import { products } from "../../data/products";
import { SHOP_URL } from "../../data/site";

export default function HeroCtas({ className = "" }: { className?: string }) {
  const lead = products.find((p) => p.spotlight)!;
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <motion.a href={lead.href} className="btn btn-accent" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        Get the guide — {lead.price} <span aria-hidden="true">→</span>
      </motion.a>
      <motion.a href={SHOP_URL} className="btn btn-ghost" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        See all guides
      </motion.a>
    </div>
  );
}
