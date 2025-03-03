'use client'

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useUser } from "./UserContext";
import { fetchClubData } from "@/lib/actions/club.actions";

interface ClubContextType{
    unitsData: UnitGroup[];
    classesData: ClassGroup[];
    units: Unit[];
    loading: { units: boolean; classes: boolean };
    refreshAllData: () => void;
}

const ClubContext = createContext<ClubContextType | undefined>(undefined);

function convertUnitGroupToUnit(unitGroup: UnitGroup): Unit {
    return {
      id: unitGroup.unit_id,
      name: unitGroup.unit_name,
      club_id: unitGroup.club_id,
      color: unitGroup.color
    };
  }

export const ClubProvider = ({children}: {children: React.ReactNode}) => {
  const { club } = useUser();
  const [unitsData, setUnitsData] = useState<UnitGroup[]>([]);
  const [classesData, setClassesData] = useState<ClassGroup[]>([]);
  const [loading, setLoading] = useState({ units: true, classes: true });
  const [toggleRefresh, setToggleRefresh] = useState(false);

  useEffect(() => {
      const fetchAllData = async () => {
        try {
          if (!club?.id) return;
            setLoading({ units: true, classes: true });
            const [units, classes] = await fetchClubData(club.id);
            setUnitsData(units);
            setClassesData(classes);
        } catch (error) {
          console.error(error);
        } finally {
            setLoading({ units: false, classes: false });
        }
      };
  
      fetchAllData();
    }, [club?.id, toggleRefresh]);

    const refreshAllData = () => {
        setToggleRefresh(!toggleRefresh);
    }

    const value = useMemo(() => (
        {
            unitsData,
            classesData,
            units: unitsData.map(convertUnitGroupToUnit),
            loading,
            refreshAllData
        }
    ), [unitsData, classesData, loading, refreshAllData]);
return (
    <ClubContext.Provider value={value}>
        {children}
    </ClubContext.Provider>
    )
}

export const useClub = () => {
    const context = useContext(ClubContext);
    if (context === undefined) {
        throw new Error("useClub must be used within a ClubProvider");
    }
    return context;
}