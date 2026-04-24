'use client'

import { useEffect, useState } from 'react'
import BeforeAfter from '@/components/stages/BeforeAfter'

// 🎣 커스텀 훅 — 값이 안정된 뒤 delay ms 후에 반영
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => {
      setDebounced(value)
    }, delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return debounced
}

export default function UseDebounceDemo() {
  const [query, setQuery] = useState('')
  const [delay, setDelay] = useState(500)
  const debounced = useDebounce(query, delay)
  const [apiCalls, setApiCalls] = useState(0)

  useEffect(() => {
    if (!debounced) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setApiCalls((n) => n + 1)
  }, [debounced])

  return (
    <div className='rounded-2xl border-2 border-gray-200 bg-gray-50/70 p-5'>
      <div className='mb-4 rounded-xl bg-white p-4 ring-1 ring-gray-100'>
        <label className='mb-2 block text-xs font-semibold tracking-wider text-gray-500 uppercase'>
          ⌨️ 입력 (매 키 입력마다 state 업데이트)
        </label>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='여기에 빠르게 타이핑...'
          className='w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-sm focus:border-[#4576fc] focus:outline-none'
        />
        <div className='mt-3 flex items-center gap-2 text-xs text-gray-600'>
          <span>debounce 딜레이:</span>
          <input
            type='range'
            min={100}
            max={1500}
            step={50}
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
            className='flex-1'
          />
          <span className='font-mono'>{delay}ms</span>
        </div>
      </div>

      <div className='mb-4 grid grid-cols-3 gap-3 rounded-xl bg-white p-4 shadow-sm'>
        <Stat label='🎤 즉시값 (query)' value={query || '—'} />
        <Stat label='⏱️ 지연값 (debounced)' value={debounced || '—'} />
        <Stat label='📞 API 호출 시뮬 횟수' value={apiCalls} />
      </div>

      <div className='mb-3 rounded-lg bg-white p-4 text-sm text-gray-700 ring-1 ring-gray-100'>
        <p>
          🎯 <b>관찰 포인트</b>: 빠르게 타이핑하는 동안 즉시값은 계속 바뀌지만,
          지연값은 <b>타이핑을 멈춘 뒤 {delay}ms</b> 후에 한 번만 업데이트돼.
        </p>
        <p className='mt-2'>
          만약 즉시값을 그대로 API 파라미터로 썼다면 키 입력마다 요청이 튀었을
          거야. debounce 덕분에 네트워크는 조용해.
        </p>
      </div>

      <BeforeAfter
        before={{
          label: '❌ debounce 없이',
          code: `function Search() {
  const [q, setQ] = useState('')

  useEffect(() => {
    if (q) fetch('/search?q=' + q) // 키마다 한 번씩
  }, [q])

  return <input value={q} onChange={e => setQ(e.target.value)} />
}`,
          takeaway: '키 입력 10번 = fetch 10번. 서버에도 사용자에게도 낭비',
        }}
        after={{
          label: '✅ useDebounce 커스텀 훅',
          code: `function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)  // 새 입력 오면 이전 타이머 취소
  }, [value, delay])
  return debounced
}

function Search() {
  const [q, setQ] = useState('')
  const debounced = useDebounce(q, 400)
  useEffect(() => { if (debounced) fetch('/search?q=' + debounced) }, [debounced])
  return <input value={q} onChange={e => setQ(e.target.value)} />
}`,
          takeaway:
            '타이핑이 400ms 이상 멈춘 뒤에만 fetch 한 번. 로직 재사용도 깔끔',
        }}
      />

      <div className='mt-4 rounded-xl border-2 border-gray-100 bg-white p-4 text-sm'>
        <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
          💭 커스텀 훅의 핵심
        </div>
        <ul className='space-y-1 text-gray-700'>
          <li>
            🎯 <b>이름이 use로 시작</b>해야 리액트가 훅으로 인식. 내부에서 다른
            훅을 자유롭게 조합.
          </li>
          <li>
            🎯 여러 컴포넌트에서 <b>똑같은 로직을 복붙</b>하고 있다면 그게
            커스텀 훅 후보.
          </li>
          <li>
            🎯 훅 로직은 &quot;블랙박스&quot;처럼 감춰지지만, 내부에서 여전히{' '}
            <code>useState</code>·<code>useEffect</code>를 쓰니까 규칙 (조건문
            안에서 호출 금지 등)은 그대로 지켜야 해.
          </li>
        </ul>
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
      <div className='mt-0.5 font-mono text-sm font-bold break-all'>
        {value}
      </div>
    </div>
  )
}
