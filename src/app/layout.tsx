'use client';

import { Providers } from '@/redux/provider'
import '@/styles/globals.css'
import { usePathname } from 'next/navigation'
import Header from '@/components/shared/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname();

  return (
    <html lang="en">
      <Header />
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
