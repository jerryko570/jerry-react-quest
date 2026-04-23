type Props = {
  code: string
  filename?: string
  lang?: string
}

export default function CodeBlock({ code, filename, lang = 'tsx' }: Props) {
  return (
    <div className='overflow-hidden rounded-xl bg-gray-900 shadow-sm ring-1 ring-gray-800'>
      <div className='flex items-center justify-between border-b border-gray-800 px-4 py-2 text-xs text-gray-400'>
        <span className='font-mono'>{filename ?? '예시 코드'}</span>
        <span className='rounded bg-gray-800 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase'>
          {lang}
        </span>
      </div>
      <pre className='overflow-x-auto p-4 font-mono text-[12px] leading-relaxed text-gray-100'>
        <code>{code}</code>
      </pre>
    </div>
  )
}
