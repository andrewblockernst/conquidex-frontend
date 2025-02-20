'use client'

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useUser } from "./UserContext";
import { useRouter } from "next/navigation";

interface SyncModalContextType {
    showSyncModal: boolean;
    openSyncModal: () => void;
    closeSyncModal: () => void;
    syncRedirect: () => void;
    loading: boolean;
}

const SyncModalContext = createContext<SyncModalContextType | undefined>(undefined);

export const SyncModalProvider = ({ children }: { children: React.ReactNode; }) => {
    const router = useRouter();
    const { activeProfile, member } = useUser();
    const [showSyncModal, setShowSyncModal] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if (activeProfile !== undefined && member !== undefined) {
            setShowSyncModal(!!(activeProfile && activeProfile.club_id === 0 && member));
            setLoading(false);
        }
    }, [activeProfile, member]);

    const syncRedirect = useCallback(() => {
        if (activeProfile?.club_id === 0) {
            router.push("/club/select");
        }
    }, [activeProfile, router]);

    const openSyncModal = () => setShowSyncModal(true);
    const closeSyncModal = () => setShowSyncModal(false);

    return (
        <SyncModalContext.Provider value={{ showSyncModal, openSyncModal, closeSyncModal, syncRedirect, loading }}>
        {loading && (
            <div className="flex justify-center items-center h-screen">
            <img src="/logo.png" alt="conquidex" className="w-32" />
            </div>
        )}
        {!loading && children}
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