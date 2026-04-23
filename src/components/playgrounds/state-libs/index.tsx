import CounterComparison from './CounterComparison'
import GoalViz from './GoalViz'
import PlaygroundSection from '@/components/stages/PlaygroundSection'

export default function StateLibsPlayground() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='rounded-2xl bg-linear-to-br from-[#fff5f4] to-[#ffe8e3] p-5'>
        <div className='flex items-start gap-3'>
          <span className='text-3xl'>🎮</span>
          <div>
            <div className='font-extrabold'>
              같은 Todo/카운터를 3가지 방식으로
            </div>
            <p className='mt-1 text-sm text-gray-700'>
              라이브러리는 취향이자 팀의 선택이야. 탭을 눌러가며 같은 카운터가
              어떤 문법으로 쓰이는지 비교해봐. 실제로 설치는 안 했고 코드만
              보여줘.
            </p>
          </div>
        </div>
      </div>

      <GoalViz />

      <div className='border-t border-gray-200' />

      <PlaygroundSection
        index='A'
        emoji='🏛️'
        title='카운터 3가지 방식 코드 비교'
        description='Zustand · Jotai · Redux Toolkit의 설치·코드·장단점. 프로젝트 결정할 때 참고용 카드.'
      >
        <CounterComparison />
      </PlaygroundSection>
    </div>
  )
}
