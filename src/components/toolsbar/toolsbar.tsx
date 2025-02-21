"use client"

import Link from "next/link";
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import PersonCrudModal from "@/components/modals/CRUD/person-CRUD-modal";
import Button from "../buttons/button";
import { TentIconWhite, AttendanceIconWhite, AddIconWhite, CalendarIconWhite, InfoClubIconWhite, ProfileIconWhite } from '../icons';

const ToolsBar: React.FC = () => {
  const { activeProfile } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="hidden sm:flex w-[25%] pt-3">
      <aside className="fixed z-10 flex-col space-y-6 pt-24 pl-2 hidden sm:flex ">
        
        <Link href="/home">
          <Button contentStyle="w-full text-white flex items-center space-x-4">
            <TentIconWhite/>
            <h4 className="hidden md:block">Inicio</h4>
          </Button>
        </Link>

        {activeProfile?.role_id! >= 2 && (
          <>
          <Button contentStyle="w-full text-white flex items-center space-x-4">
            <AttendanceIconWhite></AttendanceIconWhite>
            <h4 className="hidden md:block">Asistencia</h4>
          </Button>

          <Button contentStyle="w-full text-white flex items-center space-x-4" onClick={() => setIsModalOpen(true)}>
            <AddIconWhite></AddIconWhite>
            <h4 className="hidden md:block">Crear</h4>
          </Button>
          </>
        )}

        <Link href="/calendar">
          <Button contentStyle="w-full text-white flex items-center space-x-4">
            <CalendarIconWhite/>
            <h4 className="hidden md:block">Eventos</h4>
        </Button>
        </Link>

        <Link href="/club/info">
          <Button contentStyle="w-full text-white flex items-center space-x-4">
            <InfoClubIconWhite/>
            <h4 className="hidden md:block">Info Club</h4>
          </Button>
        </Link>
      </aside>
      <PersonCrudModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ToolsBar;