import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

const PHONE = "56984298092";
const MESSAGE = "Hola, me interesa conocer más sobre sus servicios de ciberseguridad.";
const WHATSAPP_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;

const EASE = [0.16, 1, 0.3, 1] as const;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const reduced = !!useReducedMotion();

  // Show button after a short delay
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
          {/* Popup bubble */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.95 }}
                animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="w-72 rounded-2xl border border-white/[0.08] bg-zinc-900/90 p-5 shadow-[0_16px_64px_rgba(0,0,0,0.4)] backdrop-blur-xl"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-400/10">
                      <WhatsAppIcon className="h-4.5 w-4.5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">AMJ Ingeniería</p>
                      <p className="text-[11px] text-zinc-400">Responde en menos de 1 hora</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-zinc-500 transition-colors hover:text-white cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-4 py-3 mb-4">
                  <p className="text-[13px] leading-relaxed text-zinc-300">
                    Hola, ¿en qué podemos ayudarte? Escríbenos y te respondemos a la brevedad.
                  </p>
                </div>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (typeof window.fbq === "function") {
                      window.fbq("track", "Contact");
                    }
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-emerald-400"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Iniciar conversación
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* FAB button */}
          <motion.button
            type="button"
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
            onClick={() => setOpen((o) => !o)}
            className="group relative flex h-16 w-16 items-center justify-center rounded-full border border-white/[0.08] bg-zinc-900/80 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 hover:border-emerald-400/20 hover:shadow-[0_8px_32px_rgba(16,185,129,0.15)] cursor-pointer"
          >
            {/* Subtle ping */}
            <span className="absolute inset-0 rounded-full animate-ping bg-emerald-400/10 [animation-duration:3s]" />

            <AnimatePresence mode="wait">
              {open ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6 text-zinc-400 transition-colors group-hover:text-white" />
                </motion.span>
              ) : (
                <motion.span
                  key="whatsapp"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <WhatsAppIcon className="h-8 w-8 text-emerald-400 transition-colors group-hover:text-emerald-300" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
