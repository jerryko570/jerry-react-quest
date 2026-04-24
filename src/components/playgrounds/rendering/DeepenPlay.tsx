'use client'

import { memo, useRef, useState } from 'react'
import { cn } from '@/lib/cn'

type ChildProps = { id: string }

function ChildInner({ id }: ChildProps) {
  const renders = useRef(0)
  // 교육용 렌더 카운터 — 의도적으로 렌더 중 ref 조작
  // eslint-disable-next-line react-hooks/refs
  renders.current += 1
  // eslint-disable-next-line react-hooks/refs
  const count = renders.current
  return (
    <div className='flex flex-col items-center gap-1 rounded-2xl bg-white p-5 text-center ring-1 ring-gray-200'>
      <span className='text-3xl'>{id}</span>
      <span className='text-[11px] font-semibold tracking-wider text-gray-500 uppercase'>
        내가 그려진 횟수
      </span>
      <span className='font-mono text-3xl font-extrabold'>{count}</span>
    </div>
  )
}

const MemoChild = memo(ChildInner)

export default function DeepenPlay() {
  const [count, setCount] = useState(0)
  const [shield, setShield] = useState(false)
  const Child = shield ? MemoChild : ChildInner

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap gap-2'>
        <button
          type='button'
          onClick={() => setCount((c) => c + 1)}
          className='rounded-full bg-[#4576fc] px-4 py-2 text-sm font-bold text-white hover:bg-[#2355de]'
        >
          🎲 부모 리렌더 ({count})
        </button>
        <button
          type='button'
          onClick={() => setShield((v) => !v)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-bold transition',
            shield
              ? 'bg-emerald-500 text-white'
              : 'border border-gray-300 bg-white text-gray-700'
          )}
        >
          {shield ? '🛡️ 방패 켜짐 (React.memo)' : '⬜ 방패 꺼짐'}
        </button>
      </div>

      <div className='grid grid-cols-3 gap-3 rounded-2xl bg-linear-to-br from-indigo-50 to-violet-50 p-4'>
        <Child id='🟢' />
        <Child id='🔵' />
        <Child id='🟠' />
      </div>

      <p className='text-[13px] text-gray-700'>
        🔍 방패를 <b>끄면</b> 자식도 같이 숫자 ↑. <b>켜면</b> 자식은 가만히 있어
        (props가 안 바뀌었으니 &quot;굳이 다시 안 그려도 돼&quot; 판단).
      </p>
    </div>
  )
}
