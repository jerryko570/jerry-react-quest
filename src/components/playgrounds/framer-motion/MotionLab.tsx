'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import BeforeAfter from '@/components/stages/BeforeAfter'

function AnimatePresenceDemo() {
  const [show, setShow] = useState(true)

  return (
    <div className='rounded-xl bg-white p-4 ring-1 ring-gray-200'>
      <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
        🎭 AnimatePresence (mount/unmount)
      </div>
      <button
        type='button'
        onClick={() => setShow((s) => !s)}
        className='mb-3 rounded-full bg-[#4576fc] px-4 py-2 text-sm font-bold text-white hover:bg-[#2355de]'
      >
        {show ? '🙈 숨기기' : '👀 보이기'}
      </button>
      <div className='h-24 rounded-lg bg-gray-50 p-2'>
        <div
          className={cn(
            'flex h-full items-center justify-center rounded-lg bg-linear-to-br from-[#4576fc] to-[#5f8aff] font-bold text-white transition-all duration-500',
            show
              ? 'translate-y-0 scale-100 opacity-100'
              : '-translate-y-4 scale-95 opacity-0'
          )}
        >
          🎉 Hello Motion
        </div>
      </div>
      <p className='mt-2 text-[11px] text-gray-500'>
        여기선 CSS transition으로 흉내 — 실전 Framer Motion의{' '}
        <code>AnimatePresence</code>는 언마운트 전에 exit 애니메이션을 마저
        끝내고 사라져. (DOM에서 바로 제거되지 않음)
      </p>
    </div>
  )
}

function DragDemo() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true)
    setOffset({ x: e.clientX - pos.x, y: e.clientY - pos.y })
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return
    const nx = Math.max(0, Math.min(200, e.clientX - offset.x))
    const ny = Math.max(0, Math.min(80, e.clientY - offset.y))
    setPos({ x: nx, y: ny })
  }
  const onMouseUp = () => setDragging(false)

  const spring = () => setPos({ x: 0, y: 0 })

  return (
    <div className='rounded-xl bg-white p-4 ring-1 ring-gray-200'>
      <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
        🖱️ Drag + Spring 복귀
      </div>
      <div
        className='relative mb-3 h-32 rounded-lg bg-gray-50 select-none'
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div
          onMouseDown={onMouseDown}
          className={cn(
            'absolute flex h-16 w-16 cursor-grab items-center justify-center rounded-xl bg-[#4576fc] font-bold text-white shadow-lg active:cursor-grabbing',
            !dragging &&
              'transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]'
          )}
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        >
          🪀
        </div>
      </div>
      <button
        type='button'
        onClick={spring}
        className='rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-bold text-gray-700 hover:border-[#4576fc]'
      >
        ↩️ spring으로 원위치
      </button>
      <p className='mt-2 text-[11px] text-gray-500'>
        드래그해서 움직이고, 놓으면 클릭으로 spring 복귀. 실전에선{' '}
        <code>motion.div drag dragConstraints</code>로 한 줄.
      </p>
    </div>
  )
}

function VariantsDemo() {
  const [state, setState] = useState<'idle' | 'hover' | 'tap'>('idle')

  return (
    <div className='rounded-xl bg-white p-4 ring-1 ring-gray-200'>
      <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
        🎨 Variants — 상태별 스타일 선언
      </div>
      <div className='flex h-24 items-center justify-center rounded-lg bg-gray-50'>
        <button
          type='button'
          onMouseEnter={() => setState('hover')}
          onMouseLeave={() => setState('idle')}
          onMouseDown={() => setState('tap')}
          onMouseUp={() => setState('hover')}
          className={cn(
            'rounded-xl bg-[#4576fc] px-6 py-3 font-bold text-white transition-all duration-200 ease-out',
            state === 'hover' && 'scale-110 shadow-lg',
            state === 'tap' && 'scale-95'
          )}
        >
          👆 눌러봐
        </button>
      </div>
      <div className='mt-2 font-mono text-[11px] text-gray-500'>
        state: <b>{state}</b>
      </div>
      <p className='mt-2 text-[11px] text-gray-500'>
        실전 <code>variants</code> 객체로 <code>{`idle · hover · tap`}</code> 각
        상태의 <code>scale · y · boxShadow</code> 값을 선언하고 Framer Motion이
        보간해줘.
      </p>
    </div>
  )
}

