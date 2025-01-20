'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateUserClub(clubId: number) {
  const supabase = await createClient()
  
  const {data: { user }, error: userError} = await supabase.auth.getUser()
  if (userError) {
    throw new Error('Error al obtener el usuario: ' + userError.message)
  }
  if (!user) {
    throw new Error('El usuario no existe')
  }

  const { error } = await supabase
    .from('persons')
    .update({ club_id: clubId })
    .eq('auth_user_uuid', user.id)

  if (error) {
    throw new Error('Error al actualizar el club: ' + error.message)
  }
  // const { data, error } = await supabase.rpc('get_current_user');
  // if(data){
  //   console.log(data)
  // }
  // else{
  //   console.log("no funcionó la rpc")
  // }
  // if (error) {
  //   console.error('Error al obtener el usuario actual:', error.message);
  //   throw new Error(`Error al obtener el usuario actual: ${error.message}`);
  // }

  revalidatePath('/') // Ajusta esto a la ruta que necesites revalidar
}