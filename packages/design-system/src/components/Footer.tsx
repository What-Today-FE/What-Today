import { GithubIcon } from './icons';
import { ImageLogo } from './logos';
import { TextLogo } from './logos';
export default function Footer() {
  return (
    <footer className='mt-80 w-full border-t border-gray-100 bg-white py-24'>
      <div className='mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-[5vw] text-center md:grid-cols-2 md:text-left'>
        {/* 🔹 왼쪽: 비전 메시지 + 로고 */}
        <div className='flex flex-col items-center gap-4 md:items-start'>
          <a
            className='flex items-center gap-2 transition hover:scale-105'
            href='https://what-today-design-system.vercel.app/docs'
          >
            <ImageLogo className='size-36' />
            <TextLogo className='size-80 text-sky-500' />
          </a>
          <h2 className='text-lg font-bold text-gray-700 md:text-xl'>오늘뭐해는</h2>
          <p className='text-md leading-relaxed text-gray-500 md:text-lg'>
            무의미한 일상 속에서 <br className='sm:hidden' />
            작은 설렘을 주는 플랫폼이에요 🎈
          </p>
        </div>

        {/* 🔹 오른쪽: GitHub + 날짜 (데스크탑 전용) */}
        <div className='flex flex-col items-center justify-center gap-4 md:mt-40 md:items-end'>
          <p className='text-lg text-gray-400 md:text-xl'>© 2025.07</p>
          <a
            aria-label='GitHub'
            className='group rounded-full p-2 transition hover:scale-105'
            href='https://github.com/What-Today-FE/What-Today'
            rel='noopener noreferrer'
            target='_blank'
          >
            <GithubIcon className='size-36 transition-transform group-hover:rotate-6' />
          </a>
        </div>
      </div>
    </footer>
  );
}
