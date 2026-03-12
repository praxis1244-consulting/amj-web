import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const brands = ["Protección Endpoint", "Seguridad Cloud", "Defensa Avanzada"];

export default function LogoMarquee() {
  return (
    <section className="border-y border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500 font-medium mb-6 md:mb-8 text-center">
          Trabajamos con marcas de renombre mundial
        </p>
        <div className="flex items-center justify-center gap-6 md:gap-16">
          {brands.map((brand, idx) => (
            <motion.span
              key={brand}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, ease: EASE, delay: idx * 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-zinc-300 dark:text-zinc-700 transition-colors duration-300 hover:text-zinc-900 dark:hover:text-zinc-200 cursor-default select-none"
            >
              {brand}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
