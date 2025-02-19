'use client'

import { createContext, useContext, useState, useCallback } from 'react';

interface ClubViewContextType {
  shouldRefetch: boolean;
  triggerRefetch: () => void;
}

const ClubViewContext = createContext<ClubViewContextType>({
  shouldRefetch: false,
  triggerRefetch: () => {},
});

export function ClubViewProvider({ children }: { children: React.ReactNode }) {
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const triggerRefetch = useCallback(() => {
    setShouldRefetch(prev => !prev);
  }, []);

  return (
    <ClubViewContext.Provider value={{ shouldRefetch, triggerRefetch }}>
      {children}
    </ClubViewContext.Provider>
  );
}

export const useClubView = () => useContext(ClubViewContext);