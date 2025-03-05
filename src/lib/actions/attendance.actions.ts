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