"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MessageSquare, Mail, Plus, Phone } from "lucide-react";

export default function MobileActionMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Butonlara tıklayınca menüyü kapatmak için
  const closeMenu = () => setIsOpen(false);

  return (
    // md:hidden diyerek sadece telefonda (küçük ekranda) görünmesini sağlıyoruz
    <div className="md:hidden fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      
      {/* Yukarı Doğru Açılan Seçenekler */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3"
          >
            {/* CALL BUTONU */}
            <a href="tel:12543660315" onClick={closeMenu} className="flex items-center gap-3 bg-[#0a0a0a] border border-white/10 text-white pl-5 pr-2 py-2 rounded-full shadow-xl">
              <span className="text-[10px] font-black uppercase tracking-widest">Call</span>
              <div className="bg-[#b91c1c] p-3 rounded-full text-white">
                <Phone size={16} />
              </div>
            </a>

            {/* BOOK BUTONU (Direkt CallToAction bölümüne kaydırır) */}
            <a href="#CallToAction" onClick={closeMenu} className="flex items-center gap-3 bg-[#0a0a0a] border border-white/10 text-white pl-5 pr-2 py-2 rounded-full shadow-xl">
              <span className="text-[10px] font-black uppercase tracking-widest">Book</span>
              <div className="bg-[#b91c1c] p-3 rounded-full text-white">
                <Calendar size={16} />
              </div>
            </a>

            {/* TEXT BUTONU */}
            <a href="sms:12543660315" onClick={closeMenu} className="flex items-center gap-3 bg-[#0a0a0a] border border-white/10 text-white pl-5 pr-2 py-2 rounded-full shadow-xl">
              <span className="text-[10px] font-black uppercase tracking-widest">Text</span>
              <div className="bg-[#b91c1c] p-3 rounded-full text-white">
                <MessageSquare size={16} />
              </div>
            </a>

            {/* EMAIL BUTONU */}
            <a href="mailto:info@bsroofsystem.com" onClick={closeMenu} className="flex items-center gap-3 bg-[#0a0a0a] border border-white/10 text-white pl-5 pr-2 py-2 rounded-full shadow-xl">
              <span className="text-[10px] font-black uppercase tracking-widest">Email</span>
              <div className="bg-[#b91c1c] p-3 rounded-full text-white">
                <Mail size={16} />
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ana Tetikleyici Buton (Aç/Kapat) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#b91c1c] hover:bg-red-800 text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(185,28,28,0.4)] transition-all active:scale-95"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Menü açıkken Plus ikonu 45 derece dönüp Çarpı (X) şeklini alacak */}
          <Plus size={28} />
        </motion.div>
      </button>

    </div>
  );
}