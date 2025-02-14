"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header/header";
import ClubView from "@/components/club/club-view/club-view";
import { useUser } from "@/contexts/UserContext";
import ToolBar from "@/components/toolsbar/toolsbar";

export default function Home() {
  const { club, loading: userLoading, user } = useUser();
  const [clubName, setClubName] = useState<string>("");

  useEffect(() => {
    if (club?.name) {
      setClubName(club.name);
    } else {
      setClubName("");
    }
  }, [club]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 w-full flex justify-center">
        <div className="flex w-full max-w-7xl">
          {/* COLUMNA IZQUIERDA */}
          {user && club && (
            <div className="hidden md:flex w-[25%] pt-3">
              <ToolBar />
            </div>
          )}

          {/* COLUMNA CENTRAL */}
            <div className={`w-full ${user && club ? "md:w-[50%]" : "md:w-full"} p-4`}>
            <div className="flex justify-center items-center pt-9 text-2xl font-bold">
              {clubName && <h1>{clubName}</h1>}
            </div>
            <ClubView/>
            </div>

          {/* COLUMNA DERECHA */}
          {user && club && (
            <div className="hidden md:block w-[25%] p-2">
              {/* CONTENIDO PARA EL CALENDARIO Y EVENTOS*/}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}