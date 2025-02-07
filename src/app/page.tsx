import { AuthButton } from "@/components/buttons/auth-button";
import { Header } from "@/components/header/header";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/home");
  }

  return (
    <>
      <Header />
      <div className="flex flex-col items-center min-h-screen p-4 bg-cover bg-center">
        <main className="flex flex-col items-center w-full max-w-3xl">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Bienvenido/a a Conquidex
          </h1>
          <h3 className="text-xl mb-4 text-center">
            La plataforma de gestión para clubes y organizaciones
          </h3>
          <p className="text-center mb-4">
            Conquidex es una herramienta integral diseñada para facilitar la administración y gestión de clubes y organizaciones. Con nuestra plataforma, podrás gestionar miembros, eventos, asistencia y mucho más de manera eficiente y centralizada.
          </p>
          <p className="text-center mb-4">
            Nuestra misión es simplificar la gestión de tu club, permitiéndote enfocarte en lo que realmente importa: el crecimiento y bienestar de tus miembros. Únete a Conquidex y descubre cómo podemos ayudarte a llevar tu organización al siguiente nivel.
          </p>
          <AuthButton />
        </main>
      </div>
    </>
  );
}
