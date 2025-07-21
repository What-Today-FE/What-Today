import { useState } from 'react';

import { BottomSheet } from '../components/bottomsheet';
import DocTemplate, { DocCode } from '../layouts/DocTemplate';

// 다단계 바텀시트 예시 코드
const multiStepCode = `function MultiStepBottomSheetExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState('datetime'); // 'datetime' | 'people'
  const [selectedData, setSelectedData] = useState({
    date: '2024/11/14',
    time: '14:00-15:00',
    people: 1
  });

  // 바텀시트 닫기 (초기화)
  const handleClose = () => {
    setIsOpen(false);
    setCurrentStep('datetime');
  };

  // 1단계: 날짜/시간 선택 → 인원 선택으로 이동
  const handleDateTimeConfirm = (date, time) => {
    setSelectedData(prev => ({ ...prev, date, time }));
    setCurrentStep('people'); // 2단계로 이동
  };

  // 2단계: 인원 선택 → 최종 확인
  const handlePeopleConfirm = (people) => {
    setSelectedData(prev => ({ ...prev, people }));
    setIsOpen(false); // 바텀시트 닫기
    setCurrentStep('datetime'); // 초기화
    console.log('최종 선택:', { ...selectedData, people });
  };

  // 2단계에서 1단계로 돌아가기
  const handleBackToDateTime = () => {
    setCurrentStep('datetime');
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        예약하기 ({selectedData.date} {selectedData.time} {selectedData.people}명)
      </button>

      <BottomSheet.Root isOpen={isOpen} onClose={handleClose}>
        {currentStep === 'datetime' && (
          <BottomSheet.Content>
            <h2 className="text-lg font-bold mb-4">날짜 및 시간 선택</h2>
            {/* 달력과 시간 선택 UI */}
            <div className="space-y-4 mb-6">
              <div>선택된 날짜: {selectedData.date}</div>
              <div>선택된 시간: {selectedData.time}</div>
            </div>
            <button 
              className="w-full px-4 py-3 bg-blue-500 text-white rounded"
              onClick={() => handleDateTimeConfirm(selectedData.date, selectedData.time)}
            >
              확인
            </button>
          </BottomSheet.Content>
        )}

        {currentStep === 'people' && (
          <BottomSheet.Content>
            <div className="flex items-center mb-4">
              <button 
                className="p-2 mr-3 text-gray-600"
                onClick={handleBackToDateTime}
              >
                ← 뒤로
              </button>
              <h2 className="text-lg font-bold">인원 선택</h2>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>예약 정보:</div>
              <div className="text-sm text-gray-600">
                {selectedData.date} {selectedData.time}
              </div>
              
              <div className="flex items-center justify-between">
                <span>인원 수</span>
                <div className="flex items-center space-x-3">
                  <button 
                    className="w-8 h-8 rounded border"
                    onClick={() => setSelectedData(prev => ({ 
                      ...prev, 
                      people: Math.max(1, prev.people - 1) 
                    }))}
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{selectedData.people}</span>
                  <button 
                    className="w-8 h-8 rounded border"
                    onClick={() => setSelectedData(prev => ({ 
                      ...prev, 
                      people: prev.people + 1 
                    }))}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            
            <button 
              className="w-full px-4 py-3 bg-blue-500 text-white rounded"
              onClick={() => handlePeopleConfirm(selectedData.people)}
            >
              예약하기
            </button>
          </BottomSheet.Content>
        )}
      </BottomSheet.Root>
    </>
  );
}`;

