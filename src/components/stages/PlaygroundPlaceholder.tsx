import Link from 'next/link'

type Props = {
  stageTitle: string
}

export default function PlaygroundPlaceholder({ stageTitle }: Props) {
  return (
    <div className='rounded-2xl border-2 border-dashed border-gray-200 bg-white/50 p-10 text-center'>
      <div className='mb-3 text-5xl'>🛠️</div>
      <h3 className='mb-2 text-xl font-extrabold'>놀이기구 제작 중</h3>
      <p className='mx-auto max-w-md text-sm text-gray-500'>
        <b>{stageTitle}</b>의 인터랙티브 데모는 다음 스프린트에 들어와. 일단
        위의 학습 목표 + 만들 예제 리스트부터 훑어봐.
      </p>
      <Link
        href='/'
        className='mt-5 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:border-[#4576fc] hover:text-[#4576fc]'
      >
        ← 로드맵으로 돌아가기
      </Link>
    </div>
  )
}
