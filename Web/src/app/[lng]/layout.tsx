import type { Metadata } from 'next'
import './globals.css'

import { dir } from 'i18next'
import { languages } from '../i18n/settings'

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: 'Config Builder',
  description: 'Generate your own config',
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default function RootLayout({
  children,
  params: {
    lng
  }
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body>
        <Providers lng={lng}>
          <main className='main'>
            {children}
          </main>
        </Providers>
      </body>
    </html >
  )
}
