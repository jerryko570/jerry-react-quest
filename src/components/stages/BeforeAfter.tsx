import CodeBlock from './CodeBlock'

type Pair = {
  label: string
  code: string
  takeaway: string
}

type Props = {
  before: Pair
  after: Pair
}

export default function BeforeAfter({ before, after }: Props) {
  return (
    <div className='grid gap-4 md:grid-cols-2'>
      <Column label='🚫 이럴 때 문제' tone='red' pair={before} />
      <Column label='✅ 이렇게 해결' tone='green' pair={after} />
    </div>
  )
}

function Column({
  label,
  tone,
  pair,
}: {
  label: string
  tone: 'red' | 'green'
  pair: Pair
}) {
  const badgeClass =
    tone === 'red' ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'
  const takeawayClass =
    tone === 'red' ? 'bg-red-50 text-red-800' : 'bg-emerald-50 text-emerald-800'

  return (
    <div>
      <div
        className={`mb-2 inline-block rounded-full px-3 py-1 text-xs font-bold ${badgeClass}`}
      >
        {label}
      </div>
      <CodeBlock filename={pair.label} code={pair.code} />
      <p
        className={`mt-2 rounded-lg p-2.5 text-xs font-medium ${takeawayClass}`}
      >
        {pair.takeaway}
      </p>
    </div>
  )
}
