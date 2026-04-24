'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'

type FadeInProps = {
  children: ReactNode
  delay?: number
  duration?: number
  y?: number
  className?: string
  amount?: number
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  y = 30,
  className,
  amount = 0.2,
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
