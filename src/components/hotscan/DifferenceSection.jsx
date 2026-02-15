export default function DifferenceSection() {
  const features = [
    "Voice-first connection",
    "No SIM or app required for customers",
    "Works on all modern smartphones",
    "Secure and reliable call routing"
  ];

  return (
    <section className="py-12 md:py-16 px-6 bg-[#FAFAFA] dark:bg-[#121212]">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <h2 className="font-plus-jakarta-sans font-bold text-[32px] sm:text-[40px] md:text-[48px] text-[#111111] dark:text-white leading-tight">
          What Makes HotScan <span className="text-[#22C55E]">Different</span>
        </h2>
        
        <p className="font-inter text-lg sm:text-xl text-[#525252] dark:text-white dark:text-opacity-70">
          Designed for real-time engagement
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#22C55E] rounded-full flex-shrink-0"></div>
                <p className="font-inter text-base sm:text-lg text-[#111111] dark:text-white font-semibold text-left">
                  {feature}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="font-inter text-lg sm:text-xl text-[#111111] dark:text-white font-semibold pt-8">
          HotScan is built for moments when timing matters.
        </p>
      </div>
    </section>
  );
}
