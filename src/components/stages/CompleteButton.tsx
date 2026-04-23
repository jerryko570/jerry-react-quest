'use client'

import {
  isCompleted,
  markCompleted,
  unmarkCompleted,
  useProgress,
} from '@/lib/progress'

type Props = {
  stageId: string
}

export default function CompleteButton({ stageId }: Props) {
  const progress = useProgress()
  const done = isCompleted(stageId, progress)
  const completedAt = progress.completedAt[stageId]

  if (done) {
    return (
      <div className='rounded-2xl border-2 border-emerald-400 bg-emerald-50 p-5 text-center'>
        <div className='mb-1 text-2xl'>🏆</div>
        <div className='font-extrabold text-emerald-800'>
          이 스테이지를 정복했어요
        </div>
        <div className='mt-1 text-xs text-emerald-700'>
          {completedAt
            ? new Date(completedAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : ''}
        </div>
        <button
          type='button'
          onClick={() => unmarkCompleted(stageId)}
          className='mt-4 rounded-full border border-emerald-300 bg-white px-4 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100'
        >
          ↩️ 정복 취소하고 다시 연습
        </button>
      </div>
    )
  }

  return (
    <div className='rounded-2xl border-2 border-gray-200 bg-white p-5 text-center'>
      <p className='mb-3 text-sm text-gray-600'>
        놀이기구 전부 눌러봤고, 코드 비교도 이해했으면 아래 버튼으로 정복 인증!
      </p>
      <button
        type='button'
        onClick={() => markCompleted(stageId)}
        className='inline-flex items-center gap-2 rounded-full bg-[#ff5e48] px-6 py-3 font-bold text-white shadow-sm transition hover:bg-[#ec4b36]'
      >
        ✅ 정복했어!
      </button>
    </div>
  )
}
