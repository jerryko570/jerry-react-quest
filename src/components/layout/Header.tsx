'use client'

import Link from 'next/link'
import { cn } from '@/lib/cn'

export default function Header() {
  return (
    <header className='sticky top-0 z-50 h-16 border-b border-gray-100 bg-white/80 backdrop-blur-md'>
      <div className='mx-auto flex h-full max-w-6xl items-center justify-between px-6 sm:px-8'>
        <Link
          href='/'
          className='flex items-center gap-2 transition-opacity hover:opacity-80'
        >
          <span className='text-xl'>🎮</span>
          <span className={cn('font-bold tracking-[-0.01em]')}>
            React <span className='text-[#ff5e48]'>Quest</span>
          </span>
        </Link>

        <a
          href='https://github.com/jerryko570/jerry-react-quest'
          target='_blank'
          rel='noopener noreferrer'
          className='text-sm font-medium text-gray-600 transition hover:text-[#ff5e48]'
        >
          💻 GitHub
        </a>
      </div>
    </header>
  )
}
