"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Custom Font Faces */}
        <style jsx global>{`
          @font-face {
            font-family: 'Star Jedi';
            src: url('/fonts/StarJedi.woff2') format('woff2'),
                 url('/fonts/StarJedi.woff') format('woff'),
                 url('/fonts/StarJedi.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }
          
          @font-face {
            font-family: 'Komika Axis';
            src: url('/fonts/KomikaAxis.woff2') format('woff2'),
                 url('/fonts/KomikaAxis.woff') format('woff'),
                 url('/fonts/KomikaAxis.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }
        `}</style>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
