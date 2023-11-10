import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Config Builder',
  description: 'Generate your own config',
}
import { Providers } from "./providers";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className='main'>
            {children}
          </main>
        </Providers>
      </body>
    </html >
  )
}
