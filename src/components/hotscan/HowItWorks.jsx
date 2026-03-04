const steps = [
  {
    number: "1",
    title: "Create your HotScan profile",
    description: "Set up your HotScan in minutes from your dashboard."
  },
  {
    number: "2",
    title: "Place the QR code anywhere offline",
    description: "Print and display on posters, packaging, counters, or anywhere customers are."
  },
  {
    number: "3",
    title: "Customers scan and connect instantly",
    description: "The call routes securely to your team or call flow."
  }
];

export default function HowItWorks() {

  return (
    <section id="how-it-works" className="py-10 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-6 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="font-plus-jakarta-sans font-bold text-[24px] sm:text-[28px] md:text-[36px] lg:text-[48px] text-[#111111] dark:text-white mb-3 sm:mb-4 leading-tight px-2">
            How it works
          </h2>
          <p className="font-inter text-sm sm:text-base md:text-lg text-[#525252] dark:text-white dark:text-opacity-70 px-2">
            Simple for customers. Simple for businesses.
          </p>
        </div>

        <div className="space-y-12 sm:space-y-14 md:space-y-16 lg:space-y-20">
          {steps.map((step, index) => (
            <div key={step.number} className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
              {/* Content */}
              <div className={`space-y-4 sm:space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="inline-flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-[#22C55E]/10 dark:bg-[#22C55E]/20 flex items-center justify-center">
                    <span className="font-inter text-lg font-semibold text-[#22C55E]">{step.number}</span>
                  </div>
                  <h3 className="font-plus-jakarta-sans font-bold text-2xl md:text-3xl text-[#111111] dark:text-white">
                    {step.title}
                  </h3>
                </div>
                <p className="font-inter text-base sm:text-lg text-[#525252] dark:text-white dark:text-opacity-70 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Visual */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="relative bg-white dark:bg-[#1E1E1E] rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-xl">
                  {index === 0 ? (
                    <video 
                      className="w-full aspect-video rounded-lg object-cover"
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                    >
                      <source src="/images/hotscan/Hotscan.mp4" type="video/mp4" />
                    </video>
                  ) : index === 1 ? (
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <img 
                        src="/images/hotscan/hotscan-qr.png" 
                        alt="QR code placement" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : index === 2 ? (
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <img 
                        src="/images/hotscan/hotscan-call.png" 
                        alt="Customer scanning and connecting" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] dark:from-[#0A0A0A] dark:to-[#1A1A1A] rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-[#22C55E] rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <span className="font-inter text-3xl font-bold text-white">{step.number}</span>
                        </div>
                        <p className="font-inter text-sm text-[#6B7280] dark:text-white dark:text-opacity-60">
                          {step.title}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
