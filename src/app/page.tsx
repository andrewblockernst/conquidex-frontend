import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"; // Conexión a Supabase
import { cookies } from "next/headers"; // Acceso a cookies
import { AuthButtonServer } from "@/app/components/auth-button-server";
import { redirect } from "next/navigation";
import ClubTableServer from "@/app/components/clubs-table-server"; // Importa el componente de tabla

export default async function Home() {
  //SUPABASE CON COOKIES
  const supabase = createServerComponentClient({ cookies });
  const { data: session } = await supabase.auth.getSession();

  if (session === null) {
    redirect("/login"); //EN CASO DE NO HABER SESION, REDIRIGE A LOGIN
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-cover bg-center">
      <div className="flex justify-center mb-4">
      <img src="./logo.png" alt="conquidex-logo" className="w-32 h-32"/>
      </div>
      <main className="flex flex-col items-center w-full max-w-3xl">
      {/*CLUBS TABLE*/}
      <section className="w-full">
        <ClubTableServer />
      </section>

      {/*AUTH BUTTON*/}
      <div className="mt-4">
        <AuthButtonServer />
      </div>
      </main>
    </div>
  );
}
