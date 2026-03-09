import { useState, useEffect } from 'react';
import Header from '../../components/sohub/Header';
import Footer from '../../components/sohub/Footer';
import { ThemeProvider } from '../../components/sohub/ThemeProvider';

const SWIPER_SCRIPT_SRC = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
const SWIPER_STYLE_HREF = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
const SWIPER_STYLE_ID = 'sohub-swiper-style';
const SWIPER_SCRIPT_ID = 'sohub-swiper-script';
let swiperLoaderPromise = null;

function ensureSwiperAssets() {
  if (typeof window === 'undefined') {
    return Promise.resolve(null);
  }

  if (window.Swiper) {
    return Promise.resolve(window.Swiper);
  }

  if (swiperLoaderPromise) {
    return swiperLoaderPromise;
  }

  swiperLoaderPromise = new Promise((resolve, reject) => {
    let styleEl = document.getElementById(SWIPER_STYLE_ID);
    if (!styleEl) {
      styleEl = document.createElement('link');
      styleEl.id = SWIPER_STYLE_ID;
      styleEl.rel = 'stylesheet';
      styleEl.href = SWIPER_STYLE_HREF;
      document.head.appendChild(styleEl);
    }

    const existingScript = document.getElementById(SWIPER_SCRIPT_ID);
    if (existingScript) {
      if (window.Swiper) {
        resolve(window.Swiper);
      } else {
        existingScript.addEventListener('load', () => resolve(window.Swiper), { once: true });
        existingScript.addEventListener('error', reject, { once: true });
      }
      return;
    }

    const script = document.createElement('script');
    script.id = SWIPER_SCRIPT_ID;
    script.src = SWIPER_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve(window.Swiper);
    script.onerror = reject;
    document.body.appendChild(script);
  }).catch((error) => {
    swiperLoaderPromise = null;
    throw error;
  });

  return swiperLoaderPromise;
}

function initializeSwipers() {
  if (typeof window === 'undefined' || !window.Swiper) {
    return;
  }

  document.querySelectorAll('.swiper-container').forEach((container) => {
    if (container.swiper) {
      container.swiper.update();
      return;
    }

    const slideCount = container.querySelectorAll('.swiper-slide').length;
    new window.Swiper(container, {
      loop: slideCount > 1,
      autoplay: slideCount > 1 ? { delay: 3000, disableOnInteraction: false } : false,
    });
  });
}

