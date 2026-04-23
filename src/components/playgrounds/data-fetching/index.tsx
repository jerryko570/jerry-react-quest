import CardPlayground, {
  type CardPlaygroundItem,
} from '@/components/stages/CardPlayground'
import PlaygroundSection from '@/components/stages/PlaygroundSection'
import GoalViz from './GoalViz'

const CARDS: CardPlaygroundItem[] = [
  {
    id: 'server-fetch',
    emoji: '🖥️',
    title: 'Server Component에서 fetch',
    subtitle: 'SEO · 초기 로드 ↑ · 브라우저 JS ↓',
    filename: 'app/posts/page.tsx',
    code: `// Server Component (기본)
export default async function PostsPage() {
  const posts = await fetch('https://api.example.com/posts', {
    next: { revalidate: 60 },   // ISR 60초
  }).then(r => r.json())

  return <PostList items={posts} />
}`,
    note: '서버에서 fetch → HTML로 하이드레이션. SEO·첫 페인트 최적. JS 번들에 fetch 코드·응답 데이터가 들어가지 않아.',
    pros: ['✅ SEO 친화', '✅ JS 번들 작음', '✅ DB·API키 안전'],
    cons: ['⚠️ 사용자별 인터랙션 필요하면 클라 조합 필요'],
  },
  {
    id: 'client-query',
    emoji: '🌐',
    title: 'Client + TanStack Query',
    subtitle: '사용자 상호작용 · 폴링 · 무한 스크롤',
    filename: 'components/InfinitePosts.tsx',
    code: `'use client'
import { useInfiniteQuery } from '@tanstack/react-query'

export default function InfinitePosts() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 0 }) =>
      fetch('/api/posts?cursor=' + pageParam).then(r => r.json()),
    getNextPageParam: (last) => last.nextCursor,
    initialPageParam: 0,
  })

  return (
    <div>
      {data?.pages.flatMap(p => p.items).map(post => <Card key={post.id} {...post} />)}
      {hasNextPage && <button onClick={() => fetchNextPage()}>더 보기</button>}
    </div>
  )
}`,
    note: '클라이언트 상태 · 캐시 · dedup · refetch 정책이 필요할 때. 서버가 준비한 초기 데이터를 hydrate로 넘겨주면 첫 로드도 빠름.',
    pros: ['✅ 세밀한 캐시 제어', '✅ 인터랙션과 잘 맞음'],
    cons: ['⚠️ JS 번들 ↑', '⚠️ 중복 상태 관리 주의'],
  },
  {
    id: 'streaming',
    emoji: '🌊',
    title: 'Streaming SSR',
    subtitle: '느린 부분은 Suspense로 미루고 흘려보내기',
    filename: 'app/dashboard/page.tsx',
    code: `import { Suspense } from 'react'

export default function Dashboard() {
  return (
    <>
      <FastHeader />

      {/* 빠른 것부터 HTML로 흘러나옴 */}
      <Suspense fallback={<StatsSkeleton />}>
        <SlowStats />   {/* 내부에서 긴 DB 쿼리 */}
      </Suspense>

      <Suspense fallback={<ChartsSkeleton />}>
        <SlowCharts />
      </Suspense>
    </>
  )
}`,
    note: 'Suspense boundary가 스트리밍의 단위. 페이지 전체가 준비될 때까지 기다리지 않고 완성된 부분부터 보냄. TTFB·LCP 개선.',
  },
  {
    id: 'revalidation',
    emoji: '⏱',
    title: 'Revalidation 전략',
    subtitle: '시간 기반 · 태그 기반 · 수동',
    filename: 'fetch + revalidate',
    code: `// 1) 시간 기반 — 60초마다 재생성
fetch(url, { next: { revalidate: 60 } })

// 2) 태그 기반 — 데이터 변경 시 즉시 무효화
fetch(url, { next: { tags: ['posts'] } })

// Server Action에서 무효화
'use server'
import { revalidateTag, revalidatePath } from 'next/cache'

export async function createPost(formData: FormData) {
  await db.post.create({...})
  revalidateTag('posts')         // 'posts' 태그 쓰는 모든 fetch 무효화
  revalidatePath('/posts')        // 특정 경로 재생성
}

// 3) 비활성화 — 매번 새로
fetch(url, { cache: 'no-store' })`,
    note: 'on-demand revalidation으로 CMS 업데이트 · 사용자 action 이후 즉각 반영. 태그 기반이 세밀함.',
  },
  {
    id: 'optimistic',
    emoji: '⚡',
    title: 'Optimistic Update',
    subtitle: '서버 응답 전에 UI 선반영',
    filename: 'components/LikeButton.tsx',
    code: `'use client'
import { useOptimistic, startTransition } from 'react'
import { togglePostLike } from './actions'

export default function LikeButton({ post }: { post: Post }) {
  const [optimistic, addOptimistic] = useOptimistic(
    post,
    (current, _: void) => ({
      ...current,
      liked: !current.liked,
      likes: current.liked ? current.likes - 1 : current.likes + 1,
    })
  )

  const onClick = () => {
    startTransition(() => {
      addOptimistic()            // 즉시 UI
      togglePostLike(post.id)    // Server Action
    })
  }

  return <button onClick={onClick}>{optimistic.liked ? '❤️' : '🤍'} {optimistic.likes}</button>
}`,
    note: '사용자가 &quot;느리다&quot;고 느끼는 순간을 제거. 실패 시 React가 자동으로 롤백.',
  },
  {
    id: 'mutation',
    emoji: '✏️',
    title: 'Mutation 패턴',
    subtitle: '서버 변경 + 관련 쿼리 재시작',
    filename: 'useMutation 패턴',
    code: `// TanStack Query useMutation
'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeletePost() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => fetch('/api/posts/' + id, { method: 'DELETE' }),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ['posts'] })
      const prev = qc.getQueryData<Post[]>(['posts'])
      qc.setQueryData<Post[]>(['posts'], (old = []) => old.filter(p => p.id !== id))
      return { prev }
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData(['posts'], ctx.prev)  // 롤백
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['posts'] }),
  })
}`,
    note: 'mutation + optimistic + invalidate 한 세트. Next.js Server Action을 쓰면 이 역할을 revalidate/revalidatePath가 담당.',
  },
]

export default function DataFetchingPlayground() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='rounded-2xl bg-linear-to-br from-[#fff5f4] to-[#ffe8e3] p-5'>
        <div className='flex items-start gap-3'>
          <span className='text-3xl'>🎮</span>
          <div>
            <div className='font-extrabold'>언제 서버, 언제 클라이언트?</div>
            <p className='mt-1 text-sm text-gray-700'>
              fetch 할 위치 · 캐싱 · streaming · optimistic · mutation을 6장
              카드로. 상황별 최소한의 결정 가이드.
            </p>
          </div>
        </div>
      </div>

      <GoalViz />

      <div className='border-t border-gray-200' />

      <PlaygroundSection
        index='A'
        emoji='🔀'
        title='서버/클라 fetch 6카드'
        description='Server fetch · Client Query · Streaming · Revalidation · Optimistic · Mutation.'
      >
        <CardPlayground items={CARDS} />
      </PlaygroundSection>
    </div>
  )
}