// 애니메이션 다단계 바텀시트 예시 코드
const animatedMultiStepCode = `function AnimatedMultiStepBottomSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState('datetime');
  const [selectedData, setSelectedData] = useState({
    date: '2024/11/14',
    time: '14:00-15:00',
    people: 1
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setCurrentStep('datetime');
    setIsTransitioning(false);
  };

  // 🎬 애니메이션 전환: 닫기 → 잠깐 대기 → 다시 열기
  const handleAnimatedDateTimeConfirm = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setIsOpen(false); // 1. 바텀시트 닫기 애니메이션
    
    setTimeout(() => { // 2. 애니메이션 완료까지 대기 (0.3s)
      setCurrentStep('people'); // 3. 다음 단계로 변경
      setIsOpen(true); // 4. 바텀시트 다시 열기 애니메이션
      setIsTransitioning(false);
    }, 300); // CSS transition 시간과 맞춤
  };

  const handleAnimatedBackToDateTime = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setIsOpen(false); // 닫기
    
    setTimeout(() => {
      setCurrentStep('datetime'); // 이전 단계
      setIsOpen(true); // 다시 열기
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        ✨ 애니메이션 예약하기
      </button>

      <BottomSheet.Root isOpen={isOpen} onClose={handleClose}>
        {currentStep === 'datetime' && (
          <BottomSheet.Content>
            <h2>✨ 날짜/시간 선택 (애니메이션)</h2>
            <button 
              className="w-full bg-pink-500 text-white rounded"
              onClick={handleAnimatedDateTimeConfirm}
              disabled={isTransitioning}
            >
              {isTransitioning ? '전환 중...' : '확인 (애니메이션 전환)'}
            </button>
          </BottomSheet.Content>
        )}

        {currentStep === 'people' && (
          <BottomSheet.Content>
            <button 
              onClick={handleAnimatedBackToDateTime}
              disabled={isTransitioning}
            >
              ← 뒤로 (애니메이션)
            </button>
            <h2>✨ 인원 선택 (애니메이션)</h2>
            {/* 나머지 UI */}
          </BottomSheet.Content>
        )}
      </BottomSheet.Root>
    </>
  );
}`;

