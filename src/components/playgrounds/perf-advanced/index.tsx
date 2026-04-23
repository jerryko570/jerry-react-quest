import ChecklistCards from './ChecklistCards'
import GoalViz from './GoalViz'
import PlaygroundSection from '@/components/stages/PlaygroundSection'

export default function PerfAdvancedPlayground() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='rounded-2xl bg-linear-to-br from-[#fff5f4] to-[#ffe8e3] p-5'>
        <div className='flex items-start gap-3'>
          <span className='text-3xl'>🚀</span>
          <div>
            <div className='font-extrabold'>
              리렌더 최적화 다음 단계 — 번들 · 이미지 · Web Vitals
            </div>
            <p className='mt-1 text-sm text-gray-700'>
              앱이 여전히 느리다면 이 단계로 내려와. Next.js 내장 기능 3가지와
              Web Vitals 목표치를 Before/After로 카드 넘기며 확인.
            </p>
          </div>
        </div>
      </div>

      <GoalViz />

      <div className='border-t border-gray-200' />

      <PlaygroundSection
        index='A'
        emoji='📋'
        title='최적화 체크 카드 5종'
        description='코드 스플리팅 · React.lazy · next/image · next/font · Web Vitals — 각 카드마다 Before/After 코드와 개선 포인트.'
      >
        <ChecklistCards />
      </PlaygroundSection>
    </div>
  )
}
