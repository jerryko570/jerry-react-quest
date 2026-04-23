import { BadgeVariants } from './Badge.variants'
import type { VariantProps } from 'class-variance-authority'

export type BadgeProps = {
  label: string
  className?: string
  onClick?: () => void
} & VariantProps<typeof BadgeVariants>

export default function Badge({
  label,
  size,
  theme,
  radius,
  weight,
  animation,
  onClick,
  className,
}: BadgeProps) {
  return (
    <span
      onClick={onClick}
      className={BadgeVariants({
        size,
        theme,
        radius,
        weight,
        animation,
        className,
      })}
    >
      {label}
    </span>
  )
}
