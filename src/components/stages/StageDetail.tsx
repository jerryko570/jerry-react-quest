import Link from 'next/link'
import Text from '@/components/ui/Text'
import Section from '@/components/ui/Section'
import FadeIn from '@/components/ui/FadeIn'
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
    <>
      <Section padding='md'>
        <nav className='mb-6 flex flex-wrap items-center gap-1.5 text-sm text-gray-500'>
          <Link href='/' className='hover:text-[#ff5e48]'>
            🎮 Quest
          </Link>
          <span>/</span>
          <Link
            href={`/?tab=${stage.category}`}
            className='hover:text-[#ff5e48]'
          >
            {category?.emoji} {category?.label}
          </Link>
          <span>/</span>
          <span className='font-semibold text-gray-800'>{stage.title}</span>
        </nav>

        <FadeIn>
          <header className='flex flex-col gap-5'>
            <div className='flex items-center gap-5'>
              <span className='text-6xl sm:text-7xl'>{stage.emoji}</span>
              <div>
                <Text as='h2' className='font-extrabold'>
                  {stage.title}
                </Text>
                <Text as='body' className='mt-2 text-gray-500'>
                  {stage.subtitle}
                </Text>
              </div>
            </div>
            <div className='flex flex-wrap items-center gap-2'>
              <span
                className={difficultyBadge({ difficulty: stage.difficulty })}
              >
                {difficultyLabel[stage.difficulty]}
              </span>
              {stage.highlight && (
                <Text as='caption' className='font-bold text-[#ff5e48]'>
                  {stage.highlight}
                </Text>
              )}
              <Text as='caption' className='text-gray-500'>
                ⏱ {stage.hours}시간
              </Text>
              {stage.status === 'locked' && !hasPlayground(stage.id) && (
                <Text as='caption' className='ml-2 font-bold text-gray-500'>
                  🔒 잠김 — 미리보기
                </Text>
              )}
            </div>
          </header>
        </FadeIn>
      </Section>

      <Section padding='md' className='bg-white'>
        <FadeIn delay={0.1}>
          {Playground ? (
            <Playground />
          ) : (
            <PlaygroundPlaceholder stageTitle={stage.title} />
          )}
        </FadeIn>
      </Section>

      <Section padding='md'>
        <FadeIn>
          <CompleteButton stageId={stage.id} />
        </FadeIn>
        <div className='mt-10 flex justify-center'>
          <Link
            href={`/?tab=${stage.category}`}
            className='inline-flex items-center gap-2 rounded-full border-2 border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:-translate-y-0.5 hover:border-[#ff5e48] hover:text-[#ff5e48]'
          >
            ← {category?.emoji} {category?.label}로 돌아가기
          </Link>
        </div>
      </Section>
    </>
  )
}
