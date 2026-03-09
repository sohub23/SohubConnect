"use client";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useTheme } from "./ThemeProvider";

const HOME_PATHS = ['/', '/sohub'];
const SECTION_SCROLL_OFFSET = 108;
const INITIATIVES_API_URL = 'https://sohub.netlify.app/api/initiatives.json';
const INITIATIVES_BASE_URL = 'https://sohub.netlify.app';
const DEFAULT_CONNECT_BASE_URL = 'https://connect-client.sohub.com.bd';

const CONNECT_INITIATIVE = {
  id: 'connect',
  name: 'SOHUB CONNECT',
  description: '',
  href: `${DEFAULT_CONNECT_BASE_URL}/`,
  logo: '/images/initiatives/sohub_connect.png',
  order: 0,
  isActive: true,
};
const FALLBACK_INITIATIVES = [];

function resolveInitiativeLogo(logoPath, baseUrl) {
  if (!logoPath || typeof logoPath !== 'string') {
    return '';
  }

  if (/^https?:\/\//i.test(logoPath)) {
    return logoPath;
  }

  if (logoPath.startsWith('/images/')) {
    return logoPath;
  }

  if (logoPath.startsWith('/')) {
    return `${baseUrl}${logoPath}`;
  }

  return `${baseUrl}/${logoPath}`;
}

