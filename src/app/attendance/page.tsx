'use client';

import { useUser } from "@/contexts/UserContext";
import { useNavigationHistory } from "@/hooks/navigation-history";
import { useSearchParams } from "next/navigation";
import { ATTENDANCE as PARAMS } from "@/constants/url-params";
import { useEvents } from "@/contexts/EventContext";
import { use, useEffect, useMemo, useState } from "react";
import { fetchUnits } from "@/lib/actions/units.actions";
import UnitCard from "@/components/cards/unit-card";
import Carousel from "@/components/carousel/carousel";
import EventSillyCard from "@/components/event-card/event-silly-card";
import Spinner1 from "@/components/spinners/spinner-1";
import { useClub } from "@/contexts/ClubContext";

function Attendance() {
  const { goBack } = useNavigationHistory();
  const { activeProfile } = useUser();
  const { units } = useClub();
  const [isLoading, setIsLoading] = useState(false);
  const { getEventsByDate, loading: eventsLoading } = useEvents();

  const events =  useMemo(() => {
    const today = new Date();
    return getEventsByDate(today.getFullYear(), today.getMonth(), today.getDate());
  }, [getEventsByDate, eventsLoading]);

  // Redirección de seguridad basada en el rol
  useEffect(() => {
    if (activeProfile?.role_id && activeProfile.role_id < 2) {
      goBack();
    }
  }, [activeProfile?.role_id, goBack]);

  if (isLoading) {
    return <div className="w-full pt-8 flex items-center justify-center"><Spinner1 /></div>;
  }

  return (
    <main className="w-full h-full flex flex-col items-center justify-center overflow-hidden py-2">
      
      {units.length > 0 ? (
        <div className="w-full h-1/3 py-4">
          <Carousel
            objects={units}
            renderCard={(unit) => <UnitCard unit={unit} />}
            paramName={PARAMS.unit}
          />
        </div>
      ) : (<p>¡Ups! Parece que no hay unidades a las que tomar asistencia :C</p>)}
      
      {events.length > 0 ? (
        <div className="w-full h-1/3 pb-4">
          <Carousel
            objects={events}
            renderCard={(event) => <EventSillyCard event={event} />}
            paramName={PARAMS.event}
          />
        </div>
      ): (
        <p>No hay eventos para hoy :C</p>
      )}
    </main>
  );
}

export default Attendance;