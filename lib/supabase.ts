import { createClient } from '@supabase/supabase-js';

// Supabase panelinden aldığın URL ve Anon Key'i buraya yapıştır kanka
// Normalde bunları .env dosyasında tutmalısın ama şimdilik hızlıca buraya yazabilirsin
const supabaseUrl = 'https://kgsjnqegcabdmygfwfxq.supabase.co';
const supabaseAnonKey = 'sb_publishable_WLP-3AVloxWcMILXs0LPDw_nsCTyHN_';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
const submitDirectLead = async (formData: any) => {
  const { error } = await supabase
    .from('leads')
    .insert([
      { 
        name: formData.name, 
        email: formData.email, 
        phone: formData.phone,
        message: formData.message || '', // Mesaj kısmını da alıyoruz
        status: 'Direct Inquiry', // Admin panelinde böyle görünecek
        building_type: 'Direct Inquiry',
        steepness: 'N/A',
        current_material: 'N/A',
        desired_material: 'N/A'
      }
    ]);

  return { error };
};