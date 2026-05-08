import { Suspense, lazy, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Nav from "@/components/layout/Nav";
import PageMeta from "@/components/seo/PageMeta";
import ProgressiveBlur from "@/components/layout/ProgressiveBlur";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const Footer = lazy(() => import("@/components/layout/Footer"));

const EASE = [0.16, 1, 0.3, 1] as const;

const WHATSAPP_NUMBER = "56984298092";
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola AMJ, acabo de enviar una solicitud por la web y necesito conversar antes.",
)}`;

function DeferredSection({ children }: { children: ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}

export default function GraciasPage() {
  return (
    <>
      <PageMeta
        title="Gracias · Solicitud recibida · AMJ Ingeniería"
        description="Recibimos tu solicitud. Te escribimos en menos de 1 día hábil para coordinar la primera conversación."
        path="/gracias"
        noindex
      />
      <ProgressiveBlur />
      <Nav />

      <main>
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 dark:hidden"
            style={{
              background:
                "radial-gradient(ellipse at 70% 50%, #f4f4f5 0%, #ffffff 70%)",
            }}
          />
          <div
            className="absolute inset-0 hidden dark:block"
            style={{
              background:
                "radial-gradient(ellipse at 70% 50%, #1c1c1f 0%, #09090b 70%)",
            }}
          />

          <div className="relative w-full max-w-5xl mx-auto px-6 min-h-[100svh] lg:min-h-screen flex items-center pt-24 pb-16">
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="inline-flex items-center gap-2.5 rounded-md border border-emerald-400/30 bg-emerald-400/[0.06] px-4 py-2 mb-10"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                <span className="text-[11px] uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-300 font-medium">
                  Solicitud recibida
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: EASE }}
                className="text-6xl leading-[1.02] sm:text-7xl lg:text-[8rem] tracking-tight sm:leading-[0.92] text-balance"
              >
                <span className="block text-zinc-900 dark:text-white font-light">
                  Gracias.
                </span>
                <span className="block font-serif italic text-[#25327D] dark:text-amber-400 mt-1 sm:mt-2">
                  Te escribimos pronto.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
                className="mt-10 sm:mt-12 max-w-[36rem] text-zinc-500 dark:text-zinc-400 text-lg sm:text-xl leading-relaxed font-light"
              >
                Una persona del equipo va a leer tu solicitud y te escribe por
                correo o WhatsApp en menos de un día hábil. Sin venta, sin
                presión.
              </motion.p>

              <motion.a
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-12 inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <span className="text-zinc-400 dark:text-zinc-500">
                  ¿Es urgente?
                </span>
                <span className="font-medium">Escríbenos por WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </motion.a>
            </div>
          </div>
        </section>
      </main>

      <DeferredSection>
        <Footer />
      </DeferredSection>
      <WhatsAppButton />
    </>
  );
}
