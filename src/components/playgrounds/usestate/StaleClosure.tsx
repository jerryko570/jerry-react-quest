'use client'

import { useState } from 'react'
import BeforeAfter from '@/components/stages/BeforeAfter'

export default function StaleClosure() {
  const [count, setCount] = useState(0)
  const [lastAlert, setLastAlert] = useState<string | null>(null)

  const handleValueBased = () => {
    setLastAlert(null)
    setTimeout(() => {
      // 이 안의 count는 버튼 누른 순간의 스냅샷에 갇혀있음
      setLastAlert(`❌ 값 기반: 5초 전 count는 ${count}이었어`)
    }, 3000)
  }

  const handleFunctional = () => {
    setLastAlert(null)
    setTimeout(() => {
      setCount((c) => {
        setLastAlert(`✅ 함수형: 지금 이 순간 count는 ${c}야 (변경 없이 확인)`)
        return c // 실제로 바꾸지 않음
      })
    }, 3000)
  }

  return (
    <div className='rounded-2xl border-2 border-gray-200 bg-gray-50/70 p-5'>
      <div className='mb-4 grid grid-cols-2 gap-3 rounded-xl bg-white p-4 shadow-sm'>
        <div>
          <div className='text-[11px] font-semibold tracking-wider text-gray-500 uppercase'>
            📦 현재 count
          </div>
          <div className='mt-0.5 font-mono text-3xl font-bold'>{count}</div>
        </div>
        <div className='flex flex-col gap-1'>
          <button
            type='button'
            onClick={() => setCount((c) => c + 1)}
            className='rounded-full bg-gray-900 px-3 py-1 text-xs font-bold text-white hover:bg-gray-700'
          >
            ➕ count +1
          </button>
          <button
            type='button'
            onClick={() => setCount(0)}
            className='rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600 hover:border-gray-300'
          >
            ↺ 리셋
          </button>
        </div>
      </div>

      <div className='mb-4 rounded-lg bg-white p-4 text-sm text-gray-700 ring-1 ring-gray-100'>
        <p className='mb-2'>
          🎯 <b>실험</b>: 버튼 누른 뒤 <b>3초 안에</b> 위의 &quot;count
          +1&quot;을 여러 번 눌러 count를 올려봐. 3초 뒤에 튀어나오는 메시지가
          어느 시점의 값을 보여주는지 비교.
        </p>
      </div>

      <div className='mb-4 flex flex-wrap items-center gap-3'>
        <button
          type='button'
          onClick={handleValueBased}
          className='rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-red-600'
        >
          ❌ 값 기반 setTimeout (3초 후)
        </button>
        <button
          type='button'
          onClick={handleFunctional}
          className='rounded-full bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-emerald-600'
        >
          ✅ 함수형으로 현재값 확인 (3초 후)
        </button>
      </div>

      {lastAlert && (
        <div className='mb-4 rounded-lg border border-gray-200 bg-white p-4 font-mono text-sm'>
          {lastAlert}
        </div>
      )}

      <BeforeAfter
        before={{
          label: '❌ Stale Closure 트랩',
          code: `function Component() {
  const [count, setCount] = useState(0)

  const showLater = () => {
    setTimeout(() => {
      console.log(count) // 버튼 누른 순간의 count에 갇힘
    }, 3000)
  }

  return <button onClick={showLater}>보기</button>
}`,
          takeaway:
            'setTimeout 안 count는 콜백이 만들어진 시점의 값으로 얼어있음. 최신 값이 아님',
        }}
        after={{
          label: '✅ 함수형 업데이트로 최신값',
          code: `function Component() {
  const [count, setCount] = useState(0)

  const showLater = () => {
    setTimeout(() => {
      setCount(latest => {
        console.log(latest) // 지금 이 순간의 최신 count
        return latest // 값은 그대로
      })
    }, 3000)
  }

  return <button onClick={showLater}>보기</button>
}`,
          takeaway:
            '함수형 콜백은 React가 호출하는 시점에 "가장 최신" state를 주입해줌',
        }}
      />
    </div>
  )
}
