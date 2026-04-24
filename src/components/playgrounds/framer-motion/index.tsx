import MotionLab from './MotionLab'
import CodeBlock from '@/components/stages/CodeBlock'
import StageFlow from '@/components/stages/StageFlow'

export default function FramerMotionPlayground() {
  return (
    <StageFlow>
      <StageFlow.Empathy>
        🎭 &quot;드래그 한 줄로 하고 싶은데 mousedown·move·up 다 짜야 해?&quot;
        — Motion은 한 줄.
      </StageFlow.Empathy>

      <StageFlow.Play subtitle='4가지 패턴: Fade · Drag · Variants · Scroll'>
        <MotionLab />
      </StageFlow.Play>

      <StageFlow.Observe title='🤔 CSS로도 되는데 왜 Motion?'>
        <p>🟢 간단한 전환은 Tailwind로 충분. 번들 무게 없음.</p>
        <p className='mt-3'>
          🟢 spring · layout animation · drag/gesture · mount/unmount 연출이
          필요하면 Motion.
        </p>
      </StageFlow.Observe>

      <StageFlow.Next subtitle='코드 + 정리 + 다음'>
        <p className='mb-4'>
          ✔️ Framer Motion v12부터 패키지 이름 <b>motion/react</b>로 리브랜드.
        </p>
        <CodeBlock
          filename='선언형 gesture'
          code={`import { motion, AnimatePresence } from 'motion/react'

<motion.div
  drag
  dragConstraints={{ left: 0, right: 200 }}
  dragSnapToOrigin
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 300 }}
/>

<AnimatePresence>
  {show && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />}
</AnimatePresence>`}
        />
        <p className='mt-5 text-gray-700'>
          다음은 프로덕션 <b>에러 아키텍처</b> 🚀
        </p>
      </StageFlow.Next>
    </StageFlow>
  )
}
