import { Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section className="px-4 sm:px-6 py-10 sm:py-12 bg-white dark:bg-[#121212] cta-section">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#22C55E] to-[#16A34A] p-8 sm:p-10 md:p-12 lg:p-16">
          {/* Content */}
          <div className="relative z-10 text-center space-y-6 sm:space-y-8">
            <h2 className="font-plus-jakarta-sans font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight px-2">
              Experience the Future of Business Communication
            </h2>

            <p className="font-inter text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed px-2">
              People don't buy from websites. They buy from people. SOHUB
              Connect lets your customers hear you at the exact moment they
              decide.
            </p>

            <div className="pt-2 sm:pt-4">
              <a
                href="https://connect-client.sohub.com.bd/authentication/register"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-white text-[#22C55E] font-inter font-bold text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full hover:bg-gray-50 active:scale-95 transition-all duration-200 shadow-2xl w-full sm:w-auto whitespace-nowrap"
              >
                <Phone size={18} className="flex-shrink-0 sm:w-5 sm:h-5" />
                <span>FREE FOREVER — Up to 5 Users</span>
              </a>
              <p className="text-center mt-4 font-inter text-sm text-white/80">
                No credit card. No commitment.
              </p>
            </div>

            <p className="font-inter text-sm sm:text-base text-white font-semibold pt-2 sm:pt-4 px-2">
              Because Bangladeshi businesses — and customers — deserve better.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
