'use client'

import { useMemo, useState } from 'react'
import { cn } from '@/lib/cn'
import BeforeAfter from '@/components/stages/BeforeAfter'

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
  // 부모가 리렌더되면 이 컴포넌트도 리렌더되고, 이 줄이 또 실행됨 (메모 없음)
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

export default function ChaosCalm() {
  const [mode, setMode] = useState<'chaos' | 'calm'>('chaos')
  const [lastMs, setLastMs] = useState<number | null>(null)
  const [renders, setRenders] = useState(0)

  const seeds = useMemo(
    () => Array.from({ length: CARDS }, (_, i) => i + 1),
    []
  )

  const handleBump = () => {
    const start = performance.now()
    setRenders((r) => r + 1) // state 변경 → 부모 리렌더 → 자식들 전부 다시 실행
    requestAnimationFrame(() => {
      setLastMs(Math.round(performance.now() - start))
    })
  }

  const handleReset = () => {
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

      <div className='mb-3 rounded-lg bg-white p-4 ring-1 ring-gray-100'>
        {mode === 'chaos' ? (
          <div className='space-y-1.5 text-sm text-gray-700'>
            <p>
              🎡 40개 카드가 각자 <b>무거운 계산</b>(
              <span className='font-mono'>{ITERATIONS.toLocaleString()}</span>번
              루프)을 돌려. <b>카운터 버튼</b>을 누르면 화면이 다시 그려지고
              (리렌더), 모든 카드가 <b>처음부터 다시</b> 계산해.
            </p>
            <p className='rounded bg-amber-50 p-2 text-xs text-amber-900'>
              🔍 <b>관찰 포인트</b>: 버튼 누를 때마다 &quot;마지막 렌더&quot;
              ms가 크게 찍혀. 100ms 넘으면 눈에 보이는 렉(끊김)이야.
            </p>
          </div>
        ) : (
          <div className='space-y-1.5 text-sm text-gray-700'>
            <p>
              ❄️ 같은 40개 카드지만, 이번엔{' '}
              <code className='bg-gray-100 px-1 font-mono'>useMemo</code>로
              결과를 <b>종이에 적어뒀어</b>. 입력(seed)이 안 바뀌면 리액트가
              계산을 건너뛰고 저장해둔 답 그대로 써.
            </p>
            <p className='rounded bg-emerald-50 p-2 text-xs text-emerald-900'>
              🔍 <b>관찰 포인트</b>: 카운터를 아무리 눌러도 &quot;마지막
              렌더&quot; ms가 거의 0. Chaos와 바꿔가며 숫자 비교해봐.
            </p>
          </div>
        )}
      </div>

      <div
        className={cn(
          'mb-4 grid grid-cols-5 gap-2 rounded-xl p-3 transition-colors sm:grid-cols-8',
          mode === 'chaos'
            ? 'bg-linear-to-br from-red-50 to-orange-50'
            : 'bg-linear-to-br from-sky-50 to-blue-50'
        )}
      >
        {mode === 'chaos'
          ? seeds.map((s) => <ChaosCard key={s} seed={s} />)
          : seeds.map((s) => <CalmCard key={s} seed={s} />)}
      </div>

      <div>
        <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
          ✍️ 코드로 비교하면
        </div>
        <BeforeAfter
          before={{
            label: 'ChaosCard.tsx',
            code: `function ChaosCard({ seed }: { seed: number }) {
  // 화면이 다시 그려질 때마다 heavy()를 처음부터 또 실행
  const value = heavy(seed)
  return <div>{value}</div>
}`,
            takeaway:
              '부모가 리렌더될 때마다 40개 카드 전부가 처음부터 계산 → ms가 급등',
          }}
          after={{
            label: 'CalmCard.tsx',
            code: `function CalmCard({ seed }: { seed: number }) {
  // seed가 같으면 지난번 결과를 그대로 돌려받음
  const value = useMemo(() => heavy(seed), [seed])
  return <div>{value}</div>
}`,
            takeaway:
              'seed가 안 바뀌면 heavy() 호출이 건너뛰어짐 → ms ≈ 0 유지',
          }}
        />
      </div>

      <div className='mt-4 rounded-xl border-2 border-gray-100 bg-white p-4 text-sm'>
        <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
          💭 왜 이걸 쓰는가 · 언제 쓰는가
        </div>
        <ul className='space-y-1 text-gray-700'>
          <li>
            🎯 <b>왜</b>: 무거운 계산 결과를 <b>종이에 적어두고 재사용</b>해서,
            화면이 자주 다시 그려져도 브라우저가 같은 일을 반복하지 않게 함.
          </li>
          <li>
            🕰️ <b>언제</b>: 이 놀이기구처럼 <b>실제로 느린 연산</b>이 있을 때.
            단순 덧셈·문자열 조립 같은 건 감쌀 필요 없음.
          </li>
          <li>
            ⚠️ <b>주의</b>: <code>useMemo</code>도 공짜가 아니야. 측정 없이
            남발하면 오히려 코드가 복잡해지고 느려질 수 있어.
          </li>
        </ul>
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
