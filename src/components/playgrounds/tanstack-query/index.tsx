import GoalViz from './GoalViz'
import QueryCache from './QueryCache'
import PlaygroundSection from '@/components/stages/PlaygroundSection'

export default function TanStackQueryPlayground() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='rounded-2xl bg-linear-to-br from-[#fff5f4] to-[#ffe8e3] p-5'>
        <div className='flex items-start gap-3'>
          <span className='text-3xl'>🎮</span>
          <div>
            <div className='font-extrabold'>
              이 놀이기구는 TanStack Query를 &quot;흉내&quot; 낸 mock 이야
            </div>
            <p className='mt-1 text-sm text-gray-700'>
              실제 라이브러리 없이도 캐시 · stale · 자동 refetch 개념을 눈으로
              확인할 수 있게 가짜 fetch와 메모리 캐시로 시뮬레이션했어. 탭을
              왔다갔다 하며 네트워크 호출이 언제 진짜 일어나는지 봐봐.
            </p>
          </div>
        </div>
      </div>

      <GoalViz />

      <div className='border-t border-gray-200' />

      <PlaygroundSection
        index='A'
        emoji='🗄️'
        title='Query Cache 시뮬레이터'
        description='가짜 fetch + 5초 staleTime + stale-while-revalidate 재현. User 탭을 왕복하며 캐시 히트/미스/백그라운드 refetch 관찰.'
      >
        <QueryCache />
      </PlaygroundSection>
    </div>
  )
}
