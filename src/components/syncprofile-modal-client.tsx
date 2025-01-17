"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from "@/types/database.types";

interface Props {
  member: Member;
}

export default function SyncProfileModalClient({member}: Props) {
  const supabase = createClientComponentClient<Database>();

  const handleSync = async () => {
  try {
    const { data: user, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error("No hay sesión activa o no se pudo obtener el usuario:", userError?.message);
      return;
    }

    // Llamar al procedimiento almacenado para sincronización
    const { data, error } = await supabase.rpc('sync_person_to_user', {
      user_id: user.user.id,
      user_email: user.user.email || ''
    });

    if (error) {
      console.error("Error en la sincronización:", error.message);
      return;
    }
    
    console.log("Perfil sincronizado exitosamente");
    window.location.href = "/"; 
  } catch (error) {
    console.error("Error en el proceso de sincronización:", error);
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold mb-4">🍌 ATENCION 🐒</h2>
        <p className="mb-3">
          Parece que te registraron antes en el club <b>{member.club_name}</b> como <b>{member.name + " " + member.surname}</b>.
        </p>
        <p className="mb-6">
          ¿Sos vos mape?</p>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => {
              window.location.href = "/club/select";
            }}
          >
            Cancelar
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleSync}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}