import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './globals.css'
import { Header } from './Header'

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
})

export const metadata: Metadata = {
  title: 'devshield',
  description: 'devshield',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <main className="h-screen p-3 flex flex-col overflow-hidden">
          <Header />
          {children}
        </main>
      </body>
    </html>
  )
}
