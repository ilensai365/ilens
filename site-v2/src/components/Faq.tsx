import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faq } from "../data/site";
import SectionHead from "./SectionHead";

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const id = useId();
  return (
    <div
      data-reveal
      className={`border-b border-l-2 hairline transition-colors duration-300 ${open ? "!border-l-accent" : "border-l-transparent"}`}
    >
      <h3>
        <button
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 py-6 pl-5 text-left text-[18px] font-medium"
        >
          {q}
          <span
            className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border hairline text-accent transition-transform duration-300 ${
              open ? "rotate-45" : ""
            }`}
            aria-hidden="true"
          >
            +
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="text-muted max-w-2xl pb-6 pl-5 pr-12">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-t hairline py-section">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHead
            eyebrow="FAQ"
            title={
              <>
                Good <span className="serif-i text-accent">questions.</span>
              </>
            }
          />
        </div>
        <div className="border-t hairline lg:col-span-7 lg:col-start-6">
          {faq.map((f, i) => (
            <Item key={f.q} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
