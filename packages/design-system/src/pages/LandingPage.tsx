import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

const description = `
# WhatToday Design System

**WhatToday Design System**은 오늘뭐해 서비스에서 공통적으로 사용하는 UI 컴포넌트들을 모아놓은 디자인 시스템입니다.


---

## ✨ 디자인 시스템 문서화 작성 방법

디자인 시스템의 컴포넌트 문서를 작성할 때는, **\`pnpm generate-doc\`** 명령어를 사용하여 자동으로 문서 템플릿을 생성할 수 있습니다.  
명령어 실행 후, 컴포넌트 이름을 입력하면 아래의 작업들을 자동으로 처리합니다.

1. 문서 페이지 파일 생성 (ex. \`src/pages/ButtonDoc.tsx\`)
2. 라우터 등록
3. 사이드바에 링크 추가

\`\`\`bash
pnpm generate-doc
\`\`\`

### ⚠️ 주의!

- 실제 개발할 컴포넌트는 **직접 생성**해야 합니다. (위 명령어는 문서화 작업만 자동화합니다.)
  - 개발할 공통 컴포넌트는 반드시 **\`src/components\`** 디렉토리에 위치해야 합니다.
- 컴포넌트 이름은 반드시 대문자로 시작해야 합니다.
- 겹치는 컴포넌트 이름이 있을 경우, 기존 문서가 덮어쓰여질 수 있습니다.

---

## 🧱 문서 템플릿 구조

모든 문서는 **\`<DocTemplate>\`** 컴포넌트를 기반으로 작성됩니다.  
문서 구성은 다음과 같은 순서와 항목을 반드시 포함해야 합니다:

1. **Title (제목)**  *-- 필수*  
   컴포넌트 이름 혹은 문서의 주제를 명확하게 나타냅니다.

2. **Description (설명)**  *-- 필수*  
   마크다운 형식으로 작성되며, 컴포넌트의 역할이나 특징을 작성합니다.  
   \`템플릿 리터럴\`을 사용해 여러 줄 설명도 쉽게 작성할 수 있습니다.

3. **Props (속성 설명)**  *-- 필수*  
   마크다운 표를 사용하여 각 props의 이름, 타입, 설명을 명확하게 정리합니다.

   예시:
   \`\`\`md
   | Prop     | Type               | Required | Description          |
   |----------|--------------------|----------|----------------------|
   | variant  | "primary"          | No       | 버튼 스타일 지정         |
   \`\`\`

4. **실제 컴포넌트 렌더링**  
   예시로 보여줄 실제 컴포넌트를 문서 아래에 배치하여 시각적인 확인이 가능하도록 합니다.

5. **예시 코드 블록**  
   실제 사용 예시를 \`<DocCode>\` 컴포넌트를 통해 코드 블록으로 작성합니다.  
   \`language props\`를 통해 \`tsx\`, \`js\` 등 문법 강조를 지정할 수 있습니다.

---

## 📘 사용법

오늘뭐해 서비스에서 디자인 시스템에서 개발한 공통 컴포넌트를 사용하려면, 먼저 패키지를 설치해야 합니다.

\`\`\`bash
pnpm add @what-today/design-system
\`\`\`

설치 후, 원하는 컴포넌트를 아래와 같이 불러와 사용할 수 있습니다:

\`\`\`tsx
import { Button } from '@what-today/design-system';

<Button variant="primary">확인</Button>
\`\`\`


---

ⓒ 코드잇 스프린트 프론트엔드 15기 파트4 4팀

`;

export default function LandingPage() {
  return (
    <div className='prose max-w-none'>
      <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>
        {description}
      </ReactMarkdown>
    </div>
  );
}
