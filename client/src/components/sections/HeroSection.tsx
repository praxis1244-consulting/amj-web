import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const LottieShield = lazy(() => import("@/components/media/LottieShield"));

function useCountUp(target: number, duration: number, inView: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) { setValue(0); return; }
    const start = performance.now();
    let rafId = 0;
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, target, duration]);
  return value;
}

const stats = [
  { target: 5361, label: "Amenazas detectadas", suffix: "+" },
  { target: 1761, label: "Endpoints protegidos", suffix: "+" },
  { target: 25, label: "Años de experiencia", suffix: "+" },
];

function HeroStats({ mobile }: { mobile?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={mobile ? "relative z-10" : "relative z-20"}
    >
      <div className={mobile ? "" : "max-w-7xl mx-auto px-4 sm:px-6"}>
        <div className="grid grid-cols-3">
          {stats.map((stat, idx) => (
            <StatItem key={stat.label} stat={stat} inView={inView} delay={idx * 0.1} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function StatItem({ stat, inView, delay }: { stat: typeof stats[number]; inView: boolean; delay: number }) {
  const count = useCountUp(stat.target, stat.target > 100 ? 2200 : 1200, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className="py-5 sm:py-6 flex flex-col items-center gap-1"
    >
      <span className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-zinc-900 dark:text-white tabular-nums">
        {count.toLocaleString("es-CL")}{stat.suffix}
      </span>
      <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500 text-center">
        {stat.label}
      </span>
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <header className="relative bg-white dark:bg-zinc-950 -mt-24 overflow-hidden">
      {/* Depth gradient — light */}
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, #f4f4f5 0%, #ffffff 70%)",
        }}
      />
      {/* Depth gradient — dark */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, #1c1c1f 0%, #09090b 70%)",
        }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 min-h-[100svh] lg:min-h-screen flex items-center pt-24 sm:pt-28 lg:pt-24 pb-12 sm:pb-16 overflow-hidden">
        {/* Gravity field - Desktop */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-[540px] h-[540px] hidden lg:block pointer-events-none text-zinc-900 dark:text-white">
          <Suspense
            fallback={
              <div
                aria-hidden="true"
                className="w-full h-full rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12),transparent_65%)]"
              />
            }
          >
            <LottieShield />
          </Suspense>
        </div>

        <motion.div 
          className="relative z-10 w-full lg:max-w-[55%]"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.1 }
            }
          }}
        >
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="text-[11px] sm:text-xs font-medium tracking-[0.22em] text-zinc-400 dark:text-zinc-500 uppercase mb-6 sm:mb-8"
          >
            Bitdefender Gold Partner · 25+ años protegiendo empresas en Chile
          </motion.p>

          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="text-5xl leading-[1.05] sm:text-6xl lg:text-[5.5rem] tracking-tight sm:leading-[0.94] max-w-2xl text-balance"
          >
            <span className="block text-zinc-900 dark:text-white font-light">
              Tu operación tiene brechas.
            </span>
            <span className="block font-serif italic text-[#25327D] dark:text-amber-400 mt-2">
              Nosotros las cerramos.
            </span>
          </motion.h1>

          {/* Lottie animation — mobile only */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="mt-8 w-56 h-56 mx-auto sm:w-64 sm:h-64 lg:hidden"
          >
            <Suspense
              fallback={
                <div
                  aria-hidden="true"
                  className="w-full h-full rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12),transparent_65%)]"
                />
              }
            >
              <LottieShield />
            </Suspense>
          </motion.div>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="mt-8 sm:mt-10 max-w-[33rem] text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed font-light"
          >
            Evaluamos tu infraestructura, cerramos las brechas que un atacante
            encontraría primero y monitoreamos para que no se abran de nuevo.
            Equipo certificado y local en Chile.
          </motion.p>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="mt-10 sm:mt-12 flex flex-col items-start gap-4"
          >
            <a
              href="#contacto"
              className="inline-flex min-h-[3.5rem] w-full sm:w-auto items-center justify-center sm:justify-start gap-3 bg-gradient-to-r from-[#25327D] to-[#103A8F] text-white dark:from-amber-400 dark:to-amber-500 dark:text-zinc-900 px-6 sm:px-8 py-3.5 sm:py-4 rounded-md text-base sm:text-sm font-medium hover:brightness-110 transition-all"
            >
              Quiero mi diagnóstico gratis
              <ArrowRight className="w-5 h-5 sm:w-4 sm:h-4" />
            </a>

            <p className="text-xs text-zinc-400 dark:text-zinc-500 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-sm bg-emerald-400" />
              Sin costo · Sin compromiso · Respuesta en 1 día hábil
            </p>
          </motion.div>

          {/* Stat strip — mobile: in flow */}
          <div className="lg:hidden mt-10">
            <HeroStats mobile />
          </div>
        </motion.div>
      </div>

      {/* Stat strip — desktop: absolute bottom */}
      <div className="hidden lg:block">
        <HeroStats />
      </div>

      {/* Bottom fade to blend into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-[#09090b] to-transparent pointer-events-none z-0" />
    </header>
  );
}
