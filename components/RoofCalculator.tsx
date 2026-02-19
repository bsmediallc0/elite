"use client";
import { supabase } from "../lib/supabase";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Ruler, CheckCircle2, User, Mail, Phone } from "lucide-react";

// --- FİYAT MATRİSİ ---
const BASE_PRICE = 12000;

const MULTIPLIERS = {
  steepness: { "Flat": 1.0, "Low": 1.15, "Moderate": 1.3, "Steep": 1.5 },
  buildingType: { "Residential": 1.0, "Commercial": 1.35 },
  currentMaterial: { "Asphalt": 1.0, "Metal": 1.25, "Tile": 1.4, "Cedar": 1.3 },
  desiredMaterial: { "Asphalt": 1.0, "Metal": 1.65 },
  timeline: { "Now": 1.1, "In 1-3 months": 1.0, "No timeline": 0.9 }
};

const steps = [
  { id: 1, title: "Start" },
  { id: 2, title: "Roof Steepness" },
  { id: 3, title: "Building Type" },
  { id: 4, title: "Current Material" },
  { id: 5, title: "Desired Material" },
  { id: 6, title: "Timeline" },
  { id: 7, title: "Contact" },
  { id: 8, title: "Results" }
];

export default function RoofCalculator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedItem, setSelectedItem] = useState<string | null>(null); // Animasyon için eklendi
  const [formData, setFormData] = useState({
    steepness: "Moderate",
    buildingType: "Residential",
    currentMaterial: "Asphalt",
    desiredMaterial: "Asphalt",
    timeline: "In 1-3 months",
    name: "",
    email: "",
    phone: ""
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSelect = (field: string, value: string) => {
    setSelectedItem(value); // Önce seçileni işaretliyoruz (animasyon başlasın)
    setFormData({ ...formData, [field]: value });
    
    // YARIM SANİYE (500ms) BEKLETİP GEÇİRİYORUZ
    setTimeout(() => {
      nextStep();
      setSelectedItem(null); // Diğer ekrana geçince efekti sıfırlıyoruz
    }, 500);
  };

  // --- DİNAMİK FİYAT HESAPLAMA ---
  const calculateResult = () => {
    let total = BASE_PRICE;
    total *= MULTIPLIERS.steepness[formData.steepness as keyof typeof MULTIPLIERS.steepness] || 1;
    total *= MULTIPLIERS.buildingType[formData.buildingType as keyof typeof MULTIPLIERS.buildingType] || 1;
    total *= MULTIPLIERS.currentMaterial[formData.currentMaterial as keyof typeof MULTIPLIERS.currentMaterial] || 1;
    total *= MULTIPLIERS.desiredMaterial[formData.desiredMaterial as keyof typeof MULTIPLIERS.desiredMaterial] || 1;
    total *= MULTIPLIERS.timeline[formData.timeline as keyof typeof MULTIPLIERS.timeline] || 1;

    const min = Math.floor(total * 0.95);
    const max = Math.floor(total * 1.10);
    return { min, max };
  };

  const { min, max } = calculateResult();

  // --- SUPABASE GÖNDERİMİ ---
  const handleSubmit = async () => {
    console.log("Veri fırlatılıyor kanka...", formData);
    const { data, error } = await supabase
      .from('leads')
      .insert([
        { 
          name: formData.name, 
          email: formData.email, 
          phone: formData.phone,
          steepness: formData.steepness,
          building_type: formData.buildingType,
          current_material: formData.currentMaterial,
          desired_material: formData.desiredMaterial,
          estimated_min: min,
          estimated_max: max,
          status: 'New'
        },
      ]);

    if (error) {
      console.error("Kanka Supabase borusu tıkandı:", error.message);
      alert("Hata: " + error.message);
    } else {
      console.log("Veri Dashboard'a uçtu!");
      nextStep(); 
    }
  };

  return (
    <section className="bg-[#0a0a0a] py-24 px-6 relative overflow-hidden" id="calculator">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
              Step {currentStep} of {steps.length - 1}
            </span>
            <span className="text-[#b91c1c] font-black uppercase tracking-[0.2em] text-[10px]">
              {steps[currentStep - 1].title}
            </span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#b91c1c]"
              animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="bg-[#111111] border border-white/5 p-8 md:p-16 rounded-[3rem] shadow-2xl relative min-h-[550px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* STEP 1: Intro */}
              {currentStep === 1 && (
                <div className="text-center">
                  <Ruler size={48} className="text-[#b91c1c] mx-auto mb-8" />
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase italic">
                    AI Roof <br /> <span className="text-[#b91c1c]">Estimator</span>
                  </h2>
                  <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                    Get an instant price range based on current Texas market labor and material rates.
                  </p>
                  <button onClick={nextStep} className="bg-[#b91c1c] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 mx-auto hover:bg-red-800 transition-all">
                    Start Calculation <ArrowRight size={20} />
                  </button>
                </div>
              )}

              {/* STEP 2: Steepness */}
              {currentStep === 2 && (
                <div className="text-center">
                  <h3 className="text-3xl font-black text-white mb-10 uppercase tracking-tight">How steep is your roof?</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.keys(MULTIPLIERS.steepness).map((item) => (
                      <motion.button 
                        key={item} 
                        onClick={() => handleSelect("steepness", item)} 
                        animate={{ opacity: selectedItem && selectedItem !== item ? 0 : 1, scale: selectedItem && selectedItem !== item ? 0.95 : 1 }}
                        transition={{ duration: 0.3 }}
                        className={`p-8 rounded-3xl font-black transition-all text-[10px] tracking-widest uppercase border ${selectedItem === item ? 'border-[#b91c1c] bg-[#b91c1c]/20 text-white shadow-[0_0_25px_rgba(185,28,28,0.7)]' : formData.steepness === item ? 'border-[#b91c1c] bg-[#b91c1c]/10 text-white' : 'border-white/10 text-gray-500 hover:border-white/30'}`}
                      >
                        {item}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Building Type */}
              {currentStep === 3 && (
                <div className="text-center">
                  <h3 className="text-3xl font-black text-white mb-10 uppercase tracking-tight">What type of building?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {["Residential", "Commercial"].map((type) => (
                      <motion.button 
                        key={type} 
                        onClick={() => handleSelect("buildingType", type)} 
                        animate={{ opacity: selectedItem && selectedItem !== type ? 0 : 1, scale: selectedItem && selectedItem !== type ? 0.95 : 1 }}
                        transition={{ duration: 0.3 }}
                        className={`relative h-64 rounded-[2rem] overflow-hidden group border transition-all ${selectedItem === type ? 'border-[#b91c1c] shadow-[0_0_30px_rgba(185,28,28,0.7)] z-10' : 'border-white/5 shadow-2xl'}`}
                      >
                        <img src={type === "Residential" ? "/images/residential-roof.webp" : "/images/commercial-roof.webp"} alt={type} className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${selectedItem === type ? 'opacity-70 scale-110' : 'opacity-40 group-hover:opacity-60 group-hover:scale-110'}`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <span className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white font-black text-2xl uppercase italic tracking-tighter drop-shadow-2xl">{type}</span>
                        <div className={`absolute bottom-0 left-0 h-1 bg-[#b91c1c] transition-all duration-500 ${selectedItem === type ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: Current Material */}
              {currentStep === 4 && (
                <div className="text-center">
                  <h3 className="text-3xl font-black text-white mb-10 uppercase tracking-tight">Current Material?</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.keys(MULTIPLIERS.currentMaterial).map((mat) => (
                      <motion.button 
                        key={mat} 
                        onClick={() => handleSelect("currentMaterial", mat)} 
                        animate={{ opacity: selectedItem && selectedItem !== mat ? 0 : 1, scale: selectedItem && selectedItem !== mat ? 0.95 : 1 }}
                        transition={{ duration: 0.3 }}
                        className={`p-6 rounded-3xl font-black transition-all text-[10px] tracking-widest uppercase border ${selectedItem === mat ? 'border-[#b91c1c] bg-[#b91c1c]/20 text-white shadow-[0_0_25px_rgba(185,28,28,0.7)]' : formData.currentMaterial === mat ? 'border-[#b91c1c] bg-[#b91c1c]/10 text-white' : 'border-white/10 text-gray-500 hover:border-white/30'}`}
                      >
                        {mat}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5: Desired Material */}
              {currentStep === 5 && (
                <div className="text-center">
                  <h3 className="text-3xl font-black text-white mb-10 uppercase tracking-tight">New Roof Material?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.keys(MULTIPLIERS.desiredMaterial).map((mat) => (
                      <motion.button 
                        key={mat} 
                        onClick={() => handleSelect("desiredMaterial", mat)} 
                        animate={{ opacity: selectedItem && selectedItem !== mat ? 0 : 1, scale: selectedItem && selectedItem !== mat ? 0.95 : 1 }}
                        transition={{ duration: 0.3 }}
                        className={`p-10 rounded-3xl font-black transition-all text-xl tracking-tighter uppercase italic border ${selectedItem === mat ? 'border-[#b91c1c] bg-[#b91c1c]/20 text-white shadow-[0_0_25px_rgba(185,28,28,0.7)]' : formData.desiredMaterial === mat ? 'border-[#b91c1c] bg-[#b91c1c]/10 text-white' : 'border-white/10 text-gray-500 hover:border-white/30'}`}
                      >
                        {mat}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 6: Timeline */}
              {currentStep === 6 && (
                <div className="text-center">
                  <h3 className="text-3xl font-black text-white mb-10 uppercase tracking-tight">Timeline?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.keys(MULTIPLIERS.timeline).map((time) => (
                      <motion.button 
                        key={time} 
                        onClick={() => handleSelect("timeline", time)} 
                        animate={{ opacity: selectedItem && selectedItem !== time ? 0 : 1, scale: selectedItem && selectedItem !== time ? 0.95 : 1 }}
                        transition={{ duration: 0.3 }}
                        className={`p-8 rounded-3xl font-black transition-all text-[10px] tracking-widest uppercase border ${selectedItem === time ? 'border-[#b91c1c] bg-[#b91c1c]/20 text-white shadow-[0_0_25px_rgba(185,28,28,0.7)]' : formData.timeline === time ? 'border-[#b91c1c] bg-[#b91c1c]/10 text-white' : 'border-white/10 text-gray-500 hover:border-white/30'}`}
                      >
                        {time}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 7: Form */}
              {currentStep === 7 && (
                <div className="max-w-md mx-auto">
                  <h3 className="text-3xl font-black text-white mb-2 text-center uppercase tracking-tight">Unlock Results</h3>
                  <p className="text-gray-500 text-center mb-8 text-sm">Fill in to see your instant market estimate.</p>
                  <div className="flex flex-col gap-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input 
                        type="text" 
                        placeholder="Name" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:border-[#b91c1c] outline-none" 
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input 
                        type="email" 
                        placeholder="Email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:border-[#b91c1c] outline-none" 
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input 
                        type="tel" 
                        placeholder="Phone" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:border-[#b91c1c] outline-none" 
                      />
                    </div>
                    <button onClick={handleSubmit} className="w-full bg-[#b91c1c] text-white py-5 rounded-2xl font-black uppercase tracking-widest mt-4 hover:bg-red-800 transition-all">Show Estimates</button>
                  </div>
                </div>
              )}

              {/* STEP 8: Results */}
              {currentStep === 8 && (
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 size={40} className="text-green-500" />
                  </div>
                  <h3 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Calculation Complete</h3>
                  <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] mb-10">
                    <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] block mb-4">Market Estimate:</span>
                    <span className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                      ${min.toLocaleString()} - ${max.toLocaleString()}*
                    </span>
                    <p className="text-gray-600 text-[10px] mt-6 font-bold uppercase tracking-widest">
                      *Price includes Texas sales tax, removal, and lifetime warranty.
                    </p>
                  </div>

                  <div className="max-w-[300px] mx-auto mb-8">
                    <div className="relative p-[2px] overflow-hidden rounded-2xl group shadow-lg shadow-red-900/20">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,transparent_92%,#b91c1c_100%)] z-0"
                      />
                      <a 
                        href="#book-now" 
                        className="relative z-10 block w-full bg-[#1a1a1a] hover:bg-[#222222] text-white py-5 rounded-[14px] font-black uppercase tracking-[0.2em] text-sm transition-all flex items-center justify-center gap-3"
                      >
                        Book Now <ArrowRight size={18} className="text-[#b91c1c]" />
                      </a>
                    </div>
                  </div>

                  <button onClick={() => setCurrentStep(1)} className="text-gray-600 font-black text-[10px] uppercase tracking-[0.3em] hover:text-[#b91c1c] transition-colors">
                    RESTART CALCULATION
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Animasyon sırasındayken BACK butonunu da gizliyoruz ki kazara basılmasın */}
          {currentStep > 1 && currentStep < 8 && !selectedItem && (
            <button onClick={prevStep} className="absolute top-8 left-8 text-gray-500 hover:text-white flex items-center gap-2 text-[10px] font-black tracking-widest">
              <ArrowLeft size={14} /> BACK
            </button>
          )}
        </div>
      </div>
    </section>
  );
}