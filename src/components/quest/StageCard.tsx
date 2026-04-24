'use client'

import Link from 'next/link'
import Text from '@/components/ui/Text'
import type { Stage } from '@/data/stages'
import { hasPlayground } from '@/data/playgrounds'
import { isCompleted, useProgress } from '@/lib/progress'
import { cn } from '@/lib/cn'
import {
  difficultyBadge,
  difficultyLabel,
  stageCardVariants,
} from './StageCard.variants'

type StageCardProps = {
  stage: Stage
}

export default function StageCard({ stage }: StageCardProps) {
  const progress = useProgress()
  const done = isCompleted(stage.id, progress)
  const playgroundReady = hasPlayground(stage.id)
  const baseStatus =
    stage.status === 'locked' && playgroundReady ? 'active' : stage.status
  const effectiveStatus = done ? 'completed' : baseStatus
  const statusIcon =
    effectiveStatus === 'completed'
      ? '✅'
      : effectiveStatus === 'active'
        ? '🔓'
        : '🔒'

  return (
    <Link
      href={`/stages/${stage.id}`}
      aria-label={`${stage.title} 상세로 이동`}
      className={cn(
        stageCardVariants({ status: effectiveStatus, boss: stage.isBoss }),
        'block p-6 focus-visible:ring-2 focus-visible:ring-[#ff5e48] focus-visible:outline-none',
        effectiveStatus === 'locked' && 'hover:translate-y-0 hover:shadow-none'
      )}
    >
      {stage.isBoss && (
        <div className='absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#8b5cf6] via-[#ec4899] to-[#f59e0b]' />
      )}
      {done && (
        <div
          aria-hidden
          className='pointer-events-none absolute top-4 right-5 -rotate-12 rounded-md border-2 border-emerald-500 px-3 py-1 font-mono text-sm font-black tracking-wider text-emerald-500 opacity-90'
        >
          CLEAR!
        </div>
      )}

      <header className='flex items-start justify-between gap-4'>
        <div className='flex flex-1 items-start gap-4'>
          <span className='shrink-0 text-5xl'>{stage.emoji}</span>
          <div className='flex-1'>
            <Text as='h6' className='font-extrabold'>
              {stage.title}
            </Text>
            <Text as='p' className='mt-1 text-gray-500'>
              {stage.subtitle}
            </Text>
            <div className='mt-3 flex flex-wrap items-center gap-2'>
              <span
                className={difficultyBadge({ difficulty: stage.difficulty })}
              >
                {difficultyLabel[stage.difficulty]}
              </span>
              {stage.highlight && !done && (
                <Text as='caption' className='font-bold text-[#ff5e48]'>
                  {stage.highlight}
                </Text>
              )}
              <Text as='caption' className='text-gray-500'>
                ⏱ {stage.hours}시간
              </Text>
              {playgroundReady && (
                <span className='inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white'>
                  🕹️ 플레이 가능
                </span>
              )}
            </div>
          </div>
        </div>
        <div className='shrink-0 text-2xl'>{statusIcon}</div>
      </header>

      {stage.progress && !done && (
        <footer className='mt-5 flex items-center justify-between border-t border-gray-100 pt-4 text-sm text-gray-500'>
          <span>{stage.progress.label}</span>
          <div className='flex items-center gap-2'>
            <div className='h-1.5 w-24 overflow-hidden rounded-full bg-gray-100'>
              <div
                className='h-full rounded-full bg-[#ff5e48]'
                style={{
                  width: `${Math.round(
                    (stage.progress.current / stage.progress.total) * 100
                  )}%`,
                }}
              />
            </div>
            <span className='font-mono'>
              {stage.progress.current}/{stage.progress.total}
            </span>
          </div>
        </footer>
      )}
    </Link>
  )
}
