'use client'

import { memo, useCallback, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import BeforeAfter from '@/components/stages/BeforeAfter'

type ChildProps = {
  onIncrement: () => void
  label: string
}

const MemoChild = memo(function ChildInner({ onIncrement, label }: ChildProps) {
  const renders = useRef(0)
  // 교육용 렌더 카운터
  // eslint-disable-next-line react-hooks/refs
  renders.current += 1
  return (
    <div className='rounded-xl bg-white p-5 text-center ring-1 ring-gray-200'>
      <div className='text-3xl'>🧑‍🎤</div>
      <div className='mt-1 text-sm font-bold'>{label}</div>
      <div className='mt-2 text-[11px] font-semibold tracking-wider text-gray-500 uppercase'>
        내가 그려진 횟수
      </div>
      {/* eslint-disable-next-line react-hooks/refs */}
      <div className='font-mono text-2xl font-extrabold'>{renders.current}</div>
      <button
        type='button'
        onClick={onIncrement}
        className='mt-3 rounded-full bg-gray-900 px-3 py-1 text-xs font-bold text-white hover:bg-gray-700'
      >
        ➕ 콜백 호출
      </button>
    </div>
  )
})

export default function CallbackTrap() {
  const [count, setCount] = useState(0)
  const [bump, setBump] = useState(0)
  const [useCb, setUseCb] = useState(false)

  const stableHandler = useCallback(() => setCount((c) => c + 1), [])
  const freshHandler = () => setCount((c) => c + 1)

  return (
    <div className='rounded-2xl border-2 border-gray-200 bg-gray-50/70 p-5'>
      <div className='mb-4 flex flex-wrap items-center gap-3'>
        <button
          type='button'
          onClick={() => setBump((b) => b + 1)}
          className='rounded-full bg-[#ff5e48] px-4 py-2 text-sm font-bold text-white hover:bg-[#ec4b36]'
        >
          🎲 부모 리렌더 {bump}
        </button>
        <button
          type='button'
          onClick={() => setUseCb((v) => !v)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-bold transition',
            useCb
              ? 'bg-emerald-500 text-white'
              : 'border border-gray-300 bg-white text-gray-700'
          )}
        >
          {useCb ? '✅ useCallback 켜짐' : '⬜️ useCallback 꺼짐'}
        </button>
        <span className='text-xs text-gray-500'>
          콜백 호출 누적: <span className='font-mono font-bold'>{count}</span>
        </span>
      </div>

      <div className='mb-3 rounded-lg bg-white p-4 text-sm text-gray-700 ring-1 ring-gray-100'>
        <p>
          🎯 <b>관찰 포인트</b>: 좌우 자식 모두 <code>React.memo</code>로 감싼
          동일 컴포넌트야. 다른 건 부모가 넘기는 콜백 참조 방식 뿐.
        </p>
        <ul className='mt-2 space-y-1'>
          <li>
            ❌ <b>Fresh</b>: 매 렌더마다 <code>{'() => ...'}</code>를 새로
            만들어 넘김 → 자식의 memo 얕은 비교가 &quot;다름&quot; 판정 → 리렌더
          </li>
          <li>
            ✅ <b>Stable</b>: <code>useCallback</code>으로 감싸 참조 고정 →
            memo가 &quot;같음&quot; 판정 → 자식 리렌더 스킵
          </li>
        </ul>
      </div>

      <div className='mb-4 grid grid-cols-2 gap-3'>
        <MemoChild label='❌ Fresh 콜백' onIncrement={freshHandler} />
        <MemoChild label='✅ Stable 콜백' onIncrement={stableHandler} />
      </div>

      <BeforeAfter
        before={{
          label: '❌ useCallback 없이',
          code: `const Child = memo(function Child({ onClick }) {
  return <button onClick={onClick}>...</button>
})

function Parent() {
  const [n, setN] = useState(0)
  // 매 렌더마다 새로 생성되는 함수
  const handleClick = () => console.log('click')
  return <Child onClick={handleClick} />
}`,
          takeaway:
            'memo로 감싼 의미가 사라짐. props 참조가 매번 달라서 자식이 계속 리렌더',
        }}
        after={{
          label: '✅ useCallback으로 참조 안정',
          code: `function Parent() {
  const [n, setN] = useState(0)
  const handleClick = useCallback(
    () => console.log('click'),
    []  // deps 비어있으면 마운트 이후 같은 참조 유지
  )
  return <Child onClick={handleClick} />
}`,
          takeaway:
            'deps가 그대로면 같은 함수 참조를 돌려줌 → 자식 memo가 제대로 작동',
        }}
      />

      <div className='mt-4 rounded-xl border-2 border-gray-100 bg-white p-4 text-sm'>
        <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
          💭 왜 · 언제
        </div>
        <ul className='space-y-1 text-gray-700'>
          <li>
            🎯 <b>왜</b>: 자바스크립트에서 함수 리터럴은 매번 새로 만들어지는
            객체야. <code>React.memo</code>·<code>useEffect</code>·커스텀 훅
            deps처럼 &quot;참조&quot;를 보는 자리에 그대로 넘기면 매번
            &quot;다른 것&quot;으로 보여.
          </li>
          <li>
            🕰️ <b>언제</b>: 자식이 <code>React.memo</code>된 경우, 다른 훅의
            deps에 들어가는 경우, 커스텀 훅 내부에서 돌려주는 함수 등.
          </li>
          <li>
            ⚠️ <b>주의</b>: 그냥 이벤트 핸들러(버튼 onClick처럼 일반 DOM에 쓰는
            함수)엔 쓸 필요 없어. 그때는 그냥 인라인 함수가 더 읽기 좋음.
          </li>
        </ul>
      </div>
    </div>
  )
}
