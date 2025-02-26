"use client";

import { useEvents } from "@/contexts/EventContext";
import { useEffect, useState } from "react";
import EventCard from "../event-card/event-card";
import { useSearchParams } from "next/navigation";
import EventCardForm from "../event-card/event-card-form";
import { createEvent, deleteEvent, updateEvent } from "@/lib/actions/event.actions";
import ErrorModal from "../modals/error-modal";
import SuccessModal from "../modals/success-modal";
import { useRouter } from "next/navigation";
import ConfirmationModal from "../modals/confirmation-modal";

interface Props {
  events: ClubEvent[];
}

export default function EventTable({ events }: Props) {
  const router = useRouter();
  const { refreshNewEvent, refreshUpdateEvent, refreshDeleteEvent} = useEvents();

  const searchParams = useSearchParams()
  const newEvent = searchParams.get("new");
  const editEventId: number = Number(searchParams.get("edit"));
  const deleteEventId: number = Number(searchParams.get("delete"));
  //const date = searchParams.get("date"); //didn't use it

  useEffect(() => {
    // Este efecto se ejecutará cada vez que cambie el parámetro edit en la URL
    console.log("Edit event ID changed:", editEventId);
    // Podrías agregar lógica adicional aquí si es necesario
  }, [editEventId]);


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

  const handleDeleteEvent = async () => {
    try {
      const success = await deleteEvent(deleteEventId);
      if (success) {
        refreshDeleteEvent(deleteEventId);
        setSuccess("Evento eliminado correctamente");
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleSuccess = () => {
    setSuccess(null);
    //router.push(`/calendar?date=${date}`);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("edit");
    params.delete("new");
    params.delete("delete");
    router.push(`?${params.toString()}`, { scroll: false });
  }

  const handleCancel = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("delete");
    router.push(`?${params.toString()}`, { scroll: false });
  }
  const handleError = () => {
    setError(null);
  }

  return (
    <>
      <div className="flex flex-col gap-4 overflow-y-auto max-h-[60vh]">
        {newEvent && <EventCardForm onSubmit={handleNewEvent}></EventCardForm>}
        {(!events || events.length === 0) && !newEvent && (
          <div className="flex justify-center items-center h-40">
            <h1 className="text-xl">Todavía no hay eventos</h1>
          </div>
        )}
        {events.map((event) =>
          editEventId === event.id ? (
            <EventCardForm
              key={event.id}
              event={event}
              onSubmit={handleUpdateEvent}
            ></EventCardForm>
          ) : (
            <EventCard key={event.id} event={event} />
          )
        )}
      </div>
      {Boolean(deleteEventId) &&
      <ConfirmationModal isOpen={true} title="ALERTA" confirmText="Eliminar"
      cancelText="Cancelar" onConfirm={handleDeleteEvent} onClose={handleCancel} className="z-20">
        ¿Seguro que deseas eliminar el evento? Esta accción no se puede revertir.
      </ConfirmationModal>}
      {error && <ErrorModal onClose={handleError} className="z-30">{error}</ErrorModal>}
      {success && <SuccessModal onClose={handleSuccess} className="z-30">{success}</SuccessModal>}
    </>
  );
}