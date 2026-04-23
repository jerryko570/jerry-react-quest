'use client'

import { useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import BeforeAfter from '@/components/stages/BeforeAfter'

export default function BatchUpdate() {
  const [count, setCount] = useState(0)
  const renders = useRef(0)
  // 교육용 렌더 카운터 — 의도된 렌더 중 ref 조작
  // eslint-disable-next-line react-hooks/refs
  renders.current += 1

  const handleBatchedClick = () => {
    setCount((c) => c + 1)
    setCount((c) => c + 1)
    setCount((c) => c + 1)
  }

  const handleNaiveClick = () => {
    // 함수형이 아닌 값 기반. 같은 count(0)에 1씩 더해서 3번 호출해봐야 최종 1.
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
  }

  const handleReset = () => {
    setCount(0)
    renders.current = 0
  }

  return (
    <div className='rounded-2xl border-2 border-gray-200 bg-gray-50/70 p-5'>
      <div className='mb-4 grid grid-cols-2 gap-3 rounded-xl bg-white p-4 shadow-sm sm:grid-cols-3'>
        <Stat label='📦 count' value={count} />
        {/* eslint-disable-next-line react-hooks/refs */}
        <Stat label='🔁 렌더 횟수' value={renders.current} />
        <Stat label='기대값' value='+3씩 올라야 함' raw />
      </div>

      <div className='mb-4 flex flex-wrap items-center gap-3'>
        <button
          type='button'
          onClick={handleBatchedClick}
          className='rounded-full bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-emerald-600'
        >
          ✅ 함수형으로 +3 (c =&gt; c + 1)
        </button>
        <button
          type='button'
          onClick={handleNaiveClick}
          className='rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-red-600'
        >
          ❌ 값으로 +3 (count + 1)
        </button>
        <button
          type='button'
          onClick={handleReset}
          className={cn(
            'rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-600 hover:border-gray-300'
          )}
        >
          ↺ 리셋
        </button>
      </div>

      <div className='mb-4 rounded-lg bg-white p-4 text-sm ring-1 ring-gray-100'>
        <p className='text-gray-700'>
          🎯 <b>관찰 포인트</b>: 두 버튼을 번갈아 눌러봐.
        </p>
        <ul className='mt-2 space-y-1'>
          <li>
            ✅ <b>함수형</b>은 <code>setCount(c =&gt; c + 1)</code> 3번 →
            count가 +3. 리액트가 3번을 한 렌더로 batch하고, 함수형이라 직전 상태
            위에 누적됨.
          </li>
          <li>
            ❌ <b>값 기반</b>은 <code>setCount(count + 1)</code> 3번 → 세 번 다
            같은 값(count=0이면 전부 1)을 넣어서 결국 +1. 클로저에 갇힌 값 문제.
          </li>
        </ul>
      </div>

      <BeforeAfter
        before={{
          label: '❌ 값 기반 업데이트',
          code: `const [count, setCount] = useState(0)

function addThree() {
  setCount(count + 1) // count === 0 → 1 넣음
  setCount(count + 1) // count 여전히 0 → 1 넣음
  setCount(count + 1) // count 여전히 0 → 1 넣음
}
// 결과: count === 1`,
          takeaway:
            '클로저 안 count는 렌더 당시 값으로 고정. 세 번 다 같은 계산 → 마지막만 반영',
        }}
        after={{
          label: '✅ 함수형 업데이트',
          code: `const [count, setCount] = useState(0)

function addThree() {
  setCount(c => c + 1) // 큐에 "직전+1" 등록
  setCount(c => c + 1)
  setCount(c => c + 1)
}
// 결과: count === 3`,
          takeaway:
            '함수형은 "직전 값에 +1" 로직을 큐에 쌓음. React가 순서대로 적용해서 누적됨',
        }}
      />

      <div className='mt-4 rounded-xl border-2 border-gray-100 bg-white p-4 text-sm'>
        <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
          💭 왜 · 언제
        </div>
        <ul className='space-y-1 text-gray-700'>
          <li>
            🎯 <b>왜</b>: React는 한 이벤트 핸들러 안의 여러{' '}
            <code>setState</code>를 <b>batch</b>해서 한 번만 렌더해. 이때
            &quot;직전 값&quot;을 알려면 함수형이 필요해.
          </li>
          <li>
            🕰️ <b>언제</b>: 같은 state를 연속해서 업데이트하거나,{' '}
            <code>setTimeout</code>·이벤트 핸들러 안에서 값을 증분할 때.
          </li>
        </ul>
      </div>
    </div>
  )
}

function Stat({
  label,
  value,
  raw,
}: {
  label: string
  value: string | number
  raw?: boolean
}) {
  return (
    <div>
      <div className='text-[11px] font-semibold tracking-wider text-gray-500 uppercase'>
        {label}
      </div>
      <div
        className={cn(
          'mt-0.5 font-mono font-bold',
          raw ? 'text-xs text-gray-500' : 'text-2xl'
        )}
      >
        {value}
      </div>
    </div>
  )
}
