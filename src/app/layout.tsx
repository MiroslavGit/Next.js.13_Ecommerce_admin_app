"use client"

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from "next-auth/react"
import { Provider } from 'react-redux'
import store from '@/reducers/store'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin Penel',
  description: 'Admin Penel for e-commerce created by Miroslav Hanisko',
}

export default function RootLayout({ children, session }: { children: React.ReactNode, session: any }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <SessionProvider session={session}>
            {children}
          </SessionProvider>
        </Provider>
      </body>
    </html>
  )
}
