"use client";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

const HOME_PATHS = ['/', '/sohub'];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const { bgColor, toggleBgColor } = useTheme();

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        requestAnimationFrame(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        });
      }
    }
  }, []);

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

  const handleScrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
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
      <div className="max-w-[1240px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="block">
              <img 
                src="/images/logo.png" 
                alt="SOHUB Connect Logo" 
                className="w-32 h-auto object-contain cursor-pointer"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/#features"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection('features');
              }}
              className="font-inter text-sm font-medium text-[#525252] dark:text-white hover:text-[#22C55E] transition-colors duration-200 cursor-pointer"
            >
              Features
            </a>
            <a
              href="/#pricing"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection('pricing');
              }}
              className="font-inter text-sm font-medium text-[#525252] dark:text-white hover:text-[#22C55E] transition-colors duration-200 cursor-pointer"
            >
              Pricing
            </a>
            <a
              href="/click-to-connect"
              onClick={() => setCurrentPath('/click-to-connect')}
              className={`font-inter text-sm font-medium text-[#525252] dark:text-white hover:text-[#22C55E] transition-colors duration-200 ${
                currentPath === '/click-to-connect' ? 'font-bold text-[#22C55E]' : ''
              }`}
            >
              Click to Connect
            </a>
            <a
              href="/hotscan"
              onClick={() => setCurrentPath('/hotscan')}
              className={`font-inter text-sm font-medium text-[#525252] dark:text-white hover:text-[#22C55E] transition-colors duration-200 ${
                currentPath === '/hotscan' ? 'font-bold text-[#22C55E]' : ''
              }`}
            >
              HotScan
            </a>
            <a
              href="/about"
              onClick={() => setCurrentPath('/about')}
              className={`font-inter text-sm font-medium text-[#525252] dark:text-white hover:text-[#22C55E] transition-colors duration-200 ${
                currentPath === '/about' ? 'font-bold text-[#22C55E]' : ''
              }`}
            >
              About
            </a>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleBgColor}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {bgColor === 'white' ? <Moon size={20} className="text-gray-600" /> : <Sun size={20} className="text-gray-600" />}
            </button>
            <a
              href="https://connect.sohub.com.bd/authentication/register"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#22C55E] text-white font-inter font-semibold text-sm hover:bg-[#16A34A] active:bg-[#15803D] active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:ring-opacity-50"
            >
              Start Free
            </a>
          </div>

          {/* Mobile CTA + Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleBgColor}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {bgColor === 'white' ? <Moon size={18} className="text-gray-600" /> : <Sun size={18} className="text-gray-600" />}
            </button>
            <a
              href="https://connect.sohub.com.bd/authentication/register"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-full bg-[#22C55E] text-white font-inter font-semibold text-xs hover:bg-[#16A34A] transition-all duration-200"
            >
              Start Free
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#525252] hover:text-[#22C55E] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed top-16 left-0 right-0 bg-white dark:bg-[#121212] border-b border-gray-200 dark:border-gray-800 shadow-lg z-40">
            <nav className="flex flex-col space-y-4 px-6 py-4">
              <a
                href="/#features"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToSection('features');
                }}
                className="font-inter text-base font-medium text-[#525252] dark:text-white hover:text-[#22C55E] transition-colors duration-200 cursor-pointer"
              >
                Features
              </a>
              <a
                href="/#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToSection('pricing');
                }}
                className="font-inter text-base font-medium text-[#525252] dark:text-white hover:text-[#22C55E] transition-colors duration-200 cursor-pointer"
              >
                Pricing
              </a>
              <a
                href="/click-to-connect"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCurrentPath('/click-to-connect');
                }}
                className={`font-inter text-base font-medium text-[#525252] dark:text-white hover:text-[#22C55E] transition-colors duration-200 ${
                  currentPath === '/click-to-connect' ? 'font-bold text-[#22C55E]' : ''
                }`}
              >
                Click to Connect
              </a>
              <a
                href="/hotscan"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCurrentPath('/hotscan');
                }}
                className={`font-inter text-base font-medium text-[#525252] dark:text-white hover:text-[#22C55E] transition-colors duration-200 ${
                  currentPath === '/hotscan' ? 'font-bold text-[#22C55E]' : ''
                }`}
              >
                HotScan
              </a>
              <a
                href="/about"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCurrentPath('/about');
                }}
                className={`font-inter text-base font-medium text-[#525252] dark:text-white hover:text-[#22C55E] transition-colors duration-200 ${
                  currentPath === '/about' ? 'font-bold text-[#22C55E]' : ''
                }`}
              >
                About
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
