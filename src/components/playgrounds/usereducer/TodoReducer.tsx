'use client'

import { useReducer, useState } from 'react'
import { cn } from '@/lib/cn'
import BeforeAfter from '@/components/stages/BeforeAfter'

type Todo = { id: number; text: string; done: boolean }
type Filter = 'all' | 'active' | 'done'

type Action =
  | { type: 'add'; text: string }
  | { type: 'toggle'; id: number }
  | { type: 'remove'; id: number }
  | { type: 'filter'; filter: Filter }
  | { type: 'clear-done' }

type State = { todos: Todo[]; filter: Filter; nextId: number }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: state.nextId, text: action.text, done: false },
        ],
        nextId: state.nextId + 1,
      }
    case 'toggle':
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.id ? { ...t, done: !t.done } : t
        ),
      }
    case 'remove':
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.id),
      }
    case 'filter':
      return { ...state, filter: action.filter }
    case 'clear-done':
      return { ...state, todos: state.todos.filter((t) => !t.done) }
    default:
      return state
  }
}

const INITIAL_STATE: State = {
  todos: [
    { id: 1, text: 'useMemo 스테이지 클리어', done: true },
    { id: 2, text: '커스텀 훅 설계하기', done: false },
    { id: 3, text: 'Zustand 코드 훑기', done: false },
  ],
  filter: 'all',
  nextId: 4,
}

// useState 방식
function UseStateTodo() {
  const [todos, setTodos] = useState(INITIAL_STATE.todos)
  const [filter, setFilter] = useState<Filter>('all')
  const [nextId, setNextId] = useState(INITIAL_STATE.nextId)
  const [draft, setDraft] = useState('')

  const addTodo = () => {
    if (!draft.trim()) return
    setTodos([...todos, { id: nextId, text: draft.trim(), done: false }])
    setNextId(nextId + 1)
    setDraft('')
  }
  const toggle = (id: number) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  const remove = (id: number) => setTodos(todos.filter((t) => t.id !== id))
  const clearDone = () => setTodos(todos.filter((t) => !t.done))

  return (
    <TodoView
      title='📦 useState 방식'
      tone='gray'
      todos={todos}
      filter={filter}
      draft={draft}
      onDraft={setDraft}
      onAdd={addTodo}
      onToggle={toggle}
      onRemove={remove}
      onFilter={setFilter}
      onClearDone={clearDone}
    />
  )
}

// useReducer 방식
function UseReducerTodo() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  const [draft, setDraft] = useState('')

  const addTodo = () => {
    if (!draft.trim()) return
    dispatch({ type: 'add', text: draft.trim() })
    setDraft('')
  }

  return (
    <TodoView
      title='⚙️ useReducer 방식'
      tone='purple'
      todos={state.todos}
      filter={state.filter}
      draft={draft}
      onDraft={setDraft}
      onAdd={addTodo}
      onToggle={(id) => dispatch({ type: 'toggle', id })}
      onRemove={(id) => dispatch({ type: 'remove', id })}
      onFilter={(filter) => dispatch({ type: 'filter', filter })}
      onClearDone={() => dispatch({ type: 'clear-done' })}
    />
  )
}

type ViewProps = {
  title: string
  tone: 'gray' | 'purple'
  todos: Todo[]
  filter: Filter
  draft: string
  onDraft: (v: string) => void
  onAdd: () => void
  onToggle: (id: number) => void
  onRemove: (id: number) => void
  onFilter: (f: Filter) => void
  onClearDone: () => void
}

