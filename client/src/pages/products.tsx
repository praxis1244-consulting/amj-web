import { Suspense, lazy, type ReactNode } from "react";
import Nav from "@/components/layout/Nav";
import PageMeta from "@/components/seo/PageMeta";
import ProgressiveBlur from "@/components/layout/ProgressiveBlur";
import ProductHeroSection from "@/components/sections/ProductHeroSection";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const FeaturesScrollSection = lazy(() => import("@/components/sections/FeaturesScrollSection"));
const AwardsMarquee = lazy(() => import("@/components/sections/AwardsMarquee"));
const PlansSection = lazy(() => import("@/components/sections/PlansSection"));
const WhyAmjSection = lazy(() => import("@/components/sections/WhyAmjSection"));
const ContactFormD = lazy(() => import("@/components/sections/ContactFormD"));
const Footer = lazy(() => import("@/components/layout/Footer"));

const PRODUCTS_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Protección de Endpoints para Empresas",
    serviceType: "Protección de endpoints, servidores y cargas empresariales",
    provider: {
      "@type": "Organization",
      name: "AMJ Ingeniería",
      url: "https://amjingenieria.cl/",
    },
    areaServed: "Chile",
    availableLanguage: "es-CL",
    url: "https://amjingenieria.cl/productos",
    description:
      "Protección de endpoints, servidores y cargas empresariales con soporte local, acompañamiento operativo y respuesta ante amenazas.",
  },
];

function DeferredSection({ children }: { children: ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}

export default function ProductsPage() {
  return (
    <>
      <PageMeta
        title="Protección de Endpoints con soporte local — AMJ Ingeniería"
        description="Protección de endpoints, servidores y cargas empresariales con soporte local, monitoreo operativo y acompañamiento experto en Chile."
        path="/productos"
        jsonLd={PRODUCTS_SCHEMA}
      />
      <ProgressiveBlur />
      <Nav />
      <main>
        <ProductHeroSection />
        <DeferredSection>
          <FeaturesScrollSection />
        </DeferredSection>
        <DeferredSection>
          <AwardsMarquee />
        </DeferredSection>
        <DeferredSection>
          <PlansSection />
        </DeferredSection>
        <DeferredSection>
          <WhyAmjSection />
        </DeferredSection>
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
