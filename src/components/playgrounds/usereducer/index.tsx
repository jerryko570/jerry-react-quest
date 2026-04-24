import TodoReducer from './TodoReducer'
import CodeBlock from '@/components/stages/CodeBlock'
import StageFlow from '@/components/stages/StageFlow'

export default function UseReducerPlayground() {
  return (
    <StageFlow>
      <StageFlow.Empathy>
        ⚙️ &quot;state 3개 넘으니까 setX가 흩어져&quot; — reducer 차례야.
      </StageFlow.Empathy>

      <StageFlow.Play subtitle='두 Todo 나란히 조작해봐'>
        <TodoReducer />
      </StageFlow.Play>

      <StageFlow.Observe title='🤔 왜 reducer 쪽이 더 읽기 쉽지?'>
        <p>🟢 useState는 setX가 이벤트 핸들러마다 흩어져 규칙 깨지기 쉬움.</p>
        <p className='mt-3'>
          🟢 useReducer는 모든 변화를 action 타입으로 선언. dispatch만 하면 돼.
        </p>
      </StageFlow.Observe>

      <StageFlow.Next subtitle='코드 + 정리 + 다음'>
        <p className='mb-4'>
          ✔️ state 3+개 얽히면 reducer. 순수 함수라 테스트도 쉬움.
        </p>
        <CodeBlock
          filename='reducer 패턴'
          code={`type Action = { type: 'add'; text: string } | { type: 'toggle'; id: number }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add': return { ...state, todos: [...state.todos, ...] }
    case 'toggle': return { ...state, todos: state.todos.map(...) }
  }
}

const [state, dispatch] = useReducer(reducer, initial)
dispatch({ type: 'add', text: '...' })`}
        />
        <p className='mt-5 text-gray-700'>
          다음은 <b>TanStack Query</b> 🚀
        </p>
      </StageFlow.Next>
    </StageFlow>
  )
}
