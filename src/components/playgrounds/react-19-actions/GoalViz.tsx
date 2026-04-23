import { ReactNode } from 'react'

export default function React19ActionsGoalViz() {
  return (
    <section>
      <header className='mb-4'>
        <h3 className='text-lg font-extrabold'>🎯 학습 목표 — 풀어서 보기</h3>
        <p className='text-sm text-gray-500'>
          폼과 뮤테이션의 보일러플레이트가 3개 훅으로 녹아든다.
        </p>
      </header>

      <div className='grid gap-4 md:grid-cols-2'>
        <GoalCard
          index='1'
          emoji='🕰️'
          title='useActionState'
          hook='action의 결과와 pending을 한 훅으로'
        >
          <p>
            비동기 action 함수를 감싸면{' '}
            <b>반환값(상태) · pending · invoke 함수</b> 세 가지를 돌려줘. form의{' '}
            <code>action</code> prop에 직접 연결 가능.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`const [state, action, isPending] = useActionState(
  async (prev, formData) => {
    const result = await save(formData)
    return result   // 다음 prev가 됨
  },
  null              // 초기 state
)

<form action={action}>...</form>`}
          </pre>
        </GoalCard>

        <GoalCard
          index='2'
          emoji='📋'
          title='useFormStatus'
          hook='form 하위 컴포넌트에서 pending 관찰'
        >
          <p>
            useActionState와 짝이 되는 훅. 부모 form이 대기 중이면 자식
            SubmitButton이 자동으로 disable 될 수 있어.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`function Submit() {
  const { pending } = useFormStatus()
  return (
    <button disabled={pending}>
      {pending ? '저장 중...' : '저장'}
    </button>
  )
}`}
          </pre>
        </GoalCard>

        <GoalCard
          index='3'
          emoji='⚡'
          title='useOptimistic'
          hook='UI를 미리 바꾸고 실패하면 롤백'
        >
          <p>
            서버 응답이 오기 전에 UI를 &quot;응답이 성공했다 치고&quot; 미리
            바꿔. 실패하면 React가 원본으로 되돌려.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`const [optimistic, add] = useOptimistic(
  real,
  (current, incoming) => [...current, incoming]
)

// 사용
startTransition(() => {
  add(newItem)     // UI 즉시 반영
  serverAction()   // 뒤에서 서버 요청
})`}
          </pre>
        </GoalCard>

        <GoalCard
          index='4'
          emoji='🔗'
          title='Server Actions와의 연결'
          hook='폼 전송이 그대로 서버 함수 호출'
        >
          <p>
            Next.js App Router에서는 <code>&quot;use server&quot;</code>{' '}
            지시어로 서버 함수를 만들고 form의 <code>action</code>에 연결.
            클라이언트에서 JS 번들링 안 되고 서버에서 바로 실행.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`// actions.ts
'use server'
export async function addPost(formData: FormData) {
  await db.insert({ title: formData.get('title') })
  revalidatePath('/posts')
}

// page.tsx
<form action={addPost}>
  <input name='title' />
  <button>추가</button>
</form>`}
          </pre>
          <p className='mt-2 text-[12px] text-gray-500'>
            JS 없이도 form이 동작하고 (progressive enhancement), JS 있으면
            useOptimistic과 조합해 빠른 UX.
          </p>
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
