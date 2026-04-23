'use client'

import { Suspense, use, useState } from 'react'
import { cn } from '@/lib/cn'
import BeforeAfter from '@/components/stages/BeforeAfter'

// 가짜 fetch — delay 후 resolve 하는 Promise
function makeDataPromise(label: string, delay: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`✅ ${label} (${delay}ms)`), delay)
  })
}

function DataCard({
  promise,
  label,
}: {
  promise: Promise<string>
  label: string
}) {
  // React 19의 use hook — Promise가 pending이면 Suspense로 throw
  const data = use(promise)
  return (
    <div className='rounded-xl bg-emerald-50 p-4 ring-1 ring-emerald-200'>
      <div className='text-xs font-semibold tracking-wider text-emerald-800 uppercase'>
        {label}
      </div>
      <div className='mt-1 font-mono text-sm font-bold text-emerald-900'>
        {data}
      </div>
    </div>
  )
}

function LoadingCard({ label, color }: { label: string; color: string }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-xl p-4 ring-1',
        color === 'red' ? 'bg-red-50 ring-red-200' : 'bg-sky-50 ring-sky-200'
      )}
    >
      <div
        className={cn(
          'text-xs font-semibold tracking-wider uppercase',
          color === 'red' ? 'text-red-800' : 'text-sky-800'
        )}
      >
        {label}
      </div>
      <div className='mt-1 font-mono text-sm'>⏳ 불러오는 중...</div>
    </div>
  )
}

export default function SuspenseLab() {
  const [runKey, setRunKey] = useState(0)
  const [nested, setNested] = useState(true)

  // 버튼을 누를 때마다 새 Promise 생성 (runKey로 key 변경해 Suspense 재진입)
  const fastPromise = makeDataPromise('빠른 데이터', 400)
  const slowPromise = makeDataPromise('느린 데이터', 1800)

  return (
    <div className='rounded-2xl border-2 border-gray-200 bg-gray-50/70 p-5'>
      <div className='mb-4 flex flex-wrap items-center gap-3'>
        <button
          type='button'
          onClick={() => setRunKey((k) => k + 1)}
          className='rounded-full bg-[#ff5e48] px-4 py-2 text-sm font-bold text-white hover:bg-[#ec4b36]'
        >
          🚀 다시 불러오기 (run #{runKey})
        </button>
        <button
          type='button'
          onClick={() => setNested((v) => !v)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-bold transition',
            nested
              ? 'bg-emerald-500 text-white'
              : 'border border-gray-300 bg-white text-gray-700'
          )}
        >
          {nested ? '🪆 중첩 Suspense 켜짐' : '⬜️ 하나의 Suspense'}
        </button>
      </div>

      <div className='mb-3 rounded-lg bg-white p-4 text-sm text-gray-700 ring-1 ring-gray-100'>
        <p>
          🎯 <b>관찰 포인트</b>: 두 Promise(400ms · 1800ms)가 각자 결과를
          기다려.
        </p>
        <ul className='mt-2 space-y-1'>
          <li>
            🪆 <b>중첩 Suspense</b>: 각 카드가 자기 Suspense로 감싸져 있어 빠른
            것은 빨리, 느린 것은 따로. 사용자가 덜 기다리는 체감.
          </li>
          <li>
            ⬜ <b>하나의 Suspense</b>: 둘을 같은 boundary 안에 묶어놓으면{' '}
            <b>둘 다 완료될 때까지</b> fallback. 느린 쪽 기준으로 지연.
          </li>
        </ul>
      </div>

      <div className='mb-4' key={runKey}>
        {nested ? (
          <div className='grid gap-3 md:grid-cols-2'>
            <Suspense
              fallback={<LoadingCard label='빠른 데이터' color='sky' />}
            >
              <DataCard promise={fastPromise} label='🏃 빠른 데이터' />
            </Suspense>
            <Suspense
              fallback={<LoadingCard label='느린 데이터' color='red' />}
            >
              <DataCard promise={slowPromise} label='🐢 느린 데이터' />
            </Suspense>
          </div>
        ) : (
          <Suspense
            fallback={
              <div className='grid gap-3 md:grid-cols-2'>
                <LoadingCard label='둘 다 기다리는 중' color='sky' />
                <LoadingCard label='둘 다 기다리는 중' color='red' />
              </div>
            }
          >
            <div className='grid gap-3 md:grid-cols-2'>
              <DataCard promise={fastPromise} label='🏃 빠른 데이터' />
              <DataCard promise={slowPromise} label='🐢 느린 데이터' />
            </div>
          </Suspense>
        )}
      </div>

      <BeforeAfter
        before={{
          label: '❌ useState + useEffect 로딩 처리',
          code: `function Posts() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts().then(d => {
      setData(d)
      setLoading(false)
    })
  }, [])

  if (loading) return <Spinner />
  return <List items={data} />
}`,
          takeaway:
            '각 컴포넌트가 자체 loading state를 관리. 중첩되면 코드가 산만해짐',
        }}
        after={{
          label: '✅ Suspense + use',
          code: `function Posts() {
  // use: Promise가 pending이면 Suspense로 throw
  const posts = use(fetchPosts())
  return <List items={posts} />
}

<Suspense fallback={<Spinner />}>
  <Posts />
</Suspense>`,
          takeaway:
            '로딩 UI는 boundary로 중앙집중화. 컴포넌트는 "성공했을 때만" 생각',
        }}
      />

      <div className='mt-4 rounded-xl border-2 border-gray-100 bg-white p-4 text-sm'>
        <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
          💭 Suspense 디자인 원칙
        </div>
        <ul className='space-y-1 text-gray-700'>
          <li>
            🎯 <b>boundary를 어디에 두느냐가 UX</b>. 위로 갈수록 큰 영역이 한
            번에 대기, 아래로 내려갈수록 부분적 스켈레톤.
          </li>
          <li>
            🎯 <b>Error Boundary를 바깥</b>에 — Suspense는 로딩, ErrorBoundary는
            실패를 담당. 서로 감싸는 관계가 자연스러움.
          </li>
          <li>
            🎯 <code>use</code>는 <b>조건부 호출 불가</b>. 훅 규칙과 동일.
          </li>
        </ul>
      </div>
    </div>
  )
}
