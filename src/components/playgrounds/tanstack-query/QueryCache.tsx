'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import BeforeAfter from '@/components/stages/BeforeAfter'

type CacheEntry = {
  data: string
  fetchedAt: number
}

type QueryState = {
  status: 'idle' | 'loading' | 'success' | 'error'
  data: string | null
  isStale: boolean
  fetchedAt: number | null
}

const STALE_TIME = 5000 // 5초 후 stale

async function fetchUser(id: number): Promise<string> {
  const delay = 600 + Math.random() * 600
  await new Promise((r) => setTimeout(r, delay))
  if (Math.random() < 0.15) throw new Error('network error')
  const names = ['나래', '제리', '서연', '민준', '지우']
  return `${names[(id - 1) % names.length]} (id=${id}, ${Math.round(delay)}ms)`
}

export default function QueryCache() {
  const [activeId, setActiveId] = useState(1)
  const [queries, setQueries] = useState<Record<number, QueryState>>({})
  const [cache, setCache] = useState<Record<number, CacheEntry>>({})
  const [networkCalls, setNetworkCalls] = useState(0)

  const setQuery = (id: number, patch: Partial<QueryState>) => {
    setQueries((prev) => {
      const existing: QueryState = prev[id] ?? {
        status: 'idle',
        data: null,
        isStale: false,
        fetchedAt: null,
      }
      return { ...prev, [id]: { ...existing, ...patch } }
    })
  }

  const load = async (id: number, force = false) => {
    const cached = cache[id]
    const now = Date.now()
    const hasFresh = !force && cached && now - cached.fetchedAt < STALE_TIME

    if (hasFresh) {
      // 캐시 히트 — 네트워크 호출 없이 즉시
      setQuery(id, {
        status: 'success',
        data: cached.data,
        isStale: false,
        fetchedAt: cached.fetchedAt,
      })
      return
    }

    // stale이면 캐시 먼저 보여주고 백그라운드 페치 (stale-while-revalidate)
    if (cached) {
      setQuery(id, {
        status: 'loading',
        data: cached.data,
        isStale: true,
        fetchedAt: cached.fetchedAt,
      })
    } else {
      setQuery(id, {
        status: 'loading',
        data: null,
        isStale: false,
        fetchedAt: null,
      })
    }

    setNetworkCalls((n) => n + 1)
    try {
      const data = await fetchUser(id)
      const fetchedAt = Date.now()
      setCache((prev) => ({ ...prev, [id]: { data, fetchedAt } }))
      setQuery(id, {
        status: 'success',
        data,
        isStale: false,
        fetchedAt,
      })
    } catch {
      setQuery(id, { status: 'error' })
    }
  }

  useEffect(() => {
    // 탭 변경 시 로드 트리거. mock 서버 상태 동기화이므로 의도된 side effect.
    // load 함수를 deps에 넣으면 매 렌더마다 재실행이라 의도적으로 제외.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load(activeId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId])

  const current = queries[activeId]

  return (
    <div className='rounded-2xl border-2 border-gray-200 bg-gray-50/70 p-5'>
      <div className='mb-4 flex flex-wrap items-center gap-3'>
        <div className='flex flex-wrap gap-1 rounded-full bg-white p-1 ring-1 ring-gray-200'>
          {[1, 2, 3, 4, 5].map((id) => {
            const q = queries[id]
            const cached = cache[id]
            return (
              <button
                key={id}
                type='button'
                onClick={() => setActiveId(id)}
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-bold transition',
                  activeId === id
                    ? 'bg-[#ff5e48] text-white'
                    : cached
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'text-gray-500 hover:bg-gray-100'
                )}
              >
                👤 User {id}
                {q?.isStale && ' ⏱'}
                {cached && !q?.isStale && activeId !== id && ' ✓'}
              </button>
            )
          })}
        </div>
        <button
          type='button'
          onClick={() => load(activeId, true)}
          className='rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 hover:border-[#ff5e48]'
        >
          🔄 강제 새로고침
        </button>
        <button
          type='button'
          onClick={() => {
            setCache({})
            setQueries({})
            setNetworkCalls(0)
          }}
          className='rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 hover:border-red-500'
        >
          🗑️ 캐시 비우기
        </button>
      </div>

      <div className='mb-4 grid grid-cols-2 gap-3 rounded-xl bg-white p-4 shadow-sm sm:grid-cols-4'>
        <Stat
          label='📡 네트워크 호출'
          value={networkCalls}
          hint='캐시 히트는 미포함'
        />
        <Stat
          label='🗄️ 캐시 상태'
          value={Object.keys(cache).length}
          hint='저장된 user 수'
        />
        <Stat label='🎯 현재 status' value={current?.status ?? 'idle'} />
        <Stat label='⏱ stale?' value={current?.isStale ? 'stale' : 'fresh'} />
      </div>

      <div className='mb-4 rounded-xl bg-white p-4 ring-1 ring-gray-100'>
        <div className='mb-1 text-xs font-semibold tracking-wider text-gray-500 uppercase'>
          🙋 현재 사용자 데이터
        </div>
        {current?.status === 'loading' && !current.data && (
          <div className='font-mono text-sm text-gray-400'>불러오는 중…</div>
        )}
        {current?.status === 'error' && (
          <div className='font-mono text-sm text-red-500'>
            네트워크 에러. 다시 시도하거나 캐시 비우기.
          </div>
        )}
        {current?.data && (
          <div className='font-mono text-lg font-bold'>
            {current.data}{' '}
            {current.isStale && (
              <span className='ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] text-amber-800'>
                stale — 뒤에서 refetch 중
              </span>
            )}
          </div>
        )}
      </div>

      <div className='mb-3 rounded-lg bg-white p-4 text-sm text-gray-700 ring-1 ring-gray-100'>
        <p>
          🎯 <b>관찰 포인트</b>: 탭을 User 1~5 왔다갔다 하며 네트워크 호출
          카운트를 봐.
        </p>
        <ul className='mt-2 space-y-1'>
          <li>1회차: 각 User 처음 방문 시 네트워크 호출 (loading)</li>
          <li>2회차(5초 안): 캐시 히트 → 네트워크 호출 0, 즉시 표시</li>
          <li>
            2회차(5초 후): stale 상태. <b>캐시 먼저 보여주고</b> 뒤에서 refetch
            (stale-while-revalidate)
          </li>
          <li>강제 새로고침: stale 여부와 무관하게 새 요청</li>
        </ul>
      </div>

      <BeforeAfter
        before={{
          label: '❌ useEffect + useState 수동 구현',
          code: `function UserCard({ id }: { id: number }) {
  const [data, setData] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true)
    fetchUser(id)
      .then(d => setData(d))
      .catch(e => setError(e))
      .finally(() => setLoading(false))
  }, [id])

  // 캐시도 없고, race condition 가드도 없고, dedup도 없음
  if (loading) return '...'
  return data
}`,
          takeaway:
            '매 마운트마다 새 요청, 여러 컴포넌트가 같은 데이터를 중복 요청, race condition 취약',
        }}
        after={{
          label: '✅ TanStack Query',
          code: `function UserCard({ id }: { id: number }) {
  const { data, isPending, isError } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
    staleTime: 5_000,   // 5초는 fresh
    gcTime: 5 * 60_000, // 5분 뒤 캐시 폐기
  })

  if (isPending) return '...'
  if (isError) return '에러'
  return data
}`,
          takeaway:
            '캐시·dedup·refetch·stale 관리 모두 프레임워크가 담당. 코드는 &quot;뭘 원하는가&quot;만',
        }}
      />

      <div className='mt-4 rounded-xl border-2 border-gray-100 bg-white p-4 text-sm'>
        <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
          💭 TanStack Query의 4가지 핵심
        </div>
        <ul className='space-y-1 text-gray-700'>
          <li>
            🗄️ <b>캐시</b> — queryKey 단위로 저장 · 구독. 같은 key 요청은 한
            번만
          </li>
          <li>
            🏃 <b>Refetch 정책</b> — focus 복귀 · 네트워크 회복 · mount 시 자동
          </li>
          <li>
            ⏱️ <b>stale-while-revalidate</b> — 캐시 먼저 보여주고 뒤에서 갱신
          </li>
          <li>
            🪄 <b>Mutation</b> — <code>useMutation</code> + optimistic update +{' '}
            <code>invalidateQueries</code>로 관련 쿼리 자동 재시작
          </li>
        </ul>
      </div>
    </div>
  )
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string
  value: string | number
  hint?: string
}) {
  return (
    <div>
      <div className='text-[11px] font-semibold tracking-wider text-gray-500 uppercase'>
        {label}
      </div>
      <div className='mt-0.5 font-mono text-lg font-bold'>{value}</div>
      {hint && <div className='text-[10px] text-gray-400'>{hint}</div>}
    </div>
  )
}
