"use client";

import { motion } from "framer-motion";
import { Home, Building2, Landmark, ShieldAlert, CloudLightning, Droplets, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "RESIDENTIAL ROOFING",
    desc: "Expert roofing solutions for single-family homes, focusing on durability and curb appeal.",
    icon: Home,
  },
  {
    title: "COMMERCIAL ROOFING",
    desc: "Heavy-duty roofing systems for businesses and industrial buildings across Texas.",
    icon: Building2,
  },
  {
    title: "MULTI FAMILY ROOFING",
    desc: "Specialized roofing for apartment complexes and multi-unit residential properties.",
    icon: Landmark,
  },
  // Diğer 3'ü services sayfasında görünecek, burada slice ile ilk 3'ü alacağız.
  {
    title: "EMERGENCY TARPING",
    desc: "Rapid response emergency tarping to prevent further water damage to your property.",
    icon: ShieldAlert,
  },
  {
    title: "STORM RESTORATION",
    desc: "Complete repair and restoration services after severe wind, hail, or storm damage.",
    icon: CloudLightning,
  },
  {
    title: "SEAMLESS GUTTERS",
    desc: "Custom-made seamless gutter systems designed for perfect water management.",
    icon: Droplets,
  },
];

export default function Services() {
  return (
    <section className="bg-[#111111] py-24 px-6 relative overflow-hidden">
      {/* Üstte ince kırmızı bir neon çizgi */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#b91c1c] to-transparent opacity-30"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="text-[#b91c1c] font-black uppercase tracking-[0.4em] text-[11px] py-1.5 px-4 border border-[#b91c1c]/20 rounded-full bg-[#b91c1c]/5">
              Expertise
            </span>
          </motion.div>

          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight"
          >
            FULL SCALE <span className="text-[#b91c1c]">ROOFING</span> SERVICES
          </motion.h3>
        </div>

        {/* Services Grid - Sadece ilk 3 kartı gösterir */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {services.slice(0, 3).map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] hover:bg-white/[0.04] hover:border-[#b91c1c]/40 transition-all duration-500 shadow-2xl"
            >
              <div className="relative z-10">
                <div className="w-14 h-14 bg-[#0a0a0a] rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:bg-[#b91c1c] transition-all duration-500 shadow-lg">
                  <service.icon size={24} className="text-[#b91c1c] group-hover:text-white transition-colors duration-500" />
                </div>
                
                <h4 className="text-lg font-black text-white mb-3 tracking-tight group-hover:text-[#b91c1c] transition-colors">
                  {service.title}
                </h4>
                
                <p className="text-gray-500 text-xs leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                  {service.desc}
                </p>

                <div className="flex items-center gap-3 text-[#b91c1c] font-black text-[9px] uppercase tracking-[0.2em] group-hover:gap-5 transition-all duration-300">
                  Details <ArrowRight size={12} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center">
          <Link href="/services">
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0px 0px 25px rgba(185, 28, 28, 0.3)",
                borderColor: "rgba(185, 28, 28, 0.8)"
              }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 group"
            >
              {/* Liquid Effect */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out skew-x-[-20deg]"></span>
              
              <span className="relative z-10">View All Services</span>
              <ExternalLink size={14} className="relative z-10 text-[#b91c1c] group-hover:text-white transition-colors" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}