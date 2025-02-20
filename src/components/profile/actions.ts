'use server'

import { createClient } from "@/utils/supabase/server";

export async function getMemberData(memberId: number) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('member_data')
      .select('*')
      .eq('id', memberId)
      .single()
  
    if (error) throw error
    
    return data as MemberData
  }