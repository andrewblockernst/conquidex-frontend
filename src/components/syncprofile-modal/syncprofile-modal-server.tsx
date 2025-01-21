import { createClient } from "@/utils/supabase/server";
import SyncProfileModalClient from "./syncprofile-modal-client";
import { cookies } from 'next/headers';

export default async function SyncProfileModalServer() {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    console.error("Error obteniendo usuario o usuario inexistente:", error?.message);
    return null; // No muestra nada si no hay usuario
  }

  const cookieStore = await cookies();
  const memberCookie = cookieStore.get('member');
  const member: Member = memberCookie ? JSON.parse(memberCookie.value) : null;

  if(!member || member.auth_user_uuid === user.id) return null; // Si el usuario no tiene perfil miembro, no se muestra el modal

  return <SyncProfileModalClient member={member}/>;
}