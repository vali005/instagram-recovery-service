"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/utils/content";
import { ChevronDown } from "lucide-react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#2F80ED]">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">Ответы на самые частые вопросы.</h2>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className="rounded-[1.25rem] border border-slate-200 bg-white/80 shadow-sm backdrop-blur-xl">
                <button type="button" aria-expanded={isOpen} className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left" onClick={() => setOpenIndex(isOpen ? null : index)}>
                  <span className="text-lg font-semibold text-slate-950">{item.question}</span>
                  <ChevronDown size={20} className={`text-[#2F80ED] transition ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="px-6 pb-6 text-base leading-8 text-slate-600">{item.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
