'use client';

import Button from "@/components/buttons/button";
import { ContinuousCalendar } from "@/components/calendar/continuous-calendar";
import DayViewModal from "@/components/calendar/day-view-modal";
import EventTable from "@/components/event-table/event-table";
import { DownArrowHeadsIcon } from "@/components/icons";
import { useEvents } from "@/contexts/EventContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Calendar() {
  const router = useRouter();
  const { events, loading } = useEvents();

  const handleDayClick = (day: number, month: number, year: number) => {
    router.push(`/calendar/?date=${day}-${month}-${year}`);
  }

  return (
    <>
    <div className="w-full flex flex-col">
      <div className="h-[75vh] flex justify-center">
        <ContinuousCalendar onClick={handleDayClick} />
      </div>

      <a className="px-4 pb-8" href="#eventos">
        <Button contentStyle="flex text-white gap-4" variant="primary">
          <DownArrowHeadsIcon/> Ver eventos <DownArrowHeadsIcon/>
        </Button>
      </a>
      
      <div id="eventos" className="flex flex-col gap-4 p-4">
          {/* HEADER */}
          <div className='event-header flex items-center justify-around border-2 border-gray-200 p-4'>
            <h1 className='text-xl'>Próximos eventos</h1>
            <Link href={`/calendar?new=y#event-form`}>
              <Button variant='success' className='w-35 h-full px-8'>
                Crear
              </Button>
            </Link>
          </div>
          {/* BODY */}
          <div className='event-body flex-1 h-full overflow-y-scroll'>
            <EventTable events={events} />
          </div>

      </div>
    </div>
    <DayViewModal></DayViewModal>
    </>
  );
}
