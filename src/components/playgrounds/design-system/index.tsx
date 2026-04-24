import CardPlayground, {
  type CardPlaygroundItem,
} from '@/components/stages/CardPlayground'
import CompoundDemo from './CompoundDemo'
import StageFlow from '@/components/stages/StageFlow'

const CARDS: CardPlaygroundItem[] = [
  {
    id: 'tokens',
    emoji: '🎨',
    title: 'Design Tokens',
    subtitle: '단일 진실 원천',
    filename: 'theme.css',
    code: `@theme {
  --color-primary: #4576fc;
  --color-primary-soft: #e7edff;
  --font-sans: 'Pretendard', sans-serif;
  --radius-md: 1rem;
}

.dark { --color-primary: #5f8aff }`,
    lang: 'css',
    note: 'Tailwind v4 @theme. CSS 변수로 런타임 테마 전환.',
  },
  {
    id: 'compound',
    emoji: '🧩',
    title: 'Compound Component',
    subtitle: '조립식 API',
    filename: 'Tabs.tsx',
    code: `<Tabs defaultValue='a'>
  <Tabs.List>
    <Tabs.Tab value='a'>탭 A</Tabs.Tab>
    <Tabs.Tab value='b'>탭 B</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value='a'>A 내용</Tabs.Panel>
  <Tabs.Panel value='b'>B 내용</Tabs.Panel>
</Tabs>

// 내부: Context로 value 공유
// 정적 프로퍼티(Tabs.Tab)로 그룹화`,
    note: '상태는 숨기고 레이아웃은 자유. props 폭발 방지.',
  },
  {
    id: 'headless',
    emoji: '🧠',
    title: 'Headless UI',
    subtitle: 'Radix · Ark UI',
    filename: 'Radix Dialog',
    code: `import * as Dialog from '@radix-ui/react-dialog'

<Dialog.Root>
  <Dialog.Trigger asChild><button>열기</button></Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className='fixed inset-0 bg-black/50' />
    <Dialog.Content className='...'>
      <Dialog.Title>설정</Dialog.Title>
      <Dialog.Close>닫기</Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>`,
    note: 'focus trap · ESC · ARIA가 라이브러리 책임. 스타일은 자유. shadcn/ui는 Radix 프리셋.',
  },
  {
    id: 'cva',
    emoji: '🎛️',
    title: 'CVA Variants',
    subtitle: '타입 안전',
    filename: 'button.variants.ts',
    code: `export const buttonVariants = cva('inline-flex items-center rounded-full', {
  variants: {
    variant: {
      primary: 'bg-[#4576fc] text-white',
      secondary: 'border border-gray-200 bg-white',
    },
    size: { sm: 'px-3 py-1', md: 'px-4 py-2', lg: 'px-6 py-3' },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
})

type Props = ComponentProps<'button'> & VariantProps<typeof buttonVariants>`,
    note: 'variant 조합 타입 강제. tailwind-merge와 조합해 클래스 충돌 해결.',
  },
  {
    id: 'storybook',
    emoji: '📖',
    title: 'Storybook',
    subtitle: '카탈로그 + 소통 창구',
    filename: 'Button.stories.tsx',
    code: `const meta: Meta<typeof Button> = {
  component: Button,
  args: { children: '클릭' },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}
export default meta

export const Primary: Story = { args: { variant: 'primary' } }
export const AllSizes: Story = {
  render: () => <div className='flex gap-2'>...</div>
}`,
    note: 'Chromatic으로 visual regression · a11y addon · 디자인 토큰 연동.',
  },
  {
    id: 'theme-strategy',
    emoji: '🌗',
    title: 'Theme 전략',
    subtitle: 'CSS 변수 + class',
    filename: '다크 모드',
    code: `:root { --color-bg: white; --color-text: #111 }
.dark { --color-bg: #0a0a0a; --color-text: #f3f3f3 }

// next-themes
import { ThemeProvider, useTheme } from 'next-themes'

<ThemeProvider attribute='class' defaultTheme='system'>
  {children}
</ThemeProvider>`,
    note: 'next-themes로 FOUC 방지 · 시스템 설정 자동 감지.',
  },
]

export default function DesignSystemPlayground() {
  return (
    <StageFlow>
      <StageFlow.Empathy>
        🧩 &quot;컴포넌트 매번 복붙이야&quot; — 디자인 시스템을 세우면 재사용과
        일관성이 자동으로 따라와.
      </StageFlow.Empathy>

      <StageFlow.Play subtitle='실제 Tabs compound + 6장 참고 카드'>
        <div className='space-y-4'>
          <CompoundDemo />
          <CardPlayground items={CARDS} />
        </div>
      </StageFlow.Play>

      <StageFlow.Observe title='🤔 왜 이 6개가 세트야?'>
        <p>
          🟢 토큰(색·폰트)이 기반. Compound 패턴 + CVA로 타입 안전한 컴포넌트.
        </p>
        <p className='mt-3'>
          🟢 Headless UI로 접근성, Storybook으로 카탈로그, Theme으로 다크모드 —
          6개가 유기적.
        </p>
      </StageFlow.Observe>

      <StageFlow.Next subtitle='완주'>
        <p className='text-gray-700'>
          🎉 <b>전 스테이지 완주</b> — 이제 진짜 시작이야 🚀
        </p>
      </StageFlow.Next>
    </StageFlow>
  )
}
