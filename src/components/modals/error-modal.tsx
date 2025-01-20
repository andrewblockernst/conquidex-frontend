import React from 'react';
import { X, AlertCircle } from 'lucide-react';

interface ErrorModalProps {
    children: React.ReactNode;
    onClose: () => void;
  }
  
  const ErrorModal: React.FC<ErrorModalProps> = ({children, onClose}) => {
    if (!children) return null;
  
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 modal-overlay" style={{ marginTop: 0, marginBottom: 0}}>
          <div className="bg-white rounded-lg shadow-lg w-96 relative">
            {/* Header with red background */}
            <div className="bg-red-600 p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="text-white w-6 h-6" />
                <h2 className="text-lg font-semibold text-white">Error</h2>
              </div>
              <button
                onClick={onClose}
                className="text-white bg-red-700 hover:bg-red-400 rounded-full p-1 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <div className="flex items-center justify-center mb-4 text-red-600">
                <AlertCircle className="w-12 h-12" />
              </div>
              {children}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200 flex items-center space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>Cerrar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };
  
  export default ErrorModal;