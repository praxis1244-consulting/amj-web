import { motion } from "framer-motion";
import { Award, ArrowRight } from "lucide-react";
import { Link } from "wouter";

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
      {/* Section heading */}
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

      {/* ── Hacknoid Partner ── */}
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

      <AnimatedDivider />

      {/* ── SPEVI Case Teaser ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-10% 0px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center"
      >
        <div className="lg:col-span-7">
          <span className="text-[11px] uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500 font-medium block mb-6">
            Caso de Éxito
          </span>

          <blockquote className="text-xl md:text-2xl lg:text-3xl font-serif italic leading-[1.2] tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
            &ldquo;No vamos a tener más incidentes.&rdquo;
          </blockquote>

          <div className="flex items-center gap-4">
            <img
              src="/logos/francisco-villegas.jpg"
              alt="Francisco Villegas"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-sm text-zinc-400 dark:text-zinc-500">
              Francisco Villegas · SPEVI
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-start lg:justify-end">
          <Link
            href="/casos"
            className="group inline-flex items-center gap-3 text-base font-medium text-zinc-900 dark:text-zinc-100 hover:text-[#25327D] dark:hover:text-amber-400 transition-colors"
          >
            <span className="underline decoration-1 underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 group-hover:decoration-[#25327D] dark:group-hover:decoration-amber-400 transition-colors">
              Ver caso completo
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
