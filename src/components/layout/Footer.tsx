import Text from '@/components/ui/Text'

const links = [
  { href: 'https://narae-ux-portfolio.vercel.app', label: '🎨 UX 포트폴리오' },
  { href: 'https://jerryko570.github.io', label: "📝 Jerry's blog" },
  {
    href: 'https://github.com/jerryko570/jerry-react-quest',
    label: '💻 GitHub',
  },
]

export default function Footer() {
  return (
    <footer className='mt-16 bg-linear-to-br from-[#fff8ec] to-[#fef0e8]'>
      <div className='mx-auto max-w-6xl px-6 py-16 text-center sm:px-8'>
        <Text as='h5' className='font-extrabold'>
          🔗 연결된 자산들
        </Text>
        <Text as='p' className='mx-auto mt-3 max-w-md text-gray-500'>
          React Quest는 다른 프로젝트들과 이어져 있어요
        </Text>
        <div className='mt-8 flex flex-wrap justify-center gap-3'>
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 rounded-full border-2 border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#4576fc] hover:text-[#4576fc]'
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
