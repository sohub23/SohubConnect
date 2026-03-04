import Header from "../../components/sohub/Header";
import Footer from "../../components/sohub/Footer";
import { ThemeProvider } from "../../components/sohub/ThemeProvider";
import { FileText } from "lucide-react";

export default function TermsPage() {
  const terms = [
    {
      number: "1",
      title: "Legal Use Only",
      content: "You must not use SOHUB CONNECT for any illegal, harmful, or fraudulent purpose. Compliance with local laws is your responsibility."
    },
    {
      number: "2",
      title: "Bangladesh-Only Access",
      content: "Our services are intended for users inside Bangladesh. VPNs or access from outside the country are not permitted."
    },
    {
      number: "3",
      title: "Internet & BDIX Required",
      content: "SOHUB CONNECT operates over the internet. Ensure your ISP provides BDIX routing for optimal performance."
    },
    {
      number: "4",
      title: "Call Rules",
      content: "HotScan™ and Click-to-Connect calls can only forward to internal SOHUB extensions, not personal mobile numbers."
    },
    {
      number: "5",
      title: "Trunks & Plans",
      content: "Only verified SOHUB trunks are allowed. Adding custom trunks is available for Plus or Pro plan users only."
    },
    {
      number: "6",
      title: "Verified Business Use",
      content: "All accounts must belong to verified individuals or registered businesses and used strictly for business communication."
    },
    {
      number: "7",
      title: "No Tampering Allowed",
      content: "Hacking, misuse, or abuse of the system may result in immediate suspension of your account."
    },
    {
      number: "8",
      title: "Community Conduct",
      content: "Respect others while using SOHUB CONNECT. Spam, harassment, or abusive behavior may lead to a ban."
    },
    {
      number: "9",
      title: "Payments",
      content: "All wallet payments are final and non-refundable. We accept bKash and SSLCommerz (Visa, debit cards, and mobile wallets)."
    },
    {
      number: "10",
      title: "Policy & Support",
      content: "Terms, pricing, and features may change at any time. Support is available via connect@sohub.com.bd."
    },
    {
      number: "11",
      title: "Agreement",
      content: "By using SOHUB CONNECT, you confirm that you have read, understood, and agree to these terms."
    }
  ];

  return (
    <ThemeProvider>
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full py-20 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full px-4 py-2">
              <FileText size={14} className="text-blue-600 dark:text-blue-400" />
              <span className="font-inter font-semibold text-xs text-blue-600 dark:text-blue-400">
                Legal
              </span>
            </div>
            <h1 className="font-plus-jakarta-sans text-3xl md:text-4xl lg:text-5xl font-bold text-[#111111] dark:text-white leading-tight">
              Terms &amp; Conditions
            </h1>
            <p className="font-inter text-lg text-[#525252] dark:text-white/70 leading-relaxed max-w-2xl mx-auto">
              Welcome to SOHUB CONNECT. By using our platform, you agree to the following terms and conditions. Please read them carefully.
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="w-full py-12 px-6 bg-[#FAFAFA] dark:bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {terms.map((term) => (
              <div 
                key={term.number}
                className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 hover:border-[#22C55E] dark:hover:border-[#22C55E] transition-all duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#22C55E]/10 rounded-lg flex items-center justify-center">
                    <span className="font-inter font-bold text-lg text-[#22C55E]">
                      {term.number}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-inter text-xl font-bold text-[#111111] dark:text-white mb-3">
                      {term.title}
                    </h3>
                    <p className="font-inter text-base text-[#525252] dark:text-white/70 leading-relaxed">
                      {term.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </ThemeProvider>
  );
}
