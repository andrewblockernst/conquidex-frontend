"use client";

import { useState, useEffect } from "react";
import { updateUserClub } from "./actions";
import { redirect } from "next/navigation";
import ConfirmationModal from "@/components/modals/confirmation-modal";
import ErrorModal from "@/components/modals/error-modal";
import SuccessModal from "@/components/modals/success-modal";
import { useUser } from "@/contexts/UserContext";

interface Props {
  clubs: Club[];
}

export default function ClubTableClient({ clubs }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClubs, setFilteredClubs] = useState<Club[]>([]);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [confirmationModal, setconfirmationModal] = useState(false);
  const [errorModal, setErrorModal] = useState<React.ReactNode>(null);
  const [successModal, setSuccessModal] = useState<React.ReactNode>(null);
  const { refreshProfile } = useUser();

  useEffect(() => {
    setFilteredClubs(
      clubs
        .filter((club) => club.name !== "SIN CLUB") // No muestra "SIN CLUB"
        .sort((a, b) => a.id - b.id) // Ordenados por ID de menor a mayor
    );
  }, [clubs]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = clubs
      .filter(
        (club) =>
          club.name.toLowerCase().includes(term) && club.name !== "SIN CLUB"
      )
      .sort((a, b) => a.id - b.id);
    setFilteredClubs(filtered);
    setSelectedClub(null);
  };

  const handleSelection = async () => {
    if (selectedClub) {
      const [message, success] = await updateUserClub(selectedClub.id);
      if (success) {
        await refreshProfile();
        setSuccessModal(`${message}`);
      } else {
        setErrorModal(`${message}`);
      }
    }
  };

  return (
    <div className=" lg:w-2/3 flex flex-col items-center space-y-4 p-4">
      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Escriba el club"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />

      {/* Lista de clubes */}
      <div className="w-full space-y-2 w-full flex flex-col items-center">
        {filteredClubs.map((club) => (
          <div
            key={club.id}
            onClick={() => setSelectedClub(club)}
            className={`p-4 border rounded-lg shadow-md transition cursor-pointer w-full ${
              selectedClub?.id === club.id ? "bg-blue-100" : "hover:bg-gray-100"
            } flex justify-between items-center`}
          >
            <p className="font-medium text-gray-700">
              {club.name} <span className="text-gray-500">({club.id})</span>
            </p>
            <p className="text-sm text-gray-500 italic">{club.province}</p>
          </div>
        ))}

        {filteredClubs.length === 0 && (
          <p className="text-gray-500 text-center">No existe ese club</p>
        )}
      </div>

      {/* Botón de acción */}
      {selectedClub && (
        <div className="flex justify-center">
          <button
            onClick={()=>setconfirmationModal(true)}
            type="button"
            className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
          >
            Seleccionar Club
          </button>
        </div>
      )}
      {/* Modal de confirmación */}
      <ConfirmationModal
        title="Confirmar selección"
        confirmText="Sí"
        cancelText="No"
        isOpen={confirmationModal}
        onClose={() => setconfirmationModal(false)}
        onConfirm={() => {
          handleSelection();
          setconfirmationModal(false);
        }}
      >
        <p>
          ¿Seguro que quieres seleccionar el club{" "}
          <strong>{selectedClub?.name}</strong>?
        </p>
        <p>
          Esta acción no se puede deshacer y tendrás que esperar{" "}
          <strong>3 meses</strong> para volver a cambiar de club.
        </p>
      </ConfirmationModal>

      {/* Modal de error */}
      <ErrorModal onClose={() => setErrorModal(null)}>{errorModal}</ErrorModal>
      <SuccessModal
        onClose={() => {
          setSuccessModal(null);
          redirect("/");
        }}
      >
        {successModal}
      </SuccessModal>
    </div>
  );
}
