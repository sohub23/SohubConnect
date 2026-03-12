import { Facebook, Linkedin, Mail, Users, X } from "lucide-react";
import { useState } from "react";

const HOME_PATHS = ["/", "/sohub"];

export default function Footer() {
  const year = new Date().getFullYear();
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const handleScrollToSection = (e, sectionId) => {
    const isHomePage = HOME_PATHS.includes(window.location.pathname);

    if (isHomePage) {
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const openQRModal = () => {
    setIsQRModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeQRModal = () => {
    setIsQRModalOpen(false);
    document.body.style.overflow = 'unset'; // Restore scrolling
  };

  return (
    <>
      <footer className="footer-shell w-full border-t border-slate-200/80">
        <div className="mx-auto max-w-[1240px] px-6 pt-16 pb-10 md:pt-20 md:pb-12">
          <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-14">
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center space-x-3">
                <img
                  src="/images/connect_new_img.png"
                  alt="SOHUB Connect Logo"
                  className="h-20 w-32 object-contain"
                />
              </div>

              <p className="footer-muted font-inter max-w-md text-sm leading-relaxed">
                The first borderless, cloud-native PBX built for Bangladesh.
                Redefining business communication for SOHO and e-commerce.
              </p>

              <a
                href="mailto:connect@sohub.com.bd"
                className="footer-link inline-flex items-center gap-2 font-inter text-sm font-medium transition-colors duration-200"
              >
                <Mail size={16} />
                <span>connect@sohub.com.bd</span>
              </a>

              <div className="pt-2">
                <h3 className="footer-strong font-inter text-xs font-semibold uppercase tracking-[0.2em] mb-3">
                  Follow Us
                </h3>
                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href="https://www.facebook.com/sohubconnect"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="SOHUB Connect Facebook Page"
                    title="Facebook"
                    className="footer-link inline-flex items-center justify-center p-1.5 transition-colors duration-200"
                  >
                    <Facebook size={18} />
                  </a>

                  <a
                    href="https://www.linkedin.com/company/sohub-connect/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="SOHUB Connect LinkedIn Page"
                    title="LinkedIn"
                    className="footer-link inline-flex items-center justify-center p-1.5 transition-colors duration-200"
                  >
                    <Linkedin size={18} />
                  </a>

                  <a
                    href="https://www.facebook.com/groups/sohubconnect"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="SOHUB Connect Facebook Community"
                    title="Community"
                    className="footer-link inline-flex items-center justify-center p-1.5 transition-colors duration-200"
                  >
                    <Users size={18} />
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="footer-strong font-inter text-xs font-semibold uppercase tracking-[0.2em]">
                Quick Links
              </h3>
              <div className="space-y-3">
                <a
                  href="/#pbx"
                  onClick={(e) => handleScrollToSection(e, "pbx")}
                  className="footer-link block cursor-pointer font-inter text-sm transition-colors duration-200"
                >
                  PBX
                </a>
                <a
                  href="/click-to-connect"
                  className="footer-link block font-inter text-sm transition-colors duration-200"
                >
                  Click to Connect
                </a>
                <a
                  href="/hotscan"
                  className="footer-link block font-inter text-sm transition-colors duration-200"
                >
                  HotScan
                </a>
                <a
                  href="/features"
                  className="footer-link block font-inter text-sm transition-colors duration-200"
                >
                  Features
                </a>
                <a
                  href="/#pricing"
                  onClick={(e) => handleScrollToSection(e, "pricing")}
                  className="footer-link block cursor-pointer font-inter text-sm transition-colors duration-200"
                >
                  Pricing
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="footer-strong font-inter text-xs font-semibold uppercase tracking-[0.2em]">
                Company
              </h3>
              <div className="space-y-3">
                <a
                  href="/about"
                  className="footer-link block font-inter text-sm transition-colors duration-200"
                >
                  About Connect
                </a>
                <a
                  href="/contact"
                  className="footer-link block font-inter text-sm transition-colors duration-200"
                >
                  Contact
                </a>
                <a
                  href="/documentation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link block font-inter text-sm transition-colors duration-200"
                >
                  User Manual
                </a>
                <a
                  href="/terms"
                  className="footer-link block font-inter text-sm transition-colors duration-200"
                >
                  Terms & Conditions
                </a>
                
                {/* QR Code Section */}
                <div className="pt-4">
                  <div className="flex items-center gap-3">
                    <div 
                      onClick={openQRModal}
                      className="cursor-pointer group transition-all duration-200 hover:scale-105 flex-shrink-0"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          openQRModal();
                        }
                      }}
                      aria-label="Open QR code to call us"
                    >
                      <img
                        src="/images/connect_hotscan.png"
                        alt="Scan to Call Us QR Code"
                        className="w-21 h-21 object-contain border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-200"
                        style={{ width: '84px', height: '84px' }}
                      />
                    </div>
                    <div className="flex flex-col gap-1 flex-shrink-0">
                      <span className="footer-strong font-inter text-xs font-semibold">
                        Call with Hotscan
                      </span>
                      <span className="footer-muted font-inter text-xs opacity-75">
                        Tap to enlarge
                      </span>
                    </div>
                 
                  </div>
                     <div className="flex-shrink-0">
                      <script src="https://connect-client.sohub.com.bd/widget-loader?id=widget_6951007e980a5_1766916222&position=inline" async></script>
                    </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-border border-t pt-6">
            <div className="flex items-center justify-center">
              <p className="footer-muted font-inter text-xs text-center">
                © {year} SOHUB Connect. Built for Bangladesh. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* QR Code Modal */}
      {isQRModalOpen && (
        <div 
          className="qr-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40 backdrop-blur-sm"
          onClick={closeQRModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="qr-modal-title"
        >
          <div 
            className="qr-modal-content relative bg-white dark:bg-black rounded-2xl shadow-2xl transform transition-all duration-300 scale-100"
            style={{ width: '239px', height: '367px', padding: '18px' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeQRModal}
              className="absolute top-1 right-1 p-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 z-10"
              aria-label="Close QR code modal"
            >
              <X size={15} className="text-gray-600 dark:text-gray-300" />
            </button>

            {/* Modal Content */}
            <div className="text-center h-full flex flex-col justify-center">
              <h3 id="qr-modal-title" className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                Call With Hotscan
              </h3>
              
              <div className="mb-2 flex-1 flex items-center justify-center">
                <img
                  src="/images/connect_hotscan.png"
                  alt="Scan to Call Us QR Code"
                  className="object-contain border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
                  style={{ width: '166px', height: '166px' }}
                />
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-tight">
                Scan with your phone camera
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
