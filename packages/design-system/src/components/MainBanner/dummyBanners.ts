export interface BannerItem {
  id: number;
  title: string;
  imageUrl: string;
}

export const dummyBanners: BannerItem[] = [
  {
    id: 1,
    title: '한옥 찜질방과 전통 음식 체험',
    imageUrl:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/15-4_2282_1754326460744.webp',
  },
  {
    id: 2,
    title: '경복궁 관광과 한복 체험',
    imageUrl:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/15-4_2282_1754326393840.webp',
  },
  {
    id: 3,
    title: '제주도 해녀와 해산물 체험',
    imageUrl:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/15-4_2282_1754326351593.webp',
  },
  {
    id: 4,
    title: '남산타워와 서울 야경 관광',
    imageUrl:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/15-4_2282_1754326320772.webp',
  },
  {
    id: 5,
    title: '경주 첨성대 야경 관광',
    imageUrl:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/15-4_2282_1754326417757.webp',
  },
];
