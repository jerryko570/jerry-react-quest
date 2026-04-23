'use client'

import { useCallback, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import BeforeAfter from '@/components/stages/BeforeAfter'

// 🎣 커스텀 훅 — 클립보드 복사 + "복사됨" 상태 타이머
function useCopyToClipboard(
  resetMs = 2000
): [boolean, (text: string) => Promise<void>] {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        if (timer.current) clearTimeout(timer.current)
        timer.current = setTimeout(() => setCopied(false), resetMs)
      } catch {
        setCopied(false)
      }
    },
    [resetMs]
  )

  return [copied, copy]
}

const SAMPLE = `const [copied, copy] = useCopyToClipboard()
<button onClick={() => copy('hello')}>
  {copied ? '✅ 복사됨' : '📋 복사'}
</button>`

export default function UseCopyDemo() {
  const [copied, copy] = useCopyToClipboard(1500)

  return (
    <div className='rounded-2xl border-2 border-gray-200 bg-gray-50/70 p-5'>
      <div className='mb-4 rounded-xl bg-white p-4 ring-1 ring-gray-100'>
        <div className='mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase'>
          📋 복사해볼 텍스트
        </div>
        <pre className='overflow-x-auto rounded-lg bg-gray-900 p-3 font-mono text-[11px] text-gray-100'>
          <code>{SAMPLE}</code>
        </pre>
        <button
          type='button'
          onClick={() => copy(SAMPLE)}
          className={cn(
            'mt-3 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition',
            copied
              ? 'bg-emerald-500 text-white'
              : 'bg-[#ff5e48] text-white hover:bg-[#ec4b36]'
          )}
        >
          {copied ? '✅ 복사됨!' : '📋 복사하기'}
        </button>
      </div>

      <div className='mb-3 rounded-lg bg-white p-4 text-sm text-gray-700 ring-1 ring-gray-100'>
        <p>
          🎯 <b>커스텀 훅</b>이 은근슬쩍 해준 일:
        </p>
        <ul className='mt-2 space-y-1'>
          <li>✂️ navigator.clipboard.writeText 호출</li>
          <li>
            ⏱️ 성공 시 <code>copied = true</code>로 바꾸고 1.5초 뒤 자동 false
            복귀 (타이머 관리)
          </li>
          <li>
            🧹 연속 클릭에도 타이머가 꼬이지 않게 clearTimeout으로 이전 타이머
            정리
          </li>
        </ul>
      </div>

      <BeforeAfter
        before={{
          label: '❌ 컴포넌트 안에 모든 로직',
          code: `function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }

  return <button onClick={copy}>{copied ? '✅' : '📋'}</button>
}`,
          takeaway:
            '다른 곳에서도 복사 기능 필요하면 이 로직 전부 복붙. 타이머 관리까지 깨짐',
        }}
        after={{
          label: '✅ useCopyToClipboard 훅으로 분리',
          code: `function useCopyToClipboard(resetMs = 2000) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const copy = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), resetMs)
  }, [resetMs])

  return [copied, copy] as const
}

function CopyButton({ text }: { text: string }) {
  const [copied, copy] = useCopyToClipboard()
  return <button onClick={() => copy(text)}>{copied ? '✅' : '📋'}</button>
}`,
          takeaway:
            '로직은 훅에, 표시는 컴포넌트에. 어디서든 두 줄로 끝. 테스트도 편함',
        }}
      />
    </div>
  )
}
