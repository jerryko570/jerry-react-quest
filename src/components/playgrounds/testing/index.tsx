import CardPlayground, {
  type CardPlaygroundItem,
} from '@/components/stages/CardPlayground'
import StageFlow from '@/components/stages/StageFlow'

const CARDS: CardPlaygroundItem[] = [
  {
    id: 'setup',
    emoji: '⚙️',
    title: 'Vitest + RTL 셋업',
    subtitle: '2026년 표준',
    filename: 'vitest.config.ts',
    code: `// devDependencies
"vitest": "^2.x", "jsdom": "^25.x"
"@testing-library/react": "^16.x"
"@testing-library/user-event": "^14.x"
"@testing-library/jest-dom": "^6.x"

// vitest.config.ts
export default defineConfig({
  plugins: [react()],
  test: { environment: 'jsdom', globals: true, setupFiles: ['./src/tests/setup.ts'] },
})`,
    note: 'Vitest는 Vite 기반이라 빠름. RTL은 테스트 프레임워크 독립.',
  },
  {
    id: 'rtl-query',
    emoji: '🔎',
    title: '쿼리 우선순위',
    subtitle: 'role > label > text > testid',
    filename: 'Counter.test.tsx',
    code: `test('카운터 증가', async () => {
  const user = userEvent.setup()
  render(<Counter />)

  const button = screen.getByRole('button', { name: /증가/i })  // ✅ 1순위
  const count = screen.getByRole('status')

  expect(count).toHaveTextContent('0')
  await user.click(button)
  expect(count).toHaveTextContent('1')
})`,
    note: 'getByTestId는 마지막 수단. 사용자가 화면에서 찾는 방식 우선.',
  },
  {
    id: 'user-event',
    emoji: '👆',
    title: 'userEvent vs fireEvent',
    subtitle: '실제 동작 시뮬',
    filename: '차이',
    code: `// ❌ fireEvent — 단일 이벤트
fireEvent.click(button)

// ✅ userEvent — 실제 시퀀스
const user = userEvent.setup()
await user.click(button)        // pointerdown→focus→pointerup→click
await user.type(input, 'abc')
await user.tab()
await user.keyboard('{Enter}')
await user.upload(input, file)`,
    note: 'async/await. 실제 브라우저 동작 재현. 새 코드는 userEvent.',
  },
  {
    id: 'hook-test',
    emoji: '🎣',
    title: '커스텀 훅 테스트',
    subtitle: 'renderHook',
    filename: 'useDebounce.test.ts',
    code: `test('debounce delay 후 반영', async () => {
  vi.useFakeTimers()
  const { result, rerender } = renderHook(
    ({ v, d }) => useDebounce(v, d),
    { initialProps: { v: 'a', d: 500 } }
  )
  rerender({ v: 'abc', d: 500 })
  expect(result.current).toBe('a')
  act(() => { vi.advanceTimersByTime(500) })
  expect(result.current).toBe('abc')
  vi.useRealTimers()
})`,
    note: '훅만 독립 테스트. 타이머는 vi.useFakeTimers로.',
  },
  {
    id: 'msw',
    emoji: '🎭',
    title: 'MSW 네트워크 모킹',
    subtitle: 'fetch 가로채기',
    filename: 'handlers.ts',
    code: `import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/posts', () =>
    HttpResponse.json([{ id: 1, title: 'Hello' }])
  ),
]

// setup.ts
const server = setupServer(...handlers)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())`,
    note: '서비스 워커·Node 둘 다. 브라우저-테스트 핸들러 공유 가능.',
  },
  {
    id: 'coverage',
    emoji: '📊',
    title: 'Coverage',
    subtitle: '관찰 지표 (목표 X)',
    filename: 'vitest + v8',
    code: `// vitest.config.ts
coverage: {
  provider: 'v8',
  reporter: ['text', 'html', 'lcov'],
  thresholds: { lines: 80, functions: 80, branches: 70 },
}

# CI
- run: npm run test -- --coverage
- uses: codecov/codecov-action@v4`,
    note: '100% 목표는 독. 중요한 로직·엣지·버그 재현이 우선.',
  },
]

export default function TestingPlayground() {
  return (
    <StageFlow>
      <StageFlow.Empathy>
        🧪 &quot;리팩토링할 때마다 전체 수동 테스트&quot; — 그 시간이 곧 테스트
        작성 시간보다 길어.
      </StageFlow.Empathy>

      <StageFlow.Play subtitle='6장 카드: 셋업부터 coverage까지'>
        <CardPlayground items={CARDS} />
      </StageFlow.Play>

      <StageFlow.Observe title='🤔 왜 사용자 관점으로 쓰라고?'>
        <p>
          🟢 구현(state·class)이 아닌 <b>사용자가 보는 것</b>을 테스트 →
          리팩토링해도 살아남음.
        </p>
        <p className='mt-3'>
          🟢 <code>getByRole</code>이 잘 작동 = 접근성도 OK (부수 효과).
        </p>
      </StageFlow.Observe>

      <StageFlow.Next subtitle='다음'>
        <p className='text-gray-700'>
          다음은 폼 유효성의 표준 <b>React Hook Form + Zod</b> 🚀
        </p>
      </StageFlow.Next>
    </StageFlow>
  )
}
