'use server';

import { supabaseAdmin } from '@/utils/supabase/service-role';
import { createClient } from '@/utils/supabase/server';
import { User } from '@supabase/supabase-js';

export const getProfile = async (user: User) => {
    const supabase = await createClient();
    let activeProfile = null;
    let member = null;

    if (!user) return { activeProfile: activeProfile, member: member };
    try {
        // Buscar en miembros con service role
        const { data: fetchedMember, error: memberError } = await supabaseAdmin
          .from('members')
          .select('*')
          .eq('email', user.email!)
          .single();
    
        if (!memberError && fetchedMember) {
            member = fetchedMember;
            if (fetchedMember.auth_user_uuid === user.id){
                activeProfile = member;
                return { activeProfile: activeProfile, member: member };
            }
        }
    
        // Buscar en invitados
        const { data: guest, error: guestError } = await supabase
          .from('guests')
          .select('*')
          .eq('auth_user_uuid', user.id)
          .single();
    
        if (!guestError && guest) {
            activeProfile = guest;
        }
    
        return { activeProfile: activeProfile, member: member };
    
      } catch (error) {
        console.error('Error en getSecureProfile:', error);
        throw new Error('Error al obtener el perfil');
      }
    };