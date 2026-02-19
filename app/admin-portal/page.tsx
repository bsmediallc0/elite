"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";
import { 
  Phone, Mail, Clock, Ruler, Construction, Layers, Calendar, 
  DollarSign, RefreshCw, ArrowRight, MessageSquare, LogOut,
  Download, Search, BarChart3, Users, Target, Trash2
} from "lucide-react";

export default function AdminDashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) setLeads(data);
    setLoading(false);
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin-portal/login");
      } else {
        fetchLeads();
      }
    };

    checkUser();

    const channel = supabase
      .channel('leads_realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'leads' }, 
      (payload) => setLeads((prev) => [payload.new, ...prev]))
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin-portal/login");
  };

  // --- 1. DURUM GÜNCELLEME (STATUS PIPELINE) ---
  const updateStatus = async (id: string, newStatus: string) => {
    // Ekranı anında güncelle (Optimistic UI)
    setLeads(leads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
    // Veritabanını güncelle
    await supabase.from('leads').update({ status: newStatus }).eq('id', id);
  };

  // --- 2. ARŞİVLEME / SİLME ---
  const archiveLead = async (id: string) => {
    if(!window.confirm("Are you sure you want to delete this lead?")) return;
    setLeads(leads.filter(lead => lead.id !== id));
    await supabase.from('leads').delete().eq('id', id);
  };

  // --- 3. EXCEL (CSV) İNDİRME ---
  const exportToCSV = () => {
    const headers = "Date,Name,Phone,Email,Status,Building Type,Material,Est Revenue Min,Est Revenue Max\n";
    const rows = leads.map(l => 
      `${new Date(l.created_at).toLocaleDateString()},"${l.name}","${l.phone}","${l.email}","${l.status}","${l.building_type}","${l.desired_material}",${l.estimated_min || 0},${l.estimated_max || 0}`
    ).join("\n");
    
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BS-Roofing-Leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // --- FİLTRELEME MANTIĞI ---
  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.phone.includes(searchQuery) ||
    lead.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- İSTATİSTİKLER (DASHBOARD STATS) ---
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'New' || l.status === 'Direct Inquiry' || l.status === 'Book Inquiry').length;
  const pipelineValue = leads
    .filter(l => l.status !== 'Lost') // Kaybedilen işleri ciroya katma
    .reduce((acc, curr) => acc + (curr.estimated_max || 0), 0);

  // Durumlara göre renk veren ufak fonksiyon
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Contacted': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Scheduled': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
      case 'Deal Won': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Lost': return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
      default: return 'text-[#b91c1c] bg-[#b91c1c]/10 border-[#b91c1c]/20'; // New, Direct vs.
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] p-6 md:p-12 font-jakarta text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-5xl font-black uppercase tracking-tighter leading-none italic">
              Project <span className="text-[#b91c1c]">Command</span>
            </h1>
            <p className="text-gray-500 mt-2 font-medium">B&S Roof System CRM & Field Intelligence</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={exportToCSV} className="p-4 bg-green-900/10 hover:bg-green-900/20 text-green-500 rounded-2xl border border-green-900/20 transition-all flex items-center gap-2 font-black text-[10px] uppercase tracking-widest">
              <Download size={20} /> Export CSV
            </button>
            <button onClick={fetchLeads} className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all group">
              <RefreshCw size={24} className={loading ? "animate-spin text-[#b91c1c]" : "group-hover:text-[#b91c1c]"} />
            </button>
            <button onClick={handleLogout} className="p-4 bg-red-900/10 hover:bg-red-900/20 rounded-2xl border border-red-900/20 text-red-500 transition-all flex items-center gap-2 font-black text-[10px] uppercase tracking-widest">
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* --- İSTATİSTİK KARTLARI --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] shadow-xl flex items-center gap-6">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white"><Users size={24} /></div>
            <div>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Total Leads</p>
              <p className="text-3xl font-black tracking-tighter">{totalLeads}</p>
            </div>
          </div>
          <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] shadow-xl flex items-center gap-6">
            <div className="w-14 h-14 bg-[#b91c1c]/10 rounded-2xl flex items-center justify-center text-[#b91c1c]"><Target size={24} /></div>
            <div>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Action Needed</p>
              <p className="text-3xl font-black tracking-tighter text-[#b91c1c]">{newLeads}</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] shadow-xl flex items-center gap-6">
            <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500"><BarChart3 size={24} /></div>
            <div>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Pipeline Value</p>
              <p className="text-3xl font-black tracking-tighter text-white">${pipelineValue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* --- ARAMA ÇUBUĞU --- */}
        <div className="mb-10 relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input 
            type="text" 
            placeholder="Search leads by name, email, or phone number..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl py-6 pl-16 pr-6 text-white text-sm focus:border-[#b91c1c] outline-none transition-all placeholder:text-gray-600 font-bold shadow-2xl"
          />
        </div>

        {/* --- LEAD KARTLARI --- */}
        {filteredLeads.length === 0 ? (
          <div className="text-center py-32 border-2 border-dashed border-white/5 rounded-[3rem]">
            <p className="text-gray-600 font-black uppercase tracking-[0.2em]">No leads found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {filteredLeads.map((lead) => (
              <div key={lead.id} className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[3.5rem] relative group hover:border-[#b91c1c]/30 transition-all shadow-2xl">
                
                {/* Status & Date */}
                <div className="flex justify-between items-start mb-10">
                  
                  {/* DİNAMİK STATÜ DROPDOWN'U */}
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(lead.status)} transition-colors`}>
                    <select 
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value)}
                      className="bg-transparent text-[11px] font-black uppercase tracking-widest outline-none cursor-pointer appearance-none"
                    >
                      <option value="New" className="bg-[#0a0a0a] text-white">New</option>
                      <option value="Direct Inquiry" className="bg-[#0a0a0a] text-white">Direct Inquiry</option>
                      <option value="Book Inquiry" className="bg-[#0a0a0a] text-white">Book Inquiry</option>
                      <option value="Contacted" className="bg-[#0a0a0a] text-yellow-500">Contacted</option>
                      <option value="Scheduled" className="bg-[#0a0a0a] text-purple-500">Scheduled</option>
                      <option value="Deal Won" className="bg-[#0a0a0a] text-green-500">Deal Won</option>
                      <option value="Lost" className="bg-[#0a0a0a] text-gray-500">Lost</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 text-gray-500 text-[11px] font-bold uppercase tracking-tight">
                    <Clock size={15} /> {new Date(lead.created_at).toLocaleDateString()}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Müşteri Bilgileri */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="text-[10px] font-black text-[#b91c1c] uppercase tracking-[0.4em] mb-6">Customer Identity</h3>
                      <div className="space-y-4 mb-8">
                        <span className="text-3xl font-black tracking-tighter block">{lead.name}</span>
                        <div className="flex items-center gap-3 text-gray-400">
                          <Phone size={18} className="text-[#b91c1c]/60" /> 
                          <span className="text-base font-bold">{lead.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-400">
                          <Mail size={18} className="text-[#b91c1c]/60" /> 
                          <span className="text-sm font-bold truncate">{lead.email}</span>
                        </div>
                      </div>
                      <h3 className="text-[10px] font-black text-[#b91c1c] uppercase tracking-[0.4em] mb-4">Customer Notes</h3>
                      <div className="bg-white/5 p-5 rounded-2xl border border-white/5 min-h-[100px]">
                        <div className="flex gap-3">
                          <MessageSquare size={18} className="text-[#b91c1c] shrink-0 mt-1" />
                          <p className="text-sm text-gray-300 font-medium leading-relaxed italic">
                            {lead.message || "No specific instructions provided."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Teknik Bilgiler */}
                  <div className="flex flex-col gap-8">
                    <h3 className="text-[10px] font-black text-[#b91c1c] uppercase tracking-[0.4em]">Roof Intelligence</h3>
                    <div className="grid grid-cols-2 gap-5">
                      <div className="bg-white/5 p-5 rounded-2xl border border-white/5 flex flex-col gap-2 shadow-inner">
                        <div className="flex items-center gap-2 text-gray-500"><Construction size={14} /> <span className="text-[9px] font-black uppercase tracking-widest">Type</span></div>
                        <span className="text-sm font-bold text-white italic">{lead.building_type}</span>
                      </div>
                      <div className="bg-white/5 p-5 rounded-2xl border border-white/5 flex flex-col gap-2 shadow-inner">
                        <div className="flex items-center gap-2 text-gray-500"><Ruler size={14} /> <span className="text-[9px] font-black uppercase tracking-widest">Pitch</span></div>
                        <span className="text-sm font-bold text-white italic">{lead.steepness}</span>
                      </div>
                    </div>

                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-2 text-gray-500 mb-4"><Layers size={14} /> <span className="text-[9px] font-black uppercase tracking-widest">Material Flow</span></div>
                      <div className="flex items-center justify-between text-[11px] font-black italic uppercase">
                        <span className="text-gray-500">{lead.current_material}</span>
                        <ArrowRight size={16} className="text-[#b91c1c]" />
                        <span className="text-white">{lead.desired_material}</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-7 rounded-[2rem] shadow-xl border border-white/10">
                      <div className="flex items-center gap-2 text-white/50 mb-2">
                        <DollarSign size={14} /> <span className="text-[10px] font-black uppercase tracking-[0.2em]">Est. Revenue</span>
                      </div>
                      <span className="text-3xl font-black text-white tracking-tighter">
                        ${lead.estimated_min?.toLocaleString()} - ${lead.estimated_max?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Alt Aksiyon Butonları (Arşivleme eklendi) */}
                <div className="mt-12 pt-8 border-t border-white/5 flex gap-5">
                  <a href={`tel:${lead.phone}`} className="flex-[3] bg-[#b91c1c] text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] text-center hover:bg-red-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-red-900/20 active:scale-95">
                    <Phone size={16} /> Instant Call
                  </a>
                  <button onClick={() => archiveLead(lead.id)} className="flex-[1] bg-[#1a1a1a] border border-white/10 text-gray-500 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-red-900/20 hover:text-red-500 hover:border-red-900/50 transition-all flex items-center justify-center gap-2 active:scale-95">
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}