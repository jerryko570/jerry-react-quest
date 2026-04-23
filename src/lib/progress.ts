'use client'

import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 'quest-progress-v1'

export type Progress = {
  completedAt: Record<string, number>
}

const emptyProgress: Progress = { completedAt: {} }

let cachedSnapshot: Progress = emptyProgress
let initialized = false

const listeners = new Set<() => void>()

function parseFromStorage(): Progress {
  if (typeof window === 'undefined') return emptyProgress
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyProgress
    const parsed = JSON.parse(raw) as Progress
    if (!parsed || typeof parsed !== 'object') return emptyProgress
    return {
      completedAt:
        parsed.completedAt && typeof parsed.completedAt === 'object'
          ? parsed.completedAt
          : {},
    }
  } catch {
    return emptyProgress
  }
}

function getSnapshot(): Progress {
  if (!initialized && typeof window !== 'undefined') {
    cachedSnapshot = parseFromStorage()
    initialized = true
  }
  return cachedSnapshot
}

function getServerSnapshot(): Progress {
  return emptyProgress
}

function writeToStorage(next: Progress): void {
  if (typeof window === 'undefined') return
  cachedSnapshot = next
  initialized = true
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  listeners.forEach((fn) => fn())
}

function subscribe(fn: () => void): () => void {
  listeners.add(fn)
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      // 다른 탭에서 변경 → 캐시 리프레시 후 알림
      cachedSnapshot = parseFromStorage()
      fn()
    }
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', onStorage)
  }
  return () => {
    listeners.delete(fn)
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', onStorage)
    }
  }
}

export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function markCompleted(stageId: string): void {
  const current = getSnapshot()
  writeToStorage({
    ...current,
    completedAt: {
      ...current.completedAt,
      [stageId]: Date.now(),
    },
  })
}

export function unmarkCompleted(stageId: string): void {
  const current = getSnapshot()
  const next = { ...current.completedAt }
  delete next[stageId]
  writeToStorage({ ...current, completedAt: next })
}

export function isCompleted(stageId: string, progress: Progress): boolean {
  return progress.completedAt[stageId] != null
}

export function completedCount(progress: Progress): number {
  return Object.keys(progress.completedAt).length
}

export function completedInCategory(
  progress: Progress,
  stageIds: string[]
): number {
  return stageIds.filter((id) => progress.completedAt[id] != null).length
}
