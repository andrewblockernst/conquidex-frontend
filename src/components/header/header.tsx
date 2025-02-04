"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AuthButton } from "@/components/buttons/auth-button";
import SyncProfileModal from "../syncprofile-modal/syncprofile-modal-client";
import { useSyncModal } from "@/contexts/SyncModalContext";
import SyncButton from "../buttons/sync-button";
import { redirect } from "next/navigation";
import { HamburgerIcon, CloseIcon } from "../icons";  // Asegúrate de tener un CloseIcon

interface Props {
}

export const Header = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-yellow-100 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="Conquidex" className="w-32 h-32" />
            </Link>

            {/* Botón de menú hamburguesa del celu */}
            <div className="block lg:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="bg-yellow-200 text-white focus:outline-none p-2 rounded-lg mx-auto flex items-center justify-center"
              >
                {/* Cambia el ícono dependiendo del estado del menú */}
                {menuOpen ? (
                  <CloseIcon className="w-6 h-6" />  // Mostrar "X" cuando esté abierto
                ) : (
                  <HamburgerIcon className="w-6 h-6" />  // Mostrar hamburguesa cuando esté cerrado
                )}
              </button>
            </div>

            {/* Menú en celular */}
            <div
              className={`${
                menuOpen ? "block" : "hidden"
              } lg:flex space-x-2 py-6 items-center`}
            >
              <SyncButton />
              <AuthButton />
            </div>
          </div>
        </div>
      </header>

      <SyncProfileModal/>
    </>
  );
};
