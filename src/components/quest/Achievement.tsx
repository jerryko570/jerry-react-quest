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
              'relative rounded-2xl bg-white p-6 text-center ring-1 transition-all duration-300',
              unlocked ? 'ring-blue-300' : 'opacity-50 ring-gray-100 grayscale'
            )}
          >
            {unlocked && (
              <span className='absolute -top-2 -right-2 rounded-full bg-blue-500 px-2 py-0.5 text-[10px] font-extrabold text-white shadow-sm'>
                NEW
              </span>
            )}
            <div className='mb-3 text-5xl'>{a.emoji}</div>
            <p className='text-sm font-extrabold text-gray-900'>{a.title}</p>
            <p className='mt-1 text-xs font-medium text-gray-500'>
              {a.description}
            </p>
          </div>
        )
      })}
    </div>
  )
}
