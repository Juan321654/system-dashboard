import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'JC System Dashboard',
  description: 'Created for the JC System Dashboard',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
