import { Check } from "lucide-react";

export default function PricingSection() {
  const freeFeatures = [
    "Up to 5 users / Phones",
    "Click to Connect call button",
    "HotScan QR calls",
    "Team-based call handling",
    "Call history & analytics",
    "Email support",
  ];

  return (
    <section
      id="pricing"
      className="scroll-mt-28 py-6 sm:py-8 md:py-10 px-4 sm:px-6 bg-white dark:bg-[#121212]"
    >
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center bg-[#22C55E] text-white rounded-full px-3 py-1.5 mb-3">
            <span className="font-inter font-semibold text-xs">
              Simple. Honest. Predictable
            </span>
          </div>

          <h2 className="font-plus-jakarta-sans font-bold text-xl sm:text-2xl md:text-3xl text-[#111111] dark:text-white leading-tight mb-2">
            Pricing That Just Makes Sense
          </h2>

          <p className="font-inter text-xs sm:text-sm text-[#525252] dark:text-white dark:text-opacity-70 max-w-xl mx-auto">
            We keep it honest and simple. No bundles. No confusion.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="bg-gradient-to-br from-[#F0FDF4] to-white dark:from-[#1E1E1E] dark:to-[#1A1A1A] rounded-2xl p-4 sm:p-5 border-2 border-[#22C55E] shadow-xl shadow-[#22C55E]/20">
          {/* Free Forever Badge */}
          <div className="inline-flex items-center bg-[#22C55E] text-white rounded-full px-3 py-1.5 mb-3">
            <span className="font-inter font-bold text-xs">FREE FOREVER</span>
          </div>

          {/* Features */}
          <div className="mb-3">
            <div className="space-y-2">
              {freeFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="flex-shrink-0 w-4 h-4 bg-[#22C55E] rounded-full flex items-center justify-center mt-0.5">
                    <Check size={12} className="text-white" />
                  </div>
                  <span className="font-inter text-xs text-[#111111] dark:text-white">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-dashed border-[#22C55E]/30 my-3"></div>

          {/* Then section */}
          <div className="space-y-2">
            <div>
              <p className="font-inter text-xs text-[#6B7280] dark:text-white dark:text-opacity-70 mb-1">
                Then:
              </p>
              <div className="flex items-baseline space-x-2">
                <span className="font-plus-jakarta-sans font-bold text-2xl sm:text-3xl text-[#111111] dark:text-white">
                  50 BDT
                </span>
                <span className="font-inter text-xs text-[#525252] dark:text-white dark:text-opacity-70">
                  per additional user / month
                </span>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2 border border-blue-200 dark:border-blue-800">
              <p className="font-inter text-xs text-blue-900 dark:text-blue-200">
                <span className="font-semibold">Note:</span> 1 Button = 1 User | 1 HotScan = 1 User
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-4">
            <a
              href="https://connect-client.sohub.com.bd/authentication/register"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#22C55E] text-white font-inter font-bold text-xs sm:text-sm px-4 py-2.5 rounded-full hover:bg-[#16A34A] active:scale-95 transition-all duration-200 text-center shadow-lg shadow-[#22C55E]/30"
            >
              Start Free — Up to 5 Users
            </a>
            <p className="text-center mt-2 font-inter text-xs text-[#6B7280] dark:text-white dark:text-opacity-60">
              No credit card. No commitment.
            </p>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-6 text-center">
          <p className="font-inter text-xs text-[#525252] dark:text-white dark:text-opacity-70">
            That's it. Really.
          </p>
        </div>
      </div>
    </section>
  );
}
