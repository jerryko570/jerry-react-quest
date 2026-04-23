import Dashboard from '@/components/quest/Dashboard'
import Legend from '@/components/quest/Legend'
import QuestTabs from '@/components/quest/QuestTabs'
import AchievementGrid from '@/components/quest/Achievement'
import { isCategoryId } from '@/data/stages'

type HomeProps = {
  searchParams: Promise<{ tab?: string }>
}

export default async function Home({ searchParams }: HomeProps) {
  const { tab } = await searchParams
  const initialTab = isCategoryId(tab) ? tab : 'hooks'

  return (
    <div className='mx-auto max-w-240 px-6 py-12'>
      <section className='mb-14 text-center'>
        <div className='animate-quest-bounce mb-4 text-7xl'>🎮</div>
        <h1 className='mb-3 text-5xl font-black tracking-[-0.02em] sm:text-[56px]'>
          React <span className='text-[#ff5e48]'>Playground</span>
        </h1>
        <p className='text-lg text-gray-500'>
          훅을 눌러보고, 망가뜨리고, 체화하는 놀이터
        </p>
      </section>

      <Dashboard />
      <Legend />

      <QuestTabs initialTab={initialTab} />

      <section className='mb-12'>
        <header className='mb-6 border-b-2 border-gray-100 pb-4'>
          <h2 className='mb-1 text-2xl font-extrabold'>🏆 획득 뱃지</h2>
          <p className='text-sm text-gray-500'>
            스테이지를 깨면 자동으로 해금됩니다
          </p>
        </header>
        <AchievementGrid />
      </section>
    </div>
  )
}
