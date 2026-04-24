'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import CodeBlock from '@/components/stages/CodeBlock'

type Snippet = {
  id: string
  emoji: string
  title: string
  before: string
  after: string
  note: string
}

const SNIPPETS: Snippet[] = [
  {
    id: 'usememo',
    emoji: '🧮',
    title: '무거운 계산 — useMemo 없이도 자동 캐시',
    before: `function UserList({ users }) {
  // 수동으로 감싸야 했던 계산
  const sorted = useMemo(
    () => [...users].sort((a, b) => a.name.localeCompare(b.name)),
    [users]
  )
  return <Table rows={sorted} />
}`,
    after: `function UserList({ users }) {
  // Compiler가 알아서 메모이즈 — 그냥 써라
  const sorted = [...users].sort((a, b) => a.name.localeCompare(b.name))
  return <Table rows={sorted} />
}`,
    note: 'Compiler는 이 계산이 users에만 의존한다는 걸 분석하고, 내부적으로 메모이즈된 버전으로 변환해.',
  },
  {
    id: 'usecallback',
    emoji: '🎯',
    title: '콜백 함수 — useCallback도 자동 처리',
    before: `function Parent({ onUpdate }) {
  const handleClick = useCallback(
    () => onUpdate(Date.now()),
    [onUpdate]
  )
  return <MemoChild onClick={handleClick} />
}`,
    after: `function Parent({ onUpdate }) {
  // 그냥 함수로 쓰면 됨
  const handleClick = () => onUpdate(Date.now())
  return <MemoChild onClick={handleClick} />
}`,
    note: '함수 참조 안정은 Compiler가 알아서. memo된 자식은 여전히 필요한 때만 리렌더.',
  },
  {
    id: 'object-props',
    emoji: '📦',
    title: '인라인 객체 props — 자동 참조 고정',
    before: `function Card({ user }) {
  // 매번 새 객체라 자식 memo 무력화
  const style = { color: user.vip ? 'gold' : 'gray' }
  return <Avatar style={style} name={user.name} />
}`,
    after: `function Card({ user }) {
  // Compiler가 user.vip에만 반응하도록 메모이즈
  const style = { color: user.vip ? 'gold' : 'gray' }
  return <Avatar style={style} name={user.name} />
}`,
    note: '코드가 동일. 동작은 달라짐 — 컴파일러 개입 여부만 다르고 작성자는 인지할 필요 없어.',
  },
  {
    id: 'limits',
    emoji: '🚧',
    title: '자동화가 놓치는 경우',
    before: `// ❌ 컴파일러가 분석 못 하는 상황
function Comp({ fn }) {
  // fn의 정체를 알 수 없음 (외부 함수)
  const wrapped = (...args) => fn(...args)
  return <Child onAction={wrapped} />
}`,
    after: `// ✅ 필요하면 여전히 수동으로
function Comp({ fn }) {
  const wrapped = useCallback((...args) => fn(...args), [fn])
  return <Child onAction={wrapped} />
}`,
    note: '규칙을 벗어나거나 분석이 어려운 패턴은 Compiler가 포기. 그땐 수동으로 감싸는 게 답. eslint-plugin-react-compiler가 경고로 알려줘.',
  },
]

export default function CompilerDemo() {
  const [active, setActive] = useState<string>(SNIPPETS[0].id)
  const [mode, setMode] = useState<'before' | 'after'>('after')
  const current = SNIPPETS.find((s) => s.id === active) ?? SNIPPETS[0]

  return (
    <div className='rounded-2xl border-2 border-gray-200 bg-gray-50/70 p-5'>
      <div className='mb-4 flex flex-wrap gap-2'>
        {SNIPPETS.map((s) => (
          <button
            key={s.id}
            type='button'
            onClick={() => setActive(s.id)}
            className={cn(
              'rounded-full border-2 px-3 py-1.5 text-xs font-bold transition',
              active === s.id
                ? 'border-[#4576fc] bg-[#4576fc] text-white'
                : 'border-gray-200 bg-white text-gray-700 hover:border-[#4576fc]'
            )}
          >
            {s.emoji} {s.title.split(' — ')[0]}
          </button>
        ))}
      </div>

      <div className='mb-3 rounded-lg bg-white p-4 ring-1 ring-gray-100'>
        <div className='mb-2 font-extrabold'>
          {current.emoji} {current.title}
        </div>
        <div className='text-sm text-gray-600'>{current.note}</div>
      </div>

      <div className='mb-3 flex gap-2'>
        <button
          type='button'
          onClick={() => setMode('before')}
          className={cn(
            'rounded-full px-4 py-1.5 text-xs font-bold transition',
            mode === 'before'
              ? 'bg-red-500 text-white'
              : 'border border-gray-300 bg-white text-gray-700'
          )}
        >
          🚫 Compiler 없이 (직접 감싸기)
        </button>
        <button
          type='button'
          onClick={() => setMode('after')}
          className={cn(
            'rounded-full px-4 py-1.5 text-xs font-bold transition',
            mode === 'after'
              ? 'bg-emerald-500 text-white'
              : 'border border-gray-300 bg-white text-gray-700'
          )}
        >
          ✅ Compiler 켬 (자동 메모이즈)
        </button>
      </div>

      <CodeBlock
        filename={
          mode === 'before' ? 'without-compiler.tsx' : 'with-compiler.tsx'
        }
        code={mode === 'before' ? current.before : current.after}
      />

      <div className='mt-5 rounded-xl border-2 border-gray-100 bg-white p-4 text-sm'>
        <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
          💭 Compiler는 어떻게 켜나
        </div>
        <pre className='mb-2 overflow-x-auto rounded-lg bg-gray-900 p-3 font-mono text-[11px] text-gray-100'>
          {`// next.config.ts
experimental: {
  reactCompiler: true,
}

// .eslintrc — 컴파일러가 분석 못 하는 코드 경고
plugins: ['react-compiler']
rules: { 'react-compiler/react-compiler': 'error' }`}
        </pre>
        <ul className='space-y-1 text-gray-700'>
          <li>
            🎯 2026년 현재 React 19 기준 <b>opt-in 안정화</b> 단계
          </li>
          <li>
            🎯 최신 코드베이스는 수동 memo 거의 안 써도 됨 (단, legacy 코드는
            남아있음)
          </li>
          <li>
            🎯 <code>&quot;use memo&quot;</code> 지시어로 특정 함수만 컴파일,{' '}
            <code>&quot;use no memo&quot;</code>로 제외 가능
          </li>
        </ul>
      </div>
    </div>
  )
}
