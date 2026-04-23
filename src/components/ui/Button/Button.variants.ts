import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'flex cursor-pointer items-center rounded-full border transition-colors',
  {
    variants: {
      variant: {
        primary:
          'border-transparent bg-orange-500 text-white hover:bg-orange-600',
        outline:
          'border-orange-500 bg-transparent text-orange-500 hover:bg-orange-50',
        ghost: 'border-transparent bg-gray-100 hover:bg-gray-200',
        secondary: 'border-transparent bg-gray-900 text-white',
        white: 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
      },
      size: {
        lg: 'h-12 px-6 text-lg font-semibold',
        md: 'h-10 px-5 text-sm font-medium',
        sm: 'h-8 px-4 text-sm font-medium',
      },
      width: {
        fit: 'w-fit',
        full: 'w-full justify-center',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      width: 'fit',
    },
  }
)
