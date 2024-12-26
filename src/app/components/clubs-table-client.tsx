"use client"

import { useState, useEffect } from "react"

interface Club {
  id: number
  name: string
  province: string
}

interface Props {
  clubs: Club[],
  parentCallback: (club: Club) => void 
}

export default function ClubTableClient({ clubs, parentCallback }: Props) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredClubs, setFilteredClubs] = useState<Club[]>([])

  useEffect(() => {
    setFilteredClubs(
      clubs
        .filter((club) => club.name !== "SIN CLUB") //NO APARECE SIN CLUB POR TEMA DE QUE NO ES UN CLUB xd
        .sort((a, b) => a.id - b.id) //ORDENADOS POR ID DE MENOR A MAYOR
    )
  }, [clubs])

  const [selectedClub, setSelectedClub] = useState<Club | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)
    const filtered = clubs
      .filter((club) => club.name.toLowerCase().includes(term) && club.name !== "SIN CLUB" )
      .sort((a, b) => a.id - b.id)
    setFilteredClubs(filtered)
    setSelectedClub(null)
  };

  const handleSelection = () =>{
    if (selectedClub) {
      parentCallback(selectedClub)
    }
    alert(`Club seleccionado: ${selectedClub?.name}`)
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
      type="text"
      placeholder="Escriba el club"
      value={searchTerm}
      onChange={handleSearch}
      className="w-2/4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="space-y-2 w-full flex flex-col items-center">
      {filteredClubs.map((club) => (
        <div
        key={club.id}
        onClick={() => setSelectedClub(club)}
        className={`p-4 border rounded-lg shadow-md transition cursor-pointer w-2/4 ${
          selectedClub?.id === club.id ? "bg-blue-100" : "hover:bg-gray-100"
        } flex justify-between`}
        >
        <p className="font-medium text-gray-700">
          {club.name} <span className="text-gray-500">({club.id})</span>
        </p>
        <p className="text-gray-500 italic">{club.province}</p>
        </div>
      ))}

      {filteredClubs.length === 0 && (
        <p className="text-gray-500 text-center">No existe ese club</p>
      )}
      </div>

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
