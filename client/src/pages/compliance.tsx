import { Suspense, lazy, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Calendar,
  AlertTriangle,
  FileCheck,
  ScrollText,
  ListChecks,
  BadgeCheck,
  Building2,
  Database,
  Lock,
  type LucideIcon,
} from "lucide-react";
import Nav from "@/components/layout/Nav";
import PageMeta from "@/components/seo/PageMeta";
import ProgressiveBlur from "@/components/layout/ProgressiveBlur";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { scrollToContact } from "@/lib/scrollToContact";

const ContactFormD = lazy(() => import("@/components/sections/ContactFormD"));
const Footer = lazy(() => import("@/components/layout/Footer"));
const AwardsMarquee = lazy(() => import("@/components/sections/AwardsMarquee"));

const EASE = [0.16, 1, 0.3, 1] as const;

const FAQS = [
  {
    q: "¿Qué empresas deben prepararse para la Ley 21.663?",
    a: "Operadores de Importancia Vital, Servicios Esenciales y organizaciones que formen parte de cadenas críticas o contratos sensibles. Aunque la designación formal la realiza la ANCI, conviene llegar con gobierno, riesgo, incidentes y continuidad ya ordenados.",
  },
  {
    q: "¿Cuándo entra en vigencia la Ley 21.719?",
    a: "La Ley 21.719 de Protección de Datos Personales entra en vigencia el 1 de diciembre de 2026. El trabajo práctico parte antes: bases legales, registro de tratamientos, gestión de titulares, brechas, proveedores y responsables internos.",
  },
  {
    q: "¿ISO 27001 reemplaza el cumplimiento legal?",
    a: "No. ISO 27001 ayuda a demostrar madurez y controles de seguridad, pero debe mapearse contra las exigencias legales, regulatorias y contractuales que aplican a cada empresa.",
  },
  {
    q: "¿La primera reunión es una auditoría completa?",
    a: "No. Es un diagnóstico inicial para entender industria, exposición, marcos aplicables y urgencias. Desde ahí definimos si corresponde una auditoría formal, una hoja de ruta o una ejecución priorizada.",
  },
];

const COMPLIANCE_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Cumplimiento Normativo en Ciberseguridad",
    serviceType:
      "Consultoría de cumplimiento ISO 27001 · Ley 21.663 · Ley 21.719",
    provider: {
      "@type": "Organization",
      name: "AMJ Ingeniería",
      url: "https://amjingenieria.cl/",
    },
    areaServed: "Chile",
    availableLanguage: "es-CL",
    url: "https://amjingenieria.cl/compliance",
    description:
      "Acompañamos a empresas en Chile a cumplir con Ley 21.663 (Marco de Ciberseguridad), Ley 21.719 (Protección de Datos Personales) e ISO 27001. Auditoría, hoja de ruta, ejecución y certificación.",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: "https://amjingenieria.cl/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Compliance",
        item: "https://amjingenieria.cl/compliance",
      },
    ],
  },
];

type Framework = {
  id: string;
  chip: string;
  title: string;
  deadline: string;
  appliesTo: string;
  requires: string[];
  cost: string;
  icon: LucideIcon;
};

