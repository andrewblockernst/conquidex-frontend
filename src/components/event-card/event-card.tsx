import { useState } from "react";
import RelativeTime from "../dates/relative-time";

interface Props{
    event: ClubEvent
}

function EventCard({ event }: Props) {
    const [isExpanded, setIsExpanded] = useState(false);

    const HandleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    const dateString = new Date(event.date).toLocaleDateString("es-ES", dateOptions);

  return (
    <div className="p-2" style={{backgroundColor: event.color!}}>
      <div className="flex justify-between items-center p-2">
            <h2 className="text-xl font-bold">{event.name}</h2>
            <RelativeTime datetime={event.date} lang="es" ></RelativeTime>
            <button
                onClick={() => HandleExpand()}
                className={`bg-transparent text-black text-xl font-bold transform transition-transform ${
                  isExpanded ? "rotate-0" : "rotate-90"
                }`}
              >
                ▼
              </button>
        </div>
        {isExpanded && (
          <div className="space-y-2">
            <div className="relative flex items-center justify-center bg-gray-200 my-2 p-4 rounded-lg shadow-[4px_4px_0_0_#323232] border-2 border-slate-800">
                <div className="absolute top-2 right-2 text-md">
                  <p>{ dateString }</p>
                </div>
                <div className="w-full text-left">
                { event.description ?  (
                  <p className="p-2 pt-6 text-md">{event.description}</p>
                ) : (
                  <p className="p-4 pt-6 text-md">Sin descripción.</p>)}
                </div>
            </div> 
          </div>
        )}
    </div>
    
  )
}

export default EventCard