'use client'

import { startTransition, useActionState, useOptimistic, useState } from 'react'
import { cn } from '@/lib/cn'
import BeforeAfter from '@/components/stages/BeforeAfter'

type Post = { id: number; title: string; likes: number; liked: boolean }

const INITIAL_POSTS: Post[] = [
  { id: 1, title: 'React Quest 시작!', likes: 12, liked: false },
  { id: 2, title: 'useMemo 정복기', likes: 34, liked: true },
  { id: 3, title: 'Suspense + use 체험', likes: 7, liked: false },
]

// 서버를 흉내낸 mutation — 1초 지연 + 20% 실패
async function toggleLikeOnServer(posts: Post[], id: number): Promise<Post[]> {
  await new Promise((r) => setTimeout(r, 1000))
  if (Math.random() < 0.2) throw new Error('network error')
  return posts.map((p) =>
    p.id === id
      ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
      : p
  )
}

export default function OptimisticLike() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS)

  // useOptimistic: posts 배열에 &quot;낙관적 덮어쓰기&quot; 기능
  const [optimisticPosts, addOptimistic] = useOptimistic(
    posts,
    (current: Post[], toggledId: number) =>
      current.map((p) =>
        p.id === toggledId
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
            }
          : p
      )
  )

  // useActionState: action이 돌아간 뒤의 에러 메시지 담기
  const [errorMessage, toggleAction, isPending] = useActionState<
    string | null,
    number
  >(async (_prev, id) => {
    try {
      const updated = await toggleLikeOnServer(posts, id)
      setPosts(updated)
      return null
    } catch (e) {
      return e instanceof Error ? e.message : '알 수 없는 오류'
    }
  }, null)

  const handleLike = (id: number) => {
    startTransition(() => {
      // 낙관적 UI 먼저 반영 (서버 응답 전)
      addOptimistic(id)
      // 그 다음에 action 실행
      toggleAction(id)
    })
  }

  return (
    <div className='rounded-2xl border-2 border-gray-200 bg-gray-50/70 p-5'>
      <div className='mb-3 rounded-lg bg-white p-4 text-sm text-gray-700 ring-1 ring-gray-100'>
        <p>
          🎯 <b>관찰 포인트</b>: 좋아요 버튼을 눌러봐. 서버 응답은 1초 걸려.
        </p>
        <ul className='mt-2 space-y-1'>
          <li>
            ⚡ <b>useOptimistic</b> — UI는 <b>즉시</b> 바뀜 (버튼 누르자마자 +1
            또는 -1)
          </li>
          <li>
            🕰️ <b>useActionState</b> — 서버 결과가 오면 공식값이 확정됨
          </li>
          <li>
            ❌ <b>20% 확률로 실패</b> — 실패 시 낙관적 업데이트가 롤백되고 에러
            메시지 표시
          </li>
        </ul>
      </div>

      {errorMessage && (
        <div className='mb-3 rounded-lg bg-red-50 p-3 ring-1 ring-red-200'>
          <div className='text-xs font-semibold tracking-wider text-red-800 uppercase'>
            🚨 서버 에러
          </div>
          <div className='mt-1 font-mono text-sm text-red-900'>
            {errorMessage} — 버튼을 다시 눌러 재시도
          </div>
        </div>
      )}

      <div className='mb-4 space-y-2'>
        {optimisticPosts.map((p) => (
          <div
            key={p.id}
            className='flex items-center justify-between rounded-xl bg-white p-4 ring-1 ring-gray-200'
          >
            <div>
              <div className='text-xs font-semibold tracking-wider text-gray-500 uppercase'>
                post #{p.id}
              </div>
              <div className='text-sm font-bold'>{p.title}</div>
            </div>
            <button
              type='button'
              onClick={() => handleLike(p.id)}
              disabled={isPending}
              className={cn(
                'flex items-center gap-1.5 rounded-full border-2 px-4 py-2 text-sm font-bold transition',
                p.liked
                  ? 'border-[#ff5e48] bg-[#fff5f4] text-[#ff5e48]'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-[#ff5e48]',
                isPending && 'opacity-60'
              )}
            >
              <span>{p.liked ? '❤️' : '🤍'}</span>
              <span className='font-mono'>{p.likes}</span>
            </button>
          </div>
        ))}
      </div>

      <div className='mb-3 rounded-lg bg-white p-3 text-xs text-gray-500 ring-1 ring-gray-100'>
        isPending: <code>{isPending ? 'true' : 'false'}</code>
        {' · '}공식 posts likes:{' '}
        <code>{posts.map((p) => p.likes).join(', ')}</code>
        {' · '}낙관적 likes:{' '}
        <code>{optimisticPosts.map((p) => p.likes).join(', ')}</code>
      </div>

      <BeforeAfter
        before={{
          label: '❌ setState + try/catch 수동',
          code: `const [posts, setPosts] = useState(initial)
const [pending, setPending] = useState(false)
const [error, setError] = useState<string | null>(null)

const like = async (id: number) => {
  setPending(true)
  const prev = posts
  setPosts(posts.map(...))  // 낙관적
  try {
    const updated = await api.like(id)
    setPosts(updated)
  } catch (e) {
    setPosts(prev)            // 롤백
    setError(e.message)
  } finally {
    setPending(false)
  }
}`,
          takeaway:
            '낙관적 업데이트 + 롤백 + pending + 에러를 수동으로 관리. 보일러가 많음',
        }}
        after={{
          label: '✅ React 19 Actions 3종',
          code: `const [optimisticPosts, addOptimistic] = useOptimistic(
  posts,
  (current, id) => current.map(p => p.id === id ? { ...p, ... } : p)
)

const [error, likeAction, isPending] = useActionState(
  async (_prev, id) => {
    try {
      const updated = await api.like(id)
      setPosts(updated)
      return null
    } catch (e) { return e.message }
  },
  null
)

const handleLike = (id) => {
  startTransition(() => {
    addOptimistic(id)  // 즉시 UI 반영
    likeAction(id)     // 서버 호출 + 결과 반영
  })
}`,
          takeaway:
            '낙관적·pending·에러가 각자의 훅으로 분리. 롤백은 React가 자동 (실패 시 원본 posts 그대로)',
        }}
      />

      <div className='mt-4 rounded-xl border-2 border-gray-100 bg-white p-4 text-sm'>
        <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
          💭 React 19 Actions 3종 세트
        </div>
        <ul className='space-y-1 text-gray-700'>
          <li>
            ⚡ <b>useOptimistic</b> — UI를 서버 응답 전에 미리 바꾸고, 응답 실패
            시 자동 롤백
          </li>
          <li>
            🕰️ <b>useActionState</b> — 비동기 action의 결과/에러와 isPending을
            한 훅에
          </li>
          <li>
            📋 <b>useFormStatus</b> — form 하위 컴포넌트에서 부모 form의 pending
            상태를 읽음. Submit 버튼 disabling에 유용
          </li>
        </ul>
      </div>
    </div>
  )
}
