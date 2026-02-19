"use client";

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
// MapFull yerine Map getirdik kanka
import { Medal, HardHat, Users, Map, CheckCircle2 } from "lucide-react";

const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => setCount(Math.floor(latest)),
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

const stats = [
  { icon: Medal, value: 12, suffix: "+", label: "YEARS EXPERIENCE" },
  { icon: HardHat, value: 500, suffix: "+", label: "PROJECTS COMPLETED" },
  { icon: Users, value: 480, suffix: "+", label: "HAPPY FAMILIES" },
  { icon: Map, value: 15, suffix: "+", label: "TEXAS COUNTIES" }, // Burası Map oldu
];

export default function Experience() {
  return (
    <section className="bg-[#050505] py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Sol Taraf: Sayı Kartları */}
        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[2.5rem] flex flex-col items-center text-center group hover:border-[#b91c1c]/30 transition-all duration-500 shadow-2xl"
            >
              <div className="mb-6 p-3 bg-[#b91c1c]/10 rounded-2xl group-hover:bg-[#b91c1c]/20 transition-colors">
                <stat.icon className="text-[#b91c1c]" size={28} />
              </div>
              <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Sağ Taraf: Metin İçeriği */}
        <div className="flex flex-col gap-8">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-6 h-px bg-[#b91c1c]"></span>
              <span className="text-[#b91c1c] font-black uppercase tracking-[0.3em] text-[10px]">WHY B&S ROOF SYSTEM?</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-8"
            >
              Texas Tough <br /> 
              <span className="text-gray-600 font-medium italic">Craftsmanship.</span>
            </motion.h2>

            <p className="text-gray-400 text-lg leading-relaxed max-w-xl font-medium">
              We don't just fix roofs; we build peace of mind. Our team combines over a decade of local expertise with premium materials to ensure your home stands strong.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              "Licensed, Bonded & Fully Insured",
              "Lifetime Workmanship Warranty",
              "24/7 Emergency Response Team",
              "Premium Hail-Resistant Materials"
            ].map((text, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="flex items-center gap-4 group"
              >
                <div className="w-6 h-6 rounded-full border border-[#b91c1c]/50 flex items-center justify-center group-hover:bg-[#b91c1c] transition-colors">
                  <CheckCircle2 className="text-[#b91c1c] group-hover:text-white" size={14} />
                </div>
                <span className="text-white font-bold text-sm tracking-wide">{text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}