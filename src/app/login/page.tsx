import { AuthButton } from "@/components/buttons/auth-button";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex justify-center">
        <img src="./logo.png" alt="conquidex-logo" className="w-1/2 mb-20" />
      </div>
      <div className="">
        <form className="p-5 bg-yellow-100 flex flex-col items-start justify-center gap-5 rounded-lg border-2 border-yellow-400 shadow-[4px_4px_0_0_#323232]">
          <p className="font-bold text-lg text-slate-800 flex flex-col">
            Bienvenido,
            <span className="font-semibold text-sm text-gray-600">
              Iniciá sesión para continuar
            </span>
          </p>
          <AuthButton />
        </form>
      </div>
      <p className="mt-4 text-sm pt-5">
        ¿Problemas para iniciar sesión?{" "}
        <a href="/help" className=" text-sm text-yellow-500 underline">
          Contáctanos
        </a>
      </p>
    </div>
  );
}
