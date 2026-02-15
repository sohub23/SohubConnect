import { Globe as GlobeIcon, Cloud, Wifi } from "lucide-react";
import { Globe } from "./Globe";

export default function SolutionSection() {
  const features = [
    {
      icon: GlobeIcon,
      title: "Borderless",
      description:
        "One system. One identity. Across cities, countries, continents.",
    },
    {
      icon: Cloud,
      title: "Cloud-native",
      description:
        "No buildings. No physical limits. Your PBX lives where your customers are.",
    },
    {
      icon: Wifi,
      title: "Internet-first",
      description:
        "Built for the modern web. No PSTN. No telecom operator dependency.",
    },
  ];

  return (
    <section className="py-20 md:py-24 px-6 bg-white dark:bg-[#121212]">
      <div className="max-w-6xl mx-auto">
        {/* Hero with Globe */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 mb-16">
          {/* Left Content */}
          <div className="flex-1 text-left space-y-6 lg:space-y-8">
            <div className="inline-flex items-center space-x-2 bg-[#DCFCE7] dark:bg-[#22C55E]/20 border border-[#22C55E] rounded-full px-4 py-2">
              <GlobeIcon size={14} className="text-[#16A34A] dark:text-[#22C55E]" />
              <span className="font-inter font-semibold text-xs text-[#16A34A] dark:text-[#22C55E]">
                Our Breakthrough
              </span>
            </div>
            
            <h2 className="font-plus-jakarta-sans font-bold text-[32px] sm:text-[40px] md:text-4xl lg:text-5xl text-[#111111] dark:text-white leading-tight">
              What If PBX Was <span className="text-[#22C55E]">Global?</span>
            </h2>
            
            <p className="font-inter text-base sm:text-lg text-[#525252] dark:text-white dark:text-opacity-70 leading-relaxed">
              Not inside a building. Not tied to a location. But available anywhere on the globe.
            </p>

            {/* Features List */}
            <div className="space-y-4 sm:space-y-6 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#22C55E] rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon size={20} className="sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-inter font-bold text-lg sm:text-xl text-[#111111] dark:text-white mb-1 sm:mb-2">
                      {feature.title}
                    </h3>
                    <p className="font-inter text-sm sm:text-base text-[#525252] dark:text-white dark:text-opacity-70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Globe */}
          <div className="flex-1 relative h-[300px] sm:h-[400px] lg:h-[500px] w-full overflow-hidden">
            <Globe className="scale-100" />
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="font-inter text-lg sm:text-xl lg:text-2xl text-[#111111] dark:text-white font-semibold">
            A PBX that lives where your customers already are.
          </p>
        </div>
      </div>
    </section>
  );
}
