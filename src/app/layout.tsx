import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { jetbrainsMono } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: '🎮 React Playground',
  description: '개념을 눌러보고, 망가뜨리고, 체화하는 놀이터',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ko' className={jetbrainsMono.variable}>
      <head>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css'
        />
      </head>
      <body className='flex min-h-screen flex-col antialiased'>
        <Header />
        <main className='flex-1'>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
