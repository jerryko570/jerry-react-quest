import { ReactNode } from 'react'

export default function AuthPatternsGoalViz() {
  return (
    <section>
      <header className='mb-4'>
        <h3 className='text-lg font-extrabold'>🎯 학습 목표 — 풀어서 보기</h3>
        <p className='text-sm text-gray-500'>
          Auth.js v5로 최소한의 조각 맞추기.
        </p>
      </header>
      <div className='grid gap-4 md:grid-cols-2'>
        <GoalCard
          index='1'
          emoji='🔐'
          title='Auth.js v5 (NextAuth)'
          hook='Next.js 공식 권장 인증'
        >
          <p>
            env에 Provider 키만 넣으면 기본 동작. Server/Client 어디서든{' '}
            <code>auth()</code>로 세션 확인.
          </p>
        </GoalCard>
        <GoalCard
          index='2'
          emoji='⚖️'
          title='JWT vs Session'
          hook='stateless vs 서버 보관'
        >
          <p>
            JWT — 서명 토큰을 클라가 보관, 서버는 stateless. Session —
            서버(Redis/DB)가 원본, 클라는 session id만. 시작은 JWT, 강제
            로그아웃 필요하면 DB 전략.
          </p>
        </GoalCard>
        <GoalCard
          index='3'
          emoji='🚦'
          title='Protected Routes (Middleware)'
          hook='라우트 진입 전 가드'
        >
          <p>
            <code>middleware.ts</code>에서 auth 체크하면 Edge 런타임이라 빠름.
            미로그인 → redirect, 로그인 → 통과.
          </p>
        </GoalCard>
        <GoalCard
          index='4'
          emoji='🌐'
          title='OAuth (GitHub · Google)'
          hook='콜백 URL이 핵심'
        >
          <p>
            Provider 콘솔의 &quot;Authorization callback URL&quot;을{' '}
            <code>/api/auth/callback/&lt;provider&gt;</code>로 정확히 맞추는 게
            포인트.
          </p>
        </GoalCard>
        <GoalCard
          index='5'
          emoji='🎭'
          title='Role-based Access Control'
          hook='session에 role 추가'
        >
          <p>
            Auth.js의 <code>jwt</code>·<code>session</code> 콜백에서 role을 실어
            나르고, 페이지/미들웨어에서 체크. 권한 매트릭스가 커지면 유틸 함수로
            추출.
          </p>
        </GoalCard>
        <GoalCard
          index='6'
          emoji='🔒'
          title='보안 체크리스트'
          hook='실전에서 빠뜨리면 안 되는 것'
        >
          <ul className='space-y-1 text-[13px]'>
            <li>🛡️ CSRF — Auth.js가 기본 방어</li>
            <li>🛡️ Secure · HttpOnly 쿠키</li>
            <li>🛡️ Rate limit — Middleware 또는 Edge function</li>
            <li>🛡️ 비밀번호는 bcrypt/argon2 해시 (저장 X)</li>
          </ul>
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
