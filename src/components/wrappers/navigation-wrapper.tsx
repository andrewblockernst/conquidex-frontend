'use client'

import { usePathname } from 'next/navigation'
import MobileNavbar from "@/components/navbar/navbar"
import { Header } from "@/components/header/header"
import ToolsBar from "@/components/toolsbar/toolsbar"

export default function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const noToolsRoute = pathname === '/login' || pathname === '/'

  return (
    <>
      <Header />
      <main className={`flex-1 w-full flex justify-center ${!noToolsRoute ? 'mt-16 mb-16 sm:mb-0' : ''}`}>
        <div className="flex w-full max-w-7xl">
          {!noToolsRoute && <ToolsBar />}
          {children}
          {!noToolsRoute && <MobileNavbar />}
        </div>
      </main>
    </>
  )
}