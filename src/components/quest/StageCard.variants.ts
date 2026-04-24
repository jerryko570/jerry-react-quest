import { cva } from 'class-variance-authority'

export const stageCardVariants = cva(
  'relative overflow-hidden rounded-2xl bg-white p-6 ring-1 transition-all duration-300',
  {
    variants: {
      status: {
        locked: 'opacity-55 ring-gray-100',
        active:
          'ring-gray-100 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_rgba(69,118,252,0.25)] hover:ring-blue-300',
        completed:
          'ring-blue-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_rgba(69,118,252,0.25)]',
      },
      boss: {
        true: 'ring-violet-300',
        false: '',
      },
    },
    defaultVariants: {
      status: 'locked',
      boss: false,
    },
  }
)

export const difficultyBadge = cva(
  'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-[0.05em] uppercase',
  {
    variants: {
      difficulty: {
        tutorial: 'bg-[#dbeafe] text-[#1e40af]',
        easy: 'bg-[#d1fae5] text-[#065f46]',
        medium: 'bg-[#fef3c7] text-[#92400e]',
        hard: 'bg-[#fee2e2] text-[#991b1b]',
        boss: 'bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] text-white',
        bonus: 'bg-[#fce7f3] text-[#be185d]',
      },
    },
    defaultVariants: {
      difficulty: 'tutorial',
    },
  }
)

export const difficultyLabel: Record<
  NonNullable<Parameters<typeof difficultyBadge>[0]>['difficulty'] & string,
  string
> = {
  tutorial: 'Tutorial',
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  boss: 'BOSS',
  bonus: 'BONUS',
}
