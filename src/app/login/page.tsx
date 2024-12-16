import { AuthButtonServer } from "@/app/components/auth-button-server"

export default function Login() {
    return (
        <section className="grid place-content-center min-h-screen">
            <h1 className="text-4xl font-bold text-yellow-500 mb-8">conquidex 🏕️</h1>
            <div className="grid place-content-center">
                <h1 className="grid place-content-center text-xl font-bold">Iniciar Sesion</h1>
                <AuthButtonServer />
            </div>
        </section>
    )
}