import { AuthButtonServer } from "@/app/components/auth-button-server";

export default function Login() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="flex justify-center mb-4 mt-8">
                <img src="./logo.png" alt="conquidex-logo" className="w-1/2" />
            </div>
            <section className="text-center bg-white p-6 rounded shadow-md">
                <h1 className="text-xl font-bold mb-4">Iniciar Sesión</h1>
                <AuthButtonServer />
            </section>
        </div>
    );
}
