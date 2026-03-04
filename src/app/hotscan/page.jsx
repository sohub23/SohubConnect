import Header from "../../components/sohub/Header";
import Footer from "../../components/sohub/Footer";
import { ThemeProvider } from "../../components/sohub/ThemeProvider";
import HeroSection from "../../components/hotscan/HeroSection.jsx";
import ProblemSection from "../../components/hotscan/ProblemSection.jsx";
import SolutionSection from "../../components/hotscan/SolutionSection.jsx";
import HowItWorks from "../../components/hotscan/HowItWorks.jsx";
import DifferenceSection from "../../components/hotscan/DifferenceSection.jsx";
import WhyVoice from "../../components/hotscan/WhyVoice.jsx";
import CTASection from "../../components/hotscan/CTASection.jsx";
import FeatureSections from "../../components/sohub/FeatureSections.jsx";

export default function HotScanPage() {
  return (
    <ThemeProvider>
      <main className="min-h-screen bg-white dark:bg-[#121212]">
        <Header />
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <HowItWorks />
        <DifferenceSection />
        <WhyVoice />
        <FeatureSections />
        <CTASection />
        <Footer />
      </main>
    </ThemeProvider>
  );
}
