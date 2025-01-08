import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

//METODO DE NEXTJS PARA EVITAR CACHEE DE FORMA ESTATICA LA RUTA Y QUE SIEMPRE SE EJECUTE EN EL SERVIDOR

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  if (code === null) {
    console.info('No code found in query string, redirecting to login');
    return NextResponse.redirect(`${requestUrl.origin}/login`);
  }

  const { data: { session }, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);

  if (sessionError) {
    console.error('Error fetching session:', sessionError.message);
    return NextResponse.redirect(`${requestUrl.origin}/login`);
  }

  if (!session) {
    console.info('No session found, redirecting to login');
    return NextResponse.redirect(`${requestUrl.origin}/login`);
  }

  const { user } = session;
  const { data: person, error: personError } = await supabaseAdmin
    .from('persons')
    .select('id, email, role_id, auth_user_uuid, club_id')
    .eq('email', user.email)
    .single();

  if (personError || !person) {
    console.error('Error fetching person:', personError?.message);
    return NextResponse.redirect(`${requestUrl.origin}/login`);
  }

  if (person.role_id > 0) { // no es guest
    if (!person.auth_user_uuid) { // no tiene usuario
      console.log('No tiene usuario');
      return NextResponse.redirect(requestUrl.origin);
    } else if (person.auth_user_uuid === user.id) { //tiene usuario y es el mismo
      console.log('Tiene usuario y es el mismo');
      return NextResponse.redirect(requestUrl.origin);
    }
  } else { // es guest
    if (person.club_id === 0) { // no tiene club
      console.log('No tiene club');
      return NextResponse.redirect(`${requestUrl.origin}/club/select`);
    } else { // tiene club
      console.log('Tiene club');
      return NextResponse.redirect(requestUrl.origin);
    }
  }
}
