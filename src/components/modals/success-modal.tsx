import { X, Check, CheckCircle } from 'lucide-react';

interface SuccessModalProps {
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({children, className, onClose}) => {
  if (!children) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${className}`} style={{ marginTop: 0, marginBottom: 0}}>
      <div className="bg-white rounded-lg shadow-lg w-96 relative">
        {/* Header with green background */}
        <div className="bg-green-600 p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle className="text-white w-6 h-6" />
            <h2 className="text-lg font-semibold text-white">¡Éxito!</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white bg-green-700 hover:bg-green-800 rounded-full p-1 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-center mb-4 text-green-600">
            <CheckCircle className="w-12 h-12" />
          </div>
          {children}
          <div className="mt-6 flex justify-center">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <Check className="w-4 h-4" />
              <span>Continuar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;