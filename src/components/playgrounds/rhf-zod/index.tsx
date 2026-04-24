import SignupForm from './SignupForm'
import CodeBlock from '@/components/stages/CodeBlock'
import StageFlow from '@/components/stages/StageFlow'

export default function RhfZodPlayground() {
  return (
    <StageFlow>
      <StageFlow.Empathy>
        📝 &quot;필드 4개 폼에 state가 12개씩&quot; — RHF + Zod가 이걸 단번에.
      </StageFlow.Empathy>

      <StageFlow.Play subtitle='회원가입 폼 채워보며 blur 유효성 체감'>
        <SignupForm />
      </StageFlow.Play>

      <StageFlow.Observe title='🤔 RHF + Zod가 뭘 해줘?'>
        <p>
          🟢 Zod 스키마 하나가 <b>검증·타입·에러 메시지</b>를 모두 담당.
        </p>
        <p className='mt-3'>
          🟢 RHF는 uncontrolled 기반이라 리렌더 최소화. <code>useForm</code> 한
          번이면 끝.
        </p>
      </StageFlow.Observe>

      <StageFlow.Next subtitle='코드 + 정리 + 다음'>
        <p className='mb-4'>
          ✔️ 같은 Zod 스키마를 <b>Server Action 검증에도 재사용</b> 가능.
        </p>
        <CodeBlock
          filename='RHF + Zod 실전'
          code={`const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
}).refine((d) => d.password === d.confirm, {
  path: ['confirm'], message: '비밀번호가 일치하지 않아요',
})

const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({
  resolver: zodResolver(schema),
})

<form onSubmit={handleSubmit(onValid)}>
  <input {...register('email')} />
  {errors.email && <p>{errors.email.message}</p>}
</form>`}
        />
        <p className='mt-5 text-gray-700'>
          다음은 UI를 살아있게 <b>Framer Motion</b> 🚀
        </p>
      </StageFlow.Next>
    </StageFlow>
  )
}
