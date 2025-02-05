"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AuthButton } from "@/components/buttons/auth-button";
import SyncButton from "../buttons/sync-button";
import SyncProfileModal from "../syncprofile-modal/syncprofile-modal-client";
import { useSyncModal } from "@/contexts/SyncModalContext";
import AttendanceButton from "../buttons/attendance-button";
import ProgressButton from "../buttons/progress-button";
import ProfileButton from "../buttons/profile-button";
import { HamburgerIcon, CloseIcon } from "../icons";

interface Props {
}

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-yellow-500 text-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/home" className="flex items-center space-x-2">
              <img
                src="/logo-blanco.png"
                alt="Conquidex"
                className="h-10 w-auto"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-2">
              <SyncButton />
              <AttendanceButton />
              <ProfileButton />
              <AuthButton />
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden items-center space-x-2">
              <ProfileButton />
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex justify-center items-center p-2 w-10 h-10 rounded-lg border-2 border-yellow-800 bg-yellow-500 shadow-[4px_4px_0_0_#323232] cursor-pointer transition-all duration-250 relative overflow-hidden z-10 group hover:bg-yellow-600"
              >
                {menuOpen ? (
                <CloseIcon className="w-6 h-6 text-white" />
                ) : (
                <HamburgerIcon className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="lg:hidden bg-yellow-500 text-gray-800">
              <nav className="flex flex-col space-y-4 p-4">
                <SyncButton />
                <AttendanceButton />
                <AuthButton />
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Contenedor con padding-top para evitar que el contenido quede oculto debajo del header */}
      <div className="pt-16">
        <SyncProfileModal />
      </div>
    </>
  );
};
