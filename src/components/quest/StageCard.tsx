'use client'

import Link from 'next/link'
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
  const effectiveStatus = done ? 'completed' : stage.status
  const statusIcon =
    effectiveStatus === 'completed'
      ? '✅'
      : effectiveStatus === 'active'
        ? '🔓'
        : '🔒'
  const playgroundReady = hasPlayground(stage.id)

  return (
    <Link
      href={`/stages/${stage.id}`}
      aria-label={`${stage.title} 상세로 이동`}
      className={cn(
        stageCardVariants({ status: effectiveStatus, boss: stage.isBoss }),
        'block focus-visible:ring-2 focus-visible:ring-[#ff5e48] focus-visible:outline-none',
        effectiveStatus === 'locked' && 'hover:translate-y-0 hover:shadow-none'
      )}
    >
      {stage.isBoss && (
        <div className='absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#8b5cf6] via-[#ec4899] to-[#f59e0b]' />
      )}
      {done && (
        <div
          aria-hidden
          className='pointer-events-none absolute top-3 right-4 -rotate-12 rounded-md border-2 border-emerald-500 px-3 py-1 font-mono text-sm font-black tracking-wider text-emerald-500 opacity-90'
        >
          CLEAR!
        </div>
      )}

      <header className='mb-4 flex items-start justify-between gap-3'>
        <div className='flex flex-1 items-center gap-4'>
          <span className='shrink-0 text-4xl'>{stage.emoji}</span>
          <div>
            <h3 className='text-xl font-extrabold tracking-[-0.01em]'>
              {stage.title}
            </h3>
            <p className='text-sm text-gray-500'>{stage.subtitle}</p>
            <div className='mt-2 flex flex-wrap items-center gap-1.5'>
              <span
                className={difficultyBadge({ difficulty: stage.difficulty })}
              >
                {difficultyLabel[stage.difficulty]}
              </span>
              {stage.highlight && !done && (
                <span className='text-xs font-bold text-[#ff5e48]'>
                  {stage.highlight}
                </span>
              )}
              <span className='text-xs text-gray-500'>⏱ {stage.hours}시간</span>
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

      <div className='grid gap-5 border-t border-gray-100 pt-4 md:grid-cols-2'>
        <Bullets title='🎯 학습 목표' items={stage.goals} />
        <Bullets title={`🎮 ${stage.examplesLabel}`} items={stage.examples} />
      </div>

      {stage.progress && !done && (
        <footer className='mt-4 flex items-center justify-between border-t border-gray-100 pt-4 text-sm text-gray-500'>
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

function Bullets({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className='mb-2 flex items-center gap-1.5 text-xs font-bold tracking-[0.08em] text-gray-500 uppercase'>
        {title}
      </div>
      <ul className='flex flex-col gap-1.5'>
        {items.map((text) => (
          <li
            key={text}
            className='flex items-start gap-2 text-sm leading-snug'
          >
            <span className='shrink-0 font-mono text-gray-500'>☐</span>
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
