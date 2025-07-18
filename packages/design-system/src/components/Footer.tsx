export default function Footer() {
  return (
    <footer className='mt-40 w-full border-t-1 border-gray-300'>
      <div className='grid grid-cols-1 gap-10 p-20 py-80 text-xl md:grid-cols-3 md:px-100'>
        <div className='flex md:items-start'>
          <p className='text-gray-400'>©2025.07</p>
        </div>
        <div className='flex gap-2 md:flex-row md:justify-center md:gap-4'>
          <p className='text-gray-400'>Privacy policy</p>
          <span className='text-gray-400'>·</span>
          <p className='text-gray-400'>FAQ</p>
        </div>
        <div className='flex gap-2 md:flex-row md:justify-end md:gap-4'>
          <a
            aria-label='GitHub repository'
            className='flex'
            href='https://github.com/What-Today-FE/What-Today'
            rel='noopener noreferrer'
            target='_blank'
          >
            Github
          </a>
          <a>Design</a>
        </div>
      </div>
    </footer>
  );
}
