import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axiosInstance from '@/apis/axiosInstance';

type SubImage = {
  id: number;
  imageUrl: string;
};

type Schedule = {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
};

type ActivityDetail = {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  subImages: SubImage[];
  schedules: Schedule[];
};

export default function ActivityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<ActivityDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchActivity = async () => {
      try {
        const res = await axiosInstance.get(`/activities/${id}`);
        setActivity(res.data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '활동 정보를 불러오는 중 오류가 발생했습니다.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>오류: {error}</p>;
  if (!activity) return <p>데이터 없음</p>;

  return (
    <div>
      <h1>여기는 활동 상세 페이지 입니다</h1>
      <p>상세페이지 ID: {activity.id}</p>
      <p>주소: {activity.address}</p>

      <div className='h-480 w-760 bg-gray-500'>지도 테스트</div>
    </div>
  );
}
