export default function WhereItLives() {
  const places = [
    "Homepages",
    "Product pages",
    "Checkout pages",
    "Support pages",
    "Landing pages"
  ];

  return (
    <section className="py-12 md:py-16 px-6 bg-white dark:bg-[#121212]">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="font-plus-jakarta-sans font-bold text-3xl md:text-4xl text-[#111111] dark:text-white text-center">
            Where Click to Connect works
          </h2>
          <p className="font-inter text-lg text-[#525252] dark:text-white dark:text-opacity-70 text-center">
            Place the button wherever conversations start:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {places.map((place, index) => (
              <div key={index} className="flex items-center space-x-3 bg-[#FAFAFA] dark:bg-[#1E1E1E] rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="w-2 h-2 bg-[#22C55E] rounded-full flex-shrink-0"></div>
                <span className="font-inter text-base text-[#111111] dark:text-white">{place}</span>
              </div>
            ))}
          </div>
          <p className="font-inter text-lg text-[#525252] dark:text-white dark:text-opacity-70 text-center pt-6">
            Anywhere your customer has a question — one click is enough.
          </p>
        </div>
      </div>
    </section>
  );
}