function SohubConnectSection() {
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    let cancelled = false;
    ensureSwiperAssets()
      .then(() => {
        if (cancelled) return;
        setTimeout(() => {
          if (cancelled) return;
          initializeSwipers();
        }, 120);
      })
      .catch(() => {
        // Keep the section usable even if CDN fails.
      });

    return () => {
      cancelled = true;
    };
  }, [activeTab]);

  return (
    <section className="py-6 md:py-10 px-4 bg-white dark:bg-[#121212]">
      <div className="max-w-[920px] mx-auto my-6 md:my-10 text-center p-4 md:p-5 rounded-xl shadow-lg bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700">
        
        <h1 className="font-plus-jakarta-sans font-bold text-base md:text-lg mb-4 md:mb-5 text-[#111111] dark:text-white">
          <span className="text-[#22C55E]">Real-Time Monitoring</span>, Analytics, and <span className="text-[#22C55E]">Actionable Control</span>
        </h1>

        <div className="bg-white/50 dark:bg-[#1a1a1a]/50 backdrop-blur-xl rounded-t-xl px-3 md:px-6 py-2 border border-gray-200/50 dark:border-gray-700/50 border-b-0 flex justify-start md:justify-center gap-1 text-xs md:text-sm font-medium select-none mb-0 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {[
            {id: 'dashboard', label: 'Dashboard'},
            {id: 'operator-panel', label: 'Operator Panel'},
            {id: 'call-report', label: 'Call Report'},
            {id: 'transaction', label: 'Transaction'},
            {id: 'ticketing', label: 'Support Ticketing'},
            {id: 'download', label: 'Download Softphone'}
          ].map(tab => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 md:px-4 py-2 md:py-2.5 cursor-pointer whitespace-nowrap transition-all duration-200 font-inter rounded-lg ${
                activeTab === tab.id 
                  ? 'bg-white dark:bg-[#2a2a2a] text-[#111111] dark:text-white font-semibold shadow-sm' 
                  : 'text-[#86868b] dark:text-[#86868b] hover:opacity-70 hover:bg-gray-100/50 dark:hover:bg-[#2a2a2a]/50'
              }`}
            >
              {tab.label}
            </div>
          ))}
        </div>

        {activeTab === 'dashboard' && (
          <div className="border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-8 bg-white dark:bg-[#1E1E1E]">
            <div className="flex gap-4 md:gap-10 items-center mb-4 md:mb-8 flex-wrap justify-center">
              <div className="flex-1 min-w-[240px] sm:min-w-[280px] text-left">
                <h3 className="font-plus-jakarta-sans font-semibold text-sm md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white">
                  Monitor and manage your business calls in real time from a clean, minimal dashboard.
                </h3>
                <ul className="list-none p-0 m-0 text-xs md:text-sm leading-relaxed">
                  <li className="relative mb-2 md:mb-4 pl-6 md:pl-9">
                    <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                    <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Clean & Minimal Interface – So intuitive, you won't need to read a manual</span>
                  </li>
                  <li className="relative mb-2 md:mb-4 pl-6 md:pl-9">
                    <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                    <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Live Call Monitoring – Monitor active calls in real time</span>
                  </li>
                  <li className="relative mb-2 md:mb-4 pl-6 md:pl-9">
                    <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                    <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Answered Calls (Today) – Instantly view how many calls were successfully handled today</span>
                  </li>
                  <li className="relative mb-2 md:mb-4 pl-6 md:pl-9">
                    <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                    <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Answered Calls (This Month) – Get a quick view of your team's monthly call handling performance</span>
                  </li>
                  <li className="relative mb-2 md:mb-4 pl-6 md:pl-9">
                    <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                    <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Call Analytics Graph – View your recent call activity with a clear visual summary</span>
                  </li>
                </ul>
                <p className="font-inter text-xs md:text-sm text-[#525252] dark:text-white dark:text-opacity-70 mt-3 md:mt-5">
                  Make smarter decisions with real-time insights, right from your SOHUB Connect dashboard.
                </p>
              </div>
              <div className="flex-1 min-w-[240px] sm:min-w-[280px] max-w-[500px]">
                <div className="swiper-container" style={{width: '100%', borderRadius: '16px', overflow: 'hidden'}}>
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <img src="/images/features/dashboard1.png" alt="Dashboard" style={{width: '100%', display: 'block'}} />
                    </div>
                    <div className="swiper-slide">
                      <img src="/images/features/dashboard2.png" alt="Dashboard" style={{width: '100%', display: 'block'}} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'operator-panel' && (
          <div className="border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-8 bg-white dark:bg-[#1E1E1E]">
            <div className="flex gap-4 md:gap-8 items-center mb-4 md:mb-8 flex-wrap justify-center">
              <div className="flex-1 min-w-[240px] sm:min-w-[280px] text-left">
                <h3 className="font-plus-jakarta-sans font-semibold text-sm md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white">
                  Monitor all user activity in real time and stay fully in control of your team's communication status.
                </h3>
                <ul className="list-none p-0 m-0 text-xs md:text-sm leading-relaxed">
                  <li className="relative mb-2 md:mb-4 pl-6 md:pl-9">
                    <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                    <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Real-Time Phone Monitoring – Instantly view the live status of each phone</span>
                  </li>
                  <li className="relative mb-2 md:mb-4 pl-6 md:pl-9">
                    <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                    <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Live Presence Indicators – See who is online, offline, on a call, or idle right from your dashboard</span>
                  </li>
                  <li className="relative mb-2 md:mb-4 pl-6 md:pl-9">
                    <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                    <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Centralized View – All phone statuses available from a single, intuitive interface</span>
                  </li>
                </ul>
                <p className="font-inter text-xs md:text-sm text-[#525252] dark:text-white dark:text-opacity-70 mt-3 md:mt-5">
                  Empower supervisors and admins with live visibility to enhance team performance and response time.
                </p>
              </div>
              <div className="flex-1 min-w-[240px] sm:min-w-[280px] max-w-[500px]">
                <div className="swiper-container" style={{width: '100%', borderRadius: '16px', overflow: 'hidden'}}>
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <img src="/images/features/operator_panel1.png" alt="Operator Panel" style={{width: '100%', display: 'block'}} />
                    </div>
                    <div className="swiper-slide">
                      <img src="/images/features/operator_panel2.png" alt="Operator Panel" style={{width: '100%', display: 'block'}} />
                    </div>
                    <div className="swiper-slide">
                      <img src="/images/features/operator_panel3.png" alt="Operator Panel" style={{width: '100%', display: 'block'}} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'call-report' && (
          <div className="border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-8 bg-white dark:bg-[#1E1E1E]">
            <div className="flex gap-4 md:gap-8 items-center mb-4 md:mb-8 flex-wrap justify-center">
              <div className="flex-1 min-w-[240px] sm:min-w-[280px] text-left">
                <h3 className="font-plus-jakarta-sans font-semibold text-sm md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white">
                  Access detailed call history and analytics to track, audit, and optimize your communication performance.
                </h3>
                <ul className="list-none p-0 m-0 text-xs md:text-sm leading-relaxed">
                  <li className="relative mb-2 md:mb-4 pl-6 md:pl-9">
                    <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                    <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Complete CDR (Call Detail Record) – Access full details of all inbound and outbound calls</span>
                  </li>
                  <li className="relative mb-2 md:mb-4 pl-6 md:pl-9">
                    <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                    <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Comprehensive Details – Includes call duration, time, caller/callee, status, and more</span>
                  </li>
                  <li className="relative mb-2 md:mb-4 pl-6 md:pl-9">
                    <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                    <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Search & Filter Options – Quickly find specific calls by date, destination, or status</span>
                  </li>
                  <li className="relative mb-2 md:mb-4 pl-6 md:pl-9">
                    <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                    <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Export Reports – Download call logs for audits, analysis, or documentation purposes</span>
                  </li>
                </ul>
                <p className="font-inter text-xs md:text-sm text-[#525252] dark:text-white dark:text-opacity-70 mt-3 md:mt-5">
                  Stay updated and make data-driven decisions from every call on your system.
                </p>
              </div>
              <div className="flex-1 min-w-[240px] sm:min-w-[280px] max-w-[500px]">
                <div className="swiper-container" style={{width: '100%', borderRadius: '16px', overflow: 'hidden'}}>
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <img src="/images/features/report1.png" alt="Call Report" style={{width: '100%', display: 'block'}} />
                    </div>
                    <div className="swiper-slide">
                      <img src="/images/features/report2.png" alt="Call Report" style={{width: '100%', display: 'block'}} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transaction' && (
          <div className="border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-8 bg-white dark:bg-[#1E1E1E]">
            <div className="flex gap-4 md:gap-8 items-center mb-4 md:mb-8 flex-wrap justify-center">
              <div className="flex-1 min-w-[240px] sm:min-w-[280px] text-left">
                <h3 className="font-plus-jakarta-sans font-semibold text-sm md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white">
                  Track all your business transactions directly within your SOHUB Connect account—with full transparency.
                </h3>
                <ul className="list-none p-0 m-0 text-xs md:text-sm leading-relaxed">
                  <li className="relative mb-2 md:mb-4 pl-6 md:pl-9">
                    <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                    <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Wallet Reload Details – Check your wallet balance and track all top-ups, including bKash and other payment methods</span>
                  </li>
                  <li className="relative mb-2 md:mb-4 pl-6 md:pl-9">
                    <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                    <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Cost Deductions – Know the exact charges in advance for using calling features and other services</span>
                  </li>
                  <li className="relative mb-2 md:mb-4 pl-6 md:pl-9">
                    <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                    <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Complete Charge History – View a detailed list of all your usage charges in one place</span>
                  </li>
                </ul>
                <p className="font-inter text-xs md:text-sm text-[#525252] dark:text-white dark:text-opacity-70 mt-3 md:mt-5">
                  Stay financially updated with a clear record of every transaction on your account.
                </p>
              </div>
              <div className="flex-1 min-w-[240px] sm:min-w-[280px] max-w-[500px]">
                <div className="swiper-container" style={{width: '100%', borderRadius: '16px', overflow: 'hidden'}}>
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <img src="/images/features/transection1.png" alt="Transaction" style={{width: '100%', display: 'block'}} />
                    </div>
                    <div className="swiper-slide">
                      <img src="/images/features/transection2.png" alt="Transaction" style={{width: '100%', display: 'block'}} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ticketing' && (
          <div className="border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-8 bg-white dark:bg-[#1E1E1E]">
            <div className="flex gap-4 md:gap-8 items-center mb-4 md:mb-8 flex-wrap justify-center">
              <div className="flex-1 min-w-[240px] sm:min-w-[280px] text-left">
                <h3 className="font-plus-jakarta-sans font-semibold text-sm md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white">
                  Raise a Ticket and Get Fast Support from the SOHUB Team
                </h3>
                <ul className="list-none p-0 m-0 text-xs md:text-sm leading-relaxed">
                  <li className="relative mb-2 md:mb-4 pl-6 md:pl-9">
                    <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                    <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Submit technical or billing issues directly through SOHUB's ticketing system</span>
                  </li>
                  <li className="relative mb-2 md:mb-4 pl-6 md:pl-9">
                    <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                    <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Track ticket status and progress all in one place</span>
                  </li>
                </ul>
                <p className="font-inter text-xs md:text-sm text-[#525252] dark:text-white dark:text-opacity-70 mt-3 md:mt-5">
                  Ticketing ensures professional, documented, and well-organized support for all your business needs.
                </p>
              </div>
              <div className="flex-1 min-w-[240px] sm:min-w-[280px] max-w-[500px]">
                <div className="swiper-container" style={{width: '100%', borderRadius: '16px', overflow: 'hidden'}}>
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <img src="/images/features/ticket1.png" alt="Ticketing" style={{width: '100%', display: 'block'}} />
                    </div>
                    <div className="swiper-slide">
                      <img src="/images/features/ticket2.png" alt="Ticketing" style={{width: '100%', display: 'block'}} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'download' && (
          <div className="border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-8 bg-white dark:bg-[#1E1E1E]">
            <div className="flex gap-4 md:gap-8 items-center mb-4 md:mb-8 flex-wrap justify-center">
              <div className="flex-1 min-w-[240px] sm:min-w-[280px] text-left">
                <h3 className="font-plus-jakarta-sans font-semibold text-sm md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white">
                  No hardware needed — download our official softphone on your laptop or desktop and start calling seamlessly.
                </h3>
                <ul className="list-none p-0 m-0 text-xs md:text-sm leading-relaxed">
                  <li className="relative mb-2 md:mb-4 pl-6 md:pl-9">
                    <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                    <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Download the softphone easily and start making professional calls from your laptop or desktop, with no hardware phone required.</span>
                  </li>
                </ul>
                <a href="https://connect-client.sohub.com.bd/assets/file/softphone/SohubConnect-3.21.5.exe" target="_blank" rel="noopener noreferrer" className="inline-block mt-3 font-semibold bg-[#22C55E] hover:bg-[#16A34A] text-white px-6 py-2.5 rounded-full no-underline text-sm transition-colors">
                  Download Now
                </a>
              </div>
              <div className="flex-1 min-w-[240px] sm:min-w-[280px] max-w-[500px]">
                <div className="swiper-container" style={{width: '100%', borderRadius: '16px', overflow: 'hidden'}}>
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <img src="/images/features/softphone1.png" alt="Soft Phone" style={{width: '100%', display: 'block'}} />
                    </div>
                    <div className="swiper-slide">
                      <img src="/images/features/soft_phone.png" alt="Soft Phone" style={{width: '100%', display: 'block'}} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

export default function FeaturePage() {
  const [activeTab, setActiveTab] = useState('call-efficiency');
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    let cancelled = false;
    ensureSwiperAssets()
      .then(() => {
        if (cancelled) return;
        setTimeout(() => {
          if (cancelled) return;
          initializeSwipers();
        }, 120);
      })
      .catch(() => {
        // Keep the section usable even if CDN fails.
      });

    return () => {
      cancelled = true;
    };
  }, [activeTab]);

  useEffect(() => {
    if (!activeImage) {
      return undefined;
    }

    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setActiveImage(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleEsc);
    };
  }, [activeImage]);

  const handleFeatureImageClick = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLImageElement)) {
      return;
    }

    if (!target.closest('.swiper-container')) {
      return;
    }

    setActiveImage({
      src: target.currentSrc || target.src,
      alt: target.alt || 'Feature image',
    });
  };

  return (
    <ThemeProvider>
      <div className="features-page min-h-screen bg-white dark:bg-[#121212]">
        <Header />
        
        <section className="text-center py-12 md:py-16 px-4 bg-white dark:bg-[#121212]">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-plus-jakarta-sans text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-[#111111] dark:text-white leading-tight">
              Simplify Your Business Communication with <span className="text-[#22C55E]">SOHUB Connect</span>
            </h1>
            <p className="font-inter text-base md:text-lg lg:text-xl text-[#525252] dark:text-white dark:text-opacity-70 leading-relaxed">
              SOHUB Connect is an easy-to-use calling and messaging platform built for modern businesses. It helps your business communicate smoothly, reduce cost, and grow with confidence.
            </p>
            <p className="font-inter text-sm md:text-base text-[#22C55E] font-semibold">
              Start with FREE FOREVER, then scale as your team grows.
            </p>
          </div>
        </section>
        
        <section className="py-6 md:py-10 px-4" onClickCapture={handleFeatureImageClick}>
          <div className="max-w-[920px] mx-auto my-6 md:my-10 text-center p-4 md:p-5 rounded-xl shadow-lg bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700">
            
            <h1 className="font-plus-jakarta-sans font-bold text-base md:text-lg mb-4 md:mb-5 text-[#111111] dark:text-white">
              Explore <span className="text-[#22C55E]">SOHUB Connect</span> Functionalities
            </h1>

            <div id="business-tabs" className="bg-white/50 dark:bg-[#1a1a1a]/50 backdrop-blur-xl rounded-t-xl px-3 md:px-6 py-2 border border-gray-200/50 dark:border-gray-700/50 border-b-0 flex justify-start md:justify-center gap-1 text-xs md:text-sm font-medium select-none mb-0 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {[
                {id: 'call-efficiency', label: 'Call Flow'},
                {id: 'work-anywhere', label: 'Phones'},
                {id: 'unified-communications', label: 'Ring Groups'},
                {id: 'sound-file', label: 'Custom Audio'}
              ].map(tab => (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 md:px-4 py-2 md:py-2.5 cursor-pointer whitespace-nowrap transition-all duration-200 font-inter rounded-lg ${
                    activeTab === tab.id 
                      ? 'bg-white dark:bg-[#2a2a2a] text-[#111111] dark:text-white font-semibold shadow-sm' 
                      : 'text-[#86868b] dark:text-[#86868b] hover:opacity-70 hover:bg-gray-100/50 dark:hover:bg-[#2a2a2a]/50'
                  }`}
                >
                  {tab.label}
                </div>
              ))}
            </div>

            {activeTab === 'call-efficiency' && (
              <div className="border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-8 bg-white dark:bg-[#1E1E1E]">
                <div className="flex gap-4 md:gap-10 items-center mb-4 md:mb-8 flex-wrap justify-center">
                  <div className="flex-1 min-w-[240px] sm:min-w-[280px] text-left">
                    <h3 className="font-plus-jakarta-sans font-semibold text-sm md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white">
                      Deliver a professional calling experience with SOHUB Connect's smart IVR — no hardware or setup hassle.
                    </h3>
                    <ul className="list-none p-0 m-0 text-xs md:text-sm leading-relaxed">
                      <li className="relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1">
                        <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                        <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Custom Welcome Messages – Set your own audio recordings or personalized greetings to welcome callers</span>
                      </li>
                      <li className="relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1">
                        <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                        <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Interactive Voice Menus – Guide callers to the right team with clear menu options</span>
                      </li>
                      <li className="relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1">
                        <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                        <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Smart Call Transfers – Automatically route callers to the right team or destination based on their needs</span>
                      </li>
                      <li className="relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1">
                        <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                        <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Playback Audio Messages – Announce updates, business hours, or other important information through audio</span>
                      </li>
                      <li className="relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1">
                        <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                        <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Ring Group Integration – Forward calls using smart ring strategies for the right team</span>
                      </li>
                    </ul>
                    <p className="font-inter text-xs md:text-sm text-[#525252] dark:text-white dark:text-opacity-70 mt-3 md:mt-5">
                      Ensure fast, accurate, and professional responses—right from the first ring.
                    </p>
                  </div>
                  <div className="flex-1 min-w-[240px] sm:min-w-[280px] max-w-[500px]">
                    <div className="swiper-container" style={{width: '100%', borderRadius: '16px', overflow: 'hidden'}}>
                      <div className="swiper-wrapper">
                        <div className="swiper-slide">
                          <img src="/images/website/call_flow.png" alt="Call Flow" style={{width: '100%', display: 'block'}} />
                        </div>
                    
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'work-anywhere' && (
              <div className="border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-8 bg-white dark:bg-[#1E1E1E]">
                <div className="flex gap-4 md:gap-10 items-center mb-4 md:mb-8 flex-wrap justify-center">
                  <div className="flex-1 min-w-[240px] sm:min-w-[280px] text-left">
                    <h3 className="font-plus-jakarta-sans font-semibold text-sm md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white">
                      Easily Create and Manage User Phones Without Any Hassle
                    </h3>
                    <ul className="list-none p-0 m-0 text-xs md:text-sm leading-relaxed">
                      <li className="relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1">
                        <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                        <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Instant Setup – New phones are created quickly and ready to use</span>
                      </li>
                      <li className="relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1">
                        <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                        <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Personalized Phone Naming – Organize phones by employee name, team, or department</span>
                      </li>
                      <li className="relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1">
                        <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                        <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">One-Click Activation – Just save, and your new phone is instantly activated!</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex-1 min-w-[240px] sm:min-w-[280px] max-w-[500px]">
                    <div className="swiper-container" style={{width: '100%', borderRadius: '16px', overflow: 'hidden'}}>
                      <div className="swiper-wrapper">
                        <div className="swiper-slide">
                          <img src="/images/features/phones_new.png" alt="Phones" style={{width: '100%', display: 'block'}} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'unified-communications' && (
              <div className="border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-8 bg-white dark:bg-[#1E1E1E]">
                <div className="flex gap-4 md:gap-10 items-center mb-4 md:mb-8 flex-wrap justify-center">
                  <div className="flex-1 min-w-[240px] sm:min-w-[280px] text-left">
                    <h3 className="font-plus-jakarta-sans font-semibold text-sm md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white">
                      Easily forward incoming calls to one or multiple agents using smart ring strategies tailored to your business.
                    </h3>
                    <ul className="list-none p-0 m-0 text-xs md:text-sm leading-relaxed">
                      <li className="relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1">
                        <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                        <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Multiple Ring Strategies – Choose from Ring All, Sequential, or Random ring patterns based on your team structure</span>
                      </li>
                      <li className="relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1">
                        <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                        <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Add Multiple Phones – Group multiple team members or departments under one ring group</span>
                      </li>
                      <li className="relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1">
                        <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                        <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Flexible Call Distribution – Ensure no call goes unanswered by distributing calls intelligently across your team</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex-1 min-w-[240px] sm:min-w-[280px] max-w-[500px]">
                    <div className="swiper-container" style={{width: '100%', borderRadius: '16px', overflow: 'hidden'}}>
                      <div className="swiper-wrapper">
                        <div className="swiper-slide">
                          <img src="/images/features/ring_group_new.png" alt="Ring Groups" style={{width: '100%', display: 'block'}} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sound-file' && (
              <div className="border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-8 bg-white dark:bg-[#1E1E1E]">
                <div className="flex gap-4 md:gap-10 items-center mb-4 md:mb-8 flex-wrap justify-center">
                  <div className="flex-1 min-w-[240px] sm:min-w-[280px] text-left">
                    <h3 className="font-plus-jakarta-sans font-semibold text-sm md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white">
                      Record Your Own Voice for Call Flows to Boost Customer Satisfaction
                    </h3>
                    <ul className="list-none p-0 m-0 text-xs md:text-sm leading-relaxed">
                      <li className="relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1">
                        <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                        <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Record Your Own Voice – Create and upload custom welcome messages, menu prompts, or announcements for your callers</span>
                      </li>
                      <li className="relative mb-2 md:mb-4 pl-6 md:pl-9 pr-1 md:pr-2.5 py-1">
                        <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                        <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Use Immediately After Upload – Your voice recording becomes instantly available in the call flow as soon as it's uploaded</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex-1 min-w-[240px] sm:min-w-[280px] max-w-[500px]">
                    <div className="swiper-container" style={{width: '100%', borderRadius: '16px', overflow: 'hidden'}}>
                      <div className="swiper-wrapper">
                        <div className="swiper-slide">
                          <img src="/images/website/sound_file.png" alt="Custom Audio" style={{width: '100%', display: 'block'}} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>

        {activeImage && (
          <div
            className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm px-4 py-6 sm:px-8 sm:py-10 flex items-center justify-center"
            onClick={() => setActiveImage(null)}
          >
            <button
              type="button"
              aria-label="Close image preview"
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 text-xl leading-none"
              onClick={() => setActiveImage(null)}
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
          .features-page .swiper-container img {
            cursor: zoom-in;
          }
        `}</style>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
