'use client';

import { useState } from 'react';

interface Club {
  id: number;
  name: string;
}

export default function ClubTableClient({ clubs }: { clubs: Club[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClubs, setFilteredClubs] = useState<Club[]>(
    clubs.filter((club) => club.name !== 'SIN CLUB')
  );
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);

  // Filtrar clubes según el texto
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = clubs.filter(
      (club) =>
        club.name.toLowerCase().includes(term) && club.name !== 'SIN CLUB'
    );
    setFilteredClubs(filtered);
    setSelectedClub(null); // Limpiar selección al buscar
  };

  return (
    <div className="space-y-4">
      {/* Input de búsqueda */}
      <input
        type="text"
        placeholder="Escriba el club"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Lista de clubes */}
      <div className="space-y-2">
        {filteredClubs.map((club) => (
          <div
            key={club.id}
            onClick={() => setSelectedClub(club)} // Seleccionar club
            className={`p-4 border rounded-lg shadow-md transition cursor-pointer ${
              selectedClub?.id === club.id ? 'bg-blue-100' : 'hover:bg-gray-100'
            }`}
          >
            {/* Nombre e ID del Club */}
            <p className="font-medium text-gray-700">
              {club.name} <span className="text-gray-500">({club.id})</span>
            </p>

            {/* Botón "Ver Club" */}
            {selectedClub?.id === club.id && (
              <button
                onClick={() => alert(`Ver club: ${club.name}`)} // Aquí navegas o aplicas lógica
                className="mt-2 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-4 py-2 text-sm"
              >
                Ver Club
              </button>
            )}
          </div>
        ))}

        {/* Mensaje si no hay resultados */}
        {filteredClubs.length === 0 && (
          <p className="text-gray-500 text-center">No se encontraron clubes.</p>
        )}
      </div>
    </div>
  );
}
