import FocusDemo from './FocusDemo'
import PreviousDemo from './PreviousDemo'
import CodeBlock from '@/components/stages/CodeBlock'
import StageFlow from '@/components/stages/StageFlow'

export default function UseRefPlayground() {
  return (
    <StageFlow>
      <StageFlow.Empathy>
        🎯 &quot;input에 자동으로 커서 가게 하고 싶은데 어떻게 하지?&quot; —
        useState로 고민하지 말고 ref로 해.
      </StageFlow.Empathy>

      <StageFlow.Play subtitle='포커스 · 스크롤 버튼 눌러봐'>
        <FocusDemo />
      </StageFlow.Play>

      <StageFlow.Observe
        title='🤔 버튼 눌러도 리렌더가 안 됐는데 왜 움직여?'
        subtitle='ref는 state와 다르거든'
      >
        <p>
          🟢 <code>useRef</code>는 &quot;렌더와 무관한 저장소&quot;. 바뀌어도
          리액트가 다시 그리지 않아.
        </p>
        <p className='mt-3'>
          🟢 <b>DOM 노드 포인터</b>로도 써.{' '}
          <code>{'<input ref={myRef} />'}</code> 하면 current에 실제 DOM이
          들어와.
        </p>
      </StageFlow.Observe>

      <StageFlow.Deepen
        title='🕓 이번엔 "이전 값" 기억하는 usePrevious'
        subtitle='렌더와 무관한 저장소 응용'
      >
        <PreviousDemo />
      </StageFlow.Deepen>

      <StageFlow.Next subtitle='코드 + 정리 + 다음'>
        <p className='mb-4'>
          ✔️ 화면에 <b>보여야 하는 값</b>이면 state, 아니면 ref.
        </p>
        <div className='grid gap-4 md:grid-cols-2'>
          <div>
            <div className='mb-2 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800'>
              📍 DOM 접근용
            </div>
            <CodeBlock
              filename='input 포커스'
              code={`const inputRef = useRef<HTMLInputElement>(null)

<input ref={inputRef} />
<button onClick={() => inputRef.current?.focus()}>포커스</button>`}
            />
          </div>
          <div>
            <div className='mb-2 inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-800'>
              📦 값 저장용
            </div>
            <CodeBlock
              filename='usePrevious'
              code={`function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)
  useEffect(() => { ref.current = value }, [value])
  return ref.current
}`}
            />
          </div>
        </div>
        <p className='mt-5 text-gray-700'>
          다음은 자식 에러를 깔끔하게 잡는 <b>Error Boundary</b> 🚀
        </p>
      </StageFlow.Next>
    </StageFlow>
  )
}
