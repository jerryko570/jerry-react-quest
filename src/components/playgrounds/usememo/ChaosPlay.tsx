'use client'

import { useEffect, useRef, useState } from 'react'

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

export default function ChaosPlay() {
  const [count, setCount] = useState(0)
  const [lastMs, setLastMs] = useState<number | null>(null)
  const startRef = useRef<number>(0)
  const seeds = Array.from({ length: CARDS }, (_, i) => i + 1)

  // 렌더 타이밍 측정 — 카운터 버튼이 시작점 찍고 커밋 뒤 끝점
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

  return (
    <div className='space-y-3'>
      <button
        type='button'
        onClick={onClick}
        className='w-full rounded-full bg-[#ff5e48] px-6 py-4 text-base font-bold text-white shadow-sm hover:bg-[#ec4b36]'
      >
        🎲 이 버튼 연타해봐 ({count})
      </button>

      <div className='flex items-center justify-between rounded-lg bg-white p-3 ring-1 ring-gray-100'>
        <span className='text-xs text-gray-500'>⏱ 마지막에 걸린 시간</span>
        <span className='font-mono text-2xl font-extrabold'>
          {lastMs === null ? '—' : `${lastMs}ms`}
        </span>
      </div>

      <div className='grid grid-cols-5 gap-2 rounded-xl bg-linear-to-br from-red-50 to-orange-50 p-3 sm:grid-cols-8'>
        {seeds.map((s) => (
          <ChaosCard key={s} seed={s} />
        ))}
      </div>
    </div>
  )
}
