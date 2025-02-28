'use client'

import AVATARS from '@/constants/avatars';
import { useCallback, useEffect, useState } from 'react'
import { getMemberData } from './actions';
import ClassCard from '../cards/class-card';
import SettingsButton from './settings-button';
import Spinner1 from '../spinners/spinner-1';
import Button from '../buttons/button';
import { MoveLeft } from 'lucide-react';
import { useNavigationHistory } from '@/hooks/navigation-history';

interface Props{
    member: Member;
}

function ProfileCard({member}: Props) {
  const [memberData, setMemberData] = useState<MemberData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  
  const { goBack } = useNavigationHistory();

  useEffect(() => {
    async function loadMemberData() {
      try {
        const data = await getMemberData(member.id!)
        setMemberData(data)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error al cargar los datos')
      } finally {
        setLoading(false)
      }
    }

    loadMemberData()
  }, [member.id])

  const roleNameMap: { [key: string]: string } = {
    PATHFINDER: 'CONQUISTADOR',
    COUNSELOR: 'CONSEJERO',
    STAFF: 'DIRECTIVO',
  };
  const isGuest = member.role_name === 'GUEST';
  const avatar = AVATARS[member.role_id ?? 0] || AVATARS[0];
  const friendlyRoleName = isGuest ? 'Usuario' : (roleNameMap[member.role_name ?? ''] || member.role_name);
  const activeClasses = memberData?.classes?.filter((c) => !c.is_completed);
  
  return (
   <div className="w-full max-w-xl h-screen flex justify-center mx-auto p-4 border-2 border-gray-200 shadow-lg">
      <div className="absolute left-4 top-4 z-10">
        <Button onClick={goBack}>
        <MoveLeft size={32} />
        </Button>
      </div>
    <div className='w-full flex flex-col items-center relative'>
        <img
        src={avatar}
        alt={member.name! + ' ' + member.surname!}
        className="w-32 h-32 rounded-full"
        />

          <div className='absolute right-0 top-0'>
            <SettingsButton memberId={member.id}></SettingsButton>
          </div>

        <h1 className="text-3xl font-bold mt-4">
        {member.name+" "+(member.nickname ? member.nickname : "")+" "+
        member.surname}</h1>
        <p className="text-gray-600">{friendlyRoleName}</p>
        <div className='w-full flex flex-col items-start'>
          <p className="mt-4 text-gray-800"> <b>Email: </b>{member.email}</p>
          <p className="mt-4 text-gray-800"><b>Club: </b>{member.club_name}</p>
          {/*INFO ADICIONAL FETCHEADA POR CLIENTE*/}
          {loading ? <div className='flex items-center justify-center w-full pt-6'><Spinner1 /></div> :
          <>
            <p className="mt-4 text-gray-800"><b>Clase actual: </b></p>
            <div className="w-full space-y-2">
              {activeClasses ? activeClasses.map((c) =>
                <ClassCard key={member.id+"-"+c.id} userClass={c}/>
              ) :
              <div className="flex items-center bg-gray-200 my-2 p-4 rounded-lg shadow-[4px_4px_0_0_#323232] border-2 border-slate-800">
                  <h2 className="text-lg font-semibold">
                      Sin clases activas
                  </h2>
              </div>}
            </div>
          </>
          }
            
        </div>
    </div>
  </div>
  )
}

export default ProfileCard