import { useParams } from 'react-router-dom';

export default function ActivityDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>여기는 활동 상세 페이지 입니다</h1>
      <p>상세페이지 ID: {id}</p>
    </div>
  );
}
