'use client'

import Spinner1 from "@/components/spinners/spinner-1";
import AVATARS from "@/constants/avatars";
import Link from "next/link";
import { useState } from "react";

interface Props {
  person: Person;
  redirectable?: boolean; // Nueva prop para controlar si el componente redirecciona
}

const PersonCard = ({ person, redirectable = true }: Props) => {
  const avatar = AVATARS[person.role_id] || AVATARS[0];
  const [loading, setLoading] = useState(false); // handles redirection loading

  // Función para manejar el clic cuando no es redireccionable
  const handleClick = () => {
    if (redirectable) {
      setLoading(true);
    }
    // Si no es redireccionable, simplemente maneja el clic sin cargar
  };

  // Renderizado condicional basado en la prop redirectable
  const renderCardContent = () => (
    <>
      <img src={avatar} alt={person.name!} className="w-12 h-12 rounded-full" />
      <div className="ml-2 text-left overflow-hidden text-ellipsis whitespace-prewrap">
        <h2 className="text-lg font-semibold">
          {person.name} {person.nickname ? `"${person.nickname}"` : ""}{" "}
          {person.surname}
        </h2>
        <p className="text-sm text-gray-500">{person.email}</p>
      </div>
    </>
  );

  return (
    <button disabled={loading} onClick={handleClick} className="w-full relative">
      {loading && (
        <div className="absolute w-full max-h-full inset-0 rounded-lg flex items-center justify-center bg-black bg-opacity-50">
          <Spinner1 className="fill-white" />
        </div>
      )}
      
      {redirectable ? (
        <Link href={`/profile/${person.id}`} className={`flex items-center p-2 bg-gray-200 rounded-lg shadow-[4px_4px_0_0_#323232] border-2 border-slate-800`}>
          {renderCardContent()}
        </Link>
      ) : (
        <div className={`flex items-center p-2 bg-gray-200 rounded-lg shadow-[4px_4px_0_0_#323232] border-2 border-slate-800`}>
          {renderCardContent()}
        </div>
      )}
    </button>
  );
};

export default PersonCard;