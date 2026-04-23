'use client'

import { memo, useMemo, useRef, useState } from 'react'
import BeforeAfter from '@/components/stages/BeforeAfter'

const MemoNumberBox = memo(function NumberBoxInner({
  value,
}: {
  value: number
}) {
  const renders = useRef(0)
  // eslint-disable-next-line react-hooks/refs
  renders.current += 1
  return (
    <Box
      title='Primitive (number)'
      value={String(value)}
      // eslint-disable-next-line react-hooks/refs
      renders={renders.current}
      verdict='🟢 같은 값 → 리렌더 스킵'
    />
  )
})

const MemoObjectBox = memo(function ObjectBoxInner({
  config,
}: {
  config: { limit: number }
}) {
  const renders = useRef(0)
  // eslint-disable-next-line react-hooks/refs
  renders.current += 1
  return (
    <Box
      title='Object (매 렌더 새 객체)'
      value={`{ limit: ${config.limit} }`}
      // eslint-disable-next-line react-hooks/refs
      renders={renders.current}
      verdict='🔴 새 참조 → 매번 리렌더'
    />
  )
})

const MemoStableObjectBox = memo(function StableObjectBoxInner({
  config,
}: {
  config: { limit: number }
}) {
  const renders = useRef(0)
  // eslint-disable-next-line react-hooks/refs
  renders.current += 1
  return (
    <Box
      title='Object (useMemo 고정)'
      value={`{ limit: ${config.limit} }`}
      // eslint-disable-next-line react-hooks/refs
      renders={renders.current}
      verdict='🟢 같은 참조 → 리렌더 스킵'
    />
  )
})

export default function MemoShallow() {
  const [bump, setBump] = useState(0)

  const freshConfig = { limit: 10 }
  const stableConfig = useMemo(() => ({ limit: 10 }), [])

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
        <span className='text-xs text-gray-500'>
          누를 때마다 모든 자식의 렌더 조건을 React.memo가 판정
        </span>
      </div>

      <div className='mb-4 grid gap-3 sm:grid-cols-3'>
        <MemoNumberBox value={10} />
        <MemoObjectBox config={freshConfig} />
        <MemoStableObjectBox config={stableConfig} />
      </div>

      <div className='mb-3 rounded-lg bg-white p-4 text-sm text-gray-700 ring-1 ring-gray-100'>
        <p>
          🎯 <b>관찰 포인트</b>: 세 자식 모두 <code>React.memo</code>로 감쌌지만
          props 성격이 달라.
        </p>
        <ul className='mt-2 space-y-1'>
          <li>
            🟢 <b>Primitive</b>: <code>10 === 10</code>이 true → props 변화 없음
            → 리렌더 스킵. 카운트가 1에 머무름.
          </li>
          <li>
            🔴 <b>Object (fresh)</b>: 매 렌더마다 부모가{' '}
            <code>{`{ limit: 10 }`}</code>을 새로 만듦. 얕은 비교가
            &quot;다르다&quot; 판정 → 계속 리렌더.
          </li>
          <li>
            🟢 <b>Object (useMemo)</b>: 한 번 만들고 같은 참조 유지. memo가
            &quot;같다&quot; 판정 → 스킵.
          </li>
        </ul>
      </div>

      <BeforeAfter
        before={{
          label: '❌ memo만 감싸고 끝내면',
          code: `const HeavyList = memo(function HeavyList({ items, filter }) {
  // 렌더링 비용 큰 컴포넌트
})

function Parent() {
  return <HeavyList
    items={[1,2,3]}              // 매번 새 배열
    filter={{ mode: 'all' }}     // 매번 새 객체
  />
}`,
          takeaway:
            'memo가 얕은 비교로 props를 확인하는데 매번 새 참조 → 효과 0',
        }}
        after={{
          label: '✅ useMemo/useCallback과 짝으로',
          code: `function Parent() {
  const items = useMemo(() => [1, 2, 3], [])
  const filter = useMemo(() => ({ mode: 'all' }), [])
  return <HeavyList items={items} filter={filter} />
}`,
          takeaway:
            '참조 안정화 → memo가 비로소 제대로 작동 → 큰 리스트 성능 ↑',
        }}
      />

      <div className='mt-4 rounded-xl border-2 border-gray-100 bg-white p-4 text-sm'>
        <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
          💭 얕은 비교(shallow compare) 규칙
        </div>
        <ul className='space-y-1 text-gray-700'>
          <li>
            ✅ 원시값(number, string, boolean): <code>Object.is</code>로 비교 →
            같은 값이면 스킵
          </li>
          <li>
            ❌ 객체·배열·함수: <b>참조만</b> 비교 → 같은 생김새여도 새 참조면
            리렌더
          </li>
          <li>
            🎯 그래서 memo는 <code>useMemo</code>·<code>useCallback</code>과
            거의 세트로 움직여.
          </li>
          <li className='pt-2 text-[12px] text-gray-500'>
            💡 비교 로직을 커스터마이즈하려면{' '}
            <code>memo(Component, areEqual)</code>로 두 번째 인자에 직접 비교
            함수를 넣을 수도 있어 (실제로는 거의 안 씀).
          </li>
        </ul>
      </div>
    </div>
  )
}

function Box({
  title,
  value,
  renders,
  verdict,
}: {
  title: string
  value: string
  renders: number
  verdict: string
}) {
  return (
    <div className='rounded-xl bg-white p-4 ring-1 ring-gray-200'>
      <div className='text-[11px] font-semibold tracking-wider text-gray-500 uppercase'>
        {title}
      </div>
      <div className='mt-1 font-mono text-xs break-all text-gray-700'>
        {value}
      </div>
      <div className='mt-3 text-[11px] font-semibold tracking-wider text-gray-500 uppercase'>
        🔁 렌더 횟수
      </div>
      <div className='font-mono text-2xl font-extrabold'>{renders}</div>
      <div className='mt-2 text-[11px] text-gray-600'>{verdict}</div>
    </div>
  )
}
