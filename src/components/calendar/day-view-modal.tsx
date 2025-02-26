import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import BaseModal from "../modals/base-modal";
import DayView from "./day-view";
import Button from "../buttons/button";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";

function DayViewModal() {
  const router = useRouter();
  const { activeProfile } = useUser();
  const searchParams = useSearchParams();
  const date = searchParams.get("date");

  const handleClose = () => {
    router.push("/calendar");
  };

  if (!date) return null;

  const [day, month, year] = date.split("-").map(Number);
  const dateName = new Date(Date.UTC(year, month, day)).toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC"
  });

  return (
    <BaseModal
      title={dateName}
      onClose={handleClose}
      className="w-4/5 min-w-80 max-w-[600px] relative"
    >
      <DayView date={date} />
      {/*Add event button*/}
      { activeProfile?.role_id! >= 3 &&
      <div className="absolute -bottom-6 inset-x-0 flex justify-center space-x-4">
        <Link href={`/calendar?date=${date}&new=y`}>
          <Button variant="success" className=" w-35 rounded-full h-full px-4">
            +
          </Button>
        </Link>
      </div>
      }
    </BaseModal>
  );
}

export default DayViewModal;