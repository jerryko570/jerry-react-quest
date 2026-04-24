import BasicPlay from './BasicPlay'
import DeepenPlay from './DeepenPlay'
import CodeBlock from '@/components/stages/CodeBlock'
import StageFlow from '@/components/stages/StageFlow'

export default function RenderingPlayground() {
  return (
    <StageFlow>
      <StageFlow.Empathy>
        🙋 &quot;버튼 하나 눌렀을 뿐인데 왜 다른 애들도 움직이지?&quot; — 나도
        처음엔 당황했거든.
      </StageFlow.Empathy>

      <StageFlow.Play subtitle='버튼 눌러봐. 🟢🔵🟠의 시각이 같이 바뀌는지만 봐'>
        <BasicPlay />
      </StageFlow.Play>

      <StageFlow.Observe
        title='🤔 어? 내가 안 건드렸는데 🟢🔵🟠 시각이 같이 움직이네?'
        subtitle='왜 그랬을까?'
      >
        <p>
          🟢 부모가 &quot;다시 그리기&quot;(= 리렌더) 되면 자식 세 명도 덩달아
          같이 그려져.
        </p>
        <p className='mt-2'>
          🟢 자식 &quot;부모가 준 값&quot;(= props)이 안 바뀌었어도 그래 —
          리액트는 원래 이렇게 움직이거든.
        </p>
      </StageFlow.Observe>

      <StageFlow.Deepen
        title='🛡️ 자식에게 방패 켜고 다시 눌러봐'
        subtitle='퀴즈까지 이어서'
      >
        <DeepenPlay />
      </StageFlow.Deepen>

      <StageFlow.Next subtitle='코드 비교 + 한 줄 정리 + 다음'>
        <p className='mb-3'>
          ✔️ <b>부모가 그려지면 자식도 같이 그려진다</b> — 이게 기본.
        </p>
        <p className='mb-4'>
          방패(<code>React.memo</code>)를 씌우면 props가 같을 때만 자식이
          건너뛰어. 코드로는 이렇게 달라.
        </p>
        <div className='grid gap-3 md:grid-cols-2'>
          <div>
            <div className='mb-2 inline-block rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-bold text-red-800'>
              🚫 방패 없음 — 부모 따라 매번 그려짐
            </div>
            <CodeBlock
              filename='Child.tsx'
              code={`function Child({ id }) {
  return <div>{id}</div>
}`}
            />
          </div>
          <div>
            <div className='mb-2 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800'>
              ✅ 방패 있음 — props 같으면 스킵
            </div>
            <CodeBlock
              filename='Child.tsx'
              code={`const Child = memo(function Child({ id }) {
  return <div>{id}</div>
})`}
            />
          </div>
        </div>
        <p className='mt-4 text-gray-700'>
          다음은 &quot;정말 비싼 계산&quot;을 기억해두기(= 메모이제이션)로
          건너뛰는 <b>useMemo</b> 차례야 🚀
        </p>
      </StageFlow.Next>
    </StageFlow>
  )
}
