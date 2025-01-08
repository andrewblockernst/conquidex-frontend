import { redirect } from "next/navigation";

export default function SyncProfilePage() {
  // Aquí podrías mostrar un mensaje de que el perfil necesita sincronización
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Tu perfil necesita ser sincronizado</h2>
        <p>Para continuar, debes sincronizar tu perfil.</p>
        <button
          onClick={() => {
            redirect("/login/link-profile"); // Redirige a la página de sincronización de perfil
          }}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sincronizar ahora
        </button>
      </div>
    </div>
  );
}
