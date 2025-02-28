'use client'

import { usePathname } from 'next/navigation'
import MobileNavbar from "@/components/navbar/navbar"
import { Header } from "@/components/header/header"
import ToolsBar from "@/components/toolsbar/toolsbar"

export default function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const noToolsRoute = pathname === '/login' || pathname === '/';

  return (
    <>
      <Header />
      <main
        className={`min-h-screen w-full flex justify-center ${
          !noToolsRoute ? 'pt-16 pb-16 sm:pb-0' : ''
        }`}
      >
        <div className="h-full flex w-full max-w-7xl">
          {!noToolsRoute && <ToolsBar />}
          {children}
          {!noToolsRoute && <MobileNavbar />}
        </div>
      </main>
    </>
  );
}