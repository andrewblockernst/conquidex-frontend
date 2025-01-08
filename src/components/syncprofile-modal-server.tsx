import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import SyncProfileModalClient from "./syncprofile-modal-client";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function SyncProfileModalServer() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session) {
    console.error("Error obteniendo sesión o sesión inexistente:", error?.message);
    return null; // No muestra nada si no hay sesión
  }

  const { user } = session;
  const { data: person, error: personError } = await supabaseAdmin
    .from('persons')
    .select('id, email, role_id, auth_user_uuid, club_id')
    .eq('email', user.email)
    .single();

  if (personError || !person) {
    console.error('Error fetching person:', personError?.message);
    return null; // No muestra nada si hay error al obtener la persona
  }

  let showModal = false;

  if (person.role_id > 0) { // no es guest
    if (!person.auth_user_uuid || person.auth_user_uuid !== user.id) { // no tiene usuario o no es el mismo
      showModal = true;
    }
  } else { // es guest
    if (person.club_id === 0) { // no tiene club
      showModal = true
    }
  }

  return <SyncProfileModalClient showModal={showModal} />;
}