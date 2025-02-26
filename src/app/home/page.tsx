"use client";

import { useState, useEffect } from "react";
import ClubView from "@/components/club/club-view/club-view";
import { useUser } from "@/contexts/UserContext";
import EventTable from "@/components/event-table/event-table";
import { useEvents } from "@/contexts/EventContext";

export default function Home() {
  const { club, loading: userLoading, user } = useUser();
  const { events } = useEvents();
  const [clubName, setClubName] = useState<string>("");

  useEffect(() => {
    if (club?.name) {
      setClubName(club.name);
    } else {
      setClubName("");
    }
  }, [club]);

  return (
<>
  {/* COLUMNA CENTRAL */}
    <div className={`w-full ${user && club ? "md:w-[50%]" : "md:w-full"} p-4`}>
    <div className="flex justify-center items-center text-center pt-9 text-2xl font-bold">
      {clubName && <h1>{clubName}</h1>}
    </div>
    <ClubView/>
    </div>

  {/* COLUMNA DERECHA */}
  {user && club && (
    <div className="hidden flex-col md:flex w-[30%] h-full items-center justify-center p-4 mt-20 gap-4 border-2 border-gray-200">
      <div className='event-header w-full text-center p-4'>
        <h1 className='text-xl'>Próximos eventos</h1>
      </div>
      <div className='event-body flex-1'>
        <EventTable events={events} />
      </div>
    </div>
  )}
</>
  );
}