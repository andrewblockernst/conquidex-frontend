interface Props{
    event: ClubEvent
}

function EventSillyCard({ event }: Props) {

  return (
    <div className="p-2 rounded-md border-2 border-gray-500" style={{backgroundColor: event.color!}}>
      <div className="flex justify-between items-center p-2 gap-x-1 ">
            <h2 className="text-md font-bold truncate overflow-hidden whitespace-pre-wrap ">{event.name}</h2>
        </div>
    </div>
    
  )
}

export default EventSillyCard