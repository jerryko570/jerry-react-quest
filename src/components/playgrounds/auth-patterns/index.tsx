import CardPlayground, {
  type CardPlaygroundItem,
} from '@/components/stages/CardPlayground'
import PlaygroundSection from '@/components/stages/PlaygroundSection'
import GoalViz from './GoalViz'

const CARDS: CardPlaygroundItem[] = [
  {
    id: 'nextauth-setup',
    emoji: '🔐',
    title: 'NextAuth.js (Auth.js v5) 셋업',
    subtitle: '2026년 Next.js 공식 권장 인증 라이브러리',
    filename: 'auth.ts / route handlers',
    code: `// auth.ts (프로젝트 루트)
import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({ clientId: process.env.GITHUB_ID!, clientSecret: process.env.GITHUB_SECRET! }),
    Google,
  ],
  pages: { signIn: '/login' },
})

// app/api/auth/[...nextauth]/route.ts
export { GET, POST } from '@/auth'
export { handlers as runtime } from '@/auth'

// Server Component에서 세션 읽기
import { auth } from '@/auth'
export default async function Page() {
  const session = await auth()
  if (!session) return <p>로그인 필요</p>
  return <p>안녕 {session.user?.name}</p>
}`,
    note: 'Auth.js v5는 Edge 런타임 호환 + App Router에 자연스러움. env에 Provider 키만 넣으면 기본 구성 완성.',
  },
  {
    id: 'jwt-vs-session',
    emoji: '⚖️',
    title: 'JWT vs Session',
    subtitle: '어디에 저장하고, 어떻게 검증할지',
    filename: '비교',
    code: `🔑 JWT (JSON Web Token)
- 서버가 서명한 토큰을 클라이언트가 보관
- 서버는 stateless — 토큰 검증만
- 장점: 수평 확장 쉬움, 마이크로서비스 간 편함
- 단점: 만료 전 철회 어려움, 사이즈 큼

🎫 Session (서버 세션)
- 서버가 session id만 쿠키로 내려줌, 데이터는 서버(Redis/DB)
- 장점: 철회 즉시 가능, 데이터 변경 유연
- 단점: 서버 상태 유지 필요, 수평 확장 시 세션 저장소 공유

Auth.js 기본 — "JWT 전략" (stateless, 자체 서명)
Auth.js "database 전략" — Prisma 어댑터로 세션 테이블 관리

// auth.ts에서 전략 선택
export const { auth } = NextAuth({
  session: { strategy: 'jwt' },       // 또는 'database'
  // ...
})`,
    lang: 'text',
    note: '대부분 JWT로 시작. 로그아웃 즉시 만료 · 강제 로그아웃 · 디바이스 관리가 중요하면 database 전략 고려.',
  },
  {
    id: 'middleware-guard',
    emoji: '🚦',
    title: 'Protected Routes (Middleware)',
    subtitle: '라우트 진입 전 인증 가드',
    filename: 'middleware.ts',
    code: `import NextAuth from 'next-auth'
import authConfig from '@/auth.config'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')

  if (isOnDashboard && !isLoggedIn) {
    return Response.redirect(new URL('/login', nextUrl))
  }
  if (isOnDashboard && isLoggedIn) {
    return  // 통과
  }

  return
})

export const config = {
  matcher: ['/((?!api|_next|static|.*\\..*).*)'],
}`,
    note: 'Middleware는 Edge 런타임이라 빠름. 전체 앱 인증 가드의 표준 위치.',
  },
  {
    id: 'oauth',
    emoji: '🌐',
    title: 'OAuth (GitHub · Google)',
    subtitle: 'Provider 설정 + callback URL',
    filename: '.env + 플로우',
    code: `# .env.local
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=$(openssl rand -base64 32)

# GitHub OAuth
GITHUB_ID=xxxx
GITHUB_SECRET=yyyy

# Google OAuth
AUTH_GOOGLE_ID=zzzz.apps.googleusercontent.com
AUTH_GOOGLE_SECRET=...

플로우:
1. 사용자 → /api/auth/signin/github
2. GitHub에 리다이렉트 → 동의
3. GitHub → /api/auth/callback/github?code=...
4. Auth.js가 code로 토큰 교환 + user 정보 fetch
5. 세션 쿠키 세팅 → 원래 페이지로

Provider 콘솔 설정:
  Homepage URL: http://localhost:3000
  Authorization callback URL:
    http://localhost:3000/api/auth/callback/github`,
    lang: 'text',
    note: 'callback URL이 Provider 콘솔과 정확히 일치해야 함. 프로덕션용 · dev용 각각 등록.',
  },
  {
    id: 'rbac',
    emoji: '🎭',
    title: 'Role-based Access Control',
    subtitle: '사용자 역할에 따른 권한 분기',
    filename: '권한 체크 패턴',
    code: `// session에 role 추가
// auth.ts
export const { auth } = NextAuth({
  callbacks: {
    async session({ session, token }) {
      if (token.role) session.user.role = token.role as string
      return session
    },
    async jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role
      return token
    },
  },
})

// Server Component에서 체크
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const session = await auth()
  if (!session) redirect('/login')
  if (session.user.role !== 'admin') redirect('/forbidden')
  return <AdminDashboard />
}

// Middleware에서도 가능
if (pathname.startsWith('/admin') && token.role !== 'admin') {
  return Response.redirect(new URL('/forbidden', req.url))
}`,
    note: '역할이 많아지면 권한 매트릭스를 유틸 함수로 분리 (<code>can(user, &apos;posts:delete&apos;)</code> 형태).',
  },
]

export default function AuthPatternsPlayground() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='rounded-2xl bg-linear-to-br from-[#fff5f4] to-[#ffe8e3] p-5'>
        <div className='flex items-start gap-3'>
          <span className='text-3xl'>🎮</span>
          <div>
            <div className='font-extrabold'>로그인·권한 · 5카드</div>
            <p className='mt-1 text-sm text-gray-700'>
              Auth.js v5 기준으로 설치 · JWT vs Session · Middleware 가드 ·
              OAuth · RBAC를 빠르게 훑기.
            </p>
          </div>
        </div>
      </div>

      <GoalViz />

      <div className='border-t border-gray-200' />

      <PlaygroundSection
        index='A'
        emoji='🔐'
        title='Auth 5카드'
        description='NextAuth 셋업 · JWT vs Session · Middleware 가드 · OAuth 플로우 · Role-based Access.'
      >
        <CardPlayground items={CARDS} />
      </PlaygroundSection>
    </div>
  )
}
