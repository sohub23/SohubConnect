"use client";

import Header from "../../components/sohub/Header";
import Footer from "../../components/sohub/Footer";
import { ThemeProvider } from "../../components/sohub/ThemeProvider";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [submitStatus, setSubmitStatus] = useState({ loading: false, success: false, error: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, success: false, error: null });
    
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus({ loading: false, success: true, error: null });
      setFormData({ name: "", email: "", phone: "", message: "" });
      
      setTimeout(() => {
        setSubmitStatus({ loading: false, success: false, error: null });
      }, 3000);
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
            {/* Success Message */}
            {submitStatus.success && (
              <div className="mb-6 p-4 rounded-lg bg-[#DCFCE7] dark:bg-[#22C55E]/20 border border-[#22C55E] text-[#16A34A] dark:text-[#22C55E] font-inter text-sm">
                ✓ Message sent successfully! We'll get back to you soon.
              </div>
            )}
            
            {/* Error Message */}
            {submitStatus.error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-500 text-red-600 dark:text-red-400 font-inter text-sm">
                ✗ {submitStatus.error}
              </div>
            )}
            
            {/* Contact Form */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <form onSubmit={handleSubmit} className="space-y-6">
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
      </div>
    </ThemeProvider>
  );
}
