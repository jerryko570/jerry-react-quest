const items = [
  { icon: '✅', label: '완료' },
  { icon: '🔓', label: '진행 가능' },
  { icon: '🔒', label: '잠김' },
  { icon: '👑', label: '보스전' },
]

export default function Legend() {
  return (
    <div className='mb-8 flex flex-wrap gap-5 rounded-2xl bg-white px-6 py-5 text-sm text-gray-500'>
      {items.map(({ icon, label }) => (
        <div key={label} className='flex items-center gap-1.5'>
          <span>{icon}</span>
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}
