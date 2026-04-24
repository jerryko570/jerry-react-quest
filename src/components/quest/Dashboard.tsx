'use client'

import { totalExamples, totalStages } from '@/data/stages'
import { achievements, unlockedAchievementCount } from '@/data/achievements'
import { completedCount, useProgress } from '@/lib/progress'

type DashboardProps = {
  postsDone?: number
  postsTotal?: number
}

export default function Dashboard({
  postsDone = 0,
  postsTotal = 11,
}: DashboardProps) {
  const progress = useProgress()
  const stagesDone = completedCount(progress)
  const badgesDone = unlockedAchievementCount(progress)
  const percent =
    totalStages === 0 ? 0 : Math.round((stagesDone / totalStages) * 100)
  const badgesTotal = achievements.length

  return (
    <section className='mb-12 rounded-2xl bg-white p-8 ring-1 ring-gray-100'>
      <header className='mb-6 flex flex-wrap items-end justify-between gap-3'>
        <div>
          <h3 className='text-2xl leading-tight font-extrabold text-gray-900'>
            ⚔️ 전체 진도
          </h3>
          <p className='mt-2 text-sm font-medium text-gray-500'>
            프론트엔드 디자이너의 React 정복 퀘스트
          </p>
        </div>
        <div className='font-mono text-5xl leading-none font-extrabold text-blue-500'>
          {percent}%
        </div>
      </header>

      <div className='mb-6 h-2 overflow-hidden rounded-full bg-gray-100'>
        <div
          className='h-full rounded-full bg-blue-500 transition-[width] duration-700 ease-out'
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
        <Stat label='🎯 스테이지' value={`${stagesDone} / ${totalStages}`} />
        <Stat label='🧪 예제' value={`— / ${totalExamples}`} />
        <Stat label='📝 블로그' value={`${postsDone} / ${postsTotal}`} />
        <Stat label='🏆 뱃지' value={`${badgesDone} / ${badgesTotal}`} />
      </div>
    </section>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className='rounded-xl bg-gray-50 p-4'>
      <div className='mb-1 text-xs font-semibold text-gray-500'>{label}</div>
      <div className='font-mono text-xl font-extrabold text-gray-900'>
        {value}
      </div>
    </div>
  )
}
