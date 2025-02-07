'use client'

import PersonCard from "@/components/person-card/person-card"

interface UnitListProps {
  units: UnitGroup[];
}

export const UnitList = ({ units }: UnitListProps) => {
  return (
    <div className="w-full">
      {units.map((unit) => {
        // Key única compuesta por club_id + unit_id
        const uniqueKey = `club-${unit.club_id}-unit-${unit.unit_id}`
        
        return (
          <div 
            key={uniqueKey}
            className="my-2 rounded-lg shadow-md p-4" 
            style={{ backgroundColor: `#${unit.color}` }}
          >
            <h2 className="text-xl font-bold mb-3">{unit.unit_name}</h2>
            <div className="space-y-2">
              {unit.persons.map((person) => (
                <PersonCard 
                  key={`${uniqueKey}-person-${person.id}`} 
                  person={person} 
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}