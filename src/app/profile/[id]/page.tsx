import { createClient } from '@supabase/supabase-js';
import { createClient as createSupabase } from '@/utils/supabase/server';
import ProfileCard from '@/components/profile/profile-card';
import Button from '@/components/buttons/button';
import Link from 'next/link';
import { MoveLeft } from 'lucide-react';

export async function generateStaticParams() {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: members } = await supabase
    .from('members')
    .select('id');

  return members?.map((member) => ({
    id: member.id.toString(),
  })) || [];
}

export default async function MemberPage({ params }: { params: { id: number } }) {
    const supabase = await createSupabase();
    
    // Esperar a que params esté disponible
    const parsedParams = await params;
    const memberId = parsedParams.id;
  
    const { data: member } = await supabase
      .from('members')
      .select('*')
      .eq('id', memberId)
      .single();
  
    if (!member) return <div>Miembro no encontrado</div>;
  
    return (
        <div className="relative max-w-2xl mx-auto">
        <div className='absolute left-4 top-4 z-10'>
            <Link href={`/home`}>
                <Button><MoveLeft size={32} /></Button>
            </Link>
        </div>
        <ProfileCard member={member} />
        </div>
    );
  }