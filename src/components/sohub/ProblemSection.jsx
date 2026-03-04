import { AlertCircle, XCircle } from "lucide-react";

export default function ProblemSection() {
  const problems = [
    {
      title: "Trust breaks",
      description: "Personal numbers feel risky",
      icon: "🔐",
    },
    {
      title: "Privacy breaks",
      description: "Business and personal life mix",
      icon: "👤",
    },
    {
      title: "Sales break",
      description: "Slow response means lost customers",
      icon: "📉",
    },
  ];

  const oldWay = [
    "Personal mobile numbers",
    "Missed calls",
    "WhatsApp voice calls",
    "Late responses",
  ];

  return (
    <section id="pbx" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-[#FAFAFA] dark:bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow */}
        <div className="problem-badge inline-flex items-center space-x-2 rounded-full px-4 py-2 mb-6">
          <AlertCircle size={14} />
          <span className="font-inter font-semibold text-xs">
            The Problem
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-plus-jakarta-sans font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#111111] dark:text-white leading-tight mb-4 sm:mb-6 max-w-3xl">
          PBX Was Never Meant to Be This Small
        </h2>

        {/* Sub-copy */}
        <p className="font-inter text-base sm:text-lg text-[#525252] dark:text-white dark:text-opacity-70 leading-relaxed max-w-3xl mb-8 sm:mb-12">
          For decades, PBX systems were designed for one building, sometimes
          two. They lived behind walls, cables, and local operators. But
          businesses changed. Customers changed. The internet changed.{" "}
          <span className="font-semibold text-[#111111] dark:text-white">
            PBX didn't.
          </span>
        </p>

        {/* Bangladesh Context */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Left: Old Way */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="font-inter font-bold text-lg sm:text-xl text-[#111111] dark:text-white mb-4">
              In Bangladesh, most SOHO and e-commerce businesses still depend
              on:
            </h3>
            <div className="space-y-3">
              {oldWay.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <XCircle size={20} className="text-red-500 flex-shrink-0" />
                  <span className="font-inter text-base text-[#525252] dark:text-white dark:text-opacity-87">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Three Silent Killers */}
          <div>
            <h3 className="font-inter font-bold text-lg sm:text-xl text-[#111111] dark:text-white mb-4 sm:mb-6">
              This creates three silent killers:
            </h3>
            <div className="space-y-4">
              {problems.map((problem, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-[#1E1E1E] rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-700 transition-all duration-200"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl sm:text-3xl">{problem.icon}</div>
                    <div>
                      <h4 className="font-inter font-semibold text-base sm:text-lg text-[#111111] dark:text-white mb-1">
                        {problem.title}
                      </h4>
                      <p className="font-inter text-sm text-[#6B7280] dark:text-white dark:text-opacity-70">
                        {problem.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mt-8 sm:mt-12 text-center">
          <p className="font-inter text-lg sm:text-xl text-[#111111] dark:text-white font-semibold">
            Businesses deserve better.
          </p>
        </div>
      </div>
    </section>
  );
}
