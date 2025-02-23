import Button from "@/components/buttons/button";
import { ContinuousCalendar } from "@/components/calendar/continuous-calendar";
import EventTable from "@/components/event-table/event-table";
import { DownArrowHeadsIcon } from "@/components/icons";

export default function Calendar() {
  return (
    <div className="w-full flex flex-col">
      <div className="h-[75vh] flex justify-center">
        <ContinuousCalendar />
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
  );
}
