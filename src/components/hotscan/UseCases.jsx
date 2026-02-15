export default function UseCases() {
  const useCases = [
    "Store counters and showrooms",
    "Restaurants and cafes",
    "Events and exhibitions",
    "Product packaging",
    "Reception desks and posters"
  ];

  return (
    <section className="py-20 md:py-24 px-6 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <h2 className="font-plus-jakarta-sans font-bold text-[32px] sm:text-[40px] md:text-[48px] text-[#111111] dark:text-white leading-tight">
          Use Cases
        </h2>
        
        <p className="font-inter text-lg sm:text-xl text-[#525252] dark:text-white dark:text-opacity-70">
          Where HotScan works best
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-8">
          {useCases.map((useCase, index) => (
            <div key={index} className="bg-[#FAFAFA] dark:bg-[#1A1A1A] rounded-xl p-6 hover:border-[#22C55E] border-2 border-transparent transition-all duration-200">
              <p className="font-inter text-base sm:text-lg text-[#111111] dark:text-white font-semibold">
                {useCase}
              </p>
            </div>
          ))}
        </div>

        <p className="font-inter text-lg sm:text-xl text-[#111111] dark:text-white font-semibold pt-8">
          Anywhere customers are ready to talk.
        </p>
      </div>
    </section>
  );
}
