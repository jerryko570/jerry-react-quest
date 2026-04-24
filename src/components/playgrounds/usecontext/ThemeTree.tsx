'use client'

import {
  createContext,
  memo,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'
import { cn } from '@/lib/cn'
import BeforeAfter from '@/components/stages/BeforeAfter'

type Theme = 'light' | 'dark'
type ThemeContextValue = { theme: Theme; toggle: () => void }

const ThemeContext = createContext<ThemeContextValue | null>(null)

function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('ThemeContext missing')
  return ctx
}

function LeafCard({ label }: { label: string }) {
  const { theme } = useTheme()
  const renders = useRef(0)
  // eslint-disable-next-line react-hooks/refs
  renders.current += 1

  return (
    <div
      className={cn(
        'rounded-xl p-4 text-center ring-1 transition-colors',
        theme === 'dark'
          ? 'bg-gray-900 text-gray-100 ring-gray-700'
          : 'bg-white text-gray-900 ring-gray-200'
      )}
    >
      <div className='text-xs font-semibold tracking-wider uppercase opacity-70'>
        {label}
      </div>
      <div className='mt-1 font-mono text-2xl font-extrabold'>
        {theme === 'dark' ? '🌙' : '☀️'}
      </div>
      <div className='mt-1 text-[11px] opacity-70'>
        {/* eslint-disable-next-line react-hooks/refs */}
        렌더 {renders.current}
      </div>
    </div>
  )
}

const NonSubscriber = memo(function NonSubscriberInner() {
  const renders = useRef(0)
  // eslint-disable-next-line react-hooks/refs
  renders.current += 1
  return (
    <div className='rounded-xl border-2 border-dashed border-gray-200 p-4 text-center'>
      <div className='text-xs font-semibold tracking-wider text-gray-500 uppercase'>
        Context 구독 안 함
      </div>
      <div className='mt-1 text-3xl'>🙉</div>
      <div className='mt-1 text-[11px] text-gray-400'>
        {/* eslint-disable-next-line react-hooks/refs */}
        렌더 {renders.current}
      </div>
    </div>
  )
})

function DeepBranch({ depth }: { depth: number }) {
  if (depth === 0) {
    return (
      <div className='grid grid-cols-3 gap-3'>
        <LeafCard label='Leaf A' />
        <LeafCard label='Leaf B' />
        <NonSubscriber />
      </div>
    )
  }
  return (
    <div className='rounded-xl bg-gray-50 p-3'>
      <div className='mb-2 text-[10px] font-semibold tracking-wider text-gray-400 uppercase'>
        depth {depth}
      </div>
      <DeepBranch depth={depth - 1} />
    </div>
  )
}

export default function ThemeTree() {
  const [theme, setTheme] = useState<Theme>('light')
  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  // ❌ 매 렌더마다 새 객체 (context value 참조 변경 → 모든 구독자 리렌더)
  const unstable: ThemeContextValue = { theme, toggle }
  // ✅ useMemo로 참조 안정 (theme 변경 시에만 새 객체)
  const stable = useMemo<ThemeContextValue>(() => ({ theme, toggle }), [theme])
  const [useStable, setUseStable] = useState(true)

  return (
    <div className='rounded-2xl border-2 border-gray-200 bg-gray-50/70 p-5'>
      <div className='mb-4 flex flex-wrap items-center gap-3'>
        <button
          type='button'
          onClick={toggle}
          className='rounded-full bg-[#4576fc] px-4 py-2 text-sm font-bold text-white hover:bg-[#2355de]'
        >
          🎛️ 테마 토글 (현재: {theme === 'dark' ? '🌙 다크' : '☀️ 라이트'})
        </button>
        <button
          type='button'
          onClick={() => setUseStable((v) => !v)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-bold transition',
            useStable
              ? 'bg-emerald-500 text-white'
              : 'border border-red-300 bg-white text-red-600'
          )}
        >
          {useStable ? '✅ value useMemo 켜짐' : '❌ value useMemo 꺼짐'}
        </button>
      </div>

      <div className='mb-3 rounded-lg bg-white p-4 text-sm text-gray-700 ring-1 ring-gray-100'>
        <p>
          🎯 <b>관찰 포인트</b>: Provider 아래 깊은 트리(depth 3)의 말단 리프들.
          테마 토글뿐 아니라 <b>무관한 state 변경 시에도</b> useMemo 없이는
          value가 새 객체라 전부 리렌더돼.
        </p>
        <ul className='mt-2 space-y-1'>
          <li>
            🟢 <b>Leaf A/B</b>: Context 구독 → 테마 바뀔 때 당연히 리렌더
          </li>
          <li>
            🧊 <b>NonSubscriber</b>: memo로 감싼, context 구독 X → 거의 리렌더
            없음 (Provider 부모 리렌더만 영향)
          </li>
        </ul>
      </div>

      <ThemeContext.Provider value={useStable ? stable : unstable}>
        <DeepBranch depth={3} />
      </ThemeContext.Provider>

      <div className='mt-5'>
        <BeforeAfter
          before={{
            label: '❌ 매 렌더마다 새 value',
            code: `function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState('light')

  // ❌ Provider 부모가 리렌더될 때마다 새 객체
  const value = { theme, toggle: () => setTheme(t => t === 'light' ? 'dark' : 'light') }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}`,
            takeaway:
              'Context value가 매번 새 참조 → 모든 구독자가 불필요하게 리렌더',
          }}
          after={{
            label: '✅ useMemo/useCallback으로 안정',
            code: `function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState('light')

  const toggle = useCallback(
    () => setTheme(t => t === 'light' ? 'dark' : 'light'),
    []
  )
  const value = useMemo(() => ({ theme, toggle }), [theme, toggle])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}`,
            takeaway:
              'theme이 진짜 바뀔 때만 value가 새 참조 → 구독자 리렌더 최소화',
          }}
        />
      </div>

      <div className='mt-4 rounded-xl border-2 border-gray-100 bg-white p-4 text-sm'>
        <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
          💭 Context ≠ 상태 관리 라이브러리
        </div>
        <ul className='space-y-1 text-gray-700'>
          <li>
            🎯 Context는 <b>값 전달 도구</b>. 저장소가 아니야. state는 어차피{' '}
            <code>useState</code>/<code>useReducer</code>에 있어.
          </li>
          <li>
            🎯 <b>모든 구독자가 같은 값에 반응</b>. 일부만 구독하는 세밀한
            업데이트가 필요하면 Zustand/Jotai 같은 라이브러리가 효율적.
          </li>
          <li>
            🎯 자주 바뀌는 값(마우스 위치 등)은 Context에 안 맞음 — 트리 전체가
            진동할 수 있어.
          </li>
        </ul>
      </div>
    </div>
  )
}
