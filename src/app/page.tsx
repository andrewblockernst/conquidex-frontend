import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"; // Conexión a Supabase
import { cookies } from "next/headers"; // Acceso a cookies
import { AuthButtonServer } from "@/app/components/auth-button-server";
import { redirect } from "next/navigation";

export default async function Home() {
  //SUPABASE CON COOKIES
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: {session}, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Error getting session:', error.message);
  }

  if (session === null) {
    redirect("/login"); //EN CASO DE NO HABER SESION, REDIRIGE A LOGIN
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-cover bg-center">
      <div className="flex justify-center mb-4">
        <img src="./logo.png" alt="conquidex-logo" className="w-32 h-32" />
      </div>
      <main className="flex flex-col items-center w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-4 text-center">Bienvenido 2K25 PAPAAAAAA</h1>
        {/*AUTH BUTTON*/}
        <div className="mt-4">
          <AuthButtonServer />
        </div>
      </main>
    </div>
  );
}
