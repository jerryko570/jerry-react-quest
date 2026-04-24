'use client'

import Text from '@/components/ui/Text'
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
              'relative rounded-2xl p-6 text-center ring-1 transition-all duration-300',
              unlocked
                ? 'bg-[#fff8ec] ring-amber-300'
                : 'bg-white opacity-40 ring-gray-100 grayscale'
            )}
          >
            {unlocked && (
              <span className='absolute -top-2 -right-2 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white shadow'>
                NEW
              </span>
            )}
            <div className='mb-3 text-5xl'>{a.emoji}</div>
            <Text as='caption' className='block font-bold'>
              {a.title}
            </Text>
            <Text as='caption' className='mt-1 block text-gray-500'>
              {a.description}
            </Text>
          </div>
        )
      })}
    </div>
  )
}
