import CardPlayground, {
  type CardPlaygroundItem,
} from '@/components/stages/CardPlayground'
import PlaygroundSection from '@/components/stages/PlaygroundSection'
import GoalViz from './GoalViz'

const CARDS: CardPlaygroundItem[] = [
  {
    id: 'rsc-vs-client',
    emoji: '🖥️',
    title: 'Server vs Client 컴포넌트',
    subtitle: '기본은 서버 · 필요할 때만 클라',
    tagline: '원칙: "최소한의 use client"',
    filename: 'server-vs-client.tsx',
    code: `// app/posts/page.tsx — 기본은 Server Component (파일에 아무 것도 없어도 됨)
import { db } from '@/lib/db'
import LikeButton from './LikeButton'

export default async function PostsPage() {
  const posts = await db.post.findMany()   // 서버에서 직접 DB 접근
  return (
    <ul>
      {posts.map(p => (
        <li key={p.id}>
          {p.title}
          <LikeButton id={p.id} />  {/* 클라이언트 컴포넌트 */}
        </li>
      ))}
    </ul>
  )
}

// LikeButton.tsx
'use client'
import { useState } from 'react'
export default function LikeButton({ id }: { id: number }) {
  const [liked, setLiked] = useState(false)
  return <button onClick={() => setLiked(!liked)}>{liked ? '❤️' : '🤍'}</button>
}`,
    note: 'Server 컴포넌트에서 DB·파일·비밀값에 직접 접근 가능 — 클라이언트로 JS가 안 가. 상호작용 필요한 리프만 "use client"로 꺼냄.',
  },
  {
    id: 'use-client-boundary',
    emoji: '🚪',
    title: "'use client' 경계",
    subtitle: '지시어 한 줄이 모든 걸 바꾼다',
    tagline: '파일 최상단에만 유효',
    filename: 'boundary.tsx',
    code: `// ❌ 잘못된 예
// 서버 컴포넌트 안에서 useState 호출하면 빌드 에러
import { useState } from 'react'
export default function Page() {
  const [n, setN] = useState(0)  // 💥 Error
  return <div>{n}</div>
}

// ✅ 올바른 분리
// Counter.tsx
'use client'
import { useState } from 'react'
export default function Counter() {
  const [n, setN] = useState(0)
  return <button onClick={() => setN(n + 1)}>{n}</button>
}

// page.tsx (Server)
import Counter from './Counter'
export default function Page() {
  return <div><Counter /></div>  // ✅ 클라 컴포넌트를 서버에서 import OK
}`,
    note: '"use client"가 붙은 파일과 그 import 트리는 클라 번들. 그렇지 않은 파일은 서버 번들. 경계는 파일 단위야.',
  },
  {
    id: 'server-actions',
    emoji: '📨',
    title: 'Server Actions',
    subtitle: '폼 submit이 곧 서버 함수 호출',
    tagline: 'RPC 없이 타입 안전한 mutation',
    filename: 'server-actions.tsx',
    code: `// app/posts/actions.ts
'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function createPost(formData: FormData) {
  const title = formData.get('title')?.toString() ?? ''
  await db.post.create({ data: { title } })
  revalidatePath('/posts')   // 캐시 무효화 → 다음 요청 새로 가져옴
}

// app/posts/new/page.tsx
import { createPost } from '../actions'

export default function NewPostPage() {
  return (
    <form action={createPost}>
      <input name='title' required />
      <button type='submit'>발행</button>
    </form>
  )
}`,
    note: '폼이 JS 없이도 작동하는 기본(progressive enhancement) + JS 있으면 navigate 없이 부드럽게. revalidatePath/revalidateTag로 관련 페이지 자동 재생성.',
  },
  {
    id: 'caching',
    emoji: '🗄️',
    title: '캐싱 전략 (fetch + revalidate)',
    subtitle: '기본 캐시 · 수명 · 태그 기반 무효화',
    tagline: 'Server Component fetch는 기본 캐시',
    filename: 'caching.tsx',
    code: `// 1) 기본 — 빌드 타임에 fetch, 이후 영구 캐시
const posts = await fetch('https://api.example.com/posts')

// 2) 시간 기반 재검증 — 60초마다 새로
const posts = await fetch(url, { next: { revalidate: 60 } })

// 3) 태그 기반 재검증 — 수동으로 무효화
const posts = await fetch(url, { next: { tags: ['posts'] } })

// Server Action에서
'use server'
import { revalidateTag } from 'next/cache'
export async function addPost(data) {
  await db.post.create({ data })
  revalidateTag('posts')   // 위의 fetch가 다음 요청 때 재실행
}

// 4) 매 요청마다 새로 (캐시 off)
const live = await fetch(url, { cache: 'no-store' })`,
    note: 'Next.js 15+에서는 기본 캐시 정책이 보수적으로 바뀜. 필요한 만큼만 명시적으로 캐시하고 revalidate · no-store로 튜닝.',
  },
]

export default function AppRouterPlayground() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='rounded-2xl bg-linear-to-br from-[#fff5f4] to-[#ffe8e3] p-5'>
        <div className='flex items-start gap-3'>
          <span className='text-3xl'>🎮</span>
          <div>
            <div className='font-extrabold'>
              서버 컴포넌트의 새 세계 — 4카드 훑기
            </div>
            <p className='mt-1 text-sm text-gray-700'>
              Server/Client 경계, Server Actions, 캐싱 전략을 코드로 한 장씩
              카드 넘기며 감 잡자. 모든 예제는 Next.js 16 App Router 기준.
            </p>
          </div>
        </div>
      </div>

      <GoalViz />

      <div className='border-t border-gray-200' />

      <PlaygroundSection
        index='A'
        emoji='🖥️'
        title='App Router 4시나리오'
        description='서버/클라이언트 · use client 경계 · Server Actions · 캐싱.'
      >
        <CardPlayground items={CARDS} />
      </PlaygroundSection>
    </div>
  )
}
