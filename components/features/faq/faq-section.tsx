"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    num: "1",
    question: "How do I get started with Kuru Labs?",
    answer:
      "Simply fill out the contact form, and we’ll reach out through email or WhatsApp based on your preferred method of communication.",
  },
  {
    num: "2",
    question: "How involved do I need to be during the project?",
    answer:
      "You only need to share your content, preferences, and feedback at important stages. We handle the complete design, development, testing, and launch process.",
  },
  {
    num: "3",
    question: "How long does it take to build a website?",
    answer:
      "Most websites are completed within 2–6 weeks, depending on the number of pages, design direction, and required features.",
  },
  {
    num: "4",
    question: "Do you provide support after the website is launched?",
    answer:
      "Yes. We offer post-launch maintenance, content updates, and technical support to ensure your website continues to perform well.",
  },
  {
    num: "5",
    question: "Do you only build websites?",
    answer:
      "No. Alongside responsive websites and online stores, we build web and mobile apps, automate workflows with tools like n8n, Make and Zapier, and put AI assistants and agents to work inside your business.",
  },
  {
    num: "6",
    question: "Do you work with international clients?",
    answer:
      "Yes — most of our work is international. Kuru Labs serves clients across the United States, United Kingdom, Europe, the Middle East and worldwide, working across time zones with updates over email or WhatsApp.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="bg-black py-28 sm:py-36 border-b border-white/5">
      <div className="mx-auto max-w-[1380px] px-6 md:px-8">
        <div className="text-center">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white">
            Frequently Asked <span className="text-accent italic font-serif">Questions</span>
          </h2>
          <p className="mt-4 text-base text-text-primary max-w-lg mx-auto">
            Everything you need to know about our engagement model, timelines, and deliverables.
          </p>
        </div>

        <div className="mx-auto mt-16 flex max-w-[880px] flex-col gap-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.num}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-accent/40 bg-[#161616]"
                    : "border-white/10 bg-[#111111] hover:border-white/20"
                } px-6`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    className="group flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left"
                  >
                    <span
                      className={`flex-1 font-display text-base sm:text-lg font-medium transition-colors ${
                        isOpen ? "text-accent" : "text-white group-hover:text-white"
                      }`}
                    >
                      {faq.num}. {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-text-muted transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-accent" : "group-hover:text-white"
                      }`}
                    />
                  </button>
                </h3>

                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm sm:text-base leading-relaxed text-text-primary pr-6">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
