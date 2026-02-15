export default function HeroSection() {
  return (
    <section className="w-full bg-white dark:bg-[#121212] py-12 md:py-16">
      <div className="max-w-[1240px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center space-y-8 max-w-5xl mx-auto">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center space-x-2 bg-[#22C55E]/10 dark:bg-[#22C55E]/20 border border-[#22C55E]/30 dark:border-[#22C55E]/40 rounded-full px-4 py-2">
            <svg className="w-3.5 h-3.5 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <span className="font-inter font-semibold text-xs text-[#22C55E]">
              Click to Connect
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-plus-jakarta-sans font-bold text-[#111111] dark:text-white leading-tight text-[40px] sm:text-5xl md:text-6xl lg:text-7xl">
            Click to <span className="text-[#22C55E]">Connect</span>
          </h1>

          {/* Supporting Paragraph */}
          <p className="font-inter text-[#525252] dark:text-white dark:text-opacity-70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            Start the conversation the moment intent appears
          </p>

          {/* Sub-headline */}
          <p className="font-inter text-[#111111] dark:text-white text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            One click connects your customer to a real human voice.<br />
            No phone numbers. No dialing. No waiting.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4">
            <a
              href="https://connect.sohub.com.bd/authentication/register"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#22C55E] text-white font-inter font-semibold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-[#16A34A] active:bg-[#15803D] active:scale-95 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:ring-opacity-60 shadow-lg shadow-[#22C55E]/30"
            >
              <span>Get started</span>
            </a>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white dark:bg-[#1E1E1E] text-[#111111] dark:text-white font-inter font-semibold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 border-gray-200 dark:border-gray-700 hover:border-[#22C55E] dark:hover:border-[#22C55E] active:scale-95 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:ring-opacity-60 cursor-pointer"
            >
              <span>See how it works</span>
            </a>
          </div>

          {/* Trust badges */}
          <div className="pt-6 sm:pt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#6B7280] dark:text-white dark:text-opacity-60 font-inter">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#22C55E] rounded-full"></div>
              <span>Ready in minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#22C55E] rounded-full"></div>
              <span>No setup. No hardware.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
