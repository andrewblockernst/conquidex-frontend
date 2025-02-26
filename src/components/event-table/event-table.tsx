"use client"

import React from 'react'
import Button from '../buttons/button'
import { useUser } from '@/contexts/UserContext';
import EventCard from '../event-card/event-card';
import { useEvents } from '@/contexts/EventContext';
import { useSearchParams } from 'next/navigation';

function EventTable() {
  const { club } = useUser();
  const { events } = useEvents();

  const searchParams = useSearchParams()
  const newEvent = searchParams.get("new");
  const editEventId: number = Number(searchParams.get("edit"));

  return (
    

    <div className='w-full h-full flex flex-col px-4'>
      <div className='event-header flex items-center justify-around border-2 border-gray-200 p-4'>
        <h1 className='text-xl'>Eventos de {club?.name}</h1>
        <Button variant='success' className='w-35 h-full px-8'>
          Crear
        </Button>
      </div>
      <div className='event-body flex-1 overflow-y-scroll'>
        {
          (!events || events.length === 0) && (
            <div className='flex justify-center items-center h-40'>
              <h1 className='text-xl'>No hay eventos</h1>
            </div>
          )
        }
        {
        events.map(event => (
          <EventCard key={event.id} event={event}></EventCard>
        ))}
      </div>
    </div>
  )
}

export default EventTable