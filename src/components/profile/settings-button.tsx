import { useState } from 'react'
import Button from '../buttons/button'
import { SettingsIconWhite } from '../icons'
import { useUser } from '@/contexts/UserContext';
import { AuthButton } from '../buttons/auth-button';

interface Props{
    memberId: Member['id']
  }

function SettingsButton({memberId}: Props) {
    const [isCardVisible, setIsCardVisible] = useState(false)
    const { activeProfile } = useUser();
    
    const toggleCardVisibility = () => {
        setIsCardVisible(!isCardVisible);
    };
  return (
    <>
    <div className='relative'>
        <Button onClick={toggleCardVisibility}><SettingsIconWhite></SettingsIconWhite></Button>
    </div>
    {isCardVisible && (
        <div className="absolute z-10 w-44 p-4 mt-2 right-0 bg-yellow-500 border-2 border-yellow-800 rounded-lg shadow-[4px_4px_0_0_#323232] space-y-2">
          <div className="flex flex-col mt-2 mb-2 space-y-2">
            {(memberId === activeProfile?.id || activeProfile?.role_id! >= 2) &&
                <Button>Editar perfil</Button>
            }
            <Button buttonStyle="flex items-center justify-center">
              <span>Soporte</span>
            </Button>
            {memberId === activeProfile?.id &&
            <AuthButton />
            } 
          </div>
        </div>
      )}
    </>
  )
}

export default SettingsButton