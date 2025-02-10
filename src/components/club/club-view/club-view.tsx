"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/contexts/UserContext";
import { useSyncModal } from "@/contexts/SyncModalContext";
import FilterButton from "@/components/buttons/filter-button";
import CircularMenuButton from "@/components/buttons/floating-menu";

//LLAMADO DEL TIPO DE LISTA (UNIDADES o TARJETAS) desde FilterButton
const optionsMap = {
  units: "Unidades",
  classes: "Tarjetas",
};

import { PersonList } from "../../person/person-table/person-list";
import Button from "@/components/buttons/button";
import Link from "next/link";

export default function ClubView() {
  const supabase = createClient();
  const { club, loading: userLoading } = useUser();
  const { loading: syncLoading } = useSyncModal();
  const [groupBy, setGroupBy] = useState<"units" | "classes">("units");

  // Separar estados para unidades y clases
  const [unitsData, setUnitsData] = useState<UnitGroup[]>([]);
  const [classesData, setClassesData] = useState<ClassGroup[]>([]);
  const [loading, setLoading] = useState({ units: true, classes: true });

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchAllData = async () => {
      try {
        if (!club?.id) return;
        setLoading({ units: true, classes: true });
        // Ejecutar ambas consultas en paralelo
        const [unitsResponse, classesResponse] = await Promise.all([
          supabase
            .rpc('get_persons_by_unit', { 
              input_club_id: club.id
            })
            .select("*")
            .abortSignal(controller.signal),

          supabase
            .rpc('get_persons_by_class', { 
              input_club_id: club.id
            })
            .select("*")
            .abortSignal(controller.signal),
        ]);

        if (isMounted) {
          // Validar y setear unidades
          if (!unitsResponse.error && unitsResponse.data) {
            const validUnits = unitsResponse.data.filter(
              (unit) => unit.unit_id !== undefined && unit.club_id
            );
            setUnitsData(validUnits as UnitGroup[]);
          }

          // Validar y setear clases
          if (!classesResponse.error && classesResponse.data) {
            const validClasses = classesResponse.data.filter(
              (cls) => cls.class_id !== undefined && cls.club_id
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
  }, [club?.id]); // Solo depende del club_id

  const isLoading = userLoading || syncLoading || (groupBy === 'units' ? loading.units : loading.classes);

  if (!club?.id && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-cover bg-center">
        <main className="flex flex-col items-center w-full max-w-3xl mb-16">
          <h1 className="text-2xl m-4">
            ¡Ups! Parece que todavía no formás parte de ningún club :(
          </h1>
          <Link href="/club/select">
            <Button className="px-8">Buscar club</Button>
          </Link>
        </main>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-cover bg-center">
      <main className="flex flex-col items-center w-full max-w-3xl">
        <div className="w-full mt-3 mb-2 pr-1 flex justify-between">
          <h1 className="text-2xl">
            {club?.name}: {optionsMap[groupBy]}
          </h1>
          <FilterButton
            onClick={(selectedOption) =>
              setGroupBy(selectedOption as "units" | "classes")
            }
            currentGroupBy={groupBy}
          />
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : groupBy === "units" ? (
          <PersonList group={unitsData} groupBy={"units"} />
        ) : (
          <PersonList group={classesData} groupBy={"classes"} />
        )}
      </main>
      {/* CircularMenuButton flotante */}
      <div className="fixed bottom-20 right-10 z-50">
        <CircularMenuButton />
      </div>
    </div>
  );
}
