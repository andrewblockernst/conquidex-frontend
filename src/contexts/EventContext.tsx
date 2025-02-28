'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { createClient } from "@/utils/supabase/client";

interface EventContextType{
    events: ClubEvent[];
    loading: boolean;
    getEventsByDate: (year: number, month: number, day: number) => ClubEvent[];
    refreshNewEvent: (event: ClubEvent) => void;
    refreshUpdateEvent: (event: EventUpdate) => void;
    refreshDeleteEvent: (id: number) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);
const supabase = createClient();

export const EventProvider = ({ children }: { children: React.ReactNode }) => {
    const { club } = useUser();
    const [events, setEvents] = useState<ClubEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            const { data, error } = await supabase
              .from('events')
              .select('*')
              .eq('club_id', club?.id!)
              .order('date', { ascending: true });
          
            if (error) {
              console.error('Error al obtener los eventos:', error);
              return;
            }
          
            setEvents(data!);
            setLoading(false);
        };
        fetchEvents();
    }, []);

    const refreshNewEvent = async (event: ClubEvent) => {
        // Actualizamos el estado local con el nuevo evento
        setEvents(prevEvents => [event, ...prevEvents]);
      };

      const refreshUpdateEvent = async (event: EventUpdate) => {
        // Actualizamos el estado local con el evento actualizado
        setEvents(prevEvents =>
          prevEvents.map(e => (e.id === event.id ? { ...e, ...event } : e))
        );
      };

      const refreshDeleteEvent = async (id: number) => {
        // Actualizamos el estado local eliminando el evento
        setEvents(prevEvents => prevEvents.filter(e => e.id !== id));
      };

    const getEventsByDate = (year: number, month: number, day: number): ClubEvent[] => {
        // Se asume que 'month' es 0-indexado (0 = Enero, 11 = Diciembre)
        // Construimos el inicio del día y el inicio del día siguiente en UTC
        const startOfDay = new Date(Date.UTC(year, month, day));
        const endOfDay = new Date(Date.UTC(year, month, day + 1));
    
        return events.filter((event) => {
          // Se asume que event.date es un string ISO (por ejemplo, "2025-02-23T12:30:00.000Z")
          const eventDate = new Date(event.date);
          return eventDate >= startOfDay && eventDate < endOfDay;
        });
      };

    return (
        <EventContext.Provider value={{ events, loading, getEventsByDate, refreshNewEvent, refreshUpdateEvent, refreshDeleteEvent }}>
            {children}
        </EventContext.Provider>
    )
}

export const useEvents = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error("useEvent debe usarse dentro de un EventProvider");
    }
    return context;
}