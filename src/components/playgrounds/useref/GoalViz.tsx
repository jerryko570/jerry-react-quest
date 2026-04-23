import { ReactNode } from 'react'

export default function UseRefGoalViz() {
  return (
    <section>
      <header className='mb-4'>
        <h3 className='text-lg font-extrabold'>🎯 학습 목표 — 풀어서 보기</h3>
        <p className='text-sm text-gray-500'>
          렌더와 무관한 저장소, 그리고 DOM으로 가는 통로.
        </p>
      </header>

      <div className='grid gap-4 md:grid-cols-2'>
        <GoalCard
          index='1'
          emoji='🎭'
          title='useRef의 2가지 용도'
          hook='DOM 접근 / 렌더와 무관한 값 저장'
        >
          <p>
            리액트에서 useRef는 사실 <b>같은 도구의 두 가지 쓰임</b>이야.
          </p>
          <ol className='mt-2 list-decimal space-y-1 pl-5 text-[13px]'>
            <li>
              <b>DOM 노드 참조</b>: <code>{'<input ref={myRef} />'}</code> —
              리액트가 마운트 후 current에 실제 DOM을 넣어줌. focus·scroll·측정.
            </li>
            <li>
              <b>값 저장 (mutable container)</b>: 타이머 id, 이전 값, 외부 구독
              id처럼 <b>화면에 표시하진 않지만 렌더 사이에 기억해야 할</b> 값.
            </li>
          </ol>
        </GoalCard>

        <GoalCard
          index='2'
          emoji='⚖️'
          title='useState와 뭐가 다른가'
          hook='값 바뀌어도 리렌더 안 한다'
        >
          <p>
            가장 큰 차이는 &quot;리렌더 트리거 여부&quot;. useState는 바꾸면
            다시 그려져. useRef는 <code>current</code>를 바꿔도{' '}
            <b>리렌더 안 됨</b>.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`// 리렌더됨
const [n, setN] = useState(0)
setN(1)  // 즉시 리렌더

// 리렌더 안 됨
const ref = useRef(0)
ref.current = 1  // 조용히 바뀜`}
          </pre>
          <p className='mt-2 text-[12px] text-gray-500'>
            👉 화면에 &quot;보여야&quot; 하는 값이면 state, 아니면 ref.
          </p>
        </GoalCard>

        <GoalCard
          index='3'
          emoji='🤝'
          title='forwardRef 패턴'
          hook='자식 컴포넌트의 DOM을 부모가 제어'
        >
          <p>
            커스텀 컴포넌트에 ref를 넘기려면 <code>forwardRef</code>로 감싸야
            했어 (React 19부터는 일부 경우 생략 가능).
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`const FancyInput = forwardRef<HTMLInputElement, Props>(
  (props, ref) => <input ref={ref} {...props} />
)

// 부모
const inputRef = useRef<HTMLInputElement>(null)
<FancyInput ref={inputRef} />
<button onClick={() => inputRef.current?.focus()}>포커스</button>`}
          </pre>
        </GoalCard>

        <GoalCard
          index='4'
          emoji='⚠️'
          title='렌더 중에는 읽지도 쓰지도 말기'
          hook='"커밋 이후"가 ref의 무대'
        >
          <p>
            리액트의 동시성 렌더링에서 ref는 <b>커밋 이후에만 안정</b>해. 렌더
            중 ref.current를 바꾸면 결과가 꼬일 수 있어.
          </p>
          <p className='mt-2'>
            규칙: <b>event handler</b>, <b>useEffect</b>, <b>useLayoutEffect</b>{' '}
            안에서 읽고 써라. 렌더 본문에서 조작하지 말 것.
          </p>
          <p className='mt-3 rounded-lg bg-amber-50 p-2 text-[12px] text-amber-900'>
            ⚠️ 놀이기구 예제에 렌더 중 ref 접근이 있지만 그건 교육용 의도 —
            ESLint도 경고.
          </p>
        </GoalCard>
      </div>
    </section>
  )
}

function GoalCard({
  index,
  emoji,
  title,
  hook,
  children,
}: {
  index: string
  emoji: string
  title: string
  hook: string
  children: ReactNode
}) {
  return (
    <article className='rounded-2xl border-2 border-gray-100 bg-white p-5'>
      <header className='mb-3 flex items-start gap-3'>
        <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-900 font-mono text-xs font-bold text-white'>
          {index}
        </span>
        <div>
          <h4 className='font-extrabold'>
            <span className='mr-1'>{emoji}</span>
            {title}
          </h4>
          <p className='mt-0.5 text-xs text-[#ff5e48]'>💡 {hook}</p>
        </div>
      </header>
      <div className='space-y-2 text-sm text-gray-700'>{children}</div>
    </article>
  )
}
