import { Zap } from "lucide-react";

const FEATURES_SCROLL_FALLBACK_OFFSET = 124;
const FEATURES_SCROLL_EXTRA_GAP = 20;

export default function Hero() {
  const getFeaturesScrollOffset = () => {
    const header = document.querySelector('header');
    if (!(header instanceof HTMLElement)) {
      return FEATURES_SCROLL_FALLBACK_OFFSET;
    }

    return Math.ceil(header.getBoundingClientRect().height) + FEATURES_SCROLL_EXTRA_GAP;
  };

  const scrollToFeatures = () => {
    const element = document.getElementById('features');
    if (!element) {
      return;
    }

    const targetY = window.scrollY + element.getBoundingClientRect().top - getFeaturesScrollOffset();
    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: 'smooth',
    });
  };

  return (
    <section className="w-full bg-white dark:bg-[#121212] pt-6 sm:pt-10 md:pt-8 lg:pt-10 pb-10 sm:pb-12 md:pb-14 lg:pb-16">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="md:min-h-[calc(100vh-112px)] md:flex md:items-center">
          {/* Hero Content - Centered */}
          <div className="text-center space-y-6 sm:space-y-8 max-w-5xl mx-auto">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center space-x-2 bg-[#22C55E] border border-[#22C55E] rounded-full px-4 py-2">
              <Zap size={14} className="text-[#FFFFFF]" />
              <span className="font-inter font-semibold text-xs text-[#FFFFFF]">
                Revolutionary PBX System
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-plus-jakarta-sans font-bold text-[#111111] dark:text-white leading-[1.15] text-[32px] sm:text-4xl md:text-5xl lg:text-6xl px-2">
              Razin, <span className="text-[#22C55E]">Without Boundaries.</span>
              <br />
              <span className="text-[#22C55E]">Without <span className="text-[#111111] dark:text-white">Phone</span> Numbers.</span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="font-inter text-[#525252] dark:text-white dark:text-opacity-70 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto px-2">
              A borderless, cloud-native PBX built for real customer conversations in Bangladesh.
              One click. Instant conversation. No numbers. No waiting.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 px-4">
              <a
                href="https://connect-client.sohub.com.bd/authentication/register"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#22C55E] text-white font-inter font-semibold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-[#16A34A] active:bg-[#15803D] active:scale-95 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:ring-opacity-60 min-h-[48px] sm:min-h-[52px] shadow-lg shadow-[#22C55E]/30"
              >
                <span>Start Now</span>
              </a>
              <a
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToFeatures();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white dark:bg-[#1E1E1E] text-[#111111] dark:text-white font-inter font-semibold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 border-gray-200 dark:border-gray-700 hover:border-[#22C55E] dark:hover:border-[#22C55E] active:scale-95 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:ring-opacity-60 min-h-[48px] sm:min-h-[52px] cursor-pointer"
              >
                <span>See How It Works</span>
              </a>
            </div>

            {/* Trust badges */}
            <div className="pt-4 sm:pt-6 md:pt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 text-[11px] sm:text-xs md:text-sm text-[#6B7280] dark:text-white dark:text-opacity-60 font-inter px-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#22C55E] rounded-full"></div>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#22C55E] rounded-full"></div>
                <span>Built for Bangladesh</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#22C55E] rounded-full"></div>
                <span>Free forever plan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Demo - Browser mockup */}
        <div className="mt-8 sm:mt-10 md:mt-14 lg:mt-16 relative max-w-5xl mx-auto">
          <div className="relative bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E5E7EB] dark:border-gray-700 shadow-2xl overflow-hidden browser-mockup">
            {/* Browser Chrome */}
            <div className="flex items-center px-4 py-3 bg-[#F9FAFB] dark:bg-[#262626] border-b border-[#E5E7EB] dark:border-gray-700">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
                <div className="w-3 h-3 rounded-full bg-[#22C55E]"></div>
              </div>
              <div className="flex-1 flex justify-center px-2">
                <div className="bg-white dark:bg-[#1E1E1E] rounded-md px-2 sm:px-3 py-1 text-[10px] sm:text-xs text-[#737373] dark:text-white dark:text-opacity-60 border border-[#E5E7EB] dark:border-gray-600 truncate max-w-[180px] sm:max-w-none">
                  https://connect-client.sohub.com.bd/authentication
                </div>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="aspect-[1901/912] bg-[#F3F4F6] dark:bg-[#0A0A0A] dashboard-preview">
              <img
                src="/images/Dashboard_new.png"
                alt="Dashboard Preview"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
