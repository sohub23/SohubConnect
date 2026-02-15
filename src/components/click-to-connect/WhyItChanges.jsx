import { Zap, Shield, TrendingUp, Users } from "lucide-react";

export default function WhyItChanges() {
  const benefits = [
    {
      icon: Zap,
      title: "Faster responses",
      description: "Customers connect instantly. No missed calls."
    },
    {
      icon: Shield,
      title: "Higher trust",
      description: "No personal numbers. One professional identity."
    },
    {
      icon: TrendingUp,
      title: "More conversions",
      description: "Talking beats typing. Every time."
    },
    {
      icon: Users,
      title: "Better privacy",
      description: "Keep business and personal life separate."
    }
  ];

  return (
    <section className="py-12 md:py-16 px-6 bg-[#FAFAFA] dark:bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-plus-jakarta-sans font-bold text-3xl md:text-4xl text-[#111111] dark:text-white text-center mb-16">
          Why businesses use Click to Connect
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="w-14 h-14 bg-[#22C55E]/10 dark:bg-[#22C55E]/20 rounded-2xl flex items-center justify-center mb-6">
                <benefit.icon size={28} className="text-[#22C55E]" strokeWidth={1.5} />
              </div>
              <h3 className="font-inter font-semibold text-xl text-[#111111] dark:text-white mb-3">
                {benefit.title}
              </h3>
              <p className="font-inter text-base text-[#525252] dark:text-white dark:text-opacity-70 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
