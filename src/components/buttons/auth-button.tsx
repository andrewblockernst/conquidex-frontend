'use client';

import { useUser } from '@/contexts/UserContext';
import { GoogleIcon } from '@/components/icons';

export function AuthButton() {
  const { user, loading, error, signIn, signOut } = useUser();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <header>
      {user === null ? (
        <button
          onClick={signIn}
          type="button"
          className="w-60 text-black bg-[#ececec] hover:bg-[#e6e6e6] focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-bold rounded-full text-md py-2 inline-flex items-center justify-start"
        >
          <GoogleIcon className="w-8 h-8 ml-1 mr-3" />
          Continuar con Google
        </button>
      ) : (
        <button
          onClick={signOut}
          type="button"
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Cerrar Sesión
        </button>
      )}
    </header>
  );
}
