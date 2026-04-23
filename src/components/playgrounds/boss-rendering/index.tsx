import BossMission from './BossMission'
import GoalViz from './GoalViz'
import PlaygroundSection from '@/components/stages/PlaygroundSection'

export default function BossRenderingPlayground() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='rounded-2xl bg-linear-to-br from-[#ede9fe] to-[#fce7f3] p-5 ring-1 ring-purple-200'>
        <div className='flex items-start gap-3'>
          <span className='text-3xl'>👑</span>
          <div>
            <div className='font-extrabold text-purple-900'>
              최종 보스전 — 실전 리스트 최적화
            </div>
            <p className='mt-1 text-sm text-purple-900/80'>
              500개 아이템을 가진 리스트를 기본 모드에서 리렌더시켜 느려지는
              순간을 체감하고, 최적화 모드로 바꿔 어떻게 달라지는지 ms로 확인.
            </p>
          </div>
        </div>
      </div>

      <GoalViz />

      <div className='border-t border-gray-200' />

      <PlaygroundSection
        index='A'
        emoji='📋'
        title='500개 아이템 리스트 — 기본 vs 최적화'
        description='useMemo + React.memo 조합으로 수백 개 행의 리렌더를 스킵하는 실전 패턴. 마지막 렌더 ms로 차이 체감.'
      >
        <BossMission />
      </PlaygroundSection>
    </div>
  )
}
