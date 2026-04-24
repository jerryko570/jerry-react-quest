'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import BeforeAfter from '@/components/stages/BeforeAfter'

function AriaLiveDemo() {
  const [announcements, setAnnouncements] = useState<string[]>([])

  const notify = (msg: string) => {
    setAnnouncements((prev) => [...prev, msg].slice(-5))
  }

  return (
    <div className='rounded-xl bg-white p-4 ring-1 ring-gray-200'>
      <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
        🔔 ARIA live region (스크린 리더가 읽어줌)
      </div>
      <div className='mb-3 flex flex-wrap gap-2'>
        <button
          type='button'
          onClick={() =>
            notify(`✅ 저장됨 (${new Date().toLocaleTimeString('ko-KR')})`)
          }
          className='rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white hover:bg-emerald-600'
        >
          ✅ 저장
        </button>
        <button
          type='button'
          onClick={() =>
            notify(`🗑️ 삭제됨 (${new Date().toLocaleTimeString('ko-KR')})`)
          }
          className='rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white hover:bg-red-600'
        >
          🗑️ 삭제
        </button>
        <button
          type='button'
          onClick={() =>
            notify(`📧 메일 전송됨 (${new Date().toLocaleTimeString('ko-KR')})`)
          }
          className='rounded-full bg-[#4576fc] px-3 py-1 text-xs font-bold text-white hover:bg-[#2355de]'
        >
          📧 메일
        </button>
      </div>

      <div
        aria-live='polite'
        aria-atomic='true'
        className='rounded-lg bg-gray-900 p-3 font-mono text-xs text-gray-100'
      >
        {announcements.length === 0 ? (
          <span className='text-gray-500'>
            (여기 토스트 메시지가 쌓여. 스크린 리더가 읽어줌)
          </span>
        ) : (
          announcements.map((a, i) => (
            <div key={i} className='py-0.5'>
              {a}
            </div>
          ))
        )}
      </div>
      <p className='mt-2 text-[11px] text-gray-500'>
        <code>aria-live=&quot;polite&quot;</code>가 있어서 내용이 바뀔 때 스크린
        리더가 &quot;저장됨&quot; 같은 문장을 읽어줘. 사용자가 현재 하던 작업을
        끊지 않음.
      </p>
    </div>
  )
}

