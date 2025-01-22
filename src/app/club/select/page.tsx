import ClubTableServer from "@/components/clubs-table/clubs-table-server";
import React from "react";
import { AuthButton} from "../../../components";
import { Header } from "@/components/header/header";
// import { redirect } from "next/navigation";
// import { createClient } from "@/utils/supabase/server";

export default function ClubSelect() {
    // const supabase = await createClient();
    //   //Verifico que el usuario puede cambiar su club
    // const {data: { user }, error: userError} = await supabase.auth.getUser();
    // if (userError) {
    //     console.error('Error al obtener el usuario:', userError.message);
    //     return redirect('/');
    // }
    // if (!user) return redirect('/login');

    // const {data: person, error: personError} = await supabase.from('persons').select().eq('auth_user_uuid', user?.id).single();
    // if (personError) {
    //     console.error('Error al obtener la persona:', personError.message);
    //     return redirect('/');
    // }
    // if (!person) return redirect('/');

    // if (person.last_enrollment){
    //     const lastEnrollmentDate = new Date(person.last_enrollment);
    //     const today = new Date();
    //      // Restar 3 meses a la fecha actual
    //      const threeMonthsAgo = new Date(today);
    //      threeMonthsAgo.setMonth(today.getMonth() - 3);
    //     // Si la fecha de la última inscripción es anterior a 3 meses atrás, redirigir
    //     if (lastEnrollmentDate < threeMonthsAgo) {
    //     return redirect('/');
    //     }
    // }
  
    return (
    <>
        <Header />
        <div className="flex flex-col items-center">
            <h1 className="text-center m-10">Club Select</h1>
            <ClubTableServer />
            <AuthButton />
        </div>
    </>
    );
}
