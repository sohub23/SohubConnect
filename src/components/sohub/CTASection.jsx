import { Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section className="px-6 py-12 bg-white dark:bg-[#121212] cta-section">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#22C55E] to-[#16A34A] p-12 md:p-16">
          {/* Content */}
          <div className="relative z-10 text-center space-y-8">
            <h2 className="font-plus-jakarta-sans font-bold text-4xl md:text-5xl text-white leading-tight">
              Experience the Future of Business Communication
            </h2>

            <p className="font-inter text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              People don't buy from websites. They buy from people. SOHUB
              Connect lets your customers hear you at the exact moment they
              decide.
            </p>

            <div className="pt-4">
              <a
                href="https://connect.sohub.com.bd/authentication/register"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-white text-[#22C55E] font-inter font-bold text-sm md:text-lg px-4 md:px-10 py-4 md:py-5 rounded-full hover:bg-gray-50 active:scale-95 transition-all duration-200 shadow-2xl w-full sm:w-auto whitespace-nowrap"
              >
                <Phone size={16} className="flex-shrink-0" />
                <span>Start Free — Up to 5 Users</span>
              </a>
              <p className="text-center mt-4 font-inter text-sm text-white/80">
                No credit card. No commitment.
              </p>
            </div>

            <p className="font-inter text-base text-white font-semibold pt-4">
              Because Bangladeshi businesses — and customers — deserve better.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
