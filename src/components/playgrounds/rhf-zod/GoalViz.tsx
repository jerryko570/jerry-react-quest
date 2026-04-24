import { ReactNode } from 'react'

export default function RhfZodGoalViz() {
  return (
    <section>
      <header className='mb-4'>
        <h3 className='text-lg font-extrabold'>🎯 학습 목표 — 풀어서 보기</h3>
        <p className='text-sm text-gray-500'>
          폼은 손이 많이 가. 라이브러리가 덜어주는 일을 알자.
        </p>
      </header>
      <div className='grid gap-4 md:grid-cols-2'>
        <GoalCard
          index='1'
          emoji='📝'
          title='react-hook-form 기본'
          hook='register · handleSubmit · formState'
        >
          <p>
            <code>register()</code>가 input을 폼에 등록 →{' '}
            <code>handleSubmit</code>이 검증 통과 시에만 콜백 호출 →{' '}
            <code>formState.errors</code>로 에러 표시.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`const { register, handleSubmit, formState: { errors } } = useForm()

<form onSubmit={handleSubmit(onValid)}>
  <input {...register('email', { required: true })} />
  {errors.email && <p>이메일은 필수</p>}
</form>`}
          </pre>
        </GoalCard>
        <GoalCard
          index='2'
          emoji='🧪'
          title='Zod 스키마 검증'
          hook='타입 + 유효성을 한 곳에'
        >
          <p>
            Zod는 JS 객체로 스키마를 쓰고, TS 타입을 자동 추론. 런타임 검증과
            컴파일 타임 타입이 같은 소스에서 나옴.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`const schema = z.object({
  email: z.string().email(),
  age: z.number().int().min(14),
})

type Form = z.infer<typeof schema>  // 자동 추론 {email:string, age:number}`}
          </pre>
        </GoalCard>
        <GoalCard
          index='3'
          emoji='🧬'
          title='useFormContext'
          hook='폼을 여러 컴포넌트로 분할'
        >
          <p>
            폼이 커지면 컴포넌트를 쪼개. <code>FormProvider</code>로 감싸면
            자식에서 <code>useFormContext()</code>로 register 접근.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`<FormProvider {...methods}>
  <ProfileSection />   {/* useFormContext() 사용 */}
  <AddressSection />
  <PaymentSection />
</FormProvider>`}
          </pre>
        </GoalCard>
        <GoalCard
          index='4'
          emoji='⚖️'
          title='Controlled vs Uncontrolled'
          hook='RHF는 기본 uncontrolled — 빠름'
        >
          <p>
            RHF는 input의 값을 DOM에 맡기고 ref로 읽어와. state 업데이트가
            없으니 입력마다 리렌더 없음. 의도한 필드만 구독하려면{' '}
            <code>watch(&apos;email&apos;)</code> 또는 Controller 컴포넌트.
          </p>
        </GoalCard>
        <GoalCard
          index='5'
          emoji='🧩'
          title='useFieldArray'
          hook='동적 필드 추가/삭제'
        >
          <p>
            재료가 N개인 레시피, 학력·경력 같은 배열 폼에.{' '}
            <code>append · remove · move</code>로 조작하고 자동으로 검증·타입
            유지.
          </p>
        </GoalCard>
        <GoalCard
          index='6'
          emoji='🪜'
          title='다단계 폼 (Stepper)'
          hook='단계별 분할, 최종 제출에서 전체 검증'
        >
          <p>
            <code>useForm</code>을 한 번만 쓰고 단계마다{' '}
            <code>trigger([&apos;field1&apos;, &apos;field2&apos;])</code>로
            해당 필드만 검증. 최종 submit 때 전체 통과 확인.
          </p>
        </GoalCard>
      </div>
    </section>
  )
}

function GoalCard({
  index,
  emoji,
  title,
  hook,
  children,
}: {
  index: string
  emoji: string
  title: string
  hook: string
  children: ReactNode
}) {
  return (
    <article className='rounded-2xl border-2 border-gray-100 bg-white p-5'>
      <header className='mb-3 flex items-start gap-3'>
        <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-900 font-mono text-xs font-bold text-white'>
          {index}
        </span>
        <div>
          <h4 className='font-extrabold'>
            <span className='mr-1'>{emoji}</span>
            {title}
          </h4>
          <p className='mt-0.5 text-xs text-[#ff5e48]'>💡 {hook}</p>
        </div>
      </header>
      <div className='space-y-2 text-sm text-gray-700'>{children}</div>
    </article>
  )
}
