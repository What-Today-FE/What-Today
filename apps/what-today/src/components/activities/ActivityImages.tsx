import { useImageErrorHandler } from '@/hooks/useImageErrorHandler';

interface ActivityImagesProps {
  bannerImageUrl: string;
  subImages: { id: number; imageUrl: string }[];
}

export default function ActivityImages({ bannerImageUrl, subImages }: ActivityImagesProps) {
  const subImageCount = subImages.length;
  const handleImageError = useImageErrorHandler();

  // 서브 이미지 개수에 따른 레이아웃 클래스 결정
  const getRightGridClass = () => {
    switch (subImageCount) {
      case 0:
        return 'hidden'; // 서브 이미지가 없으면 오른쪽 영역 숨김
      case 1:
        return 'grid grid-cols-1 grid-rows-1';
      case 2:
        return 'grid grid-cols-1 grid-rows-2 gap-8';
      case 3:
        return 'grid grid-cols-2 grid-rows-2 gap-8';
      case 4:
        return 'grid grid-cols-2 grid-rows-2 gap-8';
      default:
        return 'grid grid-cols-2 grid-rows-2 gap-8';
    }
  };

  return (
    <section
      className={`grid h-400 gap-16 overflow-hidden rounded-xl ${subImageCount === 0 ? 'grid-cols-1' : 'grid-cols-2'}`}
    >
      {/* 왼쪽 배너 이미지 */}
      <div className='h-full w-full'>
        <img
          alt='배너 이미지'
          className='h-full w-full rounded-xl object-cover'
          src={bannerImageUrl}
          onError={handleImageError}
        />
      </div>

      {/* 오른쪽 서브 이미지 */}
      {subImageCount > 0 && (
        <div className={`h-full w-full ${getRightGridClass()}`}>
          {subImages.slice(0, 4).map((img, index) => {
            // 서브 이미지가 3개일 때 마지막 이미지는 2칸을 차지하도록 설정
            const isLastImageInThreeSet = subImageCount === 3 && index === 2;

            return (
              <div
                key={img.id}
                className={`h-full w-full overflow-hidden rounded-xl ${isLastImageInThreeSet ? 'col-span-2' : ''}`}
              >
                <img
                  alt='서브 이미지'
                  className='h-full w-full object-cover'
                  src={img.imageUrl}
                  onError={handleImageError}
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