const FRAMEWORKS: Framework[] = [
  {
    id: "ley-21-663",
    chip: "Ley 21.663",
    title: "Marco de Ciberseguridad",
    deadline: "Vigente · Deadline OIV: junio 2026",
    appliesTo:
      "Operadores de Importancia Vital (OIV) y Servicios Esenciales designados por la ANCI.",
    requires: [
      "Reporte obligatorio de incidentes a la ANCI dentro de los plazos establecidos.",
      "Plan de seguridad y gestión de riesgo cibernético documentado y vigente.",
      "Equipos y procedimientos de respuesta a incidentes y continuidad operativa.",
      "Designación de un encargado de ciberseguridad con responsabilidades claras.",
    ],
    cost: "Multas administrativas, suspensión de servicios críticos y exposición pública por incumplimiento ante la ANCI.",
    icon: Building2,
  },
  {
    id: "ley-21-719",
    chip: "Ley 21.719",
    title: "Protección de Datos Personales",
    deadline: "Vigencia 1 dic 2026 · Multas hasta 10.000 UTM",
    appliesTo:
      "Toda organización que trate datos personales en Chile, incluyendo PYMEs y empresas extranjeras con operaciones locales.",
    requires: [
      "Designar un Delegado de Protección de Datos (DPO) cuando corresponda.",
      "Realizar Evaluaciones de Impacto en Protección de Datos (EIPD).",
      "Notificar brechas de seguridad a la Agencia y a los titulares afectados.",
      "Mantener registro de actividades de tratamiento y bases legales de uso.",
    ],
    cost: "Multas de hasta 10.000 UTM, pérdida de licitaciones y daño reputacional severo en caso de filtración.",
    icon: Database,
  },
  {
    id: "iso-27001",
    chip: "ISO 27001",
    title: "Sistema de Gestión de Seguridad de la Información",
    deadline: "Voluntaria · Cada vez más exigida en licitaciones",
    appliesTo:
      "Empresas que necesitan demostrar madurez en ciberseguridad: licitaciones públicas, partners corporativos y contratos B2B con cláusulas de seguridad.",
    requires: [
      "Análisis de riesgo formal y declaración de aplicabilidad (SoA).",
      "Política de seguridad alineada al Anexo A (114 controles).",
      "Gestión de incidentes, accesos, proveedores y continuidad operativa.",
      "Auditoría interna y certificación por organismo acreditado.",
    ],
    cost: "Sin certificación, quedas fuera de licitaciones que la exigen como precondición técnica.",
    icon: Lock,
  },
];

type ProcessStep = {
  n: string;
  title: string;
  body: string;
  icon: LucideIcon;
};

const PROCESS: ProcessStep[] = [
  {
    n: "01",
    title: "Auditoría",
    body: "Diagnóstico inicial de tu postura de seguridad y brechas frente al marco objetivo. La primera conversación es sin costo.",
    icon: ScrollText,
  },
  {
    n: "02",
    title: "Hoja de ruta",
    body: "Plan priorizado por riesgo y deadline regulatorio, con esfuerzo y costo estimados por fase. Tu equipo lo entiende y lo puede ejecutar.",
    icon: ListChecks,
  },
  {
    n: "03",
    title: "Ejecución",
    body: "Acompañamos la implementación de controles técnicos, políticas, capacitación y procesos. Tu operación no se detiene.",
    icon: FileCheck,
  },
  {
    n: "04",
    title: "Certificación",
    body: "Preparación de evidencias, auditoría interna y soporte en la auditoría externa. Cierre con respaldo documental verificable.",
    icon: BadgeCheck,
  },
];

function useCountUp(target: number, duration: number, inView: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) {
      setValue(0);
      return;
    }
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

const STATS = [
  { target: 35000, label: "Detecciones de malware", suffix: "+" },
  { target: 11500, label: "Antivirus instalados", suffix: "+" },
  { target: 15, label: "Años en Chile", suffix: "+" },
];

function StatItem({
  stat,
  inView,
  delay,
}: {
  stat: (typeof STATS)[number];
  inView: boolean;
  delay: number;
}) {
  const count = useCountUp(stat.target, stat.target > 100 ? 2200 : 1200, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className="py-5 sm:py-6 flex flex-col items-center gap-1"
    >
      <span className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-zinc-900 dark:text-white tabular-nums">
        {count.toLocaleString("es-CL")}
        {stat.suffix}
      </span>
      <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500 text-center">
        {stat.label}
      </span>
    </motion.div>
  );
}

function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-10% 0px" });
  return (
    <div ref={ref} className="grid grid-cols-3 max-w-3xl mx-auto">
      {STATS.map((s, i) => (
        <StatItem key={s.label} stat={s} inView={inView} delay={i * 0.1} />
      ))}
    </div>
  );
}

function DeferredSection({ children }: { children: ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}

function FrameworkChip({
  id,
  label,
  onClick,
}: {
  id: string;
  label: string;
  onClick: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      className="inline-flex items-center gap-2 rounded-md border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-white/25 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
    >
      {label}
      <ArrowRight className="w-3.5 h-3.5 opacity-60" />
    </button>
  );
}

function DeadlineChip({
  icon: Icon,
  label,
  date,
}: {
  icon: LucideIcon;
  label: string;
  date: string;
}) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-md border border-amber-500/30 bg-amber-500/5 dark:border-amber-400/30 dark:bg-amber-400/5 px-4 py-2.5">
      <Icon className="w-4 h-4 text-amber-600 dark:text-amber-400" />
      <span className="text-sm font-medium tracking-tight text-zinc-900 dark:text-amber-100">
        {label}
      </span>
      <span className="text-xs text-zinc-500 dark:text-zinc-400">·</span>
      <span className="text-sm text-zinc-600 dark:text-zinc-300">{date}</span>
    </span>
  );
}

