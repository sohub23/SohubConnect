export default function PauseProblem() {
  return (
    <section className="py-12 md:py-16 px-6 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-12">
          {/* Heading */}
          <h2 className="font-plus-jakarta-sans font-bold text-[32px] sm:text-[40px] md:text-[48px] leading-tight">
            <span className="text-[#111111] dark:text-white">When customers want to talk,</span>
            <br />
            <span className="text-[#22C55E]">every second matters</span>
          </h2>
          
          {/* Problem List and Impact - Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto items-center">
            {/* Left: Problem List */}
            <div className="space-y-6">
              <p className="font-inter text-base sm:text-lg md:text-xl text-[#525252] dark:text-white dark:text-opacity-70">
                Most businesses still ask customers to:
              </p>
              <div className="bg-[#FAFAFA] dark:bg-[#1A1A1A] rounded-xl sm:rounded-2xl p-6 sm:p-8 space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-[#22C55E] rounded-full flex-shrink-0"></div>
                  <p className="font-inter text-base sm:text-lg md:text-xl text-[#111111] dark:text-white">Find a phone number</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-[#22C55E] rounded-full flex-shrink-0"></div>
                  <p className="font-inter text-base sm:text-lg md:text-xl text-[#111111] dark:text-white">Dial manually</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-[#22C55E] rounded-full flex-shrink-0"></div>
                  <p className="font-inter text-base sm:text-lg md:text-xl text-[#111111] dark:text-white">Wait, retry, or give up</p>
                </div>
              </div>
            </div>

            {/* Right: Impact Statement */}
            <div className="space-y-4">
              <p className="font-inter text-base sm:text-lg md:text-xl text-[#6B7280] dark:text-white dark:text-opacity-60">
                Every extra step creates friction.
              </p>
              <p className="font-inter text-base sm:text-lg md:text-xl text-[#6B7280] dark:text-white dark:text-opacity-60">
                Every second of delay loses trust.
              </p>
            </div>
          </div>
          
          {/* Final Statement */}
          <div className="pt-8">
            <p className="font-inter text-lg sm:text-xl md:text-2xl text-[#111111] dark:text-white font-semibold">
              Click to Connect removes everything between intent and conversation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
