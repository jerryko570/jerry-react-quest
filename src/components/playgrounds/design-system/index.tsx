import CardPlayground, {
  type CardPlaygroundItem,
} from '@/components/stages/CardPlayground'
import PlaygroundSection from '@/components/stages/PlaygroundSection'
import CompoundDemo from './CompoundDemo'
import GoalViz from './GoalViz'

const CARDS: CardPlaygroundItem[] = [
  {
    id: 'tokens',
    emoji: '🎨',
    title: 'Design Tokens',
    subtitle: '색상 · 타이포 · 간격의 단일 진실 원천',
    filename: 'src/app/styles/theme.css',
    code: `@theme {
  --color-primary: #ff5e48;
  --color-primary-soft: #ffe8e3;
  --color-success: #10b981;
  --color-danger: #ef4444;

  --font-sans: 'Pretendard', ui-sans-serif, sans-serif;
  --radius-sm: 0.75rem;
  --radius-md: 1rem;

  --spacing-section: 6rem;
}

.dark {
  --color-primary: #ff8a65;
  /* 같은 이름, 다른 값 */
}`,
    lang: 'css',
    note: 'Tailwind v4 @theme 지시어로 토큰 선언. CSS 변수로 런타임 테마 전환도 가능. 디자이너·개발자 공통 언어.',
  },
  {
    id: 'compound',
    emoji: '🧩',
    title: 'Compound Component 패턴',
    subtitle: '부모가 상태, 자식이 레이아웃',
    filename: 'Tabs.tsx',
    code: `const TabsContext = createContext<TabsContextValue | null>(null)

function Tabs({ defaultValue, children }: Props) {
  const [value, setValue] = useState(defaultValue)
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      {children}
    </TabsContext.Provider>
  )
}

function Tab({ value, children }: Props) {
  const ctx = useContext(TabsContext)!
  return (
    <button onClick={() => ctx.setValue(value)}>
      {children}
    </button>
  )
}

Tabs.List = TabList
Tabs.Tab = Tab
Tabs.Panel = TabPanel

// 사용
<Tabs defaultValue='a'>
  <Tabs.List>
    <Tabs.Tab value='a'>탭 A</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value='a'>내용</Tabs.Panel>
</Tabs>`,
    note: '상태는 Context에 숨기고 배치는 사용자가 자유롭게. props 지옥을 피하면서도 유연성 확보.',
  },
  {
    id: 'headless',
    emoji: '🧠',
    title: 'Headless UI (Radix · Ark UI)',
    subtitle: '로직은 라이브러리, 스타일은 내가',
    filename: 'Radix Dialog 예시',
    code: `import * as Dialog from '@radix-ui/react-dialog'

<Dialog.Root>
  <Dialog.Trigger asChild>
    <button>설정 열기</button>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className='fixed inset-0 bg-black/50' />
    <Dialog.Content className='fixed inset-0 m-auto h-fit w-96 rounded-2xl bg-white p-6'>
      <Dialog.Title>설정</Dialog.Title>
      <Dialog.Description>계정 설정을 변경합니다</Dialog.Description>
      <Dialog.Close asChild>
        <button>닫기</button>
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>`,
    note: '포커스 트랩·ESC·스크롤 잠금·ARIA 속성을 라이브러리가 보장. 스타일은 Tailwind로 자유. shadcn/ui는 Radix + Tailwind 프리셋.',
  },
  {
    id: 'cva',
    emoji: '🎛️',
    title: 'CVA로 Variants 관리',
    subtitle: 'class-variance-authority — 타입 안전 variants',
    filename: 'button.variants.ts',
    code: `import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center rounded-full font-bold transition',
  {
    variants: {
      variant: {
        primary: 'bg-[#ff5e48] text-white hover:bg-[#ec4b36]',
        secondary: 'border border-gray-200 bg-white text-gray-700',
        ghost: 'text-gray-600 hover:bg-gray-100',
      },
      size: {
        sm: 'px-3 py-1 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
)

type Props = React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>

function Button({ variant, size, className, ...rest }: Props) {
  return <button className={buttonVariants({ variant, size, className })} {...rest} />
}`,
    note: 'variant 조합을 타입으로 강제. 오타 방지 + IDE 자동완성. Tailwind 클래스 충돌은 tailwind-merge와 조합해 해결.',
  },
  {
    id: 'storybook',
    emoji: '📖',
    title: 'Storybook 구축',
    subtitle: '컴포넌트 카탈로그 + 디자이너 소통 창구',
    filename: 'Button.stories.tsx',
    code: `import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  component: Button,
  args: { children: '클릭' },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}
export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = { args: { variant: 'primary' } }
export const AllSizes: Story = {
  render: () => (
    <div className='flex gap-2'>
      <Button size='sm'>작게</Button>
      <Button size='md'>중간</Button>
      <Button size='lg'>크게</Button>
    </div>
  ),
}`,
    note: '모든 variant·state를 한 화면에서 검수. Visual regression test (Chromatic) · a11y addon · 디자인 토큰 연동까지 확장 가능.',
  },
  {
    id: 'theme-strategy',
    emoji: '🌗',
    title: 'Theme (라이트/다크) 전략',
    subtitle: 'CSS 변수 + class / data-theme 스위치',
    filename: '다크 모드 토글',
    code: `// 1) CSS 변수로 테마 정의
:root {
  --color-bg: white;
  --color-text: #111;
}

.dark {
  --color-bg: #0a0a0a;
  --color-text: #f3f3f3;
}

// 2) 컴포넌트는 변수만 사용
<div style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }} />

// 3) class 토글 (next-themes 추천)
import { ThemeProvider, useTheme } from 'next-themes'

function ToggleTheme() {
  const { theme, setTheme } = useTheme()
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}

// layout.tsx
<ThemeProvider attribute='class' defaultTheme='system'>
  {children}
</ThemeProvider>`,
    note: 'SSR에서 깜빡임(FOUC)을 피하려면 next-themes 같은 라이브러리 권장. 시스템 설정 자동 감지도 제공.',
  },
]

export default function DesignSystemPlayground() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='rounded-2xl bg-linear-to-br from-[#fff5f4] to-[#ffe8e3] p-5'>
        <div className='flex items-start gap-3'>
          <span className='text-3xl'>🎮</span>
          <div>
            <div className='font-extrabold'>
              디자이너 강점을 코드로 — Compound 패턴 + 6카드
            </div>
            <p className='mt-1 text-sm text-gray-700'>
              아래 Tabs는 실제 compound 컴포넌트 구현. 그 다음 6카드에서 tokens
              · headless UI · CVA · Storybook · Theme 전략을 훑어.
            </p>
          </div>
        </div>
      </div>

      <GoalViz />

      <div className='border-t border-gray-200' />

      <PlaygroundSection
        index='A'
        emoji='🧩'
        title='Compound Component 실전 — Tabs'
        description='Context + 정적 프로퍼티로 조립식 API. 아래에서 탭을 눌러보고 그 아래 소스 카드에서 구조 확인.'
      >
        <CompoundDemo />
      </PlaygroundSection>

      <PlaygroundSection
        index='B'
        emoji='📐'
        title='디자인 시스템 6카드'
        description='Tokens · Compound · Headless UI · CVA · Storybook · Theme 전략.'
      >
        <CardPlayground items={CARDS} />
      </PlaygroundSection>
    </div>
  )
}
