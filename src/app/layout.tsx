import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SyncModalProvider } from "@/contexts/SyncModalContext";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext";
import MobileNavbar from "@/components/navbar/navbar"; // Importar el MobileNavbar

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "conquidex",
  description: "An adventist system",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="mb-12">
        <UserProvider>
          <SyncModalProvider>
            {children}
            <MobileNavbar /> {/* INCLUSION DE NAVBAR AL LAYOUT, ESPERO QUE ESTE BIEN xd*/}
          </SyncModalProvider>
        </UserProvider>
      </body>
    </html>
  );
}