import { createClient } from '@/utils/supabase/server'
import ClubTableClient from './clubs-table-client';


export default async function ClubTableServer() {
// Conexión a Supabase para obtener los clubes
  const supabase = await createClient();

  // Obtiene lista de clubes de la base de datos
  const { data, error } = await supabase.from('clubs').select();
  if (error) {
    console.error('Error al obtener los clubes:', error.message);
    return <p>Error al cargar los clubes.</p>;
  }
  const clubs = data || [];
  

  return <ClubTableClient clubs={clubs} />;
}