function ScrollDemo() {
  const [scrolled, setScrolled] = useState(0)

  return (
    <div className='rounded-xl bg-white p-4 ring-1 ring-gray-200'>
      <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
        📜 스크롤 기반 애니메이션
      </div>
      <div
        onScroll={(e) => {
          const el = e.currentTarget
          const ratio = el.scrollTop / (el.scrollHeight - el.clientHeight)
          setScrolled(Math.max(0, Math.min(1, ratio)))
        }}
        className='h-32 overflow-y-auto rounded-lg bg-gray-50 p-3'
      >
        <div className='space-y-2'>
          {Array.from({ length: 15 }, (_, i) => (
            <div
              key={i}
              className='rounded bg-white px-3 py-2 text-xs ring-1 ring-gray-100'
            >
              문단 {i + 1}
            </div>
          ))}
        </div>
      </div>
      <div className='mt-3 h-2 overflow-hidden rounded-full bg-gray-200'>
        <div
          className='h-full rounded-full bg-[#4576fc] transition-[width] duration-100'
          style={{ width: `${scrolled * 100}%` }}
        />
      </div>
      <p className='mt-2 text-[11px] text-gray-500'>
        스크롤 진행률 {(scrolled * 100).toFixed(0)}% — 실전에선{' '}
        <code>useScroll · useTransform</code>으로 scrollY를 다른 값으로 매핑
        (parallax 등).
      </p>
    </div>
  )
}

export default function MotionLab() {
  return (
    <div className='rounded-2xl border-2 border-gray-200 bg-gray-50/70 p-5'>
      <div className='mb-3 rounded-lg bg-white p-4 text-sm text-gray-700 ring-1 ring-gray-100'>
        <p>
          🎯 <b>관찰 포인트</b>: 4가지 애니메이션 패턴을 <b>CSS 기반</b>으로
          흉내냈어. Framer Motion이 공식적으로 같은 결과를 어떻게 달성하는지는
          각 데모 아래의 설명과 BeforeAfter 코드에서 확인.
        </p>
      </div>

      <div className='mb-4 grid gap-3 md:grid-cols-2'>
        <AnimatePresenceDemo />
        <DragDemo />
        <VariantsDemo />
        <ScrollDemo />
      </div>

      <BeforeAfter
        before={{
          label: '❌ 직접 CSS transition · useState · mouse 이벤트',
          code: `// 드래그: mousedown/move/up 이벤트 전부 수동
// 변수 계산·constraint·spring 복귀도 수동

const [pos, setPos] = useState({ x: 0, y: 0 })
const onMouseDown = (e) => { ... }
const onMouseMove = (e) => { ... }
const onMouseUp = () => { ... }

// transition도 CSS로 한 번에 제어 — 끝나기 전 방해받으면 뚝 끊김`,
          takeaway:
            '기본 동작은 되지만, 스프링·spring back·constraint 같은 물리 표현은 수작업',
        }}
        after={{
          label: '✅ Framer Motion',
          code: `import { motion } from 'motion/react'

// 드래그 + 제약 + spring 복귀 — 한 줄씩
<motion.div
  drag
  dragConstraints={{ left: 0, right: 200, top: 0, bottom: 80 }}
  dragSnapToOrigin   // 놓으면 원위치로
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
/>

// mount/unmount 애니메이션
<AnimatePresence>
  {show && (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    />
  )}
</AnimatePresence>`,
          takeaway:
            'drag · hover · tap · mount/unmount · scroll 모두 선언형 한 줄',
        }}
      />

      <div className='mt-4 rounded-xl border-2 border-gray-100 bg-white p-4 text-sm'>
        <div className='mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase'>
          💭 Framer Motion (motion) vs CSS
        </div>
        <ul className='space-y-1 text-gray-700'>
          <li>
            🟢 <b>간단한 전환</b>은 Tailwind <code>transition-*</code>로 충분.
            번들 추가 X.
          </li>
          <li>
            🟠 <b>spring · gesture · layout animation</b>이 필요하면 Framer
            Motion. 특히 Shared Layout Animation은 대체 불가.
          </li>
          <li>
            🔴 이제 이름은 <b>motion/react</b> (framer-motion v12부터 리브랜딩).
            API는 대부분 호환.
          </li>
        </ul>
      </div>
    </div>
  )
}
