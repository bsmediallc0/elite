"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Is the roof inspection really free?",
    answer: "Absolutely! We provide a comprehensive 21-point inspection at no cost and with zero obligation. We believe in providing value before we even start talking about numbers."
  },
  {
    question: "Do you handle insurance claims directly?",
    answer: "Yes, we are experts at navigating the insurance process. We'll meet with the adjuster at your home, document all damage, and ensure you get the full coverage you're entitled to."
  },
  {
    question: "How long does a typical roof replacement take?",
    answer: "Most residential projects are completed in just 1-2 days. Our crew works efficiently to minimize disruption to your daily life while ensuring everything is clean when we leave."
  },
  {
    question: "What kind of warranties do you offer?",
    answer: "We provide a Lifetime Workmanship Warranty on our labor, plus the full manufacturer's warranty on materials. We're in this for the long haul."
  },
  {
    question: "What areas in Texas do you serve?",
    answer: "We primarily serve Central Texas, including Waco, Temple, Belton, Austin, and the surrounding counties. If you're nearby, give us a call!"
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#0a0a0a] py-32 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#b91c1c]/20 to-transparent"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-12 h-12 bg-[#b91c1c]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#b91c1c]/20"
          >
            <HelpCircle className="text-[#b91c1c]" size={24} />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4"
          >
            COMMON <span className="text-[#b91c1c]">QUESTIONS</span>
          </motion.h2>
          <p className="text-gray-500 font-medium">Everything you need to know about your new roof.</p>
        </div>

        {/* FAQ List */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group border rounded-[2rem] transition-all duration-500 overflow-hidden ${
                  isOpen ? "bg-white/[0.05] border-[#b91c1c]/50 shadow-2xl shadow-red-900/10" : "bg-white/[0.02] border-white/5 hover:border-white/10"
                }`}
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  className="w-full p-8 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className={`text-lg md:text-xl font-bold transition-colors duration-300 ${isOpen ? "text-[#b91c1c]" : "text-white"}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? "bg-[#b91c1c] text-white rotate-0" : "bg-white/5 text-white/40 rotate-180"}`}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <div className="px-8 pb-8 text-gray-400 text-base md:text-lg leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}