"use client";

import { motion } from "framer-motion";
import { Star, Quote, CheckCircle } from "lucide-react";

// Google "G" Logosu (SVG)
const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.85 0-5.27-1.92-6.13-4.51H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.87 14.13c-.22-.67-.35-1.39-.35-2.13s.13-1.46.35-2.13V7.03H2.18C1.43 8.52 1 10.21 1 12s.43 3.48 1.18 4.97l3.69-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.03l3.69 2.84c.86-2.59 3.28-4.51 6.13-4.51z" fill="#EA4335"/>
  </svg>
);

const reviews = [
  {
    name: "Brandon M.",
    role: "Local Guide",
    date: "3 days ago",
    text: "Had some serious hail damage after the last storm. These guys were out here the same day for an estimate. No BS, just honest work. The crew was fast and my yard was cleaner when they left than when they arrived. 5 stars well deserved!",
    rating: 5,
    color: "bg-blue-600"
  },
  {
    name: "Cynthia Rodriguez",
    role: "Verified Customer",
    date: "2 weeks ago",
    text: "B&S made the whole insurance claim process a breeze. I was dreading dealing with the adjusters but Zane handled everything. My new standing seam metal roof looks incredible. Best decision we made for our home!",
    rating: 5,
    color: "bg-orange-600"
  },
  {
    name: "Pete 'Tex' Thompson",
    role: "Local Guide",
    date: "1 month ago",
    text: "Professional, punctual, and priced right. They did a full replacement on my multi-family property. Communication was 10/10 throughout the project. Hard to find reliable roofers in Texas, but these guys are the real deal.",
    rating: 5,
    color: "bg-green-600"
  }
];

export default function Reviews() {
  return (
    <section className="bg-[#0a0a0a] py-32 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#b91c1c] opacity-[0.03] blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Google Header Style */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-20 border-b border-white/5 pb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* Google G Icon */}
              <GoogleIcon />
              <span className="text-white font-bold text-xl tracking-tight">Google Reviews</span>
              <div className="h-6 w-px bg-white/10 mx-2"></div>
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
            </div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-white tracking-tighter"
            >
              WHAT THE <span className="text-[#b91c1c]">NEIGHBORS</span> SAY
            </motion.h2>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-6 backdrop-blur-md">
            <div className="text-center">
              <p className="text-white text-4xl font-black leading-none">4.9</p>
              <div className="flex text-yellow-500 mt-2">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
              </div>
            </div>
            <div className="w-px h-12 bg-white/10"></div>
            <div>
              <p className="text-white font-bold text-sm">Excellent</p>
              <p className="text-gray-500 text-xs font-medium">Based on 120+ reviews</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#111] border border-white/5 p-8 rounded-[2rem] relative group hover:border-[#b91c1c]/40 transition-all duration-500 shadow-2xl"
            >
              <Quote className="absolute top-8 right-8 text-white/[0.03] group-hover:text-[#b91c1c]/10 transition-colors" size={50} />
              
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 ${review.color} rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg`}>
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-white font-bold tracking-wide">{review.name}</h4>
                    {review.role === "Local Guide" && (
                      <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded text-[8px] font-bold text-gray-400 uppercase tracking-tighter">
                        <Star size={8} fill="currentColor" className="text-yellow-500" /> Local Guide
                      </div>
                    )}
                  </div>
                  <p className="text-gray-500 text-[10px] font-medium">{review.date}</p>
                </div>
              </div>

              <div className="flex text-yellow-500 mb-4">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 font-medium italic">
                "{review.text}"
              </p>

              <div className="flex items-center gap-2 text-green-500/80 text-[10px] font-bold uppercase tracking-widest border-t border-white/5 pt-6">
                <CheckCircle size={12} /> Verified Google Review
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold border border-white/10 transition-all text-xs uppercase tracking-widest"
          >
            See all reviews
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#b91c1c] hover:bg-red-800 text-white px-8 py-4 rounded-xl font-bold transition-all text-xs uppercase tracking-widest flex items-center gap-3 shadow-lg shadow-red-900/20"
          >
            {/* Buton içindeki beyaz Google G logosu */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.85 0-5.27-1.92-6.13-4.51H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.87 14.13c-.22-.67-.35-1.39-.35-2.13s.13-1.46.35-2.13V7.03H2.18C1.43 8.52 1 10.21 1 12s.43 3.48 1.18 4.97l3.69-2.84z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.03l3.69 2.84c.86-2.59 3.28-4.51 6.13-4.51z" />
            </svg>
            Leave us a review
          </motion.button>
        </div>
      </div>
    </section>
  );
}