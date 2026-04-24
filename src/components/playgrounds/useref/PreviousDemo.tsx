'use client'

import { useEffect, useRef, useState } from 'react'
import BeforeAfter from '@/components/stages/BeforeAfter'

// 🎣 usePrevious 커스텀 훅
// 의도된 "렌더 중 ref 읽기" — 이 패턴 자체가 학습 포인트
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)
  useEffect(() => {
    ref.current = value
  }, [value])
  // eslint-disable-next-line react-hooks/refs
  return ref.current
}

export default function PreviousDemo() {
  const [count, setCount] = useState(0)
  const prev = usePrevious(count)

  return (
    <div className='rounded-2xl border-2 border-gray-200 bg-gray-50/70 p-5'>
      <div className='mb-4 grid grid-cols-2 gap-3 rounded-xl bg-white p-4 shadow-sm'>
        <div className='text-center'>
          <div className='text-[11px] font-semibold tracking-wider text-gray-500 uppercase'>
            🕓 이전 count
          </div>
          <div className='mt-0.5 font-mono text-4xl font-extrabold text-gray-400'>
            {prev ?? '—'}
          </div>
        </div>
        <div className='text-center'>
          <div className='text-[11px] font-semibold tracking-wider text-gray-500 uppercase'>
            🟢 지금 count
          </div>
          <div className='mt-0.5 font-mono text-4xl font-extrabold text-emerald-600'>
            {count}
          </div>
        </div>
      </div>

      <div className='mb-4 flex flex-wrap gap-2'>
        <button
          type='button'
          onClick={() => setCount((c) => c + 1)}
          className='rounded-full bg-[#4576fc] px-4 py-2 text-sm font-bold text-white hover:bg-[#2355de]'
        >
          ➕ 올리기
        </button>
        <button
          type='button'
          onClick={() => setCount((c) => c - 1)}
          className='rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-bold text-gray-700 hover:border-[#4576fc]'
        >
          ➖ 내리기
        </button>
        <button
          type='button'
          onClick={() => setCount(0)}
          className='rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-600 hover:border-gray-300'
        >
          ↺ 0
        </button>
      </div>

      <div className='mb-3 rounded-lg bg-white p-4 text-sm text-gray-700 ring-1 ring-gray-100'>
        <p>
          🎯 <b>관찰 포인트</b>: 버튼을 눌러 count를 바꿔봐. &quot;이전&quot;과
          &quot;지금&quot;이 한 칸씩 미끄러지는 걸 볼 수 있어.
        </p>
        <p className='mt-2'>
          원리는 간단해. <code>useEffect</code>는 커밋 뒤에 실행되니까 ref는
          &quot;한 박자 늦게&quot; 갱신돼. 즉 렌더 중에 읽으면 <b>이전 값</b>
          이야.
        </p>
      </div>

      <BeforeAfter
        before={{
          label: '❌ state로 이전 값을 저장하면',
          code: `const [count, setCount] = useState(0)
const [prev, setPrev] = useState(0)

const increase = () => {
  setPrev(count)       // 리렌더 1
  setCount(c => c + 1) // 리렌더 2
}`,
          takeaway:
            '별도 state를 써서 setState 두 번 호출 → 2회 리렌더, 순서 꼬이기 쉬움',
        }}
        after={{
          label: '✅ useRef + useEffect로 usePrevious',
          code: `function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)
  useEffect(() => {
    ref.current = value  // 커밋 이후 업데이트
  }, [value])
  return ref.current     // 렌더 중엔 '이전' 값
}

function Counter() {
  const [count, setCount] = useState(0)
  const prev = usePrevious(count)
  return <div>이전: {prev} · 지금: {count}</div>
}`,
          takeaway:
            '렌더 트리거 없이 이전 값을 기억. 재사용 가능한 훅으로 떨어뜨림',
        }}
      />

      <div className='mt-4 rounded-xl border-2 border-gray-100 bg-white p-4 text-sm'>
        <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
          💭 useRef vs useState 핵심 차이
        </div>
        <table className='w-full text-xs'>
          <thead>
            <tr className='border-b border-gray-200 text-left text-gray-500'>
              <th className='py-1 pr-2'></th>
              <th className='py-1 pr-2'>useState</th>
              <th className='py-1'>useRef</th>
            </tr>
          </thead>
          <tbody className='text-gray-700'>
            <tr className='border-b border-gray-100'>
              <td className='py-1.5 pr-2 font-semibold'>값 바뀌면 리렌더?</td>
              <td className='py-1.5 pr-2'>✅ 예</td>
              <td className='py-1.5'>❌ 아니오</td>
            </tr>
            <tr className='border-b border-gray-100'>
              <td className='py-1.5 pr-2 font-semibold'>렌더에 반영?</td>
              <td className='py-1.5 pr-2'>✅ 즉시</td>
              <td className='py-1.5'>⏳ 다음 렌더 이후</td>
            </tr>
            <tr>
              <td className='py-1.5 pr-2 font-semibold'>주요 용도</td>
              <td className='py-1.5 pr-2'>화면에 보여줄 값</td>
              <td className='py-1.5'>DOM 참조 · 타이머 id · 이전 값</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
