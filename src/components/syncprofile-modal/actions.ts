'use server'

import { supabaseAdmin } from "@/utils/supabase/service-role";
import { createClient } from "@/utils/supabase/server";

export async function SyncPersonToUser() {
    const supabase = await createClient();
    try {
      const { data: user, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.error("No hay sesión activa o no se pudo obtener el usuario:", userError?.message);
        return;
      }
      console.log(user);
  
      // Llamar al procedimiento almacenado para sincronización
      const { data, error } = await supabaseAdmin.rpc('sync_person_to_user', {
        user_id: user.user.id,
        user_email: user.user.email || ''
      });
      if (error) {
        console.error("Error en la sincronización:", error.message);
        return;
      }
      console.log(data);
  

      
      console.log("Perfil sincronizado exitosamente");
      window.location.href = "/"; 
    } catch (error) {
      console.error("Error en el proceso de sincronización:", error);
    }
  };