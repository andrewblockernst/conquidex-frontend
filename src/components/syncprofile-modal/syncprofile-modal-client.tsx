"use client";

import { SyncPersonToUser } from "./actions";
import { redirect } from 'next/navigation';
import { useState } from 'react';
import SuccessModal from "../modals/success-modal";
import ErrorModal from "../modals/error-modal";
import { CautionIcon } from "../icons";
import { useSyncModal } from "@/contexts/SyncModalContext";
import { useUser } from "@/contexts/UserContext";

interface Props {
}

export default function SyncProfileModal() {
    const { showSyncModal, closeSyncModal, syncRedirect } = useSyncModal();
    const [isLoading, setIsLoading] = useState(false);
    const [errorModal, setErrorModal] = useState<React.ReactNode>(null);
    const [successModal, setSuccessModal] = useState<React.ReactNode>(null);
    const { member, refreshProfile } = useUser();

    const handleSync = async () => {
        try {
            setIsLoading(true);
            setErrorModal(null);
            const result = await SyncPersonToUser();

            if (result.success) {
                setSuccessModal(`Sincronización exitosa`);
            } else {
                setErrorModal(`${result.error}` || `Sincronización fallida`);
            }
        } catch (err) {
            setErrorModal(`Error desconocido`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNoSoyYo = () => {
        closeSyncModal();
        syncRedirect();
    };

    return (
        showSyncModal && member &&
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm">
            <div className="mx-auto max-w-md rounded-lg border border-stone-200 bg-stone-100 p-4 shadow-lg sm:p-6">
                <div className="flex items-center gap-4">
                    <span className="shrink-0 rounded-full bg-yellow-400 p-1.5 text-white">
                        <CautionIcon className="w-8 h-8" />
                    </span>
                    <h2 className="text-2xl font-bold text-yellow-400">ATENCIÓN</h2>
                </div>
                <p className="mt-4 text-gray-600">
                    Parece que te registraron antes en el club <b>{member.club_name}</b> como <b>{member.name + " " + member.surname}</b>.
                </p>
                <p className="mt-4 text-gray-600">¿Sos vos?</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
                    <button
                        className="w-full rounded-lg bg-yellow-400 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto sm:order-2"
                        onClick={handleSync}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Procesando...' : 'Sí, soy yo'}
                    </button>
                    <button
                        className="w-full rounded-lg bg-stone-300 px-5 py-3 text-center text-sm font-semibold text-gray-800 sm:w-auto sm:order-1"
                        onClick={handleNoSoyYo}
                        disabled={isLoading}
                    >
                        No soy yo
                    </button>
                </div>
            </div>
            <ErrorModal onClose={() => setErrorModal(null)}>
                {errorModal}
            </ErrorModal>
            <SuccessModal onClose={() => { closeSyncModal(); setSuccessModal(null); refreshProfile(); redirect("/home"); }}>
                {successModal}
            </SuccessModal>
        </div>
    );
}