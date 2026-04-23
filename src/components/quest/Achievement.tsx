'use client'

import { cn } from '@/lib/cn'
import { achievements } from '@/data/achievements'
import { useProgress } from '@/lib/progress'

export default function AchievementGrid() {
  const progress = useProgress()
  return (
    <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6'>
      {achievements.map((a) => {
        const unlocked = a.isUnlocked(progress)
        return (
          <div
            key={a.id}
            className={cn(
              'relative rounded-2xl border-2 p-5 text-center transition-all duration-300',
              unlocked
                ? 'border-[#f59e0b] bg-[#fef3c7]'
                : 'border-gray-100 bg-white opacity-40 grayscale'
            )}
          >
            {unlocked && (
              <span className='absolute -top-2 -right-2 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white shadow'>
                NEW
              </span>
            )}
            <div className='mb-2 text-4xl'>{a.emoji}</div>
            <div className='mb-1 text-[13px] font-bold'>{a.title}</div>
            <div className='text-[11px] text-gray-500'>{a.description}</div>
          </div>
        )
      })}
    </div>
  )
}
