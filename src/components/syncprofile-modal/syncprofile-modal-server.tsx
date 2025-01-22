import { createClient } from "@/utils/supabase/server";
import SyncProfileModalClient from "./syncprofile-modal-client";
import { supabaseAdmin } from "@/utils/supabase/service-role";

interface Props{
  openedByDefault?: boolean;
}

export default async function SyncProfileModalServer({openedByDefault}: Props) {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    console.error("Error obteniendo usuario o usuario inexistente:", error?.message);
    return null; // No muestra nada si no hay usuario
  }

  const { data: member, error: memberError } = await supabaseAdmin.from("members").select().eq("email", user.email!).single();
  if (memberError) {
    console.error("Error al obtener miembro:", memberError.message);
    return null; // No muestra nada si hay error al obtener el miembro
  }
  if(!member || member.auth_user_uuid === user.id) return null; // Si el usuario no tiene perfil miembro, no se muestra el modal

  // abrir sin importar si ya tiene club
  if(openedByDefault) return <SyncProfileModalClient member={member}/>;

  // verificar si el invitado ya tiene club
  const {data: guest, error: guestError} = await supabase.from("guests").select().eq("auth_user_uuid", user.id).single();
  if(guestError) {
    console.error("Error al obtener invitado:", guestError.message);
    return null; // No muestra nada si hay error al obtener el invitado
  }
  if(guest.club_id!==0) return null; // Si el invitado ya tiene club, no se muestra el modal
  return <SyncProfileModalClient member={member}/>;
}