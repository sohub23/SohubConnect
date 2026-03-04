import { Phone, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full bg-white dark:bg-[#121212] py-6 sm:py-10 md:py-14 lg:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
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
            PBX, <span className="text-[#22C55E]">Without Boundaries.</span>
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
              href="https://connect.sohub.com.bd/authentication/register"
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
                const element = document.getElementById('features');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
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
                  https://connect.sohub.com.bd/authentication
                </div>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="aspect-[16/9] bg-[#F3F4F6] dark:bg-[#0A0A0A] p-4 sm:p-6 md:p-8 dashboard-preview">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3">
                <div>
                  <h3 className="font-inter font-bold text-lg sm:text-xl md:text-2xl text-[#111111] dark:text-white mb-1">
                    Welcome to SOHUB Connect
                  </h3>
                  <p className="font-inter text-xs sm:text-sm text-[#6B7280] dark:text-white dark:text-opacity-70">
                    Your global PBX, ready in seconds
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-white dark:bg-[#1E1E1E] rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 dark:border-gray-700">
                    <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></div>
                    <span className="font-inter text-xs sm:text-sm text-[#111111] dark:text-white">
                      Online
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {/* Click-to-Call Card */}
                <div className="bg-white dark:bg-[#1E1E1E] rounded-xl p-4 sm:p-5 md:p-6 border border-gray-200 dark:border-gray-700 hover:border-[#22C55E] dark:hover:border-[#22C55E] transition-all duration-200 cursor-pointer">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#DCFCE7] dark:bg-[#22C55E]/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <Phone size={18} className="text-[#22C55E] sm:w-5 sm:h-5" />
                  </div>
                  <h4 className="font-inter font-semibold text-sm sm:text-base text-[#111111] dark:text-white mb-1 sm:mb-2">
                    Start talking instantly
                  </h4>
                  <p className="font-inter text-xs sm:text-sm text-[#6B7280] dark:text-white dark:text-opacity-70">
                    3 buttons active
                  </p>
                </div>

                {/* HotScan Card */}
                <div className="bg-white dark:bg-[#1E1E1E] rounded-xl p-4 sm:p-5 md:p-6 border border-gray-200 dark:border-gray-700 hover:border-[#22C55E] dark:hover:border-[#22C55E] transition-all duration-200 cursor-pointer">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#DCFCE7] dark:bg-[#22C55E]/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-[#22C55E]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="7"
                        height="7"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <rect
                        x="14"
                        y="3"
                        width="7"
                        height="7"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <rect
                        x="14"
                        y="14"
                        width="7"
                        height="7"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <rect
                        x="3"
                        y="14"
                        width="7"
                        height="7"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h4 className="font-inter font-semibold text-sm sm:text-base text-[#111111] dark:text-white mb-1 sm:mb-2">
                    HotScan™ QR
                  </h4>
                  <p className="font-inter text-xs sm:text-sm text-[#6B7280] dark:text-white dark:text-opacity-70">
                    2 codes generated
                  </p>
                </div>

                {/* Team Card */}
                <div className="bg-white dark:bg-[#1E1E1E] rounded-xl p-4 sm:p-5 md:p-6 border border-gray-200 dark:border-gray-700 hover:border-[#22C55E] dark:hover:border-[#22C55E] transition-all duration-200 cursor-pointer">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#DCFCE7] dark:bg-[#22C55E]/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-[#22C55E]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-inter font-semibold text-sm sm:text-base text-[#111111] dark:text-white mb-1 sm:mb-2">
                    Team
                  </h4>
                  <p className="font-inter text-xs sm:text-sm text-[#6B7280] dark:text-white dark:text-opacity-70">
                    5 members
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
