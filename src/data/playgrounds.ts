import type { ComponentType } from 'react'
import UseMemoPlayground from '@/components/playgrounds/usememo'
import UseCallbackPlayground from '@/components/playgrounds/usecallback'
import ReactMemoPlayground from '@/components/playgrounds/react-memo'
import ReactCompilerPlayground from '@/components/playgrounds/react-compiler'
import BossRenderingPlayground from '@/components/playgrounds/boss-rendering'
import PerfAdvancedPlayground from '@/components/playgrounds/perf-advanced'
import RenderingPlayground from '@/components/playgrounds/rendering'
import UseStatePlayground from '@/components/playgrounds/usestate'
import UseEffectPlayground from '@/components/playgrounds/useeffect'
import CustomHooksPlayground from '@/components/playgrounds/custom-hooks'
import UseRefPlayground from '@/components/playgrounds/useref'
import ErrorBoundaryPlayground from '@/components/playgrounds/error-boundary'

export const playgrounds: Record<string, ComponentType> = {
  // 🎣 훅
  'stage-1-rendering': RenderingPlayground,
  'stage-5-usestate': UseStatePlayground,
  'stage-6-useeffect': UseEffectPlayground,
  'stage-7-custom-hooks': CustomHooksPlayground,
  'stage-8-useref': UseRefPlayground,
  'stage-error-boundary': ErrorBoundaryPlayground,
  // ⚡ 성능
  'stage-2-usememo': UseMemoPlayground,
  'stage-3-usecallback': UseCallbackPlayground,
  'stage-4-react-memo': ReactMemoPlayground,
  'stage-react-compiler': ReactCompilerPlayground,
  'boss-rendering': BossRenderingPlayground,
  'stage-perf-advanced': PerfAdvancedPlayground,
}

export const hasPlayground = (stageId: string): boolean =>
  stageId in playgrounds
