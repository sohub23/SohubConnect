export default function WhatItIs() {
  return (
    <section className="py-12 md:py-16 px-6 bg-white dark:bg-[#121212]">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="font-plus-jakarta-sans font-bold text-[32px] sm:text-[40px] md:text-[48px] text-[#111111] dark:text-white text-center leading-tight">
            What is <span className="text-[#22C55E]">Click to Connect?</span>
          </h2>
          
          <div className="space-y-6">
            <p className="font-inter text-base sm:text-lg text-[#525252] dark:text-white dark:text-opacity-70 leading-relaxed">
              Click to Connect is a simple call button you place on your website.
            </p>
            <p className="font-inter text-base sm:text-lg text-[#525252] dark:text-white dark:text-opacity-70 leading-relaxed">
              When a customer clicks it, a voice conversation starts instantly — directly inside the browser.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <p className="font-inter text-base sm:text-lg text-[#111111] dark:text-white">
              No SIM cards.<br />
              No telecom operators.<br />
              No phone numbers.
            </p>
          </div>

          <p className="font-inter text-lg sm:text-xl text-[#111111] dark:text-white font-semibold text-center pt-6">
            Just real human conversation, right when it matters.
          </p>
        </div>
      </div>
    </section>
  );
}
