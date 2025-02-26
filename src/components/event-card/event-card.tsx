import { useState } from "react";
import RelativeTime from "../dates/relative-time";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Props{
    event: ClubEvent
}

function EventCard({ event }: Props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const searchParams = useSearchParams(); // Get the current path

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
    <div className="p-2 rounded-md border-2 border-gray-500" style={{backgroundColor: event.color!}}>
      <div className="flex justify-between items-center p-2 gap-x-1 ">
            <h2 className="text-xl font-bold overflow-hidden whitespace-pre-wrap ">{event.name}</h2>
            <Link href={{
                query: {
                  ...Object.fromEntries(searchParams.entries()),
                  edit: event.id
                }
              }} className="group">
              <Pencil className="size-5 group-hover:size-6 transition-all ease-out duration-200" />
            </Link>
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
            <div className="flex flex-col items-center justify-center bg-gray-200 my-2 rounded-lg shadow-[4px_4px_0_0_#323232] border-2 border-slate-800">
                  
                  <div className="w-full flex flex-wrap justify-between items-center p-2 gap-x-1">
                    <h2 className="text-md overflow-hidden whitespace-pre-wrap">
                        {[
                        event.street,
                        event.street_number,
                        event.city,
                        event.state,
                        event.country ? event.country+ "." : '',
                        ]
                        .filter(Boolean)
                        .join(", ")}
                    </h2>
                    <p className="w-full text-right">{ dateString }</p>
                  </div>
                    

                <div className="w-full text-left">
                { event.description ?  (
                  <p className="p-4 text-md">{event.description}</p>
                ) : (
                  <p className="p-4 text-md">Sin descripción.</p>)}
                </div>
            </div> 
          </div>
        )}
    </div>
    
  )
}

export default EventCard