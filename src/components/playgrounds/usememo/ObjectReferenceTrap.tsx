'use client'

import { useEffect, useMemo, useState } from 'react'
import { cn } from '@/lib/cn'

function TrapChild({ config }: { config: { limit: number } }) {
  const [runs, setRuns] = useState(0)

  useEffect(() => {
    // 의도된 사이드 이펙트: 참조가 바뀔 때마다 effect 실행 횟수를 카운트.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRuns((r) => r + 1)
  }, [config])

  return (
    <div className='rounded-lg bg-white p-4 ring-1 ring-gray-200'>
      <div className='text-xs font-semibold tracking-wider text-gray-500 uppercase'>
        🧪 자식의 useEffect 실행 횟수
      </div>
      <div className='mt-1 font-mono text-3xl font-extrabold'>{runs}</div>
      <div className='mt-1 font-mono text-[11px] text-gray-400'>
        deps: [config] · limit: {config.limit}
      </div>
    </div>
  )
}

export default function ObjectReferenceTrap() {
  const [tick, setTick] = useState(0)
  const [memoize, setMemoize] = useState(false)

  // 부모 렌더 때마다 새 객체. 참조가 바뀌어서 자식 effect 매번 실행.
  const fresh = { limit: 10 }
  // 메모이즈된 객체. 참조 안정.
  const stable = useMemo(() => ({ limit: 10 }), [])

  const config = memoize ? stable : fresh

  return (
    <div className='rounded-2xl border-2 border-gray-200 bg-gray-50/70 p-5'>
      <div className='mb-4 flex flex-wrap items-center gap-3'>
        <button
          type='button'
          onClick={() => setTick((t) => t + 1)}
          className='rounded-full bg-[#ff5e48] px-4 py-2 text-sm font-bold text-white hover:bg-[#ec4b36]'
        >
          🎲 부모 리렌더 {tick}
        </button>
        <button
          type='button'
          onClick={() => setMemoize((m) => !m)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-bold transition',
            memoize
              ? 'bg-emerald-500 text-white'
              : 'border border-gray-300 bg-white text-gray-700'
          )}
        >
          {memoize ? '✅ useMemo 켜짐' : '⬜️ useMemo 꺼짐'}
        </button>
      </div>

      <div className='mb-4 grid gap-3 sm:grid-cols-2'>
        <TrapChild config={config} />
        <div className='rounded-lg bg-white p-4 text-sm ring-1 ring-gray-200'>
          <div className='text-xs font-semibold tracking-wider text-gray-500 uppercase'>
            💡 무슨 일이 벌어지고 있는지
          </div>
          <p className='mt-2 text-gray-700'>
            {memoize ? (
              <>
                <span className='text-emerald-600'>참조 안정</span>: 부모가 몇
                번 리렌더되든 <code>config</code> 참조는 그대로. 자식의{' '}
                <code>useEffect</code>는 <b>한 번만</b> 실행.
              </>
            ) : (
              <>
                <span className='text-red-600'>참조 새로 생성</span>: 리렌더마다{' '}
                <code>{`{ limit: 10 }`}</code>이 새 객체. 자식의{' '}
                <code>useEffect</code>가 <b>매 리렌더마다</b> 다시 돔.
              </>
            )}
          </p>
        </div>
      </div>

      <pre className='overflow-x-auto rounded-lg bg-gray-900 p-4 font-mono text-[12px] text-gray-100'>
        {memoize
          ? `// 부모
const stable = useMemo(() => ({ limit: 10 }), [])
<TrapChild config={stable} />

// 자식
useEffect(() => { ... }, [config])  // ✅ 마운트 1회만`
          : `// 부모
const fresh = { limit: 10 }  // ❌ 렌더마다 새 객체
<TrapChild config={fresh} />

// 자식
useEffect(() => { ... }, [config])  // 🔁 매 리렌더마다 실행`}
      </pre>
    </div>
  )
}
