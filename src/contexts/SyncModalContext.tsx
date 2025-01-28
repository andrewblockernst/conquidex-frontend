'use client'

import { createContext, useContext, useState } from "react";

interface SyncModalContextType {
    showSyncModal: boolean;
    openSyncModal: () => void;
    closeSyncModal: () => void;
    popSyncModal: boolean;
    setPopSyncModal: (value: boolean) => void;
}

const SyncModalContext = createContext<SyncModalContextType | undefined>(undefined);

export const SyncModalProvider = ({ children, defaultPopSyncModal }: { children: React.ReactNode; defaultPopSyncModal: boolean }) => {
    const [showSyncModal, setShowSyncModal] = useState(false);
    const [popSyncModal, setPopSyncModal] = useState(defaultPopSyncModal);

    const openSyncModal = () => setShowSyncModal(true);
    const closeSyncModal = () => setShowSyncModal(false);

    return (
        <SyncModalContext.Provider value={{ showSyncModal, openSyncModal, closeSyncModal, popSyncModal, setPopSyncModal }}>
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