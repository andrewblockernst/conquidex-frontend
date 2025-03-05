"use client";

import PersonCard from "@/components/person/person-card/person-card";
import { useUser } from "@/contexts/UserContext";
import { getAttendanceData } from "@/lib/actions/attendance.actions";
import React, { useEffect, useState } from "react";

interface AttendanceFormProps {
  group: GroupData;
  eventId: ClubEvent["id"];
}

type attendanceDataType = {
  [personId: Attendance["person_id"]]:{
    attended: Attendance["attended"],
    taken_by: Attendance["taken_by"]
  };
}

export const AttendanceForm = ({ group, eventId }: AttendanceFormProps) => {
  const { activeProfile } = useUser();
  const [attendanceData, setAttendanceData] = useState<attendanceDataType>({});

  useEffect(() => {
    //Trae los datos de asistencia de UN evento para TODAS las agrupaciones
    //Por eso eventId es su única dependencia
    const fetchAttendance = async () => {
      const data = await getAttendanceData(eventId);
      const attendanceMap = data.reduce((acc, record) => {
        acc[record.person_id] = { attended: record.attended, taken_by: record.taken_by};
        return acc;
      }, {} as attendanceDataType);
      setAttendanceData(attendanceMap);
    };
    fetchAttendance();
  }, [eventId]);

  const handleSave = (attendanceData: attendanceDataType) => {
    console.log(attendanceData);
  };

  const handleChange = (personId: number) => {
    setAttendanceData(prev => ({
      ...prev,
      [personId]: {attended: !prev[personId].attended, taken_by: activeProfile?.id!}
    }));
  };

  const uniqueKey = group.type === "unit" ? `unit-${group.unit_id}` : `class-${group.class_id}`;
  const name = group.type === "unit" ? group.unit_name : group.class_name;

  return (
    <div
      className="w-full rounded-lg shadow-[4px_4px_0_0_#323232] p-2 border-2 border-slate-800"
      style={{ backgroundColor: group.color }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{name}</h2>
      </div>
      <div className="space-y-2">
        {group.persons && group.persons.length > 0 ? (
          group.persons.map((person) => (
            <form
              key={`${uniqueKey}-person-${person.id}`}
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();        
                handleSave(attendanceData);
              }}
            >
              <PersonCard person={person} />
              <input
                type="checkbox"
                checked={attendanceData[person.id].attended || false}
                onChange={()=> handleChange(person.id)}
                className="mr-2"
              />
            </form>
          ))
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
    </div>
  );
};