function FocusTrapModal() {
  const [open, setOpen] = useState(false)
  const openerRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const titleId = useId()

  useEffect(() => {
    if (!open) return
    const dialog = dialogRef.current
    if (!dialog) return
    const opener = openerRef.current // cleanup 시점엔 null일 수 있으니 지금 캡처

    const focusables = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    first?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
      } else if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      opener?.focus() // 닫힐 때 원래 버튼으로 복귀
    }
  }, [open])

  return (
    <div className='rounded-xl bg-white p-4 ring-1 ring-gray-200'>
      <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
        🪤 키보드 포커스 트랩 모달
      </div>
      <button
        ref={openerRef}
        type='button'
        onClick={() => setOpen(true)}
        className='rounded-full bg-[#4576fc] px-4 py-2 text-sm font-bold text-white hover:bg-[#2355de]'
      >
        🪟 모달 열기
      </button>
      <p className='mt-2 text-[11px] text-gray-500'>
        열고 나서 Tab / Shift+Tab으로 모달 안만 순환하는지 확인. ESC로 닫으면
        포커스가 원래 버튼으로 복귀.
      </p>

      {open && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'
          onClick={() => setOpen(false)}
        >
          <div
            ref={dialogRef}
            role='dialog'
            aria-modal='true'
            aria-labelledby={titleId}
            onClick={(e) => e.stopPropagation()}
            className='w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl'
          >
            <h3 id={titleId} className='mb-2 text-lg font-extrabold'>
              🔐 접근 가능한 모달
            </h3>
            <p className='mb-4 text-sm text-gray-600'>
              Tab으로 버튼 사이 이동. Shift+Tab으로 거꾸로. ESC 또는 닫기
              버튼으로 종료.
            </p>
            <div className='flex gap-2'>
              <button
                type='button'
                onClick={() => setOpen(false)}
                className='rounded-full bg-[#4576fc] px-4 py-2 text-sm font-bold text-white hover:bg-[#2355de]'
              >
                확인
              </button>
              <button
                type='button'
                onClick={() => setOpen(false)}
                className='rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-bold text-gray-700 hover:border-gray-400'
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function LabelInputDemo() {
  const nameId = useId()
  const emailId = useId()
  const helpId = useId()

  return (
    <div className='rounded-xl bg-white p-4 ring-1 ring-gray-200'>
      <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
        🪪 useId로 label-input 연결
      </div>
      <div className='grid gap-3 sm:grid-cols-2'>
        <div>
          <label htmlFor={nameId} className='mb-1 block text-xs font-semibold'>
            이름
          </label>
          <input
            id={nameId}
            type='text'
            className='w-full rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-sm focus:border-[#4576fc] focus:outline-none'
          />
        </div>
        <div>
          <label htmlFor={emailId} className='mb-1 block text-xs font-semibold'>
            이메일
          </label>
          <input
            id={emailId}
            type='email'
            aria-describedby={helpId}
            className='w-full rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-sm focus:border-[#4576fc] focus:outline-none'
          />
          <p id={helpId} className='mt-1 text-[11px] text-gray-500'>
            비밀번호 재설정 용도로만 사용됩니다.
          </p>
        </div>
      </div>
      <p className='mt-3 text-[11px] text-gray-500'>
        <code>useId</code>로 서버/클라 공통 unique id 생성 → label-input
        안전하게 연결. <code>aria-describedby</code>로 도움말도 묶음.
      </p>
    </div>
  )
}

function FocusVisibleDemo() {
  return (
    <div className='rounded-xl bg-white p-4 ring-1 ring-gray-200'>
      <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
        ⌨️ focus-visible — 키보드만 ring
      </div>
      <div className='flex flex-wrap gap-3'>
        <button
          type='button'
          className={cn(
            'rounded-full bg-[#4576fc] px-4 py-2 text-sm font-bold text-white transition',
            'focus-visible:ring-4 focus-visible:ring-[#4576fc]/40 focus-visible:outline-none'
          )}
        >
          기본 버튼
        </button>
        <button
          type='button'
          className={cn(
            'rounded-full border-2 border-gray-300 bg-white px-4 py-2 text-sm font-bold text-gray-700 transition',
            'focus-visible:border-[#4576fc] focus-visible:ring-2 focus-visible:ring-[#4576fc]/40 focus-visible:outline-none'
          )}
        >
          보조 버튼
        </button>
      </div>
      <p className='mt-3 text-[11px] text-gray-500'>
        <b>Tab</b>으로 포커스해봐 (ring 강조). 마우스 클릭에는 ring이 뜨지 않아
        — 키보드 사용자만 보이게 하는 <code>focus-visible</code>의 역할.
      </p>
    </div>
  )
}

export default function AccessibilityLab() {
  return (
    <div className='rounded-2xl border-2 border-gray-200 bg-gray-50/70 p-5'>
      <div className='mb-3 rounded-lg bg-white p-4 text-sm text-gray-700 ring-1 ring-gray-100'>
        <p>
          🎯 <b>관찰 포인트</b>: 4개 놀이기구 모두 키보드·스크린 리더 기반
          접근성 기술이야. 마우스만 쓰지 말고{' '}
          <b>Tab / Shift+Tab / Enter / ESC</b>로도 움직여봐.
        </p>
      </div>

      <div className='mb-4 grid gap-3 md:grid-cols-2'>
        <AriaLiveDemo />
        <FocusTrapModal />
        <LabelInputDemo />
        <FocusVisibleDemo />
      </div>

      <BeforeAfter
        before={{
          label: '❌ div 남용 · label 없음',
          code: `<div onClick={submit}>저장</div>

<div>
  <div>이메일</div>
  <input type='email' />
</div>

<div style={{ opacity: 0.5 }}>처리중...</div>`,
          takeaway:
            '키보드로 포커스·활성 불가, 스크린 리더는 label 못 읽음, 상태 변화 감지 못함',
        }}
        after={{
          label: '✅ semantic + aria',
          code: `<button onClick={submit}>저장</button>

<label>
  이메일
  <input type='email' />
</label>

<div aria-live='polite' aria-busy={loading}>
  {loading ? '처리 중...' : result}
</div>`,
          takeaway:
            '기본 HTML의 접근성이 살아남, 동적 상태 변화도 보조기기에 전달',
        }}
      />

      <div className='mt-4 rounded-xl border-2 border-gray-100 bg-white p-4 text-sm'>
        <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
          💭 현실 체크리스트
        </div>
        <ul className='space-y-1 text-gray-700'>
          <li>
            ⌨️ 모든 인터랙션이 <b>키보드만으로</b> 가능해야 함
          </li>
          <li>
            🏷️ 이미지는 <code>alt</code>, 버튼은 <code>aria-label</code>{' '}
            (아이콘만 있을 때)
          </li>
          <li>🎨 색 대비 WCAG AA 기준 (4.5:1 이상)</li>
          <li>
            📣 동적 변화는 <code>aria-live</code> 또는 focus 이동으로 알림
          </li>
          <li>🧪 Lighthouse · axe-core · NVDA/VoiceOver로 실제 테스트</li>
        </ul>
      </div>
    </div>
  )
}
