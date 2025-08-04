/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToast } from '@what-today/design-system';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { findLanguageByCode, type Language, languages, supportedLanguageCodes } from '@/constants/languages';

import FlagIcon from './FlagIcon';

// 전역에서 스크립트 로드 상태 관리
let isGoogleTranslateLoaded = false;
let isGoogleTranslateLoading = false;

interface FloatingTranslateButtonProps {
  className?: string;
}

const FloatingTranslateButton: React.FC<FloatingTranslateButtonProps> = ({ className }) => {
  const { toast } = useToast();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);
  const [isReady, setIsReady] = useState(false);
  const [currentTranslatedLang, setCurrentTranslatedLang] = useState<string>('ko');
  const [isOpen, setIsOpen] = useState(false);
  const initializationAttempted = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 현재 번역된 언어 감지
  const detectCurrentLanguage = useCallback(() => {
    try {
      // 우선 googtrans 쿠키 확인
      const match = document.cookie.match(/(?:^|;\s*)googtrans=\/[a-z]+\/([a-z]+)/);
      if (match && match[1]) {
        const detectedLang = match[1];
        setCurrentTranslatedLang(detectedLang);
        const foundLang = findLanguageByCode(detectedLang);
        if (foundLang) {
          setSelectedLanguage(foundLang);
        }
        return;
      }

      // fallback: URL 파라미터 확인
      const urlParams = new URLSearchParams(window.location.search);
      const langFromUrl = urlParams.get('lang');
      if (langFromUrl) {
        setCurrentTranslatedLang(langFromUrl);
        const foundLang = findLanguageByCode(langFromUrl);
        if (foundLang) {
          setSelectedLanguage(foundLang);
        }
        return;
      }

      // fallback: body class 확인
      const bodyClasses = document.body.className;
      if (bodyClasses.includes('translated-')) {
        const matches = bodyClasses.match(/translated-(\w+)/);
        if (matches && matches[1]) {
          const detectedLang = matches[1];
          setCurrentTranslatedLang(detectedLang);
          const foundLang = findLanguageByCode(detectedLang);
          if (foundLang) {
            setSelectedLanguage(foundLang);
          }
        }
      }
    } catch {
      toast({
        title: '번역 오류',
        description: '언어 감지 중 오류가 발생했습니다. 새로고침 부탁드려요',
        type: 'error',
      });
    }
  }, [toast]);

  // Google Translate 위젯 초기화
  const initializeGoogleTranslate = useCallback(() => {
    if (initializationAttempted.current) return;

    try {
      initializationAttempted.current = true;

      if ((window as any).google?.translate?.TranslateElement) {
        // 기존 번역 요소가 있다면 제거
        const existingElement = document.getElementById('google_translate_element');
        if (existingElement) {
          existingElement.innerHTML = '';
        }

        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: 'auto',
            autoDisplay: false,
            includedLanguages: supportedLanguageCodes,
            layout: 0,
          },
          'google_translate_element',
        );

        setIsReady(true);

        // 초기화 후 현재 언어 감지
        setTimeout(() => {
          detectCurrentLanguage();
        }, 300);
      }
    } catch {
      toast({
        title: '번역 오류',
        description: '번역 중 오류가 발생했습니다. 새로고침 부탁드려요',
        type: 'error',
      });
      initializationAttempted.current = false;
    }
  }, [detectCurrentLanguage, toast]);

  // Google Translate 스크립트 로드
  useEffect(() => {
    if (isGoogleTranslateLoaded) {
      initializeGoogleTranslate();
      return;
    }

    if (isGoogleTranslateLoading) return;

    isGoogleTranslateLoading = true;

    // 콜백 함수를 window에 등록
    (window as any).googleTranslateElementInit = () => {
      isGoogleTranslateLoaded = true;
      isGoogleTranslateLoading = false;

      // 약간의 지연 후 초기화 (DOM이 준비될 시간 제공)
      setTimeout(() => {
        initializeGoogleTranslate();
      }, 100);
    };

    // 기존 스크립트가 있는지 확인
    const existingScript = document.querySelector('script[src*="translate.google.com"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.onerror = () => {
        toast({
          title: '번역 오류',
          description: '번역 중 오류가 발생했습니다. 새로고침 부탁드려요',
          type: 'error',
        });
        isGoogleTranslateLoading = false;
      };
      document.head.appendChild(script);
    }
  }, [initializeGoogleTranslate, toast]);

  // URL 변경 감지 (번역 후 URL이 변경되므로)
  useEffect(() => {
    const handleLocationChange = () => {
      setTimeout(() => {
        detectCurrentLanguage();
      }, 500);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, [detectCurrentLanguage]);

  // 외부 클릭 감지로 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // 언어 변경 함수
  const changeLanguage = useCallback(
    (language: Language) => {
      if (!isReady) {
        toast({
          title: '번역 오류',
          description: '번역 중 오류가 발생했습니다. 새로고침 부탁드려요',
          type: 'error',
        });
        return;
      }

      try {
        // 이미 선택된 언어인 경우 무시
        if (currentTranslatedLang === language.code) {
          return;
        }

        // 여러 방법으로 select 요소 찾기
        let selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;

        if (!selectElement) {
          // iframe 내부에서 찾기
          const iframe = document.querySelector('iframe.goog-te-banner-frame') as HTMLIFrameElement;
          if (iframe && iframe.contentDocument) {
            selectElement = iframe.contentDocument.querySelector('.goog-te-combo') as HTMLSelectElement;
          }
        }

        if (!selectElement) {
          // 다른 selector로 재시도
          selectElement = document.querySelector('select.goog-te-combo') as HTMLSelectElement;
        }

        if (selectElement) {
          // 한국어 선택 시 번역 끄기 (원본 상태로 되돌리기)
          if (language.code === 'ko') {
            try {
              // select 초기화
              const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
              if (selectElement) {
                selectElement.value = '';
                selectElement.dispatchEvent(new Event('change', { bubbles: true }));
              }

              // 쿠키 제거
              document.cookie = `googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
              document.cookie = `googtrans=;domain=.${window.location.hostname};path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;`;

              // iframe 숨기기
              const bannerIframe = document.querySelector('iframe.goog-te-banner-frame') as HTMLIFrameElement;
              if (bannerIframe?.parentElement) {
                bannerIframe.parentElement.style.display = 'none';
              }

              // body class 제거
              document.body.className = document.body.className
                .split(' ')
                .filter((cls) => !cls.startsWith('translated-'))
                .join(' ');

              // ✅ 최종: URL 파라미터 제거 & 페이지 새로고침
              const newUrl = window.location.origin + window.location.pathname;
              window.location.href = newUrl;
            } catch {
              toast({
                title: '번역 오류',
                description: '번역 중 오류가 발생했습니다. 새로고침 부탁드려요',
                type: 'error',
              });
            }

            return;
          }
          // 다른 언어에서 다른 언어로 변경 시 (한국어가 아닌 경우)
          else if (currentTranslatedLang !== 'ko' && language.code !== 'ko') {
            selectElement.value = '';
            selectElement.dispatchEvent(new Event('change', { bubbles: true }));

            // 잠시 후 목표 언어로 변경
            setTimeout(() => {
              selectElement.value = language.code;
              selectElement.dispatchEvent(new Event('change', { bubbles: true }));
              setCurrentTranslatedLang(language.code);
              setSelectedLanguage(language);
              setIsOpen(false);
            }, 300);
          }
          // 한국어에서 다른 언어로 직접 변경 또는 일반적인 변경
          else {
            selectElement.value = language.code;
            selectElement.dispatchEvent(new Event('change', { bubbles: true }));
            setCurrentTranslatedLang(language.code);
            setSelectedLanguage(language);
            setIsOpen(false);
          }
        } else {
          toast({
            title: '번역 오류',
            description: '번역 중 오류가 발생했습니다. 새로고침 부탁드려요',
            type: 'error',
          });
          // 초기화 재시도
          initializationAttempted.current = false;
          setTimeout(() => initializeGoogleTranslate(), 500);
        }
      } catch {
        toast({
          title: '번역 오류',
          description: '번역 중 오류가 발생했습니다. 새로고침 부탁드려요',
          type: 'error',
        });
      }
    },
    [isReady, currentTranslatedLang, initializeGoogleTranslate, toast],
  );

  // 버튼 클릭 핸들러
  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* 숨겨진 Google Translate 요소 */}
      <div className='hidden' id='google_translate_element' />

      {/* 플로팅 번역 버튼 */}
      <div ref={containerRef} className={twMerge('fixed right-10 bottom-10 z-50', className)}>
        {/* 언어 선택 드롭다운 */}
        {isOpen && (
          <div className='absolute right-0 bottom-60 flex h-300 w-160 transform flex-col rounded-xl border border-gray-50 bg-white p-6 shadow-[0px_4px_24px_rgba(156,180,202,0.2)] transition-all duration-200 ease-out'>
            <div className='caption-text mb-2 p-2 text-gray-400'>언어 선택</div>
            <div className='mr-4 flex-1 space-y-4 overflow-y-auto px-3 py-2'>
              {languages.map((language) => (
                <button
                  key={language.code}
                  className={`body-text flex w-full items-center gap-5 rounded-lg px-4 py-3 text-left transition-all hover:bg-gray-50 ${
                    currentTranslatedLang === language.code
                      ? 'text-primary-500 bg-blue-50 ring-1 ring-blue-200'
                      : 'text-gray-90'
                  }`}
                  type='button'
                  onClick={() => changeLanguage(language)}
                >
                  <FlagIcon alt={language.name} flagCode={language.flag} />
                  <span className='caption-text flex-1 text-left'>{language.name}</span>
                  {currentTranslatedLang === language.code && <span className='text-primary-500 pr-4'>✓</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 플로팅 버튼 */}
        <button
          className='flex h-40 w-40 items-center justify-center rounded-full border border-gray-50 bg-white shadow-[0px_4px_24px_rgba(156,180,202,0.2)] transition-all'
          type='button'
          onClick={handleButtonClick}
        >
          <FlagIcon alt={selectedLanguage.name} className='rounded-full' flagCode={selectedLanguage.flag} size='md' />
        </button>
      </div>
    </>
  );
};

export default FloatingTranslateButton;
