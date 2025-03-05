'use client';

import { useUser } from "@/contexts/UserContext";
import { useNavigationHistory } from "@/hooks/navigation-history";
import { useSearchParams } from "next/navigation";
import { ATTENDANCE as PARAMS } from "@/constants/url-params";
import { useEvents } from "@/contexts/EventContext";
import { use, useEffect, useState } from "react";
import { fetchUnits } from "@/lib/actions/units.actions";
import UnitCard from "@/components/cards/unit-card";
import Carousel from "@/components/carousel/carousel";
import EventCard from "@/components/event-card/event-card";

function Attendance() {
  const { goBack } = useNavigationHistory();
  const { activeProfile } = useUser();
  const [units, setUnits] = useState<Unit[]>([]);
  const { events } = useEvents();

  const searchParams = useSearchParams();
  const unitId = searchParams.get(PARAMS.unit);
  const eventId = searchParams.get(PARAMS.event);

  useEffect(() => {
    const loadData = async () => {
      setUnits(await fetchUnits(activeProfile?.club_id!));
      };
    loadData();
  }, []);

  // Detector simple de URL vacía
  useEffect(() => {
    // Si la URL está vacía y hay datos disponibles, establecer valores por defecto
    if (window.location.pathname === '/attendance' && !window.location.search) {
      if (units.length > 0 && events.length > 0) {
        // Redirigir a la misma página pero con parámetros por defecto
        window.location.href = `/attendance?${PARAMS.unit}=${units[0].id}&${PARAMS.event}=${events[0].id}`;
      }
    }
  }, [unitId, eventId]);

  if (activeProfile?.role_id! < 2){
    goBack();
  }
  return (
    <main className="w-full h-full flex flex-col items-center justify-center overflow-hidden py-2">
      <h1 className="text-2xl">Asistencia</h1>
      <div className="w-full h-1/3 py-4">
        <Carousel
        objects={units}
        renderCard={(unit)=><UnitCard unit={unit}></UnitCard>}
        initialSelectedId={unitId ? parseInt(unitId) : undefined}
        onSelect={(unit)=> history.pushState(null, "", `?${PARAMS.unit}=${unit.id}&${PARAMS.event}=${eventId}`)}
        />
      </div>
      <div className="w-full h-1/3 pb-4">
        <Carousel
        objects={events}
        renderCard={(event)=><EventCard event={event} editable={false}></EventCard>}
        initialSelectedId={eventId ? parseInt(eventId) : undefined}
        onSelect={(event)=> history.pushState(null, "", `?${PARAMS.unit}=${unitId}&${PARAMS.event}=${event.id}`)}
        />
      </div>
    </main>
  )
}

export default Attendance