import { AuthButtonServer } from "@/app/components/auth-button-server";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex justify-center">
        <img src="./logo.png" alt="conquidex-logo" className="w-1/2" />
      </div>
      <h1 className="text-xl font-bold mb-4">Iniciar Sesión</h1>
      <AuthButtonServer />
      <p className="mt-4 text-sm">
        ¿No tienes una cuenta?{" "}
        <a href="/register" className=" text-sm text-yellow-400 underline">
          Registrate
        </a>
      </p>
    </div>
  );
}
