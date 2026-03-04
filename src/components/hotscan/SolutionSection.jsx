export default function SolutionSection() {
  return (
    <section className="py-10 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-6 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto text-center space-y-8 sm:space-y-10 md:space-y-12">
        <h2 className="font-plus-jakarta-sans font-bold text-[24px] sm:text-[28px] md:text-[36px] lg:text-[48px] text-[#111111] dark:text-white leading-tight px-2">
          HotScan enables <span className="text-[#22C55E]">instant voice conversations</span>
        </h2>
        
        <p className="font-inter text-base sm:text-lg md:text-xl text-[#525252] dark:text-white dark:text-opacity-70 max-w-3xl mx-auto px-2">
          HotScan lets customers scan a QR code and start a live voice call immediately.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 pt-6 sm:pt-8">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-[#22C55E] rounded-full"></div>
            <p className="font-inter text-base sm:text-lg md:text-xl text-[#111111] dark:text-white font-semibold">
              No apps
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-[#22C55E] rounded-full"></div>
            <p className="font-inter text-base sm:text-lg md:text-xl text-[#111111] dark:text-white font-semibold">
              No waiting
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-[#22C55E] rounded-full"></div>
            <p className="font-inter text-base sm:text-lg md:text-xl text-[#111111] dark:text-white font-semibold">
              Just direct communication
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
