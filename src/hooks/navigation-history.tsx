'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useCallback, useState, useRef } from 'react';

const DEFAULT_PATH = '/home';
const MAX_HISTORY_LENGTH = 10;

interface UseNavigationHistoryOptions {
  defaultPath?: string;
  storageKey?: string;
  resetOnExternalReferrer?: boolean;
}

export function useNavigationHistory(options: UseNavigationHistoryOptions = {}) {
  const isClient = true // typeof window !== 'undefined';
  const router = useRouter();
  const pathname = usePathname();
  
  const {
    defaultPath = DEFAULT_PATH,
    storageKey = 'navHistory',
    resetOnExternalReferrer = true
  } = options;
  
  const optionsRef = useRef(options);
  const [history, setHistory] = useState<string[]>([]);
  const historyRef = useRef<string[]>([]);

  // Save history (only removes CONSECUTIVE duplicates)
  const saveHistory = useCallback((newHistory: string[]) => {
    if (!isClient) return;
    
    // Filter only consecutive duplicates
    const cleanHistory = newHistory.reduce<string[]>((acc, path) => {
      if (path !== acc[acc.length - 1]) {
        acc.push(path);
      }
      return acc;
    }, []).slice(-MAX_HISTORY_LENGTH);

    localStorage.setItem(storageKey, JSON.stringify(cleanHistory));
    historyRef.current = cleanHistory;
    setHistory(cleanHistory);
  }, [storageKey, isClient]);

  // Main initialization effect
  useEffect(() => {
    if (!isClient) return;

    // 1. Load existing history
    const storedHistory = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    // 2. Check external referrer
    let shouldClear = false;
    if (resetOnExternalReferrer && document.referrer) {
      try {
        shouldClear = new URL(document.referrer).origin !== window.location.origin;
      } catch {}
    }

    // 3. Handle clearing or initialization
    if (shouldClear) {
      saveHistory([pathname]); // Start new history with the current path
    } else {
      const updatedHistory = storedHistory[storedHistory.length - 1] === pathname 
        ? storedHistory 
        : [...storedHistory, pathname];
      saveHistory(updatedHistory);
    }

    // 4. Clear only when closing the window
    const clearStorage = () => localStorage.removeItem(storageKey);
    window.addEventListener('beforeunload', clearStorage);
    
    return () => window.removeEventListener('beforeunload', clearStorage);
  }, []); // No dependencies to run only on mount

  // Effect to update routes
  useEffect(() => {
    if (!pathname || !isClient) return;
    
    // Only add if different from the last entry
    if (historyRef.current[historyRef.current.length - 1] !== pathname) {
      saveHistory([...historyRef.current, pathname]);
    }
  }, [pathname, saveHistory, isClient]);

  // Enhanced back function
  const goBack = useCallback(() => {
    const effectiveHistory = historyRef.current;
    
    if (effectiveHistory.length <= 1) {
      router.push(optionsRef.current.defaultPath || DEFAULT_PATH);
      return;
    }
    
    const previousPath = effectiveHistory[effectiveHistory.length - 2];
    router.push(previousPath);
    saveHistory(effectiveHistory.slice(0, -1));
  }, [router, saveHistory]);

  return {
    goBack,
    clearHistory: () => saveHistory([]),
    getPreviousPath: () => historyRef.current[historyRef.current.length - 2] || null,
    currentHistory: history,
    currentPath: pathname
  };
}