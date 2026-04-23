import ChaosCalm from './ChaosCalm'
import GoalViz from './GoalViz'
import ObjectReferenceTrap from './ObjectReferenceTrap'
import PlaygroundSection from '@/components/stages/PlaygroundSection'

export default function UseMemoPlayground() {
  return (
    <div className='flex flex-col gap-12'>
      <PlayFirstBanner />
      <Glossary />
      <GoalViz />

      <div className='border-t border-gray-200' />

      <PlaygroundSection
        index='A'
        emoji='🎢'
        title='Chaos Mode vs Calm Mode'
        description='40개 카드가 매 렌더마다 무거운 계산을 돌린다. useMemo로 감싸면 seed가 그대로일 때 건너뛴다. 카운터 버튼을 눌러 차이를 몸으로 느껴보자.'
      >
        <ChaosCalm />
      </PlaygroundSection>

      <PlaygroundSection
        index='B'
        emoji='🪤'
        title='Object Reference Trap (참조 함정)'
        description='객체·배열·함수는 매번 새로 만들어진다. 자식이 useEffect 주시 목록으로 받으면 매번 새 물건이라 다시 실행된다. useMemo로 같은 물건을 유지해서 어떻게 달라지는지 직접 확인.'
      >
        <ObjectReferenceTrap />
      </PlaygroundSection>
    </div>
  )
}

function PlayFirstBanner() {
  return (
    <div className='rounded-2xl bg-linear-to-br from-[#fff5f4] to-[#ffe8e3] p-5'>
      <div className='flex items-start gap-3'>
        <span className='text-3xl'>🎮</span>
        <div>
          <div className='font-extrabold'>일단 버튼부터 눌러봐</div>
          <p className='mt-1 text-sm text-gray-700'>
            이론을 다 읽고 시작하려 하지 마. 아래 <b>🎢 Chaos/Calm</b>과{' '}
            <b>🪤 참조 함정</b>에서 버튼을 몇 번 눌러보고, &quot;어, 이게 왜
            이러지?&quot; 싶을 때 설명을 읽으면 훨씬 빨리 감이 와.
          </p>
        </div>
      </div>
    </div>
  )
}

function Glossary() {
  const terms: Array<{ term: string; simple: string; full?: string }> = [
    {
      term: '리렌더',
      simple: '화면이 다시 그려지는 일',
      full: '컴포넌트 함수가 처음부터 다시 실행되는 것',
    },
    {
      term: '메모이제이션',
      simple: '결과를 종이에 적어두고 재사용하기',
      full: '이전에 계산한 결과를 저장해뒀다가, 같은 입력이면 다시 돌려쓰는 기법',
    },
    {
      term: '참조 동일성',
      simple: '진짜 같은 물건인지 확인',
      full: '자바스크립트에서 ===로 객체·배열·함수를 비교할 때 "내용"이 아니라 "주소"를 비교한다는 규칙',
    },
    {
      term: '주시 목록 (deps)',
      simple: 'useEffect·useMemo가 지켜보는 값들의 배열',
      full: '여기 있는 값이 바뀌면 effect/memo가 다시 실행됨',
    },
  ]
  return (
    <div>
      <div className='mb-3 text-xs font-bold tracking-wider text-gray-500 uppercase'>
        📖 이 페이지에 나오는 용어
      </div>
      <div className='grid gap-2 rounded-2xl bg-white p-4 ring-1 ring-gray-100 sm:grid-cols-2'>
        {terms.map((t) => (
          <div key={t.term} className='text-[13px] leading-snug'>
            <span className='font-bold'>{t.term}</span>{' '}
            <span className='text-gray-500'>·</span>{' '}
            <span className='text-gray-700'>{t.simple}</span>
            {t.full && (
              <div className='text-[11px] text-gray-400'>{t.full}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
