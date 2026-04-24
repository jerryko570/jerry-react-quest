'use client'

import { ReactNode, createContext, useContext, useId, useState } from 'react'
import { cn } from '@/lib/cn'

type TabsContextValue = {
  value: string
  setValue: (v: string) => void
  id: string
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabs() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tabs sub-component must be inside <Tabs>')
  return ctx
}

function Tabs({
  defaultValue,
  children,
}: {
  defaultValue: string
  children: ReactNode
}) {
  const [value, setValue] = useState(defaultValue)
  const id = useId()
  return (
    <TabsContext.Provider value={{ value, setValue, id }}>
      <div>{children}</div>
    </TabsContext.Provider>
  )
}

function TabList({ children }: { children: ReactNode }) {
  return (
    <div role='tablist' className='flex gap-1 rounded-full bg-gray-100 p-1'>
      {children}
    </div>
  )
}

function Tab({
  value: ownValue,
  children,
}: {
  value: string
  children: ReactNode
}) {
  const { value, setValue, id } = useTabs()
  const active = value === ownValue
  return (
    <button
      type='button'
      role='tab'
      aria-selected={active}
      aria-controls={`${id}-panel-${ownValue}`}
      id={`${id}-tab-${ownValue}`}
      onClick={() => setValue(ownValue)}
      className={cn(
        'rounded-full px-4 py-1.5 text-xs font-bold transition',
        active
          ? 'bg-white text-gray-900 shadow'
          : 'text-gray-500 hover:text-gray-800'
      )}
    >
      {children}
    </button>
  )
}

function TabPanel({
  value: ownValue,
  children,
}: {
  value: string
  children: ReactNode
}) {
  const { value, id } = useTabs()
  if (value !== ownValue) return null
  return (
    <div
      role='tabpanel'
      id={`${id}-panel-${ownValue}`}
      aria-labelledby={`${id}-tab-${ownValue}`}
      className='mt-4 rounded-lg bg-white p-4 ring-1 ring-gray-200'
    >
      {children}
    </div>
  )
}

// Compound 패턴 — 정적 프로퍼티로 묶기
Tabs.List = TabList
Tabs.Tab = Tab
Tabs.Panel = TabPanel

export default function CompoundDemo() {
  return (
    <div className='rounded-xl bg-white p-4 ring-1 ring-gray-200'>
      <div className='mb-3 text-xs font-bold tracking-wider text-gray-500 uppercase'>
        🧩 Compound Component — Tabs 예시
      </div>

      <Tabs defaultValue='button'>
        <Tabs.List>
          <Tabs.Tab value='button'>Button</Tabs.Tab>
          <Tabs.Tab value='input'>Input</Tabs.Tab>
          <Tabs.Tab value='badge'>Badge</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value='button'>
          <div className='flex flex-wrap gap-2'>
            <button className='rounded-full bg-[#4576fc] px-4 py-2 text-sm font-bold text-white'>
              Primary
            </button>
            <button className='rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-bold text-gray-700'>
              Secondary
            </button>
            <button className='rounded-full bg-gray-900 px-4 py-2 text-sm font-bold text-white'>
              Dark
            </button>
          </div>
        </Tabs.Panel>

        <Tabs.Panel value='input'>
          <input
            placeholder='이메일 입력'
            className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#4576fc] focus:outline-none'
          />
        </Tabs.Panel>

        <Tabs.Panel value='badge'>
          <div className='flex flex-wrap gap-2'>
            <span className='rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-800'>
              SUCCESS
            </span>
            <span className='rounded-full bg-amber-100 px-2 py-1 text-xs font-bold text-amber-800'>
              WARN
            </span>
            <span className='rounded-full bg-red-100 px-2 py-1 text-xs font-bold text-red-800'>
              ERROR
            </span>
          </div>
        </Tabs.Panel>
      </Tabs>

      <p className='mt-3 text-[11px] text-gray-500'>
        사용 측은 <code>&lt;Tabs&gt;&lt;Tabs.List&gt;&lt;Tabs.Tab&gt;...</code>{' '}
        처럼 조립식으로 구성. 상태는 Context에 감춰져 있고, 레이아웃은 사용자가
        자유롭게.
      </p>
    </div>
  )
}
