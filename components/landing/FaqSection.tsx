"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  {
    question: "How is selection decided?",
    answer: "Selection is based on proof of work: public projects, shipping history, and portfolio. Generating a Builder ID frame creates a shareable credential; it is not an acceptance confirmation.",
  },
  {
    question: "What happens after I generate a frame?",
    answer: "Download it or share it to X. Keep the Builder ID visible: it is the reference printed on the frame and encoded in its QR code.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section className="px-5 sm:px-8 py-16 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <p className="text-hh-pink text-xs font-bold tracking-[0.3em] uppercase mb-2">FAQ</p>
        <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-serif font-black italic text-hh-yellow tracking-tight">THE USEFUL BITS</h2>
      </div>
      <div className="space-y-3">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return <div key={faq.question} className="bg-[#07261D] border border-[#155340] rounded-2xl overflow-hidden shadow-md">
            <button type="button" onClick={() => setOpenIndex(isOpen ? null : index)} className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer">
              <span className="text-hh-yellow font-extrabold text-sm sm:text-base flex items-center gap-3"><HelpCircle className="w-4 h-4 text-hh-pink shrink-0" />{faq.question}</span>
              <ChevronDown className={`w-5 h-5 text-hh-pink transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen && <p className="px-5 pb-5 text-hh-cream/80 text-sm leading-relaxed">{faq.answer}</p>}
          </div>;
        })}
      </div>
    </section>
  );
}
