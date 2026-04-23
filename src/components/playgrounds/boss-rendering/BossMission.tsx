'use client'

import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import BeforeAfter from '@/components/stages/BeforeAfter'

const ITEM_COUNT = 500

type Item = { id: number; name: string; price: number }

function BareRow({ item }: { item: Item }) {
  return (
    <div className='flex items-center justify-between rounded-md bg-white px-3 py-2 text-xs ring-1 ring-gray-100'>
      <span className='font-mono text-gray-600'>#{item.id}</span>
      <span className='flex-1 px-2'>{item.name}</span>
      <span className='font-mono font-bold'>₩{item.price}</span>
    </div>
  )
}

const MemoRow = memo(BareRow)

export default function BossMission() {
  const [optimized, setOptimized] = useState(false)
  const [bump, setBump] = useState(0)
  const [lastMs, setLastMs] = useState<number | null>(null)

  const dataFresh: Item[] = Array.from({ length: ITEM_COUNT }, (_, i) => ({
    id: i + 1,
    name: `아이템 ${i + 1}`,
    price: 1000 + i * 13,
  }))
  const dataStable = useMemo<Item[]>(
    () =>
      Array.from({ length: ITEM_COUNT }, (_, i) => ({
        id: i + 1,
        name: `아이템 ${i + 1}`,
        price: 1000 + i * 13,
      })),
    []
  )
  const data = optimized ? dataStable : dataFresh
  const RowComp = optimized ? MemoRow : BareRow

  const startRef = useRef<number>(0)
  // 렌더 타이밍 측정: 버튼 핸들러에서 시작점, effect에서 끝점.
  // deps 없이 매 렌더 후 실행되어야 하는 의도된 setState.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (startRef.current > 0) {
      const elapsed = performance.now() - startRef.current
      setLastMs(Math.round(elapsed))
      startRef.current = 0
    }
  })

  const measuredBump = () => {
    startRef.current = performance.now()
    setBump((b) => b + 1)
  }

  return (
    <div className='rounded-2xl border-2 border-gray-200 bg-gray-50/70 p-5'>
      <div className='mb-4 flex flex-wrap items-center gap-3'>
        <button
          type='button'
          onClick={measuredBump}
          className='rounded-full bg-[#ff5e48] px-4 py-2 text-sm font-bold text-white hover:bg-[#ec4b36]'
        >
          🎲 부모 리렌더 (무관한 state) {bump}
        </button>
        <button
          type='button'
          onClick={() => setOptimized((v) => !v)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-bold transition',
            optimized
              ? 'bg-emerald-500 text-white'
              : 'border border-red-300 bg-white text-red-600'
          )}
        >
          {optimized ? '✅ 최적화 모드' : '🧨 기본 모드'}
        </button>
      </div>

      <div className='mb-4 grid grid-cols-3 gap-3 rounded-xl bg-white p-4 shadow-sm'>
        <Stat label='📋 아이템 수' value={ITEM_COUNT} />
        <Stat label='🔁 리렌더 트리거' value={bump} />
        <Stat
          label='⏱ 마지막 렌더'
          value={lastMs === null ? '—' : `${lastMs}ms`}
        />
      </div>

      <div className='mb-3 rounded-lg bg-white p-4 text-sm text-gray-700 ring-1 ring-gray-100'>
        <p>
          🎯 <b>미션 1</b>: 500개 아이템을 그리는 리스트야. 기본 모드에서{' '}
          <b>🎲 부모 리렌더 버튼을 연타</b>해 느낌을 확인해.
        </p>
        <p className='mt-2'>
          🎯 <b>미션 2</b>: <b>최적화 모드로 전환</b>하고 같은 버튼을 눌러봐.
          어떤 게 바뀌는지 (lastMs · 체감) 비교.
        </p>
        <p className='mt-2 text-[12px] text-gray-500'>
          최적화 모드가 적용한 두 가지: <code>useMemo</code>로 data 배열 참조
          고정, 각 행을 <code>React.memo</code>로 감쌈.
        </p>
      </div>

      <div className='mb-4 h-72 overflow-y-auto rounded-xl border border-gray-200 bg-gray-50 p-2'>
        <div className='grid grid-cols-1 gap-1'>
          {data.map((item) => (
            <RowComp key={item.id} item={item} />
          ))}
        </div>
      </div>

      <BeforeAfter
        before={{
          label: '❌ 기본 — 500번 풀 렌더',
          code: `function List() {
  const [tick, setTick] = useState(0)

  // ❌ 매 렌더마다 새 배열 리터럴
  const data = Array.from({ length: 500 }, makeItem)

  return data.map(item => <Row key={item.id} item={item} />)
  // Row는 일반 컴포넌트 → 부모 리렌더 시 500개 다 함께 리렌더
}`,
          takeaway:
            '부모가 리렌더될 때마다 500개 행을 전부 다시 계산 → ms 급등',
        }}
        after={{
          label: '✅ useMemo + React.memo',
          code: `const MemoRow = memo(Row)

function List() {
  const [tick, setTick] = useState(0)

  // ✅ 참조 안정화
  const data = useMemo(() => Array.from({ length: 500 }, makeItem), [])

  return data.map(item => <MemoRow key={item.id} item={item} />)
  // item 참조도 동일 → 500개 전부 리렌더 스킵
}`,
          takeaway:
            '데이터가 변하지 않으면 500개 행이 전부 스킵 → 부모만 미세하게 리렌더',
        }}
      />

      <div className='mt-4 rounded-xl border-2 border-gray-100 bg-white p-4 text-sm'>
        <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
          💭 대규모 리스트 최적화 순서
        </div>
        <ol className='list-decimal space-y-1 pl-5 text-gray-700'>
          <li>
            <b>안정적인 key</b> — 인덱스 말고 고유 id. 키가 흔들리면 memo도 무
            소용.
          </li>
          <li>
            <b>데이터 참조 안정</b> — useMemo로 배열/객체 고정.
          </li>
          <li>
            <b>Row를 React.memo</b> — 행 하나의 리렌더 비용 ↓.
          </li>
          <li>
            <b>Virtualization</b> — 수천 개 이상이면 react-window/TanStack
            Virtual로 화면에 보이는 것만 렌더.
          </li>
        </ol>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <div className='text-[11px] font-semibold tracking-wider text-gray-500 uppercase'>
        {label}
      </div>
      <div className='mt-0.5 font-mono text-lg font-bold'>{value}</div>
    </div>
  )
}
