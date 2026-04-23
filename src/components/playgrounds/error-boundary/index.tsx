import Explosion from './Explosion'
import GoalViz from './GoalViz'
import PlaygroundSection from '@/components/stages/PlaygroundSection'

export default function ErrorBoundaryPlayground() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='rounded-2xl bg-linear-to-br from-[#fff5f4] to-[#ffe8e3] p-5'>
        <div className='flex items-start gap-3'>
          <span className='text-3xl'>🎮</span>
          <div>
            <div className='font-extrabold'>자식을 진짜로 터뜨려보자</div>
            <p className='mt-1 text-sm text-gray-700'>
              💥 버튼으로 자식에 에러를 던지고, Error Boundary 토글을 껐다 켰다
              해보자. &quot;있을 때&quot;와 &quot;없을 때&quot; 의 차이를 직접
              느낄 수 있어.
            </p>
          </div>
        </div>
      </div>

      <GoalViz />

      <div className='border-t border-gray-200' />

      <PlaygroundSection
        index='A'
        emoji='🧯'
        title='자식 폭파 + 폴백 UI + 다시 시도'
        description='Error Boundary 유무 토글 + 자식 throw + 폴백 UI 렌더 + 복구 버튼. 실제 서비스에서 쓸 패턴 그대로.'
      >
        <Explosion />
      </PlaygroundSection>
    </div>
  )
}
