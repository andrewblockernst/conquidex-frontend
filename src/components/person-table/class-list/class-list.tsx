'use client'

import PersonCard from "@/components/person-card/person-card"

interface ClassListProps {
  classes: ClassGroup[];
}

export const ClassList = ({ classes }: ClassListProps) => {
    return (
      <div className="w-full">
        {classes.map((classItem) => {

          // Key única compuesta por club_id + class_id
          const uniqueKey = `club-${classItem.club_id}-class-${classItem.class_id}`
          
          return (
            <div 
              key={uniqueKey}
              className="my-2 rounded-lg shadow-md p-4" 
              style={{ backgroundColor: `#${classItem.color}` }}
            >
              <h2 className="text-xl font-bold mb-3">{classItem.class_name}</h2>
              <div className="space-y-2">
                {classItem.persons.map((person) => (
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