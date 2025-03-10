import { Database } from '@/types/database.types';
import { createClient } from '@supabase/supabase-js';

function createAdmin (){
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export const supabaseAdmin = createAdmin();
