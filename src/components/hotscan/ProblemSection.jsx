export default function ProblemSection() {
  return (
    <section className="py-10 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-6 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-8 sm:space-y-10 md:space-y-12">
          {/* Heading */}
          <h2 className="font-plus-jakarta-sans font-bold text-[24px] sm:text-[28px] md:text-[36px] lg:text-[48px] leading-tight px-2">
            <span className="text-[#111111] dark:text-white">Offline interest often</span>
            <br />
            <span className="text-[#22C55E]">ends too early</span>
          </h2>
          
          {/* Content */}
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
            <p className="font-inter text-base sm:text-lg md:text-xl text-[#525252] dark:text-white dark:text-opacity-70">
              Customers see your brand in the real world — on posters, counters, packaging, or events.
              But when they want to talk, the connection usually stops at information.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2 sm:pt-4">
              <div className="bg-[#FAFAFA] dark:bg-[#1A1A1A] rounded-xl p-4 sm:p-5 md:p-6">
                <p className="font-inter text-sm sm:text-base md:text-lg text-[#111111] dark:text-white font-semibold">
                  Web pages don't answer questions.
                </p>
              </div>
              <div className="bg-[#FAFAFA] dark:bg-[#1A1A1A] rounded-xl p-4 sm:p-5 md:p-6">
                <p className="font-inter text-base sm:text-lg text-[#111111] dark:text-white font-semibold">
                  Forms don't respond instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
