import OptimisticLike from './OptimisticLike'
import CodeBlock from '@/components/stages/CodeBlock'
import StageFlow from '@/components/stages/StageFlow'

export default function React19ActionsPlayground() {
  return (
    <StageFlow>
      <StageFlow.Empathy>
        ⚡ &quot;좋아요 눌렀는데 1초 기다려야 UI 바뀌는 거 답답해&quot; — React
        19 Actions로 즉시.
      </StageFlow.Empathy>

      <StageFlow.Play subtitle='좋아요 연타. 20% 실패 확률'>
        <OptimisticLike />
      </StageFlow.Play>

      <StageFlow.Observe title='🤔 누르자마자 UI 바뀌고, 실패하면 롤백되네'>
        <p>
          🟢 <code>useOptimistic</code>이 UI 미리 업데이트, 서버 실패 시 자동
          롤백.
        </p>
        <p className='mt-3'>
          🟢 <code>useActionState</code>가 pending·결과·에러를 한 훅에.
        </p>
      </StageFlow.Observe>

      <StageFlow.Next subtitle='코드 + 정리 + 다음'>
        <p className='mb-4'>
          ✔️ Server Actions와 조합 시 폼이 <b>JS 없이도 동작</b>.
        </p>
        <CodeBlock
          filename='Actions 3종 세트'
          code={`const [optimistic, add] = useOptimistic(real, (cur, id) => ...)
const [error, action, isPending] = useActionState(async (_p, id) => {
  const r = await serverAction(id)
  return r.error
}, null)

startTransition(() => {
  add(id)      // 낙관적 UI
  action(id)   // 서버 호출
})`}
        />
        <p className='mt-5 text-gray-700'>다음은 Next.js App Router 🚀</p>
      </StageFlow.Next>
    </StageFlow>
  )
}
