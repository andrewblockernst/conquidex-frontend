import { createClient } from "@/utils/supabase/server";
import SyncProfileModalClient from "./syncprofile-modal-client";
import { cookies } from 'next/headers';


export default async function SyncProfileModalServer() {
  const supabase = await createClient();

  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session) {
    console.error("Error obteniendo sesión o sesión inexistente:", error?.message);
    return null; // No muestra nada si no hay sesión
  }

  const { user } = session;

  const cookieStore = await cookies();
  const memberCookie = cookieStore.get('member');
  const member: Member = memberCookie ? JSON.parse(memberCookie.value) : null;

  if(!member || member.auth_user_uuid === user.id) return null; // Si el usuario no tiene perfil miembro, no se muestra el modal

  return <SyncProfileModalClient member={member}/>;
}