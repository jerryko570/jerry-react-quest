'use client'

import { useMemo, useState } from 'react'
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

function ChaosCard({ seed, bump }: { seed: number; bump: number }) {
  const value = heavy(seed + bump * 0)
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

export default function ChaosCalm() {
  const [mode, setMode] = useState<'chaos' | 'calm'>('chaos')
  const [bump, setBump] = useState(0)
  const [lastMs, setLastMs] = useState<number | null>(null)
  const [renders, setRenders] = useState(0)

  const seeds = useMemo(
    () => Array.from({ length: CARDS }, (_, i) => i + 1),
    []
  )

  const handleBump = () => {
    const start = performance.now()
    setBump((b) => b + 1)
    setRenders((r) => r + 1)
    // 실제 렌더 이후 측정. rAF로 다음 프레임에 종료 시점 기록.
    requestAnimationFrame(() => {
      setLastMs(Math.round(performance.now() - start))
    })
  }

  const handleReset = () => {
    setBump(0)
    setRenders(0)
    setLastMs(null)
  }

  return (
    <div className='rounded-2xl border-2 border-gray-200 bg-gray-50/70 p-5'>
      <div className='mb-4 flex flex-wrap items-center gap-3'>
        <div className='flex rounded-full bg-white p-1 shadow-sm ring-1 ring-gray-200'>
          <ModeButton
            active={mode === 'chaos'}
            onClick={() => setMode('chaos')}
            label='🔥 Chaos'
            tone='danger'
          />
          <ModeButton
            active={mode === 'calm'}
            onClick={() => setMode('calm')}
            label='❄️ Calm'
            tone='success'
          />
        </div>
        <button
          type='button'
          onClick={handleBump}
          className='rounded-full bg-[#ff5e48] px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[#ec4b36]'
        >
          ➕ 무관한 카운터 +1
        </button>
        <button
          type='button'
          onClick={handleReset}
          className='rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-600 hover:border-gray-300'
        >
          ↺ 리셋
        </button>
      </div>

      <div className='mb-4 grid grid-cols-3 gap-3 rounded-xl bg-white p-4 shadow-sm'>
        <Stat label='🔁 렌더 횟수' value={renders.toString()} />
        <Stat
          label='⏱ 마지막 렌더'
          value={lastMs === null ? '—' : `${lastMs}ms`}
        />
        <Stat
          label='모드'
          value={mode === 'chaos' ? '🔥 매 렌더 계산' : '❄️ useMemo 캐시'}
        />
      </div>

      <p className='mb-3 text-sm text-gray-600'>
        {mode === 'chaos' ? (
          <>
            🔥 <b>Chaos Mode</b> — 카드가 40개, 각자가 매 렌더마다{' '}
            <span className='font-mono'>{ITERATIONS.toLocaleString()}</span>번
            계산해. 카운터 버튼 눌러봐. 느려지는 게 느껴지지?
          </>
        ) : (
          <>
            ❄️ <b>Calm Mode</b> — 같은 카드 40개, 근데{' '}
            <span className='font-mono'>useMemo</span>로 감싸서 seed가 안 바뀌면
            재계산 안 해. 카운터 눌러도 계산은 건너뜀.
          </>
        )}
      </p>

      <div
        className={cn(
          'grid grid-cols-5 gap-2 rounded-xl p-3 transition-colors sm:grid-cols-8',
          mode === 'chaos'
            ? 'bg-gradient-to-br from-red-50 to-orange-50'
            : 'bg-gradient-to-br from-sky-50 to-blue-50'
        )}
      >
        {mode === 'chaos'
          ? seeds.map((s) => <ChaosCard key={s} seed={s} bump={bump} />)
          : seeds.map((s) => <CalmCard key={s} seed={s} />)}
      </div>
    </div>
  )
}

function ModeButton({
  active,
  onClick,
  label,
  tone,
}: {
  active: boolean
  onClick: () => void
  label: string
  tone: 'danger' | 'success'
}) {
  const activeBg = tone === 'danger' ? 'bg-red-500' : 'bg-emerald-500'
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'rounded-full px-4 py-1.5 text-sm font-bold transition',
        active
          ? `${activeBg} text-white shadow`
          : 'text-gray-500 hover:text-gray-800'
      )}
    >
      {label}
    </button>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className='text-[11px] font-semibold tracking-wider text-gray-500 uppercase'>
        {label}
      </div>
      <div className='mt-0.5 font-mono text-sm font-bold'>{value}</div>
    </div>
  )
}
