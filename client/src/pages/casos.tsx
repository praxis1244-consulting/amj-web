import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Play, Pause, Volume2, VolumeX } from "lucide-react";
import Nav from "@/components/layout/Nav";
import PageMeta from "@/components/seo/PageMeta";
import ProgressiveBlur from "@/components/layout/ProgressiveBlur";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { scrollToContact } from "@/lib/scrollToContact";
import { useRef, useState, useEffect, useCallback } from "react";

const ContactFormD = lazy(() => import("@/components/sections/ContactFormD"));
const Footer = lazy(() => import("@/components/layout/Footer"));

const EASE = [0.16, 1, 0.3, 1] as const;

const CASE_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: "Francisco Villegas",
      jobTitle: "Director",
    },
    itemReviewed: {
      "@type": "Organization",
      name: "AMJ Ingeniería",
      url: "https://amjingenieria.cl/",
    },
    reviewBody:
      "Gracias al apoyo de AMJ, utilizamos la opción más adecuada para nuestra organización con la seguridad de que no vamos a tener más incidentes.",
  },
];

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const hideTimeout = useRef<ReturnType<typeof setTimeout>>();

  const scheduleHide = useCallback(() => {
    clearTimeout(hideTimeout.current);
    setShowControls(true);
    if (isPlaying) {
      hideTimeout.current = setTimeout(() => setShowControls(false), 2500);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) setShowControls(true);
    else scheduleHide();
    return () => clearTimeout(hideTimeout.current);
  }, [isPlaying, scheduleHide]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); } else { v.pause(); }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress(v.currentTime / v.duration);
    setCurrentTime(v.currentTime);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    const bar = progressRef.current;
    if (!v || !bar) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    v.currentTime = ratio * v.duration;
  };

  return (
    <div
      className="relative bg-black overflow-hidden group max-w-sm mx-auto lg:mx-0 lg:max-w-none"
      onMouseMove={scheduleHide}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        preload="metadata"
        className="w-full h-auto block"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => {
          if (videoRef.current) setDuration(videoRef.current.duration);
        }}
        onEnded={() => { setIsPlaying(false); setShowControls(true); }}
        onClick={togglePlay}
      >
        <source src="/videos/spevi-testimony.mp4" type="video/mp4" />
      </video>

      {/* Center play button — shown when paused */}
      {!isPlaying && (
        <button
          type="button"
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
          aria-label="Reproducir video"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 dark:bg-white/90 flex items-center justify-center shadow-xl"
          >
            <Play className="w-6 h-6 md:w-8 md:h-8 text-zinc-900 ml-0.5" />
          </motion.div>
        </button>
      )}

      {/* Bottom controls bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent pt-10 pb-3 px-4 transition-opacity duration-300 ${
          showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Progress bar */}
        <div
          ref={progressRef}
          onClick={handleSeek}
          className="w-full h-5 flex items-center cursor-pointer group/bar mb-2"
        >
          <div className="w-full h-[3px] group-hover/bar:h-[5px] bg-white/20 transition-all relative">
            <div
              className="absolute inset-y-0 left-0 bg-white transition-all"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              className="text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label={isPlaying ? "Pausar" : "Reproducir"}
            >
              {isPlaying
                ? <Pause className="w-4 h-4" />
                : <Play className="w-4 h-4 ml-0.5" />
              }
            </button>
            <button
              type="button"
              onClick={toggleMute}
              className="text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label={isMuted ? "Activar sonido" : "Silenciar"}
            >
              {isMuted
                ? <VolumeX className="w-4 h-4" />
                : <Volume2 className="w-4 h-4" />
              }
            </button>
          </div>

          <span className="text-[11px] text-white/60 tabular-nums tracking-wide">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CasosPage() {
  return (
    <>
      <PageMeta
        title="Casos de Éxito — AMJ Ingeniería"
        description="Testimonios de empresas que confían en AMJ Ingeniería para proteger su infraestructura. Casos reales de ciberseguridad en Chile."
        path="/casos"
        jsonLd={CASE_SCHEMA}
      />
      <ProgressiveBlur />
      <Nav />

      <main className="pt-24">
        {/* ── Hero ── */}
        <section className="max-w-7xl mx-auto px-6 pt-12 md:pt-16 pb-12 md:pb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-10 md:mb-12"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="lg:col-span-8"
            >
              <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500 font-medium mb-6">
                Caso de Éxito
              </p>

              <img
                src="/logos/spevi.jpeg"
                alt="SPEVI — Acústica · Audio · Video"
                className="h-20 md:h-28 lg:h-32 w-auto object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              className="lg:col-span-4"
            >
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed font-light">
                Empresa chilena especializada en soluciones de audio, video y
                acústica profesional. Necesitaban proteger su infraestructura sin
                interrumpir la operación diaria.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: EASE }}
            className="h-px bg-zinc-200 dark:bg-zinc-800 origin-left"
          />
        </div>

        {/* ── Video + Pull Quote — magazine spread ── */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Portrait video */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10% 0px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="lg:col-span-4"
            >
              <VideoPlayer />
            </motion.div>

            {/* Right: Pull quote + attribution */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10% 0px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              className="lg:col-span-8 flex flex-col justify-center"
            >
              <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-serif italic leading-[1.2] tracking-tight text-zinc-900 dark:text-zinc-100">
                &ldquo;Gracias al apoyo de AMJ, utilizamos la opción más
                adecuada para nuestra organización con la seguridad de que no
                vamos a tener más incidentes.&rdquo;
              </blockquote>

              <div className="flex items-center gap-4 mt-8">
                <img
                  src="/logos/francisco-villegas.jpg"
                  alt="Francisco Villegas"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <span className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    Francisco Villegas
                  </span>
                  <span className="block text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                    Director · SPEVI
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, margin: "-10% 0px" }}
            transition={{ duration: 1, ease: EASE }}
            className="h-px bg-zinc-200 dark:bg-zinc-800 origin-left"
          />
        </div>

        {/* ── Editorial Context ── */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16"
          >
            <div className="lg:col-span-8">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-900 dark:text-zinc-100 mb-6 leading-tight">
                La seguridad correcta,{" "}
                <span className="font-serif italic text-[#25327D] dark:text-amber-400">
                  sin disrupciones
                </span>
              </h2>

              <div className="flex flex-col gap-5 text-zinc-500 dark:text-zinc-400 text-base md:text-lg leading-relaxed font-light max-w-2xl">
                <p>
                  SPEVI enfrentaba un desafío común en empresas medianas: sabían
                  que necesitaban proteger sus equipos y datos, pero no contaban
                  con un equipo interno de TI dedicado a ciberseguridad.
                </p>
                <p>
                  AMJ evaluó la infraestructura existente, identificó las
                  brechas críticas y recomendó la solución más adecuada para el
                  perfil de riesgo y presupuesto de la organización — sin
                  intentar vender lo más caro ni lo más complejo.
                </p>
                <p>
                  Desde la implementación, SPEVI no ha registrado nuevos
                  incidentes de seguridad. El soporte local y la capacitación del
                  equipo fueron claves para la adopción sin fricciones.
                </p>
              </div>
            </div>

            <div className="lg:col-span-4">
              <motion.img
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, margin: "-10% 0px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                src="/logos/francisco-villegas-portrait.jpg"
                alt="Francisco Villegas en InfoComm"
                className="w-full aspect-square object-cover filter grayscale"
              />
            </div>
          </motion.div>
        </section>

        {/* ── CTA Section ── */}
        <section className="max-w-7xl mx-auto px-6 pt-8 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-center"
          >
            <h3 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">
              ¿Quieres resultados{" "}
              <span className="font-serif italic text-[#25327D] dark:text-amber-400">
                similares
              </span>
              ?
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-base font-light mb-8 max-w-md mx-auto">
              Conversemos sobre cómo proteger tu empresa sin complicar tu
              operación.
            </p>

            <button
              type="button"
              onClick={() => scrollToContact()}
              className="inline-flex min-h-[3.5rem] items-center justify-center gap-3 bg-gradient-to-r from-[#25327D] to-[#103A8F] text-white dark:from-amber-400 dark:to-amber-500 dark:text-zinc-900 px-8 py-4 rounded-md text-base font-medium hover:brightness-110 transition-all cursor-pointer"
            >
              Quiero mi diagnóstico gratis
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </section>

        <Suspense fallback={null}>
          <ContactFormD />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <WhatsAppButton />
    </>
  );
}
