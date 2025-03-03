'use server'

import { createClient } from "@/utils/supabase/server";

export async function fetchClubData(clubId: number): Promise<[UnitGroup[], ClassGroup[]]> {
    const supabase = await createClient();
    const [unitsResponse, classesResponse] = await Promise.all([
        supabase
          .rpc("get_persons_by_unit", {
            input_club_id: clubId,
          })
          .select("*"),

        supabase
          .rpc("get_persons_by_class", {
            input_club_id: clubId,
          })
          .select("*"),
      ]);

      if (unitsResponse.error || classesResponse.error){
        throw new Error("Error fetching data. Try again.");
      }

      let validUnits, validClasses;

      if (unitsResponse.data) {
         validUnits = unitsResponse.data.filter(
          (unit) => unit.unit_id !== undefined && unit.club_id
        );
      }
      
      if (classesResponse.data) {
        validClasses = classesResponse.data.filter(
          (cls) => cls.class_id !== undefined && cls.club_id
        );
      }
    return [validUnits as UnitGroup[], validClasses as ClassGroup[]]
}