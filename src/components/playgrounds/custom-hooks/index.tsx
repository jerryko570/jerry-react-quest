import GoalViz from './GoalViz'
import UseCopyDemo from './UseCopyDemo'
import UseDebounceDemo from './UseDebounceDemo'
import PlaygroundSection from '@/components/stages/PlaygroundSection'

export default function CustomHooksPlayground() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='rounded-2xl bg-linear-to-br from-[#fff5f4] to-[#ffe8e3] p-5'>
        <div className='flex items-start gap-3'>
          <span className='text-3xl'>🎮</span>
          <div>
            <div className='font-extrabold'>
              내가 자주 쓰는 로직, 훅으로 모아두자
            </div>
            <p className='mt-1 text-sm text-gray-700'>
              두 놀이기구 모두 <b>실무에서 매일 쓰는 훅</b>이야. 먼저 직접
              사용해보고, 그 뒤에 훅이 내부에서 뭘 해줬는지 코드로 확인하자.
            </p>
          </div>
        </div>
      </div>

      <GoalViz />

      <div className='border-t border-gray-200' />

      <PlaygroundSection
        index='A'
        emoji='⏱️'
        title='useDebounce — 값이 안정된 뒤 반영'
        description='빠르게 타이핑하면 즉시값은 매번 바뀌지만, 지연값은 멈춘 뒤 한 번만 업데이트. API 호출 절약의 기본.'
      >
        <UseDebounceDemo />
      </PlaygroundSection>

      <PlaygroundSection
        index='B'
        emoji='📋'
        title='useCopyToClipboard — 복사 상태 자동 리셋'
        description='클립보드 복사 + "복사됨" 표시 + 타이머 자동 리셋을 훅 하나로. 쓰는 쪽은 두 줄이면 끝.'
      >
        <UseCopyDemo />
      </PlaygroundSection>
    </div>
  )
}
