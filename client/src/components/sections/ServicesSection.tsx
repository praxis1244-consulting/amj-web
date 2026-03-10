import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const services = [
  {
    id: "01",
    title: "Consultoría en Ciberseguridad",
    description: "Evaluamos brechas, priorizamos riesgos y recomendamos controles para frenar malware, robo de datos y accesos no autorizados antes de que se conviertan en incidentes.",
    points: [
      "Diagnóstico de brechas",
      "Priorización de riesgos",
      "Diseño de arquitectura",
    ]
  },
  {
    id: "02",
    title: "Análisis de Vulnerabilidades",
    description: "Ejecutamos pentesting interno y externo, revisamos aplicaciones y activos expuestos para cerrar las puertas que ransomware y atacantes buscan primero.",
    points: [
      "Pentesting continuo",
      "Revisión de aplicaciones",
      "Planes de remediación",
    ]
  },
  {
    id: "03",
    title: "Seguridad de Redes",
    description: "Implementamos segmentación avanzada, endurecimiento de red y sistemas de detección para reducir tu superficie de ataque y contener DDoS y movimiento lateral.",
    points: [
      "Firewall y segmentación",
      "Detección de intrusiones",
      "Reducción de superficie",
    ]
  },
  {
    id: "04",
    title: "Evaluación de Riesgos",
    description: "Alineamos tu infraestructura con marcos globales (ISO 27001, NIST) y creamos hojas de ruta claras para cumplimiento y mitigación de riesgos operacionales.",
    points: [
      "Impacto y probabilidad",
      "Alineamiento normativo",
      "Hojas de ruta continuas",
    ]
  },
  {
    id: "05",
    title: "Políticas de Seguridad",
    description: "Diseñamos políticas de acceso, protocolos de respuesta a incidentes y marcos de protección de datos adaptados a la realidad operativa de tu empresa.",
    points: [
      "Control de acceso",
      "Respuesta a incidentes",
      "Protección de datos",
    ]
  },
  {
    id: "06",
    title: "Procesos y Continuidad",
    description: "Mapeamos procesos críticos, identificamos riesgos operacionales y construimos planes de continuidad para que tu negocio no se detenga ante un incidente.",
    points: [
      "Mapeo de procesos críticos",
      "Riesgo operacional",
      "Planes de continuidad",
    ]
  }
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(1);
  const prefersReducedMotion = useReducedMotion();
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    let frameId = 0;

    const updateActiveService = () => {
      frameId = 0;

      const viewportAnchor = window.innerHeight * 0.42;
      let nextIndex = activeIndexRef.current;
      let closestDistance = Number.POSITIVE_INFINITY;

      itemRefs.current.forEach((item, index) => {
        if (!item) return;

        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const distance = Math.abs(itemCenter - viewportAnchor);

        if (distance < closestDistance) {
          closestDistance = distance;
          nextIndex = index;
        }
      });

      if (nextIndex !== activeIndexRef.current) {
        setScrollDirection(nextIndex > activeIndexRef.current ? 1 : -1);
        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
      }
    };

    const requestUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateActiveService);
    };

    requestUpdate();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <section id="servicios" className="max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-48">
      {/* Header */}
      <div className="mb-12 sm:mb-16 md:mb-32">
        <h2 className="text-sm uppercase tracking-widest text-zinc-400 font-medium mb-6">
          Nuestras Capacidades
        </h2>
        <p className="text-[clamp(2.25rem,9vw,4.75rem)] md:text-5xl lg:text-7xl font-light tracking-tight text-zinc-900 dark:text-zinc-100 max-w-4xl leading-[1.06]">
          Protección integral contra pérdida de datos, ransomware y ciberataques, diseñada para la <span className="font-serif italic text-zinc-500">continuidad</span> de tu negocio.
        </p>
      </div>

      <div className="lg:hidden -mx-4 px-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 scroll-hide">
        <div className="flex gap-4 pb-2 w-max">
          {services.map((service) => (
            <article
              key={service.id}
              className="snap-start relative w-[84vw] max-w-[22rem] min-h-[31rem] overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-50 p-5 shadow-[0_24px_80px_-50px_rgba(15,23,42,0.3)] dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div
                className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <span className="absolute right-3 top-3 text-[8rem] font-serif italic font-light tracking-tighter text-zinc-200 dark:text-zinc-800">
                {service.id}
              </span>
              <div className="relative flex h-full flex-col">
                <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500">
                  Servicio {service.id}
                </p>
                <h3 className="mt-5 max-w-[10ch] text-[2.1rem] leading-[0.95] font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
                  {service.title}
                </h3>
                <p className="mt-5 max-w-[20rem] text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {service.description}
                </p>
                <ul className="mt-auto space-y-3 border-t border-zinc-200/80 pt-5 dark:border-zinc-800">
                  {service.points.map((point, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400"
                    >
                      <span className="h-px w-5 bg-zinc-300 dark:bg-zinc-700" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative items-start">
        {/* Left Side: Scrollable text (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-32 md:gap-64 pb-32">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              ref={(node) => {
                itemRefs.current[i] = node;
              }}
              className={`flex flex-col transition-all duration-300 ${activeIndex === i ? 'opacity-100' : 'opacity-30'}`}
            >
              <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                <span className="text-5xl md:text-6xl lg:text-7xl font-serif italic font-light text-zinc-300 dark:text-zinc-700 shrink-0">
                  {service.id}
                </span>
                <div className="flex flex-col gap-6 md:gap-8 pt-2">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100 leading-[1.1]">
                    {service.title}
                  </h3>
                  <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-light max-w-xl">
                    {service.description}
                  </p>
                  
                  {/* Subtle bullet points instead of heavy icons */}
                  <ul className="flex flex-col gap-4 mt-4 border-l border-zinc-200 dark:border-zinc-800 pl-6">
                    {service.points.map((point, idx) => (
                      <li key={idx} className="text-sm md:text-base uppercase tracking-widest font-medium text-zinc-500 dark:text-zinc-400">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Side: Sticky Abstract Graphic (5 cols) */}
        <div className="hidden lg:block lg:col-span-5 sticky top-48 h-[600px]">
          <div className="w-full h-full bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] overflow-hidden relative flex items-center justify-center transition-colors duration-700">
            
            {/* The massive typography in the background acting as art */}
            <AnimatePresence initial={false} custom={scrollDirection} mode="sync">
              <motion.div
                key={activeIndex}
                custom={scrollDirection}
                initial={
                  prefersReducedMotion
                    ? false
                    : {
                        opacity: 0,
                        y: scrollDirection > 0 ? 40 : -40,
                        scale: 0.96,
                        filter: "blur(10px)",
                      }
                }
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        y: scrollDirection > 0 ? -28 : 28,
                        scale: 1.03,
                        filter: "blur(10px)",
                      }
                }
                transition={{
                  duration: prefersReducedMotion ? 0.16 : 0.38,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <span className="text-[24rem] font-serif italic font-light text-zinc-200 dark:text-zinc-800 select-none tracking-tighter">
                  {services[activeIndex].id}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* A subtle abstract overlay mask */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-100/50 via-transparent to-zinc-200/50 dark:from-zinc-900/50 dark:to-zinc-800/50 mix-blend-overlay" />
            
            {/* Minimalist Grid Pattern for tech feel */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                 style={{ 
                   backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`, 
                   backgroundSize: '40px 40px' 
                 }} 
            />

            {/* Scanning line animation */}
            <motion.div 
               className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-900 dark:via-zinc-100 to-transparent opacity-20"
               animate={prefersReducedMotion ? { top: "50%" } : { top: ["0%", "100%"] }}
               transition={{
                 duration: prefersReducedMotion ? 0.2 : 4,
                 ease: "linear",
                 repeat: prefersReducedMotion ? 0 : Infinity,
               }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
