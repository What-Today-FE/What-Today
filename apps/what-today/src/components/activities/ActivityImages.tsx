import { useImageErrorHandler } from '@/hooks/useImageErrorHandler';

interface ActivityImagesProps {
  bannerImageUrl: string;
  subImages: { id: number; imageUrl: string }[];
}

export default function ActivityImages({ bannerImageUrl, subImages }: ActivityImagesProps) {
  const subImageCount = subImages.length;
  const handleImageError = useImageErrorHandler();

  return (
    <section className={`grid h-400 grid-cols-${subImageCount === 0 ? '1' : '2'} rounded-xl'} gap-8`}>
      {/* 왼쪽 메인이미지 */}
      <div className='h-full w-full overflow-hidden rounded-xl border border-gray-200'>
        <img alt='배너 이미지' className='h-full w-full object-cover' src={bannerImageUrl} onError={handleImageError} />
      </div>

      {/* 오른쪽 서브 이미지 */}
      {subImageCount > 0 && (
        <div className='h-full w-full'>
          {/* 1개일 때: 전체 영역 사용 */}
          {subImageCount === 1 && (
            <div className='h-full w-full overflow-hidden rounded-xl border border-gray-200'>
              <img
                alt='서브 이미지'
                className='h-full w-full object-cover object-center'
                src={subImages[0].imageUrl}
                onError={handleImageError}
              />
            </div>
          )}

          {/* 2개일 때: 세로로 2분할 */}
          {subImageCount === 2 && (
            <div className='h-full w-full'>
              <div className='grid h-400 w-full grid-rows-[196px_196px] gap-8'>
                <div className='overflow-hidden rounded-xl border border-gray-200'>
                  <img
                    alt='서브 이미지 1'
                    className='h-full w-full object-cover object-center'
                    src={subImages[0].imageUrl}
                    onError={handleImageError}
                  />
                </div>
                <div className='overflow-hidden rounded-xl border border-gray-200'>
                  <img
                    alt='서브 이미지 2'
                    className='h-full w-full object-cover object-center'
                    src={subImages[1].imageUrl}
                    onError={handleImageError}
                  />
                </div>
              </div>
            </div>
          )}

          {/* 3개일 때: 2x2 그리드 + 마지막 이미지 col-span-2 */}
          {subImageCount === 3 && (
            <div className='h-full w-full'>
              <div className='grid h-400 w-full grid-cols-2 grid-rows-[196px_196px] gap-8'>
                {/* 이미지 1 */}
                <div className='overflow-hidden rounded-xl border border-gray-200'>
                  <img
                    alt='서브 이미지 1'
                    className='h-full w-full object-cover object-center'
                    src={subImages[0].imageUrl}
                    onError={handleImageError}
                  />
                </div>

                {/* 이미지 2 */}
                <div className='overflow-hidden rounded-xl border border-gray-200'>
                  <img
                    alt='서브 이미지 2'
                    className='h-full w-full object-cover object-center'
                    src={subImages[1].imageUrl}
                    onError={handleImageError}
                  />
                </div>

                {/* 이미지 3 - col-span-2 */}
                <div className='col-span-2 overflow-hidden rounded-xl border border-gray-200'>
                  <img
                    alt='서브 이미지 3'
                    className='h-full w-full object-cover object-center'
                    src={subImages[2].imageUrl}
                    onError={handleImageError}
                  />
                </div>
              </div>
            </div>
          )}

          {/* 4개일 때: 2x2 격자 */}
          {subImageCount === 4 && (
            <div className='h-full w-full'>
              <div className='grid h-400 w-full grid-cols-2 grid-rows-[196px_196px] gap-8'>
                {subImages.slice(0, 4).map((img, index) => (
                  <div key={img.id} className='overflow-hidden rounded-xl border border-gray-200'>
                    <img
                      alt={`서브 이미지 ${index + 1}`}
                      className='h-full w-full object-cover object-center'
                      src={img.imageUrl}
                      onError={handleImageError}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
