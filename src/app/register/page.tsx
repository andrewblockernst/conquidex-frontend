import { AuthButtonServer } from "@/app/components/auth-button-server"

export default function Register() {
    return (
        <section className="grid place-content-center min-h-screen">
            <h1 className="text-4xl font-bold text-yellow-500 mb-8">conquidex 🏕️</h1>
            <div className="grid place-content-center">
                <h1 className="grid place-content-center text-xl font-bold mb-2">Bienvenido</h1>
                <input type="email" placeholder="Email" className="mb-4 p-2 border border-gray-300 rounded" />
                <input type="password" placeholder="Contraseña" className="mb-4 p-2 border border-gray-300 rounded" />
                <button className="bg-yellow-500 text-white p-2 rounded-full mb-4">Registrarse</button>
                <AuthButtonServer />
            </div>
        </section>
    )
}