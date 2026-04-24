import BasicPlay from './BasicPlay'
import DeepenPlay from './DeepenPlay'
import StageFlow from '@/components/stages/StageFlow'

export default function RenderingPlayground() {
  return (
    <StageFlow>
      <StageFlow.Empathy>
        🙋 &quot;버튼 하나 눌렀을 뿐인데 왜 다른 애들도 움직이지?&quot; — 나도
        처음엔 당황했거든.
      </StageFlow.Empathy>

      <StageFlow.Play subtitle='버튼 눌러봐. 숫자 3개가 뭘 하는지만 봐'>
        <BasicPlay />
      </StageFlow.Play>

      <StageFlow.Observe
        title='🤔 어? 내가 안 건드린 🟢🔵🟠도 숫자가 올랐네?'
        subtitle='왜 그랬을까?'
      >
        <p>
          부모가 &quot;다시 그리기&quot; (= 리렌더) 되면 자식 세 명도 덩달아
          다시 그려져. 리액트는 원래 이렇게 움직여 — 자식 &quot;부모가 준
          값&quot; (= props)이 안 바뀌었어도 그래.
        </p>
      </StageFlow.Observe>

      <StageFlow.Deepen
        title='🛡️ 자식에게 방패 씌우고 다시 눌러봐'
        subtitle='이번엔 토글 ON'
      >
        <DeepenPlay />
        <p className='mt-3 text-[13px] text-gray-700'>
          🔍 방패 켜면 자식이 &quot;나 props 그대로인데 굳이 다시 그려?&quot;
          하고 건너뛰어. 이게 <code>React.memo</code>가 하는 일이야.
        </p>
      </StageFlow.Deepen>

      <StageFlow.Next subtitle='한 줄 정리 + 다음'>
        <p className='mb-2'>
          ✔️ <b>부모가 그려지면 자식도 같이 그려진다</b> — 이게 기본.
        </p>
        <p className='text-gray-700'>
          다음은 &quot;정말 비싼 계산&quot;을 기억해두기(= 메모이제이션)로
          건너뛰는 <b>useMemo</b> 차례야 🚀
        </p>
      </StageFlow.Next>
    </StageFlow>
  )
}
