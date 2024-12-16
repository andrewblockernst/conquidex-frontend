import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import ClubTableClient from './clubs-table-client';

export default async function ClubTableServer() {
  // Conexión a Supabase para obtener los clubes
  const supabase = createServerComponentClient({ cookies });
  const { data: clubs, error } = await supabase.from('clubs').select();

  if (error) {
    console.error('Error al obtener los clubes:', error.message);
    return <p>Error al cargar los clubes.</p>;
  }

  return <ClubTableClient clubs={clubs || []} />;
}
