import { AuthButtonServer } from "@/app/components/auth-button-server";

export default function Register() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex justify-center">
        <img src="./logo.png" alt="conquidex-logo" className="w-1/2" />
      </div>
      <h1 className="text-xl font-bold mb-4">Registrarse</h1>
      <AuthButtonServer />
      <p className="text-sm mt-4">
        ¿Ya tenes una cuenta?{" "}
        <a href="/login" className="text-yellow-400 text-sm underline">
          Inicia sesión
        </a>
      </p>
    </div>
  );
}
