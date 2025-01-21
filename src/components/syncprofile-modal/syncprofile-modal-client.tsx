"use client";

import { SyncPersonToUser } from "./actions";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
    member: Member;
}

export default function SyncProfileModalClient({member}: Props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSync = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const result = await SyncPersonToUser();
            
            if (result.success) {
                router.push('/');
            } else {
                setError(result.error || 'Error durante la sincronización');
            }
        } catch (err) {
            setError('Error inesperado');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
                <h2 className="text-2xl font-bold mb-4">🍌 ATENCIÓN 🐒</h2>
                <p className="mb-3">
                    Parece que te registraron antes en el club <b>{member.club_name}</b> como <b>{member.name + " " + member.surname}</b>.
                </p>
                <p className="mb-6">¿Sos vos mape?</p>
                
                {error && (
                    <p className="text-red-500 mb-4">{error}</p>
                )}
                
                <div className="flex justify-center space-x-4">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
                        onClick={() => router.push('/club/select')}
                        disabled={isLoading}
                    >
                        Cancelar
                    </button>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
                        onClick={handleSync}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Procesando...' : 'Confirmar'}
                    </button>
                </div>
            </div>
        </div>
    );
}