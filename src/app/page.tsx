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
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-cover bg-center"> 
      <img src="./logo.png" alt="conquidex-logo"/>

      {/*CLUBS TABLE*/}
      <section className="w-full max-w-3xl"> 
      <ClubTableServer />
      </section>

      {/*AUTH BUTTON*/}
      <div className="mt-6">
      <AuthButtonServer />
      </div>
    </main>
  );
}
