import { createServerComponentClient } from '@supabase/auth-helpers-nextjs' // CONEXION A SUPABASE
import { cookies } from 'next/headers' // NOS PERMITE ACCEDER A LAS PETICIONES Y SUS COOKIES (SABIENDO SI ESTAN CONECTADOS, ETC)
import { AuthButton } from './auth-button-client'

export async function AuthButtonServer() {
    // PASAMOS LAS COOKIES CORRECTAMENTE
    const supabase = createServerComponentClient({ cookies }) // CREAR UNA INSTANCIA DE SUPABASE CON LAS COOKIES DE LA PETICIÓN
    const { data: { session } } = await supabase.auth.getSession() 


    return <AuthButton session = {session}/>

}