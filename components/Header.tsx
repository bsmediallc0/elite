"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Phone, Facebook, Instagram, Youtube, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { 
      name: "Services", 
      href: "/services",
      subItems: [
        { name: "Service 1", href: "/services/1" },
        { name: "Service 2", href: "/services/2" },
        { name: "Service 3", href: "/services/3" },
        { name: "Service 4", href: "/services/4" },
        { name: "Service 5", href: "/services/5" },
      ]
    },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col w-full">
      {/* Top Bar (Contact Info & Socials) */}
      <div className="bg-[#0f172a] text-white py-2 px-6 hidden sm:flex justify-between items-center text-sm border-b border-white/5">
        
        {/* Modern Social Media Icons */}
        <div className="flex items-center gap-4">
          <span className="font-semibold text-gray-400 text-xs tracking-widest uppercase">Follow Us</span>
          <div className="flex items-center gap-3">
            <a href="#" className="text-gray-400 hover:text-[#b91c1c] hover:scale-110 transition-all duration-300">
              <Facebook size={16} />
            </a>
            <a href="#" className="text-gray-400 hover:text-[#b91c1c] hover:scale-110 transition-all duration-300">
              <Instagram size={16} />
            </a>
            <a href="#" className="text-gray-400 hover:text-[#b91c1c] hover:scale-110 transition-all duration-300">
              <Youtube size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-[#b91c1c] hover:scale-110 transition-all duration-300">
              {/* Custom TikTok SVG */}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
          </div>
        </div>
        
        {/* Liquid Transparent Phone Button */}
        <div className="flex items-center">
          <a 
            href="tel:+12543660315" 
            className="relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#b91c1c] hover:shadow-[0_0_15px_rgba(185,28,28,0.4)] text-white px-5 py-1.5 rounded-full font-bold transition-all duration-300 group flex items-center gap-2"
          >
             {/* Liquid / Glass Sweep Effect */}
             <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out skew-x-[-20deg]"></span>
             <Phone size={14} className="relative z-10 text-[#b91c1c] group-hover:text-white transition-colors" />
             <span className="relative z-10 text-sm tracking-widest">254-366-0315</span>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-[#0a0a0a]/80 backdrop-blur-xl shadow-lg py-3 border-b border-white/10"
            : "bg-[#0a0a0a]/50 backdrop-blur-sm py-4 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-black tracking-tighter text-white drop-shadow-md">
              B&S <span className="text-[#b91c1c]">ROOF</span> SYSTEM
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className="relative text-white font-medium flex items-center gap-1"
                >
                  <span className="group-hover:text-[#ff4d4d] transition-colors duration-300 drop-shadow-sm">
                    {link.name}
                  </span>
                  {link.subItems && (
                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                  )}
                  {/* Hover Underline Animation */}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#b91c1c] transition-all duration-300 group-hover:w-full"></span>
                </Link>

                {/* Desktop Dropdown Menu */}
                {link.subItems && (
                  <div className="absolute top-full left-0 mt-4 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0">
                    <div className="bg-[#171717]/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/50 py-2">
                      {link.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-5 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-[#ff4d4d] transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Liquid Transparent CTA Button */}
            <Link href="/quote">
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0px 0px 20px rgba(185, 28, 28, 0.4)",
                  borderColor: "rgba(185, 28, 28, 0.8)"
                }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 text-white px-7 py-2.5 rounded-full font-bold transition-all duration-300 group"
              >
                {/* Liquid / Glass Sweep Effect */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out skew-x-[-20deg]"></span>
                <span className="relative z-10">Get A Quote</span>
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="lg:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/10 shadow-2xl"
        >
          <div className="flex flex-col px-6 py-4 gap-2">
             {navLinks.map((link) => (
              <div key={link.name} className="flex flex-col border-b border-white/5 pb-2">
                <Link
                  href={link.href}
                  className="text-white text-lg font-medium hover:text-[#b91c1c] transition-colors py-2 flex justify-between items-center"
                  onClick={() => !link.subItems && setIsMobileMenuOpen(false)}
                >
                  {link.name}
                  {link.subItems && <ChevronDown size={18} className="text-gray-500" />}
                </Link>
                
                {/* Mobile Submenu Items */}
                {link.subItems && (
                  <div className="flex flex-col pl-4 mt-1 gap-3 mb-2">
                    {link.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="text-gray-400 text-base hover:text-[#ff4d4d] transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        - {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Liquid Transparent Mobile Button */}
            <Link
              href="/quote"
              className="relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#b91c1c] hover:shadow-[0_0_15px_rgba(185,28,28,0.4)] text-white text-center py-3 rounded-full font-bold mt-4 transition-all duration-300 group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
               <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out skew-x-[-20deg]"></span>
               <span className="relative z-10">Get A Quote</span>
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}