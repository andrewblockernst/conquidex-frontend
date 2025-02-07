"use client";

import { GoogleIcon } from "@/components/icons";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export function AuthButton() {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    getSession();
  }, [supabase]);

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  // Verificación adicional para evitar estado intermedio
  if (typeof window === "undefined") return null;

  return (
    <header>
      {loading ? (
        <div className="flex justify-center items-center w-full h-10">
          <span className="loader"></span>
        </div>
      ) : user === null ? (
        <button
          onClick={handleSignIn}
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
          onClick={handleSignOut}
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
