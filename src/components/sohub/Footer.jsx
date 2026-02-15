import { Mail } from "lucide-react";

const HOME_PATHS = ['/', '/sohub'];

export default function Footer() {
  const handleScrollToSection = (e, sectionId) => {
    const isHomePage = HOME_PATHS.includes(window.location.pathname);
    
    if (isHomePage) {
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  return (
    <footer className="w-full py-16 md:py-20 px-6 bg-[#0A0A0A] dark:bg-[#0A0A0A]">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center space-x-3">
              <img 
                src="/images/logo.png" 
                alt="SOHUB Connect Logo" 
                className="w-32 h-20 object-contain"
              />
            </div>

            <p className="font-inter text-sm text-white/70 max-w-md">
              The first borderless, cloud-native PBX built for Bangladesh.
              Redefining business communication for SOHO and e-commerce.
            </p>

            <div className="space-y-2 pt-2">
              <a
                href="mailto:connect@sohub.com.bd"
                className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
              >
                <Mail size={16} />
                <span className="font-inter text-sm">
                  connect@sohub.com.bd
                </span>
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-inter font-semibold text-sm text-white">
              Product
            </h3>
            <div className="space-y-3">
              <a
                href="/#features"
                onClick={(e) => handleScrollToSection(e, 'features')}
                className="block font-inter text-sm text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                Features
              </a>
              <a
                href="/#pricing"
                onClick={(e) => handleScrollToSection(e, 'pricing')}
                className="block font-inter text-sm text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                Pricing
              </a>
              <a
                href="https://connect.sohub.com.bd/authentication"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-inter text-sm text-white/70 hover:text-white transition-colors"
              >
                Dashboard
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-inter font-semibold text-sm text-white">
              Company
            </h3>
            <div className="space-y-3">
              <a
                href="/about"
                className="block font-inter text-sm text-white/70 hover:text-white transition-colors"
              >
                About
              </a>
              <a
                href="/contact"
                className="block font-inter text-sm text-white/70 hover:text-white transition-colors"
              >
                Contact
              </a>
              <a
                href="/terms"
                className="block font-inter text-sm text-white/70 hover:text-white transition-colors"
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 text-center border-t border-white/10">
          <p className="font-inter text-xs text-white/50">
            © 2025 SOHUB Connect. Built for Bangladesh. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
