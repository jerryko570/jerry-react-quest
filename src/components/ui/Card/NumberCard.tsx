import Badge from '@/components/ui/Badge'
import type { BadgeProps } from '@/components/ui/Badge/Badge'
import { CardVariant, type CardVariantProps } from './Card.variants'
import Text from '@/components/ui/Text'
import { cn } from '@/lib/cn'

type Props = {
  number: string
  title: string
  description?: string
  badgeTheme?: BadgeProps['theme']
  className?: string
} & CardVariantProps

export default function NumberCard({
  number,
  title,
  description,
  theme,
  padding = 'md',
  badgeTheme = 'orange',
  className,
}: Props) {
  return (
    <div className={cn(CardVariant({ theme, padding }), 'flex-col', className)}>
      <Badge label={number} size='xs' theme={badgeTheme} weight='bold' />
      <div className='mt-3'>
        <Text as='body' className='font-medium'>
          {title}
        </Text>
        {description && (
          <Text as='p' className='mt-2 text-gray-500'>
            {description}
          </Text>
        )}
      </div>
    </div>
  )
}
