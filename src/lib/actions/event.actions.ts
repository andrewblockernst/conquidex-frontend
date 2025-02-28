'use server'

import { createClient } from "@/utils/supabase/server";
import { exit } from "process";

export async function createEvent(event: EventInsert, activeProfile: Member | Guest): Promise<ClubEvent> {
    const supabase = await createClient();
    
    if (activeProfile.club_id !== event.club_id) {
        throw new Error('No tienes acceso a este club');
    } 
    if (!activeProfile.role_id || activeProfile.role_id < 3) {
        throw new Error('No tienes permiso (jerarquía 300+) para crear eventos en este club');
    }
    
    // Si llegamos aquí, el usuario tiene permisos, intentamos crear el evento
    const { data, error } = await supabase.from('events').insert(event).select().single();

    if (error) {
        throw new Error(error.message);
    }
    
    return data;
}

export async function updateEvent(event: EventUpdate, activeProfile: Member | Guest): Promise<boolean> {
    const supabase = await createClient();
    
    // Verificar que el evento existe
    const { data: existingEvent, error: eventError } = await supabase
        .from('events')
        .select('club_id')
        .eq('id', event.id!)
        .single();
    
    if (eventError || !existingEvent) {
        throw new Error('Evento no encontrado o sin acceso');
    }
    // Verificar permisos para el club del usuario
    if (activeProfile.club_id !== existingEvent.club_id) {
        throw new Error('No tienes acceso a este club');
    }
    
    if (!activeProfile.role_id || activeProfile.role_id < 3) {
        throw new Error('No tienes permiso (jerarquía 300+) para modificar este evento');
    }
    
    // Si llegamos aquí, el usuario tiene todos los permisos necesarios
    const { error } = await supabase
        .from('events')
        .update(event)
        .eq('id', event.id!);

    if (error) {
        throw new Error(error.message);
    }
    
    return true;
}

export async function deleteEvent(id: number, activeProfile: Member | Guest): Promise<boolean> {
    const supabase = await createClient();
    
    // Verificar que el evento existe y obtener su club_id
    const { data: existingEvent, error: eventError } = await supabase
        .from('events')
        .select('club_id')
        .eq('id', id)
        .single();
    
    if (eventError || !existingEvent) {
        throw new Error('Evento no encontrado o sin acceso');
    }
    
    if (activeProfile.club_id !== existingEvent.club_id) {
        throw new Error('No tienes acceso a este club');
    }
    
    if (!activeProfile.role_id || activeProfile.role_id < 3) {
        throw new Error('No tienes permiso (jerarquía 300+) para eliminar este evento');
    }
    
    // Si llegamos aquí, el usuario tiene los permisos necesarios
    const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }
    
    return true;
}