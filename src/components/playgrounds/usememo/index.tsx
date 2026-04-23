import ChaosCalm from './ChaosCalm'
import ObjectReferenceTrap from './ObjectReferenceTrap'
import PlaygroundSection from '@/components/stages/PlaygroundSection'

export default function UseMemoPlayground() {
  return (
    <div className='flex flex-col gap-10'>
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
        title='Object Reference Trap'
        description='객체·배열·함수는 매 렌더마다 새 참조. 자식이 useEffect deps로 받으면 매번 다시 실행된다. useMemo로 참조를 얼려서 뭐가 달라지는지 직접 확인.'
      >
        <ObjectReferenceTrap />
      </PlaygroundSection>
    </div>
  )
}
