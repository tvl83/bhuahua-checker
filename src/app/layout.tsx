
import './globals.css'
import { Inter } from 'next/font/google'

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

import PrimeReact from 'primereact/api';
PrimeReact.ripple = true;
PrimeReact.appendTo = 'self';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'bHUAHUA Check Balance',
  description: 'Enter an Address to verify they own bHUAHUA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
