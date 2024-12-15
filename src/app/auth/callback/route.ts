import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {NextResponse, type NextRequest} from 'next/server'


//METODO DE NEXTJS PARA EVITAR CACHEE DE FORMA ESTATICA LA RUTA Y QUE SIEMPRE SE EJECUTE EN EL SERVIDOR

export const dynamic = 'force-dynamic'


export async function GET (request: NextRequest) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    
    if (code !== null) {
        const supabase = createRouteHandlerClient({cookies})
        //CODIGO QUE LE PASAMOS POR URL, DEVOLVIENDO UNA SESION DEL USUARIO
        await supabase.auth.exchangeCodeForSession(code)
    }

    return NextResponse.redirect(requestUrl.origin)
}