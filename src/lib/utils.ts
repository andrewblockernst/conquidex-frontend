import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//to create a date object from a string in the format "YYYY-MM-DD"
export function urlToDate(date: string) {
  const [day, month, year] = date.split("-").map(Number);
  const now = new Date(); // Obtenemos la fecha/hora actual del usuario
  
  return new Date(
    year,
    month, // Los meses son 0-based (0 = Enero)
    day,
    now.getHours(), // Hora actual del usuario
    now.getMinutes() // Minutos actuales del usuario
  );
}

// Format DATE objects to input values for type="date" (1-based)
export const formatDateForInput = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses de date son 0-based
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};