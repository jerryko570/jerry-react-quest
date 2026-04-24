import BossMission from './BossMission'
import CodeBlock from '@/components/stages/CodeBlock'
import StageFlow from '@/components/stages/StageFlow'

export default function BossRenderingPlayground() {
  return (
    <StageFlow>
      <StageFlow.Empathy>
        👑 &quot;500개 리스트 스크롤이 덜컥거려&quot; — 이제 3종 세트를 실전에
        적용.
      </StageFlow.Empathy>

      <StageFlow.Play subtitle='기본 모드에서 부모 리렌더 연타'>
        <BossMission />
      </StageFlow.Play>

      <StageFlow.Observe title='🤔 최적화 모드로 바꾸면 ms가 훅 떨어져'>
        <p>
          🟢 <code>useMemo</code>로 데이터 참조 고정 → 자식 &quot;같다&quot;
          판정.
        </p>
        <p className='mt-3'>
          🟢 <code>React.memo</code>로 각 행 감싸 500개가 리렌더 스킵.
        </p>
      </StageFlow.Observe>

      <StageFlow.Next subtitle='코드 + 정리 + 다음'>
        <p className='mb-4'>
          ✔️ 순서: <b>안정 key → 데이터 useMemo → Row memo → 가상화</b>.
        </p>
        <CodeBlock
          filename='500개 리스트 패턴'
          code={`const MemoRow = memo(Row)

function List() {
  const data = useMemo(() => buildData(), [])
  return data.map(item => <MemoRow key={item.id} item={item} />)
}`}
        />
        <p className='mt-5 text-gray-700'>다음은 번들·이미지·Web Vitals 🚀</p>
      </StageFlow.Next>
    </StageFlow>
  )
}
