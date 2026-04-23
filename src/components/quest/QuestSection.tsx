import type { Section } from '@/data/stages'
import StageCard from './StageCard'

type QuestSectionProps = {
  section: Section
}

export default function QuestSection({ section }: QuestSectionProps) {
  return (
    <section className='mb-12'>
      <header className='mb-6 border-b-2 border-gray-100 pb-4'>
        <h2 className='mb-1 text-2xl font-extrabold'>{section.label}</h2>
        <p className='text-sm text-gray-500'>{section.sublabel}</p>
      </header>

      <div className='flex flex-col gap-4'>
        {section.stages.map((stage) => (
          <StageCard key={stage.id} stage={stage} />
        ))}
      </div>
    </section>
  )
}
