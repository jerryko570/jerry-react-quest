import BatchUpdate from './BatchUpdate'
import StaleClosure from './StaleClosure'
import CodeBlock from '@/components/stages/CodeBlock'
import StageFlow from '@/components/stages/StageFlow'

export default function UseStatePlayground() {
  return (
    <StageFlow>
      <StageFlow.Empathy>
        😵 &quot;setState 3번 연달아 했는데 왜 +3이 아니고 +1이지?&quot; — 이
        함정, 한 번씩 다 빠져봤거든.
      </StageFlow.Empathy>

      <StageFlow.Play subtitle='빨간 버튼(❌ 값으로 +3) 먼저 눌러봐'>
        <BatchUpdate />
      </StageFlow.Play>

      <StageFlow.Observe
        title='🤔 왜 값 버튼은 +1만 되지?'
        subtitle='3번 호출했는데'
      >
        <p>
          🟢 <code>setCount(count + 1)</code>은 버튼 누른 순간의{' '}
          <b>옛날 count</b>에 +1하는 계산이야.
        </p>
        <p className='mt-2'>
          🟢 3번 다 같은 옛날 값에 +1하니까 결과도 +1. 리액트가 같은 렌더 안
          업데이트를 묶어서(batching) 한 번만 그려.
        </p>
      </StageFlow.Observe>

      <StageFlow.Deepen
        title='⏳ 이번엔 3초 뒤에 보는 타이머 실험'
        subtitle='기다리는 동안 count를 바꿔봐'
      >
        <StaleClosure />
      </StageFlow.Deepen>

      <StageFlow.Next subtitle='코드 + 정리 + 다음'>
        <p className='mb-3'>
          ✔️ <b>직전 값에 의존할 땐 함수형</b>{' '}
          <code>setCount(c =&gt; c + 1)</code>.
        </p>
        <div className='grid gap-3 md:grid-cols-2'>
          <div>
            <div className='mb-2 inline-block rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-bold text-red-800'>
              🚫 값 기반
            </div>
            <CodeBlock
              filename='❌ 옛 count에 고정'
              code={`setCount(count + 1)  // 3번 호출해도 +1`}
            />
          </div>
          <div>
            <div className='mb-2 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800'>
              ✅ 함수형
            </div>
            <CodeBlock
              filename='✅ 직전 값에 +1'
              code={`setCount(c => c + 1)  // 3번 호출하면 +3`}
            />
          </div>
        </div>
        <p className='mt-4 text-gray-700'>
          다음은 setState와 짝꿍인 <b>useEffect</b>. 언제·어떻게 실행되는지
          알아보자 🚀
        </p>
      </StageFlow.Next>
    </StageFlow>
  )
}
