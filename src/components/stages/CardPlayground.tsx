'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import CodeBlock from './CodeBlock'

export type CardPlaygroundItem = {
  id: string
  emoji: string
  title: string
  subtitle?: string
  tagline?: string
  code: string
  filename?: string
  lang?: string
  note: string
  pros?: string[]
  cons?: string[]
}

type Props = {
  items: CardPlaygroundItem[]
}

export default function CardPlayground({ items }: Props) {
  const [activeId, setActiveId] = useState(items[0]?.id)
  const current = items.find((c) => c.id === activeId) ?? items[0]
  if (!current) return null

  return (
    <div className='rounded-2xl border-2 border-gray-200 bg-gray-50/70 p-5'>
      <div className='mb-4 flex flex-wrap gap-2'>
        {items.map((c) => (
          <button
            key={c.id}
            type='button'
            onClick={() => setActiveId(c.id)}
            className={cn(
              'rounded-full border-2 px-3 py-1.5 text-xs font-bold transition',
              activeId === c.id
                ? 'border-[#ff5e48] bg-[#ff5e48] text-white'
                : 'border-gray-200 bg-white text-gray-700 hover:border-[#ff5e48]'
            )}
          >
            {c.emoji} {c.title}
          </button>
        ))}
      </div>

      <div className='mb-3 rounded-xl bg-white p-4 ring-1 ring-gray-100'>
        <div className='flex items-start gap-3'>
          <span className='text-3xl'>{current.emoji}</span>
          <div>
            <h4 className='font-extrabold'>{current.title}</h4>
            {current.subtitle && (
              <p className='text-sm text-gray-600'>{current.subtitle}</p>
            )}
            {current.tagline && (
              <span className='mt-2 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-900'>
                {current.tagline}
              </span>
            )}
          </div>
        </div>
      </div>

      <CodeBlock
        filename={current.filename ?? `${current.title}.tsx`}
        code={current.code}
        lang={current.lang ?? 'tsx'}
      />

      <div className='mt-4 rounded-xl border-2 border-gray-100 bg-white p-4 text-sm'>
        <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
          💭 포인트
        </div>
        <p className='text-gray-700'>{current.note}</p>
      </div>

      {(current.pros || current.cons) && (
        <div className='mt-3 grid gap-3 md:grid-cols-2'>
          {current.pros && (
            <div className='rounded-xl bg-emerald-50 p-4 ring-1 ring-emerald-200'>
              <div className='text-xs font-bold tracking-wider text-emerald-800 uppercase'>
                👍 장점
              </div>
              <ul className='mt-2 space-y-1 text-sm text-emerald-900'>
                {current.pros.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          )}
          {current.cons && (
            <div className='rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200'>
              <div className='text-xs font-bold tracking-wider text-amber-800 uppercase'>
                ⚠️ 주의
              </div>
              <ul className='mt-2 space-y-1 text-sm text-amber-900'>
                {current.cons.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
