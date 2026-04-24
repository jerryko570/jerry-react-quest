'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  allStages,
  categoryMeta,
  type CategoryId,
  type Stage,
} from '@/data/stages'
import { completedInCategory, useProgress } from '@/lib/progress'
import { cn } from '@/lib/cn'
import StageCard from './StageCard'

type QuestTabsProps = {
  initialTab: CategoryId
}

export default function QuestTabs({ initialTab }: QuestTabsProps) {
  const router = useRouter()
  const [tab, setTab] = useState<CategoryId>(initialTab)
  const progress = useProgress()

  const activeMeta = categoryMeta.find((c) => c.id === tab) ?? categoryMeta[0]
  const visible = allStages.filter((s) => s.category === tab)

  const handleSelect = (next: CategoryId) => {
    if (next === tab) return
    setTab(next)
    router.replace(`/?tab=${next}`, { scroll: false })
  }

  return (
    <div>
      <nav
        aria-label='Quest 카테고리'
        className='-mx-2 mb-8 flex flex-wrap gap-2 overflow-x-auto px-2'
      >
        {categoryMeta.map((meta) => {
          const inCategory = allStages.filter((s) => s.category === meta.id)
          const total = inCategory.length
          const done = completedInCategory(
            progress,
            inCategory.map((s) => s.id)
          )
          const isActive = meta.id === tab
          return (
            <TabButton
              key={meta.id}
              meta={meta}
              done={done}
              total={total}
              isActive={isActive}
              onSelect={handleSelect}
            />
          )
        })}
      </nav>

      <header className='mb-3 flex items-baseline gap-3'>
        <h3 className='text-2xl font-extrabold text-gray-900'>
          {activeMeta.emoji} {activeMeta.label}
        </h3>
        {activeMeta.badge && (
          <span className='text-sm font-bold text-blue-500'>
            {activeMeta.badge}
          </span>
        )}
      </header>
      <p className='mb-8 text-sm font-medium text-gray-500'>
        {activeMeta.sublabel}
      </p>

      <StageList stages={visible} />
    </div>
  )
}

function TabButton({
  meta,
  done,
  total,
  isActive,
  onSelect,
}: {
  meta: (typeof categoryMeta)[number]
  done: number
  total: number
  isActive: boolean
  onSelect: (id: CategoryId) => void
}) {
  const cleared = total > 0 && done === total
  return (
    <button
      type='button'
      onClick={() => onSelect(meta.id)}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'inline-flex shrink-0 items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-bold transition-all duration-200',
        isActive
          ? 'border-blue-500 bg-blue-500 text-white shadow-[0_4px_12px_-4px_rgba(69,118,252,0.5)]'
          : cleared
            ? 'border-blue-300 bg-blue-200 text-blue-700 hover:bg-blue-300'
            : 'border-gray-200 bg-white text-gray-700 hover:border-blue-500 hover:text-blue-500'
      )}
    >
      <span>{meta.emoji}</span>
      <span>{meta.label}</span>
      {cleared && !isActive && <span className='text-xs'>👑</span>}
      {meta.badge && !cleared && (
        <span
          className={cn('text-xs', isActive ? 'text-white' : 'text-blue-500')}
        >
          {meta.badge}
        </span>
      )}
      <span
        className={cn(
          'rounded-full px-2 font-mono text-[11px]',
          isActive
            ? 'bg-white/20 text-white'
            : cleared
              ? 'bg-blue-300 text-blue-700'
              : 'bg-gray-100 text-gray-500'
        )}
      >
        {done}/{total}
      </span>
    </button>
  )
}

function StageList({ stages }: { stages: Stage[] }) {
  if (stages.length === 0) {
    return (
      <div className='rounded-2xl bg-gray-50 py-16 text-center text-sm text-gray-500'>
        이 탭은 아직 준비 중이에요
      </div>
    )
  }
  return (
    <div className='grid gap-4 sm:grid-cols-2'>
      {stages.map((stage) => (
        <StageCard key={stage.id} stage={stage} />
      ))}
    </div>
  )
}
