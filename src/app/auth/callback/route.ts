import { createClient } from '@/utils/supabase/server'
import { NextResponse, type NextRequest } from "next/server";
import { supabaseAdmin } from "@/utils/supabase/service-role";

//METODO DE NEXTJS PARA EVITAR CACHEE DE FORMA ESTATICA LA RUTA Y QUE SIEMPRE SE EJECUTE EN EL SERVIDOR

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  const supabase = await createClient();

  if (code === null) {
    console.info('No code found in query string, redirecting to login');
    return NextResponse.redirect(`${origin}/login`);
  }

  const { error: sessionError } = await supabase.auth.exchangeCodeForSession(code);
  if (sessionError) {
    console.error('Error fetching session:', sessionError.message);
    return NextResponse.redirect(`${origin}/login`);
  }
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError) {
    console.error('Error fetching user:', userError.message);
    return NextResponse.redirect(`${origin}/login`);
  }
  if (!user) {
    console.error('User is undefined, redirecting to login');
    return NextResponse.redirect(`${origin}/login`);
  }
  if (!user.email) {
    console.error('User email is undefined, redirecting to login');
    return NextResponse.redirect(`${origin}/login`);
  }

  const { data: guest} = await supabaseAdmin
    .from('guests')
    .select('id, email, club_id')
    .eq('email', user.email)
    .single();

  if(!guest || guest.club_id !== 0){
    return NextResponse.redirect(`${origin}/home`);
  }

  const { data: member, error: memberError } = await supabaseAdmin
  .from('members')
  .select("*")
  .eq('email', user.email)
  .single();
  
  if (memberError) {
    console.error('Error fetching member:', memberError?.message);
    return NextResponse.redirect(`${origin}/home`);
  }
  if(!member) return NextResponse.redirect(`${origin}/club/select`);

  return NextResponse.redirect(`${origin}/home`);
}
