import Button from "@/components/buttons/button";
import { ContinuousCalendar } from "@/components/calendar/continuous-calendar";
import { DownArrowHeadsIcon } from "@/components/icons";

export default function Calendar() {
  return (
    <div className="w-full flex flex-col">
      <div className="h-[75vh] flex justify-center">
        <ContinuousCalendar />
      </div>

      <a className="pb-8" href="#eventos">
        <Button contentStyle="flex text-white gap-4" variant="primary">
          <DownArrowHeadsIcon/> Ver eventos <DownArrowHeadsIcon/>
        </Button>
      </a>

      <div id="eventos" className="flex flex-col gap-4">
        <h2>Eventos</h2>
        <div>
          <h3>Eventos de hoy</h3>
          <div>
            <p>Evento 1</p>
            <p>Evento 2</p>
          </div>
        </div>
        <div>
          <h3>Eventos de mañana</h3>
          <div>
            <p>Evento 1</p>
            <p>Evento 2</p>
          </div>
        </div>
      </div>

    </div>
  );
}
