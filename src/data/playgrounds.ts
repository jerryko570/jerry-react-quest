import type { ComponentType } from 'react'
import UseMemoPlayground from '@/components/playgrounds/usememo'
import RenderingPlayground from '@/components/playgrounds/rendering'
import UseStatePlayground from '@/components/playgrounds/usestate'
import ErrorBoundaryPlayground from '@/components/playgrounds/error-boundary'

export const playgrounds: Record<string, ComponentType> = {
  'stage-1-rendering': RenderingPlayground,
  'stage-2-usememo': UseMemoPlayground,
  'stage-5-usestate': UseStatePlayground,
  'stage-error-boundary': ErrorBoundaryPlayground,
}

export const hasPlayground = (stageId: string): boolean =>
  stageId in playgrounds
