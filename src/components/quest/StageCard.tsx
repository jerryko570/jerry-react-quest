import type { Stage } from '@/data/stages'
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
  const statusIcon =
    stage.status === 'completed'
      ? '✅'
      : stage.status === 'active'
        ? '🔓'
        : '🔒'

  return (
    <article
      className={cn(
        stageCardVariants({ status: stage.status, boss: stage.isBoss }),
        stage.status === 'locked' && 'hover:translate-y-0 hover:shadow-none'
      )}
    >
      {stage.isBoss && (
        <div className='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#f59e0b]' />
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
              {stage.highlight && (
                <span className='text-xs font-bold text-[#ff5e48]'>
                  {stage.highlight}
                </span>
              )}
              <span className='text-xs text-gray-500'>⏱ {stage.hours}시간</span>
            </div>
          </div>
        </div>
        <div className='shrink-0 text-2xl'>{statusIcon}</div>
      </header>

      <div className='grid gap-5 border-t border-gray-100 pt-4 md:grid-cols-2'>
        <Bullets title='🎯 학습 목표' items={stage.goals} />
        <Bullets title={`🎮 ${stage.examplesLabel}`} items={stage.examples} />
      </div>

      {stage.progress && (
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
    </article>
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
