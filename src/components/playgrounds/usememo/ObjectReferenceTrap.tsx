'use client'

import { useEffect, useMemo, useState } from 'react'
import { cn } from '@/lib/cn'
import BeforeAfter from '@/components/stages/BeforeAfter'

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
            💡 지금 무슨 일이 벌어지는지
          </div>
          <p className='mt-2 text-gray-700'>
            {memoize ? (
              <>
                <span className='text-emerald-600'>같은 물건이야</span>: 부모가
                몇 번 다시 그려지든 <code>config</code>는 똑같은 객체. 리액트가
                &quot;어, 바뀐 거 없네&quot;하고 자식 <code>useEffect</code>를{' '}
                <b>한 번만</b> 실행해.
              </>
            ) : (
              <>
                <span className='text-red-600'>매번 다른 물건이야</span>:
                리렌더마다 <code>{`{ limit: 10 }`}</code>을 새로 만드니까 내용은
                같아도 <b>다른 객체</b>. 리액트가 &quot;달라졌네&quot; 하며 자식
                <code>useEffect</code>를 <b>매번</b> 다시 돌려.
              </>
            )}
          </p>
        </div>
      </div>

      <div className='mb-4'>
        <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
          ✍️ 코드로 비교하면
        </div>
        <BeforeAfter
          before={{
            label: 'ObjectRefTrap-before.tsx',
            code: `function Parent() {
  const [tick, setTick] = useState(0)

  // 렌더될 때마다 새로 만들어지는 객체 리터럴
  const fresh = { limit: 10 }

  return <Child config={fresh} />
}

function Child({ config }: { config: { limit: number } }) {
  useEffect(() => {
    // 🔁 부모가 리렌더될 때마다 또 실행됨
    console.log('effect run')
  }, [config])
  return null
}`,
            takeaway:
              '내용이 같아도 매번 "다른 물건"이라 useEffect가 반복 실행 → 무한 네트워크 요청 같은 버그의 원인',
          }}
          after={{
            label: 'ObjectRefTrap-after.tsx',
            code: `function Parent() {
  const [tick, setTick] = useState(0)

  // 한 번 만들고 같은 물건을 계속 돌려줌
  const stable = useMemo(() => ({ limit: 10 }), [])

  return <Child config={stable} />
}

function Child({ config }: { config: { limit: number } }) {
  useEffect(() => {
    // ✅ 마운트 때 딱 1회만 실행
    console.log('effect run')
  }, [config])
  return null
}`,
            takeaway:
              'useMemo로 같은 참조를 유지하니 실제로 바뀔 때만 effect 실행 → 의도한 대로 동작',
          }}
        />
      </div>

      <div className='rounded-xl border-2 border-gray-100 bg-white p-4 text-sm'>
        <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
          💭 왜 이걸 쓰는가 · 언제 쓰는가
        </div>
        <ul className='space-y-1 text-gray-700'>
          <li>
            🎯 <b>왜</b>: 자식의 <code>useEffect</code>·<code>React.memo</code>·
            커스텀 훅이 <b>props를 참조로 비교</b>하기 때문. 같은 내용이어도
            매번 새로 만들면 항상 &quot;달라졌다&quot;로 판단됨.
          </li>
          <li>
            🕰️ <b>언제</b>: 객체·배열·함수를 <b>자식의 props</b>,{' '}
            <b>다른 훅의 주시 목록</b>(deps), <b>context value</b>에 넘길 때.
          </li>
          <li>
            ⚠️ <b>주의</b>: 렌더 안에서 쓰고 버릴 값이라면 memo가 없어도 됨.
            &quot;참조 건너편에 누가 보고 있나&quot;가 판단 기준.
          </li>
        </ul>
      </div>
    </div>
  )
}
