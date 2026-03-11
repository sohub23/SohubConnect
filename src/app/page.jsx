import Header from "../components/sohub/Header";
import Hero from "../components/sohub/Hero";
import ProblemSection from "../components/sohub/ProblemSection";
import SolutionSection from "../components/sohub/SolutionSection";
import FeaturesSection from "../components/sohub/FeaturesSection";
import PricingSection from "../components/sohub/PricingSection";
import FAQSection from "../components/sohub/FAQSection";
import CTASection from "../components/sohub/CTASection";
import OurInitiatives from "../components/sohub/OurInitiatives";
import Footer from "../components/sohub/Footer";
import { ThemeProvider } from "../components/sohub/ThemeProvider";

export default function Page() {
  return (
    <ThemeProvider>
      <main className="min-h-screen bg-white dark:bg-[#121212]">
        <Header />
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
        <OurInitiatives />
        <Footer />
      </main>
    </ThemeProvider>
  );
}
