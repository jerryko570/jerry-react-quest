'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import CodeBlock from '@/components/stages/CodeBlock'

type Card = {
  id: string
  emoji: string
  title: string
  metric: string
  subtitle: string
  before: { label: string; code: string }
  after: { label: string; code: string }
  note: string
}

const CARDS: Card[] = [
  {
    id: 'code-split',
    emoji: '✂️',
    title: '코드 스플리팅 (dynamic import)',
    metric: '초기 JS 번들 감소',
    subtitle: '모달·차트·에디터 같은 무거운 컴포넌트는 필요할 때만 로드',
    before: {
      label: '❌ 전부 초기 번들',
      code: `import HeavyChart from '@/components/HeavyChart'

export default function Dashboard() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>차트 열기</button>
      {open && <HeavyChart />}
    </>
  )
}`,
    },
    after: {
      label: '✅ next/dynamic으로 분리',
      code: `import dynamic from 'next/dynamic'

const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <div>차트 준비 중...</div>,
  ssr: false,
})

export default function Dashboard() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>차트 열기</button>
      {open && <HeavyChart />}
    </>
  )
}`,
    },
    note: '처음 페이지 로드에 HeavyChart가 포함되지 않고, 버튼 누를 때 별도 청크로 fetch.',
  },
  {
    id: 'react-lazy',
    emoji: '🪜',
    title: 'React.lazy + Suspense',
    metric: '라우트별 분할',
    subtitle: '클라이언트 전용 라우트 코드를 페이지 단위로 쪼갬',
    before: {
      label: '❌ 라우트 모두 사전 로드',
      code: `import Settings from './routes/Settings'
import Billing from './routes/Billing'
import Invoice from './routes/Invoice'

// 세 라우트 모두 초기 번들에 포함`,
    },
    after: {
      label: '✅ lazy로 필요 시점에 로드',
      code: `const Settings = lazy(() => import('./routes/Settings'))
const Billing = lazy(() => import('./routes/Billing'))
const Invoice = lazy(() => import('./routes/Invoice'))

<Suspense fallback={<Loading />}>
  <Routes>
    <Route path='/settings' element={<Settings />} />
    ...
  </Routes>
</Suspense>`,
    },
    note: 'Next.js App Router는 파일 기반으로 자동 분할. 별도 설정 없이도 페이지 단위 코드 스플리팅이 기본.',
  },
  {
    id: 'next-image',
    emoji: '🖼️',
    title: 'next/image로 자동 최적화',
    metric: 'LCP 개선 · 대역폭 절약',
    subtitle: '브라우저 너비에 맞는 해상도·포맷·lazy loading 자동',
    before: {
      label: '❌ 원본 그대로',
      code: `<img
  src='/hero.jpg'
  alt='메인 배너'
  width={1920}
  height={1080}
/>
// 모바일에서도 1920 원본 다운로드, JPEG 그대로`,
    },
    after: {
      label: '✅ next/image',
      code: `import Image from 'next/image'

<Image
  src='/hero.jpg'
  alt='메인 배너'
  width={1920}
  height={1080}
  priority     // LCP 후보면 priority
  sizes='(max-width: 768px) 100vw, 50vw'
/>`,
    },
    note: 'WebP/AVIF 자동 변환 + srcset 생성 + 화면 밖 이미지는 lazy loading. LCP를 눈에 띄게 개선.',
  },
  {
    id: 'next-font',
    emoji: '🔤',
    title: 'next/font로 폰트 최적화',
    metric: 'CLS 0 + FOUT 방지',
    subtitle: '빌드 타임 폰트 다운로드, 레이아웃 시프트 없는 로딩',
    before: {
      label: '❌ 외부 CDN 링크',
      code: `<link
  href='https://fonts.googleapis.com/css2?family=Inter'
  rel='stylesheet'
/>
// 외부 요청 + 폰트 로드 전 기본 폰트로 FOUT`,
    },
    after: {
      label: '✅ next/font (로컬 호스팅)',
      code: `import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

<html className={inter.variable}>...</html>`,
    },
    note: '빌드 시 폰트를 자체 호스팅으로 변환 + size-adjust로 레이아웃 시프트 제거.',
  },
  {
    id: 'web-vitals',
    emoji: '📊',
    title: 'Web Vitals 목표치',
    metric: 'LCP < 2.5s · INP < 200ms · CLS < 0.1',
    subtitle: '사용자 체감 속도의 3대 지표',
    before: {
      label: '🟡 평균적인 상태',
      code: `LCP: 3.2s    (개선 여지)
INP: 320ms   (느림)
CLS: 0.18    (레이아웃 튀는 편)`,
    },
    after: {
      label: '🟢 목표치',
      code: `LCP: 1.8s    ✅ 빠름
INP: 180ms   ✅ 반응 좋음
CLS: 0.05    ✅ 안정

// Next.js 기본 + Image/font 최적화 + 코드 스플리팅만 해도
// 70점대 → 90점대 점프 가능`,
    },
    note: '개선 순서: 무거운 JS 줄이기 → LCP 이미지 우선순위 → 인터랙션 핸들러 정리 → 레이아웃 예약.',
  },
]

