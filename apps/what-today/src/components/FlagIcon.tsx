import React from 'react';

interface FlagIconProps {
  flagCode: string;
  alt?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const FlagIcon: React.FC<FlagIconProps> = ({ flagCode, alt = 'Flag', className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-30 h-30',
    md: 'w-40 h-40',
    lg: 'w-50 h-50',
  };

  const flagUrl = `https://cdn.weglot.com/flags/square/${flagCode}.svg`;

  return (
    <img
      alt={alt}
      className={`inline-block rounded-lg object-cover ${sizeClasses[size]} ${className}`}
      src={flagUrl}
      onError={(e) => {
        // 이미지 로드 실패 시 기본 아이콘으로 대체
        const target = e.target as HTMLImageElement;
        target.src =
          'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="m9 9 5 12 1.5-2.75L17 16l-5-12-1.5 2.75L9 9z"/></svg>';
      }}
    />
  );
};

export default FlagIcon;
