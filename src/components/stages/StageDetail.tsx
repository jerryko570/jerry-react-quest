import Link from 'next/link'
import { categoryMeta, type Stage } from '@/data/stages'
import { hasPlayground, playgrounds } from '@/data/playgrounds'
import {
  difficultyBadge,
  difficultyLabel,
} from '@/components/quest/StageCard.variants'
import CompleteButton from './CompleteButton'
import PlaygroundPlaceholder from './PlaygroundPlaceholder'

type Props = {
  stage: Stage
}

export default function StageDetail({ stage }: Props) {
  const category = categoryMeta.find((c) => c.id === stage.category)
  const Playground = playgrounds[stage.id]

  return (
    <div className='mx-auto max-w-240 px-6 py-10'>
      <nav className='mb-6 flex flex-wrap items-center gap-1 text-sm text-gray-500'>
        <Link href='/' className='hover:text-[#ff5e48]'>
          🎮 Quest
        </Link>
        <span>/</span>
        <Link href={`/?tab=${stage.category}`} className='hover:text-[#ff5e48]'>
          {category?.emoji} {category?.label}
        </Link>
        <span>/</span>
        <span className='font-semibold text-gray-800'>{stage.title}</span>
      </nav>

      <header className='mb-8'>
        <div className='mb-3 flex items-center gap-3'>
          <span className='text-5xl'>{stage.emoji}</span>
          <div>
            <h1 className='text-3xl font-extrabold tracking-tight sm:text-4xl'>
              {stage.title}
            </h1>
            <p className='mt-1 text-gray-500'>{stage.subtitle}</p>
          </div>
        </div>
        <div className='flex flex-wrap items-center gap-2'>
          <span className={difficultyBadge({ difficulty: stage.difficulty })}>
            {difficultyLabel[stage.difficulty]}
          </span>
          {stage.highlight && (
            <span className='text-xs font-bold text-[#ff5e48]'>
              {stage.highlight}
            </span>
          )}
          <span className='text-xs text-gray-500'>⏱ {stage.hours}시간</span>
          {stage.status === 'locked' && !hasPlayground(stage.id) && (
            <span className='ml-2 text-xs font-bold text-gray-500'>
              🔒 잠김 — 미리보기
            </span>
          )}
        </div>
      </header>

      <section className='mb-10 grid gap-5 rounded-2xl bg-white p-6 ring-1 ring-gray-100 md:grid-cols-2'>
        <Bullets title='🎯 학습 목표' items={stage.goals} />
        <Bullets title={`🎮 ${stage.examplesLabel}`} items={stage.examples} />
      </section>

      <section>
        <div className='mb-4 flex items-end justify-between'>
          <h2 className='text-xl font-extrabold'>🕹️ 놀이기구</h2>
          {Playground && (
            <span className='text-xs text-gray-500'>
              아래에서 직접 눌러보고 망가뜨려봐
            </span>
          )}
        </div>
        {Playground ? (
          <Playground />
        ) : (
          <PlaygroundPlaceholder stageTitle={stage.title} />
        )}
      </section>

      <section className='mt-10'>
        <CompleteButton stageId={stage.id} />
      </section>

      <div className='mt-10 flex justify-center'>
        <Link
          href={`/?tab=${stage.category}`}
          className='inline-flex items-center gap-2 rounded-full border-2 border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:border-[#ff5e48] hover:text-[#ff5e48]'
        >
          ← {category?.emoji} {category?.label} 로 돌아가기
        </Link>
      </div>
    </div>
  )
}

function Bullets({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className='mb-2 text-xs font-bold tracking-[0.08em] text-gray-500 uppercase'>
        {title}
      </div>
      <ul className='flex flex-col gap-1.5'>
        {items.map((text) => (
          <li
            key={text}
            className='flex items-start gap-2 text-sm leading-snug'
          >
            <span className='shrink-0 font-mono text-gray-400'>▸</span>
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
