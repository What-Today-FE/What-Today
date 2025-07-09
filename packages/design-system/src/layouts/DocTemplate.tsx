import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

interface DocTemplateProps {
  title: string;
  description: string;
  propsDescription: string;
}

/**
 * 문서의 제목을 출력하는 컴포넌트입니다.
 * @param title - 컴포넌트의 제목
 */
export function DocTitle({ title }: { title?: string }) {
  return <h1 className='mb-24 w-full border-b border-gray-200 pb-12 text-3xl font-bold text-gray-800'>{title}</h1>;
}

/**
 * 마크다운 형식의 설명 텍스트를 출력하는 컴포넌트입니다.
 * @param description - 마크다운으로 작성된 설명 문자열
 */
export function DocDescription({ description }: { description: string }) {
  return (
    <div className='prose mb-24 max-w-none text-gray-600'>
      <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>
        {description}
      </ReactMarkdown>
    </div>
  );
}

/**
 * 예시 코드 블록을 출력하고, 복사 기능을 제공하는 컴포넌트입니다.
 * @param code - 표시할 코드 문자열
 * @param language - 코드의 프로그래밍 언어 (기본값: 'tsx')
 */
export function DocCode({ code, language = 'tsx' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code ?? '');
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('복사 실패! ', err);
    }
  };

  return (
    <div className='relative my-4'>
      <div className='prose max-w-none'>
        <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>
          {`\`\`\`${language}\n${code}\n\`\`\``}
        </ReactMarkdown>
      </div>
      <button
        className='absolute top-4 right-12 mt-8 cursor-pointer rounded-lg bg-gray-50/20 px-8 py-4 text-sm text-white hover:opacity-40'
        onClick={handleCopy}
      >
        {copied ? '✅ copied!' : '📑 copy'}
      </button>
    </div>
  );
}

/**
 * 문서 템플릿을 구성하는 메인 컴포넌트입니다.
 * @param title - 문서 제목
 * @param description - 설명 영역의 마크다운 텍스트
 * @param propsDescription - Props 영역의 마크다운 텍스트
 */
export default function DocTemplate({ title, description, propsDescription }: DocTemplateProps) {
  return (
    <>
      <DocTitle title={title} />
      <div className='flex flex-col gap-24'>
        <div>
          <p className='mb-8 font-light text-gray-400'>1. Description</p>
          <DocDescription description={description} />
        </div>
        <div>
          <p className='mb-8 font-light text-gray-400'>2. Props</p>
          <DocDescription description={propsDescription} />
        </div>
        <div>
          <p className='mb-8 font-light text-gray-400'>3. Example</p>
        </div>
      </div>
    </>
  );
}
