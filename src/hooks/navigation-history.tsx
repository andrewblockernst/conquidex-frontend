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
  const isClient = true//typeof window !== 'undefined';
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

  // Guardar historial (solo elimina duplicados CONSECUTIVOS)
  const saveHistory = useCallback((newHistory: string[]) => {
    if (!isClient) return;
    
    // Filtra solo duplicados consecutivos
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

  // Efecto principal de inicialización
  useEffect(() => {
    if (!isClient) return;

    // 1. Cargar historial existente
    const storedHistory = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    // 2. Verificar referente externo
    let shouldClear = false;
    if (resetOnExternalReferrer && document.referrer) {
      try {
        shouldClear = new URL(document.referrer).origin !== window.location.origin;
      } catch {}
    }

    // 3. Manejar limpieza o inicialización
    if (shouldClear) {
      saveHistory([pathname]); // Iniciar nuevo historial con la ruta actual
    } else {
      const updatedHistory = storedHistory[storedHistory.length - 1] === pathname 
        ? storedHistory 
        : [...storedHistory, pathname];
      saveHistory(updatedHistory);
    }

    // 4. Limpiar solo al cerrar la ventana
    const clearStorage = () => localStorage.removeItem(storageKey);
    window.addEventListener('beforeunload', clearStorage);
    
    return () => window.removeEventListener('beforeunload', clearStorage);
  }, []); // Sin dependencias para ejecutar solo en mount

  // Efecto para actualizar rutas
  useEffect(() => {
    if (!pathname || !isClient) return;
    
    // Solo agregar si es diferente a la última entrada
    if (historyRef.current[historyRef.current.length - 1] !== pathname) {
      saveHistory([...historyRef.current, pathname]);
    }
  }, [pathname, saveHistory, isClient]);

  // Función de retroceso mejorada
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