'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import CodeBlock from '@/components/stages/CodeBlock'

type Lib = 'zustand' | 'jotai' | 'rtk'

type LibInfo = {
  id: Lib
  emoji: string
  title: string
  subtitle: string
  tagline: string
  setup: string
  code: string
  pros: string[]
  cons: string[]
}

const LIBS: Record<Lib, LibInfo> = {
  zustand: {
    id: 'zustand',
    emoji: '🐻',
    title: 'Zustand',
    subtitle: '제일 가볍고 직관적. 2026년 기준 가장 인기',
    tagline: 'Hook 같은 선언 + 외부 store',
    setup: `npm i zustand`,
    code: `// store.ts
import { create } from 'zustand'

type State = {
  count: number
  inc: () => void
  dec: () => void
  reset: () => void
}

export const useCounter = create<State>((set) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 })),
  dec: () => set((s) => ({ count: s.count - 1 })),
  reset: () => set({ count: 0 }),
}))

// 사용 — 컴포넌트에서
function Counter() {
  // 구독할 값·함수만 셀렉트 (해당 값 바뀔 때만 리렌더)
  const count = useCounter((s) => s.count)
  const inc = useCounter((s) => s.inc)

  return <button onClick={inc}>{count}</button>
}`,
    pros: [
      '✅ 학습 곡선 낮음, API 딱 useState 확장판 느낌',
      '✅ 셀렉터로 부분 구독 → 자동 리렌더 최소화',
      '✅ Provider 래핑 불필요 (전역 훅)',
      '✅ 미들웨어 · persist · devtools 지원',
    ],
    cons: [
      '⚠️ 공식 devtools는 Redux보다 간소',
      '⚠️ 매우 큰 팀에선 액션 타입 강제가 약해 문서화 필요',
    ],
  },
  jotai: {
    id: 'jotai',
    emoji: '⚛️',
    title: 'Jotai',
    subtitle: 'atomic 모델. 작은 값 여러 개를 독립적으로 구독',
    tagline: '"원자" 단위의 state',
    setup: `npm i jotai`,
    code: `// atoms.ts
import { atom } from 'jotai'

export const countAtom = atom(0)
// 파생 atom — read-only
export const doubledAtom = atom((get) => get(countAtom) * 2)
// 쓰기 가능 atom
export const incAtom = atom(null, (get, set) =>
  set(countAtom, get(countAtom) + 1)
)

// 사용
import { useAtom, useSetAtom } from 'jotai'

function Counter() {
  const [count] = useAtom(countAtom)
  const inc = useSetAtom(incAtom)

  return <button onClick={inc}>{count}</button>
}

function Doubled() {
  // 파생 atom만 구독 — countAtom이 바뀔 때만 반응
  const [doubled] = useAtom(doubledAtom)
  return <div>2x = {doubled}</div>
}`,
    pros: [
      '✅ atom이 단위 — 세밀한 구독이 자연스러움',
      '✅ 파생 atom (computed) 작성이 직관적',
      '✅ Suspense · React 19 Actions와 잘 맞음',
      '✅ React만의 관점에 맞춰 설계됨',
    ],
    cons: [
      '⚠️ atom이 많아지면 구조 관리가 필요 (폴더·파일 조직)',
      '⚠️ Redux만큼 devtools가 성숙하진 않음',
    ],
  },
  rtk: {
    id: 'rtk',
    emoji: '🧱',
    title: 'Redux Toolkit',
    subtitle: '전통의 강자. 큰 팀 · 복잡한 앱에서 여전히 유효',
    tagline: 'reducer 기반 공식 스택',
    setup: `npm i @reduxjs/toolkit react-redux`,
    code: `// counterSlice.ts
import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0 },
  reducers: {
    inc: (s) => { s.count += 1 },     // Immer로 mutation처럼 작성
    dec: (s) => { s.count -= 1 },
    reset: (s) => { s.count = 0 },
  },
})

export const { inc, dec, reset } = counterSlice.actions

// store.ts
import { configureStore } from '@reduxjs/toolkit'
export const store = configureStore({
  reducer: { counter: counterSlice.reducer },
})

// 사용
import { Provider, useSelector, useDispatch } from 'react-redux'

function Counter() {
  const count = useSelector((s: RootState) => s.counter.count)
  const dispatch = useDispatch()
  return <button onClick={() => dispatch(inc())}>{count}</button>
}

// App.tsx
<Provider store={store}><App /></Provider>`,
    pros: [
      '✅ 가장 성숙한 devtools + 타임트래블',
      '✅ RTK Query 내장 (서버 상태 + 클라 상태 모두)',
      '✅ 미들웨어 생태계 풍부',
      '✅ 대규모 팀의 규칙 강제에 유리',
    ],
    cons: [
      '⚠️ Provider 래핑 · selector · action 등 보일러플레이트가 여전히 존재',
      '⚠️ 간단한 앱엔 과함',
    ],
  },
}