function parseInitiativesResponse(data) {
  const items = Array.isArray(data) ? data : data?.initiatives || [];
  const baseUrl = typeof data?.baseUrl === 'string' ? data.baseUrl : INITIATIVES_BASE_URL;
  const parsed = items
    .map((item, index) => {
      const name = typeof item?.name === 'string' ? item.name : '';
      const hrefValue = typeof item?.href === 'string' ? item.href.trim() : '';
      const href = hrefValue && hrefValue !== '#' ? hrefValue : null;

      return {
        id: item?.id || `${name || 'initiative'}-${index}`,
        name,
        description: typeof item?.description === 'string' ? item.description : '',
        href,
        logo: resolveInitiativeLogo(item?.logo, baseUrl),
        order: Number.isFinite(Number(item?.order)) ? Number(item.order) : index + 1,
        isActive: item?.isActive !== false,
      };
    })
    .filter((item) => item.isActive && item.name && item.logo)
    .sort((a, b) => a.order - b.order);

  const hasConnect = parsed.some((item) => item.name.toLowerCase().includes('connect'));
  if (!hasConnect) {
    return [CONNECT_INITIATIVE, ...parsed];
  }

  return parsed;
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [initiativesOpen, setInitiativesOpen] = useState(false);
  const [initiatives, setInitiatives] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const headerRef = useRef(null);
  const initiativesContainerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const registerUrl = `${DEFAULT_CONNECT_BASE_URL}/authentication/register`;
  const { bgColor, toggleBgColor } = useTheme();
  const ownedByLogoSrc =
    bgColor === 'white' ? '/images/sohub.png' : '/images/sohub_white.png';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    fetch(INITIATIVES_API_URL, {
      mode: 'cors',
      headers: { 'Accept': 'application/json' }
    })
      .then(res => res.json())
      .then(data => setInitiatives(Array.isArray(data) ? data : data.initiatives || []))
      .catch(() => {});
  }, []);

  const toggleInitiativesDrawer = () => {
    setMobileMenuOpen(false);
    setInitiativesOpen((prev) => !prev);
  };

  const getScrollOffset = () => {
    const headerHeight = headerRef.current?.getBoundingClientRect().height ?? 96;
    return Math.ceil(headerHeight) + 12;
  };

  const scrollToSectionWithOffset = (sectionId, behavior = 'smooth', offsetOverride) => {
    const element = document.getElementById(sectionId);
    if (!element) {
      return false;
    }

    const offset = typeof offsetOverride === 'number' ? offsetOverride : getScrollOffset();
    const targetY = window.scrollY + element.getBoundingClientRect().top - offset;
    window.scrollTo({
      top: Math.max(0, targetY),
      behavior,
    });
    return true;
  };

  useEffect(() => {
    if (!HOME_PATHS.includes(location.pathname)) return;
    const sectionId = location.hash?.replace('#', '');
    if (sectionId) {
      setActiveSection(sectionId);
      requestAnimationFrame(() => {
        scrollToSectionWithOffset(sectionId, 'smooth', SECTION_SCROLL_OFFSET);
      });
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!initiativesOpen) return;
    const handleEscape = (e) => e.key === 'Escape' && setInitiativesOpen(false);
    const handleOutside = (e) => {
      if (initiativesContainerRef.current && !initiativesContainerRef.current.contains(e.target)) {
        setInitiativesOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleOutside);
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleOutside);
    };
  }, [initiativesOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!HOME_PATHS.includes(location.pathname)) {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      const sections = ['pbx', 'pricing'];
      let currentSection = '';
      const markerY = getScrollOffset() - 8;

      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= markerY && rect.bottom >= markerY) {
            currentSection = sectionId;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleScrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    setActiveSection(sectionId);
    const isHomePage = HOME_PATHS.includes(location.pathname);
    
    if (!isHomePage) {
      navigate({ pathname: '/', hash: `#${sectionId}` });
      return;
    }
    
    if (scrollToSectionWithOffset(sectionId, 'smooth', SECTION_SCROLL_OFFSET)) {
      navigate({ pathname: location.pathname, hash: `#${sectionId}` }, { replace: true });
    }
  };



  return (
    <header ref={headerRef} className={`w-full border-b sticky top-0 z-50 backdrop-blur-sm ${
      bgColor === 'white' 
        ? 'bg-white/95 border-gray-200' 
        : 'bg-white dark:bg-[#121212] border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-[#121212]/95'
    }`}>

      <div
        className={`transition-all duration-300 overflow-hidden border-b ${
          isScrolled
            ? 'max-h-0 opacity-0'
            : 'max-h-20 opacity-100'
        } ${
          bgColor === 'white'
            ? 'bg-[#f3f4f6] border-gray-200'
            : 'bg-[#1a1a1a] border-gray-800'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between py-0.5">
          <a
            href="https://sohub.com.bd/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <img
              src={ownedByLogoSrc}
              alt="Solution Hub Technologies"
              className="h-6"
            />
            <p className={`text-[10px] md:text-xs ${
                bgColor === 'white' ? 'text-[#6b7280]' : 'text-[#9ca3af]'
              }`}>
              <span className="hidden md:inline">Solution Hub Technologies(SOHUB) Owned & Operated</span>
              <span className="md:hidden">SOHUB owned & operated</span>
            </p>
          </a>
          <div ref={initiativesContainerRef} className="relative">
            <button
              type="button"
              onClick={toggleInitiativesDrawer}
              className={`text-xs gap-1 md:mr-0 -mr-4 px-2 py-1 rounded hover:bg-transparent transition-colors ${
                bgColor === 'white' ? 'text-[#6b7280]' : 'text-[#9ca3af]'
              }`}
            >
              <span className="hidden md:inline">Initiatives</span>
              <span className="md:hidden">Our Initiatives</span>
              {initiativesOpen ? <ChevronUp className="w-3 h-3 inline ml-1" /> : <ChevronDown className="w-3 h-3 inline ml-1" />}
            </button>

            {initiativesOpen && initiatives.length > 0 && (
              <div className="absolute right-0 top-full z-[70] w-[320px] p-3">
                <div className={`rounded-lg border p-3 shadow-2xl ${
                  bgColor === 'white' ? 'bg-white border-gray-300' : 'bg-[#0f1115] border-gray-700'
                }`}>
                  <div className="grid grid-cols-3 gap-3">
                    {initiatives.map((initiative) => {
                      const isCurrentSite = initiative.id === 'connect' || initiative.name.toLowerCase().includes('connect');
                      return initiative.href ? (
                        <a
                          key={initiative.id}
                          href={initiative.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => setInitiativesOpen(false)}
                          style={{ WebkitTapHighlightColor: 'transparent', outline: 'none' }}
                          className={`flex items-center justify-center p-4 rounded-lg border ${
                            isCurrentSite
                              ? 'border-[#22C55E] bg-[#22C55E]/10 ring-2 ring-[#22C55E]/30'
                              : bgColor === 'white' ? 'border-gray-300' : 'border-gray-700'
                          }`}
                        >
                          <img src={`${INITIATIVES_BASE_URL}${initiative.logo}`} alt={initiative.name} className="w-full h-full object-contain" />
                        </a>
                      ) : (
                        <div
                          key={initiative.id}
                          className={`flex items-center justify-center p-4 rounded-lg border opacity-50 cursor-not-allowed ${
                            bgColor === 'white' ? 'border-gray-300' : 'border-gray-700'
                          }`}
                        >
                          <img src={`${INITIATIVES_BASE_URL}${initiative.logo}`} alt={initiative.name} className="w-full h-full object-contain" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-12 sm:h-14">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="block">
              <img 
                src="/images/connect_new_img.png" 
                alt="SOHUB Connect Logo" 
                className="w-28 sm:w-32 h-auto object-contain cursor-pointer"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              type="button"
              onClick={() => {
                handleScrollToSection('pbx');
              }}
              className={`font-inter text-sm font-medium hover:text-[#22C55E] transition-colors duration-200 cursor-pointer ${
                activeSection === 'pbx' ? 'font-bold text-[#22C55E]' : 'text-[#525252] dark:text-white'
              }`}
            >
              PBX
            </button>
            <Link
              to="/click-to-connect"
              className={`font-inter text-sm font-medium hover:text-[#22C55E] transition-colors duration-200 ${
                currentPath === '/click-to-connect' ? 'font-bold text-[#22C55E]' : 'text-[#525252] dark:text-white'
              }`}
            >
              Click to Connect
            </Link>
            <Link
              to="/hotscan"
              className={`font-inter text-sm font-medium hover:text-[#22C55E] transition-colors duration-200 ${
                currentPath === '/hotscan' ? 'font-bold text-[#22C55E]' : 'text-[#525252] dark:text-white'
              }`}
            >
              HotScan
            </Link>
            <Link
              to="/features"
              className={`font-inter text-sm font-medium hover:text-[#22C55E] transition-colors duration-200 ${
                currentPath === '/features' ? 'font-bold text-[#22C55E]' : 'text-[#525252] dark:text-white'
              }`}
            >
              Features
            </Link>
            <button
              type="button"
              onClick={() => {
                handleScrollToSection('pricing');
              }}
              className={`font-inter text-sm font-medium hover:text-[#22C55E] transition-colors duration-200 cursor-pointer ${
                activeSection === 'pricing' ? 'font-bold text-[#22C55E]' : 'text-[#525252] dark:text-white'
              }`}
            >
              Pricing
            </button>
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
              href={registerUrl}
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
              href={registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-full bg-[#22C55E] text-white font-inter font-semibold text-xs hover:bg-[#16A34A] transition-all duration-200"
            >
              Start Free Forever
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#525252] dark:text-gray-400 hover:text-[#22C55E] dark:hover:text-[#22C55E] transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-main-menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0" style={{ zIndex: 51 }}>
          <div
            id="mobile-main-menu"
            className="bg-white dark:bg-[#121212] border-b border-gray-200 dark:border-gray-800 shadow-lg rounded-b-[1.75rem] overflow-hidden"
          >
            <nav className="flex flex-col items-start space-y-4 px-6 py-4">
              <button
                type="button"
                onClick={() => {
                  handleScrollToSection('pbx');
                }}
                className={`w-full text-left font-inter text-base font-medium hover:text-[#22C55E] transition-colors duration-200 cursor-pointer ${
                  activeSection === 'pbx' ? 'font-bold text-[#22C55E]' : 'text-[#525252] dark:text-white'
                }`}
              >
                PBX
              </button>
              <Link
                to="/click-to-connect"
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left font-inter text-base font-medium hover:text-[#22C55E] transition-colors duration-200 ${
                  currentPath === '/click-to-connect' ? 'font-bold text-[#22C55E]' : 'text-[#525252] dark:text-white'
                }`}
              >
                Click to Connect
              </Link>
              <Link
                to="/hotscan"
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left font-inter text-base font-medium hover:text-[#22C55E] transition-colors duration-200 ${
                  currentPath === '/hotscan' ? 'font-bold text-[#22C55E]' : 'text-[#525252] dark:text-white'
                }`}
              >
                HotScan
              </Link>
              <Link
                to="/features"
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left font-inter text-base font-medium hover:text-[#22C55E] transition-colors duration-200 ${
                  currentPath === '/features' ? 'font-bold text-[#22C55E]' : 'text-[#525252] dark:text-white'
                }`}
              >
                Features
              </Link>
              <button
                type="button"
                onClick={() => {
                  handleScrollToSection('pricing');
                }}
                className={`w-full text-left font-inter text-base font-medium hover:text-[#22C55E] transition-colors duration-200 cursor-pointer ${
                  activeSection === 'pricing' ? 'font-bold text-[#22C55E]' : 'text-[#525252] dark:text-white'
                }`}
              >
                Pricing
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
