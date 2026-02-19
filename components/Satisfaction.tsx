"use client";

import { motion } from "framer-motion"; // Hatayı buradan düzelttik kanka
import { MapPin, Handshake, UsersRound, Home } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "OWNED AND OPERATED IN CENTRAL TEXAS",
    desc: "Local roots, Texas standards."
  },
  {
    icon: Handshake,
    title: "SATISFACTION GUARANTEED ON EVERY PROJECT",
    desc: "We aren't happy until you are."
  },
  {
    icon: UsersRound,
    title: "3 GENERATIONS OF ROOFING EXPERIENCE",
    desc: "Craftsmanship passed down through time."
  },
  {
    icon: Home,
    title: "RESIDENTIAL AND COMMERCIAL SERVICES",
    desc: "Full-scale solutions for any property."
  },
];

export default function Satisfaction() {
  return (
    <section className="bg-[#111111] py-32 px-6 relative overflow-hidden border-t border-white/5">
      
      {/* Background Glow */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#b91c1c] opacity-[0.03] blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <span className="text-[#b91c1c] font-black uppercase tracking-[0.4em] text-[11px] py-1.5 px-4 border border-[#b91c1c]/20 rounded-full bg-[#b91c1c]/5">
              OUR PROMISE
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 uppercase"
          >
            SATISFACTION <span className="text-[#b91c1c]">GUARANTEED</span>
          </motion.h2>
          
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            viewport={{ once: true }}
            className="h-1.5 bg-[#b91c1c] mx-auto mt-4 rounded-full"
          ></motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center group"
            >
              {/* Icon Container */}
              <div className="mb-8 w-24 h-24 bg-[#0a0a0a] rounded-3xl flex items-center justify-center border border-white/5 group-hover:border-[#b91c1c]/50 group-hover:bg-[#b91c1c]/5 transition-all duration-500 shadow-2xl relative">
                <div className="absolute inset-0 bg-[#b91c1c] opacity-0 group-hover:opacity-5 blur-2xl transition-opacity"></div>
                <item.icon size={44} className="text-[#b91c1c] group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <h3 className="text-lg font-black text-white mb-4 leading-tight tracking-tight uppercase group-hover:text-[#b91c1c] transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}