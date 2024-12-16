import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'; // Conexión a Supabase
import { cookies } from 'next/headers'; // Acceso a cookies
import { AuthButtonServer } from '@/app/components/auth-button-server';
import { redirect } from 'next/navigation';
import ClubTableServer from '@/app/components/clubs-table-server'; // Importa el componente de tabla

export default async function Home() {
  // Conexión a Supabase con cookies
  const supabase = createServerComponentClient({ cookies }); 
  const { data: session } = await supabase.auth.getSession();

  if (session === null) {
    redirect('/login'); // Redirige a login si no hay sesión
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-yellow-500 text-4xl mb-6">conquidex 🏕️</h1>
      
      {/* Tabla de Clubs */}
      <section className="w-full max-w-3xl">
        <ClubTableServer />
      </section>

      {/* Botón de Autenticación */}
      <div className="mt-6">
        <AuthButtonServer />
      </div>
    </main>
  );
}
