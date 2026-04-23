import { notFound } from 'next/navigation'
import { allStages } from '@/data/stages'
import StageDetail from '@/components/stages/StageDetail'

export function generateStaticParams() {
  return allStages.map((s) => ({ id: s.id }))
}

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function StagePage({ params }: PageProps) {
  const { id } = await params
  const stage = allStages.find((s) => s.id === id)
  if (!stage) notFound()
  return <StageDetail stage={stage} />
}
