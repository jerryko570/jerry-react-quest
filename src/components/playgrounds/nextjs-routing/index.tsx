import CardPlayground, {
  type CardPlaygroundItem,
} from '@/components/stages/CardPlayground'
import PlaygroundSection from '@/components/stages/PlaygroundSection'
import GoalViz from './GoalViz'

const CARDS: CardPlaygroundItem[] = [
  {
    id: 'dynamic',
    emoji: '🧩',
    title: 'Dynamic Routes',
    subtitle: '[id] · [...slug] · [[...optional]]',
    filename: 'app/posts/[id]/page.tsx',
    code: `// app/posts/[id]/page.tsx
type Props = { params: Promise<{ id: string }> }

export default async function PostDetail({ params }: Props) {
  const { id } = await params
  const post = await db.post.findUnique({ where: { id: Number(id) } })
  return <article>{post?.title}</article>
}

// 정적 생성 — 빌드 타임에 페이지 prerender
export async function generateStaticParams() {
  const posts = await db.post.findMany({ select: { id: true } })
  return posts.map(p => ({ id: String(p.id) }))
}`,
    note: '[id]는 한 세그먼트, [...slug]는 여러 세그먼트, [[...optional]]은 세그먼트 없을 수도 있음. Next.js 15+에선 params가 Promise.',
  },
  {
    id: 'route-groups',
    emoji: '📁',
    title: 'Route Groups (그룹화)',
    subtitle: '(folder) — URL에 나오지 않는 논리 그룹',
    filename: 'app 구조',
    code: `app/
  (marketing)/
    layout.tsx       // 랜딩용 레이아웃
    page.tsx         // /
    about/page.tsx   // /about
  (dashboard)/
    layout.tsx       // 대시보드 레이아웃 (다른 chrome)
    posts/page.tsx   // /posts
    stats/page.tsx   // /stats

// (marketing), (dashboard)는 URL에 안 나옴
// 하지만 각기 다른 layout.tsx 적용 가능`,
    lang: 'text',
    note: '브랜치별로 레이아웃이 완전히 달라야 하거나, 파일을 논리적으로 묶고 싶지만 URL은 그대로 두고 싶을 때.',
  },
  {
    id: 'parallel',
    emoji: '🔀',
    title: 'Parallel Routes (@slot)',
    subtitle: '한 페이지에 여러 슬롯 동시 렌더',
    filename: 'app/@modal',
    code: `app/
  layout.tsx         // 부모 layout이 slot들을 조합
  page.tsx           // 메인 콘텐츠
  @team/
    page.tsx         // "팀 슬롯"
  @analytics/
    page.tsx         // "분석 슬롯"

// layout.tsx
export default function Layout({
  children,
  team,
  analytics,
}: {
  children: React.ReactNode
  team: React.ReactNode
  analytics: React.ReactNode
}) {
  return (
    <div>
      {children}
      <aside>{team}</aside>
      <aside>{analytics}</aside>
    </div>
  )
}`,
    note: '대시보드처럼 여러 영역이 독립적으로 로딩·네비게이션되어야 할 때. 각 슬롯은 자체 loading.tsx · error.tsx를 가질 수 있어.',
  },
  {
    id: 'intercepting',
    emoji: '🪟',
    title: 'Intercepting Routes (모달 패턴)',
    subtitle: '(.)·(..)·(...)로 현재 경로를 "가로채기"',
    filename: 'app/@modal/(..)photos',
    code: `app/
  feed/
    page.tsx              // /feed
    photos/[id]/page.tsx  // /feed/photos/3 — 전체 페이지
  @modal/
    (..)photos/[id]/
      page.tsx            // /feed에서 클릭 → 모달로 표시

// 동작:
// /feed → 피드
// 썸네일 클릭(soft nav) → URL은 /feed/photos/3 지만
//   @modal 슬롯이 인터셉트해서 모달 오버레이
// 새로고침 → 인터셉트 미적용, 전체 페이지로 열림 (Instagram 스타일)`,
    note: '인스타그램의 &quot;이미지 클릭하면 모달, 새로고침하면 전체 페이지&quot; 패턴이 이거 한 트릭으로 구현됨.',
  },
  {
    id: 'ui-conventions',
    emoji: '🎨',
    title: 'Loading · Error · Not Found UI',
    subtitle: '파일 컨벤션 4가지',
    filename: 'app/posts 디렉토리',
    code: `app/posts/
  page.tsx         // 정상 렌더
  loading.tsx      // Suspense fallback — 자동 등록
  error.tsx        // ErrorBoundary — 자동 등록 ('use client' 필요)
  not-found.tsx    // notFound() 호출 시 표시
  layout.tsx       // 중첩 레이아웃

// loading.tsx 예시
export default function Loading() {
  return <Skeleton />
}

// error.tsx 예시
'use client'
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div>
      <p>문제가 발생했어요</p>
      <button onClick={reset}>다시 시도</button>
    </div>
  )
}`,
    note: '파일 이름만 지키면 Suspense·ErrorBoundary가 자동으로 감싸져. 중첩도 자동 — /posts/[id]에 자체 loading.tsx를 두면 그 레벨만 대기.',
  },
  {
    id: 'middleware',
    emoji: '🚦',
    title: 'Middleware',
    subtitle: '요청이 라우트 진입 전에 실행',
    filename: 'middleware.ts (프로젝트 루트)',
    code: `// middleware.ts
import { NextResponse, type NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('session')?.value

  // 1) 미인증 사용자 리디렉트
  if (!token && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // 2) 응답 헤더 추가
  const res = NextResponse.next()
  res.headers.set('x-user-id', decode(token).userId)
  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],  // 적용 경로
}`,
    note: '인증 가드 · i18n 라우팅 · A/B 테스트 · 봇 차단 등. Edge 런타임이라 빠르지만 Node API는 못 씀.',
  },
]

export default function NextjsRoutingPlayground() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='rounded-2xl bg-linear-to-br from-[#fff5f4] to-[#ffe8e3] p-5'>
        <div className='flex items-start gap-3'>
          <span className='text-3xl'>🎮</span>
          <div>
            <div className='font-extrabold'>App Router 라우팅 6가지 패턴</div>
            <p className='mt-1 text-sm text-gray-700'>
              Dynamic · Groups · Parallel · Intercepting ·
              loading/error/not-found · Middleware — 카드로 한 장씩 넘기며
              패턴을 훑자.
            </p>
          </div>
        </div>
      </div>

      <GoalViz />

      <div className='border-t border-gray-200' />

      <PlaygroundSection
        index='A'
        emoji='🗺️'
        title='라우팅 패턴 6카드'
        description='각 패턴의 폴더 구조와 코드 예시 · 주요 포인트.'
      >
        <CardPlayground items={CARDS} />
      </PlaygroundSection>
    </div>
  )
}
