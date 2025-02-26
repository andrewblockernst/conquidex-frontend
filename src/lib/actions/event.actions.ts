'use server'

import { createClient } from "@/utils/supabase/server";

export async function createEvent(event: EventInsert): Promise<ClubEvent> {
    const supabase = await createClient();
    const {data, error} = await supabase.from('events').insert(event).select().single();

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

export async function updateEvent(event: EventUpdate): Promise<boolean> {
    const supabase = await createClient();
    const { error } = await supabase.from('events').update(event);

    if (error) {
        throw new Error(error.message);
    }
    return true;
}

export async function deleteEvent(id: number): Promise<boolean> {
    const supabase = await createClient();
    const { error } = await supabase.from('events').delete().eq('id', id);

    if (error) {
        throw new Error(error.message);
    }
    return true;
}

