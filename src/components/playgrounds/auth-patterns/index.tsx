import CardPlayground, {
  type CardPlaygroundItem,
} from '@/components/stages/CardPlayground'
import StageFlow from '@/components/stages/StageFlow'

const CARDS: CardPlaygroundItem[] = [
  {
    id: 'nextauth-setup',
    emoji: '🔐',
    title: 'NextAuth.js v5 셋업',
    subtitle: 'Next.js 공식 권장',
    filename: 'auth.ts',
    code: `import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  pages: { signIn: '/login' },
})

// Server Component에서
const session = await auth()
if (!session) return <p>로그인 필요</p>`,
    note: 'Auth.js v5는 Edge 런타임 호환. env에 Provider 키만 넣으면 기본 완성.',
  },
  {
    id: 'jwt-vs-session',
    emoji: '⚖️',
    title: 'JWT vs Session',
    subtitle: 'stateless vs 서버 보관',
    filename: '비교',
    code: `🔑 JWT
- 서버 서명 토큰을 클라가 보관
- 서버 stateless · 수평 확장 쉬움
- 만료 전 철회 어려움

🎫 Session
- session id만 쿠키, 데이터는 서버(Redis/DB)
- 철회 즉시 가능
- 서버 상태 공유 필요

// 전략 선택
NextAuth({ session: { strategy: 'jwt' } })`,
    lang: 'text',
    note: '대부분 JWT로 시작. 강제 로그아웃 필요하면 database 전략.',
  },
  {
    id: 'middleware-guard',
    emoji: '🚦',
    title: 'Middleware 가드',
    subtitle: '라우트 진입 전 인증',
    filename: 'middleware.ts',
    code: `import NextAuth from 'next-auth'
import authConfig from '@/auth.config'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const isLoggedIn = !!req.auth
  if (req.nextUrl.pathname.startsWith('/dashboard') && !isLoggedIn) {
    return Response.redirect(new URL('/login', req.nextUrl))
  }
})`,
    note: 'Edge 런타임이라 빠름. 전체 앱 인증 가드 표준.',
  },
  {
    id: 'oauth',
    emoji: '🌐',
    title: 'OAuth',
    subtitle: 'GitHub · Google',
    filename: '.env',
    code: `NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=$(openssl rand -base64 32)
GITHUB_ID=xxxx
GITHUB_SECRET=yyyy

플로우:
1. /api/auth/signin/github
2. GitHub 동의 → callback
3. Auth.js가 토큰 교환 + user fetch
4. 세션 쿠키 세팅

Provider 콘솔:
Authorization callback URL:
  http://localhost:3000/api/auth/callback/github`,
    lang: 'text',
    note: 'callback URL이 Provider 콘솔과 정확히 일치해야 함.',
  },
  {
    id: 'rbac',
    emoji: '🎭',
    title: 'Role-based Access',
    subtitle: '역할별 권한',
    filename: 'auth.ts + page',
    code: `// session에 role
NextAuth({
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role
      return session
    },
  },
})

// Server Component
const session = await auth()
if (session?.user.role !== 'admin') redirect('/forbidden')
return <AdminDashboard />`,
    note: '권한 많아지면 can(user, "posts:delete") 유틸 함수로 분리.',
  },
]

export default function AuthPatternsPlayground() {
  return (
    <StageFlow>
      <StageFlow.Empathy>
        🔐 &quot;로그인 · OAuth · 권한 직접 짜려니 막막&quot; — 5장 카드로 흐름
        잡자.
      </StageFlow.Empathy>

      <StageFlow.Play subtitle='5장 카드: 셋업 · JWT/Session · Middleware · OAuth · RBAC'>
        <CardPlayground items={CARDS} />
      </StageFlow.Play>

      <StageFlow.Observe title='🤔 Auth.js는 왜 이렇게 간결해?'>
        <p>🟢 Provider 설정 + callback URL만 있으면 OAuth 플로우 자동.</p>
        <p className='mt-3'>
          🟢 Middleware와 조합해 <b>전역 가드</b>, session에 role 실어 RBAC까지.
        </p>
      </StageFlow.Observe>

      <StageFlow.Next subtitle='다음'>
        <p className='text-gray-700'>
          🌊 API 탭 완주. 다음은 <b>접근성</b> 🚀
        </p>
      </StageFlow.Next>
    </StageFlow>
  )
}
