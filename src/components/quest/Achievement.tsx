import { cn } from '@/lib/cn'
import type { Achievement as AchievementType } from '@/data/achievements'

type AchievementProps = {
  achievement: AchievementType
}

export default function Achievement({ achievement }: AchievementProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border-2 p-5 text-center transition-all duration-300',
        achievement.unlocked
          ? 'border-[#f59e0b] bg-[#fef3c7]'
          : 'border-gray-100 bg-white opacity-40 grayscale'
      )}
    >
      <div className='mb-2 text-4xl'>{achievement.emoji}</div>
      <div className='mb-1 text-[13px] font-bold'>{achievement.title}</div>
      <div className='text-[11px] text-gray-500'>{achievement.description}</div>
    </div>
  )
}
