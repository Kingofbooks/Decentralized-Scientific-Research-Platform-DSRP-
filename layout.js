import React from "react"
// import { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

// import ClientLayout from "./ClientLayout"
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ResearchRep - Tokenized Reputation System",
  description: "A platform for researchers to build reputation through contributions",
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}