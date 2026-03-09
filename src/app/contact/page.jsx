"use client";

import Header from "../../components/sohub/Header";
import Footer from "../../components/sohub/Footer";
import { ThemeProvider } from "../../components/sohub/ThemeProvider";
import { Mail, Send, CircleCheckBig, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

const generateCaptchaCode = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i += 1) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    website: ""
  });
  const [submitStatus, setSubmitStatus] = useState({ loading: false, success: false, error: null });
  const [captchaCode, setCaptchaCode] = useState(generateCaptchaCode);
  const [captchaInput, setCaptchaInput] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (!showSuccessModal) return undefined;
    const timer = setTimeout(() => {
      setShowSuccessModal(false);
      setSubmitStatus({ loading: false, success: false, error: null });
    }, 3200);
    return () => clearTimeout(timer);
  }, [showSuccessModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameRegex = /^[A-Za-z0-9 ]+$/;
    const phoneRegex = /^[0-9]{6,15}$/;
    const messageRegex = /^[A-Za-z0-9\s]+$/;

    if (!nameRegex.test(formData.name.trim())) {
      setSubmitStatus({ loading: false, success: false, error: "Name cannot contain special characters." });
      return;
    }

    if (!phoneRegex.test(formData.phone.trim())) {
      setSubmitStatus({ loading: false, success: false, error: "Phone must contain digits only (6-15 digits)." });
      return;
    }

    if (formData.message.trim() !== "" && !messageRegex.test(formData.message)) {
      setSubmitStatus({ loading: false, success: false, error: "Message cannot contain special characters." });
      return;
    }

    if (captchaInput.trim().toUpperCase() !== captchaCode) {
      setSubmitStatus({ loading: false, success: false, error: "Security verification failed. Please enter the captcha correctly." });
      setCaptchaCode(generateCaptchaCode());
      setCaptchaInput("");
      return;
    }

    setSubmitStatus({ loading: true, success: false, error: null });
    
    try {
      const response = await fetch('/contact-submit.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      let result = {};
      try {
        result = await response.json();
      } catch {
        result = { message: "Invalid server response" };
      }
      
      if (response.ok && result.success) {
        setSubmitStatus({ loading: false, success: true, error: null });
        setFormData({ name: "", email: "", phone: "", message: "", website: "" });
        setCaptchaInput("");
        setCaptchaCode(generateCaptchaCode());
        setShowSuccessModal(true);
      } else {
        setSubmitStatus({ loading: false, success: false, error: result.message || 'Failed to send message' });
      }
    } catch (error) {
      setSubmitStatus({ loading: false, success: false, error: "Failed to send message. Please try again." });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const captchaDisplay = captchaCode.split("").join(" ");

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-[#121212]">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full py-20 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center space-x-2 bg-[#DCFCE7] dark:bg-[#22C55E]/20 border border-[#22C55E] rounded-full px-4 py-2">
              <Mail size={14} className="text-[#16A34A] dark:text-[#22C55E]" />
              <span className="font-inter font-semibold text-xs text-[#16A34A] dark:text-[#22C55E]">
                Get in Touch
              </span>
            </div>
            <h1 className="font-plus-jakarta-sans text-3xl md:text-4xl lg:text-5xl font-bold text-[#111111] dark:text-white leading-tight">
              Contact Us
            </h1>
            <p className="font-inter text-lg text-[#525252] dark:text-white/70 leading-relaxed max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Error Message */}
            {submitStatus.error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-500 text-red-600 dark:text-red-400 font-inter text-sm">
                ✗ {submitStatus.error}
              </div>
            )}
            
            {/* Contact Form */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      tabIndex="-1"
                      autoComplete="off"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Name */}
                  <div>
                    <label 
                      htmlFor="name" 
                      className="block font-inter text-sm font-semibold text-[#111111] dark:text-white mb-2"
                    >
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      pattern="[A-Za-z0-9 ]{2,100}"
                      title="Use letters, numbers, and spaces only"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Your Name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a] text-[#111111] dark:text-white font-inter text-base placeholder:text-gray-400 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label 
                      htmlFor="email" 
                      className="block font-inter text-sm font-semibold text-[#111111] dark:text-white mb-2"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a] text-[#111111] dark:text-white font-inter text-base placeholder:text-gray-400 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label 
                      htmlFor="phone" 
                      className="block font-inter text-sm font-semibold text-[#111111] dark:text-white mb-2"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      pattern="[0-9]{6,15}"
                      title="Use digits only (6-15)"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your Phone Number"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a] text-[#111111] dark:text-white font-inter text-base placeholder:text-gray-400 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label 
                      htmlFor="message" 
                      className="block font-inter text-sm font-semibold text-[#111111] dark:text-white mb-2"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a] text-[#111111] dark:text-white font-inter text-base placeholder:text-gray-400 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all resize-none"
                    ></textarea>
                  </div>

                  {/* Captcha */}
                  <div className="rounded-xl border border-[#86efac] dark:border-[#86efac] bg-[#f7fff9] dark:bg-[#f7fff9] p-4">
                    <p className="font-inter text-sm font-semibold text-[#166534] dark:text-[#166534]">
                      Security Verification
                    </p>
                    <p className="mt-1 font-inter text-xs text-[#15803d] dark:text-[#15803d]">
                      Please type the verification code to submit this form.
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="min-w-[190px] rounded-lg border border-[#4ade80] dark:border-[#4ade80] bg-white dark:bg-white px-4 py-3 text-center font-mono text-base sm:text-lg font-bold tracking-[0.2em] sm:tracking-[0.3em] text-[#14532d] dark:text-[#14532d] select-none shadow-sm">
                        {captchaDisplay}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setCaptchaCode(generateCaptchaCode());
                          setCaptchaInput("");
                        }}
                        className="inline-flex items-center gap-2 rounded-lg border border-[#22C55E] bg-white dark:bg-white px-3 py-2 font-inter text-sm font-semibold text-[#15803d] dark:text-[#15803d] hover:bg-[#dcfce7] dark:hover:bg-[#dcfce7] transition-colors"
                      >
                        <RefreshCw size={14} />
                        Refresh
                      </button>
                    </div>
                    <div className="mt-3">
                      <label
                        htmlFor="captchaInput"
                        className="block font-inter text-sm font-semibold text-[#111111] dark:text-white mb-2"
                      >
                        Enter Verification Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="captchaInput"
                        required
                        autoComplete="off"
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
                        placeholder="Type the code shown above"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a] text-[#111111] dark:text-white font-inter text-base placeholder:text-gray-400 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitStatus.loading}
                    className="w-full inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-full bg-[#22C55E] text-white font-inter font-semibold text-base hover:bg-[#16A34A] active:bg-[#15803D] active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:ring-offset-2 dark:focus:ring-offset-[#121212] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#22C55E]"
                  >
                    {submitStatus.loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
        </div>
      </section>

      <Footer />

      {showSuccessModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-[#1E1E1E] p-6 border border-[#22C55E]/40 shadow-2xl">
            <div className="flex items-center justify-center mb-4">
              <div className="rounded-full bg-[#DCFCE7] dark:bg-[#14532d] p-3">
                <CircleCheckBig size={30} className="text-[#16A34A] dark:text-[#86efac]" />
              </div>
            </div>
            <h3 className="text-center font-plus-jakarta-sans text-2xl font-bold text-[#111111] dark:text-white">
              Message Sent Successfully
            </h3>
            <p className="mt-3 text-center font-inter text-sm text-[#525252] dark:text-white/70 leading-relaxed">
              Thank you for contacting SOHUB Connect. Our team will review your message and get back to you shortly.
            </p>
            <button
              type="button"
              onClick={() => {
                setShowSuccessModal(false);
                setSubmitStatus({ loading: false, success: false, error: null });
              }}
              className="mt-6 w-full rounded-full bg-[#22C55E] px-6 py-3 font-inter font-semibold text-white hover:bg-[#16A34A] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
      </div>
    </ThemeProvider>
  );
}
