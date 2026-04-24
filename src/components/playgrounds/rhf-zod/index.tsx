import GoalViz from './GoalViz'
import SignupForm from './SignupForm'
import PlaygroundSection from '@/components/stages/PlaygroundSection'

export default function RhfZodPlayground() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='rounded-2xl bg-linear-to-br from-[#fff5f4] to-[#ffe8e3] p-5'>
        <div className='flex items-start gap-3'>
          <span className='text-3xl'>🎮</span>
          <div>
            <div className='font-extrabold'>실제 폼으로 검증 흐름 체험</div>
            <p className='mt-1 text-sm text-gray-700'>
              아래 회원가입 폼을 직접 채워봐. blur 시점에 검증, 제출 시 전체
              검증, 비밀번호·확인이 서로 참조되는 상호 검증까지 — RHF + Zod가
              대신 해주는 일을 native state로 재현했어.
            </p>
          </div>
        </div>
      </div>

      <GoalViz />

      <div className='border-t border-gray-200' />

      <PlaygroundSection
        index='A'
        emoji='📝'
        title='회원가입 폼 — blur·제출·상호 검증'
        description='입력 중엔 조용하고 blur 시점부터 에러 표시. 비밀번호와 비밀번호 확인의 상호 검증까지.'
      >
        <SignupForm />
      </PlaygroundSection>
    </div>
  )
}
