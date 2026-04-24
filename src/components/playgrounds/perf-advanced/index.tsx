import ChecklistCards from './ChecklistCards'
import StageFlow from '@/components/stages/StageFlow'

export default function PerfAdvancedPlayground() {
  return (
    <StageFlow>
      <StageFlow.Empathy>
        🚀 &quot;리렌더 최적화 다 했는데 여전히 느려&quot; — 그땐
        번들·이미지·Web Vitals로 내려가는 거야.
      </StageFlow.Empathy>

      <StageFlow.Play subtitle='5장 카드 Before/After로 넘겨봐'>
        <ChecklistCards />
      </StageFlow.Play>

      <StageFlow.Observe
        title='🤔 Next.js 기본 기능만 잘 써도 Lighthouse 90+가 가능해'
        subtitle='어떻게?'
      >
        <p>
          🟢 <b>코드 스플리팅</b> (next/dynamic · React.lazy)으로 초기 번들
          축소.
        </p>
        <p className='mt-3'>
          🟢 <code>next/image</code> · <code>next/font</code>로 LCP·CLS 자동
          개선. 나머진 Web Vitals 지표 보며 튜닝.
        </p>
      </StageFlow.Observe>

      <StageFlow.Next subtitle='정리 + 다음'>
        <p className='mb-3'>
          ✔️ 성능은 <b>측정 → 가설 → 수정 → 재측정</b> 루프. 감으로 고치지 말고.
        </p>
        <p className='text-gray-700'>
          ⚡ 성능 탭 완주. 다음은 상태 관리의 시작 <b>useContext</b> 🚀
        </p>
      </StageFlow.Next>
    </StageFlow>
  )
}
