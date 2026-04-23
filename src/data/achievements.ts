import { allStages, type Stage } from './stages'
import type { Progress } from '@/lib/progress'

export type AchievementRule = {
  id: string
  emoji: string
  title: string
  description: string
  isUnlocked: (progress: Progress) => boolean
}

const done = (progress: Progress, id: string): boolean =>
  progress.completedAt[id] != null

const categoryComplete = (
  progress: Progress,
  category: Stage['category']
): boolean =>
  allStages
    .filter((s) => s.category === category)
    .every((s) => done(progress, s.id))

export const achievements: AchievementRule[] = [
  {
    id: 'first-render',
    emoji: '🎬',
    title: 'First Render',
    description: '렌더링 기초 정복',
    isUnlocked: (p) => done(p, 'stage-1-rendering'),
  },
  {
    id: 'memo-master',
    emoji: '🧙‍♂️',
    title: '메모리 마스터',
    description: 'useMemo 정복',
    isUnlocked: (p) => done(p, 'stage-2-usememo'),
  },
  {
    id: 'shield-knight',
    emoji: '🛡️',
    title: '방패의 기사',
    description: '메모이제이션 3종 완성',
    isUnlocked: (p) =>
      done(p, 'stage-2-usememo') &&
      done(p, 'stage-3-usecallback') &&
      done(p, 'stage-4-react-memo'),
  },
  {
    id: 'hook-artisan',
    emoji: '🔨',
    title: '훅 장인',
    description: '🎣 훅 탭 전부 클리어',
    isUnlocked: (p) => categoryComplete(p, 'hooks'),
  },
  {
    id: 'debugger',
    emoji: '🐛',
    title: '디버거',
    description: '보스전 클리어',
    isUnlocked: (p) => done(p, 'boss-rendering'),
  },
  {
    id: 'react-wizard',
    emoji: '👑',
    title: 'React Wizard',
    description: '전 스테이지 완주',
    isUnlocked: (p) => allStages.every((s) => done(p, s.id)),
  },
]

export function unlockedAchievementCount(progress: Progress): number {
  return achievements.filter((a) => a.isUnlocked(progress)).length
}
