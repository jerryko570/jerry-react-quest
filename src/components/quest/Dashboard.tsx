'use client'

import { totalExamples, totalStages } from '@/data/stages'
import { achievements } from '@/data/achievements'
import { completedCount, useProgress } from '@/lib/progress'

type DashboardProps = {
  postsDone?: number
  postsTotal?: number
  badgesDone?: number
}

export default function Dashboard({
  postsDone = 0,
  postsTotal = 11,
  badgesDone = 0,
}: DashboardProps) {
  const progress = useProgress()
  const stagesDone = completedCount(progress)
  const percent =
    totalStages === 0 ? 0 : Math.round((stagesDone / totalStages) * 100)
  const badgesTotal = achievements.length

  return (
    <section className='mb-12 rounded-3xl bg-linear-to-br from-[#ff5e48] to-[#ff8a65] p-8 text-white shadow-[0_20px_40px_-20px_rgba(255,94,72,0.4)]'>
      <div className='mb-5 flex flex-wrap items-end justify-between gap-3'>
        <div>
          <div className='text-xs font-semibold tracking-widest uppercase opacity-90'>
            ⚔️ 전체 진도
          </div>
          <div className='mt-1 text-sm opacity-85'>
            프론트엔드 디자이너의 React 정복 퀘스트
          </div>
        </div>
        <div className='font-mono text-5xl leading-none font-bold'>
          {percent}%
        </div>
      </div>

      <div className='mb-6 h-3 overflow-hidden rounded-full bg-white/20'>
        <div
          className='h-full rounded-full bg-white transition-[width] duration-700 ease-out'
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
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
    <div className='rounded-2xl bg-white/15 p-4 backdrop-blur-md'>
      <div className='mb-1 text-xs font-semibold opacity-85'>{label}</div>
      <div className='font-mono text-2xl font-bold'>{value}</div>
    </div>
  )
}
