'use client';

import Link from 'next/link'; // REDIRIGE A /home SIN QUE ESTE SE REFRESQUE
import { useUser } from "@/contexts/UserContext";
import { TentIcon, AttendanceIcon, AddIcon, CalendarIcon, InfoClubIcon, ProfileIcon } from '../icons';
import AddButton from './addButton';

const MobileNavbar = () => {
  const { activeProfile } = useUser();

  return (
    <>
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg h-[60px] flex items-center justify-around sm:hidden shadow-top border-t border-slate-600">
      <Link href="/home">
        <button
          id="home-button"
          className="outline-none border-0 w-16 h-16 rounded-t-full bg-transparent flex items-center justify-center text-black transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-[3px]"
        >
          <TentIcon className="w-8 h-8 text-black" />
        </button>
      </Link>

      {activeProfile?.role_id !== 0 && activeProfile?.role_id !== 1 && (
        <>
          <Link href="/attendance">
          <button
            id="attendace-button"
            className="outline-none border-0 w-16 h-16 rounded-t-full bg-transparent flex items-center justify-center text-black transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-[3px]"
          >
            <AttendanceIcon className="w-8 h-8 text-black" />
          </button>
          </Link>

          <AddButton/>
        </>
      )}
      <Link href="/calendar">
        <button
          id="calendar-button"
          className="outline-none border-0 w-16 h-16 rounded-t-full bg-transparent flex items-center justify-center text-black transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-[3px]"
        >
          <CalendarIcon className="w-8 h-8 text-black" />
        </button>
      </Link>

      {(activeProfile?.role_id === 0 || activeProfile?.role_id === 1) && (
        <button
          id="info-club-button"
          className="outline-none border-0 w-16 h-16 rounded-t-full bg-transparent flex items-center justify-center text-black transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-[3px]"
        >
          <InfoClubIcon className="w-8 h-8 text-black" />
        </button>
      )}

      <Link href={`/profile/${activeProfile?.id}`}>
        <button
          id="profile-button"
          className="outline-none border-0 w-16 h-16 rounded-t-full bg-transparent flex items-center justify-center text-black transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-[3px]"
        >
          <ProfileIcon className="w-8 h-8 text-black" />
        </button>
      </Link>
    </div>
    </>
  );
};

export default MobileNavbar;