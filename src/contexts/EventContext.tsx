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
      if (!club?.id) return;
        const fetchEvents = async () => {
            const { data, error } = await supabase
              .from('events')
              .select('*')
              .eq('club_id', club.id)
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
      //'month' es 0-indexado (0 = Enero, 11 = Diciembre)

      // Obtener la zona horaria del usuario automáticamente desde el navegador
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // Crear la fecha local del usuario para el inicio del día
      const localStartOfDay = new Date(year, month, day);
      // Convertir la fecha local a UTC según la zona horaria del usuario
      const utcStartOfDay = new Date(localStartOfDay.toLocaleString("en-US", { timeZone: userTimeZone }));
      // Crear la fecha local del usuario para el final del día
      const localEndOfDay = new Date(year, month, day + 1);
      // Convertir la fecha local a UTC según la zona horaria del usuario
      const utcEndOfDay = new Date(localEndOfDay.toLocaleString("en-US", { timeZone: userTimeZone }));
      
      return events.filter((event) => {
        // Se asume que event.date es un string ISO en UTC (ejemplo: "2025-03-06T00:03:06.867Z")
        const eventDate = new Date(event.date);
        return eventDate >= utcStartOfDay && eventDate < utcEndOfDay;
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