import { motion } from "framer-motion";
import { products, type Product } from "../data/products";
import SectionHead from "./SectionHead";

const spanClass: Record<Product["span"], string> = {
  4: "md:col-span-6 lg:col-span-4",
  6: "md:col-span-6",
  8: "md:col-span-12 lg:col-span-8",
};

function Cover({ p, large }: { p: Product; large?: boolean }) {
  return (
    <div
      className={`relative grid aspect-[16/10] place-items-center overflow-hidden rounded-xl ${
        p.featured ? "bg-accent/[0.07]" : "bg-ivory/[0.03]"
      } ${large ? "md:aspect-auto md:h-full md:min-h-[380px]" : ""}`}
    >
      <div
        className="absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(circle at 50% 60%, var(--glow), transparent 65%)" }}
        aria-hidden="true"
      />
      <div className={`absolute inset-0 flex items-center justify-center ${large ? "py-[7%] md:py-[12%]" : "py-[7%]"}`}>
        <img
          src={p.cover}
          alt={`${p.title} cover`}
          width={320}
          height={460}
          loading="lazy"
          decoding="async"
          className="h-full w-auto rounded-[3px] shadow-[0_24px_40px_-16px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-1.5deg]"
        />
      </div>
    </div>
  );
}

function Card({ p }: { p: Product }) {
  const soon = p.status === "soon";
  const large = p.span === 8;
  // Reveal (GSAP) and hover lift (Framer) sit on separate elements so their transforms don't fight.
  return (
    <div data-reveal className={spanClass[p.span]}>
    <motion.a
      href={p.href}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`group glass flex h-full flex-col rounded-card p-3 ${
        p.featured ? "!border-accent/50 shadow-[0_0_60px_-20px_var(--glow)]" : ""
      } ${large ? "md:grid md:grid-cols-2 md:gap-3" : ""}`}
    >
      <Cover p={p} large={large} />
      <div className={`flex flex-1 flex-col p-4 ${large ? "md:justify-center md:p-8" : ""}`}>
        <div className="flex items-center justify-between gap-3">
          <span className={`font-mono text-[11px] uppercase tracking-[0.25em] ${soon ? "text-ivory/40" : "text-accent"}`}>
            {p.featured ? "Bundle · Best value" : soon ? "Coming soon" : "Guide · PDF"}
          </span>
          {p.price && (
            <span className="font-mono text-[13px]">
              {p.compareAt && <s className="mr-2 text-ivory/40">{p.compareAt}</s>}
              <span className="text-ivory">{p.price}</span>
            </span>
          )}
        </div>
        <h3 className={`mt-3 font-medium ${large ? "font-display text-h1" : "text-[20px]"}`}>{p.title}</h3>
        <p className="text-muted mt-2 text-[15px]">{p.blurb}</p>
        <span
          className={`mt-6 inline-flex items-center gap-2 text-[14px] font-medium ${
            large ? "btn btn-accent self-start" : soon ? "text-ivory/60" : "text-accent"
          } md:mt-auto md:pt-6`}
        >
          {soon ? "Get notified" : large ? "Get the bundle" : "Get the guide"}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </motion.a>
    </div>
  );
}

export default function Shop() {
  return (
    <section id="shop" className="py-section">
      <div className="container-x">
        <SectionHead
          eyebrow="The Shop"
          title={
            <>
              Guides and tools to create, <span className="serif-i text-accent">launch and sell.</span>
            </>
          }
        />
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-12">
          {products.map((p) => (
            <Card key={p.id} p={p} />
          ))}
        </div>
        <p data-reveal className="mt-8 text-center font-mono text-[12px] uppercase tracking-[0.2em] text-ivory/45">
          One-time payment · VAT included · Instant PDF download
        </p>
      </div>
    </section>
  );
}
