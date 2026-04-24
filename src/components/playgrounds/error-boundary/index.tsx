import Explosion from './Explosion'
import CodeBlock from '@/components/stages/CodeBlock'
import StageFlow from '@/components/stages/StageFlow'

export default function ErrorBoundaryPlayground() {
  return (
    <StageFlow>
      <StageFlow.Empathy>
        💥 &quot;자식 하나 터졌는데 페이지 전체가 하얘져버림&quot; —
        프로덕션에서 제일 흔한 지옥이야.
      </StageFlow.Empathy>

      <StageFlow.Play subtitle='💥 터뜨리기 버튼부터 눌러봐'>
        <Explosion />
      </StageFlow.Play>

      <StageFlow.Observe
        title='🤔 Error Boundary 끄면 화면이 하얘져'
        subtitle='왜 그럴까?'
      >
        <p>
          🟢 리액트는 자식이 throw하면 <b>상위 전체를 언마운트</b>해. 안전하게
          다루지 않으면 앱 통째가 날아가.
        </p>
        <p className='mt-2'>
          🟢 <code>ErrorBoundary</code>로 감싸면 그 안쪽에서만 격리되고, 다른
          영역은 그대로. 폴백 UI로 &quot;다시 시도&quot; 까지 제공 가능.
        </p>
      </StageFlow.Observe>

      <StageFlow.Next subtitle='코드 + 정리 + 다음'>
        <p className='mb-3'>
          ✔️ 에러 날 가능성이 있는 섹션은 <b>Error Boundary로 감싼다</b>.
          렌더·생성자·라이프사이클 오류만 잡음 — 이벤트 핸들러·비동기는
          try/catch로.
        </p>
        <CodeBlock
          filename='react-error-boundary (실전)'
          code={`import { ErrorBoundary } from 'react-error-boundary'

<ErrorBoundary
  FallbackComponent={ErrorFallback}
  onReset={() => queryClient.resetQueries()}
>
  <DangerousSection />
</ErrorBoundary>`}
        />
        <p className='mt-4 text-gray-700'>
          🎣 훅 탭은 여기서 완주. 다음은 <b>useMemo</b>부터 시작하는 ⚡ 성능 탭
          🚀
        </p>
      </StageFlow.Next>
    </StageFlow>
  )
}
