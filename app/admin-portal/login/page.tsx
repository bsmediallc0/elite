"use client";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // motion eklendi
import { Lock, User, ArrowRight } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert("Unauthorized Access: " + error.message);
    } else {
      router.push("/admin-portal");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-jakarta relative overflow-hidden">
      
      {/* --- DÖNEN LEDLİ KAPSAYICI --- */}
      <div className="relative p-[2px] overflow-hidden rounded-[3.5rem] max-w-md w-full shadow-2xl shadow-red-900/20 group">
        
        {/* Dönen Kırmızı LED Gradiyenti */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_25%,#b91c1c_50%,transparent_75%,transparent_100%)] z-0"
        />

        {/* Butonun/Kutunun İçeriği (Arka planı solid yapıyoruz ki ışık içeri sızmasın) */}
        <div className="relative z-10 bg-[#0a0a0a] p-10 md:p-12 rounded-[3.4rem] border border-white/5">
          
          <div className="w-16 h-16 bg-[#b91c1c]/10 rounded-2xl flex items-center justify-center mb-8 mx-auto border border-[#b91c1c]/20 shadow-[0_0_20px_rgba(185,28,28,0.1)]">
            <Lock className="text-[#b91c1c]" size={32} />
          </div>

          <h1 className="text-3xl font-black text-white text-center mb-2 uppercase tracking-tighter italic">
            Command <span className="text-[#b91c1c]">Access</span>
          </h1>
          <p className="text-gray-500 text-center mb-10 text-[10px] font-black uppercase tracking-[0.3em]">
            B&S Operations Security
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="email" 
                placeholder="ADMIN EMAIL" 
                required 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white text-sm focus:border-[#b91c1c] outline-none transition-all placeholder:text-gray-600 font-bold" 
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="password" 
                placeholder="SECURE PASSWORD" 
                required 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white text-sm focus:border-[#b91c1c] outline-none transition-all placeholder:text-gray-600 font-bold" 
              />
            </div>

            <button 
              disabled={loading} 
              className="w-full bg-[#b91c1c] text-white py-5 rounded-2xl font-black uppercase tracking-widest mt-6 hover:bg-red-800 transition-all flex items-center justify-center gap-3 shadow-[0_5px_20px_rgba(185,28,28,0.3)] active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Authorize"} <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
      
      {/* Arka planda hafif bir derinlik için dekoratif blur */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#b91c1c]/5 blur-[120px] rounded-full" />
    </div>
  );
}