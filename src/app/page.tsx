// app/page.tsx
import SyncProfileModalServer from "@/components/syncprofile-modal-server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthButtonServer } from "@/components/auth-button-server";
import { createClient } from '@/utils/supabase/server'


export default async function Home() {
  const supabase = await createClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("Error getting session:", error.message);
  }

  if (session === null) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-cover bg-center">
      <div className="flex justify-center mb-4">
        <img src="./logo.png" alt="conquidex-logo" className="w-32 h-32" />
      </div>
      <main className="flex flex-col items-center w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Bienvenido 2K25 PAPAAAAAA
        </h1>

        {/* Modal desde el servidor */}
        <SyncProfileModalServer />

        {/* Botón de autenticación */}
        <div className="mt-4">
          <AuthButtonServer />
        </div>
      </main>
    </div>
  );
}
