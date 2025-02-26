"use client";

import { useEvents } from "@/contexts/EventContext";
import { useEffect, useState } from "react";
import EventCard from "../event-card/event-card";
import { useSearchParams } from "next/navigation";
import EventCardForm from "../event-card/event-card-form";
import { createEvent, updateEvent } from "@/lib/actions/event.actions";
import ErrorModal from "../modals/error-modal";
import SuccessModal from "../modals/success-modal";
import { useRouter } from "next/navigation";

interface Props {
  date: string;
}

export default function DayView({ date }: Props) {
  const router = useRouter();
  const { getEventsByDate, refreshNewEvent, refreshUpdateEvent, loading: eventsLoading } = useEvents();
  const [dayEvents, setDayEvents] = useState<ClubEvent[]>([]);

  const searchParams = useSearchParams()
  const newEvent = searchParams.get("new");
  const editEventId: number = Number(searchParams.get("edit"));

  const [day, month, year] = date.split("-").map(Number);

  useEffect(() => {
    // Este efecto se ejecutará cada vez que cambie el parámetro edit en la URL
    console.log("Edit event ID changed:", editEventId);
    // Podrías agregar lógica adicional aquí si es necesario
  }, [editEventId]);

  useEffect(() => {
    if (eventsLoading) return;
    setDayEvents(getEventsByDate(year, month, day));
  }, [date, eventsLoading, getEventsByDate]);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleNewEvent = async (formData: EventInsert | EventUpdate) => {
    try {
      console.log(formData as EventInsert)
      const createdEvent = await createEvent(formData as EventInsert);
      if (createdEvent) {
        refreshNewEvent(createdEvent);
        setSuccess("Evento creado correctamente");
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleUpdateEvent = async (formData: EventInsert | EventUpdate) => {
    try {
      const createdEvent = await updateEvent(formData as EventUpdate);
      if (createdEvent) {
        refreshUpdateEvent(formData as EventUpdate);
        setSuccess("Evento actualizado correctamente");
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleSuccess = () => {
    setSuccess(null);
    router.push(`/calendar?date=${date}`);
  }

  const handleError = () => {
    setError(null);
  }

  return (
    <>
    <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
      {dayEvents.map((event) => (
        editEventId === event.id ?
        <EventCardForm key={event.id} event={event} onSubmit={handleUpdateEvent}></EventCardForm>
        :
        <EventCard key={event.id} event={event} />
      ))}
      {newEvent && <EventCardForm onSubmit={handleNewEvent}></EventCardForm>}
    </div>
    {error && (
            <ErrorModal onClose={handleError}>
            {error}
            </ErrorModal>
         )}
        {success && (
            <SuccessModal onClose={handleSuccess}>
                {success}
            </SuccessModal>
        )}
    </>
  );
}