export default function CounterComparison() {
  const [active, setActive] = useState<Lib>('zustand')
  const info = LIBS[active]

  return (
    <div className='rounded-2xl border-2 border-gray-200 bg-gray-50/70 p-5'>
      <div className='mb-4 flex flex-wrap gap-2'>
        {(Object.keys(LIBS) as Lib[]).map((id) => {
          const l = LIBS[id]
          return (
            <button
              key={id}
              type='button'
              onClick={() => setActive(id)}
              className={cn(
                'rounded-full border-2 px-4 py-2 text-sm font-bold transition',
                active === id
                  ? 'border-[#ff5e48] bg-[#ff5e48] text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-[#ff5e48]'
              )}
            >
              {l.emoji} {l.title}
            </button>
          )
        })}
      </div>

      <div className='mb-3 rounded-xl bg-white p-4 ring-1 ring-gray-100'>
        <div className='flex items-start gap-3'>
          <span className='text-4xl'>{info.emoji}</span>
          <div>
            <h4 className='font-extrabold'>{info.title}</h4>
            <p className='text-sm text-gray-600'>{info.subtitle}</p>
            <span className='mt-2 inline-block rounded-full bg-gray-900 px-2 py-0.5 text-[11px] font-bold text-white'>
              {info.tagline}
            </span>
          </div>
        </div>
      </div>

      <div className='mb-3'>
        <div className='mb-1 text-xs font-bold tracking-wider text-gray-500 uppercase'>
          📦 설치
        </div>
        <pre className='rounded-lg bg-gray-900 p-3 font-mono text-[11px] text-gray-100'>
          {info.setup}
        </pre>
      </div>

      <CodeBlock
        filename={`${info.title.toLowerCase()}-counter.tsx`}
        code={info.code}
      />

      <div className='mt-4 grid gap-3 md:grid-cols-2'>
        <div className='rounded-xl bg-emerald-50 p-4 ring-1 ring-emerald-200'>
          <div className='text-xs font-bold tracking-wider text-emerald-800 uppercase'>
            👍 장점
          </div>
          <ul className='mt-2 space-y-1 text-sm text-emerald-900'>
            {info.pros.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div className='rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200'>
          <div className='text-xs font-bold tracking-wider text-amber-800 uppercase'>
            ⚠️ 고민할 점
          </div>
          <ul className='mt-2 space-y-1 text-sm text-amber-900'>
            {info.cons.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className='mt-4 rounded-xl border-2 border-gray-100 bg-white p-4 text-sm'>
        <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
          💭 어떤 걸 고를까
        </div>
        <ul className='space-y-1 text-gray-700'>
          <li>
            🎯 작은~중간 앱, 팀이 가볍고 빠르게 가고 싶다 → <b>Zustand</b> (요즘
            기본값)
          </li>
          <li>
            🎯 값 단위로 세밀한 구독이 필요하거나, Suspense·Actions 연계 →{' '}
            <b>Jotai</b>
          </li>
          <li>
            🎯 큰 팀 + 복잡한 도메인 + devtools·미들웨어 풍성함 필수 →{' '}
            <b>Redux Toolkit</b>
          </li>
          <li className='pt-2 text-[12px] text-gray-500'>
            💡 서버 상태는 어느 걸 써도 TanStack Query 또는 RTK Query로 분리.
            &quot;클라 상태 라이브러리&quot;에 서버 상태까지 우겨넣지 마.
          </li>
        </ul>
      </div>
    </div>
  )
}
