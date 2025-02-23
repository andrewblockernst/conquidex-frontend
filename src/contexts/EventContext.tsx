'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { createClient } from "@/utils/supabase/client";

interface EventContextType{
    events: ClubEvent[];
    loading: boolean;
    getEventsByDate: (year: number, month: number, day: number) => ClubEvent[] | null;
    createEvent: (event: EventInsert) => void;
    updateEvent: (event: EventUpdate) => void;
    deleteEvent: (id: number) => void;
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

    const createEvent = async (event: EventInsert) => {
        const { data, error } = await supabase
          .from('events')
          .insert(event);
      
        if (error) {
          console.error('Error al crear el evento:', error);
          return;
        }
      
        // Actualizamos el estado local con el nuevo evento
        setEvents(prevEvents => [...prevEvents, data![0]]);
      };

      const updateEvent = async (event: EventUpdate) => {
        const { data, error } = await supabase
          .from('events')
          .update(event)
          .eq('id', event.id!);
      
        if (error) {
          console.error('Error al actualizar el evento:', error);
          return;
        }
      
        // Actualizamos el estado local con el evento actualizado
        setEvents(prevEvents =>
          prevEvents.map(e => (e.id === event.id ? { ...e, ...(typeof data![0] === 'object' ? data![0] : {}) } : e))
        );
      };

      const deleteEvent = async (id: number) => {
        const { error } = await supabase.from('events').delete().eq('id', id);
      
        if (error) {
          console.error('Error al eliminar el evento:', error);
          return;
        }
      
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
        <EventContext.Provider value={{ events, loading, getEventsByDate, createEvent, updateEvent, deleteEvent }}>
            {children}
        </EventContext.Provider>
    )
}

export const useEvent = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error("useEvent debe usarse dentro de un EventProvider");
    }
    return context;
}