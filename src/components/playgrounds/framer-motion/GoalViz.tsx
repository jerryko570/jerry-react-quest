import { ReactNode } from 'react'

export default function FramerMotionGoalViz() {
  return (
    <section>
      <header className='mb-4'>
        <h3 className='text-lg font-extrabold'>🎯 학습 목표 — 풀어서 보기</h3>
        <p className='text-sm text-gray-500'>
          움직임으로 UI에 생명을 불어넣자.
        </p>
      </header>
      <div className='grid gap-4 md:grid-cols-2'>
        <GoalCard
          index='1'
          emoji='🎭'
          title='AnimatePresence'
          hook='mount/unmount 애니메이션'
        >
          <p>
            DOM에서 언마운트되기 전에 <code>exit</code> 애니메이션을 마저 실행.
            모달 · 토스트 · 카드 사라지는 장면에 필수.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`<AnimatePresence>
  {show && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>`}
          </pre>
        </GoalCard>
        <GoalCard
          index='2'
          emoji='🧲'
          title='Shared Layout Animations'
          hook='layoutId로 공유 요소가 이동'
        >
          <p>
            두 페이지/뷰에서 같은 <code>layoutId</code>를 가진 요소가 있으면
            자동 연결. 썸네일 → 상세 페이지에서 이미지가 자연스럽게 커지는 hero
            transition.
          </p>
        </GoalCard>
        <GoalCard
          index='3'
          emoji='📜'
          title='Scroll 기반 애니메이션'
          hook='useScroll · useTransform'
        >
          <p>
            스크롤 진행도를 값으로 받아 다른 속성에 매핑 (parallax, progress
            bar, fade on scroll). 성능도 좋음.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`const { scrollYProgress } = useScroll()
const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5])

<motion.div style={{ scale }} />`}
          </pre>
        </GoalCard>
        <GoalCard
          index='4'
          emoji='🖱️'
          title='Gesture — drag · hover · tap'
          hook='선언형 인터랙션'
        >
          <p>
            <code>whileHover</code>, <code>whileTap</code>, <code>drag</code>,{' '}
            <code>dragConstraints</code>, <code>dragSnapToOrigin</code>으로
            gesture 상태별 스타일을 선언. 이벤트 핸들러 줄줄이 쓸 필요 없음.
          </p>
        </GoalCard>
        <GoalCard
          index='5'
          emoji='🎨'
          title='Variants 패턴'
          hook='"상태 이름 → 스타일" 매핑'
        >
          <p>
            애니메이션이 복잡해지면 variants 객체로 분리. 자식도 같은 이름의
            variant를 가지면 부모에서 한 번에 제어 가능.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

<motion.div variants={variants} animate={open ? 'visible' : 'hidden'} />`}
          </pre>
        </GoalCard>
        <GoalCard
          index='6'
          emoji='🎯'
          title='언제 Framer Motion을 쓰고 언제 안 쓰는가'
          hook='가벼운 건 Tailwind, 무거운 건 motion'
        >
          <p>
            간단한 hover·focus·transition은 Tailwind로 번들 무게 없이 해결.
            Framer Motion은:
          </p>
          <ul className='mt-2 space-y-1 text-[13px]'>
            <li>🎯 spring · ease가 아닌 물리 필요 시</li>
            <li>🎯 mount/unmount가 얽힌 리스트 애니메이션</li>
            <li>🎯 drag · gesture · 페이지 전환</li>
            <li>🎯 shared layout transition</li>
          </ul>
        </GoalCard>
      </div>
    </section>
  )
}

function GoalCard({
  index,
  emoji,
  title,
  hook,
  children,
}: {
  index: string
  emoji: string
  title: string
  hook: string
  children: ReactNode
}) {
  return (
    <article className='rounded-2xl border-2 border-gray-100 bg-white p-5'>
      <header className='mb-3 flex items-start gap-3'>
        <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-900 font-mono text-xs font-bold text-white'>
          {index}
        </span>
        <div>
          <h4 className='font-extrabold'>
            <span className='mr-1'>{emoji}</span>
            {title}
          </h4>
          <p className='mt-0.5 text-xs text-[#ff5e48]'>💡 {hook}</p>
        </div>
      </header>
      <div className='space-y-2 text-sm text-gray-700'>{children}</div>
    </article>
  )
}
