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