function FrameworkSection({
  fw,
  isLast,
}: {
  fw: Framework;
  isLast: boolean;
}) {
  const Icon = fw.icon;
  return (
    <section
      id={`fw-${fw.id}`}
      className="scroll-mt-24 max-w-7xl mx-auto px-6 py-16 md:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-10% 0px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16"
      >
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-2.5 rounded-md border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] px-3 py-1.5 mb-6">
            <Icon className="w-3.5 h-3.5 text-[#25327D] dark:text-amber-400" />
            <span className="text-[11px] uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400 font-medium">
              {fw.chip}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-zinc-900 dark:text-white leading-tight mb-5">
            {fw.title}
          </h2>
          <p className="text-sm text-amber-700 dark:text-amber-400 mb-6 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {fw.deadline}
          </p>
          <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed font-light">
            <span className="text-zinc-700 dark:text-zinc-300 font-medium">
              ¿A quién aplica?
            </span>{" "}
            {fw.appliesTo}
          </p>
        </div>

        <div className="lg:col-span-7">
          <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500 font-medium mb-5">
            Qué exige
          </p>
          <ul className="space-y-3 mb-10">
            {fw.requires.map((r) => (
              <li
                key={r}
                className="flex items-start gap-3 text-zinc-600 dark:text-zinc-300 text-base leading-relaxed font-light"
              >
                <ShieldCheck className="w-4 h-4 mt-1 text-[#25327D] dark:text-amber-400 shrink-0" />
                <span>{r}</span>
              </li>
            ))}
          </ul>

          <div className="border-l-2 border-rose-400/40 dark:border-rose-300/30 pl-5">
            <p className="text-[11px] uppercase tracking-[0.22em] text-rose-600 dark:text-rose-300 font-medium mb-2 flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5" />
              Costo de no cumplir
            </p>
            <p className="text-zinc-700 dark:text-zinc-200 text-base leading-relaxed font-light">
              {fw.cost}
            </p>
          </div>
        </div>
      </motion.div>

      {!isLast && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, margin: "-10% 0px" }}
          transition={{ duration: 1, ease: EASE }}
          className="h-px bg-zinc-200 dark:bg-zinc-800 origin-left mt-16 md:mt-24"
        />
      )}
    </section>
  );
}

