'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import { HeaderVariant } from './Header.variants'

type HeaderProps = VariantProps<typeof HeaderVariant>

const navLinks = [
  { href: '/hooks', label: 'Hooks' },
  { href: '/about', label: 'About' },
]

export default function Header({ variant, sticky }: HeaderProps) {
  const pathname = usePathname()

  return (
    <header className={cn(HeaderVariant({ variant, sticky }))}>
      <div className='mx-auto flex h-full max-w-6xl items-center justify-between px-6'>
        <Link href='/' className='flex items-center gap-2'>
          <span className='text-xl'>🎮</span>
          <span className='font-bold tracking-tight'>React Playground</span>
        </Link>

        <nav className='flex items-center gap-6'>
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'text-sm font-medium transition-colors',
                pathname === href
                  ? 'text-orange-500'
                  : 'text-gray-700 hover:text-gray-900'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
