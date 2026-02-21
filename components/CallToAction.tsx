"use client";

import { motion } from "framer-motion";
import { Phone, CalendarCheck, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function CallToAction() {
  return (
    // İŞTE BURAYA id="CallToAction" EKLENDİ!
    <section id="CallToAction" className="relative py-24 px-6 overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/2.webp" 
          alt="Roofing Background" 
          fill 
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-12 md:p-20 rounded-[3rem] shadow-2xl"
        >
          <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight">
            READY TO SECURE <br /> <span className="text-[#b91c1c]">YOUR HOME?</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
            Don't wait for the next storm. Get your <span className="text-white">free, no-obligation</span> roof inspection today from Texas's most trusted team.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {/* --- CALENDLY BAĞLANTISI BURADA --- */}
            <motion.a 
              href="https://calendly.com/bsmediallc0/30min"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(185, 28, 28, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#b91c1c] text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 group cursor-pointer"
            >
              <CalendarCheck size={20} />
              Book Free Inspection
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a 
              href="tel:+12543660315"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 transition-colors"
            >
              <Phone size={20} className="text-[#b91c1c]" />
              254-366-0315
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}