'use client';

import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";

function Attendance() {
  const router = useRouter();
  const { activeProfile } = useUser();

  if (activeProfile?.role_id! < 2){
    router.back();
  }
  return (
    <div>Attendance</div>
  )
}

export default Attendance