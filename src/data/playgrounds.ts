import type { ComponentType } from 'react'
import UseMemoPlayground from '@/components/playgrounds/usememo'
import RenderingPlayground from '@/components/playgrounds/rendering'
import UseStatePlayground from '@/components/playgrounds/usestate'
import UseEffectPlayground from '@/components/playgrounds/useeffect'
import CustomHooksPlayground from '@/components/playgrounds/custom-hooks'
import UseRefPlayground from '@/components/playgrounds/useref'
import ErrorBoundaryPlayground from '@/components/playgrounds/error-boundary'

export const playgrounds: Record<string, ComponentType> = {
  'stage-1-rendering': RenderingPlayground,
  'stage-2-usememo': UseMemoPlayground,
  'stage-5-usestate': UseStatePlayground,
  'stage-6-useeffect': UseEffectPlayground,
  'stage-7-custom-hooks': CustomHooksPlayground,
  'stage-8-useref': UseRefPlayground,
  'stage-error-boundary': ErrorBoundaryPlayground,
}

export const hasPlayground = (stageId: string): boolean =>
  stageId in playgrounds
