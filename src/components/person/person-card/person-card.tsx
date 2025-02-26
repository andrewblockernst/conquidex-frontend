'use client'

import Spinner1 from "@/components/spinners/spinner-1";
import AVATARS from "@/constants/avatars";
import Link from "next/link";
import { useState } from "react";

interface Props {
  person: Person;
}

const PersonCard = ({ person }: Props) => {
  const avatar = AVATARS[person.role_id] || AVATARS[0];
  const [loading , setLoading] = useState(false); // handles redirection loading

  return (
    
    <button disabled={loading} onClick={() => setLoading(true)} className="w-full relative">
      {loading && (<div className="absolute w-full max-h-full inset-0 rounded-lg flex items-center justify-center bg-black bg-opacity-50"><Spinner1 className="fill-white"/></div>)}
      <Link href={`/profile/${person.id}`} className={`flex items-center p-4 bg-gray-200 rounded-lg shadow-[4px_4px_0_0_#323232] border-2 border-slate-800`}>
      <img src={avatar} alt={person.name!} className="w-12 h-12 rounded-full" />
      <div className="ml-4 text-left overflow-hidden text-ellipsis whitespace-nowrap">
        <h2 className="text-lg font-semibold">
          {person.name} {person.nickname ? `"${person.nickname}"` : ""}{" "}
          {person.surname}
        </h2>
        <p className="text-sm text-gray-500">{person.email}</p>
      </div>
      </Link>
    </button>
    
  );
};

export default PersonCard;
