import CleanupLab from './CleanupLab'
import GoalViz from './GoalViz'
import RaceCondition from './RaceCondition'
import PlaygroundSection from '@/components/stages/PlaygroundSection'

export default function UseEffectPlayground() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='rounded-2xl bg-linear-to-br from-[#fff5f4] to-[#ffe8e3] p-5'>
        <div className='flex items-start gap-3'>
          <span className='text-3xl'>🎮</span>
          <div>
            <div className='font-extrabold'>
              두 놀이기구 다 cleanup 켰다 껐다 해봐
            </div>
            <p className='mt-1 text-sm text-gray-700'>
              useEffect에서 가장 실수하는 포인트가 cleanup 누락. 메모리 누수와
              race condition을 실제로 재현해보면서 왜 cleanup이 곧 안전장치인지
              체감해보자.
            </p>
          </div>
        </div>
      </div>

      <GoalViz />

      <div className='border-t border-gray-200' />

      <PlaygroundSection
        index='A'
        emoji='🧹'
        title='Cleanup 실험실 (메모리 누수)'
        description='setInterval을 띄우고 언마운트. cleanup 없으면 죽은 자식 뒤에서도 tick이 계속 카운트된다.'
      >
        <CleanupLab />
      </PlaygroundSection>

      <PlaygroundSection
        index='B'
        emoji='🏁'
        title='Race Condition 디버깅'
        description='검색창에 랜덤 딜레이 응답. 가드 없으면 옛날 응답이 최신을 덮어쓴다. AbortController + cancelled 플래그로 해결.'
      >
        <RaceCondition />
      </PlaygroundSection>
    </div>
  )
}
