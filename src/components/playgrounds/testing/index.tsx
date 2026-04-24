import CardPlayground, {
  type CardPlaygroundItem,
} from '@/components/stages/CardPlayground'
import PlaygroundSection from '@/components/stages/PlaygroundSection'
import GoalViz from './GoalViz'

const CARDS: CardPlaygroundItem[] = [
  {
    id: 'setup',
    emoji: '⚙️',
    title: 'Vitest + RTL 셋업',
    subtitle: '2026년 Next.js 기준 가장 흔한 조합',
    filename: 'package.json · vitest.config.ts',
    code: `// package.json
"devDependencies": {
  "vitest": "^2.x",
  "jsdom": "^25.x",
  "@testing-library/react": "^16.x",
  "@testing-library/user-event": "^14.x",
  "@testing-library/jest-dom": "^6.x"
}
"scripts": {
  "test": "vitest",
  "test:ui": "vitest --ui",
  "coverage": "vitest --coverage"
}

// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setup.ts'],
  },
})

// src/tests/setup.ts
import '@testing-library/jest-dom/vitest'`,
    note: 'Jest 대신 Vitest — Vite 기반이라 빠름. RTL(React Testing Library)은 테스트 프레임워크 독립적이라 그대로.',
  },
  {
    id: 'rtl-query',
    emoji: '🔎',
    title: '쿼리 우선순위',
    subtitle: 'role > label > text > testid',
    filename: 'Counter.test.tsx',
    code: `import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from './Counter'

test('카운터가 증가한다', async () => {
  const user = userEvent.setup()
  render(<Counter />)

  // ✅ 1순위: role (사용자가 인지하는 요소 타입)
  const button = screen.getByRole('button', { name: /증가/i })
  const count = screen.getByRole('status')

  expect(count).toHaveTextContent('0')
  await user.click(button)
  expect(count).toHaveTextContent('1')
})

// ❌ 피하기: getByTestId — 사용자는 testid 모름
// const button = screen.getByTestId('inc-btn')`,
    note: 'RTL 철학: 사용자가 화면에서 찾는 방식으로 요소를 찾아라. role > label > placeholder > text > displayValue > altText > title > testid 순.',
  },
  {
    id: 'user-event',
    emoji: '👆',
    title: 'userEvent vs fireEvent',
    subtitle: '실제 사용자 상호작용 시뮬레이션',
    filename: '차이',
    code: `// ❌ fireEvent — 하나의 이벤트만 dispatch
fireEvent.click(button)
fireEvent.change(input, { target: { value: 'abc' } })

// ✅ userEvent — 실제 사용자 시퀀스 재현
const user = userEvent.setup()

await user.click(button)
// → pointerdown · mousedown · focus · pointerup · mouseup · click

await user.type(input, 'abc')
// → keydown 'a' · keyup 'a' · input · keydown 'b' · keyup 'b' ...

await user.tab()                 // Tab 키
await user.keyboard('{Enter}')   // 특정 키

await user.upload(input, file)   // 파일 업로드
await user.selectOptions(select, 'apple')`,
    note: 'userEvent는 async/await. 실제 브라우저 동작을 재현해서 버그 잡기 쉬움. 새 코드는 userEvent 기본값.',
  },
  {
    id: 'hook-test',
    emoji: '🎣',
    title: '커스텀 훅 테스트',
    subtitle: 'renderHook으로 훅만 고립 테스트',
    filename: 'useDebounce.test.ts',
    code: `import { renderHook, act } from '@testing-library/react'
import { useDebounce } from './useDebounce'

test('debounce — delay 후에만 값 반영', async () => {
  vi.useFakeTimers()

  const { result, rerender } = renderHook(
    ({ value, delay }) => useDebounce(value, delay),
    { initialProps: { value: 'a', delay: 500 } }
  )

  expect(result.current).toBe('a')

  rerender({ value: 'ab', delay: 500 })
  rerender({ value: 'abc', delay: 500 })

  // 아직 delay 안 지났으니 이전 값
  expect(result.current).toBe('a')

  act(() => { vi.advanceTimersByTime(500) })

  // delay 지나서 최신 값
  expect(result.current).toBe('abc')

  vi.useRealTimers()
})`,
    note: 'renderHook으로 훅만 독립 테스트. 타이머 등 비동기 로직은 vi.useFakeTimers로 제어.',
  },
  {
    id: 'msw',
    emoji: '🎭',
    title: 'MSW로 네트워크 모킹',
    subtitle: 'fetch를 가짜 응답으로 가로채기',
    filename: 'src/tests/handlers.ts',
    code: `// handlers.ts
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/posts', () => {
    return HttpResponse.json([
      { id: 1, title: 'Hello' },
      { id: 2, title: 'World' },
    ])
  }),
  http.post('/api/posts', async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json({ id: 3, ...body }, { status: 201 })
  }),
]

// setup.ts
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

const server = setupServer(...handlers)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// 테스트에서
test('Post 목록 표시', async () => {
  render(<Posts />)
  expect(await screen.findByText('Hello')).toBeInTheDocument()
})`,
    note: 'MSW는 서비스 워커·Node 둘 다 지원. 테스트에서도 브라우저에서도 같은 핸들러 재사용 가능. 실제 fetch를 통과시켜서 통합 테스트 품질 유지.',
  },
  {
    id: 'coverage',
    emoji: '📊',
    title: 'Coverage & CI 연동',
    subtitle: '커버리지는 목표가 아니라 관찰 지표',
    filename: 'vitest + c8/istanbul',
    code: `// vitest.config.ts
test: {
  coverage: {
    provider: 'v8',       // 또는 'istanbul'
    reporter: ['text', 'html', 'lcov'],
    thresholds: {
      lines: 80,
      functions: 80,
      branches: 70,
    },
  },
}

// GitHub Actions 예시
# .github/workflows/test.yml
- run: npm ci
- run: npm run test -- --coverage
- uses: codecov/codecov-action@v4
  with:
    file: ./coverage/lcov.info

# 실행
npm run coverage
# → coverage/index.html 열면 라인별 커버리지 시각화`,
    note: '커버리지 100%가 목표가 아니야. 중요한 비즈니스 로직·엣지 케이스·버그 재현 테스트가 우선. 숫자는 거기 초점을 못 맞추게 하는 독이 되기도 함.',
  },
]

export default function TestingPlayground() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='rounded-2xl bg-linear-to-br from-[#fff5f4] to-[#ffe8e3] p-5'>
        <div className='flex items-start gap-3'>
          <span className='text-3xl'>🎮</span>
          <div>
            <div className='font-extrabold'>테스트는 리팩토링의 안전망</div>
            <p className='mt-1 text-sm text-gray-700'>
              RTL + Vitest 6카드로 최소한의 테스트 패턴 익히기. 설치부터
              MSW·coverage까지.
            </p>
          </div>
        </div>
      </div>

      <GoalViz />

      <div className='border-t border-gray-200' />

      <PlaygroundSection
        index='A'
        emoji='🧪'
        title='테스트 6카드'
        description='Vitest+RTL 셋업 · 쿼리 우선순위 · userEvent · 커스텀 훅 · MSW · coverage.'
      >
        <CardPlayground items={CARDS} />
      </PlaygroundSection>
    </div>
  )
}
