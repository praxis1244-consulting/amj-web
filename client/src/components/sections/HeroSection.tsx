import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import RevealText from "@/components/ui/RevealText";

const rings = [
  { r: 55, delay: 0.4, speed: 20 },
  { r: 95, delay: 0.7, speed: 35 },
  { r: 135, delay: 1.0, speed: 50 },
  { r: 175, delay: 1.3, speed: 70 },
];

function GravityField() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
        <path
          d="M200 10 L390 55 L390 200 Q390 350 200 390 Q10 350 10 200 L10 55 Z"
          stroke="currentColor"
          strokeWidth="0.75"
          opacity="0.06"
        />
        {rings.map((ring, i) => (
          <circle
            key={i}
            cx="200"
            cy="200"
            r={ring.r}
            stroke="currentColor"
            strokeWidth="1"
            opacity={0.25 - i * 0.05}
          />
        ))}
        {/* Center radar dot */}
        <circle cx="200" cy="200" r="4" fill="currentColor" opacity="0.9" />

        {/* Cloud-lock — top-right near shield vertex */}
        <g transform="translate(365, 30)" opacity="0.55">
          <path
            d="M-16,10 C-16,4 -14,-1 -10,-3 C-9,-9 -5,-13 0,-13 C5,-13 9,-9 10,-3 C14,-1 16,4 16,10 Z"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="currentColor"
            fillOpacity="0.03"
            strokeLinejoin="round"
          />
          <path
            d="M-4,4 V1 C-4,-3 4,-3 4,1 V4"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
          <rect x="-5" y="4" width="10" height="7" rx="1.5"
            stroke="currentColor" strokeWidth="1.2"
            fill="currentColor" fillOpacity="0.05"
          />
          <circle cx="0" cy="7" r="1" fill="currentColor" />
        </g>
      </svg>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* Radar sweep trail — conic gradient masked to ring area */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "conic-gradient(from 90deg, transparent 85%, currentColor 100%)",
            opacity: 0.05,
            maskImage:
              "radial-gradient(circle closest-side at center, transparent 25%, black 30%, black 85%, transparent 90%)",
            WebkitMaskImage:
              "radial-gradient(circle closest-side at center, transparent 25%, black 30%, black 85%, transparent 90%)",
          }}
        />
      </motion.div>

      {/* Ring system */}
      <svg
        viewBox="0 0 400 400"
        className="relative w-full h-full"
        fill="none"
      >
        {/* Shield silhouette — draws on load */}
        <motion.path
          d="M200 10 L390 55 L390 200 Q390 350 200 390 Q10 350 10 200 L10 55 Z"
          stroke="currentColor"
          strokeWidth="0.75"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.06 }}
          transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Sonar pulse — expands and fades periodically */}
        <g transform="translate(200, 200)">
          <motion.circle
            cx="0"
            cy="0"
            r="120"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            initial={{ scale: 0.15, opacity: 0.15 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 3,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </g>

        {/* Orbital rings + nodes */}
        {rings.map((ring, i) => {
          const strokeOpacity = 0.25 - i * 0.05;
          const dotOpacity = 0.8 - i * 0.15;
          return (
            <g key={i}>
              <motion.circle
                cx="200"
                cy="200"
                r={ring.r}
                stroke="currentColor"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: strokeOpacity }}
                transition={{
                  duration: 1.8,
                  delay: ring.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
              <g transform="translate(200, 200)">
                <motion.g
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{
                    duration: ring.speed,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <motion.circle
                    cx={ring.r}
                    cy="0"
                    r={i === 0 ? 3.5 : 2.5}
                    fill="currentColor"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: dotOpacity }}
                    transition={{ delay: ring.delay + 1.8 }}
                  />
                </motion.g>
              </g>
            </g>
          );
        })}

        {/* Center radar dot */}
        <motion.circle
          cx="200"
          cy="200"
          r="4"
          fill="currentColor"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.9, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Cloud-lock — top-right near shield vertex */}
        <motion.g
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.55, y: 0 }}
          transition={{ duration: 1.5, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <g transform="translate(365, 30)">
            {/* Cloud silhouette */}
            <motion.path
              d="M-16,10 C-16,4 -14,-1 -10,-3 C-9,-9 -5,-13 0,-13 C5,-13 9,-9 10,-3 C14,-1 16,4 16,10 Z"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="currentColor"
              fillOpacity="0.03"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Lock shackle */}
            <motion.path
              d="M-4,4 V1 C-4,-3 4,-3 4,1 V4"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 4, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Lock body */}
            <motion.rect
              x="-5"
              y="4"
              width="10"
              height="7"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="currentColor"
              fillOpacity="0.05"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 4.5 }}
            />

            {/* Keyhole */}
            <motion.circle
              cx="0"
              cy="7"
              r="1"
              fill="currentColor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5 }}
            />
          </g>
        </motion.g>
      </svg>
    </div>
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
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-[480px] h-[480px] hidden lg:block pointer-events-none text-zinc-900 dark:text-white">
          <GravityField />
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
            15+ años protegiendo empresas en Chile
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
            <span className="block font-serif italic text-zinc-500 dark:text-zinc-400 mt-2">
              Nosotros las cerramos.
            </span>
          </motion.h1>

          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="mt-8 sm:mt-10 max-w-[33rem] text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed font-light"
          >
            Consultoría, implementación y operación de ciberseguridad para
            empresas. Plataformas líderes, equipo certificado y acompañamiento
            local en cada etapa.
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
              className="inline-flex min-h-[3.5rem] w-full sm:w-auto items-center justify-center sm:justify-start gap-3 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-base sm:text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              Agenda un diagnóstico
              <ArrowRight className="w-5 h-5 sm:w-4 sm:h-4" />
            </a>

            {/* Hidden on mobile to avoid competing with CTA, visible on desktop */}
            <div className="hidden sm:flex flex-wrap gap-2 text-[11px] sm:text-xs uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
              <span className="rounded-full border border-zinc-200/80 dark:border-zinc-800 px-3 py-1.5">
                5.361+ amenazas detectadas
              </span>
              <span className="rounded-full border border-zinc-200/80 dark:border-zinc-800 px-3 py-1.5">
                1.761+ endpoints protegidos
              </span>
              <span className="rounded-full border border-zinc-200/80 dark:border-zinc-800 px-3 py-1.5">
                Equipo con 25+ años de experiencia
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{
          opacity: { delay: 2.5, duration: 1 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 3 },
        }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-zinc-300 dark:from-zinc-600 to-transparent" />
      </motion.div>
    </header>
  );
}
