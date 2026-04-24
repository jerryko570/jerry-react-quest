'use client'

import { FormEvent, useId, useState } from 'react'
import { cn } from '@/lib/cn'
import BeforeAfter from '@/components/stages/BeforeAfter'

type FormData = {
  email: string
  password: string
  confirm: string
  age: string
}

type Errors = Partial<Record<keyof FormData, string>>

// Zod 스타일 유효성 — 실제 RHF + Zod 없이도 원리 시연
function validate(data: FormData): Errors {
  const errors: Errors = {}

  if (!data.email) errors.email = '이메일은 필수입니다'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = '이메일 형식이 아니에요'

  if (!data.password) errors.password = '비밀번호는 필수입니다'
  else if (data.password.length < 8)
    errors.password = '비밀번호는 8자 이상이어야 합니다'

  if (!data.confirm) errors.confirm = '비밀번호 확인을 입력하세요'
  else if (data.password && data.confirm !== data.password)
    errors.confirm = '비밀번호가 일치하지 않아요'

  if (!data.age) errors.age = '나이는 필수입니다'
  else {
    const n = Number(data.age)
    if (Number.isNaN(n) || n < 14 || n > 120)
      errors.age = '14~120 사이 숫자를 입력하세요'
  }

  return errors
}

export default function SignupForm() {
  const [data, setData] = useState<FormData>({
    email: '',
    password: '',
    confirm: '',
    age: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
    email: false,
    password: false,
    confirm: false,
    age: false,
  })
  const [submitted, setSubmitted] = useState<FormData | null>(null)

  const emailId = useId()
  const passwordId = useId()
  const confirmId = useId()
  const ageId = useId()

  const updateField = (field: keyof FormData, value: string) => {
    const next = { ...data, [field]: value }
    setData(next)
    if (touched[field]) {
      setErrors(validate(next))
    }
  }

  const markTouched = (field: keyof FormData) => {
    setTouched((t) => ({ ...t, [field]: true }))
    setErrors(validate(data))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const allTouched = {
      email: true,
      password: true,
      confirm: true,
      age: true,
    }
    setTouched(allTouched)
    const errs = validate(data)
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      setSubmitted(data)
    }
  }

  const hasErrors = Object.keys(errors).length > 0

  return (
    <div className='rounded-2xl border-2 border-gray-200 bg-gray-50/70 p-5'>
      <form onSubmit={onSubmit} noValidate className='mb-4'>
        <div className='grid gap-3 sm:grid-cols-2'>
          <Field
            id={emailId}
            label='이메일'
            type='email'
            value={data.email}
            error={touched.email ? errors.email : undefined}
            onChange={(v) => updateField('email', v)}
            onBlur={() => markTouched('email')}
          />
          <Field
            id={ageId}
            label='나이'
            type='number'
            value={data.age}
            error={touched.age ? errors.age : undefined}
            onChange={(v) => updateField('age', v)}
            onBlur={() => markTouched('age')}
          />
          <Field
            id={passwordId}
            label='비밀번호 (8자 이상)'
            type='password'
            value={data.password}
            error={touched.password ? errors.password : undefined}
            onChange={(v) => updateField('password', v)}
            onBlur={() => markTouched('password')}
          />
          <Field
            id={confirmId}
            label='비밀번호 확인'
            type='password'
            value={data.confirm}
            error={touched.confirm ? errors.confirm : undefined}
            onChange={(v) => updateField('confirm', v)}
            onBlur={() => markTouched('confirm')}
          />
        </div>

        <button
          type='submit'
          className='mt-4 w-full rounded-full bg-[#ff5e48] px-6 py-3 font-bold text-white shadow-sm hover:bg-[#ec4b36] disabled:opacity-50'
        >
          회원가입
        </button>
      </form>

      {submitted && !hasErrors && (
        <div className='mb-4 rounded-lg bg-emerald-50 p-4 ring-1 ring-emerald-200'>
          <div className='text-xs font-semibold tracking-wider text-emerald-800 uppercase'>
            ✅ 가입 완료 (실제 서버엔 안 감)
          </div>
          <pre className='mt-2 overflow-x-auto font-mono text-xs text-emerald-900'>
            {JSON.stringify({ ...submitted, password: '***' }, null, 2)}
          </pre>
        </div>
      )}

      <div className='mb-3 rounded-lg bg-white p-4 text-sm text-gray-700 ring-1 ring-gray-100'>
        <p>
          🎯 <b>관찰 포인트</b>:
        </p>
        <ul className='mt-2 space-y-1'>
          <li>
            각 필드에서 <b>blur</b>하는 순간부터 유효성이 활성화 (입력 중엔 방해
            X)
          </li>
          <li>비밀번호·확인이 서로 참조 — 하나 바뀌면 다른 것도 재검증</li>
          <li>
            제출 시 모든 필드가 &quot;touched&quot;가 되면서 나머지 에러도
            드러남
          </li>
        </ul>
      </div>

      <BeforeAfter
        before={{
          label: '❌ useState 흩어진 수동 검증',
          code: `const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [emailError, setEmailError] = useState('')
// ... 필드마다 state × 2
// 유효성 로직이 각 핸들러에 복붙
// touched / submitted 관리도 따로`,
          takeaway: '필드 4개 × state 3개 = 12개 state · 재사용 어려움',
        }}
        after={{
          label: '✅ React Hook Form + Zod (실전)',
          code: `import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirm: z.string(),
  age: z.number().int().min(14).max(120),
}).refine((d) => d.password === d.confirm, {
  path: ['confirm'],
  message: '비밀번호가 일치하지 않아요',
})

type FormData = z.infer<typeof schema>

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}
      ...
    </form>
  )
}`,
          takeaway:
            '스키마에 검증 · 타입 · 메시지 한 번에. register로 state 관리 자동. 재사용·분할도 쉬움',
        }}
      />

      <div className='mt-4 rounded-xl border-2 border-gray-100 bg-white p-4 text-sm'>
        <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
          💭 RHF + Zod 조합의 매력
        </div>
        <ul className='space-y-1 text-gray-700'>
          <li>
            🎯 <b>타입 추론</b>: <code>z.infer&lt;typeof schema&gt;</code>로 폼
            타입 자동 생성
          </li>
          <li>
            🎯 <b>단일 진실 소스</b>: 스키마 하나가 검증·타입·에러 메시지 모두
          </li>
          <li>
            🎯 <b>성능</b>: RHF는 uncontrolled 기반 — 리렌더 최소화
          </li>
          <li>
            🎯 <b>서버·클라 공유</b>: 같은 Zod 스키마를 Server Action 검증에도
            재사용
          </li>
        </ul>
      </div>
    </div>
  )
}

type FieldProps = {
  id: string
  label: string
  type: string
  value: string
  error?: string
  onChange: (v: string) => void
  onBlur: () => void
}

function Field({
  id,
  label,
  type,
  value,
  error,
  onChange,
  onBlur,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className='mb-1 block text-xs font-semibold'>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={cn(
          'w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none',
          error
            ? 'border-red-400 focus:border-red-500'
            : 'border-gray-200 focus:border-[#ff5e48]'
        )}
      />
      {error && (
        <p id={`${id}-err`} className='mt-1 text-xs text-red-600'>
          ⚠️ {error}
        </p>
      )}
    </div>
  )
}
