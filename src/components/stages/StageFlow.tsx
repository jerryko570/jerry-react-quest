import { ReactNode } from 'react'

type SectionProps = {
  title: string
  subtitle?: string
  children: ReactNode
}

function Section({ title, subtitle, children }: SectionProps) {
  return (
    <section className='rounded-2xl bg-white p-8 ring-1 ring-gray-100'>
      <header className='mb-5'>
        <h3 className='text-2xl leading-tight font-extrabold text-gray-900'>
          {title}
        </h3>
        {subtitle && (
          <p className='mt-2 text-sm font-medium text-gray-500'>{subtitle}</p>
        )}
      </header>
      <div className='text-base leading-relaxed text-gray-700'>{children}</div>
    </section>
  )
}

function Root({ children }: { children: ReactNode }) {
  return <div className='flex flex-col gap-5'>{children}</div>
}

// 공감 한 줄 — 인트로 (카드 없이 큰 문장)
function Empathy({ children }: { children: ReactNode }) {
  return (
    <p className='px-2 text-lg leading-relaxed font-semibold text-gray-900'>
      {children}
    </p>
  )
}

// 실습
function Play({
  title = '일단 눌러봐',
  subtitle,
  children,
}: Partial<SectionProps>) {
  return (
    <Section title={title!} subtitle={subtitle}>
      {children}
    </Section>
  )
}

// 관찰 + 해설
function Observe({
  title = '어? 이거 뭐지?',
  subtitle,
  children,
}: Partial<SectionProps>) {
  return (
    <Section title={title!} subtitle={subtitle}>
      {children}
    </Section>
  )
}

// 한 단계 더
function Deepen({
  title = '한 번 더, 이번엔 조건을 바꿔봐',
  subtitle,
  children,
}: Partial<SectionProps>) {
  return (
    <Section title={title!} subtitle={subtitle}>
      {children}
    </Section>
  )
}

// 다음
function Next({
  title = '다음으로',
  subtitle,
  children,
}: Partial<SectionProps>) {
  return (
    <Section title={title!} subtitle={subtitle}>
      {children}
    </Section>
  )
}

const StageFlow = Object.assign(Root, {
  Empathy,
  Play,
  Observe,
  Deepen,
  Next,
})

export default StageFlow
