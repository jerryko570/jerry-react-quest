import SuspenseLab from './SuspenseLab'
import CodeBlock from '@/components/stages/CodeBlock'
import StageFlow from '@/components/stages/StageFlow'

export default function SuspenseUsePlayground() {
  return (
    <StageFlow>
      <StageFlow.Empathy>
        🪜 &quot;로딩 state 관리 너무 귀찮아&quot; — Suspense로 경계에서 처리.
      </StageFlow.Empathy>

      <StageFlow.Play subtitle='중첩 Suspense 토글 켰다 껐다 해봐'>
        <SuspenseLab />
      </StageFlow.Play>

      <StageFlow.Observe title='🤔 스켈레톤이 조각조각 vs 한꺼번에'>
        <p>🟢 중첩 Suspense = 빠른 건 먼저 보여주고 느린 것만 대기.</p>
        <p className='mt-3'>🟢 한 boundary = 둘 다 완료될 때까지 기다림.</p>
      </StageFlow.Observe>

      <StageFlow.Next subtitle='코드 + 정리 + 다음'>
        <p className='mb-4'>
          ✔️ boundary 위치가 UX. React 19 <code>use</code> hook은 Promise를
          Suspense로 throw.
        </p>
        <CodeBlock
          filename='Suspense + use'
          code={`<Suspense fallback={<Skeleton />}>
  <Posts promise={fetchPostsPromise} />
</Suspense>

function Posts({ promise }: Props) {
  const posts = use(promise)   // pending → Suspense
  return <List items={posts} />
}`}
        />
        <p className='mt-5 text-gray-700'>
          다음은 폼의 새 표준 <b>React 19 Actions</b> 🚀
        </p>
      </StageFlow.Next>
    </StageFlow>
  )
}
