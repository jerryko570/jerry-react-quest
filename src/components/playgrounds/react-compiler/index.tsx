import CompilerDemo from './CompilerDemo'
import StageFlow from '@/components/stages/StageFlow'

export default function ReactCompilerPlayground() {
  return (
    <StageFlow>
      <StageFlow.Empathy>
        🤖 &quot;또 memo 감싸야 해?&quot; — 2026년 React Compiler가 대부분
        자동화해줘.
      </StageFlow.Empathy>

      <StageFlow.Play subtitle='4개 시나리오 Before/After 넘기며'>
        <CompilerDemo />
      </StageFlow.Play>

      <StageFlow.Observe title='🤔 왜 자동화 방향으로?'>
        <p>
          🟢 Compiler가 빌드 타임에 코드 분석해 useMemo/useCallback/memo 자동
          주입.
        </p>
        <p className='mt-3'>
          🟢 개발자는 평범하게 쓰고, 컴파일러가 성능 최적화 대신. 분석 못 하는
          특수 케이스만 수동.
        </p>
      </StageFlow.Observe>

      <StageFlow.Next subtitle='정리 + 다음'>
        <p className='mb-3'>
          ✔️ 2026년 기준 <b>React 19 + Compiler</b>가 표준. 점진적 적용 가능.
        </p>
        <p className='text-gray-700'>
          다음은 렌더링 최적화 <b>보스전</b> 🚀
        </p>
      </StageFlow.Next>
    </StageFlow>
  )
}
