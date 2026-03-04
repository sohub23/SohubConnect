export default function HeroSection() {
  return (
    <section className="w-full bg-white dark:bg-[#121212] py-8 sm:py-10 md:py-12 lg:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="text-center space-y-6 sm:space-y-8 max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-[#22C55E]/10 dark:bg-[#22C55E]/20 border border-[#22C55E]/30 dark:border-[#22C55E]/40 rounded-full px-4 py-2">
            <span className="font-inter font-semibold text-xs text-[#22C55E]">
              Turn scans into conversations
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-plus-jakarta-sans font-bold text-[#111111] dark:text-white leading-tight text-[32px] sm:text-[40px] md:text-5xl lg:text-6xl xl:text-7xl px-2">
            <span className="text-[#22C55E]">HotScan</span>
          </h1>

          {/* Subheadline */}
          <p className="font-inter text-[#111111] dark:text-white text-lg sm:text-xl md:text-2xl font-medium max-w-2xl mx-auto px-2">
            Instant voice connection from any physical touchpoint
          </p>

          {/* Description */}
          <p className="font-inter text-[#525252] dark:text-white dark:text-opacity-70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            Turn QR scans into real-time conversations — without apps or setup.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 px-4">
            <a
              href="https://connect.sohub.com.bd/authentication/register"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#22C55E] text-white font-inter font-semibold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-[#16A34A] active:scale-95 transition-all duration-200 shadow-lg shadow-[#22C55E]/30"
            >
              Create HotScan
            </a>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-black dark:bg-black text-white font-inter font-semibold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-gray-900 active:scale-95 transition-all duration-200 cursor-pointer hotscan-button"
            >
              See how it works
            </a>
          </div>

          <p className="font-inter text-xs sm:text-sm text-[#22C55E] font-semibold">
            Included in FREE FOREVER (up to 5 users)
          </p>

          {/* Trust badges */}
          <div className="pt-6 sm:pt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#6B7280] dark:text-white dark:text-opacity-60 font-inter">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#22C55E] rounded-full"></div>
              <span>Works on any smartphone</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#22C55E] rounded-full"></div>
              <span>No downloads. No friction.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
