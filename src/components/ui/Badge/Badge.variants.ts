import { cva, type VariantProps } from 'class-variance-authority'

export const BadgeVariants = cva(
  'inline-flex min-w-3 items-center justify-center whitespace-nowrap',
  {
    variants: {
      size: {
        xs: 'h-6 min-w-8 px-2 text-xs',
        sm: 'h-8 min-w-10 px-2.5 text-sm',
        md: 'h-9 min-w-9 px-4 text-base',
        lg: 'h-12 min-w-12 px-6 text-xl',
      },
      weight: {
        light: 'font-light',
        normal: 'font-normal',
        medium: 'font-medium',
        bold: 'font-bold',
      },
      theme: {
        dark: 'bg-gray-800 text-white',
        black: 'bg-black text-white',
        white: 'bg-white text-orange-500',
        orange: 'bg-orange-500 text-white',
        blue: 'bg-blue-500 text-white',
        green: 'bg-green-500 text-gray-900',
        pink: 'bg-pink-500 text-white',
        outlineDark: 'border border-gray-600 text-gray-600',
        outlineBlue: 'border border-blue-500 text-blue-500',
        outlineOrange: 'border border-orange-500 text-orange-500',
      },
      radius: {
        full: 'rounded-full',
        md: 'rounded-[4px]',
      },
      animation: {
        none: '',
        float:
          'animate-float cursor-pointer transition-transform duration-300 ease-out hover:scale-105 hover:-rotate-3 hover:animate-none',
      },
    },
    defaultVariants: {
      size: 'md',
      weight: 'bold',
      radius: 'full',
      animation: 'none',
    },
  }
)

export type BadgeTheme = NonNullable<
  VariantProps<typeof BadgeVariants>['theme']
>
