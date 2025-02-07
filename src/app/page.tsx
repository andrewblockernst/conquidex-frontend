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
        {/* DEJAR ESTO */}

        {/* <div className="flex justify-center mb-4">
                    <img src="./logo.png" alt="conquidex-logo" className="w-32 h-32" />
                </div> */}
        <main className="flex flex-col items-center w-full max-w-3xl">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Bienvenido/a a conquidex
          </h1>
          <h3>Esto es una landing page</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non,
            maiores. Tenetur maiores nisi voluptas ex voluptates atque eaque quo
            facilis amet rem veritatis quia soluta, accusantium deleniti ipsa
            ipsam similique.
          </p>
        </main>
      </div>
    </>
  );
}
