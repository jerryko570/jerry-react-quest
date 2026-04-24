import CounterComparison from './CounterComparison'
import StageFlow from '@/components/stages/StageFlow'

export default function StateLibsPlayground() {
  return (
    <StageFlow>
      <StageFlow.Empathy>
        🏛️ &quot;Zustand? Jotai? Redux? 뭐가 제일 좋아?&quot; — 정답 없음.
        상황별 선택.
      </StageFlow.Empathy>

      <StageFlow.Play subtitle='3가지 라이브러리 카드 비교'>
        <CounterComparison />
      </StageFlow.Play>

      <StageFlow.Observe title='🤔 같은 카운터인데 문법이 이렇게 달라'>
        <p>
          🟢 <b>Zustand</b> — 가장 쉬움. Hook 기반 · Provider 없음. 작은~중간 앱
          디폴트.
        </p>
        <p className='mt-3'>
          🟢 <b>Jotai</b> — atomic 패턴. <b>RTK</b> — 대규모 팀·성숙한 devtools.
        </p>
      </StageFlow.Observe>

      <StageFlow.Next subtitle='정리 + 다음'>
        <p className='mb-3'>
          ✔️ 팀이 쓰는 거 따라가. 새 프로젝트면 <b>Zustand</b>로 시작해도 90%
          충분.
        </p>
        <p className='text-gray-700'>
          🗂 상태 관리 완주. 다음은 Suspense + use 🚀
        </p>
      </StageFlow.Next>
    </StageFlow>
  )
}
