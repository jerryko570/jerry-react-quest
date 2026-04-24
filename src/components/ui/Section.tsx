import { cn } from '@/lib/cn'

type Props = {
  children: React.ReactNode
  className?: string
  maxWidth?: string
  padding?: 'sm' | 'md' | 'lg' | 'none'
}

const paddingMap: Record<NonNullable<Props['padding']>, string> = {
  none: '',
  sm: 'py-10 px-6',
  md: 'py-16 px-6 sm:px-8',
  lg: 'py-24 px-6 sm:px-12',
}

export default function Section({
  children,
  className,
  maxWidth = 'max-w-6xl',
  padding = 'md',
}: Props) {
  return (
    <section className={className}>
      <div className={cn('mx-auto', maxWidth, paddingMap[padding])}>
        {children}
      </div>
    </section>
  )
}
