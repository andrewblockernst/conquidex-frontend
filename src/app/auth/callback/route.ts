import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

//METODO DE NEXTJS PARA EVITAR CACHEE DE FORMA ESTATICA LA RUTA Y QUE SIEMPRE SE EJECUTE EN EL SERVIDOR

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  if (code !== null) {
    // Intercambia el código por una sesión
    await supabase.auth.exchangeCodeForSession(code);
  }

  const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data: person, error: personError } = await supabase
        .from('persons_emails')
        .select('person_id')
        .eq('email', user.email)
        .single();

      if (personError) {
        console.error('Error fetching person:', personError.message);
        return NextResponse.redirect('/login');
      }

      if (person) {
        
        return NextResponse.redirect(requestUrl.origin);
      } else {
        return NextResponse.redirect('/club/select');
      }
    }
  

 
  return NextResponse.redirect(requestUrl.origin);
}
