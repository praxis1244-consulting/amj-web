import ProgressiveBlur from "@/components/layout/ProgressiveBlur";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import CaseStudySection from "@/components/sections/CaseStudySection";
import ServicesSection from "@/components/sections/ServicesSection";
import LogoMarquee from "@/components/sections/LogoMarquee";
import SolutionsGrid from "@/components/sections/SolutionsGrid";
import ValuesSection from "@/components/sections/ValuesSection";
import ContactFormD from "@/components/sections/ContactFormD";

export default function HomePage() {
  return (
    <>
      <ProgressiveBlur />
      <Nav />
      <main className="pt-24">
        <HeroSection />
        <PhilosophySection />
        <CaseStudySection />
        <ServicesSection />
        <LogoMarquee />
        <SolutionsGrid />
        <ValuesSection />
        <ContactFormD />
      </main>
      <Footer />
    </>
  );
}
