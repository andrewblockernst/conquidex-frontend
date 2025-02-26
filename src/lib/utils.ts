import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//to create a date object from a string in the format "YYYY-MM-DD"
export function urlToDate(date: string) {
  const [day, month, year] = date.split("-").map(Number);
  return new Date(Date.UTC(year, month, day, 12, 0, 0));
}