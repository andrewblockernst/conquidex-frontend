"use client";

import { useEffect, useRef, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { useSyncModal } from "@/contexts/SyncModalContext";
import FilterButton from "@/components/buttons/filter-button";
import { PersonList } from "../../person/person-table/person-list";
import Button from "@/components/buttons/button";
import Link from "next/link";
import SearchButton from "@/components/search-input";
import { useClub } from "@/contexts/ClubContext";

export default function ClubView() {
  const { club, loading: userLoading, user } = useUser();
  const { loading: syncLoading } = useSyncModal();
  const { unitsData, classesData, loading } = useClub();
  const [groupBy, setGroupBy] = useState<"units" | "classes">("units");
  const [searchTerm, setSearchTerm] = useState<string>("");

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
            <Button>Buscar club</Button>
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
