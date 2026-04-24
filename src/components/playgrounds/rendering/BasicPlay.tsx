'use client'

import { useRef, useState } from 'react'

type ChildProps = { id: string }

function Child({ id }: ChildProps) {
  const renders = useRef(0)
  // eslint-disable-next-line react-hooks/refs
  renders.current += 1
  return (
    <div className='flex flex-col items-center gap-1 rounded-2xl bg-white p-5 text-center ring-1 ring-gray-200'>
      <span className='text-3xl'>{id}</span>
      <span className='text-[11px] font-semibold tracking-wider text-gray-500 uppercase'>
        내가 그려진 횟수
      </span>
      {/* eslint-disable-next-line react-hooks/refs */}
      <span className='font-mono text-3xl font-extrabold'>
        {renders.current}
      </span>
    </div>
  )
}

export default function BasicPlay() {
  const [count, setCount] = useState(0)

  return (
    <div className='space-y-4'>
      <button
        type='button'
        onClick={() => setCount((c) => c + 1)}
        className='w-full rounded-full bg-[#ff5e48] px-6 py-4 text-base font-bold text-white shadow-sm hover:bg-[#ec4b36]'
      >
        🎲 이 버튼을 눌러봐 — 부모가 다시 그려져 ({count})
      </button>
      <div className='grid grid-cols-3 gap-3 rounded-2xl bg-linear-to-br from-indigo-50 to-violet-50 p-4'>
        <Child id='🟢' />
        <Child id='🔵' />
        <Child id='🟠' />
      </div>
    </div>
  )
}
