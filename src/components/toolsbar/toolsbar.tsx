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
      <aside className="fixed z-10 flex-col space-y-6 pt-24 hidden sm:flex">
        
        <Link href="/home">
          <Button contentStyle="text-white flex items-center justify-center space-x-4">
            <TentIconWhite/>
            <h4>Inicio</h4>
          </Button>
        </Link>

        {activeProfile?.role_id! >= 2 && (
          <>
          <Button contentStyle="text-white flex items-center justify-center space-x-4">
            <AttendanceIconWhite></AttendanceIconWhite>
            <h4>Asistencia</h4>
          </Button>

          <Button contentStyle="text-white flex items-center justify-center space-x-4" onClick={() => setIsModalOpen(true)}>
            <AddIconWhite></AddIconWhite>
            <h4>Crear</h4>
          </Button>
          </>
        )}

        <Link href="/calendar">
          <Button contentStyle="text-white flex items-center justify-center space-x-4">
            <CalendarIconWhite/>
            <h4>Eventos</h4>
        </Button>
        </Link>

        <Link href="/club/info">
          <Button contentStyle="text-white flex items-center justify-center space-x-4">
            <InfoClubIconWhite/>
            <h4>Info Club</h4>
          </Button>
        </Link>
      </aside>
      <PersonCrudModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ToolsBar;