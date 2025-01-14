import { createClient } from '@/utils/supabase/server'
import { NextResponse, type NextRequest } from "next/server";
import { supabaseAdmin } from "../../../utils/supabase/supabaseAdmin";

//METODO DE NEXTJS PARA EVITAR CACHEE DE FORMA ESTATICA LA RUTA Y QUE SIEMPRE SE EJECUTE EN EL SERVIDOR

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  const supabase = await createClient();

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

  // Crear la respuesta con la redirección apropiada
  let redirectUrl = requestUrl.origin;
  
  if (person.role_id > 0) { // no es guest
    console.log('rol no es guest');
    if (!person.auth_user_uuid) {
      console.log('No tiene usuario');
      redirectUrl = `${requestUrl.origin}`;
    }
    else if(person.auth_user_uuid === user.id){
      console.log('Tiene usuario y es el mismo');
    }
  } else { // es guest
    console.log('rol es guest');
    if (person.club_id === 0) { // no tiene club
      console.log('no tiene club');
      redirectUrl = `${requestUrl.origin}/club/select`;
    }
  }

  // Crear la respuesta y establecer la cookie
  const response = NextResponse.redirect(redirectUrl);
  
  // Serializar los datos de la persona
  const serializedPerson = JSON.stringify(person);
  
  // Establecer la cookie en la respuesta
  response.cookies.set({
    name: 'person',
    value: serializedPerson,
    path: '/',
    httpOnly: true
  });

  return response;
}
