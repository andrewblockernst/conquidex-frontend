import React from "react";

interface SyncButtonProps {
  showSyncModal: boolean;
  setSyncModal: (value: boolean) => void;
}

const SyncButton: React.FC<SyncButtonProps> = ({
  showSyncModal,
  setSyncModal,
}) => {
  return (
    <button
      onClick={() => setSyncModal(!showSyncModal)}
      type="button"
      className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-0.5 dark:focus:ring-yellow-900"
    >
      Vincular
    </button>
  );
};

export default SyncButton;
