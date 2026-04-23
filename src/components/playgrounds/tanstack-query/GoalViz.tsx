import { ReactNode } from 'react'

export default function TanstackQueryGoalViz() {
  return (
    <section>
      <header className='mb-4'>
        <h3 className='text-lg font-extrabold'>🎯 학습 목표 — 풀어서 보기</h3>
        <p className='text-sm text-gray-500'>
          서버 상태는 &quot;내가 관리하는 값&quot;이 아니라 &quot;저쪽이
          원본&quot;이야.
        </p>
      </header>

      <div className='grid gap-4 md:grid-cols-2'>
        <GoalCard
          index='1'
          emoji='🗄️'
          title='서버 상태 vs 클라이언트 상태'
          hook='성격이 다르니 도구도 다르다'
        >
          <p>클라이언트 상태 (useState/useReducer가 해결):</p>
          <ul className='mt-1 space-y-0.5 text-[13px]'>
            <li>📦 모달 열림/닫힘, 폼 입력값, 탭 선택</li>
            <li>📦 전적으로 이 앱이 주인</li>
          </ul>
          <p className='mt-2'>서버 상태 (TanStack Query 영역):</p>
          <ul className='mt-1 space-y-0.5 text-[13px]'>
            <li>🌐 원본은 서버, 내 손이 떠나면 낡음</li>
            <li>🌐 비동기·실패·재시도·타이밍이 기본 옵션</li>
            <li>🌐 여러 곳에서 같은 데이터가 필요</li>
          </ul>
        </GoalCard>

        <GoalCard
          index='2'
          emoji='⏱️'
          title='캐시 · stale · refetch 전략'
          hook='"아직 신선한가? 다시 물어볼까?" 의 규칙'
        >
          <ul className='space-y-1 text-[13px]'>
            <li>
              <b>staleTime</b> — 이 시간 안에는 &quot;아직 신선&quot; 간주.
              refetch 안 함
            </li>
            <li>
              <b>gcTime</b> — 구독자가 없어진 뒤 캐시를 얼마나 유지할지
            </li>
            <li>
              <b>refetchOnWindowFocus</b> — 탭 돌아올 때 갱신
            </li>
            <li>
              <b>refetchInterval</b> — 정기 폴링
            </li>
          </ul>
          <p className='mt-3 text-[12px] text-gray-500'>
            💡 대부분 staleTime만 조정하면 충분. 기본값으로도 합리적.
          </p>
        </GoalCard>

        <GoalCard
          index='3'
          emoji='🪄'
          title='Optimistic Update 패턴'
          hook='서버 응답 기다리지 말고 UI 먼저 바꾸기'
        >
          <p>
            좋아요 버튼 같은 건 응답을 기다리면 굼뜨게 느껴져. Optimistic
            update는 UI를 즉시 업데이트하고 서버 응답은 배경에서 처리.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`useMutation({
  mutationFn: likePost,
  onMutate: async (postId) => {
    await qc.cancelQueries({ queryKey: ['posts'] })
    const prev = qc.getQueryData(['posts'])
    qc.setQueryData(['posts'], (old) => bumpLike(old, postId))
    return { prev }
  },
  onError: (_err, _postId, ctx) => {
    qc.setQueryData(['posts'], ctx?.prev)  // 롤백
  },
  onSettled: () => {
    qc.invalidateQueries({ queryKey: ['posts'] })
  },
})`}
          </pre>
        </GoalCard>

        <GoalCard
          index='4'
          emoji='♾️'
          title='infinite query · pagination'
          hook='페이지·무한 스크롤의 표준 패턴'
        >
          <p>
            페이지별로 나눠 불러와 합치는 건 자주 나와.{' '}
            <code>useInfiniteQuery</code>가 데이터 이어붙이기·다음 페이지 조건을
            관리해줘.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`const {
  data,           // { pages: [...], pageParams: [...] }
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteQuery({
  queryKey: ['posts'],
  queryFn: ({ pageParam = 0 }) => fetchPage(pageParam),
  getNextPageParam: (last) => last.nextCursor,
  initialPageParam: 0,
})`}
          </pre>
          <p className='mt-2 text-[12px] text-gray-500'>
            무한 스크롤 컴포넌트는 IntersectionObserver로 바닥을 감지해 호출.
          </p>
        </GoalCard>
      </div>
    </section>
  )
}

function GoalCard({
  index,
  emoji,
  title,
  hook,
  children,
}: {
  index: string
  emoji: string
  title: string
  hook: string
  children: ReactNode
}) {
  return (
    <article className='rounded-2xl border-2 border-gray-100 bg-white p-5'>
      <header className='mb-3 flex items-start gap-3'>
        <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-900 font-mono text-xs font-bold text-white'>
          {index}
        </span>
        <div>
          <h4 className='font-extrabold'>
            <span className='mr-1'>{emoji}</span>
            {title}
          </h4>
          <p className='mt-0.5 text-xs text-[#ff5e48]'>💡 {hook}</p>
        </div>
      </header>
      <div className='space-y-2 text-sm text-gray-700'>{children}</div>
    </article>
  )
}
