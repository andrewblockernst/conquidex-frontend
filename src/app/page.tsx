import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'; // CONEXION A SUPABASE
import { cookies } from 'next/headers'; // NOS PERMITE ACCEDER A LAS PETICIONES Y SUS COOKIES (SABIENDO SI ESTAN CONECTADOS, ETC)
import { AuthButton } from './components/auth-button';

export default async function Home() {
  // PASAMOS LAS COOKIES CORRECTAMENTE
  const supabase = createServerComponentClient({ cookies }); // CREAR UNA INSTANCIA DE SUPABASE CON LAS COOKIES DE LA PETICIÓN

  // LLAMADA A LA BASE DE DATOS
  const { data: persons, error } = await supabase.from('persons').select();

  // MANEJO DE ERRORES
  if (error) {
    console.error('Error fetching persons:', error.message);
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-red-500">Error fetching data</h1>
        <p>{error.message}</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-yellow-500">conquidex 🏕️</h1>
      <ul className="text-white">
        {persons?.length > 0 ? (
          persons.map((person, index) => (
            <li key={index}>{JSON.stringify(person, null, 2)}</li>
          ))
        ) : (
          <li>No data available</li>
        )}
      </ul>
      <AuthButton />
    </main>
  );
}