export default function ChecklistCards() {
  const [activeId, setActiveId] = useState(CARDS[0].id)
  const [mode, setMode] = useState<'before' | 'after'>('after')
  const current = CARDS.find((c) => c.id === activeId) ?? CARDS[0]
  const payload = mode === 'before' ? current.before : current.after

  return (
    <div className='rounded-2xl border-2 border-gray-200 bg-gray-50/70 p-5'>
      <div className='mb-4 flex flex-wrap gap-2'>
        {CARDS.map((c) => (
          <button
            key={c.id}
            type='button'
            onClick={() => setActiveId(c.id)}
            className={cn(
              'rounded-full border-2 px-3 py-1.5 text-xs font-bold transition',
              activeId === c.id
                ? 'border-[#4576fc] bg-[#4576fc] text-white'
                : 'border-gray-200 bg-white text-gray-700 hover:border-[#4576fc]'
            )}
          >
            {c.emoji} {c.title.split('(')[0].trim()}
          </button>
        ))}
      </div>

      <div className='mb-3 rounded-lg bg-white p-4 ring-1 ring-gray-100'>
        <div className='flex items-start gap-3'>
          <span className='text-3xl'>{current.emoji}</span>
          <div>
            <h4 className='font-extrabold'>{current.title}</h4>
            <p className='mt-1 text-sm text-gray-600'>{current.subtitle}</p>
            <span className='mt-2 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-900'>
              🎯 {current.metric}
            </span>
          </div>
        </div>
      </div>

      <div className='mb-3 flex gap-2'>
        <button
          type='button'
          onClick={() => setMode('before')}
          className={cn(
            'rounded-full px-4 py-1.5 text-xs font-bold transition',
            mode === 'before'
              ? 'bg-red-500 text-white'
              : 'border border-gray-300 bg-white text-gray-700'
          )}
        >
          🚫 Before
        </button>
        <button
          type='button'
          onClick={() => setMode('after')}
          className={cn(
            'rounded-full px-4 py-1.5 text-xs font-bold transition',
            mode === 'after'
              ? 'bg-emerald-500 text-white'
              : 'border border-gray-300 bg-white text-gray-700'
          )}
        >
          ✅ After
        </button>
      </div>

      <CodeBlock
        filename={payload.label}
        code={payload.code}
        lang={current.id === 'web-vitals' ? 'text' : 'tsx'}
      />

      <div className='mt-4 rounded-xl border-2 border-gray-100 bg-white p-4 text-sm'>
        <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
          💭 포인트
        </div>
        <p className='text-gray-700'>{current.note}</p>
      </div>
    </div>
  )
}
