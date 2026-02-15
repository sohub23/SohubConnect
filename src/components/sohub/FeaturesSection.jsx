import { MousePointerClick, Scan } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-20 md:py-24 px-6 bg-[#FAFAFA] dark:bg-[#0A0A0A]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-plus-jakarta-sans font-bold text-3xl md:text-4xl lg:text-5xl text-[#111111] dark:text-white leading-tight mb-6">
            We Removed <span className="text-[#22C55E]">Phone Numbers</span>
          </h2>
          <p className="font-inter text-lg text-[#525252] dark:text-white dark:text-opacity-70 leading-relaxed max-w-3xl mx-auto">
            Traditional PBX connects calls using phone numbers and operators. We
            asked a simple question:{" "}
            <span className="font-semibold text-[#111111] dark:text-white">
              Why should customers dial numbers at all?
            </span>
          </p>
        </div>

        {/* Feature 1: Client-to-Connect */}
        <div className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full px-4 py-2">
                <MousePointerClick
                  size={14}
                  className="text-blue-600 dark:text-blue-400"
                />
                <span className="font-inter font-semibold text-xs text-blue-600 dark:text-blue-400">
                  Click-to-Call
                </span>
              </div>

              <h3 className="font-plus-jakarta-sans font-bold text-3xl md:text-4xl text-[#111111] dark:text-white leading-tight">
                Client-to-Connect
              </h3>

              <p className="font-inter text-lg text-[#525252] dark:text-white dark:text-opacity-70 leading-relaxed">
                Instead of calling a number: Customers click a button on your
                website or app. That's it. No dial pad. No SIM. No waiting.{" "}
                <span className="font-semibold text-[#111111] dark:text-white">
                  A real human voice — instantly.
                </span>
              </p>

              <div className="space-y-3">
                <p className="font-inter text-sm font-semibold text-[#111111] dark:text-white">
                  This button can live on:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Websites",
                    "Web apps",
                    "Landing pages",
                    "Any online platform",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#22C55E] rounded-full"></div>
                      <span className="font-inter text-sm text-[#525252] dark:text-white dark:text-opacity-87">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <p className="font-inter text-xl text-[#111111] dark:text-white font-semibold mb-4">
                  One click turns interest into conversation.
                </p>
                <a
                  href="/click-to-connect"
                  className="inline-flex items-center space-x-2 text-[#22C55E] hover:text-[#16A34A] font-inter font-semibold text-base transition-colors duration-200"
                >
                  <span>Learn more</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="relative">
              <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl">
                {/* Video Demo */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="font-inter font-bold text-lg text-[#111111] dark:text-white">
                      Click to Connect Demo
                    </div>
                  </div>

                  {/* Video Container */}
                  <div className="relative aspect-video bg-gray-100 dark:bg-[#262626] rounded-lg overflow-hidden">
                    <video 
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    >
                      <source src="/videos/click_to_connect.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  <p className="text-center font-inter text-xs text-[#6B7280] dark:text-white dark:text-opacity-60">
                    See how customers connect instantly without dialing numbers
                  </p>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -right-4 -top-4 bg-blue-500 text-white rounded-full px-4 py-2 shadow-lg">
                <span className="font-inter font-bold text-sm">
                  Live Demo!
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: HotScan */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Visual (on mobile, this will appear second) */}
            <div className="relative lg:order-1 order-2">
              <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl">
                {/* Video Demo */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-inter font-bold text-lg text-[#111111] dark:text-white mb-4 text-right">
                      HotScan Demo
                    </h4>

                    {/* Video Container */}
                    <div className="relative aspect-video bg-gray-100 dark:bg-[#262626] rounded-lg overflow-hidden">
                      <video 
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                      >
                        <source src="/videos/hotscan.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>

                    <p className="mt-4 font-inter text-sm font-semibold text-[#111111] dark:text-white text-center">
                      Scan to Connect
                    </p>
                    <p className="font-inter text-xs text-[#6B7280] dark:text-white dark:text-opacity-60 text-center">
                      Instant voice support
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -left-4 -top-4 bg-[#22C55E] text-white rounded-full px-4 py-2 shadow-lg">
                <span className="font-inter font-bold text-sm">Live Demo!</span>
              </div>
            </div>

            {/* Right: Content */}
            <div className="space-y-6 lg:order-2 order-1">
              <div className="inline-flex items-center space-x-2 bg-[#DCFCE7] dark:bg-[#22C55E]/20 border border-[#22C55E] rounded-full px-4 py-2">
                <Scan
                  size={14}
                  className="text-[#16A34A] dark:text-[#22C55E]"
                />
                <span className="font-inter font-semibold text-xs text-[#16A34A] dark:text-[#22C55E]">
                  QR-Based Calling
                </span>
              </div>

              <h3 className="font-plus-jakarta-sans font-bold text-3xl md:text-4xl text-[#111111] dark:text-white leading-tight">
                HotScan
              </h3>

              <p className="font-inter text-lg text-[#525252] dark:text-white dark:text-opacity-70 leading-relaxed">
                Hotlines are outdated. So we replaced them. Meet HotScan. A
                printable, static QR code that customers scan and the call
                starts instantly.
              </p>

              <div className="space-y-3">
                <p className="font-inter text-sm font-semibold text-[#111111] dark:text-white">
                  Works on:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Brochures",
                    "Packaging",
                    "Billboards",
                    "Delivery slips",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#22C55E] rounded-full"></div>
                      <span className="font-inter text-sm text-[#525252] dark:text-white dark:text-opacity-87">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <p className="font-inter text-base text-[#525252] dark:text-white dark:text-opacity-87">
                  No saving numbers. No dialing mistakes.
                </p>
                <p className="font-inter text-xl text-[#111111] dark:text-white font-semibold">
                  Just scan and speak.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mt-20 text-center bg-gradient-to-r from-[#22C55E]/10 to-[#16A34A]/10 dark:from-[#22C55E]/20 dark:to-[#16A34A]/20 rounded-2xl p-12 border border-[#22C55E]/30 feature-bottom">
          <h3 className="font-plus-jakarta-sans font-bold text-2xl md:text-3xl text-[#111111] dark:text-white mb-4">
            This Is Not a Phone System
          </h3>
          <p className="font-inter text-lg text-[#525252] dark:text-white dark:text-opacity-70 max-w-2xl mx-auto">
            Phones are about numbers. SOHUB Connect is about intent. When a
            customer wants to talk — we remove every obstacle in between.
          </p>
          <div className="mt-6 flex items-center justify-center space-x-4 text-2xl font-bold text-[#22C55E]">
            <span>Click.</span>
            <span>Scan.</span>
            <span>Talk.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
