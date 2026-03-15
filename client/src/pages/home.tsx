import { Suspense, lazy, type ReactNode } from "react";
import Nav from "@/components/layout/Nav";
import PageMeta from "@/components/seo/PageMeta";
import ProgressiveBlur from "@/components/layout/ProgressiveBlur";
import HeroSection from "@/components/sections/HeroSection";

const PhilosophySection = lazy(() => import("@/components/sections/PhilosophySection"));
const CaseStudySection = lazy(() => import("@/components/sections/CaseStudySection"));
const ServicesSection = lazy(() => import("@/components/sections/ServicesSection"));
const SolutionsGrid = lazy(() => import("@/components/sections/SolutionsGrid"));
const ValuesSection = lazy(() => import("@/components/sections/ValuesSection"));
const ContactFormD = lazy(() => import("@/components/sections/ContactFormD"));
const Footer = lazy(() => import("@/components/layout/Footer"));

const HOME_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "AMJ Ingeniería",
    url: "https://amjingenieria.cl/",
    image: "https://amjingenieria.cl/logo-iso.png",
    telephone: "+56 9 4524 1309",
    email: "ventas@amjingenieria.cl",
    description:
      "Consultoría, implementación y operación de ciberseguridad para empresas en Chile con acompañamiento local y plataformas líderes.",
    areaServed: "Chile",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Nueva Tajamar 481, T Norte, Of 303",
      addressLocality: "Las Condes",
      addressRegion: "Santiago",
      addressCountry: "CL",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AMJ Ingeniería",
    url: "https://amjingenieria.cl/",
    inLanguage: "es-CL",
  },
];

function DeferredSection({ children }: { children: ReactNode }) {
  return (
    <div className="content-auto">
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <PageMeta
        title="AMJ Ingeniería — Ciberseguridad para Empresas en Chile"
        description="AMJ Ingeniería: consultoría, implementación y operación de ciberseguridad para empresas en Chile. Plataformas líderes de protección. 15+ años de experiencia."
        path="/"
        jsonLd={HOME_SCHEMA}
      />
      <ProgressiveBlur />
      <Nav />
      <main className="pt-24">
        <HeroSection />
        <DeferredSection>
          <PhilosophySection />
        </DeferredSection>
        <DeferredSection>
          <CaseStudySection />
        </DeferredSection>
        <DeferredSection>
          <ServicesSection />
        </DeferredSection>
        <DeferredSection>
          <SolutionsGrid />
        </DeferredSection>
        <DeferredSection>
          <ValuesSection />
        </DeferredSection>
        <DeferredSection>
          <ContactFormD />
        </DeferredSection>
      </main>
      <DeferredSection>
        <Footer />
      </DeferredSection>
    </>
  );
}
