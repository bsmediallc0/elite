"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  "/logos/11.webp",
  "/logos/22.webp",
  "/logos/33.webp",
  "/logos/44.webp",
  "/logos/88.webp",
  "/logos/66.webp",
  "/logos/77.webp",
  // Döngünün pürüzsüz olması için listeyi tekrarlıyoruz
  "/logos/11.webp",
  "/logos/22.webp",
  "/logos/33.webp",
  "/logos/44.webp",
  "/logos/88.webp",
  "/logos/66.webp",
  "/logos/77.webp",
];

export default function Partners() {
  return (
    <section className="bg-[#0a0a0a] py-16 relative overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Services Bölümüyle Uyumlu Yeni Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="text-[#b91c1c] font-black uppercase tracking-[0.4em] text-[11px] py-1.5 px-4 border border-[#b91c1c]/20 rounded-full bg-[#b91c1c]/5">
              PARTNERSHIPS
            </span>
          </motion.div>

          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight"
          >
            OUR TRUSTED <span className="text-[#b91c1c]">PARTNERS</span>
          </motion.h3>
          
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: true }}
            className="h-1 bg-[#b91c1c] mx-auto mt-6 rounded-full"
          ></motion.div>
        </div>

        {/* Infinite Logo Ticker */}
        <div className="relative overflow-hidden group h-20 md:h-28 flex items-center">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              duration: 25, // Hızı buradan ayarlayabilirsin, sayı büyüdükçe yavaşlar
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="flex items-center gap-16 md:gap-28 whitespace-nowrap"
          >
            {partners.map((logo, index) => (
              <div 
                key={index} 
                className="relative w-28 h-12 md:w-36 md:h-16 flex-shrink-0 filter grayscale opacity-40 hover:filter-none hover:opacity-100 transition-all duration-500 transition-all cursor-pointer"
              >
                <Image
                  src={logo}
                  alt={`Partner Logo ${index}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </motion.div>
          
          {/* Kenarlarda yumuşak geçiş efektleri */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}