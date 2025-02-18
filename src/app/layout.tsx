import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { SyncModalProvider } from "@/contexts/SyncModalContext"
import "./globals.css"
import { UserProvider } from "@/contexts/UserContext"
import  NavigationWrapper from "@/components/wrappers/navigation-wrapper"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "conquidex",
  description: "An adventist system",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="min-h-screen flex flex-col">
          <UserProvider>
            <SyncModalProvider>
              <NavigationWrapper>
                {children}
              </NavigationWrapper>
            </SyncModalProvider>
          </UserProvider>
        </div>
      </body>
    </html>
  )
}