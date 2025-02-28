'use client';

import { useNavigationHistory } from "@/hooks/navigation-history";

export default function NavigationHandler() {
  useNavigationHistory({
    defaultPath: '/home', // Tu ruta por defecto
    resetOnExternalReferrer: true
  });
  
  return null;
}