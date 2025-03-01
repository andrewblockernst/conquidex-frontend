'use client';

import { useUser } from "@/contexts/UserContext";
import { useNavigationHistory } from "@/hooks/navigation-history";

function Attendance() {
  const { goBack } = useNavigationHistory();
  const { activeProfile } = useUser();

  if (activeProfile?.role_id! < 2){
    goBack();
  }
  return (
    <div>Attendance</div>
  )
}

export default Attendance