"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";

export default function FAQAccordion({ faqs }: { faqs: any[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
      {faqs.map((faq) => {
        const isOpen = openId === faq._id;
        return (
          <div key={faq._id} className="bg-white rounded-[1.5rem] border border-off-white overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-colors hover:border-saffron/30">
            <button
              onClick={() => setOpenId(isOpen ? null : faq._id)}
              className="w-full text-left px-6 py-5 md:px-8 md:py-6 flex items-center justify-between gap-4 outline-none focus-visible:bg-navy/5"
              aria-expanded={isOpen}
            >
              <h4 className="font-display font-medium text-lg md:text-xl text-navy pr-8">
                {faq.question}
              </h4>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                className="shrink-0 w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center"
              >
                <CaretDown weight="bold" className="w-4 h-4 text-navy" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 }
                  }}
                  transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                >
                  <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 text-slate-body leading-relaxed max-w-[65ch]">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
