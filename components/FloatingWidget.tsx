"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase"; // Supabase eklendi
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Calendar, Mail, X, Send, User, Smartphone, MessageCircle, CheckCircle2 } from "lucide-react";

export default function FloatingWidget() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  
  // --- FORM STATES ---
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const close = () => {
    setActiveTab(null);
    setSuccess(false); // Kapatınca başarı mesajını sıfırla
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  // --- ORTAK GÖNDERİM FONKSİYONU ---
  const handleSubmit = async (type: "Book" | "SMS") => {
    setLoading(true);
    
    const { error } = await supabase
      .from('leads')
      .insert([
        { 
          name: formData.name, 
          email: formData.email || 'N/A', 
          phone: formData.phone,
          message: formData.message,
          status: type === "Book" ? "Book Inquiry" : "SMS Inquiry",
          building_type: "Direct Inquiry",
          steepness: "N/A",
          current_material: "N/A",
          desired_material: "N/A"
        },
      ]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
      
      {/* PANELLER (MODAL YAPISI) */}
      <AnimatePresence>
        {activeTab && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[350px] bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl mb-2"
          >
            {/* Header */}
            <div className="p-6 pb-2 flex justify-end items-start">
              <button onClick={close} className="text-gray-500 hover:text-white transition-colors p-1">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 pt-2">
              {success ? (
                // --- BAŞARI EKRANI ---
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
                  <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-black text-white">Message Sent!</h3>
                  <p className="text-gray-500 text-sm mt-2">We'll get back to you ASAP.</p>
                </motion.div>
              ) : (
                <>
                  {/* CALL TAB */}
                  {activeTab === "call" && (
                    <div className="text-center">
                      <h3 className="text-2xl font-black text-white mb-2">Talk to us instantly</h3>
                      <p className="text-gray-500 text-sm mb-6">We'll be on the line as fast as possible.</p>
                      <div className="bg-white p-4 rounded-3xl inline-block mb-6 shadow-xl">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=tel:12543660315" alt="QR" className="w-32 h-32" />
                      </div>
                      <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-6">OR</div>
                      <a href="tel:12543660315" className="w-full bg-[#b91c1c] hover:bg-red-800 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-red-900/20">
                        <Phone size={18} /> Call (254) 366-0315
                      </a>
                    </div>
                  )}

                  {/* BOOK TAB */}
                  {activeTab === "book" && (
                    <div>
                      <h3 className="text-2xl font-black text-white mb-2">Book in seconds</h3>
                      <p className="text-gray-500 text-sm mb-6">Tell us what you need — no pressure.</p>
                      <form className="flex flex-col gap-3">
                        <div className="relative">
                          <User className="absolute left-4 top-4 text-gray-500" size={18} />
                          <input 
                            type="text" 
                            required
                            placeholder="Name" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-[#b91c1c] outline-none transition-all" 
                          />
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-4 top-4 text-gray-500" size={18} />
                          <input 
                            type="email" 
                            placeholder="Email" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-[#b91c1c] outline-none transition-all" 
                          />
                        </div>
                        <div className="relative">
                          <Smartphone className="absolute left-4 top-4 text-gray-500" size={18} />
                          <input 
                            type="tel" 
                            required
                            placeholder="Phone" 
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-[#b91c1c] outline-none transition-all" 
                          />
                        </div>
                        <textarea 
                          placeholder="Leave us a message" 
                          rows={3} 
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-[#b91c1c] outline-none transition-all resize-none" 
                        />
                        <button 
                          type="button" 
                          disabled={loading}
                          onClick={() => handleSubmit("Book")}
                          className="w-full bg-[#b91c1c] hover:bg-red-800 text-white py-4 rounded-2xl font-bold mt-2 transition-all shadow-lg shadow-red-900/20 disabled:opacity-50"
                        >
                          {loading ? "Sending..." : "Text me the details"}
                        </button>
                      </form>
                    </div>
                  )}

                  {/* TEXT TAB */}
                  {activeTab === "text" && (
                    <div>
                      <h3 className="text-2xl font-black text-white mb-2">Send us a text</h3>
                      <p className="text-gray-500 text-sm mb-6">We'll reach out right away, no calls needed.</p>
                      <form className="flex flex-col gap-3">
                        <div className="relative">
                          <User className="absolute left-4 top-4 text-gray-500" size={18} />
                          <input 
                            type="text" 
                            required
                            placeholder="Name" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-[#b91c1c] outline-none transition-all" 
                          />
                        </div>
                        <div className="relative">
                          <Smartphone className="absolute left-4 top-4 text-gray-500" size={18} />
                          <input 
                            type="tel" 
                            required
                            placeholder="Phone" 
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-[#b91c1c] outline-none transition-all" 
                          />
                        </div>
                        <textarea 
                          placeholder="Leave us a message" 
                          rows={3} 
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-[#b91c1c] outline-none transition-all resize-none" 
                        />
                        <button 
                          type="button" 
                          disabled={loading}
                          onClick={() => handleSubmit("SMS")}
                          className="w-full bg-[#b91c1c] hover:bg-red-800 text-white py-4 rounded-2xl font-bold mt-2 flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-900/20 disabled:opacity-50"
                        >
                          <Send size={18} /> {loading ? "Sending..." : "Send SMS"}
                        </button>
                      </form>
                    </div>
                  )}

                  {/* EMAIL TAB */}
                  {activeTab === "email" && (
                    <div className="text-center">
                      <h3 className="text-2xl font-black text-white mb-2">Scan to Email</h3>
                      <p className="text-gray-500 text-sm mb-6">Quickly send us an email from your mobile.</p>
                      <div className="bg-white p-4 rounded-3xl inline-block mb-6 shadow-xl">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=mailto:info@bsroofsystem.com" alt="Email QR" className="w-32 h-32" />
                      </div>
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/10 mb-4">
                        <span className="text-gray-400 text-xs block mb-1 uppercase font-bold tracking-tighter">Direct Email:</span>
                        <span className="text-white font-bold">info@bsroofsystem.com</span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* YATAY WIDGET BARI (DÖNEN LEDLİ) */}
      <div className="relative p-[2px] overflow-hidden rounded-full shadow-2xl shadow-red-900/40">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_25%,#b91c1c_50%,transparent_75%,transparent_100%)] z-0"
        />
        <div className="relative z-10 bg-[#0a0a0a]/95 backdrop-blur-xl flex items-center p-1 rounded-full">
          {[
            { id: "call", icon: Phone, label: "Call" },
            { id: "book", icon: Calendar, label: "Book" },
            { id: "text", icon: MessageCircle, label: "Text" },
            { id: "email", icon: Mail, label: "Email" },
          ].map((item) => (
            <motion.button
              key={item.id}
              onClick={() => {
                setActiveTab(activeTab === item.id ? null : item.id);
                setSuccess(false); // Sekme değiştirince başarıyı sıfırla
              }}
              whileHover={{ backgroundColor: "rgba(185, 28, 28, 0.1)" }}
              whileTap={{ scale: 0.9 }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${activeTab === item.id ? 'bg-[#b91c1c] text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <item.icon size={18} strokeWidth={activeTab === item.id ? 3 : 2} />
              <span className={`text-[11px] font-black uppercase tracking-widest text-white`}>
                {item.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}