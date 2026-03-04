"use client";
import { ArrowUpRight, Menu, X, Sun, Moon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

const HOME_PATHS = ['/', '/sohub'];
const INITIATIVES = [
  {
    name: 'O-MAMA',
    href: 'https://omama.sohub.com.bd/',
    logoSrc: '/images/initiatives/Omama.png',
    logoClass: 'max-h-10 sm:max-h-11',
  },
  {
    name: 'EMP',
    href: 'https://emp.sohub.com.bd/',
    logoSrc: '/images/initiatives/EMP.png',
    logoClass: 'max-h-10 sm:max-h-11',
  },
  {
    name: 'TOLPAR',
    href: '#',
    logoSrc: '/images/initiatives/TOLPAR.png',
    logoClass: 'max-h-10 sm:max-h-11',
  },
  {
    name: 'AI',
    href: '#',
    logoSrc: '/images/initiatives/SOHUB_AI.svg',
    logoClass: 'max-h-10 sm:max-h-11',
  },
  {
    name: 'PROTECT',
    href: '#',
    logoSrc: '/images/initiatives/SOHUB_PROTECT.png',
    logoClass: 'max-h-10 sm:max-h-11',
  },
  {
    name: 'SOHUB CONTROLS',
    href: '#',
    logoSrc: '/images/initiatives/SOHUB_CONTROLS.png',
    logoClass: 'max-h-10 sm:max-h-11',
  },
  {
    name: 'MACHINE BY SOHUB',
    href: '#',
    logoSrc: '/images/initiatives/MACHINE_BY_SOHUB.png',
    logoClass: 'max-h-10 sm:max-h-11',
  },
  {
    name: 'Smart Home',
    href: 'https://home.sohub.com.bd/',
    logoSrc: '/images/initiatives/SMART_HOME.png',
    logoClass: 'max-h-10 sm:max-h-11',
  },
  {
    name: 'FILMIC STATION',
    href: '#',
    logoSrc: '/images/initiatives/FILMIC_STATION.png',
    logoClass: 'max-h-10 sm:max-h-11',
  },
  {
    name: 'XIMPUL',
    href: 'https://ximpul.com/',
    logoSrc: '/images/initiatives/XIMPUL.png',
    logoClass: 'max-h-10 sm:max-h-11',
  },
  {
    name: 'CLOWEE',
    href: '#',
    logoSrc: '/images/initiatives/CLOWEE.png',
    logoClass: 'max-h-10 sm:max-h-11',
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [initiativesOpen, setInitiativesOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [activeSection, setActiveSection] = useState('');
  const initiativesCloseTimeoutRef = useRef(null);
  const { bgColor, toggleBgColor } = useTheme();
  const ownedByLogoSrc =
    bgColor === 'white' ? '/images/sohub.png' : '/images/sohub_white.png';

  const clearInitiativesCloseTimeout = () => {
    if (initiativesCloseTimeoutRef.current) {
      clearTimeout(initiativesCloseTimeoutRef.current);
      initiativesCloseTimeoutRef.current = null;
    }
  };

  const openInitiativesDrawer = () => {
    clearInitiativesCloseTimeout();
    setMobileMenuOpen(false);
    setInitiativesOpen(true);
  };

  const scheduleCloseInitiativesDrawer = () => {
    clearInitiativesCloseTimeout();
    initiativesCloseTimeoutRef.current = setTimeout(() => {
      setInitiativesOpen(false);
      initiativesCloseTimeoutRef.current = null;
    }, 180);
  };

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    
    // Listen for both popstate and custom navigation events
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('pushstate', handleLocationChange);
    window.addEventListener('replacestate', handleLocationChange);
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pushstate', handleLocationChange);
      window.removeEventListener('replacestate', handleLocationChange);
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setActiveSection(hash.substring(1));
      const element = document.getElementById(hash.substring(1));
      if (element) {
        requestAnimationFrame(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        });
      }
    }
  }, []);

  useEffect(() => {
    if (mobileMenuOpen || initiativesOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, initiativesOpen]);

  useEffect(() => {
    if (!initiativesOpen) return;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setInitiativesOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [initiativesOpen]);

  useEffect(() => {
    return () => {
      clearInitiativesCloseTimeout();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['pbx', 'pricing'];
      let currentSection = '';
      
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = sectionId;
          }
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    setActiveSection(sectionId);
    const isHomePage = HOME_PATHS.includes(window.location.pathname);
    
    if (!isHomePage) {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`w-full border-b sticky top-0 z-50 backdrop-blur-sm ${
      bgColor === 'white' 
        ? 'bg-white/95 border-gray-200' 
        : 'bg-white dark:bg-[#121212] border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-[#121212]/95'
    }`}>
      <div
        className={`fixed left-0 right-0 bottom-0 top-[92px] sm:top-[104px] z-[45] transition-opacity duration-300 ${
          initiativesOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <button
          type="button"
          aria-label="Close initiatives drawer"
          onClick={() => setInitiativesOpen(false)}
          className="absolute inset-0 bg-black/10"
        />
      </div>

      <div
        id="initiatives-drawer"
        onMouseEnter={clearInitiativesCloseTimeout}
        onMouseLeave={scheduleCloseInitiativesDrawer}
        className={`fixed top-[92px] sm:top-[104px] left-0 right-0 z-[46] origin-top transform-gpu transition-[transform,opacity] duration-300 ease-out ${
          initiativesOpen
            ? 'scale-y-100 opacity-100 pointer-events-auto'
            : 'scale-y-0 opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`border-b rounded-b-2xl shadow-2xl ${
            bgColor === 'white'
              ? 'bg-[#f3f4f6] border-gray-200'
              : 'bg-[#0f1115] border-gray-800'
          }`}
        >
            <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-4 sm:pt-5 pb-4 sm:pb-5">
            <div className="mb-2 sm:mb-3" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-5 lg:gap-x-6 gap-y-2 sm:gap-y-3 lg:gap-y-4">
                {INITIATIVES.map((initiative) => {
                  const isInteractive = typeof initiative.href === 'string' && initiative.href !== '#';
                  const cardClass = `group relative h-[72px] sm:h-[80px] lg:h-[86px] rounded-xl flex items-center justify-center px-2 sm:px-2.5 transition-colors ${
                    bgColor === 'white'
                      ? 'hover:bg-white/80'
                      : 'hover:bg-[#161a23]'
                  }`;

                  const content = (
                    <>
                      {initiative.logoSrc ? (
                        <img
                          src={initiative.logoSrc}
                          alt={`${initiative.name} logo`}
                          className="w-[100px] h-[56.66px] object-contain grayscale group-hover:grayscale-0 transition-all duration-200"
                        />
                      ) : (
                        <p
                          className={`font-inter text-2xl sm:text-[2rem] lg:text-[2.15rem] font-extrabold leading-none tracking-tight ${
                            bgColor === 'white' ? 'text-[#4b5563]' : 'text-[#cbd5e1]'
                          }`}
                        >
                          {initiative.name}
                        </p>
                      )}
                      {isInteractive ? (
                        <ArrowUpRight
                          size={14}
                          className={`absolute right-2 top-2 shrink-0 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                            bgColor === 'white' ? 'text-[#6b7280]' : 'text-[#9ca3af]'
                          }`}
                        />
                      ) : null}
                    </>
                  );

                  if (!isInteractive) {
                    return (
                      <div key={initiative.name} className={`${cardClass} cursor-default`} aria-disabled="true">
                        {content}
                      </div>
                    );
                  }

                  return (
                    <a
                      key={initiative.name}
                      href={initiative.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setInitiativesOpen(false)}
                      className={`${cardClass} cursor-pointer`}
                    >
                      {content}
                    </a>
                  );
                })}
            </div>
            </div>
        </div>
      </div>

      <div
        className={`border-b ${
          bgColor === 'white'
            ? 'bg-[#f3f4f6] border-gray-200'
            : 'bg-[#1a1a1a] border-gray-800'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between gap-3">
          <a
            href="https://sohub.com.bd/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 sm:h-11 min-w-0 inline-flex items-center gap-2.5"
          >
            <img
              src={ownedByLogoSrc}
              alt="Solution Hub Technologies"
              className="h-5 sm:h-6 w-auto object-contain"
            />
            <span
              className={`font-inter text-xs sm:text-sm font-medium text-left truncate ${
                bgColor === 'white' ? 'text-[#4b5563]' : 'text-[#d1d5db]'
              }`}
            >
              Solution Hub Technologies(SOHUB) Owned & Operated
            </span>
          </a>
          <button
            type="button"
            onMouseEnter={openInitiativesDrawer}
            onMouseLeave={scheduleCloseInitiativesDrawer}
            onFocus={openInitiativesDrawer}
            onBlur={scheduleCloseInitiativesDrawer}
            onClick={() => {
              if (initiativesOpen) {
                setInitiativesOpen(false);
              } else {
                openInitiativesDrawer();
              }
            }}
            className={`h-9 sm:h-10 shrink-0 px-4 sm:px-5 rounded-md font-inter text-sm font-semibold transition-colors ${
              bgColor === 'white'
                ? 'bg-white text-[#374151] hover:bg-gray-50'
                : 'bg-[#121212] text-[#e5e7eb] hover:bg-[#1f2937]'
            }`}
            aria-expanded={initiativesOpen}
            aria-controls="initiatives-drawer"
          >
            Initiatives
          </button>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="block">
              <img 
                src="/images/connect_new_img.png" 
                alt="SOHUB Connect Logo" 
                className="w-28 sm:w-32 h-auto object-contain cursor-pointer"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/#pbx"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection('pbx');
              }}
              className={`font-inter text-sm font-medium hover:text-[#22C55E] transition-colors duration-200 cursor-pointer ${
                activeSection === 'pbx' ? 'font-bold text-[#22C55E]' : 'text-[#525252] dark:text-white'
              }`}
            >
              PBX
            </a>
            <a
              href="/click-to-connect"
              onClick={(e) => {
                setCurrentPath('/click-to-connect');
              }}
              className={`font-inter text-sm font-medium hover:text-[#22C55E] transition-colors duration-200 ${
                currentPath === '/click-to-connect' ? 'font-bold text-[#22C55E]' : 'text-[#525252] dark:text-white'
              }`}
            >
              Click to Connect
            </a>
            <a
              href="/hotscan"
              onClick={(e) => {
                setCurrentPath('/hotscan');
              }}
              className={`font-inter text-sm font-medium hover:text-[#22C55E] transition-colors duration-200 ${
                currentPath === '/hotscan' ? 'font-bold text-[#22C55E]' : 'text-[#525252] dark:text-white'
              }`}
            >
              HotScan
            </a>
            <a
              href="/features"
              onClick={(e) => {
                setCurrentPath('/features');
              }}
              className={`font-inter text-sm font-medium hover:text-[#22C55E] transition-colors duration-200 ${
                currentPath === '/features' ? 'font-bold text-[#22C55E]' : 'text-[#525252] dark:text-white'
              }`}
            >
              Features
            </a>
            <a
              href="/#pricing"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection('pricing');
              }}
              className={`font-inter text-sm font-medium hover:text-[#22C55E] transition-colors duration-200 cursor-pointer ${
                activeSection === 'pricing' ? 'font-bold text-[#22C55E]' : 'text-[#525252] dark:text-white'
              }`}
            >
              Pricing
            </a>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleBgColor}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {bgColor === 'white' ? <Moon size={20} className="text-gray-600 dark:text-gray-400" /> : <Sun size={20} className="text-gray-600 dark:text-gray-400" />}
            </button>
            <a
              href="https://connect.sohub.com.bd/authentication/register"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#22C55E] text-white font-inter font-semibold text-sm hover:bg-[#16A34A] active:bg-[#15803D] active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:ring-opacity-50"
            >
              Start Free Forever
            </a>
          </div>

          {/* Mobile CTA + Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleBgColor}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {bgColor === 'white' ? <Moon size={18} className="text-gray-600 dark:text-gray-400" /> : <Sun size={18} className="text-gray-600 dark:text-gray-400" />}
            </button>
            <a
              href="https://connect.sohub.com.bd/authentication/register"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-full bg-[#22C55E] text-white font-inter font-semibold text-xs hover:bg-[#16A34A] transition-all duration-200"
            >
              Start Free Forever
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#525252] dark:text-gray-400 hover:text-[#22C55E] dark:hover:text-[#22C55E] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed top-[92px] sm:top-[104px] left-0 right-0 bg-white dark:bg-[#121212] border-b border-gray-200 dark:border-gray-800 shadow-lg z-40">
            <nav className="flex flex-col space-y-4 px-6 py-4">
              <a
                href="/#pbx"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToSection('pbx');
                }}
                className={`font-inter text-base font-medium hover:text-[#22C55E] transition-colors duration-200 cursor-pointer ${
                  activeSection === 'pbx' ? 'font-bold text-[#22C55E]' : 'text-[#525252] dark:text-white'
                }`}
              >
                PBX
              </a>
              <a
                href="/click-to-connect"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  setCurrentPath('/click-to-connect');
                }}
                className={`font-inter text-base font-medium hover:text-[#22C55E] transition-colors duration-200 ${
                  currentPath === '/click-to-connect' ? 'font-bold text-[#22C55E]' : 'text-[#525252] dark:text-white'
                }`}
              >
                Click to Connect
              </a>
              <a
                href="/hotscan"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  setCurrentPath('/hotscan');
                }}
                className={`font-inter text-base font-medium hover:text-[#22C55E] transition-colors duration-200 ${
                  currentPath === '/hotscan' ? 'font-bold text-[#22C55E]' : 'text-[#525252] dark:text-white'
                }`}
              >
                HotScan
              </a>
              <a
                href="/features"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  setCurrentPath('/features');
                }}
                className={`font-inter text-base font-medium hover:text-[#22C55E] transition-colors duration-200 ${
                  currentPath === '/features' ? 'font-bold text-[#22C55E]' : 'text-[#525252] dark:text-white'
                }`}
              >
                Features
              </a>
              <a
                href="/#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToSection('pricing');
                }}
                className={`font-inter text-base font-medium hover:text-[#22C55E] transition-colors duration-200 cursor-pointer ${
                  activeSection === 'pricing' ? 'font-bold text-[#22C55E]' : 'text-[#525252] dark:text-white'
                }`}
              >
                Pricing
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
