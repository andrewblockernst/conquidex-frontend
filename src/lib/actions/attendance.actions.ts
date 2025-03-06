'use server'

import { createClient } from "@/utils/supabase/server";

export async function getAttendanceData(eventId: number): Promise<Attendance[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
    .from('attendance')
    .select('*')
    .eq('event_id', eventId);

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

export async function saveAttendanceData(data: Attendance[]): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase
    .from('attendance')
    .upsert(data);

    if (error) {
        throw new Error(error.message);
    }
}