import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const certifications = ["AV-TEST", "MITRE ATT&CK", "AV-Comparatives", "IDC MarketScape"];

export default function AwardsMarquee() {
  return (
    <section className="border-y border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500 font-medium mb-6 md:mb-8 text-center">
          Plataformas reconocidas por
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-x-12">
          {certifications.map((cert, idx) => (
            <motion.span
              key={cert}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, ease: EASE, delay: idx * 0.1 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-zinc-300 dark:text-zinc-700 transition-colors duration-300 hover:text-zinc-900 dark:hover:text-zinc-200 cursor-default select-none"
            >
              {cert}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
