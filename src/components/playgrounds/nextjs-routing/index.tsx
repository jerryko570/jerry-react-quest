import CardPlayground, {
  type CardPlaygroundItem,
} from '@/components/stages/CardPlayground'
import StageFlow from '@/components/stages/StageFlow'

const CARDS: CardPlaygroundItem[] = [
  {
    id: 'dynamic',
    emoji: '🧩',
    title: 'Dynamic Routes',
    subtitle: '[id] · [...slug] · [[...optional]]',
    filename: 'app/posts/[id]/page.tsx',
    code: `type Props = { params: Promise<{ id: string }> }

export default async function PostDetail({ params }: Props) {
  const { id } = await params
  const post = await db.post.findUnique({ where: { id: Number(id) } })
  return <article>{post?.title}</article>
}

export async function generateStaticParams() {
  const posts = await db.post.findMany({ select: { id: true } })
  return posts.map(p => ({ id: String(p.id) }))
}`,
    note: '[id] 한 세그먼트, [...slug] 여러 세그먼트. Next.js 15+에선 params가 Promise.',
  },
  {
    id: 'route-groups',
    emoji: '📁',
    title: 'Route Groups',
    subtitle: '(folder) — URL 숨김',
    filename: 'app 구조',
    code: `app/
  (marketing)/
    layout.tsx       // 랜딩 레이아웃
    about/page.tsx   // /about
  (dashboard)/
    layout.tsx       // 대시보드 레이아웃 (다른 chrome)
    posts/page.tsx   // /posts`,
    lang: 'text',
    note: '레이아웃 분기 · 파일 묶기에 URL 영향 없음.',
  },
  {
    id: 'parallel',
    emoji: '🔀',
    title: 'Parallel Routes',
    subtitle: '@slot — 여러 영역 동시',
    filename: 'app/@modal',
    code: `app/
  layout.tsx
  @team/page.tsx       // "팀 슬롯"
  @analytics/page.tsx  // "분석 슬롯"

// layout.tsx — slot을 prop으로 받음
export default function Layout({ children, team, analytics }) {
  return <><aside>{team}</aside><aside>{analytics}</aside></>
}`,
    note: '대시보드 영역별 독립 로딩·네비.',
  },
  {
    id: 'intercepting',
    emoji: '🪟',
    title: 'Intercepting Routes',
    subtitle: '(..)로 경로 가로채기',
    filename: '@modal/(..)photos',
    code: `app/
  feed/page.tsx
  feed/photos/[id]/page.tsx   // 전체 페이지
  @modal/
    (..)photos/[id]/page.tsx  // 클릭 시 모달

// 썸네일 클릭 → 모달로 오버레이
// 새로고침 → 전체 페이지 (인스타 스타일)`,
    note: '인스타 같은 "클릭은 모달, 새로고침은 전체 페이지" 패턴.',
  },
  {
    id: 'ui-conventions',
    emoji: '🎨',
    title: 'Loading · Error · NotFound',
    subtitle: '파일 컨벤션',
    filename: 'app/posts',
    code: `app/posts/
  page.tsx
  loading.tsx      // Suspense fallback 자동
  error.tsx        // ErrorBoundary 자동 ('use client')
  not-found.tsx    // notFound() 호출 시
  layout.tsx`,
    lang: 'text',
    note: '파일명만 맞추면 Suspense·ErrorBoundary 자동. 중첩도 자동.',
  },
  {
    id: 'middleware',
    emoji: '🚦',
    title: 'Middleware',
    subtitle: '라우트 진입 전',
    filename: 'middleware.ts',
    code: `import { NextResponse, type NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('session')?.value
  if (!token && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  return NextResponse.next()
}

export const config = { matcher: ['/dashboard/:path*'] }`,
    note: '인증 가드 · i18n · A/B 테스트. Edge 런타임이라 빠름.',
  },
]

export default function NextjsRoutingPlayground() {
  return (
    <StageFlow>
      <StageFlow.Empathy>
        🗺️ &quot;App Router 파일 컨벤션 너무 많아&quot; — 6장 카드로 핵심만.
      </StageFlow.Empathy>

      <StageFlow.Play subtitle='6장: Dynamic · Groups · Parallel · Intercepting · UI · Middleware'>
        <CardPlayground items={CARDS} />
      </StageFlow.Play>

      <StageFlow.Observe title='🤔 폴더 이름 하나로 이렇게 많은 걸?'>
        <p>
          🟢 Next.js는 <b>파일/폴더 컨벤션</b>을 적극 활용. 코드 없이도 동작
          분기.
        </p>
        <p className='mt-3'>
          🟢 괄호 · @ · ...은 각자 의미가 있어서 구조만 잘 잡아도 반은 끝.
        </p>
      </StageFlow.Observe>

      <StageFlow.Next subtitle='다음'>
        <p className='text-gray-700'>다음은 서버·클라 Data Fetching 전략 🚀</p>
      </StageFlow.Next>
    </StageFlow>
  )
}
