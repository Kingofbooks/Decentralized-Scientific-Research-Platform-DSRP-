// "use client"
import { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import Sidebar from "@/components/sidebar"
import { usePathname } from "next/navigation"

export default function ClientLayout({
  children,
}) {
  const pathname = usePathname()

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </ThemeProvider>
  )
}
