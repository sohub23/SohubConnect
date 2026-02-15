import { Check } from "lucide-react";

export default function PricingSection() {
  const freeFeatures = [
    "Up to 5 users / extensions",
    "Click-to-Call buttons",
    "HotScan™ QR calls",
    "Team-based call handling",
    "Call history & analytics",
    "Email support",
  ];

  return (
    <section
      id="pricing"
      className="py-20 md:py-24 px-6 bg-white dark:bg-[#121212]"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#DCFCE7] dark:bg-[#22C55E]/20 border border-[#22C55E] rounded-full px-4 py-2 mb-6">
            <span className="font-inter font-semibold text-xs text-[#16A34A] dark:text-[#22C55E]">
              Pricing
            </span>
          </div>

          <h2 className="font-plus-jakarta-sans font-bold text-3xl md:text-4xl lg:text-5xl text-[#111111] dark:text-white leading-tight mb-6">
            Pricing That Just Makes Sense
          </h2>

          <p className="font-inter text-lg text-[#525252] dark:text-white dark:text-opacity-70 leading-relaxed max-w-2xl mx-auto">
            We keep it honest and simple. No bundles. No confusion.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="bg-gradient-to-br from-[#F0FDF4] to-white dark:from-[#1E1E1E] dark:to-[#1A1A1A] rounded-3xl p-8 md:p-12 border-2 border-[#22C55E] shadow-2xl shadow-[#22C55E]/20 pricing-card">
          {/* Free Forever Badge */}
          <div className="inline-flex items-center bg-[#22C55E] text-white rounded-full px-6 py-2 mb-8">
            <span className="font-inter font-bold text-sm">FREE FOREVER</span>
          </div>

          {/* Features */}
          <div className="mb-8">
            <div className="space-y-4">
              {freeFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#22C55E] rounded-full flex items-center justify-center mt-0.5">
                    <Check size={16} className="text-white" />
                  </div>
                  <span className="font-inter text-base text-[#111111] dark:text-white">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t-2 border-dashed border-[#22C55E]/30 my-8"></div>

          {/* Then section */}
          <div className="space-y-6">
            <div>
              <p className="font-inter text-sm text-[#6B7280] dark:text-white dark:text-opacity-70 mb-2">
                Then:
              </p>
              <div className="flex items-baseline space-x-2">
                <span className="font-plus-jakarta-sans font-bold text-5xl text-[#111111] dark:text-white">
                  ৳50
                </span>
                <span className="font-inter text-lg text-[#525252] dark:text-white dark:text-opacity-70">
                  per additional user / month
                </span>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
              <p className="font-inter text-sm text-blue-900 dark:text-blue-200">
                <span className="font-semibold">Note:</span> 1 Button = 1 User |
                1 HotScan = 1 User
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-10">
            <a
              href="https://connect.sohub.com.bd/authentication/register"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#22C55E] text-white font-inter font-bold text-lg px-8 py-5 rounded-full hover:bg-[#16A34A] active:bg-[#15803D] active:scale-95 transition-all duration-200 text-center shadow-xl shadow-[#22C55E]/30"
            >
              Start Free — Up to 5 Users
            </a>
            <p className="text-center mt-4 font-inter text-sm text-[#6B7280] dark:text-white dark:text-opacity-60">
              No credit card. No commitment.
            </p>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center">
          <p className="font-inter text-base text-[#525252] dark:text-white dark:text-opacity-70">
            That's it. Really.
          </p>
        </div>
      </div>
    </section>
  );
}
