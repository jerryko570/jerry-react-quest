import CallbackTrap from './CallbackTrap'
import CodeBlock from '@/components/stages/CodeBlock'
import StageFlow from '@/components/stages/StageFlow'

export default function UseCallbackPlayground() {
  return (
    <StageFlow>
      <StageFlow.Empathy>
        🪞 &quot;memo로 감쌌는데 자식이 계속 리렌더돼&quot; — useCallback이
        짝으로 있어야 memo가 일해.
      </StageFlow.Empathy>

      <StageFlow.Play subtitle='🎲 부모 리렌더 버튼 연타. 좌우 자식 카운트 차이를 봐'>
        <CallbackTrap />
      </StageFlow.Play>

      <StageFlow.Observe
        title='🤔 왜 한쪽 자식만 숫자가 올라가지?'
        subtitle='둘 다 memo로 감쌌는데'
      >
        <p>
          🟢 Fresh 콜백은 <b>매 렌더마다 새 함수</b>라 memo가 &quot;props
          다름&quot; 판정 → 리렌더.
        </p>
        <p className='mt-3'>
          🟢 <code>useCallback</code>으로 감싸면 <b>같은 함수 참조</b>라 memo가
          &quot;같음&quot; 판정 → 리렌더 스킵.
        </p>
      </StageFlow.Observe>

      <StageFlow.Next subtitle='코드 + 정리 + 다음'>
        <p className='mb-4'>
          ✔️ <code>React.memo</code>된 자식에 함수 넘길 땐{' '}
          <code>useCallback</code>
          짝. 그냥 onClick엔 필요 없음.
        </p>
        <CodeBlock
          filename='useCallback'
          code={`function Parent() {
  const handleClick = useCallback(
    () => console.log('click'),
    []    // deps 비면 마운트 이후 같은 참조
  )
  return <MemoChild onClick={handleClick} />
}`}
        />
        <p className='mt-5 text-gray-700'>
          다음은 자식을 진짜로 감싸는 <b>React.memo</b>의 속사정 🚀
        </p>
      </StageFlow.Next>
    </StageFlow>
  )
}
