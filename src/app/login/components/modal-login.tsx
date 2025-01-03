

import React from 'react'

interface ModalLoginProps {
    isOpen: boolean
    onClose: () => void
    onSync: () => void
}

const Modal: React.FC<ModalLoginProps> = ({ isOpen, onClose, onSync }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Sincronizar perfil</h2>
        <p className="mb-6">
          Hemos detectado que ya existe un perfil asociado con este correo. ¿Deseas sincronizarlo con tu cuenta actual?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={onSync}
          >
            Sincronizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;