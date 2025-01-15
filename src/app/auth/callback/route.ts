import { createClient } from '@/utils/supabase/server'
import { NextResponse, type NextRequest } from "next/server";
import { supabaseAdmin } from "../../../utils/supabase/supabaseAdmin";
import { cookies } from 'next/headers';

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

  const { data: { session }, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);

  if (sessionError) {
    console.error('Error fetching session:', sessionError.message);
    return NextResponse.redirect(`${origin}/login`);
  }

  if (!session) {
    console.info('No session found, redirecting to login');
    return NextResponse.redirect(`${origin}/login`);
  }

  const { user } = session;
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
    return NextResponse.redirect(origin);
  }

  const { data: member, error: memberError } = await supabaseAdmin
  .from('members')
  .select("*")
  .eq('email', user.email)
  .single();
  
  if (memberError) {
    console.error('Error fetching member:', memberError?.message);
    return NextResponse.redirect(origin);
  }
  if(!member) return NextResponse.redirect(`${origin}/club/select`);

  const serializedMember = JSON.stringify(member);
  const cookieStore = await cookies();
  cookieStore.set('member', serializedMember, { path: '/', httpOnly: true });

  return NextResponse.redirect(origin);

  // // Crear la respuesta con la redirección apropiada
  // let redirectUrl = origin;
  
  // if (person.role_id > 0) { // no es guest
  //   console.log('rol no es guest');
  //   if (!person.auth_user_uuid) {
  //     console.log('No tiene usuario');
  //     redirectUrl = `${origin}`;
  //   }
  //   else if(person.auth_user_uuid === user.id){
  //     console.log('Tiene usuario y es el mismo');
  //   }
  // } else { // es guest
  //   console.log('rol es guest');
  //   if (person.club_id === 0) { // no tiene club
  //     console.log('no tiene club');
  //     redirectUrl = `${origin}/club/select`;
  //   }
  // }

  // // Crear la respuesta y establecer la cookie
  // const response = NextResponse.redirect(redirectUrl);
  
  // // Serializar los datos de la persona
  // const serializedPerson = JSON.stringify(person);
  
  // // Establecer la cookie en la respuesta
  // response.cookies.set({
  //   name: 'person',
  //   value: serializedPerson,
  //   path: '/',
  //   httpOnly: true
  // });
}
