import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import RevealText from "@/components/ui/RevealText";

const barHeights = [34, 46, 30, 58, 38, 76, 52, 42, 63, 35, 56, 70];

const liveLogs = [
  "Detectando comportamiento sospechoso en FIN-024...",
  "Aislando endpoint FIN-024 y notificando al equipo...",
  "Aplicando politica EDR reforzada a 128 equipos nuevos...",
];

const queueItems = [
  {
    title: "Intento de ransomware bloqueado",
    meta: "Santiago / Finanzas / hace 2 min",
    status: "Alta",
  },
  {
    title: "PowerShell anomalo contenido",
    meta: "Operaciones / hace 7 min",
    status: "Media",
  },
  {
    title: "Nueva politica desplegada",
    meta: "128 endpoints / hace 12 min",
    status: "OK",
  },
];

export default function ProductHeroSection() {
  const dashRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(dashRef, { once: true, margin: "-10% 0px" });
  const [lineIndex, setLineIndex] = useState(0);
  const [typedLength, setTypedLength] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const currentLine = liveLogs[lineIndex];
    let timeoutId: ReturnType<typeof setTimeout>;

    if (typedLength < currentLine.length) {
      timeoutId = setTimeout(() => {
        setTypedLength((current) => current + 1);
      }, 22);
    } else {
      timeoutId = setTimeout(() => {
        setLineIndex((current) => (current + 1) % liveLogs.length);
        setTypedLength(0);
      }, 1400);
    }

    return () => clearTimeout(timeoutId);
  }, [isInView, lineIndex, typedLength]);

  const activeLine = liveLogs[lineIndex].slice(0, typedLength);

  return (
    <header className="max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-10 overflow-hidden">
      <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] xl:gap-16 2xl:gap-20">
        <div className="max-w-xl xl:pt-8 flex flex-col items-start">
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-[10px] md:text-xs font-medium tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
              Partner Certificado Bitdefender
            </span>
          </div>

          <h1 className="tracking-tight leading-[0.9] text-left">
            <span className="block text-[12vw] sm:text-5xl md:text-7xl lg:text-[5.6rem] font-light text-zinc-950 dark:text-white">
              <RevealText text="Bitdefender" />
            </span>
            <span className="block mt-1 md:mt-2 font-serif font-normal text-zinc-400 dark:text-zinc-500 text-[12vw] sm:text-5xl md:text-7xl lg:text-[5.6rem]">
              <RevealText text="GravityZone" />
            </span>
          </h1>

          <p className="text-base md:text-xl text-zinc-500 dark:text-zinc-400 font-light mt-5 md:mt-6 max-w-lg leading-relaxed">
            Protección de endpoints, servidores y cargas empresariales con un
            equipo que ha detectado más de 5.361 amenazas para clientes.
          </p>

          {/* Desktop-only feature chips */}
          <div className="hidden md:flex flex-wrap gap-2 md:gap-3 mt-7">
            <span className="border border-zinc-200 dark:border-zinc-700 rounded-full px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-zinc-600 dark:text-zinc-300 font-medium">
              Partner certificado
            </span>
            <span className="border border-zinc-200 dark:border-zinc-700 rounded-full px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-zinc-600 dark:text-zinc-300 font-medium">
              Consola centralizada
            </span>
            <span className="border border-zinc-200 dark:border-zinc-700 rounded-full px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-zinc-600 dark:text-zinc-300 font-medium">
              Soporte local
            </span>
          </div>

          {/* CTA Row - 100% width on mobile */}
          <div className="mt-8 md:mt-7 flex flex-wrap items-center gap-4 w-full md:w-auto">
            <a
              href="#contacto"
              className="inline-flex w-full md:w-auto min-h-[3.5rem] items-center justify-center gap-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 sm:px-8 py-3.5 rounded-full text-base sm:text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              Solicitar evaluacion
              <ArrowRight className="w-5 h-5 sm:w-4 sm:h-4" />
            </a>
            {/* Hidden competing text on mobile */}
            <p className="hidden md:block text-sm text-zinc-500 dark:text-zinc-400">
              También trabajamos con Kaspersky y Microsoft 365.
            </p>
          </div>
        </div>

        <div ref={dashRef} className="relative xl:pl-4 2xl:pl-8">
          <div className="hidden md:block absolute inset-x-8 top-8 bottom-12 bg-blue-500/15 dark:bg-blue-500/20 blur-3xl rounded-full pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 32, x: 18 }}
            animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 32, x: 18 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Dashboard Container */}
            <div className="bg-zinc-900 rounded-[1.75rem] sm:rounded-[2rem] overflow-hidden border border-zinc-800 shadow-[0_30px_80px_-20px_rgba(9,9,11,0.5)] md:shadow-[0_40px_100px_-30px_rgba(9,9,11,0.75)]">
              <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-zinc-800">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-zinc-700" />
                  <span className="ml-3 sm:ml-4 text-[10px] sm:text-xs text-zinc-500 font-medium uppercase tracking-[0.18em]">
                    GravityZone Console
                  </span>
                </div>
                <span className="hidden sm:inline-flex rounded-full border border-zinc-700 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-zinc-300">
                  Respuesta Activa
                </span>
              </div>

              <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_18rem]">
                <div className="p-4 sm:p-6">
                  {/* Operation Status - Mobile Core Panel 1 */}
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-800/70 p-4 sm:p-5 mb-4 sm:mb-5 overflow-hidden relative">
                    <motion.div
                      className="absolute inset-y-0 -left-1/4 w-1/3 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent"
                      animate={isInView ? { x: ["0%", "360%"] } : { x: "0%" }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="flex items-start justify-between gap-4 relative">
                      <div>
                        <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-zinc-500">
                          Operacion en vivo
                        </p>
                        <p className="text-white text-sm sm:text-base mt-2">
                          La consola permite revisar deteccion, contencion y
                          cambios de politica desde una sola vista operativa.
                        </p>
                      </div>
                      <span className="rounded-full bg-green-400/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-green-400">
                        24/7
                      </span>
                    </div>
                  </div>

                  {/* Metrics - Mobile Core Panel 2 */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-5">
                    <div className="bg-zinc-800 rounded-lg sm:rounded-xl p-3 sm:p-4">
                      <p className="text-zinc-500 text-[10px] sm:text-xs mb-1">
                        Endpoints Activos
                      </p>
                      <p className="text-white text-lg sm:text-2xl font-light">
                        847
                      </p>
                      <p className="text-green-400 text-[10px] sm:text-xs mt-1">
                        +12 esta semana
                      </p>
                    </div>
                    <div className="bg-zinc-800 rounded-lg sm:rounded-xl p-3 sm:p-4">
                      <p className="text-zinc-500 text-[10px] sm:text-xs mb-1">
                        Amenazas Bloqueadas
                      </p>
                      <p className="text-white text-lg sm:text-2xl font-light">
                        2,341
                      </p>
                      <p className="text-green-400 text-[10px] sm:text-xs mt-1">
                        100% detectadas
                      </p>
                    </div>
                    {/* Hide 3rd stat on very small screens to fit cleanly */}
                    <div className="hidden md:block bg-zinc-800 rounded-lg sm:rounded-xl p-3 sm:p-4">
                      <p className="text-zinc-500 text-[10px] sm:text-xs mb-1">
                        Score de Riesgo
                      </p>
                      <p className="text-white text-lg sm:text-2xl font-light">
                        94
                        <span className="text-[10px] sm:text-sm text-zinc-500">
                          /100
                        </span>
                      </p>
                      <p className="text-green-400 text-[10px] sm:text-xs mt-1">
                        Excelente
                      </p>
                    </div>
                  </div>

                  {/* Chart - Hidden on mobile to save vertical space */}
                  <div className="hidden sm:block bg-zinc-800 rounded-xl p-4 sm:p-5 mb-4 sm:mb-5">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <p className="text-zinc-500 text-xs uppercase tracking-[0.18em]">
                        Actividad de Amenazas
                      </p>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                        Ultimos 30 dias
                      </span>
                    </div>
                    <div className="h-32 sm:h-40 flex items-end gap-1.5">
                      {barHeights.map((height, index) => (
                        <motion.div
                          key={index}
                          className="flex-1 rounded-sm bg-zinc-700 origin-bottom"
                          initial={{ scaleY: 0.35, opacity: 0.6 }}
                          animate={isInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0.35, opacity: 0.6 }}
                          transition={{
                            duration: 0.55,
                            delay: 0.25 + index * 0.03,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Bottom Shield Panel - visible on mobile */}
                  <div className="bg-zinc-800 rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-400/10 rounded-full flex items-center justify-center">
                        <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                      </div>
                      <div>
                        <p className="text-white text-xs sm:text-sm">
                          Todos los endpoints protegidos
                        </p>
                        <p className="text-zinc-500 text-[10px] sm:text-xs hidden sm:block">
                          Última verificación: hace 2 min
                        </p>
                      </div>
                    </div>
                    <span className="text-green-400 text-[10px] sm:text-xs font-medium bg-green-400/10 px-2 sm:px-3 py-1 rounded-full">
                      Seguro
                    </span>
                  </div>
                </div>

                {/* Telemetry sidebar - collapsed to live logs + 1 item on mobile */}
                <div className="border-t xl:border-t-0 xl:border-l border-zinc-800 bg-zinc-900/95 p-4 sm:p-5">
                  <p className="text-zinc-500 text-[10px] sm:text-xs uppercase tracking-[0.2em] hidden sm:block">
                    Consola proactiva
                  </p>

                  <div className="mt-0 sm:mt-4 rounded-2xl border border-zinc-800 bg-black/30 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                        Respuesta en vivo
                      </span>
                    </div>

                    <div className="space-y-2 text-[12px] leading-relaxed text-zinc-400 font-mono">
                      <p className="hidden md:block">&gt; telemetry.sync --fleet amj-cl</p>
                      <p className="hidden md:block">&gt; threat-hunt --policy edr-critical</p>
                      <p className="text-zinc-100 min-h-[2.5rem] sm:min-h-auto">
                        &gt; {activeLine}
                        <span className="inline-block w-2 h-4 ml-0.5 align-[-0.15rem] bg-zinc-100 animate-pulse" />
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    {queueItems.map((item, idx) => (
                      <div
                        key={item.title}
                        className={`rounded-xl border border-zinc-800 bg-zinc-800/60 p-3 ${idx > 0 ? 'hidden sm:block' : ''}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm text-white leading-snug">
                              {item.title}
                            </p>
                            <p className="text-[11px] text-zinc-500 mt-1">
                              {item.meta}
                            </p>
                          </div>
                          <span
                            className={`rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.18em] ${
                              item.status === "Alta"
                                ? "bg-red-500/10 text-red-300"
                                : item.status === "Media"
                                  ? "bg-amber-500/10 text-amber-300"
                                  : "bg-green-400/10 text-green-400"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
