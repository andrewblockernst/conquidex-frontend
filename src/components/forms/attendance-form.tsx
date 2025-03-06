"use client";

import PersonCard from "@/components/person/person-card/person-card";
import { useUser } from "@/contexts/UserContext";
import { getAttendanceData, saveAttendanceData } from "@/lib/actions/attendance.actions";
import React, { useEffect, useMemo, useState } from "react";

interface AttendanceFormProps {
  group: GroupData;
  eventId: ClubEvent["id"];
}

//Special data type to easily render attendance data
type attendanceDataType = {
  [personId: Attendance["person_id"]]:{
    attended: Attendance["attended"],
    taken_by: Attendance["taken_by"]
  };
}

export const AttendanceForm = ({ group, eventId }: AttendanceFormProps) => {
  const { activeProfile } = useUser();
  const [eventAttendance, setEventAttendance] = useState<Attendance[]>([]); // Store the fetched attendance data 
  const [attendanceData, setAttendanceData] = useState<attendanceDataType>({}); // Store the mapped attendance data for rendering (actually a bad practice)

  const uniqueKey = useMemo(()=>(group.type === "unit" ? `unit-${group.unit_id}` : `class-${group.class_id}`) ,[group]);
  const name = useMemo(()=>(group.type === "unit" ? group.unit_name : group.class_name), [group]);

  useEffect(() => {
    //Fetch attendance data for ONE event for ALL groups
    //That's why eventId is its only dependency
    const fetchAttendance = async () => {
      const data = await getAttendanceData(eventId);
      setEventAttendance(data);
    };
    fetchAttendance();
  }, [eventId]);

  useEffect(() => {
    //Create an empty attendance data object with all the persons in the group
    //This is essential for the handleChange function to work bc if attendanceData is just an empty object, it won't be able to read 'undefined' values such as 'attended'.
    const initialAttendanceData: attendanceDataType = {};
    group.persons.forEach((person) => {
      initialAttendanceData[person.id] = { attended: false, taken_by: null };
    });

    //Populate with the fecthed data from eventAttendance
    const attendanceMap = { ...initialAttendanceData }; // Copy of the initial state
      eventAttendance.forEach((record) => {
        if (attendanceMap[record.person_id]) {
          attendanceMap[record.person_id] = {
            attended: record.attended ?? false,
            taken_by: record.taken_by,
          };
        }
      });
      setAttendanceData(attendanceMap);
  }, [uniqueKey, eventAttendance]);

  const handleSave = async (attendanceData: attendanceDataType) => {
    //map back to Attendance type
    const dataToSave = group.persons.map((person)=>(
      {
        event_id: eventId,
        person_id: person.id,
        attended: attendanceData[person.id].attended || false,
        taken_by: attendanceData[person.id].taken_by || null
      }))
      try{
        await saveAttendanceData(dataToSave);
      }
      catch(error){
        console.error(error);
      }

    
  };

  const handleChange = (personId: number) => {
    setAttendanceData(prev => ({
      ...prev,
      [personId]: {attended: !prev[personId].attended, taken_by: activeProfile?.id!}
    }));
  };

  return (
    <div
      className="w-full rounded-lg shadow-[4px_4px_0_0_#323232] p-2 border-2 border-slate-800"
      style={{ backgroundColor: group.color }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{name}</h2>
      </div>
        {group.persons && group.persons.length > 0 ? (
          <form         
            className="items-center space-y-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSave(attendanceData);}}>

              {group.persons.map((person) => (
                <label 
                  htmlFor={`checkbox-${person.id}`} 
                  className="flex items-center gap-2 cursor-pointer w-full"
                  key={`${uniqueKey}-person-${person.id}`}>
                  <PersonCard person={person} redirectable={false}/>
                  <input
                    id={`checkbox-${person.id}`}
                    type="checkbox"
                    checked={attendanceData[person.id]?.attended ?? false}
                    onChange={() => handleChange(person.id)}
                    className="sr-only peer"
                  />
                  <div
                    className="relative flex-none w-12 h-6 bg-blue-200 rounded-full
                    peer peer-checked:after:translate-x-full 
                    rtl:peer-checked:after:-translate-x-full 
                    peer-checked:after:border-white after:content-[''] 
                    after:absolute after:top-[2px] after:start-[2px] 
                    after:bg-white after:border-gray-300 after:border 
                    after:rounded-full after:h-5 
                    after:w-5 after:transition-all  
                    peer-checked:bg-blue-500"
                  ></div>
                </label>))
              }
            <button
              type="submit"
              className="w-full p-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-700"
            >
              Guardar
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-center bg-gray-200 my-2 p-4 rounded-lg shadow-[4px_4px_0_0_#323232] border-2 border-slate-800">
            <h2 className="text-sm">
              {group.type === "unit"
                ? "¡Ey! Todavía no hay conquis en esta unidad 😔"
                : "No hay personas en esta clase 😔"}
            </h2>
          </div>
        )}
    </div>
  );
};
