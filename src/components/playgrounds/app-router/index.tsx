import CardPlayground, {
  type CardPlaygroundItem,
} from '@/components/stages/CardPlayground'
import StageFlow from '@/components/stages/StageFlow'

const CARDS: CardPlaygroundItem[] = [
  {
    id: 'rsc-vs-client',
    emoji: '🖥️',
    title: 'Server vs Client',
    subtitle: '기본은 서버 · 상호작용만 클라',
    filename: 'server-vs-client.tsx',
    code: `// 기본 Server Component
export default async function PostsPage() {
  const posts = await db.post.findMany()   // DB 직접 접근
  return <ul>{posts.map(p => <li key={p.id}>{p.title}<LikeButton id={p.id} /></li>)}</ul>
}

// 상호작용 필요
'use client'
export default function LikeButton({ id }) {
  const [liked, setLiked] = useState(false)
  return <button onClick={() => setLiked(!liked)}>{liked ? '❤️' : '🤍'}</button>
}`,
    note: '서버는 DB·비밀 안전. 상호작용 리프만 use client로 꺼냄.',
  },
  {
    id: 'use-client',
    emoji: '🚪',
    title: 'use client 경계',
    subtitle: '파일 최상단 지시어',
    filename: 'boundary.tsx',
    code: `// ❌ Server Component에서 useState 호출 불가
'use client'   // ← 이 한 줄이 파일을 클라 번들로

import { useState } from 'react'
export default function Counter() {
  const [n, setN] = useState(0)
  return <button onClick={() => setN(n + 1)}>{n}</button>
}`,
    note: 'use client 파일 + import 트리가 전부 클라 번들.',
  },
  {
    id: 'server-actions',
    emoji: '📨',
    title: 'Server Actions',
    subtitle: '폼이 곧 서버 함수',
    filename: 'actions.ts',
    code: `'use server'
import { revalidatePath } from 'next/cache'

export async function createPost(formData: FormData) {
  const title = formData.get('title')?.toString() ?? ''
  await db.post.create({ data: { title } })
  revalidatePath('/posts')
}

// 사용
<form action={createPost}>
  <input name='title' />
  <button>발행</button>
</form>`,
    note: 'JS 없이도 동작 + React 19 Actions와 조합 가능.',
  },
  {
    id: 'caching',
    emoji: '🗄️',
    title: '캐싱 전략',
    subtitle: 'fetch + revalidate',
    filename: 'caching.tsx',
    code: `// 시간 기반
await fetch(url, { next: { revalidate: 60 } })

// 태그 기반
await fetch(url, { next: { tags: ['posts'] } })
revalidateTag('posts')   // Server Action에서

// 비활성화
await fetch(url, { cache: 'no-store' })`,
    note: 'Next.js 15+ 기본 캐시 보수적. 필요한 만큼만 명시.',
  },
]

export default function AppRouterPlayground() {
  return (
    <StageFlow>
      <StageFlow.Empathy>
        🖥️ &quot;서버 컴포넌트는 완전 다른 세상 같아&quot; — 4장 카드로 핵심만.
      </StageFlow.Empathy>

      <StageFlow.Play subtitle='4장: RSC · use client · Actions · 캐싱'>
        <CardPlayground items={CARDS} />
      </StageFlow.Play>

      <StageFlow.Observe title='🤔 서버/클라 어디에 두는지 기준?'>
        <p>
          🟢 기본은 <b>서버 컴포넌트</b>. DB·비밀 직접 접근, JS 번들 안 들어감.
        </p>
        <p className='mt-3'>
          🟢 <code>useState</code>·<code>onClick</code> 필요할 때만{' '}
          <code>use client</code>.
        </p>
      </StageFlow.Observe>

      <StageFlow.Next subtitle='다음'>
        <p className='text-gray-700'>다음은 App Router 라우팅 패턴 깊게 🚀</p>
      </StageFlow.Next>
    </StageFlow>
  )
}
