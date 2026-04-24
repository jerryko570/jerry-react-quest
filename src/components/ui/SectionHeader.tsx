import Badge from '@/components/ui/Badge'
import Text from '@/components/ui/Text'
import type { VariantProps } from 'class-variance-authority'
import { BadgeVariants } from '@/components/ui/Badge/Badge.variants'
import { cn } from '@/lib/cn'

type SectionHeaderProps = {
  badge?: string
  title?: string
  subtitle?: string
  description?: string
  align?: 'left' | 'center'
  titleSize?: 'display' | 'h1' | 'h2' | 'h3' | 'h4'
  badgeTheme?: VariantProps<typeof BadgeVariants>['theme']
  className?: string
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  description,
  align = 'left',
  titleSize = 'h2',
  badgeTheme = 'orange',
  className,
}: SectionHeaderProps) {
  const textAlign =
    align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <div className={cn('flex flex-col', textAlign, className)}>
      {badge && <Badge label={badge} size='md' theme={badgeTheme} />}
      {title && (
        <Text
          as={titleSize}
          className={cn('break-keep whitespace-pre-line', badge && 'mt-4')}
        >
          {title}
        </Text>
      )}
      {subtitle && (
        <Text
          as='h4'
          className='mt-4 break-keep whitespace-pre-line text-gray-600'
        >
          {subtitle}
        </Text>
      )}
      {description && (
        <Text as='body' className='mt-4 whitespace-pre-line text-gray-600'>
          {description}
        </Text>
      )}
    </div>
  )
}
