import { CardVariant, type CardVariantProps } from './Card.variants'
import Text from '@/components/ui/Text'
import { cn } from '@/lib/cn'

type Props = {
  tag?: string
  title: string
  description?: string
  icon?: string
  className?: string
} & CardVariantProps

export default function HighlightCard({
  tag,
  title,
  description,
  icon,
  theme,
  padding = 'md',
  interactive,
  className,
}: Props) {
  return (
    <div
      className={cn(
        CardVariant({ theme, padding, interactive }),
        'flex-col text-center',
        className
      )}
    >
      {icon && <div className='mb-2 text-4xl'>{icon}</div>}
      {tag && (
        <Text as='caption' className='font-bold text-orange-500'>
          {tag}
        </Text>
      )}
      <Text as='h6' className={cn(tag && 'mt-2')}>
        {title}
      </Text>
      {description && (
        <Text as='p' className='mt-3 text-gray-500'>
          {description}
        </Text>
      )}
    </div>
  )
}
