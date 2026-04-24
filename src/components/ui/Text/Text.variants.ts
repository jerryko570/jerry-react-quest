import { cva } from 'class-variance-authority'

export const textVariant = cva('', {
  variants: {
    as: {
      display: 'text-[4.5rem] leading-[1.2] font-extrabold tracking-[-0.02em]',
      h1: 'text-[3.5rem] leading-[1.3] font-bold tracking-[-0.02em]',
      h2: 'text-[3rem] leading-[1.3] font-bold tracking-[-0.01em]',
      h3: 'text-[2.5rem] leading-[1.3] font-semibold',
      h4: 'text-[2rem] leading-[1.4] font-semibold',
      h5: 'text-[1.75rem] leading-[1.5] font-medium',
      h6: 'text-[1.5rem] leading-[1.5] font-medium',
      body: 'text-[1.25rem] leading-[1.6] font-normal',
      p: 'text-[1rem] leading-[1.8] font-normal',
      caption: 'text-[0.875rem] leading-[1.4] font-normal',
    },
  },
  defaultVariants: {
    as: 'p',
  },
})
