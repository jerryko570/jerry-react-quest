import GoalViz from './GoalViz'
import OptimisticLike from './OptimisticLike'
import PlaygroundSection from '@/components/stages/PlaygroundSection'

export default function React19ActionsPlayground() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='rounded-2xl bg-linear-to-br from-[#fff5f4] to-[#ffe8e3] p-5'>
        <div className='flex items-start gap-3'>
          <span className='text-3xl'>🎮</span>
          <div>
            <div className='font-extrabold'>
              좋아요 버튼 — 3종 훅이 협주하는 모습
            </div>
            <p className='mt-1 text-sm text-gray-700'>
              서버 응답 1초 · 20% 실패 확률. 버튼 눌러서 낙관적 UI가 즉시
              반응하고, 실패하면 자동 롤백되는 걸 확인해봐.
            </p>
          </div>
        </div>
      </div>

      <GoalViz />

      <div className='border-t border-gray-200' />

      <PlaygroundSection
        index='A'
        emoji='❤️'
        title='useOptimistic + useActionState'
        description='실제 서버 없이 mock mutation. 낙관적 UI · pending · 실패 시 롤백 세 가지를 한 버튼에서 체험.'
      >
        <OptimisticLike />
      </PlaygroundSection>
    </div>
  )
}
