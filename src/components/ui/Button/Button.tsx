import Link from 'next/link'
import { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import { buttonVariants } from './Button.variants'

type ButtonProps = {
  label: string
  className?: string
  onClick?: () => void
  href?: string
} & VariantProps<typeof buttonVariants>

export default function Button({
  label,
  className,
  size,
  variant,
  width,
  onClick,
  href,
}: ButtonProps) {
  if (href) {
    return (
      <Link
        href={href}
        className={cn(buttonVariants({ size, variant, width }), className)}
      >
        {label}
      </Link>
    )
  }

  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(buttonVariants({ size, variant, width }), className)}
    >
      {label}
    </button>
  )
}
