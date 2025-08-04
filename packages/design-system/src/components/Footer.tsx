import { DesignIcon, GithubIcon } from './icons';
import { ImageLogo, TextLogo } from './logos';

export default function Footer() {
  return (
    <footer className='bg-gray-25 caption-text mx-auto w-full border-t border-gray-100 py-24 text-gray-300'>
      <div className='mx-auto flex h-60 w-full max-w-7xl justify-between px-[5vw]'>
        <div className='flex flex-col justify-between'>
          <div className='flex items-center gap-6 grayscale filter'>
            <ImageLogo className='size-26 h-fit' />
            <TextLogo className='size-68 h-fit' />
          </div>
          <p>매일이 새로워지는 하루</p>
        </div>

        <div className='flex flex-col justify-between'>
          <div className='flex justify-end gap-12'>
            <a
              aria-label='GitHub'
              className='group rounded-full p-2'
              href='https://what-today-design-system.vercel.app/docs'
              rel='noopener noreferrer'
              target='_blank'
              title='디자인 시스템 바로가기'
            >
              <DesignIcon className='size-22' color='var(--color-gray-600)' />
            </a>
            <a
              aria-label='GitHub'
              className='group rounded-full p-2'
              href='https://github.com/What-Today-FE/What-Today'
              rel='noopener noreferrer'
              target='_blank'
              title='깃허브 저장소 바로가기'
            >
              <GithubIcon className='size-22' color='var(--color-gray-600)' />
            </a>
          </div>

          <p>© CODEIT FE 15</p>
        </div>
      </div>
    </footer>
  );
}
