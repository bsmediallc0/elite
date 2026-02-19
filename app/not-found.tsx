"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Lock, ArrowLeft, Construction } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-jakarta relative overflow-hidden">
      
      {/* Arka Plan Dekorasyonu */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#b91c1c]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#b91c1c]/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-2xl w-full text-center">
        
        {/* İkon Bölümü */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative inline-block mb-12"
        >
          {/* Dönen LED Halkası */}
          <div className="absolute inset-0 -m-4 p-[2px] overflow-hidden rounded-full">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_25%,#b91c1c_50%,transparent_75%,transparent_100%)]"
            />
            <div className="absolute inset-0 bg-[#050505] rounded-full m-[1px]" />
          </div>

          <div className="relative z-10 w-24 h-24 bg-[#0a0a0a] border border-white/5 rounded-full flex items-center justify-center shadow-2xl">
            <Lock className="text-[#b91c1c]" size={40} />
          </div>
        </motion.div>

        {/* Metin Alanı */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter italic">
            ACCESS <span className="text-[#b91c1c]">RESTRICTED</span>
          </h1>
          
          <div className="flex items-center justify-center gap-3 mb-8 text-gray-500">
            <Construction size={18} className="text-[#b91c1c]" />
            <span className="text-sm font-black uppercase tracking-[0.3em]">Sector Under Development</span>
          </div>

          <p className="text-gray-400 text-lg md:text-xl font-medium max-w-md mx-auto mb-12 leading-relaxed">
            This part of the <span className="text-white">B&S Command Center</span> is reserved for upcoming premium operations. 
          </p>

          {/* Tekil Buton: Return to Base */}
          <div className="flex justify-center">
            <button 
              onClick={() => router.push("/")}
              className="px-12 py-5 bg-[#b91c1c] hover:bg-red-800 text-white rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-lg shadow-red-900/40 flex items-center gap-3 group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Return to Base
            </button>
          </div>
        </motion.div>

        {/* Alt Yazı: Daha aşağı itildi (mt-32) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-32 text-[10px] font-black text-gray-600 uppercase tracking-[0.5em]"
        >
          Error Protocol 404 // Unauthorized Route
        </motion.div>
      </div>
    </div>
  );
}