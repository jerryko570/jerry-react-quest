import CardPlayground, {
  type CardPlaygroundItem,
} from '@/components/stages/CardPlayground'
import StageFlow from '@/components/stages/StageFlow'

const CARDS: CardPlaygroundItem[] = [
  {
    id: 'layered',
    emoji: '🏗️',
    title: 'Boundary 계층',
    subtitle: '전역 · 라우트 · 위젯',
    filename: 'app 구성',
    code: `// 1) 전역 — 최후 방어선
// app/global-error.tsx
export default function GlobalError({ error, reset }) {
  return <html><body><h1>문제가 발생했습니다</h1><button onClick={reset}>다시 시도</button></body></html>
}

// 2) 라우트 — error.tsx (use client 필수)
// 3) 위젯 — react-error-boundary로 격리`,
    note: '가장 안쪽 boundary로 격리. 전역은 최후 안전망.',
  },
  {
    id: 'sentry',
    emoji: '📡',
    title: 'Sentry 연동',
    subtitle: '프로덕션 에러 수집',
    filename: 'sentry.client.config.ts',
    code: `Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})

Sentry.captureException(e, {
  tags: { feature: 'checkout' },
  extra: { cartItems: 3 },
})`,
    note: 'stack trace + 사용자 context + 세션 리플레이.',
  },
  {
    id: 'error-types',
    emoji: '🏷',
    title: '에러 타입 분류',
    subtitle: 'Network · Logic · Auth',
    filename: '커스텀 Error',
    code: `class NetworkError extends Error {
  constructor(message, public status) { super(message); this.name = 'NetworkError' }
}

try { await save(data) }
catch (e) {
  if (e instanceof NetworkError && e.status === 401) redirect('/login')
  else if (e instanceof ValidationError) showFieldError(e.field)
  else toast('예상치 못한 오류')
}`,
    note: '커스텀 Error 클래스로 분기. 사용자 메시지·재시도 기준.',
  },
  {
    id: 'friendly-message',
    emoji: '💌',
    title: '사용자 메시지',
    subtitle: '다음 행동 안내',
    filename: 'ERROR_MESSAGES',
    code: `const ERROR_MESSAGES = {
  network: {
    title: '연결이 불안정해요',
    body: '인터넷 연결을 확인하고 다시 시도해주세요',
    action: '다시 시도',
  },
  unauthorized: {
    title: '로그인이 필요해요',
    action: '로그인하기',
  },
}`,
    note: '"무엇" + "지금 뭘 하면 되는지". stack trace는 dev에서만.',
  },
  {
    id: 'retry',
    emoji: '🔁',
    title: 'Retry 전략',
    subtitle: '지수 백오프',
    filename: 'withRetry',
    code: `async function withRetry(fn, { retries = 3, baseDelay = 1000 } = {}) {
  for (let i = 0; i <= retries; i++) {
    try { return await fn() }
    catch (e) {
      if (i === retries) throw e
      await new Promise(r => setTimeout(r, baseDelay * 2 ** i))
    }
  }
}

// TanStack Query
useQuery({
  queryKey, queryFn,
  retry: 3,
  retryDelay: (i) => Math.min(1000 * 2 ** i, 30000),
})`,
    note: '네트워크는 재시도. 결제는 idempotency 키 고려.',
  },
  {
    id: 'fallback-ui',
    emoji: '🛟',
    title: 'Fallback UI',
    subtitle: '다음 행동 유도',
    filename: 'ErrorView',
    code: `function ErrorView({ error, reset }) {
  return (
    <div className='p-8 text-center'>
      <div className='text-6xl mb-4'>😅</div>
      <h2>문제가 생겼어요</h2>
      <p>{getFriendlyMessage(error)}</p>
      <button onClick={reset}>🔁 다시 시도</button>
      {dev && <details>{error.stack}</details>}
    </div>
  )
}`,
    note: '사실 전달 + 다음 행동 + 개발자 정보(dev only).',
  },
]

export default function ErrorArchitecturePlayground() {
  return (
    <StageFlow>
      <StageFlow.Empathy>
        🚨 &quot;프로덕션에서 에러 나면 그냥 흰 화면&quot; — 6조각으로 견고하게.
      </StageFlow.Empathy>

      <StageFlow.Play subtitle='6장 카드: 계층 · Sentry · 분류 · 메시지 · Retry · Fallback'>
        <CardPlayground items={CARDS} />
      </StageFlow.Play>

      <StageFlow.Observe title='🤔 왜 이렇게 세분화?'>
        <p>
          🟢 <b>에러 종류마다 사용자 행동이 다르거든</b>. 재시도 · 로그인 ·
          새로고침.
        </p>
        <p className='mt-3'>
          🟢 Sentry + 분류 + Retry + Fallback이 모이면 앱이 <b>자가 복원력</b>을
          가짐.
        </p>
      </StageFlow.Observe>

      <StageFlow.Next subtitle='다음'>
        <p className='text-gray-700'>
          다음은 <b>디자인 시스템 실전</b> 🚀
        </p>
      </StageFlow.Next>
    </StageFlow>
  )
}
