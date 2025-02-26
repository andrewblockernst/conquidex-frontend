'use client'

import { X } from 'lucide-react';

interface ConfirmationModalProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  confirmText: string;
  cancelText?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ title, children, className, confirmText, cancelText, isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${className}`} style={{ marginTop: 0, marginBottom: 0}}>
      <div className="bg-white rounded-lg shadow-lg w-96 relative">
              {/* Header */}
        <div className="bg-yellow-600 p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white bg-yellow-700 hover:bg-yellow-800 rounded-full p-1 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {children}
          <div className="mt-6 flex justify-around space-x-4">
            <button
              onClick={onConfirm}
              className="px-8 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {confirmText}
            </button>

            {cancelText && (
            <button
              onClick={onClose}
              className="px-8 py-2 bg-red-500 rounded hover:bg-red-600"
            >
              {cancelText}
            </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;