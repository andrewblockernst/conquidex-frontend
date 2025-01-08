"use client";

import { useEffect } from "react";

export default function SyncProfileModalClient({
  showModal,
}: {
  showModal: boolean;
}) {
  if (!showModal) return null;

  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold mb-4">🍌 ATENCION 🐒</h2>
        <p className="mb-3">Parece que te registraron antes en el club</p>
        <p className="mb-6">
          ¿Sos vos mape?</p>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => {
              console.log("Modal cerrado");
              window.location.href = "/club/select";
            }}
          >
            Cancelar
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => console.log("Perfil sincronizado")}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
