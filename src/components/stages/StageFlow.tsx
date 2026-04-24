import { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type SectionKind = 'play' | 'observe' | 'deepen' | 'next'

type SectionProps = {
  step?: string
  kind: SectionKind
  title: string
  subtitle?: string
  children: ReactNode
}

const KIND_STYLES: Record<
  SectionKind,
  { border: string; badge: string; bg: string }
> = {
  play: {
    border: 'border-[#ff5e48]',
    badge: 'bg-[#ff5e48] text-white',
    bg: 'bg-[#fff5f4]',
  },
  observe: {
    border: 'border-emerald-300',
    badge: 'bg-emerald-500 text-white',
    bg: 'bg-emerald-50/60',
  },
  deepen: {
    border: 'border-violet-300',
    badge: 'bg-violet-500 text-white',
    bg: 'bg-violet-50/60',
  },
  next: {
    border: 'border-amber-300',
    badge: 'bg-gray-900 text-white',
    bg: 'bg-[#fff8ec]',
  },
}

function Section({ step, kind, title, subtitle, children }: SectionProps) {
  const s = KIND_STYLES[kind]
  return (
    <section className={cn('rounded-2xl border-l-4 px-6 py-5', s.border, s.bg)}>
      <header className='mb-3 flex items-center gap-3'>
        {step && (
          <span
            className={cn(
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-sm font-black shadow-sm',
              s.badge
            )}
          >
            {step}
          </span>
        )}
        <div>
          <h3 className='text-lg leading-tight font-extrabold'>{title}</h3>
          {subtitle && (
            <p className='mt-0.5 text-xs text-gray-500'>{subtitle}</p>
          )}
        </div>
      </header>
      <div className='text-sm leading-relaxed text-gray-800'>{children}</div>
    </section>
  )
}

function Root({ children }: { children: ReactNode }) {
  return <div className='flex flex-col gap-4'>{children}</div>
}

// 공감 한 줄 — 인트로 바 (섹션 번호 없음)
function Empathy({ children }: { children: ReactNode }) {
  return (
    <div className='rounded-2xl bg-linear-to-br from-[#fff5f4] to-[#ffe8e3] px-6 py-4'>
      <p className='text-base font-bold text-gray-800'>{children}</p>
    </div>
  )
}

// ① 실습
function Play({
  title = '🎮 일단 눌러봐',
  subtitle,
  children,
}: Partial<SectionProps>) {
  return (
    <Section step='①' kind='play' title={title!} subtitle={subtitle}>
      {children}
    </Section>
  )
}

// ② 관찰 질문 + 해설 2문장
function Observe({
  title = '🤔 어? 이거 뭐지?',
  subtitle,
  children,
}: Partial<SectionProps>) {
  return (
    <Section step='②' kind='observe' title={title!} subtitle={subtitle}>
      {children}
    </Section>
  )
}

// ③ 한 단계 더 실험
function Deepen({
  title = '🔬 한 번 더, 이번엔 조건을 바꿔봐',
  subtitle,
  children,
}: Partial<SectionProps>) {
  return (
    <Section step='③' kind='deepen' title={title!} subtitle={subtitle}>
      {children}
    </Section>
  )
}

// ④ 다음
function Next({
  title = '🚀 다음으로',
  subtitle,
  children,
}: Partial<SectionProps>) {
  return (
    <Section step='④' kind='next' title={title!} subtitle={subtitle}>
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
