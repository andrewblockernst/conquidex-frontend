import Button from '../buttons/button';
import AVATARS from '@/constants/avatars';
import { GoogleIcon } from '../icons';
import { SettingsIcon } from 'lucide-react';
import { AuthButton } from '../buttons/auth-button';

interface Props {
  member: Member;
}

//MAPEEEEO DE ROLES PARA AMIGABILIDAD DE LOS USUARIOS
const roleNameMap: { [key: string]: string } = {
  PATHFINDER: 'CONQUISTADOR',
  COUNSELOR: 'CONSEJERO',
  STAFF: 'DIRECTIVO',
};

const MyProfileCard: React.FC<Props> = ({ member }) => {
  const isGuest = member.role_name === 'guest';
  const avatar = AVATARS[member.role_id ?? 0] || AVATARS[0];
  const friendlyRoleName = isGuest ? 'Usuario' : (roleNameMap[member.role_name ?? ''] || member.role_name);

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg p-6 flex justify-center items-center">
      <div className="flex flex-col items-center">
        <img src={avatar} alt={member.name ?? 'Profile Avatar'} className="w-24 h-24 rounded-full mb-4" />

        <h2 className="text-xl font-bold mb-2 text-center">{member.name + ' ' + member.surname}</h2>

        <div className="flex items-center gap-2 mb-2 text-gray-600 justify-center">
          <GoogleIcon className='w-5'/>
          <span>{member.email}</span>
        </div>

        <div className="text-gray-600 mb-6 text-center">
          {friendlyRoleName} en el club: {member.club_name}
        </div>

        {!isGuest && (
          <div className="flex gap-4 w-full justify-center">
            <Button>Editar Perfil</Button>
            <AuthButton/>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfileCard;
