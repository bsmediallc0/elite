"use client";

import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#050505] pt-24 pb-12 px-6 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
        
        {/* Brand Column */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-black text-white tracking-tighter">
            B&S <span className="text-[#b91c1c]">ROOF SYSTEM</span>
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
            Premium roofing mastery in Central Texas. Protecting homes with 3 generations of excellence and a lifetime of trust.
          </p>
          <div className="flex gap-4">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-400 hover:bg-[#b91c1c] hover:text-white transition-all duration-300 shadow-lg">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-8">Quick Navigation</h4>
          <ul className="flex flex-col gap-4 text-gray-500 text-sm font-medium">
            {["Home", "Services", "Our Process", "Gallery", "FAQ"].map((item) => (
              <li key={item}><a href={`#${item.toLowerCase()}`} className="hover:text-[#b91c1c] transition-colors">/ {item}</a></li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-8">Expertise</h4>
          <ul className="flex flex-col gap-4 text-gray-500 text-sm font-medium">
            {["Residential", "Commercial", "Storm Restoration", "Metal Roofing", "Gutter Systems"].map((item) => (
              <li key={item} className="hover:text-white transition-colors cursor-default">• {item}</li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-6">
          <h4 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-8">Contact Us</h4>
          <div className="flex flex-col gap-5">
            <a href="tel:+12543660315" className="flex items-center gap-4 group">
              <div className="w-10 h-10 bg-[#b91c1c]/10 rounded-xl flex items-center justify-center text-[#b91c1c] group-hover:bg-[#b91c1c] group-hover:text-white transition-all">
                <Phone size={18} />
              </div>
              <span className="text-gray-400 text-sm font-bold group-hover:text-white transition-colors">254-366-0315</span>
            </a>
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 bg-[#b91c1c]/10 rounded-xl flex items-center justify-center text-[#b91c1c]">
                <MapPin size={18} />
              </div>
              <span className="text-gray-400 text-sm font-bold">Waco & Central Texas Area</span>
            </div>
            <a href="mailto:info@bsroofing.com" className="flex items-center gap-4 group">
              <div className="w-10 h-10 bg-[#b91c1c]/10 rounded-xl flex items-center justify-center text-[#b91c1c] group-hover:bg-[#b91c1c] group-hover:text-white transition-all">
                <Mail size={18} />
              </div>
              <span className="text-gray-400 text-sm font-bold group-hover:text-white transition-colors">info@bsroofsystem.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">
          © 2026 B&S Roof System. All Rights Reserved.
        </p>
        <button 
          onClick={scrollToTop}
          className="group flex items-center gap-3 text-white/40 hover:text-[#b91c1c] transition-all font-black text-[10px] uppercase tracking-[0.3em]"
        >
          Back to Top <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
}