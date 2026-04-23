'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  allStages,
  categoryMeta,
  type CategoryId,
  type Stage,
} from '@/data/stages'
import { cn } from '@/lib/cn'
import StageCard from './StageCard'

type QuestTabsProps = {
  initialTab: CategoryId
}

export default function QuestTabs({ initialTab }: QuestTabsProps) {
  const router = useRouter()
  const [tab, setTab] = useState<CategoryId>(initialTab)

  const activeMeta = categoryMeta.find((c) => c.id === tab) ?? categoryMeta[0]
  const visible = allStages.filter((s) => s.category === tab)

  const handleSelect = (next: CategoryId) => {
    if (next === tab) return
    setTab(next)
    router.replace(`/?tab=${next}`, { scroll: false })
  }

  return (
    <section className='mb-12'>
      <nav
        aria-label='Quest 카테고리'
        className='-mx-2 mb-6 flex flex-wrap gap-2 overflow-x-auto px-2'
      >
        {categoryMeta.map((meta) => {
          const count = allStages.filter((s) => s.category === meta.id).length
          const isActive = meta.id === tab
          return (
            <TabButton
              key={meta.id}
              meta={meta}
              count={count}
              isActive={isActive}
              onSelect={handleSelect}
            />
          )
        })}
      </nav>

      <header className='mb-6 border-b-2 border-gray-100 pb-4'>
        <h2 className='mb-1 text-2xl font-extrabold'>
          {activeMeta.emoji} {activeMeta.label}{' '}
          {activeMeta.badge && (
            <span className='text-[#ff5e48]'>{activeMeta.badge}</span>
          )}
        </h2>
        <p className='text-sm text-gray-500'>{activeMeta.sublabel}</p>
      </header>

      <StageList stages={visible} />
    </section>
  )
}

function TabButton({
  meta,
  count,
  isActive,
  onSelect,
}: {
  meta: (typeof categoryMeta)[number]
  count: number
  isActive: boolean
  onSelect: (id: CategoryId) => void
}) {
  return (
    <button
      type='button'
      onClick={() => onSelect(meta.id)}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'inline-flex shrink-0 items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-bold transition-all duration-200',
        isActive
          ? 'border-[#ff5e48] bg-[#ff5e48] text-white shadow-[0_4px_12px_-4px_rgba(255,94,72,0.5)]'
          : 'border-gray-200 bg-white text-gray-700 hover:border-[#ff5e48] hover:text-[#ff5e48]'
      )}
    >
      <span>{meta.emoji}</span>
      <span>{meta.label}</span>
      {meta.badge && (
        <span
          className={cn('text-xs', isActive ? 'text-white' : 'text-[#ff5e48]')}
        >
          {meta.badge}
        </span>
      )}
      <span
        className={cn(
          'rounded-full px-1.5 font-mono text-[11px]',
          isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
        )}
      >
        {count}
      </span>
    </button>
  )
}

function StageList({ stages }: { stages: Stage[] }) {
  if (stages.length === 0) {
    return (
      <div className='rounded-2xl bg-gray-50 py-12 text-center text-sm text-gray-500'>
        이 탭은 아직 준비 중이에요
      </div>
    )
  }
  return (
    <div className='flex flex-col gap-4'>
      {stages.map((stage) => (
        <StageCard key={stage.id} stage={stage} />
      ))}
    </div>
  )
}
