import BasicPlay from './BasicPlay'
import DeepenPlay from './DeepenPlay'
import CodeBlock from '@/components/stages/CodeBlock'
import StageFlow from '@/components/stages/StageFlow'

export default function RenderingPlayground() {
  return (
    <StageFlow>
      <StageFlow.Why subtitle='3줄 요약'>
        <ul className='space-y-1.5'>
          <li>
            🖼️ React는 state가 바뀌면 화면을 <b>다시 그려</b> (리렌더).
          </li>
          <li>
            🔁 한 번 바뀌면 어디까지 다시 그려지는지{' '}
            <b>감이 없으면 최적화가 불가능</b>해.
          </li>
          <li>
            🎯 이걸 눈으로 익히면 <b>useMemo · useCallback · React.memo</b>가 왜
            필요한지 자연스럽게 이해돼.
          </li>
        </ul>
      </StageFlow.Why>

      <StageFlow.Play subtitle='지금 바로 눌러보고, 설명은 그 다음'>
        <BasicPlay />
      </StageFlow.Play>

      <StageFlow.Explain subtitle='3줄 해설'>
        <ul className='space-y-1.5'>
          <li>
            ⚡ <b>부모가 리렌더되면 자식도 함께 리렌더</b>돼. 자식 props가 안
            바뀌었어도 그래.
          </li>
          <li>
            🧬 자식 함수가 다시 실행돼서 카운트가 올라가는 것 — 이게{' '}
            <b>React의 기본 동작</b>이야.
          </li>
          <li>
            🐌 대부분 빨라서 문제 없음. 근데 자식이 무겁거나 많으면 체감이
            시작돼.
          </li>
        </ul>
      </StageFlow.Explain>

      <StageFlow.Deepen
        title='🔬 자식에게 방패를 씌워보자 — React.memo'
        subtitle='토글 껐다 켰다 하며 카운트 비교'
      >
        <DeepenPlay />
      </StageFlow.Deepen>

      <StageFlow.Code subtitle='방패 없이 vs 있이'>
        <div className='grid gap-3 md:grid-cols-2'>
          <div>
            <div className='mb-2 inline-block rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-bold text-red-800'>
              🚫 방패 없음 — 부모 따라 리렌더
            </div>
            <CodeBlock
              filename='Child.tsx'
              code={`function Child({ label }: { label: string }) {
  return <div>{label}</div>
}`}
            />
          </div>
          <div>
            <div className='mb-2 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800'>
              ✅ 방패 있음 — props 같으면 스킵
            </div>
            <CodeBlock
              filename='Child.tsx'
              code={`const Child = memo(function Child({ label }) {
  return <div>{label}</div>
})`}
            />
          </div>
        </div>
        <p className='mt-3 rounded-lg bg-gray-50 p-3 text-[12px] text-gray-600'>
          💡 <b>참고</b>: 가벼운 자식엔 방패가 오히려 낭비야. 진짜 비싼 자식에만
          씌우는 게 요령.
        </p>
      </StageFlow.Code>

      <StageFlow.Wrap>
        <ul className='space-y-1.5'>
          <li>
            ✔️ 리렌더는 <b>부모 → 자식으로 전염</b>된다.
          </li>
          <li>
            ✔️ 기본은 빠름. 문제 생길 때만 <b>React.memo</b>로 자식을 지켜줘.
          </li>
          <li>
            ✔️ 다음 스테이지에선 메모이제이션 3종 (useMemo · useCallback ·
            memo)을 본격적으로 만져볼 거야.
          </li>
        </ul>
        <p className='mt-3 rounded-lg bg-white p-3 text-xs ring-1 ring-gray-200'>
          👉 위 세 줄이 자연스럽게 이해됐다면 <b>&quot;✅ 정복했어!&quot;</b>{' '}
          버튼을 눌러도 좋아. 아직 얼떨떨하면{' '}
          <b>Play/Deepen 버튼을 한 번씩 더</b> 눌러봐.
        </p>
      </StageFlow.Wrap>
    </StageFlow>
  )
}
