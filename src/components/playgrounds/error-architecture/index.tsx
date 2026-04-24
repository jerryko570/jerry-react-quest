import CardPlayground, {
  type CardPlaygroundItem,
} from '@/components/stages/CardPlayground'
import PlaygroundSection from '@/components/stages/PlaygroundSection'
import GoalViz from './GoalViz'

const CARDS: CardPlaygroundItem[] = [
  {
    id: 'layered',
    emoji: '🏗️',
    title: 'Error Boundary 계층 설계',
    subtitle: '페이지 · 섹션 · 위젯 3단계',
    filename: 'app layout 구성',
    code: `// 1) 전역 — 최후의 방어선
// app/global-error.tsx ('use client' 필수)
export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h1>문제가 발생했습니다</h1>
        <button onClick={reset}>다시 시도</button>
      </body>
    </html>
  )
}

// 2) 라우트 단위
// app/dashboard/error.tsx
'use client'
export default function Error({ error, reset }) {
  return <ErrorCard onRetry={reset} />
}

// 3) 위젯 단위 — 한 섹션만 격리
'use client'
import { ErrorBoundary } from 'react-error-boundary'
<ErrorBoundary FallbackComponent={WidgetFallback} onReset={handleReset}>
  <DangerousWidget />
</ErrorBoundary>`,
    note: '전역이 너무 자주 발동되면 사용자 경험 최악. 가장 안쪽 boundary로 격리 + 상위는 안전망 역할.',
  },
  {
    id: 'sentry',
    emoji: '📡',
    title: 'Sentry 연동',
    subtitle: '프로덕션 에러 수집 · 세션 리플레이',
    filename: 'sentry.client.config.ts',
    code: `// 설치
// npm i @sentry/nextjs && npx @sentry/wizard@latest -i nextjs

// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,          // 10% 성능 추적
  replaysSessionSampleRate: 0.1,  // 10% 세션 리플레이
  replaysOnErrorSampleRate: 1.0,  // 에러 시 100%
  integrations: [Sentry.replayIntegration()],
})

// 수동 capture
try {
  await riskyCall()
} catch (e) {
  Sentry.captureException(e, {
    tags: { feature: 'checkout' },
    extra: { cartItems: 3 },
  })
  throw e
}

// 사용자 context
Sentry.setUser({ id: user.id, email: user.email })`,
    note: '에러 발생 시 stack trace·브라우저·OS·앞선 사용자 action까지 저장. 세션 리플레이로 사용자가 본 화면 재현.',
  },
  {
    id: 'error-types',
    emoji: '🏷',
    title: 'Network vs Logic 에러 구분',
    subtitle: '사용자에게 보여줄 메시지가 다르다',
    filename: '에러 분류 패턴',
    code: `class NetworkError extends Error {
  constructor(message: string, public status: number) {
    super(message)
    this.name = 'NetworkError'
  }
}

class ValidationError extends Error {
  constructor(message: string, public field: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

// 사용
async function save(data: FormData) {
  const res = await fetch('/api/save', { method: 'POST', body: data })
  if (!res.ok) {
    if (res.status === 401) throw new NetworkError('로그인이 필요합니다', 401)
    if (res.status === 422) throw new ValidationError('입력 오류', 'email')
    throw new NetworkError('서버 오류', res.status)
  }
  return res.json()
}

// 에러 핸들링
try {
  await save(data)
} catch (e) {
  if (e instanceof NetworkError && e.status === 401) redirect('/login')
  else if (e instanceof ValidationError) showFieldError(e.field)
  else toast('예상치 못한 오류')
}`,
    note: '커스텀 Error 클래스로 원인 구분. 사용자 메시지 · 재시도 로직 · Sentry 태그까지 분기 기준.',
  },
  {
    id: 'friendly-message',
    emoji: '💌',
    title: '사용자 친화적 에러 메시지',
    subtitle: '개발자 메시지가 아니라 사용자 행동 안내',
    filename: '메시지 카탈로그',
    code: `// ❌ 나쁜 메시지
"Error: TypeError: Cannot read properties of undefined"
"Request failed with status 500"
"Uncaught in promise"

// ✅ 좋은 메시지 — 상황 + 다음 할 일
const ERROR_MESSAGES = {
  network: {
    title: '연결이 불안정해요',
    body: '인터넷 연결을 확인하고 다시 시도해주세요',
    action: '다시 시도',
  },
  unauthorized: {
    title: '로그인이 필요해요',
    body: '이 기능은 로그인 후 이용 가능해요',
    action: '로그인하기',
  },
  server: {
    title: '잠시만 기다려주세요',
    body: '서버에 일시적인 문제가 있어요. 복구되는 대로 정상화 될 거예요',
    action: '새로고침',
  },
} as const`,
    note: '"무엇이 잘못됐고 지금 뭘 하면 되는지" 한 화면에. 기술 용어·stack trace는 숨김(개발 환경만 표시).',
  },
  {
    id: 'retry',
    emoji: '🔁',
    title: 'Retry 전략',
    subtitle: '지수 백오프 · 최대 시도 횟수',
    filename: 'withRetry 유틸',
    code: `async function withRetry<T>(
  fn: () => Promise<T>,
  { retries = 3, baseDelay = 1000 } = {}
): Promise<T> {
  let lastError: unknown
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn()
    } catch (e) {
      lastError = e
      if (i === retries) break
      // 지수 백오프 + jitter
      const delay = baseDelay * 2 ** i + Math.random() * 200
      await new Promise(r => setTimeout(r, delay))
    }
  }
  throw lastError
}

// TanStack Query는 기본 제공
useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  retry: 3,
  retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
})`,
    note: '네트워크 요청은 재시도. 사용자 action(결제 등)은 재시도 금지 — 중복 실행 위험. 멱등성(idempotency) 키 고려.',
  },
  {
    id: 'fallback-ui',
    emoji: '🛟',
    title: 'Fallback UI 패턴',
    subtitle: '에러 = 끝이 아님. 다음 행동 유도',
    filename: 'ErrorView 컴포넌트',
    code: `function ErrorView({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className='p-8 text-center'>
      <div className='text-6xl mb-4'>😅</div>
      <h2 className='text-xl font-bold mb-2'>문제가 생겼어요</h2>
      <p className='text-gray-600 mb-4'>{getFriendlyMessage(error)}</p>

      <div className='flex gap-2 justify-center'>
        <button onClick={reset}>🔁 다시 시도</button>
        <a href='/'>🏠 홈으로</a>
      </div>

      {process.env.NODE_ENV === 'development' && (
        <details className='mt-8 text-left'>
          <summary>개발자 정보</summary>
          <pre>{error.stack}</pre>
        </details>
      )}
    </div>
  )
}`,
    note: '3가지 요소: 사과 없는 사실 전달 / 다음 행동 옵션 / 개발자 정보(개발 환경에서만). reset 버튼으로 boundary 재시도 가능.',
  },
]

export default function ErrorArchitecturePlayground() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='rounded-2xl bg-linear-to-br from-[#fff5f4] to-[#ffe8e3] p-5'>
        <div className='flex items-start gap-3'>
          <span className='text-3xl'>🎮</span>
          <div>
            <div className='font-extrabold'>프로덕션 에러 설계 · 6카드</div>
            <p className='mt-1 text-sm text-gray-700'>
              Error Boundary · Sentry · 에러 분류 · 메시지 · Retry · Fallback UI
              — 한 서비스를 견고하게 운영하는데 필요한 6조각.
            </p>
          </div>
        </div>
      </div>

      <GoalViz />

      <div className='border-t border-gray-200' />

      <PlaygroundSection
        index='A'
        emoji='🚨'
        title='에러 아키텍처 6카드'
        description='계층 · Sentry · 타입 분류 · 메시지 · Retry · Fallback.'
      >
        <CardPlayground items={CARDS} />
      </PlaygroundSection>
    </div>
  )
}
