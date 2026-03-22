import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

function useCountUp(target: number, duration = 2000, inView = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) {
      setValue(0);
      return;
    }

    const start = performance.now();
    let rafId = 0;
    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, target, duration]);

  return value;
}

function formatNumber(n: number) {
  return n.toLocaleString("es-CL");
}

export default function CaseStudySection() {
  return (
    <section id="casos" className="scroll-mt-24 max-w-7xl mx-auto px-6 py-32 md:py-48">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">
            Resultados <span className="font-serif italic text-[#25327D] dark:text-amber-400">Reales</span>
          </h2>
          <p className="text-sm uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium">
            Cifras acumuladas • Operación Chile
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Left: Image (7 cols) */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="w-full aspect-[4/3] sm:aspect-[3/2] overflow-hidden bg-zinc-100 dark:bg-zinc-900"
          >
            <motion.img
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80"
              alt="Centro de operaciones de seguridad"
              className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
            />
          </motion.div>
        </div>

        {/* Right: Text & Metrics (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100 mb-6 leading-tight">
              Protección endpoint a escala con equipo local
            </h3>

            <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed font-light mb-16">
              Más de 15 años evaluando, implementando y operando soluciones de ciberseguridad para empresas chilenas. Estos son los números que respaldan nuestro trabajo.
            </p>

            {/* Metrics / Breakdown */}
            <div className="flex flex-col gap-2 w-full">
              <MetricRow label="Detecciones de malware en clientes AMJ" target={35000} suffix="+" delay={0.3} />
              <MetricRow label="Antivirus instalados" target={11500} suffix="+" delay={0.4} />
              <MetricRow label="Años de experiencia" target={15} suffix="+" delay={0.5} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MetricRow({ label, target, suffix, delay }: { label: string, target: number, suffix: string, delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-10% 0px" });
  const count = useCountUp(target, target > 100 ? 2200 : 1400, inView);

  return (
    <div ref={ref} className="relative py-6">
      {/* Animated Top Border */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, delay, ease: EASE }}
        className="absolute top-0 left-0 right-0 h-[1px] bg-zinc-200 dark:bg-zinc-800 origin-left"
      />

      <div className="flex justify-between items-baseline gap-4">
        <span className="text-sm uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          {label}
        </span>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
          className="text-xl md:text-2xl font-light tracking-tight text-[#25327D] dark:text-amber-400 text-right tabular-nums"
        >
          {formatNumber(count)}{suffix}
        </motion.span>
      </div>
    </div>
  );
}
