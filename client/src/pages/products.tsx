import ProgressiveBlur from "@/components/layout/ProgressiveBlur";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ProductHeroSection from "@/components/sections/ProductHeroSection";
import ConsoleDashboardSection from "@/components/sections/ConsoleDashboardSection";
import FeaturesScrollSection from "@/components/sections/FeaturesScrollSection";
import AwardsMarquee from "@/components/sections/AwardsMarquee";
import PlansSection from "@/components/sections/PlansSection";
import WhyAmjSection from "@/components/sections/WhyAmjSection";
import ContactForm from "@/components/sections/ContactForm";

export default function ProductsPage() {
  return (
    <>
      <ProgressiveBlur />
      <Nav />
      <main>
        <ProductHeroSection />
        <ConsoleDashboardSection />
        <FeaturesScrollSection />
        <AwardsMarquee />
        <PlansSection />
        <WhyAmjSection />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
