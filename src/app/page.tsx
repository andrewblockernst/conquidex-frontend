// app/page.tsx
import SyncProfileModalServer from "@/components/syncprofile-modal/syncprofile-modal-server";
import { redirect } from "next/navigation";
import { AuthButton } from "@/components/auth-button";
import { createClient } from '@/utils/supabase/server'
import { Header } from "@/components/header/header";


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
    <>
      <Header />
      <div className="flex flex-col items-center min-h-screen p-4 bg-cover bg-center">
        <div className="flex justify-center mb-4">
          <img src="./logo.png" alt="conquidex-logo" className="w-32 h-32" />
        </div>
        <main className="flex flex-col items-center w-full max-w-3xl">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Bienvenido 2K25 PAPAAAAAA
          </h1>

          {/* Modal desde el servidor */}
          <SyncProfileModalServer openedByDefault={true} />

          {/* Botón de autenticación */}
          <div className="mt-4">
            <AuthButton />
          </div>
        </main>
      </div>
    </>
  );
}
