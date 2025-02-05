'use client'

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from '@/utils/supabase/client'
import { useUser } from "@/contexts/UserContext";
import { Header } from "@/components/header/header";
import PersonTable from "@/components/person-table/person-table";
import { AuthButton } from "@/components/buttons/auth-button";
import { useSyncModal } from "@/contexts/SyncModalContext";

export default function ClubView() {
    const supabase = createClient();
    const { user, activeProfile, loading: userLoading } = useUser();
    const { loading: syncLoading } = useSyncModal();
    const [groupBy, setGroupBy] = useState<'units' | 'classes'>('units');
    const [data, setData] = useState<UnitGroup[]>([]);
    const [dataLoading, setDataLoading] = useState(true);
    const router = useRouter();

    const fetchData = useCallback(async (clubId: number) => {
        setDataLoading(true);
        try {
            const { data, error } = await supabase
                .rpc(groupBy === 'units' ? 'get_persons_by_unit' : 'get_persons_by_class', { 
                    input_club_id: clubId 
                })
                .select('*');
            
            if (error) throw error;
            setData(data as UnitGroup[]);
        } finally {
            setDataLoading(false);
        }
    }, [groupBy, supabase]);

    useEffect(() => {
        if (userLoading || syncLoading) return;

        if (!user) {
            router.push("/login");
            return;
        }

        if (!activeProfile) {
            return;
        }

        if (activeProfile.club_id === 0) {
            router.push("/club/select");
        } else {
            router.push("/home");
        }
    }, [user, activeProfile, userLoading, syncLoading, router]);

    useEffect(() => {
        if (activeProfile?.club_id) {
            fetchData(activeProfile.club_id);
        }
    }, [activeProfile?.club_id, fetchData]);

    if (userLoading || syncLoading || dataLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center min-h-screen p-4 bg-cover bg-center">
            <main className="flex flex-col items-center w-full max-w-3xl">
                <div className="w-full mb-6">
                    <button 
                        onClick={() => setGroupBy(prev => prev === 'units' ? 'classes' : 'units')}
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Filtrar por {groupBy === 'units' ? 'Clases' : 'Unidades'}
                    </button>
                </div>
                <PersonTable data={data} groupType={groupBy} />
            </main>
        </div>
    );
}
