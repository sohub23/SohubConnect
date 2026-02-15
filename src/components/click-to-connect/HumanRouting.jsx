export default function HumanRouting() {
  const features = [
    "Team-based call routing",
    "Real-time availability",
    "Call history and analytics"
  ];

  return (
    <section className="py-12 md:py-16 px-6 bg-[#FAFAFA] dark:bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="font-plus-jakarta-sans font-bold text-3xl md:text-4xl text-[#111111] dark:text-white text-center">
            Designed for teams
          </h2>
          <p className="font-inter text-lg text-[#525252] dark:text-white dark:text-opacity-70 text-center">
            Calls don't go to one person. They go to your team.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white dark:bg-[#1E1E1E] rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="w-2 h-2 bg-[#22C55E] rounded-full flex-shrink-0"></div>
                <span className="font-inter text-sm text-[#111111] dark:text-white">{feature}</span>
              </div>
            ))}
          </div>
          <p className="font-inter text-lg text-[#525252] dark:text-white dark:text-opacity-70 text-center pt-6">
            Everyone stays connected. No one gets overloaded.
          </p>
        </div>
      </div>
    </section>
  );
}
