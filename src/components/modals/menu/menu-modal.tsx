import PersonForm from '@/components/forms/person-form';
import { useState } from 'react';
import BaseModal from '../base-modal';
import Spinner1 from '@/components/spinners/spinner-1';
import UnitForm from '@/components/forms/unit-form';
import Button from '@/components/buttons/button';
import Link from 'next/link';

interface Props{
    isOpen: boolean;
    onClose: () => void;
}

const PersonCrudModal = ({ isOpen, onClose }: Props) => {
    const [step, setStep] = useState('select'); // 'select', 'createMember', 'createUnit', 'createEvent'
    const [loading, setLoading] = useState(false);


    if (!isOpen) return null;

    return (
        <>
        <BaseModal title='Menú' onClose={onClose}>
            {step === 'select' && (
                <div className="flex flex-col items-center pb-6">
                    <h2 className="text-xl font-bold mb-4">¿Qué deseas crear?</h2>
                    <i className="text-gray-700">ⓘ Es recomendable primero crear una unidad y luego sus miembros.</i>
                    <div className="p-4 w-full flex flex-col space-y-4">
                        <Button variant="success" onClick={()=> setStep('createUnit') }>CREAR UNIDAD</Button>
                        <Button variant="primary" onClick={()=> setStep('createMember') }>CREAR MIEMBRO</Button>
                        <Link href={`/calendar?new=y#event-form`} onClick={onClose}>
                            <Button variant="secondary" >CREAR EVENTO</Button>
                        </Link>
                    </div>
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
                <div className='max-h-96 overflow-y-auto'> {/* LIMITAR ALTURA DEL FORM */}
                <PersonForm onClose={() => setStep('select')} ></PersonForm>
                </div>
            </BaseModal>
        )}
        {step === 'createUnit' && (
            <BaseModal title="Crear Unidad" onClose={() => setStep('select')}>
                <UnitForm onClose={() => setStep('select')} ></UnitForm>
            </BaseModal>
        )}
        
        </>
    );
};

export default PersonCrudModal;