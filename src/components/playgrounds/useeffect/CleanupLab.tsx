'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import BeforeAfter from '@/components/stages/BeforeAfter'

function Ticker({ cleanup, onTick }: { cleanup: boolean; onTick: () => void }) {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => s + 1)
      onTick()
    }, 1000)

    return cleanup
      ? () => {
          clearInterval(id)
        }
      : undefined
    // onTick은 의도적으로 deps에서 제외 (매 렌더 새 함수라 무한 재시작 방지)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cleanup])

  return (
    <div className='rounded-xl bg-emerald-50 p-5 text-center ring-1 ring-emerald-200'>
      <div className='mb-1 text-3xl'>⏱️</div>
      <div className='font-bold text-emerald-800'>Ticker 가동 중</div>
      <div className='mt-2 font-mono text-4xl font-extrabold text-emerald-900'>
        {seconds}s
      </div>
      <div className='mt-1 text-xs text-emerald-700'>
        cleanup: {cleanup ? '✅ 켜짐' : '❌ 꺼짐'}
      </div>
    </div>
  )
}

export default function CleanupLab() {
  const [mounted, setMounted] = useState(true)
  const [cleanup, setCleanup] = useState(true)
  const [totalTicks, setTotalTicks] = useState(0)
  const [resetKey, setResetKey] = useState(0)

  const handleRemount = () => {
    setMounted(false)
    setTimeout(() => {
      setMounted(true)
      setResetKey((k) => k + 1)
    }, 200)
  }

  const handleReset = () => {
    setTotalTicks(0)
  }

  return (
    <div className='rounded-2xl border-2 border-gray-200 bg-gray-50/70 p-5'>
      <div className='mb-4 flex flex-wrap items-center gap-3'>
        <button
          type='button'
          onClick={() => setMounted((m) => !m)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-bold transition',
            mounted
              ? 'bg-emerald-500 text-white'
              : 'border border-gray-300 bg-white text-gray-700'
          )}
        >
          {mounted ? '🟢 Ticker 마운트됨' : '⚪ Ticker 언마운트됨'}
        </button>
        <button
          type='button'
          onClick={() => setCleanup((c) => !c)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-bold transition',
            cleanup
              ? 'bg-emerald-500 text-white'
              : 'border border-red-300 bg-white text-red-600'
          )}
        >
          {cleanup ? '✅ cleanup 반환' : '❌ cleanup 없음'}
        </button>
        <button
          type='button'
          onClick={handleRemount}
          className='rounded-full bg-[#4576fc] px-4 py-2 text-sm font-bold text-white hover:bg-[#2355de]'
        >
          🔄 remount
        </button>
        <button
          type='button'
          onClick={handleReset}
          className='rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-600 hover:border-gray-300'
        >
          ↺ 카운트 리셋
        </button>
      </div>

      <div className='mb-4 grid grid-cols-2 gap-3 rounded-xl bg-white p-4 shadow-sm'>
        <div>
          <div className='text-[11px] font-semibold tracking-wider text-gray-500 uppercase'>
            🔔 전체 tick 횟수
          </div>
          <div className='mt-0.5 font-mono text-3xl font-extrabold'>
            {totalTicks}
          </div>
        </div>
        <div className='text-xs text-gray-600'>
          {cleanup ? (
            <p>
              ✅ cleanup이 제대로 돌면 언마운트 시 interval이 <b>멈춰</b>. Tick
              횟수가 안 늘어나.
            </p>
          ) : (
            <p>
              ❌ cleanup 없이 Ticker를 언마운트하면 interval이 <b>살아남아</b>{' '}
              백그라운드에서 계속 tick. 전체 카운트가 계속 증가함.
            </p>
          )}
        </div>
      </div>

      <div className='mb-4 min-h-[140px]'>
        {mounted ? (
          <Ticker
            key={resetKey}
            cleanup={cleanup}
            onTick={() => setTotalTicks((t) => t + 1)}
          />
        ) : (
          <div className='rounded-xl border-2 border-dashed border-gray-200 bg-white p-8 text-center text-gray-400'>
            Ticker가 언마운트된 상태 — 전체 tick 카운트를 지켜봐
          </div>
        )}
      </div>

      <BeforeAfter
        before={{
          label: '❌ cleanup 없음',
          code: `useEffect(() => {
  const id = setInterval(tick, 1000)
  // cleanup을 반환 안 하면?
}, [])`,
          takeaway:
            '컴포넌트가 사라져도 interval은 계속 돌고 메모리도 안 풀림. 수십 번 마운트/언마운트 반복하면 리크',
        }}
        after={{
          label: '✅ cleanup 반환',
          code: `useEffect(() => {
  const id = setInterval(tick, 1000)
  return () => clearInterval(id)  // 언마운트 때 정리
}, [])`,
          takeaway:
            '언마운트·deps 변경 시 자동으로 clearInterval 호출 → 깨끗한 cleanup',
        }}
      />

      <div className='mt-4 rounded-xl border-2 border-gray-100 bg-white p-4 text-sm'>
        <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
          💭 cleanup이 필요한 상황
        </div>
        <ul className='space-y-1 text-gray-700'>
          <li>🎯 setInterval · setTimeout — clear로 정리</li>
          <li>
            🎯 <code>addEventListener</code> — 같은 이름으로 removeEventListener
          </li>
          <li>🎯 WebSocket · EventSource — close()</li>
          <li>🎯 fetch 요청 — AbortController로 취소 (다음 놀이기구 참고)</li>
        </ul>
      </div>
    </div>
  )
}
