"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Maximize2, MapPin } from "lucide-react";

const projects = [
  {
    title: "Full Shingle Replacement",
    location: "Dallas, TX",
    image: "/images/1.webp",
    size: "md:col-span-2 md:row-span-2" // Bu büyük ana görsel
  },
  {
    title: "Modern Metal Roofing",
    location: "Austin, TX",
    image: "/images/2.webp",
    size: "col-span-1"
  },
  {
    title: "Emergency Repair",
    location: "Waco, TX",
    image: "/images/3.webp",
    size: "col-span-1"
  },
  {
    title: "Commercial Flat Roof",
    location: "Houston, TX",
    image: "/images/4.webp",
    size: "col-span-1"
  },
  {
    title: "Luxury Slate Install",
    location: "San Antonio, TX",
    image: "/images/5.webp",
    size: "md:col-span-2" // Bu geniş yatay görsel
  },
  {
    title: "Storm Restoration",
    location: "Fort Worth, TX",
    image: "/images/6.webp",
    size: "col-span-1"
  },
  {
    title: "Seamless Gutter System",
    location: "Temple, TX",
    image: "/images/7.webp",
    size: "col-span-1"
  }
];

export default function Gallery() {
  return (
    <section className="bg-[#111111] py-32 px-6 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-10 h-px bg-[#b91c1c]"></span>
              <span className="text-[#b91c1c] font-black uppercase tracking-[0.4em] text-[10px]">Recent Work</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-white tracking-tighter"
            >
              OUR <span className="text-[#b91c1c]">PROJECT</span> SHOWCASE
            </motion.h2>
          </div>
          <p className="text-gray-500 max-w-xs text-sm font-medium border-l border-white/10 pl-6">
            Explore our diverse portfolio of residential and commercial roofing excellence across the Lone Star State.
          </p>
        </div>

        {/* Gallery Grid - Asimetrik ve Dinamik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${project.size} relative group overflow-hidden rounded-[2.5rem] bg-[#1a1a1a] border border-white/5 shadow-2xl`}
            >
              {/* Image */}
              <Image 
                src={project.image}
                alt={project.title}
                fill
                className="object-cover opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-in-out"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
              
              {/* Project Info */}
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-2 text-[#b91c1c] mb-2 font-bold text-[10px] uppercase tracking-widest">
                  <MapPin size={12} />
                  {project.location}
                </div>
                <h3 className="text-xl font-black text-white mb-4 tracking-tight">
                  {project.title}
                </h3>
                
                {/* View Icon Button */}
                <div className="w-10 h-10 bg-[#b91c1c] rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg shadow-red-900/40">
                  <Maximize2 size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}