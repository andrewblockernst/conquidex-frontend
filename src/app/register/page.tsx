import { AuthButtonServer } from "@/app/components/auth-button-server"

export default function Register() {
    return (
        <section className="grid place-content-center min-h-screen">
            <h1 className="text-4xl font-bold text-yellow-500 mb-8">conquidex 🏕️</h1>
            <div className="grid place-content-center">
                <h1 className="grid place-content-center text-xl font-bold mb-2">Bienvenido tripulantardo</h1>

                <AuthButtonServer />
            </div>
        </section>
    )
}