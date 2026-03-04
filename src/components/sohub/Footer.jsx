import { Facebook, Linkedin, Mail, Users } from "lucide-react";

const HOME_PATHS = ["/", "/sohub"];

export default function Footer() {
  const year = new Date().getFullYear();

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

  return (
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
                About
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
  );
}
