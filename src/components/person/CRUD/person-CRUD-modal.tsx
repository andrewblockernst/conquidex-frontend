import { useState } from 'react';

const PersonCrudModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState('select'); // 'select', 'createMember', 'createUnit'
    const [personData, setPersonData] = useState({
        name: '',
        email: '',
        location: '',
        bio: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPersonData({ ...personData, [name]: value });
    };

    const handleSave = () => {
        // Aquí enviarías los datos actualizados a tu backend
        console.log('Saving person data:', personData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
            onClick={onClose}
        >
            <div
                className="relative top-20 mx-auto p-5 border w-11/12 md:w-96 shadow-lg rounded-md bg-white animate-slide-in-left"
                onClick={(e) => e.stopPropagation()}
            >
                {step === 'select' ? (
                    <div className="flex flex-col items-center pb-6">
                        <h2 className="text-2xl font-bold mb-4">Seleccione una opción</h2>
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
                ) : (
                    <div className="flex flex-col items-center pb-6">
                        <div className="w-full flex justify-start mb-4">
                            <button
                                onClick={() => setStep('select')}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                            >
                                Volver
                            </button>
                        </div>
                        <h2 className="text-2xl font-bold mb-4">CRUD Person</h2>
                        <input
                            type="text"
                            name="name"
                            value={personData.name}
                            onChange={handleInputChange}
                            placeholder="Name"
                            className="mb-2 p-2 border rounded w-full"
                        />
                        <input
                            type="email"
                            name="email"
                            value={personData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className="mb-2 p-2 border rounded w-full"
                        />
                        <input
                            type="text"
                            name="location"
                            value={personData.location}
                            onChange={handleInputChange}
                            placeholder="Location"
                            className="mb-2 p-2 border rounded w-full"
                        />
                        <textarea
                            name="bio"
                            value={personData.bio}
                            onChange={handleInputChange}
                            placeholder="Bio"
                            rows="4"
                            className="mb-2 p-2 border rounded w-full"
                        />
                        <div className="flex justify-between w-full">
                            <button
                                onClick={handleSave}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                            >
                                Save
                            </button>
                            <button
                                onClick={onClose}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PersonCrudModal;