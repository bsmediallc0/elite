"use client";
import MobileActionMenu from "@/components/MobileActionMenu";
import { supabase } from "../lib/supabase"; // Supabase eklendi
import RoofCalculator from "../components/RoofCalculator";
import FloatingWidget from "../components/FloatingWidget";
import CallToAction from "../components/CallToAction";
import Satisfaction from "../components/Satisfaction";
import Partners from "../components/Partners";
import FAQ from "../components/FAQ";
import Gallery from "../components/Gallery";
import Reviews from "../components/Reviews";
import Process from "../components/Process";
import Experience from "../components/Experience";
import Services from "../components/Services";
import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../components/Header"; 
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Phone, ArrowRight, CheckCircle2 } from "lucide-react";

const bgImages = [
  "/images/1.webp",
  "/images/2.webp",
  "/images/3.webp",
  "/images/4.webp"
];

export default function Home() {
  const [currentBg, setCurrentBg] = useState(0);

  // --- FORM YÖNETİMİ ---
  const [heroForm, setHeroForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // --- SUPABASE GÖNDERİMİ ---
  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('leads')
      .insert([
        { 
          name: heroForm.name, 
          email: heroForm.email, 
          phone: heroForm.phone,
          message: heroForm.message,
          status: 'Direct Inquiry', // Dashboard'da farklı görünmesi için
          building_type: 'Direct Inquiry',
          steepness: 'N/A',
          current_material: 'N/A',
          desired_material: 'N/A'
        }
      ]);

    if (error) {
      console.error(error.message);
      alert("Something went wrong, please try again.");
    } else {
      setSuccess(true);
      setHeroForm({ name: "", email: "", phone: "", message: "" });
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a] pt-24 pb-20">
        
        {/* Smooth Background Slider */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence>
            <motion.div
              key={currentBg}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.6, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image 
                src={bgImages[currentBg]} 
                alt={`B&S Roofing Showcase ${currentBg + 1}`} 
                fill
                priority
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#0a0a0a_100%)] z-10 opacity-70"></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center">
          
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6 text-left items-start justify-self-start"
          >
            <div className="flex items-center gap-3 bg-white/10 w-fit px-4 py-2 rounded-full border border-white/20 backdrop-blur-xl">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <span className="text-xs font-bold text-white tracking-[0.2em] uppercase">Premium Roofing</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight drop-shadow-2xl">
              Modern <span className="text-[#b91c1c]">Roofing</span> <br /> 
              <span className="text-white/90">Mastery.</span>
            </h1>
            
            <p className="text-base md:text-xl text-gray-300 max-w-lg leading-relaxed drop-shadow-lg font-medium">
              Elite roofing solutions for those who demand durability, style, and unmatched Texas craftsmanship. 
            </p>

            <div className="flex flex-wrap items-center gap-5 mt-4">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(185, 28, 28, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#b91c1c] hover:bg-red-800 text-white px-8 py-4 rounded-2xl font-black transition-all text-sm uppercase tracking-widest flex items-center gap-2 group"
              >
                Learn More
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <a href="tel:+12543660315" className="group flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-4 rounded-2xl transition-all">
                <div className="w-10 h-10 bg-[#b91c1c]/20 rounded-full flex items-center justify-center group-hover:bg-[#b91c1c]/40 transition-colors">
                  <Phone size={20} className="text-[#b91c1c]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Call Support</span>
                  <span className="text-white font-bold text-lg">254-366-0315</span>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Column: LEAD FORM (Connected to Supabase) */}
          <div className="relative p-[2px] overflow-hidden rounded-[2.5rem] max-w-[460px] w-full justify-self-end group shadow-2xl">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_25%,#b91c1c_50%,transparent_75%,transparent_100%)] z-0"
            />
            
            <div className="relative z-10 bg-[#0a0a0a]/90 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white/10">
              {success ? (
                // SUCCESS STATE
                <div className="text-center py-20">
                  <CheckCircle2 size={48} className="text-green-500 mx-auto mb-6" />
                  <h2 className="text-3xl font-black text-white mb-2 uppercase italic">Success!</h2>
                  <p className="text-gray-400 font-medium">We'll contact you shortly.</p>
                  <button onClick={() => setSuccess(false)} className="mt-8 text-[10px] font-black text-[#b91c1c] uppercase tracking-widest">Send Another</button>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-black text-white mb-8 tracking-tight italic">
                    Free <span className="text-[#b91c1c]">Estimate</span>
                  </h2>
                  
                  <form onSubmit={handleHeroSubmit} className="flex flex-col gap-5">
                    <input 
                      required
                      type="text" 
                      placeholder="Full Name" 
                      value={heroForm.name}
                      onChange={(e) => setHeroForm({...heroForm, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-base focus:border-[#b91c1c] outline-none transition-all placeholder:text-gray-500" 
                    />
                    <input 
                      required
                      type="email" 
                      placeholder="Email Address" 
                      value={heroForm.email}
                      onChange={(e) => setHeroForm({...heroForm, email: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-base focus:border-[#b91c1c] outline-none transition-all placeholder:text-gray-500" 
                    />
                    <input 
                      required
                      type="tel" 
                      placeholder="Phone Number" 
                      value={heroForm.phone}
                      onChange={(e) => setHeroForm({...heroForm, phone: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-base focus:border-[#b91c1c] outline-none transition-all placeholder:text-gray-500" 
                    />
                    <textarea 
                      rows={3} 
                      placeholder="How can we help?" 
                      value={heroForm.message}
                      onChange={(e) => setHeroForm({...heroForm, message: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-base focus:border-[#b91c1c] outline-none transition-all resize-none placeholder:text-gray-500"
                    ></textarea>
                    
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit" 
                      disabled={loading}
                      className="bg-[#b91c1c] hover:bg-red-800 text-white font-black py-5 rounded-2xl mt-2 transition-all shadow-[0_10px_30px_rgba(185,28,28,0.3)] text-sm uppercase tracking-[0.2em] disabled:opacity-50"
                    >
                      {loading ? "Sending..." : "Get Your Quote Now"}
                    </motion.button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer & Other Components */}
      <Partners />
      <Satisfaction />
      <RoofCalculator />
      <Services />
      <Experience />
      <Process />
      <Reviews />
      <Gallery />
      <FAQ />
      <CallToAction />
      <FloatingWidget />
      <MobileActionMenu />
      <Footer />
    </>
  );
}