'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import BeforeAfter from '@/components/stages/BeforeAfter'

// 가짜 검색: 랜덤 딜레이 후 응답
async function fakeSearch(
  query: string,
  signal?: AbortSignal
): Promise<string> {
  const delay = 400 + Math.floor(Math.random() * 1400)
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => resolve(`"${query}" (${delay}ms)`), delay)
    signal?.addEventListener('abort', () => {
      clearTimeout(timer)
      reject(new DOMException('aborted', 'AbortError'))
    })
  })
}

export default function RaceCondition() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<string>('')
  const [guard, setGuard] = useState(true)
  const [pending, setPending] = useState(0)

  useEffect(() => {
    if (!query) {
      // 빈 쿼리 → 이전 결과 초기화
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResult('')
      return
    }
    let cancelled = false
    const controller = new AbortController()
    setPending((p) => p + 1)

    fakeSearch(query, guard ? controller.signal : undefined)
      .then((res) => {
        if (guard && cancelled) return
        setResult(res)
      })
      .catch(() => {
        // aborted — 무시
      })
      .finally(() => {
        setPending((p) => Math.max(0, p - 1))
      })

    return () => {
      cancelled = true
      if (guard) controller.abort()
    }
  }, [query, guard])

  return (
    <div className='rounded-2xl border-2 border-gray-200 bg-gray-50/70 p-5'>
      <div className='mb-4 flex flex-wrap items-center gap-3'>
        <button
          type='button'
          onClick={() => setGuard((g) => !g)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-bold transition',
            guard
              ? 'bg-emerald-500 text-white'
              : 'border border-red-300 bg-white text-red-600'
          )}
        >
          {guard ? '✅ Race 가드 켜짐' : '❌ Race 가드 꺼짐'}
        </button>
        <span className='text-xs text-gray-500'>
          가드 끄고 빠르게 타이핑해봐 — 옛날 응답이 최신을 덮는다
        </span>
      </div>

      <div className='mb-3 rounded-xl bg-white p-4 ring-1 ring-gray-100'>
        <label className='mb-2 block text-xs font-semibold tracking-wider text-gray-500 uppercase'>
          🔎 검색 (응답에 400~1800ms 랜덤 딜레이)
        </label>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='react, useMemo, suspense...'
          className='w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-sm focus:border-[#4576fc] focus:outline-none'
        />
        <div className='mt-3 grid grid-cols-2 gap-3 text-sm'>
          <div>
            <div className='text-[11px] font-semibold tracking-wider text-gray-500 uppercase'>
              ⏳ 진행 중
            </div>
            <div className='mt-0.5 font-mono text-lg font-bold'>{pending}</div>
          </div>
          <div>
            <div className='text-[11px] font-semibold tracking-wider text-gray-500 uppercase'>
              🪧 표시된 결과
            </div>
            <div className='mt-0.5 font-mono text-sm font-bold break-all'>
              {result || '—'}
            </div>
          </div>
        </div>
      </div>

      <div className='mb-3 rounded-lg bg-white p-4 text-sm text-gray-700 ring-1 ring-gray-100'>
        <p>
          🎯 <b>관찰 포인트</b>: query를 빠르게 &quot;r&quot; → &quot;re&quot; →
          &quot;rea&quot; → &quot;react&quot;로 타이핑.
        </p>
        <ul className='mt-2 space-y-1'>
          <li>
            ❌ <b>가드 OFF</b>: 늦게 도착한 &quot;r&quot; 응답이
            &quot;react&quot; 결과를 <b>덮어쓸 수 있어</b>. 실제 앱에서는
            사용자가 &quot;왜 예전 검색 결과가 뜨지&quot; 하는 순간.
          </li>
          <li>
            ✅ <b>가드 ON</b>: 새 입력이 들어올 때 이전 요청을{' '}
            <code>AbortController</code>로 취소 + cancelled 플래그로 setResult
            차단. 가장 최신 쿼리 응답만 반영.
          </li>
        </ul>
      </div>

      <BeforeAfter
        before={{
          label: '❌ Race Condition 취약',
          code: `useEffect(() => {
  fetch(\`/search?q=\${query}\`)
    .then(r => r.json())
    .then(setResult)  // 늦게 온 응답이 최신을 덮을 수 있음
}, [query])`,
          takeaway:
            '네트워크가 불안정하거나 사용자가 빠르게 타이핑하면 옛날 응답이 최신을 밀어냄',
        }}
        after={{
          label: '✅ cancelled + AbortController',
          code: `useEffect(() => {
  let cancelled = false
  const controller = new AbortController()

  fetch(\`/search?q=\${query}\`, { signal: controller.signal })
    .then(r => r.json())
    .then(data => { if (!cancelled) setResult(data) })

  return () => {
    cancelled = true
    controller.abort()
  }
}, [query])`,
          takeaway:
            '새 요청이 시작될 때 이전 effect의 cleanup이 먼저 돌면서 flag + abort로 옛 응답 차단',
        }}
      />

      <div className='mt-4 rounded-xl border-2 border-gray-100 bg-white p-4 text-sm'>
        <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
          💭 Race Condition은 언제 생기나
        </div>
        <ul className='space-y-1 text-gray-700'>
          <li>🎯 검색창 / 자동완성 — 타이핑이 네트워크보다 빠를 때</li>
          <li>🎯 상세 페이지 이동 직후 이전 페이지 fetch가 늦게 도착</li>
          <li>
            🎯 무한 스크롤 페이징 — 페이지 빠르게 넘기면 옛 페이지 응답이 뒤엉킴
          </li>
          <li className='pt-2 text-[12px] text-gray-500'>
            💡 실전에서 TanStack Query를 쓰는 이유 중 하나가 이 가드를
            프레임워크 레벨에서 자동화해주기 때문이야.
          </li>
        </ul>
      </div>
    </div>
  )
}
