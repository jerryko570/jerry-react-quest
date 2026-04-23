import { cva, type VariantProps } from 'class-variance-authority'

export const CardVariant = cva('flex rounded-lg', {
  variants: {
    theme: {
      dark: 'bg-gray-800 text-white',
      gray: 'bg-gray-100 text-gray-900',
      white: 'bg-white text-gray-900',
      lightOrange: 'bg-orange-50 text-gray-900',
      sky: 'bg-blue-500 text-white',
      lightSky: 'bg-blue-200 text-gray-900',
      orange: 'bg-orange-500 text-white',
      pink: 'bg-pink-500 text-white',
      transparent: 'bg-transparent',
    },
    padding: {
      none: 'p-0',
      sm: 'p-6',
      md: 'p-8',
      lg: 'p-10',
    },
    interactive: {
      true: 'cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg',
      false: '',
    },
  },
  defaultVariants: {
    theme: 'white',
    padding: 'md',
    interactive: false,
  },
})

export type CardTheme = NonNullable<VariantProps<typeof CardVariant>['theme']>
export type CardVariantProps = VariantProps<typeof CardVariant>
