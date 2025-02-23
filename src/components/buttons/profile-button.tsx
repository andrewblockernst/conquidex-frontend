"use client";

import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { AuthButton } from "./auth-button";
import Button from "./button";
import Link from "next/link";

const ProfileButton = () => {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const { activeProfile } = useUser();

  const toggleCardVisibility = () => {
    setIsCardVisible(!isCardVisible);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="flex justify-center items-center p-2 w-35 h-10 rounded-lg border-2 border-yellow-800 bg-yellow-500 shadow-[4px_4px_0_0_#323232] cursor-pointer transition-all duration-250 relative overflow-hidden z-10 group hover:bg-yellow-600"
        onClick={toggleCardVisibility}
      >
        <div className="flex items-center justify-center m-2">
          <span className="text-white text-lg font-semibold">Perfil</span>
        </div>
      </button>
      {isCardVisible && (
        <div className="absolute z-10 w-44 p-4 mt-2 right-0 bg-yellow-500 border-2 border-yellow-800 rounded-lg shadow-[4px_4px_0_0_#323232] space-y-2">
          <div className="flex flex-col mt-2 mb-2 space-y-2">
            <Link href={`/profile/${activeProfile?.id}`}>
              <Button>Mi Perfil</Button>
            </Link>
            <Button>Mi Club</Button>
            <Button>
              <span>Soporte</span>
            </Button>
            <AuthButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