function TodoView({
  title,
  tone,
  todos,
  filter,
  draft,
  onDraft,
  onAdd,
  onToggle,
  onRemove,
  onFilter,
  onClearDone,
}: ViewProps) {
  const visible = todos.filter((t) => {
    if (filter === 'active') return !t.done
    if (filter === 'done') return t.done
    return true
  })

  return (
    <div
      className={cn(
        'rounded-xl p-4 ring-1',
        tone === 'purple'
          ? 'bg-[#f5f3ff] ring-purple-200'
          : 'bg-white ring-gray-200'
      )}
    >
      <div
        className={cn(
          'mb-2 text-xs font-bold tracking-wider uppercase',
          tone === 'purple' ? 'text-purple-700' : 'text-gray-600'
        )}
      >
        {title}
      </div>

      <div className='mb-3 flex gap-2'>
        <input
          value={draft}
          onChange={(e) => onDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onAdd()
          }}
          placeholder='할 일 추가'
          className='flex-1 rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs focus:border-[#4576fc] focus:outline-none'
        />
        <button
          type='button'
          onClick={onAdd}
          className='rounded-full bg-[#4576fc] px-3 py-1 text-xs font-bold text-white hover:bg-[#2355de]'
        >
          ➕
        </button>
      </div>

      <div className='mb-2 flex gap-1 text-[10px]'>
        {(['all', 'active', 'done'] as Filter[]).map((f) => (
          <button
            key={f}
            type='button'
            onClick={() => onFilter(f)}
            className={cn(
              'rounded-full px-2 py-0.5 font-semibold transition',
              filter === f
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            {f}
          </button>
        ))}
        <button
          type='button'
          onClick={onClearDone}
          className='ml-auto rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600 hover:bg-gray-200'
        >
          완료 비우기
        </button>
      </div>

      <ul className='max-h-40 space-y-1 overflow-y-auto'>
        {visible.map((t) => (
          <li
            key={t.id}
            className='flex items-center gap-2 rounded-md bg-white px-2 py-1 text-xs ring-1 ring-gray-100'
          >
            <input
              type='checkbox'
              checked={t.done}
              onChange={() => onToggle(t.id)}
              className='cursor-pointer'
            />
            <span
              className={cn('flex-1', t.done && 'text-gray-400 line-through')}
            >
              {t.text}
            </span>
            <button
              type='button'
              onClick={() => onRemove(t.id)}
              className='text-gray-300 hover:text-red-500'
              aria-label='삭제'
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function TodoReducer() {
  return (
    <div className='rounded-2xl border-2 border-gray-200 bg-gray-50/70 p-5'>
      <div className='mb-3 rounded-lg bg-white p-4 text-sm text-gray-700 ring-1 ring-gray-100'>
        <p>
          🎯 <b>관찰 포인트</b>: 두 Todo 모두 동일한 기능이야. 양쪽을 조작하며
          어느 쪽 코드 관리가 편할지 직관적으로 느껴봐.
        </p>
        <ul className='mt-2 space-y-1'>
          <li>
            📦 <b>useState</b>: todos, filter, nextId 3개 state를 각자 관리.
            이벤트 핸들러마다 2~3번씩 <code>setX</code> 호출.
          </li>
          <li>
            ⚙️ <b>useReducer</b>: 모든 state를 한 객체로 모으고, 변화는 액션으로
            표현. 컴포넌트는 <code>dispatch</code>만 하면 됨.
          </li>
        </ul>
      </div>

      <div className='mb-4 grid gap-3 md:grid-cols-2'>
        <UseStateTodo />
        <UseReducerTodo />
      </div>

      <BeforeAfter
        before={{
          label: '❌ 여러 state가 흩어진 useState',
          code: `const [todos, setTodos] = useState<Todo[]>([])
const [filter, setFilter] = useState<Filter>('all')
const [nextId, setNextId] = useState(1)

const addTodo = () => {
  setTodos([...todos, { id: nextId, text, done: false }])
  setNextId(nextId + 1)
  setText('')
}

const toggle = (id: number) =>
  setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t))`,
          takeaway:
            '상태가 커질수록 set 호출이 여러 곳에서 흩어짐. 규칙성을 잃기 쉬움',
        }}
        after={{
          label: '✅ 액션 + reducer로 변화 모으기',
          code: `type Action =
  | { type: 'add'; text: string }
  | { type: 'toggle'; id: number }
  | { type: 'filter'; filter: Filter }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add': return { ...state, todos: [...], nextId: ... }
    case 'toggle': return { ...state, todos: state.todos.map(...) }
    case 'filter': return { ...state, filter: action.filter }
  }
}

const [state, dispatch] = useReducer(reducer, initialState)
// 컴포넌트 쪽에선 dispatch({ type: 'toggle', id })만`,
          takeaway:
            '변화 종류가 타입 시스템으로 강제됨. 테스트도 순수 reducer 단위로 쉬움',
        }}
      />

      <div className='mt-4 rounded-xl border-2 border-gray-100 bg-white p-4 text-sm'>
        <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
          💭 useState vs useReducer 선택 기준
        </div>
        <ul className='space-y-1 text-gray-700'>
          <li>
            📦 <b>useState</b> — 1~2개 state, 변화가 단순, 로컬 폼 같은 경우
          </li>
          <li>
            ⚙️ <b>useReducer</b> — 3+ state가 얽힘, 변화가 액션 타입별로 분명,
            테스트·타임트래블이 필요할 때
          </li>
          <li>
            🌊 전역이 되면? → Context + Reducer, 또는 Zustand/RTK 등 라이브러리.
          </li>
        </ul>
      </div>
    </div>
  )
}
