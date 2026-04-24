import Dashboard from '@/components/quest/Dashboard'
import QuestTabs from '@/components/quest/QuestTabs'
import AchievementGrid from '@/components/quest/Achievement'
import FadeIn from '@/components/ui/FadeIn'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import Text from '@/components/ui/Text'
import { isCategoryId } from '@/data/stages'

type HomeProps = {
  searchParams: Promise<{ tab?: string }>
}

export default async function Home({ searchParams }: HomeProps) {
  const { tab } = await searchParams
  const initialTab = isCategoryId(tab) ? tab : 'hooks'

  return (
    <>
      {/* Hero */}
      <Section padding='lg'>
        <FadeIn>
          <div className='flex flex-col items-center text-center'>
            <Badge label='🎮 React Quest' theme='orange' size='md' />
            <Text as='display' className='mt-6 break-keep whitespace-pre-line'>
              {`훅을 눌러보고\n망가뜨리며 체화하는 `}
              <span className='text-orange-500'>놀이터</span>
            </Text>
            <Text as='body' className='mt-6 max-w-xl text-gray-500'>
              이론 먼저 외우지 말고 버튼부터 눌러봐. 28개 스테이지, 모두 직접
              만져보면서 감 잡는 구성이야.
            </Text>
          </div>
        </FadeIn>
      </Section>

      {/* Dashboard */}
      <Section padding='sm'>
        <FadeIn delay={0.1}>
          <Dashboard />
        </FadeIn>
      </Section>

      {/* Tabs */}
      <Section padding='md'>
        <FadeIn delay={0.1}>
          <SectionHeader
            badge='🗺 로드맵'
            title='어디서부터 시작해볼까?'
            description='5개 탭 · 28개 스테이지 · 클리어하면 뱃지 자동 해금'
          />
        </FadeIn>
        <div className='mt-10'>
          <QuestTabs initialTab={initialTab} />
        </div>
      </Section>

      {/* Achievements */}
      <Section padding='lg' className='bg-white'>
        <FadeIn>
          <SectionHeader
            badge='🏆 뱃지'
            title='오늘 어디까지 왔어?'
            description='스테이지를 정복할 때마다 자동으로 해금돼'
          />
        </FadeIn>
        <div className='mt-10'>
          <FadeIn delay={0.1}>
            <AchievementGrid />
          </FadeIn>
        </div>
      </Section>
    </>
  )
}
