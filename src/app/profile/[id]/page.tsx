import { createClient } from "@supabase/supabase-js";
import { createClient as createSupabase } from "@/utils/supabase/server";
import ProfileCard from "@/components/profile/profile-card";
import MyProfileCard from "@/components/profile/myprofile-card";
import Button from "@/components/buttons/button";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

export async function generateStaticParams() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: members } = await supabase.from("members").select("id");

  return (
    members?.map((member) => ({
      id: member.id.toString(),
    })) || []
  );
}

export default async function MemberPage({
  params,
}: {
  params: { id: number };
}) {
  const supabase = await createSupabase();

  // Esperar a que params esté disponible
  const parsedParams = await params;
  const memberId = parsedParams.id;

  let { data: member } = await supabase
    .from("members")
    .select("*")
    .eq("id", memberId)
    .single();

  if (!member){
    member = {
      auth_user_uuid: null,
      club_id: null,
      club_name: null,
      email: null,
      id: null,
      last_enrollment: null,
      name: "Perfil no encontrado",
      nickname: null,
      role_id: null,
      role_name: null,
      surname: "",
    };
  } 
  return (
    <div className="w-full relative flex items-center justify-center min-h-screen max-w-2xl mx-auto">
      <div className="w-full flex justify-center items-center">
      <ProfileCard member={member} />
      </div>
    </div>
  );
  
}
