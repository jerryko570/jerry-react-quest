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
import UseContextPlayground from '@/components/playgrounds/usecontext'
import UseReducerPlayground from '@/components/playgrounds/usereducer'
import TanStackQueryPlayground from '@/components/playgrounds/tanstack-query'
import StateLibsPlayground from '@/components/playgrounds/state-libs'
import SuspenseUsePlayground from '@/components/playgrounds/suspense-use'
import React19ActionsPlayground from '@/components/playgrounds/react-19-actions'
import AppRouterPlayground from '@/components/playgrounds/app-router'
import NextjsRoutingPlayground from '@/components/playgrounds/nextjs-routing'
import DataFetchingPlayground from '@/components/playgrounds/data-fetching'
import AuthPatternsPlayground from '@/components/playgrounds/auth-patterns'

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
  // 🗂 상태 관리
  'stage-9-usecontext': UseContextPlayground,
  'stage-10-usereducer': UseReducerPlayground,
  'stage-tanstack-query': TanStackQueryPlayground,
  'stage-state-libs': StateLibsPlayground,
  // 🌊 API
  'stage-suspense-use': SuspenseUsePlayground,
  'stage-react-19-actions': React19ActionsPlayground,
  'bonus-app-router': AppRouterPlayground,
  'stage-nextjs-routing': NextjsRoutingPlayground,
  'stage-data-fetching': DataFetchingPlayground,
  'stage-auth-patterns': AuthPatternsPlayground,
}

export const hasPlayground = (stageId: string): boolean =>
  stageId in playgrounds
