import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { SyncModalProvider } from "@/contexts/SyncModalContext"
import "./globals.css"
import { UserProvider } from "@/contexts/UserContext"
import  NavigationWrapper from "@/components/wrappers/navigation-wrapper"
import { EventProvider } from "@/contexts/EventContext"
import RelativeTimeLoader from "@/components/relative-time-loader"

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
      <RelativeTimeLoader /> {/* cargar librería de github para tiempos relativos */}
        <div className="min-h-screen">
          <UserProvider>
            <EventProvider>
            <SyncModalProvider>
                <NavigationWrapper> {/* header, navbar, toolsbar */}
                  {children}
                </NavigationWrapper>
            </SyncModalProvider>
            </EventProvider>
          </UserProvider>
        </div>
      </body>
    </html>
  )
}