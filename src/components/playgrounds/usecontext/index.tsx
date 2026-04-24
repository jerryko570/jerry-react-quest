import ThemeTree from './ThemeTree'
import CodeBlock from '@/components/stages/CodeBlock'
import StageFlow from '@/components/stages/StageFlow'

export default function UseContextPlayground() {
  return (
    <StageFlow>
      <StageFlow.Empathy>
        🌐 &quot;props 3단 내려보내기 귀찮아&quot; — Context는 주입 통로야.
      </StageFlow.Empathy>

      <StageFlow.Play subtitle='테마 토글 + value useMemo 토글 둘 다'>
        <ThemeTree />
      </StageFlow.Play>

      <StageFlow.Observe title='🤔 useMemo 끄면 비구독자까지 불안정'>
        <p>🟢 Provider value가 매 렌더 새 객체면 구독자 전원이 리렌더.</p>
        <p className='mt-3'>
          🟢 <code>useMemo</code>로 고정하면 진짜 바뀔 때만 반응.
        </p>
      </StageFlow.Observe>

      <StageFlow.Next subtitle='코드 + 정리 + 다음'>
        <p className='mb-4'>
          ✔️ Context는 <b>드물게 바뀌는 전역값</b>에만. 자주 바뀌면 Zustand.
        </p>
        <CodeBlock
          filename='안정적인 Provider'
          code={`const value = useMemo(() => ({ theme, toggle }), [theme, toggle])
return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>`}
        />
        <p className='mt-5 text-gray-700'>
          다음은 <b>useReducer</b> 🚀
        </p>
      </StageFlow.Next>
    </StageFlow>
  )
}
