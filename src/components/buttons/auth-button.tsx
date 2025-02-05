"use client";

import { useUser } from "@/contexts/UserContext";
import { GoogleIcon } from "@/components/icons";

export function AuthButton() {
  const { user, loading, error, signIn, signOut } = useUser();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  // Verificación adicional para evitar estado intermedio
  if (typeof window === "undefined") return null;

  return (
    <header>
      {user === null ? (
        <button
          onClick={signIn}
          type="button"
          className="flex justify-center items-center gap-2 p-2 w-64 h-10 rounded-lg border-2 border-yellow-800 bg-white shadow-[4px_4px_0_0_#323232] text-gray-800 font-semibold text-base cursor-pointer transition-all duration-250 relative overflow-hidden z-10 group hover:text-gray-100"
        >
          {/*BARRIDO DEL FONDO*/}
          <span className="absolute inset-0 w-0 bg-yellow-600 transition-all duration-500 group-hover:w-full z-0"></span>
          <GoogleIcon className="relative z-10" />
          <span className="relative z-10">Continuar con Google</span>
        </button>
      ) : (
        <button
          onClick={signOut}
          type="button"
          className="flex justify-center items-center gap-2 p-2 w-full h-10 rounded-lg border-2 border-red-800 bg-red-500 shadow-[4px_4px_0_0_#323232] text-white font-semibold text-base cursor-pointer transition-all duration-250 relative overflow-hidden z-10 group hover:text-gray-100"
        >
          {/*BARRIDO DEL FONDO*/}
          <span className="absolute inset-0 w-0 bg-red-600 transition-all duration-500 group-hover:w-full z-0"></span>
          <span className="relative z-10">Cerrar Sesión</span>
        </button>
      )}
    </header>
  );
}
