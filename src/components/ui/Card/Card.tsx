import { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { CardVariant, type CardVariantProps } from './Card.variants'

type CardProps = HTMLAttributes<HTMLDivElement> & CardVariantProps

export default function Card({
  theme,
  padding,
  interactive,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        CardVariant({ theme, padding, interactive }),
        'flex-col',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
