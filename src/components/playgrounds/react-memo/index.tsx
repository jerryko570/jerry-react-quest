import MemoShallow from './MemoShallow'
import CodeBlock from '@/components/stages/CodeBlock'
import StageFlow from '@/components/stages/StageFlow'

export default function ReactMemoPlayground() {
  return (
    <StageFlow>
      <StageFlow.Empathy>
        🛡️ &quot;memo로 감쌌는데 왜 효과 없어?&quot; — props 타입에 따라 결과가
        전혀 달라.
      </StageFlow.Empathy>

      <StageFlow.Play subtitle='🎲 부모 리렌더 눌러봐. 세 자식 카운트 차이'>
        <MemoShallow />
      </StageFlow.Play>

      <StageFlow.Observe title='🤔 세 자식 모두 memo인데 왜 다르게 행동?'>
        <p>🟢 얕은 비교 — primitive(number)는 값으로 비교 → 같으면 스킵.</p>
        <p className='mt-3'>
          🟢 객체·배열·함수는 참조로 비교. 매번 새로 만들면 항상
          &quot;다름&quot;.
          <code>useMemo</code>로 고정해야 함.
        </p>
      </StageFlow.Observe>

      <StageFlow.Next subtitle='코드 + 정리 + 다음'>
        <p className='mb-4'>
          ✔️ memo 혼자선 반쪽. <b>useMemo/useCallback과 세트</b>로.
        </p>
        <CodeBlock
          filename='3종 세트'
          code={`const HeavyChild = memo(ChildImpl)

function Parent() {
  const items = useMemo(() => build(), [])
  const onAction = useCallback(fn, [])
  return <HeavyChild items={items} onAction={onAction} />
}`}
        />
        <p className='mt-5 text-gray-700'>
          다음은 <b>React Compiler</b> 🚀
        </p>
      </StageFlow.Next>
    </StageFlow>
  )
}
