'use client'

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useUser } from "./UserContext";
import { useRouter } from "next/navigation";

interface SyncModalContextType {
    showSyncModal: boolean;
    openSyncModal: () => void;
    closeSyncModal: () => void;
    syncRedirect: () => void;
}

const SyncModalContext = createContext<SyncModalContextType | undefined>(undefined);

export const SyncModalProvider = ({ children}: { children: React.ReactNode;}) => {
    const router = useRouter();
    const { activeProfile, member } = useUser();
    const [showSyncModal, setShowSyncModal] = useState(false);
    
    useEffect(() => {
      const defaultPopSyncModal = !!(activeProfile && activeProfile.club_id === 0 && member);
      setShowSyncModal(defaultPopSyncModal);
    
    }, [activeProfile, member]);

    const syncRedirect = useCallback(() => {
        if (activeProfile?.club_id === 0) {
          router.push("/club/select");
        }
      }, [activeProfile, router]); // <--- Dependencias

    const openSyncModal = () => setShowSyncModal(true);
    const closeSyncModal = () => setShowSyncModal(false);

    return (
        <SyncModalContext.Provider value={{ showSyncModal, openSyncModal, closeSyncModal, syncRedirect}}>
            {children}
        </SyncModalContext.Provider>
    );
};

export const useSyncModal = () => {
    const context = useContext(SyncModalContext);
    if (!context) {
        throw new Error("useSyncModal debe usarse dentro de un SyncModalProvider");
    }
    return context;
};