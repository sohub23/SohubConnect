import { useState, useEffect } from 'react';

export default function FeatureSections() {
  const [activeTab1, setActiveTab1] = useState('call-efficiency');
  const [activeTab2, setActiveTab2] = useState('dashboard');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
    script.async = true;
    document.body.appendChild(script);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
    document.head.appendChild(link);

    script.onload = () => {
      if (window.Swiper) {
        setTimeout(() => {
          document.querySelectorAll('.swiper-container').forEach(container => {
            const slideCount = container.querySelectorAll('.swiper-slide').length;
            new window.Swiper(container, {
              loop: slideCount > 1,
              autoplay: slideCount > 1 ? { delay: 3000, disableOnInteraction: false } : false
            });
          });
        }, 200);
      }
    };

    return () => {
      if (script.parentNode) document.body.removeChild(script);
      if (link.parentNode) document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    if (window.Swiper) {
      setTimeout(() => {
        document.querySelectorAll('.swiper-container').forEach(container => {
          if (!container.swiper) {
            const slideCount = container.querySelectorAll('.swiper-slide').length;
            new window.Swiper(container, {
              loop: slideCount > 1,
              autoplay: slideCount > 1 ? { delay: 3000, disableOnInteraction: false } : false
            });
          }
        });
      }, 200);
    }
  }, [activeTab1, activeTab2]);

  return (
    <>
      {/* Section 1: Explore SOHUB Connect Functionalities */}
      <section className="py-4 md:py-6 lg:py-10 px-4 bg-white dark:bg-[#121212]">
        <div className="max-w-[920px] mx-auto my-4 md:my-6 lg:my-10 text-center p-3 md:p-4 lg:p-5 rounded-xl shadow-lg bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700">
          
          <h1 className="font-plus-jakarta-sans font-bold text-lg md:text-xl lg:text-2xl mb-3 md:mb-4 lg:mb-5 text-[#111111] dark:text-white">
            Explore <span className="text-[#22C55E]">SOHUB Connect</span> Functionalities
          </h1>

          <div className="bg-white/50 dark:bg-[#1a1a1a]/50 backdrop-blur-xl rounded-t-xl px-2 md:px-4 lg:px-6 py-2 border border-gray-200/50 dark:border-gray-700/50 border-b-0 flex gap-1 md:gap-1.5 text-xs md:text-sm font-medium select-none mb-0 overflow-x-auto">
            {[
              {id: 'call-efficiency', label: 'Call Flow'},
              {id: 'work-anywhere', label: 'Extensions'},
              {id: 'unified-communications', label: 'Ring Groups'},
              {id: 'cug', label: 'Closed User Group'},
              {id: 'sound-file', label: 'Custom Audio'},
              {id: 'tts', label: 'Text to Speech'}
            ].map(tab => (
              <div
                key={tab.id}
                onClick={() => setActiveTab1(tab.id)}
                className={`px-2.5 md:px-3 lg:px-4 py-2 cursor-pointer whitespace-nowrap transition-all duration-200 font-inter rounded-lg ${
                  activeTab1 === tab.id 
                    ? 'bg-white dark:bg-[#2a2a2a] text-[#111111] dark:text-white font-semibold shadow-sm' 
                    : 'text-[#86868b] dark:text-[#86868b] hover:opacity-70 hover:bg-gray-100/50 dark:hover:bg-[#2a2a2a]/50'
                }`}
              >
                {tab.label}
              </div>
            ))}
          </div>

          {activeTab1 === 'call-efficiency' && (
            <div className="border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-6 lg:p-8 bg-white dark:bg-[#1E1E1E]">
              <div className="flex gap-4 md:gap-6 lg:gap-10 items-center flex-wrap">
                <div className="flex-1 min-w-[280px] text-left">
                  <h3 className="font-plus-jakarta-sans font-semibold text-base md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white">
                    Deliver a professional calling experience with SOHUB Connect's smart IVR — no hardware or setup hassle.
                  </h3>
                  <ul className="list-none p-0 m-0 text-xs md:text-sm leading-relaxed">
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9 pr-2 md:pr-2.5 py-1">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Custom Welcome Messages – Set your own audio recordings or personalized greetings to welcome callers</span>
                    </li>
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9 pr-2 md:pr-2.5 py-1">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Interactive Voice Menus – Allow callers to choose options like "Press 1 for Sales, Press 2 for Support"</span>
                    </li>
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9 pr-2 md:pr-2.5 py-1">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Smart Call Transfers – Automatically route callers to the right team or extension based on their needs</span>
                    </li>
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9 pr-2 md:pr-2.5 py-1">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Playback Audio Messages – Announce updates, business hours, or other important information through audio</span>
                    </li>
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9 pr-2 md:pr-2.5 py-1">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">CUG & Ring Group Integration – Forward calls using specific verified numbers and smart ring strategies</span>
                    </li>
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9 pr-2 md:pr-2.5 py-1">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Fully Web-Based – Create, update, and manage your entire call flow from anywhere in the country</span>
                    </li>
                  </ul>
                  <p className="font-inter text-xs md:text-sm text-[#525252] dark:text-white dark:text-opacity-70 mt-3 md:mt-5">
                    Ensure fast, accurate, and professional responses—right from the first ring.
                  </p>
                </div>
                <div className="flex-1 min-w-[280px] max-w-[500px]">
                  <div className="swiper-container" style={{width: '100%', borderRadius: '16px', overflow: 'hidden'}}>
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <img src="/images/features/call_flow1.png" alt="Call Flow" style={{width: '100%', display: 'block'}} />
                      </div>
                      <div className="swiper-slide">
                        <img src="/images/features/call_flow2.png" alt="Call Flow" style={{width: '100%', display: 'block'}} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab1 === 'work-anywhere' && (
            <div className="border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-6 lg:p-8 bg-white dark:bg-[#1E1E1E]">
              <div className="flex gap-4 md:gap-6 lg:gap-10 items-center flex-wrap">
                <div className="flex-1 min-w-[280px] text-left">
                  <h3 className="font-plus-jakarta-sans font-semibold text-base md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white">
                    Easily Create and Manage User Extensions Without Any Hassle
                  </h3>
                  <ul className="list-none p-0 m-0 text-xs md:text-sm leading-relaxed">
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9 pr-2 md:pr-2.5 py-1">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Auto Extension Numbering – New extensions are assigned numbers automatically</span>
                    </li>
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9 pr-2 md:pr-2.5 py-1">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Personalized Extension Naming – Assign extensions based on employee name, ID, or department</span>
                    </li>
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9 pr-2 md:pr-2.5 py-1">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">One-Click Activation – Just save, and your new extension is instantly activated!</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-1 min-w-[280px] max-w-[500px]">
                  <div className="swiper-container" style={{width: '100%', borderRadius: '16px', overflow: 'hidden'}}>
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <img src="/images/features/extension1.png" alt="Extensions" style={{width: '100%', display: 'block'}} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab1 === 'unified-communications' && (
            <div className="border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-6 lg:p-8 bg-white dark:bg-[#1E1E1E]">
              <div className="flex gap-4 md:gap-6 lg:gap-10 items-center flex-wrap">
                <div className="flex-1 min-w-[280px] text-left">
                  <h3 className="font-plus-jakarta-sans font-semibold text-base md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white">
                    Easily forward incoming calls to one or multiple agents using smart ring strategies tailored to your business.
                  </h3>
                  <ul className="list-none p-0 m-0 text-xs md:text-sm leading-relaxed">
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9 pr-2 md:pr-2.5 py-1">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Multiple Ring Strategies – Choose from Ring All, Sequential, or Random ring patterns based on your team structure</span>
                    </li>
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9 pr-2 md:pr-2.5 py-1">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Add Multiple Extensions – Group multiple team members or departments under one ring group</span>
                    </li>
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9 pr-2 md:pr-2.5 py-1">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Flexible Call Distribution – Ensure no call goes unanswered by distributing calls intelligently across your team</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-1 min-w-[280px] max-w-[500px]">
                  <div className="swiper-container" style={{width: '100%', borderRadius: '16px', overflow: 'hidden'}}>
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <img src="/images/features/ring_group1.png" alt="Ring Groups" style={{width: '100%', display: 'block'}} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab1 === 'cug' && (
            <div className="border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-6 lg:p-8 bg-white dark:bg-[#1E1E1E]">
              <div className="flex gap-4 md:gap-6 lg:gap-10 items-center flex-wrap">
                <div className="flex-1 min-w-[280px] text-left">
                  <h3 className="font-plus-jakarta-sans font-semibold text-base md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white">
                    With CUG, securely forward calls to specific numbers — safely and confidently.
                  </h3>
                  <ul className="list-none p-0 m-0 text-xs md:text-sm leading-relaxed">
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9 pr-2 md:pr-2.5 py-1">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Connect Verified Numbers – Register trusted mobile or external numbers for secure call forwarding</span>
                    </li>
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9 pr-2 md:pr-2.5 py-1">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Use in Call Flow – Easily forward calls to CUG numbers within your inbound routing setup</span>
                    </li>
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9 pr-2 md:pr-2.5 py-1">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Enhanced Control – Limit call forwarding to only verified and authorized contacts as needed</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-1 min-w-[280px] max-w-[500px]">
                  <div className="swiper-container" style={{width: '100%', borderRadius: '16px', overflow: 'hidden'}}>
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <img src="/images/features/cug1.png" alt="CUG" style={{width: '100%', display: 'block'}} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab1 === 'sound-file' && (
            <div className="border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-6 lg:p-8 bg-white dark:bg-[#1E1E1E]">
              <div className="flex gap-4 md:gap-6 lg:gap-10 items-center flex-wrap">
                <div className="flex-1 min-w-[280px] text-left">
                  <h3 className="font-plus-jakarta-sans font-semibold text-base md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white">
                    Record Your Own Voice for Call Flows to Boost Customer Satisfaction
                  </h3>
                  <ul className="list-none p-0 m-0 text-xs md:text-sm leading-relaxed">
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9 pr-2 md:pr-2.5 py-1">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Record Your Own Voice – Create and upload custom welcome messages, menu prompts, or announcements for your callers</span>
                    </li>
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9 pr-2 md:pr-2.5 py-1">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Use Immediately After Upload – Your voice recording becomes instantly available in the call flow as soon as it's uploaded</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-1 min-w-[280px] max-w-[500px]">
                  <div className="swiper-container" style={{width: '100%', borderRadius: '16px', overflow: 'hidden'}}>
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <img src="/images/features/sound1.png" alt="Custom Audio" style={{width: '100%', display: 'block'}} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab1 === 'tts' && (
            <div className="border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-6 lg:p-8 bg-white dark:bg-[#1E1E1E]">
              <div className="flex gap-4 md:gap-6 lg:gap-10 items-center flex-wrap">
                <div className="flex-1 min-w-[280px] text-left">
                  <h3 className="font-plus-jakarta-sans font-semibold text-base md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white">
                    AI-Generated Audio – Create voice prompts from text without recording your own voice
                  </h3>
                  <ul className="list-none p-0 m-0 text-xs md:text-sm leading-relaxed">
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9 pr-2 md:pr-2.5 py-1">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Text-to-Speech – Instantly convert your written Bangla or English text into voice using TTS technology</span>
                    </li>
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9 pr-2 md:pr-2.5 py-1">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Use TTS for Call Flow – Easily incorporate voice into your call flow, from welcome messages to user input and announcements</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-1 min-w-[280px] max-w-[500px]">
                  <div className="swiper-container" style={{width: '100%', borderRadius: '16px', overflow: 'hidden'}}>
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <img src="/images/features/tts1.png" alt="TTS" style={{width: '100%', display: 'block'}} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Section 2: Real-Time Monitoring */}
      <section className="py-4 md:py-6 lg:py-10 px-4 bg-white dark:bg-[#121212]">
        <div className="max-w-[920px] mx-auto my-4 md:my-6 lg:my-10 text-center p-3 md:p-4 lg:p-5 rounded-xl shadow-lg bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700">
          
          <h1 className="font-plus-jakarta-sans font-bold text-lg md:text-xl lg:text-2xl mb-3 md:mb-4 lg:mb-5 text-[#111111] dark:text-white">
            <span className="text-[#22C55E]">Real-Time Monitoring</span>, Analytics, and <span className="text-[#22C55E]">Actionable Control</span>
          </h1>

          <div className="bg-white/50 dark:bg-[#1a1a1a]/50 backdrop-blur-xl rounded-t-xl px-2 md:px-4 lg:px-6 py-2 border border-gray-200/50 dark:border-gray-700/50 border-b-0 flex gap-1 md:gap-1.5 text-xs md:text-sm font-medium select-none mb-0 overflow-x-auto">
            {[
              {id: 'dashboard', label: 'Dashboard'},
              {id: 'operator-panel', label: 'Operator Panel'},
              {id: 'call-report', label: 'Call Report'},
              {id: 'transaction', label: 'Transaction'},
              {id: 'quick-call', label: 'Quick Communication'},
              {id: 'ticketing', label: 'Problem Ticketing'},
              {id: 'download', label: 'Download Phone Software'}
            ].map(tab => (
              <div
                key={tab.id}
                onClick={() => setActiveTab2(tab.id)}
                className={`px-2.5 md:px-3 lg:px-4 py-2 cursor-pointer whitespace-nowrap transition-all duration-200 font-inter rounded-lg ${
                  activeTab2 === tab.id 
                    ? 'bg-white dark:bg-[#2a2a2a] text-[#111111] dark:text-white font-semibold shadow-sm' 
                    : 'text-[#86868b] dark:text-[#86868b] hover:opacity-70 hover:bg-gray-100/50 dark:hover:bg-[#2a2a2a]/50'
                }`}
              >
                {tab.label}
              </div>
            ))}
          </div>

          {activeTab2 === 'dashboard' && (
            <div className="border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-6 lg:p-8 bg-white dark:bg-[#1E1E1E]">
              <div className="flex gap-4 md:gap-6 lg:gap-10 items-center flex-wrap">
                <div className="flex-1 min-w-[280px] text-left">
                  <h3 className="font-plus-jakarta-sans font-semibold text-base md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white">
                    Monitor and manage your business calls in real time from a clean, minimal dashboard.
                  </h3>
                  <ul className="list-none p-0 m-0 text-xs md:text-sm leading-relaxed">
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Clean & Minimal Interface – So intuitive, you won't need to read a manual</span>
                    </li>
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Live Call Monitoring – Monitor active calls in real time</span>
                    </li>
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Answered Calls (Today) – Instantly view how many calls were successfully handled today</span>
                    </li>
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Answered Calls (This Month) – Get a quick view of your team's monthly call handling performance</span>
                    </li>
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Call Analytics Graph – View all your call activity with an interactive 15-day summary</span>
                    </li>
                  </ul>
                  <p className="font-inter text-xs md:text-sm text-[#525252] dark:text-white dark:text-opacity-70 mt-3 md:mt-5">
                    Make smarter decisions with real-time insights, right from your SOHUB Connect dashboard.
                  </p>
                </div>
                <div className="flex-1 min-w-[280px] max-w-[500px]">
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

          {activeTab2 === 'operator-panel' && (
            <div className="border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-6 lg:p-8 bg-white dark:bg-[#1E1E1E]">
              <div className="flex gap-4 md:gap-6 lg:gap-10 items-center flex-wrap">
                <div className="flex-1 min-w-[280px] text-left">
                  <h3 className="font-plus-jakarta-sans font-semibold text-base md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white">
                    Monitor all extension activities in real time and stay fully in control of your team's communication status.
                  </h3>
                  <ul className="list-none p-0 m-0 text-xs md:text-sm leading-relaxed">
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Real-Time Extension Monitoring – Instantly view the real-time status of each extension</span>
                    </li>
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Live Presence Indicators – See who is online, offline, on a call, or idle right from your dashboard</span>
                    </li>
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Centralized View – All extension statuses available from a single, intuitive interface</span>
                    </li>
                  </ul>
                  <p className="font-inter text-xs md:text-sm text-[#525252] dark:text-white dark:text-opacity-70 mt-3 md:mt-5">
                    Empower supervisors and admins with live visibility to enhance team performance and response time.
                  </p>
                </div>
                <div className="flex-1 min-w-[280px] max-w-[500px]">
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

          {activeTab2 === 'call-report' && (
            <div className="border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-6 lg:p-8 bg-white dark:bg-[#1E1E1E]">
              <div className="flex gap-4 md:gap-6 lg:gap-10 items-center flex-wrap">
                <div className="flex-1 min-w-[280px] text-left">
                  <h3 className="font-plus-jakarta-sans font-semibold text-base md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white">
                    Access detailed call history and analytics to track, audit, and optimize your communication performance.
                  </h3>
                  <ul className="list-none p-0 m-0 text-xs md:text-sm leading-relaxed">
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Complete CDR (Call Detail Record) – Access full details of all inbound and outbound calls</span>
                    </li>
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Comprehensive Details – Includes call duration, time, caller/callee, status, and more</span>
                    </li>
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Search & Filter Options – Quickly find specific calls by date, number, or status</span>
                    </li>
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Export Reports – Download call logs for audits, analysis, or documentation purposes</span>
                    </li>
                  </ul>
                  <p className="font-inter text-xs md:text-sm text-[#525252] dark:text-white dark:text-opacity-70 mt-3 md:mt-5">
                    Stay updated and make data-driven decisions from every call on your system.
                  </p>
                </div>
                <div className="flex-1 min-w-[280px] max-w-[500px]">
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

          {activeTab2 === 'transaction' && (
            <div className="border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-6 lg:p-8 bg-white dark:bg-[#1E1E1E]">
              <div className="flex gap-4 md:gap-6 lg:gap-10 items-center flex-wrap">
                <div className="flex-1 min-w-[280px] text-left">
                  <h3 className="font-plus-jakarta-sans font-semibold text-base md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white">
                    Track all your business transactions directly within your SOHUB Connect account—with full transparency.
                  </h3>
                  <ul className="list-none p-0 m-0 text-xs md:text-sm leading-relaxed">
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Wallet Reload Details – Check your wallet balance and track all top-ups, including bKash and other payment methods</span>
                    </li>
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Cost Deductions – Know the exact charges in advance for using features like extensions or other services</span>
                    </li>
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Complete Charge History – View a detailed list of all your usage charges in one place</span>
                    </li>
                  </ul>
                  <p className="font-inter text-xs md:text-sm text-[#525252] dark:text-white dark:text-opacity-70 mt-3 md:mt-5">
                    Stay financially updated with a clear record of every transaction on your account.
                  </p>
                </div>
                <div className="flex-1 min-w-[280px] max-w-[500px]">
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

          {activeTab2 === 'quick-call' && (
            <div className="border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-6 lg:p-8 bg-white dark:bg-[#1E1E1E]">
              <div className="flex gap-4 md:gap-6 lg:gap-10 items-center flex-wrap">
                <div className="flex-1 min-w-[280px] text-left">
                  <h3 className="font-plus-jakarta-sans font-semibold text-base md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white">
                    Instant Calling Without Configuration – Just select and dial
                  </h3>
                  <ul className="list-none p-0 m-0 text-xs md:text-sm leading-relaxed">
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">No Setup Needed – Use it directly from the admin panel</span>
                    </li>
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Contact Any Extension – Easily route calls to specific staff or groups as needed</span>
                    </li>
                  </ul>
                  <p className="font-inter text-xs md:text-sm text-[#525252] dark:text-white dark:text-opacity-70 mt-3 md:mt-5">
                    Use Quick Call to save time, make instant calls, and boost internal communication.
                  </p>
                </div>
                <div className="flex-1 min-w-[280px] max-w-[500px]">
                  <div className="swiper-container" style={{width: '100%', borderRadius: '16px', overflow: 'hidden'}}>
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <img src="/images/features/quick_call1.png" alt="Quick Call" style={{width: '100%', display: 'block'}} />
                      </div>
                      <div className="swiper-slide">
                        <img src="/images/features/quick_call2.png" alt="Quick Call" style={{width: '100%', display: 'block'}} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab2 === 'ticketing' && (
            <div className="border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-6 lg:p-8 bg-white dark:bg-[#1E1E1E]">
              <div className="flex gap-4 md:gap-6 lg:gap-10 items-center flex-wrap">
                <div className="flex-1 min-w-[280px] text-left">
                  <h3 className="font-plus-jakarta-sans font-semibold text-base md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white">
                    Raise a Ticket and Get Fast Support from the SOHUB Team
                  </h3>
                  <ul className="list-none p-0 m-0 text-xs md:text-sm leading-relaxed">
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Submit technical or billing issues directly through SOHUB's ticketing system</span>
                    </li>
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Track ticket status and progress all in one place</span>
                    </li>
                  </ul>
                  <p className="font-inter text-xs md:text-sm text-[#525252] dark:text-white dark:text-opacity-70 mt-3 md:mt-5">
                    Ticketing ensures professional, documented, and well-organized support for all your business needs.
                  </p>
                </div>
                <div className="flex-1 min-w-[280px] max-w-[500px]">
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

          {activeTab2 === 'download' && (
            <div className="border border-gray-200 dark:border-gray-700 rounded-b-xl p-4 md:p-6 lg:p-8 bg-white dark:bg-[#1E1E1E]">
              <div className="flex gap-4 md:gap-6 lg:gap-10 items-center flex-wrap">
                <div className="flex-1 min-w-[280px] text-left">
                  <h3 className="font-plus-jakarta-sans font-semibold text-base md:text-lg mb-3 md:mb-4 text-[#111111] dark:text-white">
                    No hardware needed — download our official soft phone on your laptop or desktop and start calling seamlessly.
                  </h3>
                  <ul className="list-none p-0 m-0 text-xs md:text-sm leading-relaxed">
                    <li className="relative mb-3 md:mb-4 pl-7 md:pl-9">
                      <span className="absolute left-0 text-[#22C55E] font-bold">✔</span>
                      <span className="font-inter text-[#525252] dark:text-white dark:text-opacity-80">Download the soft phone easily and install it without hassle. Make professional calls using your laptop or desktop—no hardware phone needed.</span>
                    </li>
                  </ul>
                  <a href="https://connect.sohub.com.bd/assets/file/softphone/SohubConnect-3.21.5.exe" target="_blank" rel="noopener noreferrer" className="inline-block mt-3 font-semibold bg-[#22C55E] hover:bg-[#16A34A] text-white px-6 py-2.5 rounded-full no-underline text-sm transition-colors">
                    Download Now
                  </a>
                </div>
                <div className="flex-1 min-w-[280px] max-w-[500px]">
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
    </>
  );
}
