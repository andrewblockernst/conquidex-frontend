'use server'

import { createClient } from "@/utils/supabase/server";

export async function createUnit(unitData: UnitInsert): Promise<boolean> {
    const supabase = await createClient();

    const { error } = await supabase.from('units').insert(unitData);

    if (error) {
        throw new Error(error.message);
    }
    return true;
}

export async function fetchUnits(clubId: number): Promise<Unit[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('units')
      .select('*')
      .eq('club_id', clubId)
      .order('name');
  
    if (error) {
      throw new Error(`Error fetching units: ${error.message}`);
    }
  
    return data;
  }