import type { ComponentType } from 'react'
import UseMemoPlayground from '@/components/playgrounds/usememo'

export const playgrounds: Record<string, ComponentType> = {
  'stage-2-usememo': UseMemoPlayground,
}

export const hasPlayground = (stageId: string): boolean =>
  stageId in playgrounds
