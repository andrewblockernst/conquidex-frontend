import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import BaseModal from "../modals/base-modal";
import Button from "../buttons/button";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import { useEvents } from "@/contexts/EventContext";
import EventTable from "../event-table/event-table";
import { EVENTS as PARAMS } from "@/constants/url-params";

function DayViewModal() {
  const router = useRouter();
  const { activeProfile } = useUser();
  const { getEventsByDate, loading: eventsLoading} = useEvents();
  const [dayEvents, setDayEvents] = useState<ClubEvent[]>([]);
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  let day: number, month: number, year: number, dateName = "";
  if (date){
  [day, month, year] = date.split("-").map(Number);
   dateName = new Date(Date.UTC(year, month, day)).toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC"
  });
  }

  useEffect(() => {
    if (eventsLoading || !date) return;
    setDayEvents(getEventsByDate(year, month, day));
  }, [date, eventsLoading, getEventsByDate]);

  if (!date) return null;

  const handleClose = () => {
    router.push("/calendar");
  };

  return (
    <BaseModal
      title={dateName}
      onClose={handleClose}
      className="w-4/5 min-w-80 max-w-[600px] relative"
    >
      <EventTable events={dayEvents}/>
      {/*Add event button*/}
      { activeProfile?.role_id! >= 3 &&
      <div className="absolute -bottom-6 inset-x-0 flex justify-center space-x-4">
        <Link href={`/calendar?date=${date}&${PARAMS.new}=y#event-form`}>
          <Button variant="success" className=" w-35 rounded-full h-full px-4">
            +
          </Button>
        </Link>
      </div>
      }
    </BaseModal>
  );
}

export default DayViewModal;