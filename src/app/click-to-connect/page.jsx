import Header from "../../components/sohub/Header";
import Footer from "../../components/sohub/Footer";
import { ThemeProvider } from "../../components/sohub/ThemeProvider";
import HeroSection from "../../components/click-to-connect/HeroSection";
import PauseProblem from "../../components/click-to-connect/PauseProblem";
import WhatItIs from "../../components/click-to-connect/WhatItIs";
import HowItWorks from "../../components/click-to-connect/HowItWorks";
import CalmCTA from "../../components/click-to-connect/CalmCTA";
import FeatureSections from "../../components/sohub/FeatureSections.jsx";

export default function ClickToConnectPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <HeroSection />
        <PauseProblem />
        <WhatItIs />
        <HowItWorks />
        <FeatureSections />
        <CalmCTA />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
