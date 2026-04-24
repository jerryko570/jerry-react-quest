import CardPlayground, {
  type CardPlaygroundItem,
} from '@/components/stages/CardPlayground'
import StageFlow from '@/components/stages/StageFlow'

const CARDS: CardPlaygroundItem[] = [
  {
    id: 'server-fetch',
    emoji: '🖥️',
    title: 'Server Component fetch',
    subtitle: 'SEO · 초기 로드 ↑',
    filename: 'app/posts/page.tsx',
    code: `export default async function PostsPage() {
  const posts = await fetch(url, { next: { revalidate: 60 } }).then(r => r.json())
  return <PostList items={posts} />
}`,
    note: '서버에서 fetch → HTML로 hydration. SEO·LCP 최적.',
    pros: ['✅ SEO', '✅ JS 번들 작음', '✅ DB·API키 안전'],
    cons: ['⚠️ 인터랙션 필요하면 클라 조합'],
  },
  {
    id: 'client-query',
    emoji: '🌐',
    title: 'Client + TanStack Query',
    subtitle: '인터랙션 · 무한 스크롤',
    filename: 'InfinitePosts.tsx',
    code: `'use client'
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['posts'],
  queryFn: ({ pageParam = 0 }) => fetch('/api?cursor=' + pageParam).then(r => r.json()),
  getNextPageParam: (last) => last.nextCursor,
  initialPageParam: 0,
})`,
    note: '세밀한 캐시·dedup·refetch가 필요할 때.',
    pros: ['✅ 세밀한 캐시', '✅ 인터랙션과 잘 맞음'],
    cons: ['⚠️ JS 번들 ↑', '⚠️ 중복 상태 주의'],
  },
  {
    id: 'streaming',
    emoji: '🌊',
    title: 'Streaming SSR',
    subtitle: 'Suspense로 느린 것만 대기',
    filename: 'dashboard/page.tsx',
    code: `export default function Dashboard() {
  return (
    <>
      <FastHeader />
      <Suspense fallback={<StatsSkeleton />}><SlowStats /></Suspense>
      <Suspense fallback={<ChartsSkeleton />}><SlowCharts /></Suspense>
    </>
  )
}`,
    note: 'Suspense boundary가 스트리밍 단위. TTFB·LCP 개선.',
  },
  {
    id: 'revalidation',
    emoji: '⏱',
    title: 'Revalidation',
    subtitle: '시간·태그·수동',
    filename: 'fetch options',
    code: `// 시간 기반
fetch(url, { next: { revalidate: 60 } })

// 태그 기반
fetch(url, { next: { tags: ['posts'] } })
revalidateTag('posts')      // Server Action에서
revalidatePath('/posts')    // 특정 경로

// 비활성화
fetch(url, { cache: 'no-store' })`,
    note: 'on-demand revalidation. 태그 기반이 가장 세밀.',
  },
  {
    id: 'optimistic',
    emoji: '⚡',
    title: 'Optimistic Update',
    subtitle: '응답 전에 UI 반영',
    filename: 'LikeButton.tsx',
    code: `'use client'
const [optimistic, addOptimistic] = useOptimistic(post, (cur, _) => ({
  ...cur, liked: !cur.liked, likes: cur.liked ? cur.likes - 1 : cur.likes + 1
}))

const onClick = () => {
  startTransition(() => {
    addOptimistic()
    togglePostLike(post.id)
  })
}`,
    note: '사용자가 "느리다"고 느끼는 순간 제거. 실패 시 자동 롤백.',
  },
  {
    id: 'mutation',
    emoji: '✏️',
    title: 'Mutation',
    subtitle: '변경 + 관련 쿼리 재시작',
    filename: 'useMutation',
    code: `const { mutate } = useMutation({
  mutationFn: (id) => fetch('/api/posts/' + id, { method: 'DELETE' }),
  onMutate: async (id) => {
    await qc.cancelQueries({ queryKey: ['posts'] })
    const prev = qc.getQueryData(['posts'])
    qc.setQueryData(['posts'], (old) => old.filter(p => p.id !== id))
    return { prev }
  },
  onError: (_e, _id, ctx) => qc.setQueryData(['posts'], ctx.prev),
  onSettled: () => qc.invalidateQueries({ queryKey: ['posts'] }),
})`,
    note: 'mutation + optimistic + invalidate 세트.',
  },
]

export default function DataFetchingPlayground() {
  return (
    <StageFlow>
      <StageFlow.Empathy>
        🔀 &quot;서버에서? 클라에서? 캐시는?&quot; — 6가지 전략 카드로.
      </StageFlow.Empathy>

      <StageFlow.Play subtitle='6장 카드 비교'>
        <CardPlayground items={CARDS} />
      </StageFlow.Play>

      <StageFlow.Observe title='🤔 어떻게 고르지?'>
        <p>
          🟢 <b>SEO·초기 로드</b> 중요하면 서버. <b>인터랙션 많으면</b> 클라.
        </p>
        <p className='mt-3'>
          🟢 자주 바뀌는 데이터는 revalidate·태그로 관리. mutation은
          optimistic이 기본.
        </p>
      </StageFlow.Observe>

      <StageFlow.Next subtitle='다음'>
        <p className='text-gray-700'>
          다음은 로그인·권한 <b>Auth 패턴</b> 🚀
        </p>
      </StageFlow.Next>
    </StageFlow>
  )
}
