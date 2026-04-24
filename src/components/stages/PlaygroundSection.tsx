import { ReactNode } from 'react'

type Props = {
  index: string
  emoji: string
  title: string
  description: string
  children: ReactNode
}

export default function PlaygroundSection({
  index,
  emoji,
  title,
  description,
  children,
}: Props) {
  return (
    <section>
      <header className='mb-3 flex items-center gap-3'>
        <span className='flex h-9 w-9 items-center justify-center rounded-full bg-[#4576fc] font-mono text-sm font-bold text-white shadow-sm'>
          {index}
        </span>
        <div>
          <h3 className='text-lg font-extrabold'>
            <span className='mr-1'>{emoji}</span>
            {title}
          </h3>
          <p className='text-sm text-gray-600'>{description}</p>
        </div>
      </header>
      {children}
    </section>
  )
}
