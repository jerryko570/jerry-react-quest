export default function Footer() {
  return (
    <footer className='mt-auto border-t border-gray-100 bg-white py-6'>
      <div className='mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 text-sm text-gray-500 sm:flex-row'>
        <p>© {new Date().getFullYear()} React Playground</p>
        <p className='text-xs'>일단 눌러보고 망가뜨려봐 🔨</p>
      </div>
    </footer>
  )
}
