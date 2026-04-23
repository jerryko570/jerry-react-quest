'use client'

import { Component, ReactNode, useState } from 'react'
import { cn } from '@/lib/cn'
import BeforeAfter from '@/components/stages/BeforeAfter'

type BoundaryState = { error: Error | null }

class MiniErrorBoundary extends Component<
  {
    children: ReactNode
    fallback: (reset: () => void, err: Error) => ReactNode
    resetKey: number
  },
  BoundaryState
> {
  state: BoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): BoundaryState {
    return { error }
  }

  componentDidUpdate(prev: { resetKey: number }): void {
    if (prev.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null })
    }
  }

  render(): ReactNode {
    if (this.state.error) {
      return this.props.fallback(
        () => this.setState({ error: null }),
        this.state.error
      )
    }
    return this.props.children
  }
}

function DangerousChild({ shouldExplode }: { shouldExplode: boolean }) {
  if (shouldExplode) {
    throw new Error('💥 자식 컴포넌트가 터졌어요')
  }
  return (
    <div className='rounded-xl bg-emerald-50 p-6 text-center ring-1 ring-emerald-200'>
      <div className='mb-1 text-3xl'>😌</div>
      <div className='font-bold text-emerald-800'>
        자식은 평화롭게 렌더되는 중
      </div>
      <div className='mt-1 text-xs text-emerald-700'>
        오른쪽 &quot;💥 터뜨리기&quot; 버튼을 눌러 에러를 던져보세요
      </div>
    </div>
  )
}

export default function Explosion() {
  const [useBoundary, setUseBoundary] = useState(true)
  const [shouldExplode, setShouldExplode] = useState(false)
  const [resetKey, setResetKey] = useState(0)

  const handleExplode = () => setShouldExplode(true)
  const handleReset = () => {
    setShouldExplode(false)
    setResetKey((k) => k + 1)
  }

  const child = <DangerousChild shouldExplode={shouldExplode} />

  return (
    <div className='rounded-2xl border-2 border-gray-200 bg-gray-50/70 p-5'>
      <div className='mb-4 flex flex-wrap items-center gap-3'>
        <button
          type='button'
          onClick={() => setUseBoundary((v) => !v)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-bold transition',
            useBoundary
              ? 'bg-emerald-500 text-white'
              : 'border border-red-300 bg-white text-red-600'
          )}
        >
          {useBoundary ? '🛡️ Error Boundary 씌워짐' : '🧨 Error Boundary 없음'}
        </button>
        <button
          type='button'
          onClick={handleExplode}
          disabled={shouldExplode}
          className='rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-red-600 disabled:opacity-50'
        >
          💥 자식 터뜨리기
        </button>
        <button
          type='button'
          onClick={handleReset}
          className='rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-600 hover:border-gray-300'
        >
          ↺ 다시 시도
        </button>
      </div>

      <div className='mb-3 rounded-lg bg-white p-4 text-sm ring-1 ring-gray-100'>
        <p className='text-gray-700'>
          🎯 <b>관찰 포인트</b>:
        </p>
        <ul className='mt-2 space-y-1'>
          <li>
            🛡️ Error Boundary <b>있을 때</b> 터뜨리면 → 폴백 UI로 대체되고 앱은
            살아있음. &quot;다시 시도&quot;로 복구 가능.
          </li>
          <li>
            🧨 Error Boundary <b>없을 때</b> 터뜨리면 → 아래 UI가 통째로
            사라지고 상위 트리까지 영향. (실제 프로덕션에선 전체 앱 하얗게 됨)
          </li>
        </ul>
      </div>

      <div className='mb-4 rounded-2xl bg-white p-4 ring-1 ring-gray-100'>
        {useBoundary ? (
          <MiniErrorBoundary
            resetKey={resetKey}
            fallback={(reset, err) => (
              <div className='rounded-xl bg-red-50 p-6 text-center ring-1 ring-red-200'>
                <div className='mb-1 text-3xl'>🧯</div>
                <div className='font-bold text-red-800'>폴백 UI가 떴어요</div>
                <div className='mt-1 font-mono text-xs text-red-700'>
                  {err.message}
                </div>
                <button
                  type='button'
                  onClick={() => {
                    setShouldExplode(false)
                    reset()
                  }}
                  className='mt-3 rounded-full bg-red-500 px-4 py-1.5 text-xs font-bold text-white hover:bg-red-600'
                >
                  🔁 다시 시도
                </button>
              </div>
            )}
          >
            {child}
          </MiniErrorBoundary>
        ) : shouldExplode ? (
          <div className='rounded-xl bg-gray-900 p-6 text-center text-gray-100'>
            <div className='mb-1 text-3xl'>💀</div>
            <div className='font-bold'>앱이 하얗게 됐어요</div>
            <div className='mt-1 text-xs opacity-80'>
              (시뮬레이션: 실제로는 전체 트리가 언마운트됨)
            </div>
            <button
              type='button'
              onClick={handleReset}
              className='mt-3 rounded-full bg-gray-200 px-4 py-1.5 text-xs font-bold text-gray-900 hover:bg-white'
            >
              🔄 새로고침 느낌으로 다시
            </button>
          </div>
        ) : (
          child
        )}
      </div>

      <BeforeAfter
        before={{
          label: '❌ Error Boundary 없이',
          code: `function App() {
  return (
    <div>
      <Header />
      <Dangerous /> {/* 여기서 throw 되면 */}
      <Footer />    {/* Header·Footer까지 함께 언마운트 */}
    </div>
  )
}`,
          takeaway:
            '자식 하나의 오류가 상위로 번져서 화면 전체가 사라짐 — 사용자는 그냥 흰 화면만 봄',
        }}
        after={{
          label: '✅ Error Boundary 로 격리',
          code: `function App() {
  return (
    <div>
      <Header />
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Dangerous />
      </ErrorBoundary>
      <Footer />
    </div>
  )
}`,
          takeaway:
            '오류를 특정 구역에만 가두고 나머지 UI는 살려둠 + 복구 버튼 제공 가능',
        }}
      />

      <div className='mt-4 rounded-xl border-2 border-gray-100 bg-white p-4 text-sm'>
        <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
          💭 꼭 기억할 것
        </div>
        <ul className='space-y-1 text-gray-700'>
          <li>
            ✅ <b>잡는 것</b>: 렌더 중에 throw된 에러, 라이프사이클 오류, 자식
            컴포넌트 오류
          </li>
          <li>
            ❌ <b>못 잡는 것</b>: 이벤트 핸들러(버튼 onClick) 오류, 비동기{' '}
            <code>setTimeout</code>/fetch 오류, Error Boundary 자신이 낸 오류,
            SSR 오류
          </li>
          <li>
            🎯 실전에선{' '}
            <code className='bg-gray-100 px-1'>react-error-boundary</code>{' '}
            패키지를 쓰면 훅·hookless 둘 다 깔끔하게 지원
          </li>
        </ul>
      </div>
    </div>
  )
}
