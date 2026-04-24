import AccessibilityLab from './AccessibilityLab'
import CodeBlock from '@/components/stages/CodeBlock'
import StageFlow from '@/components/stages/StageFlow'

export default function A11yPlayground() {
  return (
    <StageFlow>
      <StageFlow.Empathy>
        ♿ &quot;키보드만 써봤는데 안 되는 거 투성이&quot; — 접근성은 나중으로
        미루면 더 큰 빚.
      </StageFlow.Empathy>

      <StageFlow.Play subtitle='마우스 없이 Tab·Enter·ESC로만'>
        <AccessibilityLab />
      </StageFlow.Play>

      <StageFlow.Observe title='🤔 어디가 잘 되고 어디가 막히나?'>
        <p>🟢 ARIA live region = 동적 변화를 스크린 리더가 읽어줌.</p>
        <p className='mt-3'>
          🟢 focus trap · useId · focus-visible = 키보드 사용자 전용 세심함.
        </p>
      </StageFlow.Observe>

      <StageFlow.Next subtitle='코드 + 정리 + 다음'>
        <p className='mb-4'>
          ✔️ 기본 HTML부터 제대로. ARIA는 <b>네이티브로 표현 불가능한 것</b>
          에만.
        </p>
        <CodeBlock
          filename='접근성 기본기'
          code={`<button onClick={submit}>저장</button>   {/* div 대신 button */}

<label htmlFor={id}>이메일</label>
<input id={id} aria-describedby={helpId} />
<p id={helpId}>비밀번호 재설정 용도</p>

<div aria-live='polite' aria-busy={loading}>
  {loading ? '처리 중...' : result}
</div>`}
        />
        <p className='mt-5 text-gray-700'>
          다음은 <b>테스트</b>로 리팩토링 안전망 🚀
        </p>
      </StageFlow.Next>
    </StageFlow>
  )
}