export default function CompliancePage() {
  const scrollToFramework = (id: string) => {
    document
      .getElementById(`fw-${id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <PageMeta
        title="Cumplimiento Ley 21.663, Ley 21.719 e ISO 27001 · AMJ Ingeniería"
        description="Cumplimiento Ley 21.663, Ley 21.719 e ISO 27001 en Chile. AMJ Ingeniería acompaña diagnóstico, hoja de ruta, ejecución y evidencias para empresas."
        path="/compliance"
        jsonLd={COMPLIANCE_SCHEMA}
      />
      <ProgressiveBlur />
      <Nav />

      <main className="pt-24">
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

          <div className="relative max-w-7xl mx-auto px-6 pt-12 md:pt-16 pb-16 md:pb-24">
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

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-[11px] uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500 font-medium mb-6"
            >
              Cumplimiento normativo · Bitdefender Gold Partner
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              className="max-w-4xl text-5xl leading-[1.05] sm:text-6xl lg:text-[5.5rem] tracking-tight sm:leading-[0.96] text-balance"
            >
              <span className="block text-zinc-900 dark:text-white font-light">
                Cumple ahora.
              </span>
              <span className="block font-serif italic text-[#25327D] dark:text-amber-400 mt-2">
                Antes que la ley te alcance.
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <DeadlineChip
                icon={Calendar}
                label="OIV ANCI"
                date="vence junio 2026"
              />
              <DeadlineChip
                icon={Calendar}
                label="Ley 21.719"
                date="vence dic 2026"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
              className="mt-10 max-w-[40rem] text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed font-light"
            >
              Multas de hasta 10.000 UTM, pérdida de licitaciones públicas y
              exposición pública por incumplimiento. Te ayudamos a llegar a la
              fecha con cumplimiento Ley 21.663, Ley 21.719 e ISO 27001: hoja
              de ruta, ejecución acompañada y evidencias claras, sin reemplazar
              lo que ya funciona.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
              className="mt-10 flex flex-col items-start gap-4"
            >
              <button
                type="button"
                onClick={() => scrollToContact()}
                className="inline-flex min-h-[3.5rem] items-center justify-center gap-3 bg-gradient-to-r from-[#25327D] to-[#103A8F] text-white dark:from-amber-400 dark:to-amber-500 dark:text-zinc-900 px-8 py-4 rounded-md text-base font-medium hover:brightness-110 transition-all cursor-pointer"
              >
                Quiero mi diagnóstico de cumplimiento
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-sm bg-emerald-400" />
                Sin costo · Sin compromiso · Respuesta en 1 día hábil
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
              className="mt-16 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <span className="text-xs uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500">
                Marco que te aplica:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {FRAMEWORKS.map((fw) => (
                  <FrameworkChip
                    key={fw.id}
                    id={fw.id}
                    label={fw.chip}
                    onClick={scrollToFramework}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, margin: "-10% 0px" }}
            transition={{ duration: 1, ease: EASE }}
            className="h-px bg-zinc-200 dark:bg-zinc-800 origin-left"
          />
        </div>

        {FRAMEWORKS.map((fw, idx) => (
          <FrameworkSection
            key={fw.id}
            fw={fw}
            isLast={idx === FRAMEWORKS.length - 1}
          />
        ))}

        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, margin: "-10% 0px" }}
            transition={{ duration: 1, ease: EASE }}
            className="h-px bg-zinc-200 dark:bg-zinc-800 origin-left"
          />
        </div>

        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-3xl mb-12 md:mb-16"
          >
            <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500 font-medium mb-6">
              Cómo trabajamos
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-zinc-900 dark:text-white leading-tight">
              Cuatro fases.{" "}
              <span className="font-serif italic text-[#25327D] dark:text-amber-400">
                Sin sorpresas.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
            {PROCESS.map((step, idx) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-10% 0px" }}
                transition={{ duration: 0.7, delay: idx * 0.08, ease: EASE }}
              >
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xs uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500 tabular-nums">
                    {step.n}
                  </span>
                  <step.icon className="w-4 h-4 text-[#25327D] dark:text-amber-400" />
                </div>
                <h3 className="text-xl font-medium tracking-tight text-zinc-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-light">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16"
          >
            <div className="lg:col-span-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500 font-medium mb-6">
                Preguntas frecuentes
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-zinc-900 dark:text-white leading-tight">
                Lo mínimo que conviene aclarar{" "}
                <span className="font-serif italic text-[#25327D] dark:text-amber-400">
                  antes de partir.
                </span>
              </h2>
            </div>
            <div className="lg:col-span-7 divide-y divide-zinc-200 dark:divide-zinc-800">
              {FAQS.map((faq) => (
                <article key={faq.q} className="py-6 first:pt-0">
                  <h3 className="text-lg font-medium tracking-tight text-zinc-900 dark:text-white">
                    {faq.q}
                  </h3>
                  <p className="mt-3 text-zinc-500 dark:text-zinc-400 text-base leading-relaxed font-light">
                    {faq.a}
                  </p>
                </article>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-16 md:pb-24">
          <StatsStrip />
        </section>

        <DeferredSection>
          <AwardsMarquee />
        </DeferredSection>

        <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-center"
          >
            <h3 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-900 dark:text-white mb-4 max-w-2xl mx-auto">
              ¿Llegamos a tiempo a tu{" "}
              <span className="font-serif italic text-[#25327D] dark:text-amber-400">
                deadline
              </span>
              ?
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-base font-light mb-8 max-w-md mx-auto">
              Conversemos sobre tu marco aplicable, plazos reales y qué
              priorizar.
            </p>
            <button
              type="button"
              onClick={() => scrollToContact()}
              className="inline-flex min-h-[3.5rem] items-center justify-center gap-3 bg-gradient-to-r from-[#25327D] to-[#103A8F] text-white dark:from-amber-400 dark:to-amber-500 dark:text-zinc-900 px-8 py-4 rounded-md text-base font-medium hover:brightness-110 transition-all cursor-pointer"
            >
              Quiero mi diagnóstico de cumplimiento
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </section>

        <DeferredSection>
          <ContactFormD />
        </DeferredSection>
      </main>

      <DeferredSection>
        <Footer />
      </DeferredSection>
      <WhatsAppButton />
    </>
  );
}
