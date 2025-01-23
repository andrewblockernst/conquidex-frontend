'use server'

import { supabaseAdmin } from "@/utils/supabase/service-role";
import { createClient } from "@/utils/supabase/server";

export async function SyncPersonToUser(): Promise<{ success: boolean, error?: string }> {
    const supabase = await createClient();
    try {
        const { data: user, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
            console.error("No hay sesión activa o no se pudo obtener el usuario:", userError?.message);
            return { success: false, error: "No se pudo obtener la sesión del usuario" };
        }

        // Llamar al procedimiento almacenado para sincronización
        const { data, error } = await supabaseAdmin.rpc('sync_person_to_user', {
            user_id: user.user.id,
            user_email: user.user.email || ''
        });

        if (error) {
            console.error("Error en la sincronización:", error.message);
            return { success: false, error: error.message };
        }

        console.log("DATA:", data);
        return { success: true };
        
    } catch (error) {
        console.error("Error en el proceso de sincronización:", error);
        return { success: false, error: "Error inesperado durante la sincronización" };
    }
}

export const handleModal = async (openedByDefault: boolean): Promise<Member | null> => {
        'use server';
        const supabase = await createClient();
    
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) {
          console.error("Error obteniendo usuario o usuario inexistente:", error?.message);
          return null; // No muestra nada si no hay usuario
        }
      
        const { data: member, error: memberError } = await supabaseAdmin.from("members").select().eq("email", user.email!).single();
        if (memberError) {
          console.error("Error al obtener miembro:", memberError.message);
          return null; // No muestra nada si hay error al obtener el miembro
        }
        if(!member || member.auth_user_uuid === user.id) return null; // Si el usuario no tiene perfil miembro, no se muestra el modal
      
        // abrir sin importar si ya tiene club
        if(openedByDefault) return member;
      
        // verificar si el invitado ya tiene club
        const {data: guest, error: guestError} = await supabase.from("guests").select().eq("auth_user_uuid", user.id).single();
        if(guestError) {
          console.error("Error al obtener invitado:", guestError.message);
          return null; // No muestra nada si hay error al obtener el invitado
        }
        if(guest.club_id!==0) return null; // Si el invitado ya tiene club, no se muestra el modal
        return member;
}