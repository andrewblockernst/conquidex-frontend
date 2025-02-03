import { useSyncModal } from "@/contexts/SyncModalContext";
import { useUser } from "@/contexts/UserContext";
import React from "react";

interface SyncButtonProps {
}

const SyncButton: React.FC<SyncButtonProps> = () => {
    const { openSyncModal } = useSyncModal();
    const { activeProfile } = useUser();

  if (activeProfile && activeProfile.role_id!==0) return null; //no mostrar el boton si el perfil activo es miembro
  return (
    <button
      onClick={() => openSyncModal()}
      type="button"
      className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-0.5 dark:focus:ring-yellow-900"
    >
      Vincular
    </button>
  );
};

export default SyncButton;
