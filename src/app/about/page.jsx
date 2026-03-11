import Header from "../../components/sohub/Header";
import Footer from "../../components/sohub/Footer";
import { ThemeProvider } from "../../components/sohub/ThemeProvider";

export default function AboutPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-[#121212]">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full py-20 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8">
            <h1 className="font-plus-jakarta-sans text-3xl md:text-4xl lg:text-5xl font-bold text-[#111111] dark:text-white leading-tight">
              About Connect
            </h1>
            <p className="font-inter text-xl md:text-2xl text-[#111111] dark:text-white font-semibold leading-relaxed max-w-4xl mx-auto">
              We're rethinking how people and businesses talk in Bangladesh.
            </p>
            <div className="space-y-6 pt-4 max-w-4xl mx-auto">
              <p className="font-inter text-base md:text-lg text-[#525252] dark:text-white/70 leading-relaxed text-justify">
                SOHUB Connect is built to make communication simple, secure, and internet-first — so conversations can start the moment intent appears. Instead of relying on buildings, hardware, or phone numbers, we use the cloud to help anyone connect instantly, from anywhere.
              </p>
              <p className="font-inter text-base md:text-lg text-[#525252] dark:text-white/70 leading-relaxed text-justify">
                Whether you're running a business, managing a team, serving customers, or collaborating across locations, SOHUB Connect keeps communication natural, fast, and reliable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="w-full py-20 md:py-24 px-6 bg-[#FAFAFA] dark:bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8">
            <h2 className="font-plus-jakarta-sans text-3xl md:text-4xl lg:text-5xl font-bold text-[#111111] dark:text-white leading-tight">
              Who We Are
            </h2>
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <p className="font-inter text-lg text-[#525252] dark:text-white/70 leading-relaxed text-center">
                SOHUB Connect is a cloud-native communication platform from Bangladesh, designed to modernize how voice conversations happen online.
              </p>
              <p className="font-inter text-lg text-[#525252] dark:text-white/70 leading-relaxed text-center">
                We help individuals, teams, startups, growing companies, and large organizations move beyond personal numbers, missed calls, and slow responses — and into instant, organized, and secure conversations.
              </p>
              <p className="font-inter text-lg text-[#525252] dark:text-white/70 leading-relaxed text-center">
                Expanding your team, opening new branches, supporting customers, or working remotely? SOHUB Connect adapts quietly in the background, giving you one simple system to talk, manage, and scale without friction.
              </p>
            </div>
            <div className="pt-6">
              <p className="font-inter text-2xl text-[#111111] dark:text-white font-semibold max-w-2xl mx-auto text-center">
                We're not just building telephony.<br />
                We're building a better way to start conversations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </ThemeProvider>
  );
}
