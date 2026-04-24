import { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type SectionKind = 'why' | 'play' | 'explain' | 'deepen' | 'code' | 'wrap'

type SectionProps = {
  step: string
  kind: SectionKind
  title: string
  subtitle?: string
  children: ReactNode
}

const KIND_STYLES: Record<
  SectionKind,
  { border: string; badge: string; bg: string }
> = {
  why: {
    border: 'border-amber-300',
    badge: 'bg-amber-400 text-amber-950',
    bg: 'bg-amber-50/60',
  },
  play: {
    border: 'border-[#ff5e48]',
    badge: 'bg-[#ff5e48] text-white',
    bg: 'bg-[#fff5f4]',
  },
  explain: {
    border: 'border-emerald-300',
    badge: 'bg-emerald-500 text-white',
    bg: 'bg-emerald-50/60',
  },
  deepen: {
    border: 'border-violet-300',
    badge: 'bg-violet-500 text-white',
    bg: 'bg-violet-50/60',
  },
  code: {
    border: 'border-gray-300',
    badge: 'bg-gray-800 text-white',
    bg: 'bg-white',
  },
  wrap: {
    border: 'border-[#ff5e48]',
    badge: 'bg-gray-900 text-white',
    bg: 'bg-[#fff8ec]',
  },
}

function Section({ step, kind, title, subtitle, children }: SectionProps) {
  const s = KIND_STYLES[kind]
  return (
    <section className={cn('rounded-2xl border-l-4 px-6 py-5', s.border, s.bg)}>
      <header className='mb-3 flex items-center gap-3'>
        <span
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-sm font-black shadow-sm',
            s.badge
          )}
        >
          {step}
        </span>
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
  return <div className='flex flex-col gap-6'>{children}</div>
}

// 각 단계 전용 컴포넌트 — 기본 title/kind 지정, 호출자는 title 재지정 가능
function Why({
  title = '🎯 왜 배우면 좋을까?',
  subtitle,
  children,
}: Partial<SectionProps>) {
  return (
    <Section step='①' kind='why' title={title!} subtitle={subtitle}>
      {children}
    </Section>
  )
}

function Play({
  title = '🎮 일단 눌러봐',
  subtitle = '이론 먼저 읽지 말고',
  children,
}: Partial<SectionProps>) {
  return (
    <Section step='②' kind='play' title={title!} subtitle={subtitle}>
      {children}
    </Section>
  )
}

function Explain({
  title = '💡 방금 뭐가 일어난 거야?',
  subtitle,
  children,
}: Partial<SectionProps>) {
  return (
    <Section step='③' kind='explain' title={title!} subtitle={subtitle}>
      {children}
    </Section>
  )
}

function Deepen({
  title = '🔬 한 단계 더 실험',
  subtitle,
  children,
}: Partial<SectionProps>) {
  return (
    <Section step='④' kind='deepen' title={title!} subtitle={subtitle}>
      {children}
    </Section>
  )
}

function Code({
  title = '📚 코드로 확인',
  subtitle,
  children,
}: Partial<SectionProps>) {
  return (
    <Section step='⑤' kind='code' title={title!} subtitle={subtitle}>
      {children}
    </Section>
  )
}

function Wrap({
  title = '✅ 정리 — 이제 정복 버튼 눌러도 돼',
  subtitle,
  children,
}: Partial<SectionProps>) {
  return (
    <Section step='⑥' kind='wrap' title={title!} subtitle={subtitle}>
      {children}
    </Section>
  )
}

const StageFlow = Object.assign(Root, {
  Why,
  Play,
  Explain,
  Deepen,
  Code,
  Wrap,
})

export default StageFlow
