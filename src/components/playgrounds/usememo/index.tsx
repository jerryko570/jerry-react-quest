import CalmDeepen from './CalmDeepen'
import ChaosPlay from './ChaosPlay'
import CodeBlock from '@/components/stages/CodeBlock'
import StageFlow from '@/components/stages/StageFlow'

export default function UseMemoPlayground() {
  return (
    <StageFlow>
      <StageFlow.Empathy>
        😅 &quot;카운터 버튼 눌렀을 뿐인데 브라우저가 왜 버벅거리지?&quot; — 이
        감각을 한 번 느끼면 useMemo가 왜 있는지 자연스럽게 이해돼.
      </StageFlow.Empathy>

      <StageFlow.Play subtitle='카운터 버튼을 연타해봐'>
        <ChaosPlay />
      </StageFlow.Play>

      <StageFlow.Observe
        title='🤔 어? 눌렀는데 화면이 버벅거려. 왜?'
        subtitle='40개 카드가 각자 무거운 계산을 하고 있거든'
      >
        <p>
          화면이 다시 그려질 (= 리렌더) 때마다 카드 40개가 <b>전부 처음부터</b>{' '}
          계산해. 카드 안 값은 그대로인데도. 이게 리액트의 기본 동작이야.
        </p>
      </StageFlow.Observe>

      <StageFlow.Deepen
        title='🧠 이번엔 "기억해두기" 켜고 눌러봐'
        subtitle='useMemo 토글 ON'
      >
        <CalmDeepen />
        <p className='mt-3 text-[13px] text-gray-700'>
          🔍 <b>기억해두기</b>(= 메모이제이션) 켜면 카드가 처음 한 번만 계산하고
          결과를 적어둬. 다음엔 같은 seed라 다시 계산 안 해 — ms가 거의 0.
        </p>
      </StageFlow.Deepen>

      <StageFlow.Next subtitle='한 줄 정리 + 다음'>
        <p className='mb-3'>
          ✔️ 같은 입력이면 지난번 답을 재사용 — 이게 <b>useMemo</b>. 무거운
          계산에만 쓰면 돼.
        </p>
        <CodeBlock
          filename='Chaos vs Calm'
          code={`function ChaosCard({ seed }: { seed: number }) {
  const value = heavy(seed)                         // 🚫 매번 다시 계산
  return <div>{value}</div>
}

function CalmCard({ seed }: { seed: number }) {
  const value = useMemo(() => heavy(seed), [seed])  // ✅ seed 같으면 재사용
  return <div>{value}</div>
}`}
        />
        <p className='mt-3 text-gray-700'>
          다음은 &quot;함수&quot;도 기억해두는 <b>useCallback</b> 차례야 🚀
        </p>
      </StageFlow.Next>
    </StageFlow>
  )
}
