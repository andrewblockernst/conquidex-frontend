import PersonForm from '@/components/forms/person-form';
import { useState } from 'react';
import BaseModal from '../base-modal';
import Spinner1 from '@/components/spinners/spinner-1';

interface Props{
    isOpen: boolean;
    onClose: () => void;
}

const PersonCrudModal = ({ isOpen, onClose }: Props) => {
    const [step, setStep] = useState('select'); // 'select', 'createMember', 'createUnit'
    const [loading, setLoading] = useState(false);


    if (!isOpen) return null;

    return (
        <>
        <BaseModal title='Menú' onClose={onClose}>
            {step === 'select' && (
                <div className="flex flex-col items-center pb-6">
                    <h2 className="text-xl font-bold mb-4">¿Qué deseas crear?</h2>
                    <button
                        onClick={() => setStep('createMember')}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out mb-2 w-full"
                    >
                        CREAR MIEMBRO
                    </button>
                    <button
                        onClick={() => setStep('createUnit')}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out w-full"
                    >
                        CREAR UNIDAD
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out mt-4 w-full"
                    >
                        Cerrar
                    </button>
                </div>
            )}
            {loading && (
                <Spinner1 />
            )}
        </BaseModal>
        {step === 'createMember' && (
            <BaseModal title="Crear Miembro" onClose={() => setStep('select')}>
                <PersonForm onClose={() => setStep('select')} ></PersonForm>
            </BaseModal>
        )}
        
        </>
    );
};

export default PersonCrudModal;