import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function Home() {
  return (
    <div className='mx-auto max-w-6xl px-6 py-16 sm:py-24'>
      <section className='flex flex-col items-center gap-6 text-center'>
        <Badge label='🎢 놀이기구처럼 체험하는 React' theme='orange' />
        <h1 className='text-4xl font-bold tracking-tight sm:text-6xl'>
          훅이 뭔지 감이 안 와?
          <br />
          <span className='text-orange-500'>일단 눌러보고 망가뜨려봐.</span>
        </h1>
        <p className='max-w-xl text-base text-gray-500 sm:text-lg'>
          학술적인 설명은 그만. useState, useEffect, useReducer… 직접 손으로
          만져보는 React 훅 놀이터.
        </p>
        <div className='flex flex-wrap justify-center gap-3'>
          <Button label='🎮 훅 둘러보기' size='lg' href='/hooks' />
          <Button label='About' size='lg' variant='white' href='/about' />
        </div>
      </section>

      <section className='mt-24 grid gap-4 sm:grid-cols-3'>
        <Card theme='lightOrange' interactive>
          <h3 className='text-xl font-bold'>useState</h3>
          <p className='mt-2 text-sm text-gray-600'>
            상태가 바뀌면 화면이 바뀐다. 버튼을 누르고 숫자가 요동치는 걸
            구경하자.
          </p>
        </Card>
        <Card theme='lightSky' interactive>
          <h3 className='text-xl font-bold'>useEffect</h3>
          <p className='mt-2 text-sm text-gray-600'>
            언제 실행될지, 왜 무한루프에 빠지는지 — 의존성 배열을 직접
            괴롭혀보자.
          </p>
        </Card>
        <Card theme='gray' interactive>
          <h3 className='text-xl font-bold'>useReducer</h3>
          <p className='mt-2 text-sm text-gray-600'>
            상태가 복잡해지면? 액션을 쏘고 리듀서가 받는 구조를 놀이기구로 체험.
          </p>
        </Card>
      </section>
    </div>
  )
}
