"use client";

import { SyncPersonToUser } from "./actions";

interface Props {
  member: Member;
}

export default function SyncProfileModalClient({member}: Props) {
  const handleSync = async () => {
    await SyncPersonToUser();
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