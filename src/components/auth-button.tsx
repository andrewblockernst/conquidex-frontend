// components/auth-button.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { GoogleIcon } from "./icons";
import { useSyncModal } from "@/contexts/SyncModalContext"; // Importamos el contexto

export function AuthButton() {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
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

  return (
    <header>
      {user === null ? (
        <button
          onClick={handleSignIn}
          type="button"
          className="w-60 text-black bg-[#ececec] hover:bg-[#e6e6e6] focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-bold rounded-full text-md py-2 inline-flex items-center justify-start"
        >
          <GoogleIcon className="w-8 h-8 ml-1 mr-3" />
          Continuar con Google
        </button>
      ) : (
        <button
          onClick={handleSignOut}
          type="button"
          className="text-white bg-red-500 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Cerrar sesión
        </button>
      )}
    </header>
  );
}
