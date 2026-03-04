export default function CalmCTA() {
  return (
    <section className="py-10 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-6 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 cta-section">
        <h2 className="font-plus-jakarta-sans font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight px-2">
          Start talking, instantly
        </h2>
        <div className="space-y-3 sm:space-y-4">
          <p className="font-inter text-base sm:text-lg md:text-xl text-white text-opacity-90 leading-relaxed max-w-3xl mx-auto px-2">
            When customers are ready, real conversations begin.
          </p>
          <p className="font-inter text-base sm:text-lg md:text-xl text-white text-opacity-90 leading-relaxed max-w-3xl mx-auto px-2">
            Click to Connect lets your team respond the moment intent appears.
          </p>
        </div>
        <div className="pt-4">
          <a
            href="https://connect.sohub.com.bd/authentication/register"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-white text-[#22C55E] font-inter font-semibold text-sm sm:text-base px-8 sm:px-10 py-3 sm:py-4 rounded-full hover:bg-gray-50 active:scale-95 transition-all duration-200 shadow-lg"
          >
            Get started
          </a>
        </div>
      </div>
    </section>
  );
}
