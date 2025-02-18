import { X, Info } from 'lucide-react';

interface BaseModalProps {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}

const BaseModal: React.FC<BaseModalProps> = ({title, children, onClose}) => {
  if (!children) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 modal-overlay" style={{ marginTop: 0, marginBottom: 0}}>
      <div className="bg-white rounded-lg shadow-lg w-96 relative">
        {/* Header with blue background */}
        <div className="bg-blue-600 p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-blue-700 rounded-full p-1 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BaseModal;