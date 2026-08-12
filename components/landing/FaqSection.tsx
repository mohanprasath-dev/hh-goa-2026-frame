"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "What is Hacker House Goa 2026?",
    answer:
      "Hacker House Goa is an invite-only 4-day co-building residency taking place in North Goa from Oct 28–31, 2026. Top engineers and creators stay together in a luxury beachfront villa to build and ship high-impact software.",
  },
  {
    question: "How do I qualify for selection?",
    answer:
      "Selection is based on proof of work. Generating your official Builder ID frame is Step 1. Our team reviews your public repos, shipping history, and project portfolio during the Open Trials phase.",
  },
  {
    question: "Is accommodation and food included?",
    answer:
      "Yes! Selected builders receive 100% sponsored accommodation in our beachfront residency villa, chef-curated meals, 24/7 snacks, drinks, and high-speed gigabit fiber internet.",
  },
  {
    question: "Can I apply as a squad or team?",
    answer:
      "Absolutely. You can generate individual Builder IDs for each teammate or form a squad. Squad applications are reviewed together for residency slots.",
  },
  {
    question: "What happens after I generate my Builder Frame?",
    answer:
      "Share your generated Builder ID frame on X/Twitter with #FrameInGoa. Tag @hhgoa to trigger automatic verification and advance your profile into the Open Trials evaluation queue.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-5 sm:px-8 py-16 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <p className="text-hh-pink text-xs font-bold tracking-[0.3em] uppercase mb-2">
          FREQUENTLY ASKED QUESTIONS
        </p>
        <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-serif font-black italic text-hh-yellow tracking-tight">
          GOT QUESTIONS?
        </h2>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.question}
              className="bg-[#07261D] border border-[#155340] rounded-2xl overflow-hidden transition-all duration-200 shadow-md"
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#0B3D2E]/50 transition-colors touch-manipulation"
              >
                <span className="text-hh-yellow font-extrabold text-sm sm:text-base tracking-wide flex items-center gap-3">
                  <HelpCircle className="w-4 h-4 text-hh-pink shrink-0" />
                  {faq.question}
                </span>
                <div
                  className={`w-8 h-8 rounded-full bg-hh-pink/10 text-hh-pink flex items-center justify-center transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-hh-pink text-white" : ""
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-hh-cream/80 text-xs sm:text-sm font-medium leading-relaxed border-t border-[#155340]/60">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
