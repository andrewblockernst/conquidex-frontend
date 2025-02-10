import { useSyncModal } from "@/contexts/SyncModalContext";
import { useUser } from "@/contexts/UserContext";
import React from "react";

interface SyncButtonProps {}

const SyncButton: React.FC<SyncButtonProps> = () => {
  const { openSyncModal } = useSyncModal();
  const { activeProfile, member } = useUser();

  //Si no hay un miembro al que vincular o si el perfil activo ya es miembro
  if (!member || activeProfile?.role_id !== 0) return null;
  return (
    <button
      onClick={openSyncModal}
      type="button"
      className="flex justify-center items-center gap-2 p-2 w-35 h-10 rounded-lg border-2 border-yellow-800 bg-yellow-500 shadow-[4px_4px_0_0_#323232] text-white font-semibold text-base cursor-pointer transition-all duration-250 relative overflow-hidden z-10 group hover:text-gray-100"
    >
      {/*BARRIDO DEL FONDO*/}
      <span className="absolute inset-0 w-0 bg-yellow-600 transition-all duration-500 group-hover:w-full z-0"></span>
      <span className="relative z-10">Vincular</span>
    </button>
  );
};

export default SyncButton;
