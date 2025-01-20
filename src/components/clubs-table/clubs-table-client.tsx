"use client";

import { useState, useEffect } from "react";
import { updateUserClub } from "./actions";
import { redirect } from "next/navigation";

interface Props {
  clubs: Club[]
}

export default function ClubTableClient({ clubs }: Props) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredClubs, setFilteredClubs] = useState<Club[]>([])

  useEffect(() => {
    setFilteredClubs(
      clubs
        .filter((club) => club.name !== "SIN CLUB") // No muestra "SIN CLUB"
        .sort((a, b) => a.id - b.id) // Ordenados por ID de menor a mayor
    );
  }, [clubs]);

  const [selectedClub, setSelectedClub] = useState<Club | null>(null);

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

  const handleSelection = async () =>{
    if (selectedClub) {
      try {
        await updateUserClub(selectedClub.id);
        alert(`Club seleccionado: ${selectedClub?.name}`)
       }
      catch (error) {
        if (error instanceof Error) {
          alert(`Error: ${error.message}`);
        } else {
          alert('An unknown error occurred');
        }
      }
    }
  }

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
              selectedClub?.id === club.id
                ? "bg-blue-100"
                : "hover:bg-gray-100"
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
        type="button"
        onClick={handleSelection}
        className="text-gray-900 bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-100 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2"
      >
        Seleccionar club
      </button>
      </div>
      )}
    </div>
  );
}
