import { motion } from "framer-motion";
import { Award } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

function AnimatedDivider({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: false, margin: "-10% 0px" }}
      transition={{ duration: 1, delay, ease: EASE }}
      className="h-px bg-zinc-200 dark:bg-zinc-800 origin-left my-20 md:my-32"
    />
  );
}

export default function PartnersSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-32 md:py-48">
      {/* Section heading — editorial, with accent word */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-10% 0px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mb-20 md:mb-32"
      >
        <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500 font-medium mb-6">
          Certificaciones & Alianzas
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-900 dark:text-zinc-100 max-w-3xl">
          Respaldados por{" "}
          <span className="font-serif italic text-[#25327D] dark:text-amber-400">
            alianzas
          </span>{" "}
          que importan
        </h2>
      </motion.div>

      {/* ── Bitdefender Gold ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Left: Typography-driven credential */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="lg:col-span-7"
        >
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-4 h-4 text-amber-500 dark:text-amber-400" strokeWidth={1.5} />
            <span className="text-[11px] uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500 font-medium">
              Certificación Oficial
            </span>
          </div>

          {/* Massive typographic treatment — the hero moment */}
          <h3 className="text-7xl md:text-8xl lg:text-[7rem] font-serif italic tracking-tight leading-[0.85] text-amber-500 dark:text-amber-400 mb-4">
            Gold
          </h3>
          <p className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight mb-8">
            Reseller
            <span className="block text-lg md:text-xl text-zinc-400 dark:text-zinc-500 font-light mt-3">
              Bitdefender en Chile
            </span>
          </p>

          <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed font-light max-w-lg">
            Acceso directo a soporte prioritario, capacitación avanzada y las
            mejores condiciones comerciales para nuestros clientes.
          </p>
        </motion.div>

        {/* Right: Badge — clean, no heavy card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-10% 0px" }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
          className="lg:col-span-5 flex items-center justify-center lg:justify-end"
        >
          <div className="relative p-8 md:p-12">
            <div className="absolute inset-0 border border-amber-400/20 dark:border-amber-400/15 rounded-xl" />
            <img
              src="/logos/bitdefender-gold.png"
              alt="Bitdefender Gold Reseller"
              className="w-44 md:w-56 lg:w-64 h-auto relative"
            />
          </div>
        </motion.div>
      </div>

      <AnimatedDivider />

      {/* ── Testimonial — editorial pull quote ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-10% 0px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20"
      >
        <div className="lg:col-span-8 relative">
          {/* Decorative quotation mark */}
          <span
            className="absolute -top-6 -left-2 md:-top-10 md:-left-4 text-[6rem] md:text-[8rem] font-serif italic leading-none text-zinc-100 dark:text-zinc-900 select-none pointer-events-none"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <blockquote className="relative text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-serif italic leading-[1.2] tracking-tight text-zinc-900 dark:text-zinc-100">
            Gracias al apoyo de AMJ, utilizamos la opción más adecuada para
            nuestra organización con la seguridad de que no vamos a tener más
            incidentes.
          </blockquote>
        </div>

        <div className="lg:col-span-4 flex flex-col justify-end gap-6">
          <div className="flex items-center gap-4">
            <img
              src="/logos/francisco-villegas.jpg"
              alt="Francisco Villegas"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <span className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Francisco Villegas
              </span>
              <span className="block text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                SPEVI · Acústica · Audio · Video
              </span>
            </div>
          </div>
          <img
            src="/logos/spevi.jpeg"
            alt="SPEVI"
            className="w-[100px] h-auto object-contain mix-blend-multiply opacity-50 dark:invert dark:mix-blend-screen dark:opacity-30"
          />
        </div>
      </motion.div>

      <AnimatedDivider />

      {/* ── Hacknoid Partner — minimal editorial ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-10% 0px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center"
      >
        <div className="lg:col-span-7">
          <span className="text-[11px] uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500 font-medium block mb-6">
            Partner Tecnológico
          </span>
          <p className="text-xl md:text-2xl font-light text-zinc-900 dark:text-zinc-100 tracking-tight leading-snug max-w-xl">
            Trabajamos junto a Hacknoid para entregar soluciones integrales de
            ciberseguridad — monitoreo continuo, detección de vulnerabilidades
            y respuesta a incidentes.
          </p>
        </div>

        <div className="lg:col-span-5 flex justify-start lg:justify-end">
          <img
            src="/logos/hacknoid.jpg"
            alt="Hacknoid"
            className="max-h-12 md:max-h-14 w-auto object-contain opacity-50 dark:invert dark:opacity-40"
          />
        </div>
      </motion.div>
    </section>
  );
}
