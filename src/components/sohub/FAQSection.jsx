import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function FAQSection() {
  const faqs = [
    {
      question: "What is SOHUB Connect?",
      answer: "SOHUB Connect is a borderless, cloud-native PBX that lets businesses talk to customers instantly — without phone numbers or dialing.",
      category: "Getting Started"
    },
    {
      question: "How is this different from traditional PBX or phone systems?",
      answer: "Traditional PBX is tied to buildings and phone numbers. SOHUB Connect is internet-first and works wherever your customers are — online or offline.",
      category: "Technical"
    },
    {
      question: "Do customers need an app or a phone number?",
      answer: "No. Customers connect instantly through a click or QR scan — directly from their browser.",
      category: "Availability"
    },
    {
      question: "Is SOHUB Connect built for Bangladesh?",
      answer: "Yes. It is designed specifically for Bangladeshi businesses, customer behavior, and local infrastructure.",
      category: "Billing"
    },
    {
      question: "How fast can I get started?",
      answer: "Most businesses can start receiving calls within minutes. No hardware. No setup.",
      category: "Features"
    },
    {
      question: "Is there a free plan?",
      answer: "Yes. SOHUB Connect includes a FREE FOREVER plan for up to five users.",
      category: "Support"
    },
    {
      question: "Is this secure and reliable?",
      answer: "Yes. SOHUB Connect uses secure, cloud-based infrastructure to ensure stable and private conversations.",
      category: "Support"
    }
  ];

  return (
    <section className="py-12 sm:py-14 md:py-16 w-full bg-white dark:bg-[#121212]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-10 md:mb-12">
            <h2 className="font-plus-jakarta-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#111111] dark:text-white px-4">
              Frequently Asked Questions
            </h2>
            <p className="font-inter text-base sm:text-lg text-[#525252] dark:text-white/70 px-4">
              Find answers to common questions about SOHUB Connect
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
            {faqs.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={cn(
                  "mb-3 sm:mb-4 rounded-xl",
                  "bg-white dark:bg-[#1E1E1E]",
                  "border border-gray-200 dark:border-gray-700",
                  "shadow-sm"
                )}
              >
                <AccordionTrigger
                  className="px-4 sm:px-6 py-3 sm:py-4 text-left hover:no-underline"
                >
                  <h3 className="font-inter text-base sm:text-lg font-medium text-[#111111] dark:text-white pr-2">
                    {item.question}
                  </h3>
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-6 pt-3 sm:pt-4 pb-4 sm:pb-6">
                  <p className="font-inter text-sm sm:text-base text-[#525252] dark:text-white/70 leading-relaxed">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
