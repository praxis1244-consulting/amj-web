import { Suspense, lazy, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Mail,
  Calendar,
  FileText,
  BookOpen,
  ScrollText,
  ShieldCheck,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
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

type Step = {
  n: string;
  title: string;
  when: string;
  body: string;
  icon: LucideIcon;
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "Revisamos tu contexto",
    when: "Hoy mismo",
    body: "Nuestro equipo lee tu solicitud y prepara una primera lectura de tu situación antes de contactarte.",
    icon: Mail,
  },
  {
    n: "02",
    title: "Coordinamos una conversación",
    when: "Antes de 1 día hábil",
    body: "Te escribimos por correo o WhatsApp para acordar una hora cómoda. Sin venta, sin presión.",
    icon: Calendar,
  },
  {
    n: "03",
    title: "Entregamos un diagnóstico",
    when: "Dentro de la primera semana",
    body: "Después de la conversación inicial, te enviamos hallazgos, prioridades y un plan que tu equipo puede ejecutar.",
    icon: FileText,
  },
];

type ResourceCard = {
  href: string;
  eyebrow: string;
  title: string;
  body: string;
  icon: LucideIcon;
};

const RESOURCES: ResourceCard[] = [
  {
    href: "/casos",
    eyebrow: "Caso de éxito",
    title: "SPEVI: cero incidentes desde la implementación",
    body: "Cómo acompañamos a una empresa chilena a proteger su infraestructura sin frenar la operación.",
    icon: BookOpen,
  },
  {
    href: "/compliance",
    eyebrow: "Cumplimiento",
    title: "Ley 21.663, Ley 21.719 e ISO 27001",
    body: "Marcos regulatorios, deadlines reales y nuestro proceso de auditoría a certificación.",
    icon: ScrollText,
  },
  {
    href: "/productos",
    eyebrow: "Endpoint protection",
    title: "Bitdefender Gold Partner",
    body: "Protección de endpoints, servidores y cargas empresariales con soporte local.",
    icon: ShieldCheck,
  },
];

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

      <main className="pt-24">
        {/* HERO */}
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

          <div className="relative max-w-7xl mx-auto px-6 pt-12 md:pt-20 pb-16 md:pb-24">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-10 md:mb-14"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al inicio
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-flex items-center gap-2.5 rounded-md border border-emerald-400/30 bg-emerald-400/[0.06] px-4 py-2 mb-8"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <span className="text-[11px] uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-300 font-medium">
                Solicitud recibida
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              className="max-w-4xl text-5xl leading-[1.05] sm:text-6xl lg:text-[5.5rem] tracking-tight sm:leading-[0.96] text-balance"
            >
              <span className="block text-zinc-900 dark:text-white font-light">
                Gracias.
              </span>
              <span className="block font-serif italic text-[#25327D] dark:text-amber-400 mt-2">
                Te escribimos en menos de 1 día hábil.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
              className="mt-10 max-w-[40rem] text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed font-light"
            >
              Recibimos tu solicitud. Una persona del equipo va a leer tu
              contexto y te escribe por correo o WhatsApp para coordinar una
              primera conversación. Sin costo, sin compromiso.
            </motion.p>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, margin: "-10% 0px" }}
            transition={{ duration: 1, ease: EASE }}
            className="h-px bg-zinc-200 dark:bg-zinc-800 origin-left"
          />
        </div>

        {/* TIMELINE */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-3xl mb-12 md:mb-16"
          >
            <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500 font-medium mb-6">
              Esto es lo que pasa ahora
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-zinc-900 dark:text-white leading-tight">
              Tres pasos.{" "}
              <span className="font-serif italic text-[#25327D] dark:text-amber-400">
                Sin sorpresas.
              </span>
            </h2>
          </motion.div>

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12">
            {STEPS.map((step, idx) => (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-10% 0px" }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: EASE }}
                className="relative"
              >
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="text-xs uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500 tabular-nums">
                    {step.n}
                  </span>
                  <step.icon
                    className="w-4 h-4 text-[#25327D] dark:text-amber-400"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl font-medium tracking-tight text-zinc-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-amber-700 dark:text-amber-400 mb-4 uppercase tracking-[0.18em]">
                  {step.when}
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-light">
                  {step.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </section>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, margin: "-10% 0px" }}
            transition={{ duration: 1, ease: EASE }}
            className="h-px bg-zinc-200 dark:bg-zinc-800 origin-left"
          />
        </div>

        {/* RESOURCES */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-3xl mb-12 md:mb-16"
          >
            <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500 font-medium mb-6">
              Mientras tanto
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-zinc-900 dark:text-white leading-tight">
              Conoce mejor{" "}
              <span className="font-serif italic text-[#25327D] dark:text-amber-400">
                cómo trabajamos.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESOURCES.map((resource, idx) => (
              <motion.div
                key={resource.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-10% 0px" }}
                transition={{ duration: 0.7, delay: idx * 0.08, ease: EASE }}
              >
                <Link
                  href={resource.href}
                  className="group relative flex h-full flex-col rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] p-6 md:p-7 transition-colors hover:border-zinc-400 dark:hover:border-white/25 hover:bg-white dark:hover:bg-white/[0.05]"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <resource.icon
                      className="w-4 h-4 text-[#25327D] dark:text-amber-400"
                      aria-hidden="true"
                    />
                    <span className="text-[11px] uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400 font-medium">
                      {resource.eyebrow}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-medium tracking-tight text-zinc-900 dark:text-white mb-3 leading-snug">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed mb-8">
                    {resource.body}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm text-[#25327D] dark:text-amber-400 font-medium">
                    Leer
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* WHATSAPP CALLOUT */}
        <section className="max-w-7xl mx-auto px-6 pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.03] px-6 py-10 md:px-12 md:py-12"
          >
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl"
            />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
              <div className="max-w-xl">
                <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500 font-medium mb-3">
                  ¿Es urgente?
                </p>
                <h3 className="text-2xl md:text-3xl font-light tracking-tight text-zinc-900 dark:text-white leading-tight">
                  Si tu situación no puede esperar,{" "}
                  <span className="font-serif italic text-[#25327D] dark:text-amber-400">
                    escríbenos por WhatsApp.
                  </span>
                </h3>
              </div>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-md bg-emerald-500 px-7 py-3.5 text-base font-medium text-white transition-all hover:brightness-110 md:w-auto"
              >
                <MessageCircle className="w-5 h-5" />
                Abrir WhatsApp
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <DeferredSection>
        <Footer />
      </DeferredSection>
      <WhatsAppButton />
    </>
  );
}
