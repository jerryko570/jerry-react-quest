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
    <footer className='mt-14 bg-gradient-to-br from-[#fff8ec] to-[#fef0e8]'>
      <div className='mx-auto max-w-240 px-6 py-10 text-center'>
        <h3 className='mb-2 text-lg font-extrabold'>🔗 연결된 자산들</h3>
        <p className='mb-5 text-sm text-gray-500'>
          React Quest는 다른 프로젝트들과 이어져 있어요
        </p>
        <div className='flex flex-wrap justify-center gap-3'>
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 rounded-full border-2 border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ff5e48] hover:text-[#ff5e48]'
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
