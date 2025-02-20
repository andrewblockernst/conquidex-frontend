'use server'

import { triggerClubViewRefresh } from "@/utils/events/events";
import { createClient } from "@/utils/supabase/server";

export async function createUnit(personData: UnitInsert): Promise<boolean> {
    const supabase = await createClient();

    const { error } = await supabase.from('units').insert(personData);

    if (error) {
        throw new Error(error.message);
    }
    return true;
}