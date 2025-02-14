'use client'

import { useState, useEffect } from "react";
import { Header } from "@/components/header/header";
import ClubView from "@/components/club/club-view/club-view";
import { AuthButton } from "@/components/buttons/auth-button";
import { useUser } from "@/contexts/UserContext";
import MobileNavbar from "@/components/navbar/navbar";

export default function Home() {
  const { club, loading: userLoading } = useUser();
  const [clubName, setClubName] = useState<string>("");

  useEffect(() => {
    if (club?.name) {
      setClubName(club.name);
    }
  }, [club]);

  return (
    <>
      <Header />
      <div>
        <div className="flex justify-center items-center pt-9 text-2xl font-bold">
          {clubName && <h1>{clubName}</h1>}
        </div>
        <ClubView />
      </div>
    </>
  );
}