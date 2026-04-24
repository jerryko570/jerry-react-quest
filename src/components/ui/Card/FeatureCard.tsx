import { CardVariant, type CardVariantProps } from './Card.variants'
import Text from '@/components/ui/Text'
import { cn } from '@/lib/cn'

type Props = {
  title: string
  description: string | string[]
  value: string
  className?: string
} & CardVariantProps

export default function FeatureCard({
  title,
  description,
  value,
  theme,
  padding = 'md',
  className,
}: Props) {
  const descriptions = Array.isArray(description) ? description : [description]

  return (
    <div
      className={cn(
        CardVariant({ theme, padding }),
        'flex-col items-center text-center',
        className
      )}
    >
      <Text as='h3' className='font-extrabold text-blue-500'>
        {value}
      </Text>
      <Text as='body' className='mt-4 font-medium'>
        {title}
      </Text>
      <div className='mt-1'>
        {descriptions.map((d, i) => (
          <Text as='p' key={i} className='pt-1 text-gray-400'>
            {d}
          </Text>
        ))}
      </div>
    </div>
  )
}
