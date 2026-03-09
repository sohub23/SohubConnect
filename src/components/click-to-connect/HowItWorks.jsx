"use client";
import { useState, useEffect } from 'react';

export default function HowItWorks() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeImage, setActiveImage] = useState(null);
  const slideImages = [
    "/images/website/add_click_to_connect.png",
    "/images/website/Click_to_connecct_2.png",
    "/images/website/c2c3.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!activeImage) return;

    const handleEsc = (event) => {
      if (event.key === 'Escape') setActiveImage(null);
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleEsc);
    };
  }, [activeImage]);

  const steps = [
    {
      number: "1",
      title: "Create",
      description: "Create a Click to Connect button from your dashboard.\nChoose who should receive calls.",
      hasSlider: true
    },
    {
      number: "2",
      title: "Add",
      description: "Copy the embed code and place it on your website.\nNo configuration required.",
      image: "/images/website/script.png"
    },
    {
      number: "3",
      title: "Talk",
      description: "Customers click the button.\nYour team answers instantly.",
      video: "/images/click_to_connect/c2c-video.mp4"
    }
  ];

  return (
    <section id="how-it-works" className="scroll-mt-28 py-10 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-6 bg-[#FAFAFA] dark:bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="font-plus-jakarta-sans font-bold text-[24px] sm:text-[28px] md:text-[36px] lg:text-[48px] text-[#111111] dark:text-white mb-3 sm:mb-4 leading-tight px-2">
            How it works
          </h2>
          <p className="font-inter text-sm sm:text-base md:text-lg text-[#525252] dark:text-white dark:text-opacity-70 px-2">
            Getting started takes less than a minute.
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
                <p className="font-inter text-base sm:text-lg text-[#525252] dark:text-white dark:text-opacity-70 leading-relaxed whitespace-pre-line">
                  {step.description}
                </p>
              </div>

              {/* Image */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="relative bg-white dark:bg-[#1E1E1E] rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-xl">
                  {step.hasSlider ? (
                    <div className="aspect-video rounded-lg overflow-hidden relative">
                      {slideImages.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`Step ${step.number} - ${i + 1}`}
                          className={`c2c-hiw-zoomable absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                          onClick={() => {
                            if (i !== currentSlide) return;
                            setActiveImage({
                              src: img,
                              alt: `Step ${step.number}`,
                            });
                          }}
                        />
                      ))}
                    </div>
                  ) : step.image ? (
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="c2c-hiw-zoomable w-full h-full object-contain"
                        onClick={() =>
                          setActiveImage({
                            src: step.image,
                            alt: step.title,
                          })
                        }
                      />
                    </div>
                  ) : step.video ? (
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <video src={step.video} autoPlay loop muted playsInline className="w-full h-full object-contain" />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] dark:from-[#0A0A0A] dark:to-[#1A1A1A] rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-[#22C55E] rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <span className="font-inter text-3xl font-bold text-white">{step.number}</span>
                        </div>
                        <p className="font-inter text-sm text-[#6B7280] dark:text-white dark:text-opacity-60">
                          {step.title} Preview
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="font-inter text-lg sm:text-xl text-[#111111] dark:text-white font-semibold text-center mt-12 sm:mt-16">
          That's it.
        </p>
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm px-4 py-6 sm:px-8 sm:py-10 flex items-center justify-center"
          onClick={() => setActiveImage(null)}
        >
          <button
            type="button"
            className="text-white absolute top-4 right-4 bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 text-xl leading-none"
            onClick={() => setActiveImage(null)}
            aria-label="Close image preview"
          >
            ×
          </button>

          <img
            src={activeImage.src}
            alt={activeImage.alt}
            className="max-h-[90vh] max-w-[95vw] w-auto h-auto object-contain rounded-lg shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}

      <style>{`
        @media (hover: hover) and (pointer: fine) {
          .c2c-hiw-zoomable {
            transition: transform 220ms ease, box-shadow 220ms ease;
            transform-origin: center;
            cursor: zoom-in;
            will-change: transform;
          }
          .c2c-hiw-zoomable:hover {
            transform: scale(1.04);
            box-shadow: 0 14px 28px rgba(0, 0, 0, 0.12);
          }
        }
      `}</style>
    </section>
  );
}
