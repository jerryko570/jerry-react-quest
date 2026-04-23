import GoalViz from './GoalViz'
import TodoReducer from './TodoReducer'
import PlaygroundSection from '@/components/stages/PlaygroundSection'

export default function UseReducerPlayground() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='rounded-2xl bg-linear-to-br from-[#fff5f4] to-[#ffe8e3] p-5'>
        <div className='flex items-start gap-3'>
          <span className='text-3xl'>🎮</span>
          <div>
            <div className='font-extrabold'>같은 Todo, 두 가지 방식</div>
            <p className='mt-1 text-sm text-gray-700'>
              왼쪽은 useState로, 오른쪽은 useReducer로 구현한 똑같은 Todo야.
              추가 · 토글 · 필터 · 일괄 삭제를 양쪽에서 조작하며 어느 쪽이 더
              읽기 좋은지 체감해봐.
            </p>
          </div>
        </div>
      </div>

      <GoalViz />

      <div className='border-t border-gray-200' />

      <PlaygroundSection
        index='A'
        emoji='📋'
        title='Todo 리스트 — useState vs useReducer'
        description='추가/토글/필터/완료 일괄 삭제를 같은 UI에 구현한 두 버전. 상태가 3개 이상 묶일 때 reducer가 빛을 발한다.'
      >
        <TodoReducer />
      </PlaygroundSection>
    </div>
  )
}
