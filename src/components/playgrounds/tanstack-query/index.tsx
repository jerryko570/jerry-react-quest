import QueryCache from './QueryCache'
import CodeBlock from '@/components/stages/CodeBlock'
import StageFlow from '@/components/stages/StageFlow'

export default function TanStackQueryPlayground() {
  return (
    <StageFlow>
      <StageFlow.Empathy>
        🛰️ &quot;useEffect로 fetch 하면 매번 호출, race condition 취약&quot; —
        서버 상태 전용 도구가 필요해.
      </StageFlow.Empathy>

      <StageFlow.Play subtitle='User 1~5 탭을 왔다갔다 해봐'>
        <QueryCache />
      </StageFlow.Play>

      <StageFlow.Observe title='🤔 왜 네트워크 호출이 안 늘어나지?'>
        <p>🟢 queryKey 단위로 캐시. 같은 key면 네트워크 없이 즉시 반환.</p>
        <p className='mt-3'>
          🟢 staleTime 지나면 stale-while-revalidate: 캐시 먼저 보여주고 뒤에서
          refetch.
        </p>
      </StageFlow.Observe>

      <StageFlow.Next subtitle='코드 + 정리 + 다음'>
        <p className='mb-4'>
          ✔️ 서버 상태는 useEffect 대신 <b>TanStack Query</b>로.
        </p>
        <CodeBlock
          filename='useQuery 기본형'
          code={`const { data, isPending } = useQuery({
  queryKey: ['user', id],
  queryFn: () => fetchUser(id),
  staleTime: 5_000,
})`}
        />
        <p className='mt-5 text-gray-700'>다음은 Zustand/Jotai/RTK 비교 🚀</p>
      </StageFlow.Next>
    </StageFlow>
  )
}
