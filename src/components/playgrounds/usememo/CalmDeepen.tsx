'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/cn'

const CARDS = 40
const ITERATIONS = 60_000

function heavy(seed: number) {
  let result = 0
  for (let i = 1; i <= ITERATIONS; i += 1) {
    result += Math.sqrt(i * seed) * Math.sin(i)
  }
  return result.toFixed(2)
}

function ChaosCard({ seed }: { seed: number }) {
  const value = heavy(seed)
  return (
    <div className='rounded-lg bg-white px-2 py-2 text-center font-mono text-[10px] shadow-sm ring-1 ring-gray-100'>
      #{seed}
      <div className='truncate text-gray-400'>{value}</div>
    </div>
  )
}

function CalmCard({ seed }: { seed: number }) {
  const value = useMemo(() => heavy(seed), [seed])
  return (
    <div className='rounded-lg bg-white px-2 py-2 text-center font-mono text-[10px] shadow-sm ring-1 ring-gray-100'>
      #{seed}
      <div className='truncate text-gray-400'>{value}</div>
    </div>
  )
}

export default function CalmDeepen() {
  const [count, setCount] = useState(0)
  const [useMemoed, setUseMemoed] = useState(false)
  const [lastMs, setLastMs] = useState<number | null>(null)
  const startRef = useRef<number>(0)
  const seeds = Array.from({ length: CARDS }, (_, i) => i + 1)

  // 렌더 타이밍 측정
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (startRef.current > 0) {
      const elapsed = performance.now() - startRef.current
      setLastMs(Math.round(elapsed))
      startRef.current = 0
    }
  })

  const onClick = () => {
    startRef.current = performance.now()
    setCount((c) => c + 1)
  }

  const Card = useMemoed ? CalmCard : ChaosCard

  return (
    <div className='space-y-3'>
      <div className='flex flex-wrap gap-2'>
        <button
          type='button'
          onClick={onClick}
          className='rounded-full bg-[#4576fc] px-4 py-2 text-sm font-bold text-white hover:bg-[#2355de]'
        >
          🎲 카운터 ({count})
        </button>
        <button
          type='button'
          onClick={() => {
            setUseMemoed((v) => !v)
            setLastMs(null)
          }}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-bold transition',
            useMemoed
              ? 'bg-emerald-500 text-white'
              : 'border border-gray-300 bg-white text-gray-700'
          )}
        >
          {useMemoed ? '🧠 기억해두기 ON (useMemo)' : '⬜ 기억해두기 OFF'}
        </button>
      </div>

      <div className='flex items-center justify-between rounded-lg bg-white p-3 ring-1 ring-gray-100'>
        <span className='text-xs text-gray-500'>⏱ 마지막에 걸린 시간</span>
        <span
          className={cn(
            'font-mono text-2xl font-extrabold',
            useMemoed ? 'text-emerald-600' : 'text-red-500'
          )}
        >
          {lastMs === null ? '—' : `${lastMs}ms`}
        </span>
      </div>

      <div
        className={cn(
          'grid grid-cols-5 gap-2 rounded-xl p-3 transition-colors sm:grid-cols-8',
          useMemoed
            ? 'bg-linear-to-br from-sky-50 to-blue-50'
            : 'bg-linear-to-br from-red-50 to-blue-200'
        )}
      >
        {seeds.map((s) => (
          <Card key={s} seed={s} />
        ))}
      </div>
    </div>
  )
}
