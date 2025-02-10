'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateUserClub(clubId: number): Promise<[string, boolean]> {
  const supabase = await createClient()
  
  try {
      const {data: { user }, error: userError} = await supabase.auth.getUser()
    if (userError) throw new Error('Error al obtener el usuario: ' + userError.message);
    if (!user) throw new Error('El usuario no existe');

    const { error } = await supabase
      .from('persons')
      .update({ club_id: clubId })
      .eq('auth_user_uuid', user.id)

    if (error) throw new Error(error.message)
  } catch (error) {
    return [error as string, false]
  }

  return ['Club actualizado correctamente.', true]
}