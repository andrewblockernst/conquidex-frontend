'use client';

import Button from "@/components/buttons/button";
import { ContinuousCalendar } from "@/components/calendar/continuous-calendar";
import DayViewModal from "@/components/calendar/day-view-modal";
import EventTable from "@/components/event-table/event-table";
import { DownArrowHeadsIcon } from "@/components/icons";
import { useRouter } from "next/navigation";

export default function Calendar() {
  const router = useRouter();

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

      <div id="eventos" className="h-[80vh] flex flex-col gap-4">
        <EventTable />
      </div>
    </div>
    <DayViewModal></DayViewModal>
    </>
  );
}
