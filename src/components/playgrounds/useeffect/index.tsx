import CleanupLab from './CleanupLab'
import RaceCondition from './RaceCondition'
import CodeBlock from '@/components/stages/CodeBlock'
import StageFlow from '@/components/stages/StageFlow'

export default function UseEffectPlayground() {
  return (
    <StageFlow>
      <StageFlow.Empathy>
        👻 &quot;컴포넌트는 사라졌는데 타이머가 뒤에서 계속 돌고 있다고?&quot; —
        이게 메모리 누수 공포야.
      </StageFlow.Empathy>

      <StageFlow.Play subtitle='cleanup 끄고 Ticker를 언마운트해봐'>
        <CleanupLab />
      </StageFlow.Play>

      <StageFlow.Observe
        title='🤔 cleanup 없으면 타이머가 왜 안 멈춰?'
        subtitle='컴포넌트는 분명 사라졌는데'
      >
        <p>
          🟢 <code>useEffect</code>가 외부 자원(타이머·구독 등)을 열어둔 채
          떠나면, 리액트는 자동으로 닫아주지 않아.
        </p>
        <p className='mt-3'>
          🟢 return 함수로 &quot;정리 약속&quot; (= cleanup)을 돌려줘야 언마운트
          직전에 실행돼서 자원이 닫혀.
        </p>
      </StageFlow.Observe>

      <StageFlow.Deepen
        title='🏁 이번엔 네트워크 race condition 실험'
        subtitle='검색창 빠르게 타이핑해봐'
      >
        <RaceCondition />
      </StageFlow.Deepen>

      <StageFlow.Next subtitle='코드 + 정리 + 다음'>
        <p className='mb-4'>
          ✔️ effect가 뭘 열었으면 <b>return으로 닫아라</b>. 비동기는{' '}
          <code>AbortController</code> + cancelled 플래그로 가드.
        </p>
        <div className='grid gap-4 md:grid-cols-2'>
          <div>
            <div className='mb-2 inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-800'>
              🚫 cleanup 없이
            </div>
            <CodeBlock
              filename='메모리 누수'
              code={`useEffect(() => {
  const id = setInterval(tick, 1000)
  // 닫는 약속 없음 → 계속 돈다
}, [])`}
            />
          </div>
          <div>
            <div className='mb-2 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800'>
              ✅ cleanup 반환
            </div>
            <CodeBlock
              filename='깨끗한 정리'
              code={`useEffect(() => {
  const id = setInterval(tick, 1000)
  return () => clearInterval(id)
}, [])`}
            />
          </div>
        </div>
        <p className='mt-5 text-gray-700'>
          다음은 useState·useEffect를 조립해서 내 훅 만드는 <b>커스텀 훅</b> 🚀
        </p>
      </StageFlow.Next>
    </StageFlow>
  )
}
