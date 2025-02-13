import AVATARS from '@/constants/avatars';
import React from 'react'

interface Props{
    member: Member;
}

function ProfileCard({member}: Props) {

    const avatar = AVATARS[member.role_id!] || AVATARS[0];
  return (
   <div className="max-w-2xl h-screen flex justify-center mx-auto p-4 border-2 border-gray-200 shadow-lg">
    <div>
        <img
        src={avatar}
        alt={member.name!}
        className="w-32 h-32 rounded-full"
        />
        <h1 className="text-3xl font-bold mt-4">{member.name}</h1>
        <p className="text-gray-600">{member.role_name}</p>
        <p className="mt-4 text-gray-800">{member.club_name}</p>
    </div>
  </div>
  )
}

export default ProfileCard