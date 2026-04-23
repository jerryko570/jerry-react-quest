'use client'

import { memo, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import BeforeAfter from '@/components/stages/BeforeAfter'

type ChildProps = {
  id: string
  bg: string
}

function ChildInner({ id, bg }: ChildProps) {
  const renders = useRef(0)
  // 교육용 렌더 카운터 — 의도된 렌더 중 ref 조작
  // eslint-disable-next-line react-hooks/refs
  renders.current += 1
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-1 rounded-xl p-4 text-center',
        bg
      )}
    >
      <span className='text-2xl'>{id}</span>
      <span className='font-mono text-xs text-gray-600'>내가 그려진 횟수</span>
      {/* eslint-disable-next-line react-hooks/refs */}
      <span className='font-mono text-2xl font-bold'>{renders.current}</span>
    </div>
  )
}

const ChildMemo = memo(ChildInner)

export default function RenderFlow() {
  const [parentRenders, setParentRenders] = useState(0)
  const [isMemoOn, setIsMemoOn] = useState(false)

  const Child = isMemoOn ? ChildMemo : ChildInner

  return (
    <div className='rounded-2xl border-2 border-gray-200 bg-gray-50/70 p-5'>
      <div className='mb-4 flex flex-wrap items-center gap-3'>
        <button
          type='button'
          onClick={() => setParentRenders((r) => r + 1)}
          className='rounded-full bg-[#ff5e48] px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-[#ec4b36]'
        >
          🎲 부모 리렌더 {parentRenders}
        </button>
        <button
          type='button'
          onClick={() => setIsMemoOn((v) => !v)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-bold transition',
            isMemoOn
              ? 'bg-emerald-500 text-white'
              : 'border border-gray-300 bg-white text-gray-700'
          )}
        >
          {isMemoOn ? '✅ React.memo 켜짐' : '⬜️ React.memo 꺼짐'}
        </button>
      </div>

      <div className='mb-3 rounded-lg bg-white p-4 ring-1 ring-gray-100'>
        <p className='text-sm text-gray-700'>
          {isMemoOn ? (
            <>
              🛡️ <b>React.memo</b>로 자식을 감쌌어. 부모만 리렌더되고 자식
              props가 그대로면, 리액트는 자식 리렌더를 <b>건너뛰어</b>. 카운터
              숫자가 그대로인지 봐봐.
            </>
          ) : (
            <>
              🎡 부모 버튼을 누르면 부모가 리렌더돼. 기본 동작은{' '}
              <b>자식들도 전부 함께 리렌더</b>되는 거야. 자식 카드 안의 숫자가
              계속 올라가는 걸 보고 느껴봐.
            </>
          )}
        </p>
      </div>

      <div className='mb-4 grid grid-cols-3 gap-3 rounded-xl bg-linear-to-br from-indigo-50 to-violet-50 p-4'>
        <Child id='🟢' bg='bg-white' />
        <Child id='🔵' bg='bg-white' />
        <Child id='🟠' bg='bg-white' />
      </div>

      <BeforeAfter
        before={{
          label: 'React.memo 없이',
          code: `function Child({ label }: { label: string }) {
  return <div>{label}</div>
}

// 부모가 리렌더될 때마다 자식도 함께 리렌더됨`,
          takeaway:
            '부모가 state를 바꾸면 자식도 전부 다시 그려짐. 자식이 무거우면 부하 ↑',
        }}
        after={{
          label: 'React.memo로 감싸면',
          code: `const Child = memo(function Child({ label }: { label: string }) {
  return <div>{label}</div>
})

// props 참조가 같으면 React가 리렌더를 스킵함`,
          takeaway:
            'props가 그대로면 리액트가 "어차피 같다"고 판단해 자식 리렌더 스킵',
        }}
      />

      <div className='mt-4 rounded-xl border-2 border-gray-100 bg-white p-4 text-sm'>
        <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
          💭 왜 이게 중요한가
        </div>
        <ul className='space-y-1 text-gray-700'>
          <li>
            🎯 기본 규칙: <b>부모가 다시 그려지면 자식도 다시 그려진다</b>.
            리렌더는 전염돼.
          </li>
          <li>
            🕰️ 대부분의 경우 이 전염은 빨라서 문제 없음. 근데 리스트가 크거나
            계산이 무거운 자식이 있으면 체감이 시작돼.
          </li>
          <li>
            🛡️ <b>React.memo</b>는 &quot;props가 같으면 나는 안 그려도 돼&quot;
            라고 약속하는 껍데기. useMemo/useCallback으로 props 참조를 같이
            지켜줘야 진짜 효과.
          </li>
        </ul>
      </div>
    </div>
  )
}
