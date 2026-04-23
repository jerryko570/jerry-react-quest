import { ReactNode } from 'react'

export default function PerfAdvancedGoalViz() {
  return (
    <section>
      <header className='mb-4'>
        <h3 className='text-lg font-extrabold'>🎯 학습 목표 — 풀어서 보기</h3>
        <p className='text-sm text-gray-500'>
          리렌더 최적화로 못 잡는 병목은 &quot;번들·이미지·인터랙션&quot;에서
          잡는다.
        </p>
      </header>

      <div className='grid gap-4 md:grid-cols-2'>
        <GoalCard
          index='1'
          emoji='✂️'
          title='코드 스플리팅'
          hook='초기 번들은 작게, 나머지는 필요할 때'
        >
          <p>
            사용자가 첫 화면을 보려고 받아야 하는 JS가 작을수록 빨라. 당장 안
            쓰는 차트·모달·에디터 같은 건 별도 청크로 분리.
          </p>
          <ul className='mt-2 space-y-1 text-[13px]'>
            <li>🎯 Next.js App Router — 페이지별 자동 분할</li>
            <li>
              🎯 <code>next/dynamic</code> — 특정 컴포넌트만 지연 로드
            </li>
            <li>
              🎯 <code>React.lazy + Suspense</code> — 순수 React 환경
            </li>
          </ul>
        </GoalCard>

        <GoalCard
          index='2'
          emoji='🖼️'
          title='Image · Font 최적화'
          hook='Next.js 내장 기능만 써도 절반은 해결'
        >
          <p>LCP의 주범은 대부분 큰 이미지와 폰트.</p>
          <ul className='mt-2 space-y-1 text-[13px]'>
            <li>
              🖼️ <code>next/image</code> — 자동 포맷 변환(WebP/AVIF), 크기별
              srcset, lazy loading
            </li>
            <li>
              🔤 <code>next/font</code> — 셀프 호스팅 변환, size-adjust로 CLS
              제거
            </li>
          </ul>
        </GoalCard>

        <GoalCard
          index='3'
          emoji='📦'
          title='Bundle Analyzer로 크기 분석'
          hook='측정 안 하면 추측만 한다'
        >
          <p>
            <code>@next/bundle-analyzer</code>로 어느 모듈이 번들에서 큰 자리를
            차지하는지 시각화. 의외의 라이브러리가 범인인 경우가 많음.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`# 설치
npm i -D @next/bundle-analyzer

# next.config.ts
import analyzer from '@next/bundle-analyzer'
export default analyzer({ enabled: !!process.env.ANALYZE })(config)

# 분석 실행
ANALYZE=true npm run build`}
          </pre>
        </GoalCard>

        <GoalCard
          index='4'
          emoji='📊'
          title='Web Vitals 개선 (LCP · INP · CLS)'
          hook='사용자가 느끼는 3가지 속도 감각'
        >
          <p>이 세 지표가 Google 검색 순위와 연결돼 있어.</p>
          <ul className='mt-2 space-y-1 text-[13px]'>
            <li>
              <b>LCP</b> — 메인 콘텐츠 뜨는 시간. 이미지 priority로 개선
            </li>
            <li>
              <b>INP</b> — 버튼 눌러서 반응까지 걸리는 시간. 무거운 JS 줄이기
            </li>
            <li>
              <b>CLS</b> — 화면이 튀는 정도. 이미지/폰트에 크기 지정
            </li>
          </ul>
          <p className='mt-3 rounded-lg bg-amber-50 p-2 text-[12px] text-amber-900'>
            ⚠️ Lighthouse 점수를 70 → 95로 올리는 건 보통 이 3가지의 한두 단계만
            다듬으면 가능.
          </p>
        </GoalCard>
      </div>
    </section>
  )
}

function GoalCard({
  index,
  emoji,
  title,
  hook,
  children,
}: {
  index: string
  emoji: string
  title: string
  hook: string
  children: ReactNode
}) {
  return (
    <article className='rounded-2xl border-2 border-gray-100 bg-white p-5'>
      <header className='mb-3 flex items-start gap-3'>
        <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-900 font-mono text-xs font-bold text-white'>
          {index}
        </span>
        <div>
          <h4 className='font-extrabold'>
            <span className='mr-1'>{emoji}</span>
            {title}
          </h4>
          <p className='mt-0.5 text-xs text-[#ff5e48]'>💡 {hook}</p>
        </div>
      </header>
      <div className='space-y-2 text-sm text-gray-700'>{children}</div>
    </article>
  )
}
