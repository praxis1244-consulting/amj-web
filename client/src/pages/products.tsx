import { useEffect } from "react";
import ProgressiveBlur from "@/components/layout/ProgressiveBlur";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ProductHeroSection from "@/components/sections/ProductHeroSection";
import FeaturesScrollSection from "@/components/sections/FeaturesScrollSection";
import AwardsMarquee from "@/components/sections/AwardsMarquee";
import PlansSection from "@/components/sections/PlansSection";
import WhyAmjSection from "@/components/sections/WhyAmjSection";
import ContactFormD from "@/components/sections/ContactFormD";

export default function ProductsPage() {
  useEffect(() => {
    document.title = "Bitdefender GravityZone — AMJ Ingeniería";
    return () => { document.title = "AMJ Ingeniería — Ciberseguridad Empresarial"; };
  }, []);
  return (
    <>
      <ProgressiveBlur />
      <Nav />
      <main>
        <ProductHeroSection />
        <FeaturesScrollSection />
        <AwardsMarquee />
        <PlansSection />
        <WhyAmjSection />
        <ContactFormD />
      </main>
      <Footer />
    </>
  );
}
