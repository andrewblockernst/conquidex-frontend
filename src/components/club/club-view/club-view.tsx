"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/contexts/UserContext";
import { useSyncModal } from "@/contexts/SyncModalContext";
import FilterButton from "@/components/buttons/filter-button";
import { PersonList } from "../../person/person-table/person-list";
import Button from "@/components/buttons/button";
import Link from "next/link";
import SearchButton from "@/components/search-input";
import { CLUB_VIEW_REFRESH_EVENT } from "@/utils/events/events";

export default function ClubView() {
  const supabase = createClient();
  const { club, loading: userLoading, user } = useUser();
  const { loading: syncLoading } = useSyncModal();
  const [groupBy, setGroupBy] = useState<"units" | "classes">("units");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [unitsData, setUnitsData] = useState<UnitGroup[]>([]);
  const [classesData, setClassesData] = useState<ClassGroup[]>([]);
  const [loading, setLoading] = useState({ units: true, classes: true });

  useEffect(() => {
    console.log("ClubView mounted");
    return () => console.log("ClubView unmounted");
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchAllData = async () => {
      console.log("ClubView effect running with club_id:", club?.id);
      try {
        if (!club?.id) return;
        setLoading({ units: true, classes: true });
        const [unitsResponse, classesResponse] = await Promise.all([
          supabase
            .rpc("get_persons_by_unit", {
              input_club_id: club.id,
            })
            .select("*")
            .abortSignal(controller.signal),

          supabase
            .rpc("get_persons_by_class", {
              input_club_id: club.id,
            })
            .select("*")
            .abortSignal(controller.signal),
        ]);

        if (isMounted) {
          if (!unitsResponse.error && unitsResponse.data) {
            const validUnits = unitsResponse.data.filter(
              (unit) => unit.unit_id !== undefined && unit.club_id
            );
            setUnitsData(validUnits as UnitGroup[]);
          }

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

    const handleRefresh = () => {
      fetchAllData();
    };
    window.addEventListener(CLUB_VIEW_REFRESH_EVENT, handleRefresh);
    return () => {
      window.removeEventListener(CLUB_VIEW_REFRESH_EVENT, handleRefresh);
      isMounted = false;
      controller.abort();
    };
  }, [club?.id]);

  const isLoading =
    userLoading ||
    syncLoading ||
    (groupBy === "units" ? loading.units : loading.classes);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredUnits = searchTerm === "" ? unitsData :
  unitsData.filter((unit) =>
    unit.persons.some(
      (person) =>
        (person.name &&
          person.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (person.surname &&
          person.surname.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (person.nickname &&
          person.nickname.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  const filteredClasses = classesData.filter((cls) =>
    cls.persons.some(
      (person) =>
        (person.name &&
          person.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (person.surname &&
          person.surname.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (person.nickname &&
          person.nickname.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  if (!userLoading && !user) {
    return null; // No renderizar nada si no hay usuario autenticado y no está cargando
  }

  if (!club?.id && !isLoading) {
    return (
      <div className="flex w-full flex-col items-center justify-center min-h-screen p-4 bg-cover bg-center">
        <main className="flex flex-col items-center w-full max-w-3xl mb-16">
          <h1 className="text-2xl m-4">
            ¡Ups! Parece que todavía no formás parte de ningún club :(
          </h1>
          <Link href="/club/select">
            <Button buttonStyle="px-8">Buscar club</Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-cover bg-center">
      <main className="flex flex-col items-center w-full max-w-3xl">
        <div className="w-full mt-3 mb-2 flex justify-between items-center">
          <div className="flex-grow mr-2">
            <SearchButton onSearch={handleSearch} />
          </div>
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
          <PersonList group={filteredUnits} groupBy={"units"} />
        ) : (
          <PersonList group={filteredClasses} groupBy={"classes"} />
        )}
      </main>
    </div>
  );
}
