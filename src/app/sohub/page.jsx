import Header from "../../components/sohub/Header";
import Hero from "../../components/sohub/Hero";
import ProblemSection from "../../components/sohub/ProblemSection";
import SolutionSection from "../../components/sohub/SolutionSection";
import FeaturesSection from "../../components/sohub/FeaturesSection";
import PricingSection from "../../components/sohub/PricingSection";
import CTASection from "../../components/sohub/CTASection";
import Footer from "../../components/sohub/Footer";
import { ThemeProvider } from "../../components/sohub/ThemeProvider";

export default function SOHUBConnectPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-[#121212]">
        <Header />
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <PricingSection />
        <CTASection />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
