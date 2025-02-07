"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/contexts/UserContext";
import { useSyncModal } from "@/contexts/SyncModalContext";
import FilterButton from "@/components/buttons/filter-button";


//LLAMADO DEL TIPO DE LISTA (UNIDADES o TARJETAS) desde FilterButton
const optionsMap = {
  units: "Unidades",
  classes: "Tarjetas",
};
import { ClassList } from "../person-table/class-list/class-list";
import { UnitList } from "../person-table/unit-list/unit-list";

export default function ClubView() {
    const supabase = createClient();
    const { user, activeProfile, loading: userLoading } = useUser();
    const { loading: syncLoading } = useSyncModal();
    const [groupBy, setGroupBy] = useState<'units' | 'classes'>('units');
    
    // Separar estados para unidades y clases
    const [unitsData, setUnitsData] = useState<UnitGroup[]>([]);
    const [classesData, setClassesData] = useState<ClassGroup[]>([]);
    const [loading, setLoading] = useState({ units: true, classes: true });

  // Efectos separados para cada tipo de datos
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchAllData = async () => {
        if (!activeProfile?.club_id) return;

        setLoading({ units: true, classes: true });
        
        try {
            // Ejecutar ambas consultas en paralelo
            const [unitsResponse, classesResponse] = await Promise.all([
                supabase
                    .rpc('get_persons_by_unit', { 
                        input_club_id: activeProfile.club_id 
                    })
                    .select('*')
                    .abortSignal(controller.signal),
                
                supabase
                    .rpc('get_persons_by_class', { 
                        input_club_id: activeProfile.club_id 
                    })
                    .select('*')
                    .abortSignal(controller.signal)
            ]);

            if (isMounted) {
                // Validar y setear unidades
                if (!unitsResponse.error && unitsResponse.data) {
                    const validUnits = unitsResponse.data.filter(
                        unit => unit.unit_id !== undefined && unit.club_id
                    );
                    setUnitsData(validUnits as UnitGroup[]);
                }
                
                // Validar y setear clases
                if (!classesResponse.error && classesResponse.data) {
                    const validClasses = classesResponse.data.filter(
                        cls => cls.class_id !== undefined  && cls.club_id
                    );
                    setClassesData(validClasses as ClassGroup[]);
                }
              }
          } catch (error) {
              console.error("Error fetching data:", error);
          } finally {
              if (isMounted) {
                  setLoading({ units: false, classes: false });
              }
          }
      };

      fetchAllData();

      return () => {
          isMounted = false;
          controller.abort();
      };
  }, [activeProfile?.club_id]); // Solo depende del club_id

    const isLoading = userLoading || syncLoading || (groupBy === 'units' ? loading.units : loading.classes);
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
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    </div>
                ) : groupBy === 'units' ? (
                    <UnitList units={unitsData} />
                ) : (
                    <ClassList classes={classesData} />
                )}
            </main>
        </div>
    );
}
