'use client'

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { AuthButton } from '@/components/auth-button';
import SyncProfileModal from '../syncprofile-modal/syncprofile-modal-client';
import { redirect } from 'next/navigation';

interface Props {
    defaultPopSyncModal: boolean;
    onCloseSyncModal?: string;
    }

export const Header = ({ defaultPopSyncModal, onCloseSyncModal }: Props ) => {
    const [showSyncModal, setSyncModal] = useState(false);
    const [popSyncModal, setPopSyncModal] = useState(defaultPopSyncModal);

    useEffect(() => {
        popSyncModal && setSyncModal(true);
    }, [defaultPopSyncModal]);

    return (
    <>
    <header className="bg-yellow-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <svg 
              viewBox="0 0 24 24" 
              className="h-8 w-8"
              fill="currentColor"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <span className="text-xl font-bold">Conquidex</span>
          </Link>
          
          <div className='flex space-x-2 py-6 items-center'>
            <button
            onClick={()=>setSyncModal(!showSyncModal)}
            type="button"
            className="text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-yellow-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2"
            >
            Vincular
            </button>
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
    <SyncProfileModal
    isOpenedByDefault={popSyncModal}
    isOpen={showSyncModal}
    onClose={() => {
        setSyncModal(false);
        if (onCloseSyncModal) {
            setPopSyncModal(false);
            redirect(onCloseSyncModal);
        }
    }}
    />
    </>
  );
};