export default function BottomSheetDoc() {
  const [isOpen, setIsOpen] = useState(false);
  const [contentType, setContentType] = useState<'short' | 'medium' | 'long' | 'multistep' | 'animated-multistep'>(
    'short',
  );

  // 다단계 바텀시트 상태
  const [multiStepOpen, setMultiStepOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<'datetime' | 'people'>('datetime');
  const [selectedData, setSelectedData] = useState({
    date: '2024/11/14',
    time: '14:00-15:00',
    people: 1,
  });

  // 애니메이션 다단계 바텀시트 상태
  const [animatedMultiStepOpen, setAnimatedMultiStepOpen] = useState(false);
  const [animatedCurrentStep, setAnimatedCurrentStep] = useState<'datetime' | 'people'>('datetime');
  const [animatedSelectedData, setAnimatedSelectedData] = useState({
    date: '2024/11/14',
    time: '14:00-15:00',
    people: 1,
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const shortContent = (
    <BottomSheet.Content>
      <h2 className='mb-4 text-lg font-bold'>짧은 콘텐츠 테스트</h2>
      <p className='mb-4'>적은 양의 콘텐츠입니다. 바텀시트가 콘텐츠에 맞게 작은 높이로 자동 조절됩니다.</p>
      <div className='mb-4 rounded bg-green-50 p-3'>
        <p className='text-sm text-green-700'>✅ 어디서든 드래그로 닫을 수 있습니다</p>
      </div>
      <button className='rounded bg-red-500 px-4 py-2 text-white' onClick={() => setIsOpen(false)}>
        닫기
      </button>
    </BottomSheet.Content>
  );

  const mediumContent = (
    <BottomSheet.Content>
      <h2 className='mb-4 text-lg font-bold'>중간 콘텐츠 테스트</h2>
      <div className='mb-4 rounded bg-blue-50 p-3'>
        <p className='text-sm text-blue-700'>✅ 어디서든 드래그로 닫을 수 있습니다</p>
      </div>
      <div className='mb-4 space-y-3'>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className='rounded bg-gray-100 p-3'>
            <p>중간 길이 콘텐츠 {i + 1} - 적당한 양의 콘텐츠로 중간 높이가 됩니다.</p>
          </div>
        ))}
      </div>
      <button className='rounded bg-red-500 px-4 py-2 text-white' onClick={() => setIsOpen(false)}>
        닫기
      </button>
    </BottomSheet.Content>
  );

  const longContent = (
    <BottomSheet.Content>
      <h2 className='mb-4 text-lg font-bold'>긴 콘텐츠 테스트 (헤더 + 스마트 드래그)</h2>
      <div className='mb-4 border-l-4 border-orange-400 bg-orange-50 p-3'>
        <h4 className='mb-2 font-semibold text-orange-800'>🎯 헤더 + 스마트 드래그 기능</h4>
        <ul className='space-y-1 text-sm text-orange-700'>
          <li>
            • <strong>헤더 드래그</strong>: 스크롤 위치와 관계없이 언제나 바텀시트 닫기 가능
          </li>
          <li>
            • <strong>콘텐츠 드래그 (스크롤 맨 위)</strong>: 바텀시트 닫기 가능
          </li>
          <li>
            • <strong>콘텐츠 드래그 (스크롤 중간/아래)</strong>: 스크롤만 동작 (바텀시트 안 닫힘)
          </li>
        </ul>
      </div>
      <div className='mb-4 space-y-3'>
        {Array.from({ length: 25 }, (_, i) => (
          <div key={i} className='rounded bg-blue-50 p-3'>
            <h3 className='font-semibold'>항목 {i + 1}</h3>
            <p>
              긴 콘텐츠 예시입니다. 스크롤을 내린 상태에서 콘텐츠를 드래그하면 바텀시트가 닫히지 않지만, 헤더를
              드래그하면 언제나 닫힙니다.
            </p>
            {i === 0 && (
              <div className='mt-2 space-y-1 text-sm'>
                <p className='text-red-600'>
                  🎯 <strong>헤더 드래그</strong>: 언제나 바텀시트 닫기 가능
                </p>
                <p className='text-green-600'>
                  ✅ <strong>콘텐츠 드래그</strong>: 현재 맨 위라서 바텀시트 닫기 가능
                </p>
              </div>
            )}
            {i === 10 && (
              <div className='mt-2 space-y-1 text-sm'>
                <p className='text-red-600'>
                  🎯 <strong>헤더 드래그</strong>: 언제나 바텀시트 닫기 가능
                </p>
                <p className='text-blue-600'>
                  🚫 <strong>콘텐츠 드래그</strong>: 스크롤을 내렸다면 바텀시트 안 닫힘
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <button className='sticky bottom-0 rounded bg-red-500 px-4 py-2 text-white' onClick={() => setIsOpen(false)}>
        닫기
      </button>
    </BottomSheet.Content>
  );

  const handleOpenBottomSheet = (type: 'short' | 'medium' | 'long' | 'multistep' | 'animated-multistep') => {
    if (type === 'multistep') {
      setMultiStepOpen(true);
      setCurrentStep('datetime');
    } else if (type === 'animated-multistep') {
      setAnimatedMultiStepOpen(true);
      setAnimatedCurrentStep('datetime');
    } else {
      setContentType(type);
      setIsOpen(true);
    }
  };

  // 다단계 바텀시트 핸들러들
  const handleMultiStepClose = () => {
    setMultiStepOpen(false);
    setCurrentStep('datetime');
  };

  const handleDateTimeConfirm = () => {
    setCurrentStep('people');
  };

  const handlePeopleConfirm = () => {
    setMultiStepOpen(false);
    setCurrentStep('datetime');
    alert(`예약 완료: ${selectedData.date} ${selectedData.time} ${selectedData.people}명`);
  };

  const handleBackToDateTime = () => {
    setCurrentStep('datetime');
  };

  // 애니메이션 다단계 바텀시트 핸들러들
  const handleAnimatedMultiStepClose = () => {
    setAnimatedMultiStepOpen(false);
    setAnimatedCurrentStep('datetime');
    setIsTransitioning(false);
  };

  const handleAnimatedDateTimeConfirm = () => {
    if (isTransitioning) return; // 전환 중이면 무시

    setIsTransitioning(true);
    // 1. 바텀시트 닫기
    setAnimatedMultiStepOpen(false);

    // 2. 애니메이션 완료 후 다음 단계로 이동
    setTimeout(() => {
      setAnimatedCurrentStep('people');
      setAnimatedMultiStepOpen(true);
      setIsTransitioning(false);
    }, 300); // CSS 애니메이션 시간과 맞춤 (0.3s)
  };

  const handleAnimatedPeopleConfirm = () => {
    setAnimatedMultiStepOpen(false);
    setAnimatedCurrentStep('datetime');
    setIsTransitioning(false);
    alert(`예약 완료: ${animatedSelectedData.date} ${animatedSelectedData.time} ${animatedSelectedData.people}명`);
  };

  const handleAnimatedBackToDateTime = () => {
    if (isTransitioning) return; // 전환 중이면 무시

    setIsTransitioning(true);
    // 1. 바텀시트 닫기
    setAnimatedMultiStepOpen(false);

    // 2. 애니메이션 완료 후 이전 단계로 이동
    setTimeout(() => {
      setAnimatedCurrentStep('datetime');
      setAnimatedMultiStepOpen(true);
      setIsTransitioning(false);
    }, 300); // CSS 애니메이션 시간과 맞춤 (0.3s)
  };

  return (
    <>
      <div className='mb-4 flex flex-col gap-2'>
        <button
          className='rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600'
          onClick={() => handleOpenBottomSheet('short')}
        >
          짧은 콘텐츠
        </button>
        <button
          className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
          onClick={() => handleOpenBottomSheet('medium')}
        >
          중간 콘텐츠
        </button>
        <button
          className='rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600'
          onClick={() => handleOpenBottomSheet('long')}
        >
          긴 콘텐츠 (🎯 헤더 + 스마트 드래그)
        </button>
        <button
          className='rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600'
          onClick={() => handleOpenBottomSheet('multistep')}
        >
          🔄 다단계 바텀시트
        </button>
        <button
          className='rounded bg-pink-500 px-4 py-2 text-white hover:bg-pink-600'
          onClick={() => handleOpenBottomSheet('animated-multistep')}
        >
          ✨ 애니메이션 다단계 바텀시트
        </button>
      </div>

      {/* 스크롤 테스트를 위한 긴 콘텐츠 */}
      <div className='mb-8'>
        <h3 className='mb-4 text-lg font-bold'>다단계 바텀시트 테스트 설명</h3>
        <div className='space-y-4'>
          <div className='rounded bg-green-50 p-4'>
            <h4 className='font-semibold text-green-800'>🟢 기본 바텀시트</h4>
            <p className='text-green-700'>단일 콘텐츠로 구성된 기본 바텀시트</p>
          </div>
          <div className='rounded bg-orange-50 p-4'>
            <h4 className='font-semibold text-orange-800'>🔄 다단계 바텀시트 (일반)</h4>
            <div className='space-y-2 text-orange-700'>
              <p>
                <strong>1단계</strong>: 날짜/시간 선택 → 확인 버튼
              </p>
              <p>
                <strong>2단계</strong>: 인원 선택 (뒤로가기 + 최종 확인)
              </p>
              <p className='text-sm'>
                <strong>구현 방식</strong>: 사용자 상태 관리 (currentStep state)
              </p>
              <p className='text-sm'>
                <strong>애니메이션</strong>: 콘텐츠만 교체 (바텀시트 유지)
              </p>
            </div>
          </div>
          <div className='rounded bg-pink-50 p-4'>
            <h4 className='font-semibold text-pink-800'>✨ 애니메이션 다단계 바텀시트</h4>
            <div className='space-y-2 text-pink-700'>
              <p>
                <strong>1단계</strong>: 날짜/시간 선택 → 확인 버튼
              </p>
              <p>
                <strong>2단계</strong>: 인원 선택 (뒤로가기 + 최종 확인)
              </p>
              <p className='text-sm'>
                <strong>구현 방식</strong>: 바텀시트 닫기 → 잠깐 대기 → 다시 열기
              </p>
              <p className='text-sm'>
                <strong>애니메이션</strong>: 내려갔다가 올라오는 부드러운 전환 ✨
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 기본 바텀시트 */}
      <BottomSheet.Root isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {contentType === 'short' && shortContent}
        {contentType === 'medium' && mediumContent}
        {contentType === 'long' && longContent}
      </BottomSheet.Root>

      {/* 다단계 바텀시트 */}
      <BottomSheet.Root isOpen={multiStepOpen} onClose={handleMultiStepClose}>
        {currentStep === 'datetime' && (
          <BottomSheet.Content>
            <h2 className='mb-4 text-lg font-bold'>📅 날짜 및 시간 선택</h2>
            <div className='mb-6 space-y-4'>
              <div className='rounded bg-blue-50 p-3'>
                <div className='text-sm text-gray-600'>선택된 날짜</div>
                <div className='font-semibold'>{selectedData.date}</div>
              </div>
              <div className='rounded bg-blue-50 p-3'>
                <div className='text-sm text-gray-600'>선택된 시간</div>
                <div className='font-semibold'>{selectedData.time}</div>
              </div>
            </div>
            <button className='w-full rounded bg-blue-500 px-4 py-3 text-white' onClick={handleDateTimeConfirm}>
              확인 (다음 단계)
            </button>
          </BottomSheet.Content>
        )}

        {currentStep === 'people' && (
          <BottomSheet.Content>
            <div className='mb-4 flex items-center'>
              <button className='mr-3 rounded p-2 text-gray-600 hover:bg-gray-100' onClick={handleBackToDateTime}>
                ← 뒤로
              </button>
              <h2 className='text-lg font-bold'>👥 인원 선택</h2>
            </div>

            <div className='mb-6 space-y-4'>
              <div className='rounded bg-gray-50 p-3'>
                <div className='text-sm text-gray-600'>예약 정보</div>
                <div className='font-semibold'>
                  {selectedData.date} {selectedData.time}
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <span className='font-semibold'>인원 수</span>
                <div className='flex items-center space-x-3'>
                  <button
                    className='flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100'
                    onClick={() =>
                      setSelectedData((prev) => ({
                        ...prev,
                        people: Math.max(1, prev.people - 1),
                      }))
                    }
                  >
                    -
                  </button>
                  <span className='w-12 text-center text-lg font-bold'>{selectedData.people}</span>
                  <button
                    className='flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100'
                    onClick={() =>
                      setSelectedData((prev) => ({
                        ...prev,
                        people: prev.people + 1,
                      }))
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button className='w-full rounded bg-blue-500 px-4 py-3 text-white' onClick={handlePeopleConfirm}>
              예약하기 ({selectedData.people}명)
            </button>
          </BottomSheet.Content>
        )}
      </BottomSheet.Root>

      {/* 애니메이션 다단계 바텀시트 */}
      <BottomSheet.Root isOpen={animatedMultiStepOpen} onClose={handleAnimatedMultiStepClose}>
        {animatedCurrentStep === 'datetime' && (
          <BottomSheet.Content>
            <h2 className='mb-4 text-lg font-bold'>✨ 날짜 및 시간 선택 (애니메이션)</h2>
            <div className='mb-4 rounded border-l-4 border-pink-400 bg-pink-50 p-3'>
              <p className='text-sm text-pink-700'>🎬 확인 버튼을 누르면 바텀시트가 내려갔다가 올라옵니다!</p>
            </div>
            <div className='mb-6 space-y-4'>
              <div className='rounded bg-blue-50 p-3'>
                <div className='text-sm text-gray-600'>선택된 날짜</div>
                <div className='font-semibold'>{animatedSelectedData.date}</div>
              </div>
              <div className='rounded bg-blue-50 p-3'>
                <div className='text-sm text-gray-600'>선택된 시간</div>
                <div className='font-semibold'>{animatedSelectedData.time}</div>
              </div>
            </div>
            <button
              className={`w-full rounded px-4 py-3 transition-colors ${
                isTransitioning ? 'cursor-not-allowed bg-gray-400' : 'bg-pink-500 hover:bg-pink-600'
              } text-white`}
              disabled={isTransitioning}
              onClick={handleAnimatedDateTimeConfirm}
            >
              {isTransitioning ? '전환 중...' : '확인 (애니메이션 전환)'}
            </button>
          </BottomSheet.Content>
        )}

        {animatedCurrentStep === 'people' && (
          <BottomSheet.Content>
            <div className='mb-4 flex items-center'>
              <button
                className={`mr-3 rounded p-2 transition-colors ${
                  isTransitioning ? 'cursor-not-allowed text-gray-400' : 'text-gray-600 hover:bg-gray-100'
                }`}
                disabled={isTransitioning}
                onClick={handleAnimatedBackToDateTime}
              >
                ← 뒤로
              </button>
              <h2 className='text-lg font-bold'>✨ 인원 선택 (애니메이션)</h2>
            </div>

            <div className='mb-4 rounded border-l-4 border-pink-400 bg-pink-50 p-3'>
              <p className='text-sm text-pink-700'>🎬 뒤로가기도 애니메이션으로 전환됩니다!</p>
            </div>

            <div className='mb-6 space-y-4'>
              <div className='rounded bg-gray-50 p-3'>
                <div className='text-sm text-gray-600'>예약 정보</div>
                <div className='font-semibold'>
                  {animatedSelectedData.date} {animatedSelectedData.time}
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <span className='font-semibold'>인원 수</span>
                <div className='flex items-center space-x-3'>
                  <button
                    className='flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100'
                    onClick={() =>
                      setAnimatedSelectedData((prev) => ({
                        ...prev,
                        people: Math.max(1, prev.people - 1),
                      }))
                    }
                  >
                    -
                  </button>
                  <span className='w-12 text-center text-lg font-bold'>{animatedSelectedData.people}</span>
                  <button
                    className='flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100'
                    onClick={() =>
                      setAnimatedSelectedData((prev) => ({
                        ...prev,
                        people: prev.people + 1,
                      }))
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button
              className='w-full rounded bg-pink-500 px-4 py-3 text-white hover:bg-pink-600'
              onClick={handleAnimatedPeopleConfirm}
            >
              예약하기 ({animatedSelectedData.people}명)
            </button>
          </BottomSheet.Content>
        )}
      </BottomSheet.Root>

      <DocTemplate
        description={`
# BottomSheet 컴포넌트 - 완전한 구조 + 다단계 예시

Root, Header, Content로 역할이 명확히 분리된 완전한 바텀시트 컴포넌트입니다.

## 컴포넌트 구조
- **BottomSheet.Root**: 기본 구조와 드래그 처리
- **BottomSheet.Header**: 드래그 핸들 (언제나 닫기 가능)  
- **BottomSheet.Content**: 동적 높이 + 스크롤 처리

## 다단계 바텀시트 구현 방법

### 권장 방법: 사용자 상태 관리 ⭐
바텀시트 컴포넌트는 기본 기능에 충실하고, 다단계 로직은 사용자가 처리

\`\`\`tsx
function MultiStepBottomSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState('step1'); // 'step1' | 'step2'
  
  return (
    <BottomSheet.Root isOpen={isOpen} onClose={() => setIsOpen(false)}>
      {currentStep === 'step1' && (
        <BottomSheet.Content>
          <h2>1단계: 날짜/시간 선택</h2>
          <button onClick={() => setCurrentStep('step2')}>
            다음 단계
          </button>
        </BottomSheet.Content>
      )}
      
      {currentStep === 'step2' && (
        <BottomSheet.Content>
          <button onClick={() => setCurrentStep('step1')}>← 뒤로</button>
          <h2>2단계: 인원 선택</h2>
          <button onClick={() => setIsOpen(false)}>완료</button>
        </BottomSheet.Content>
      )}
    </BottomSheet.Root>
  );
}
\`\`\`

### 장점
- 🎯 **유연성**: 다양한 시나리오에 대응 가능
- 🎯 **단순성**: 바텀시트 컴포넌트는 기본 기능에 충실
- 🎯 **커스터마이징**: 각 단계별로 자유로운 디자인 가능
- 🎯 **재사용성**: 다른 프로젝트에서도 쉽게 적용

## 사용 방법
### 기본 방법 (단일 콘텐츠)
\`\`\`tsx
<BottomSheet.Root isOpen={isOpen} onClose={onClose}>
  <BottomSheet.Content>
    <h2>제목</h2>
    <p>동적 높이와 스크롤이 자동 처리됩니다!</p>
  </BottomSheet.Content>
</BottomSheet.Root>
\`\`\`

### 다단계 방법 (상태 관리)
\`\`\`tsx
<BottomSheet.Root isOpen={isOpen} onClose={onClose}>
  {step === 'datetime' && <DateTimeStep />}
  {step === 'people' && <PeopleStep />}
</BottomSheet.Root>
\`\`\`

## 역할 분리
- 🎯 **Root**: Portal, Overlay, 드래그 처리, Context 제공
- 🎯 **Header**: iOS 스타일 핸들, 헤더 전용 드래그
- 🎯 **Content**: 동적 높이, 스크롤 처리, 기본 패딩
- 🎯 **사용자**: 다단계 로직, 상태 관리, 단계별 UI

## 헤더 + 스마트 드래그 기능
- 🎯 **헤더 드래그**: 스크롤 위치와 관계없이 언제나 바텀시트 닫기 가능
- 🧠 **콘텐츠 스마트 드래그**: 스크롤 위치에 따라 조건부 바텀시트 닫기
- 🎯 **영역별 구분**: 터치 시작 위치를 자동 감지하여 다른 동작 적용
- 🧠 **UX 최적화**: 사용자 의도에 맞는 자연스러운 상호작용

## 드래그 동작 로직
1. **헤더 영역 드래그**: 언제나 바텀시트 닫기 (스크롤 위치 무관)
2. **콘텐츠 영역 드래그 (스크롤 맨 위)**: 바텀시트 닫기
3. **콘텐츠 영역 드래그 (스크롤 중간/아래)**: 스크롤만 동작 (바텀시트 안 닫힘)

## 실제 사용 시나리오
- 📱 **일반적인 사용**: 헤더를 잡고 아래로 드래그해서 닫기
- 📱 **긴 콘텐츠**: 스크롤을 내린 후에도 헤더로 언제든 닫기 가능
- 📱 **스크롤 중**: 콘텐츠 드래그는 스크롤, 헤더 드래그는 닫기
- 📱 **다단계**: 상태 관리로 단계별 UI 전환

## 예정 기능
- ⏳ 스크롤 최적화
- ⏳ 접근성 기능 (포커스 트랩)
- ⏳ 커스텀 드래그 임계값 설정
`}
        propsDescription={`
| 컴포넌트 | 프로퍼티 | 타입 | 설명 |
|----------|----------|------|------|
| Root | isOpen | boolean | 바텀시트 열림 상태 |
| Root | onClose | () => void | 바텀시트 닫기 함수 |
| Root | children | ReactNode | 바텀시트 내부 콘텐츠 |
| Root | className | string? | 추가 CSS 클래스 |
| Header | className | string? | 추가 CSS 클래스 |
| Content | children | ReactNode | 콘텐츠 내용 |
| Content | className | string? | 추가 CSS 클래스 |
`}
        title='BottomSheet'
      />

      {/* 실제 컴포넌트를 아래에 작성해주세요 */}
      {/* 예시 코드 */}
      <DocCode
        code={`<BottomSheet.Root isOpen={isOpen} onClose={onClose}>
  <BottomSheet.Content>
    <h2>제목</h2>
    <p>역할이 명확히 분리된 완전한 바텀시트!</p>
  </BottomSheet.Content>
</BottomSheet.Root>`}
      />

      {/* 다단계 바텀시트 예시 코드 */}
      <h3 className='mt-8 mb-4 text-lg font-bold'>다단계 바텀시트 구현 예시</h3>
      <DocCode code={multiStepCode} />

      {/* 애니메이션 다단계 바텀시트 예시 코드 */}
      <h3 className='mt-8 mb-4 text-lg font-bold'>✨ 애니메이션 다단계 바텀시트 (내려갔다가 올라오는 전환)</h3>
      <div className='mb-4 rounded border-l-4 border-pink-400 bg-pink-50 p-4'>
        <h4 className='mb-2 font-semibold text-pink-800'>🎬 애니메이션 전환 원리</h4>
        <div className='space-y-1 text-sm text-pink-700'>
          <p>
            <strong>1단계</strong>: 확인 버튼 클릭 → <code>setIsOpen(false)</code>
          </p>
          <p>
            <strong>2단계</strong>: 바텀시트 닫기 애니메이션 (0.3초)
          </p>
          <p>
            <strong>3단계</strong>: <code>setTimeout(300ms)</code> 대기
          </p>
          <p>
            <strong>4단계</strong>: 다음 스텝으로 변경 + <code>setIsOpen(true)</code>
          </p>
          <p>
            <strong>결과</strong>: 바텀시트가 내려갔다가 새 콘텐츠로 다시 올라옴! ✨
          </p>
        </div>
      </div>
      <DocCode code={animatedMultiStepCode} />
    </>
  );
}
