"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, FileSearch, HardHat, ShieldCheck } from "lucide-react";

const steps = [
  {
    title: "Free Inspection",
    desc: "We perform a detailed 21-point inspection to identify every issue on your roof.",
    icon: FileSearch,
    step: "01"
  },
  {
    title: "Custom Estimate",
    desc: "Get a transparent, itemized quote with premium material options and no hidden costs.",
    icon: ClipboardCheck,
    step: "02"
  },
  {
    title: "Expert Installation",
    desc: "Our licensed crew completes your roof with speed, precision, and zero mess left behind.",
    icon: HardHat,
    step: "03"
  },
  {
    title: "Final Protection",
    desc: "We run a final quality audit and activate your lifetime workmanship warranty.",
    icon: ShieldCheck,
    step: "04"
  }
];

export default function Process() {
  return (
    <section className="bg-[#111111] py-32 px-6 relative overflow-hidden border-t border-white/5">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(185,28,28,0.03)_0%,transparent_70%)]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-[#b91c1c]"></span>
            <span className="text-[#b91c1c] font-black uppercase tracking-[0.5em] text-[10px]">The Path To Success</span>
            <span className="w-8 h-px bg-[#b91c1c]"></span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter"
          >
            How We Get It <span className="text-[#b91c1c]">Done.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-12"></div>

          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group flex flex-col items-center text-center"
            >
              {/* Step Number Badge */}
              <div className="absolute -top-4 -right-2 text-6xl font-black text-white/[0.03] group-hover:text-[#b91c1c]/10 transition-colors duration-500 italic">
                {item.step}
              </div>

              {/* Icon Container */}
              <div className="w-24 h-24 bg-[#0a0a0a] border border-white/10 rounded-full flex items-center justify-center mb-8 relative z-20 group-hover:border-[#b91c1c]/50 group-hover:shadow-[0_0_30px_rgba(185,28,28,0.2)] transition-all duration-500">
                <div className="absolute inset-2 border border-white/5 rounded-full group-hover:border-[#b91c1c]/20 transition-all"></div>
                <item.icon size={32} className="text-[#b91c1c] group-hover:scale-110 transition-transform duration-500" />
              </div>

              <h3 className="text-xl font-black text-white mb-4 tracking-tight group-hover:text-[#b91c1c] transition-colors uppercase italic">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed px-4 group-hover:text-gray-300 transition-colors">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}