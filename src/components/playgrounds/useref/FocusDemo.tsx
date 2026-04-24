'use client'

import { useRef, useState } from 'react'
import BeforeAfter from '@/components/stages/BeforeAfter'

export default function FocusDemo() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [scrollCount, setScrollCount] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const focusInput = () => inputRef.current?.focus()
  const selectInput = () => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }
  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    setScrollCount((c) => c + 1)
  }
  const scrollToBottom = () => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current?.scrollHeight,
      behavior: 'smooth',
    })
    setScrollCount((c) => c + 1)
  }

  return (
    <div className='rounded-2xl border-2 border-gray-200 bg-gray-50/70 p-5'>
      <div className='mb-4 rounded-xl bg-white p-4 ring-1 ring-gray-100'>
        <label className='mb-2 block text-xs font-semibold tracking-wider text-gray-500 uppercase'>
          🎯 DOM ref로 input 포커스
        </label>
        <input
          ref={inputRef}
          defaultValue='hello useRef'
          className='w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-sm focus:border-[#4576fc] focus:outline-none'
        />
        <div className='mt-3 flex flex-wrap gap-2'>
          <button
            type='button'
            onClick={focusInput}
            className='rounded-full bg-[#4576fc] px-4 py-1.5 text-sm font-bold text-white hover:bg-[#2355de]'
          >
            🎯 포커스
          </button>
          <button
            type='button'
            onClick={selectInput}
            className='rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm font-bold text-gray-700 hover:border-[#4576fc]'
          >
            ✂️ 포커스 + 전체 선택
          </button>
        </div>
      </div>

      <div className='mb-4 rounded-xl bg-white p-4 ring-1 ring-gray-100'>
        <div className='mb-2 flex items-center justify-between'>
          <span className='text-xs font-semibold tracking-wider text-gray-500 uppercase'>
            📜 스크롤 컨테이너 (ref로 제어)
          </span>
          <span className='font-mono text-xs text-gray-500'>
            scroll 버튼 누름: {scrollCount}
          </span>
        </div>
        <div
          ref={scrollRef}
          className='h-32 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-xs'
        >
          {Array.from({ length: 40 }, (_, i) => (
            <div key={i}>line {i + 1}</div>
          ))}
        </div>
        <div className='mt-3 flex gap-2'>
          <button
            type='button'
            onClick={scrollToTop}
            className='rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-bold text-gray-700 hover:border-[#4576fc]'
          >
            ⬆️ top
          </button>
          <button
            type='button'
            onClick={scrollToBottom}
            className='rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-bold text-gray-700 hover:border-[#4576fc]'
          >
            ⬇️ bottom
          </button>
        </div>
      </div>

      <div className='mb-3 rounded-lg bg-white p-4 text-sm text-gray-700 ring-1 ring-gray-100'>
        <p>
          🎯 <b>관찰 포인트</b>: 버튼을 아무리 눌러도 이 컴포넌트는{' '}
          <b>리렌더되지 않아</b> (scroll 버튼은 별개 카운트 state라 리렌더됨).
        </p>
        <p className='mt-2'>
          useRef는 &quot;렌더와 무관한 저장소&quot; + &quot;DOM 조작용
          포인터&quot;. 값이 바뀌어도 렌더 트리거 없음.
        </p>
      </div>

      <BeforeAfter
        before={{
          label: '❌ state로 DOM 조작',
          code: `const [shouldFocus, setShouldFocus] = useState(false)

useEffect(() => {
  if (shouldFocus) {
    document.querySelector('input')?.focus()  // 🚫 불안정
    setShouldFocus(false)
  }
}, [shouldFocus])

<button onClick={() => setShouldFocus(true)}>포커스</button>`,
          takeaway:
            'state flag + querySelector로 우회 → 불필요한 리렌더 + 선택자 바뀌면 깨짐',
        }}
        after={{
          label: '✅ useRef + ref prop',
          code: `const inputRef = useRef<HTMLInputElement>(null)

<input ref={inputRef} />
<button onClick={() => inputRef.current?.focus()}>포커스</button>`,
          takeaway:
            '리액트가 직접 DOM 노드를 넘겨줌. state 변경·리렌더 없이 그 순간 조작',
        }}
      />
    </div>
  )
}
