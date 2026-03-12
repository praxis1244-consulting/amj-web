import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Diagnóstico Claro",
    description: "Identificamos endpoints sin protección, riesgo de pérdida de datos y exposición a robo de identidad para priorizar lo urgente sin sesgos."
  },
  {
    number: "02",
    title: "Implementación Ordenada",
    description: "Desplegamos plataformas líderes del mercado según tu contexto, minimizando el impacto en la continuidad operacional con presupuestos y plazos definidos."
  },
  {
    number: "03",
    title: "Operación Continua",
    description: "Monitoreo continuo, respuesta a incidentes y ajustes de política para que las soluciones se mantengan actualizadas, seguras y funcionando."
  }
];

export default function PhilosophySection() {
  const containerRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 45%"],
  });

  const timelineProgress = useTransform(scrollYProgress, [0, 1], [0.04, 1]);
  const smoothTimelineProgress = useSpring(timelineProgress, {
    stiffness: 180,
    damping: 26,
    mass: 0.22,
  });

  return (
    <section ref={containerRef} className="max-w-7xl mx-auto px-6 py-32 md:py-48 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 relative">
      {/* Editorial vertical label on desktop */}
      <div className="md:col-span-2 hidden md:block">
        <div className="sticky top-48">
          <h3 className="text-sm uppercase tracking-widest text-zinc-400 font-medium [writing-mode:vertical-rl] rotate-180">
            Cómo Trabajamos
          </h3>
        </div>
      </div>
      
      {/* Mobile label */}
      <div className="md:hidden mb-8">
        <h3 className="text-sm uppercase tracking-widest text-zinc-500 font-medium">
          Cómo Trabajamos
        </h3>
      </div>

      <div className="md:col-span-10 flex flex-col gap-24 md:gap-40">
        {/* Intro heading */}
        <div className="max-w-4xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.15] mb-8">
            <span className="block">Partimos con un <span className="font-serif italic text-[#25327D] dark:text-amber-400">diagnóstico</span> claro,</span>
            <span className="block">seguimos con una <span className="font-serif italic text-[#25327D] dark:text-amber-400">implementación</span> ordenada</span>
            <span className="block">y te <span className="font-serif italic text-[#25327D] dark:text-amber-400">acompañamos</span> en la operación.</span>
          </h2>
        </div>

        {/* The steps with scroll animation */}
        <div
          ref={timelineRef}
          className="relative pl-8 md:pl-16 ml-2 md:ml-4 flex flex-col gap-16 md:gap-32"
        >
          {/* Background Line */}
          <div className="absolute left-0 top-3 bottom-0 w-[1px] -translate-x-1/2 bg-zinc-200 dark:bg-zinc-800" />
          
          {/* Animated Progress Line */}
          <motion.div 
            className="absolute left-0 top-3 bottom-0 w-[2px] -translate-x-1/2 bg-zinc-900 dark:bg-zinc-100 origin-top"
            style={{
              scaleY: prefersReducedMotion ? 1 : smoothTimelineProgress,
            }}
          />

          {steps.map((step, index) => (
            <StepItem key={step.number} step={step} index={index} />
          ))}
        </div>

        {/* Heavy typo link */}
        <div className="pt-8 md:pt-16 pb-12">
          <a
            href="#servicios"
            className="group inline-flex items-center gap-4 text-2xl md:text-4xl lg:text-5xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors"
          >
            <span className="underline decoration-4 underline-offset-[12px] decoration-zinc-200 dark:decoration-zinc-800 group-hover:decoration-zinc-900 dark:group-hover:decoration-zinc-100 transition-colors">
              Conoce nuestros servicios
            </span>
            <ArrowRight className="w-8 h-8 md:w-10 md:h-10 group-hover:translate-x-4 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

function StepItem({ step, index }: { step: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="relative"
    >
      {/* Node indicator on the line */}
      <div className="absolute -left-8 md:-left-16 top-2.5 w-4 h-4 -translate-x-1/2 rounded-full bg-white dark:bg-zinc-950 border-[3px] border-zinc-900 dark:border-zinc-100 ring-8 ring-white dark:ring-[#09090b] z-10" />
      
      <div className="flex flex-col gap-5">
        <span className="text-sm font-mono text-zinc-400 dark:text-zinc-500 tracking-wider">
          {step.number}
        </span>
        <h3 className="text-2xl md:text-4xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
          {step.title}
        </h3>
        <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl font-light">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}
