import { createClient } from '@/utils/supabase/server'
import ClubTableClient from './clubs-table-client';


export default async function ClubTableServer() {
  // Conexión a Supabase para obtener los clubes
  const supabase = await createClient();
  const { data, error } = await supabase.from('clubs').select().returns<Club[]>();
  const clubs = data || [];

  const handleSelection = async (club: Club) => {
    'use server';
    console.log(`Club seleccionado: ${club.name}`);
  }

  if (error) {
    console.error('Error al obtener los clubes:', error.message);
    return <p>Error al cargar los clubes.</p>;
  }

  return <ClubTableClient clubs={clubs || []} parentCallback={handleSelection} />;
}
