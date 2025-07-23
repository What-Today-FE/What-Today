export interface BannerItem {
  id: number;
  title: string;
  imageUrl: string;
}

export const dummyBanners: BannerItem[] = [
  {
    id: 1,
    title: '햇살 가득한 해변에서의 휴식',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 2,
    title: '설산을 품은 힐링 트레킹',
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 3,
    title: '야경이 아름다운 도시 여행',
    imageUrl: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 4,
    title: '이국적인 사막에서의 낙타 체험',
    imageUrl: 'https://images.unsplash.com/photo-1541417904950-b855846fe074?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 5,
    title: '감성 가득 유럽 골목 여행',
    imageUrl: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 6,
    title: '고요한 숲 속의 명상 캠프',
    imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80',
  },
];
