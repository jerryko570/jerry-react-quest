import UseDebounceDemo from './UseDebounceDemo'
import UseCopyDemo from './UseCopyDemo'
import CodeBlock from '@/components/stages/CodeBlock'
import StageFlow from '@/components/stages/StageFlow'

export default function CustomHooksPlayground() {
  return (
    <StageFlow>
      <StageFlow.Empathy>
        🧩 &quot;이 로직, 다른 컴포넌트에서도 썼었는데...&quot; — 복붙 대신 훅
        하나 만들면 돼.
      </StageFlow.Empathy>

      <StageFlow.Play subtitle='입력창에 빠르게 타이핑해봐'>
        <UseDebounceDemo />
      </StageFlow.Play>

      <StageFlow.Observe
        title='🤔 API 호출 횟수가 왜 적지?'
        subtitle='키 입력은 많은데'
      >
        <p>
          🟢 <code>useDebounce</code> 훅이 &quot;입력이 멈춘 뒤 N ms가 지났을
          때만 값 넘겨줘&quot;라고 약속해.
        </p>
        <p className='mt-3'>
          🟢 훅 안에 <code>useState</code> + <code>useEffect</code> +{' '}
          <code>setTimeout</code> 조합. 복잡한 로직을 깔끔한 한 줄로 재사용.
        </p>
      </StageFlow.Observe>

      <StageFlow.Deepen
        title='📋 이번엔 "복사됨" 상태 훅'
        subtitle='클립보드 + 자동 리셋 타이머'
      >
        <UseCopyDemo />
      </StageFlow.Deepen>

      <StageFlow.Next subtitle='코드 + 정리 + 다음'>
        <p className='mb-4'>
          ✔️ 이름이 <code>use</code>로 시작하면 <b>커스텀 훅</b>. 그 안에서 다른
          훅을 자유롭게 조합.
        </p>
        <CodeBlock
          filename='useDebounce.ts'
          code={`function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)   // ← cleanup으로 이전 타이머 취소
  }, [value, delay])
  return debounced
}`}
        />
        <p className='mt-5 text-gray-700'>
          다음은 DOM과 &quot;렌더와 무관한 값&quot;을 다루는 <b>useRef</b> 🚀
        </p>
      </StageFlow.Next>
    </StageFlow>
  )
}
