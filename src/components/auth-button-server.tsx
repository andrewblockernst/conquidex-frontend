import { createClient } from '@/utils/supabase/server'
import { AuthButton } from './auth-button-client'


export async function AuthButtonServer() {
    // PASAMOS LAS COOKIES CORRECTAMENTE
    const supabase = await createClient(); // CREAR UNA INSTANCIA DE SUPABASE CON LAS COOKIES DE LA PETICIÓN
    const { data: { session } } = await supabase.auth.getSession() 


    return <AuthButton session = {session}/>

}