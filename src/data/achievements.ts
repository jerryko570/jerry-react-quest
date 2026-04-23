export type Achievement = {
  id: string
  emoji: string
  title: string
  description: string
  unlocked: boolean
}

export const achievements: Achievement[] = [
  {
    id: 'first-render',
    emoji: '🎬',
    title: 'First Render',
    description: 'STAGE 1 클리어',
    unlocked: false,
  },
  {
    id: 'memo-master',
    emoji: '🧙‍♂️',
    title: '메모리 마스터',
    description: 'useMemo 정복',
    unlocked: false,
  },
  {
    id: 'shield-knight',
    emoji: '🛡️',
    title: '방패의 기사',
    description: '3종 세트 완성',
    unlocked: false,
  },
  {
    id: 'hook-artisan',
    emoji: '🔨',
    title: '훅 장인',
    description: '커스텀 훅 6개',
    unlocked: false,
  },
  {
    id: 'debugger',
    emoji: '🐛',
    title: '디버거',
    description: '보스전 클리어',
    unlocked: false,
  },
  {
    id: 'react-wizard',
    emoji: '👑',
    title: 'React Wizard',
    description: '전 스테이지 완주',
    unlocked: false,
  },
]
