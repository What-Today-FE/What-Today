import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function toPascalCase(str: string) {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

rl.question(
  '🎨 문서화할 컴포넌트 이름을 적어주세요. (예: Button)\n  ⚠️  컴포넌트명은 대문자로 시작해야 합니다.\n  ⚠️  컴포넌트 이름이 중복되면 기존 작업 내용에 덮어씌워질 수 있습니다. 겹치는 이름이 없는지 확인해주세요.\n----------------------------------------------------------------------------------------------------------------\n컴포넌트 이름: ',
  (input) => {
    const name = input.trim();
    if (!name) {
      console.error('❌ 컴포넌트 이름이 필요합니다.');
      rl.close();
      return;
    }

    const pascalName = toPascalCase(name);

    // 0. 컴포넌트 파일 생성
    const componentPath = path.resolve(__dirname, `../src/components/${pascalName}.tsx`);
    const componentTemplate = `export default function ${pascalName}() {
  return <></>;
}
`;
    fs.writeFileSync(componentPath, componentTemplate);
    console.log(`✅ ${pascalName}.tsx 컴포넌트 파일 생성 완료!`);

    // 디자인 시스템 문서 템플릿 생성
    const filePath = path.resolve(__dirname, `../src/pages/${pascalName}Doc.tsx`);

    const template = `import DocTemplate, { DocCode } from '../layouts/DocTemplate';
import Playground from '@/layouts/Playground';
import ${pascalName} from '../components/${pascalName}';

/* Playground는 편집 가능한 코드 블록입니다. */
/* Playground에서 사용할 예시 코드를 작성해주세요. */
const code = \`예시 코드를 작성해주세요.\`;

export default function ${pascalName}Doc() {
  return (
    <>
      <DocTemplate
        description={\`
# ${pascalName} 컴포넌트

간단한 설명을 작성해주세요.
\`}
        propsDescription={\`
| 이름 | 타입 | 설명 |
|------|------|------|
| example | string | 예시 prop입니다. |
\`}
        title="${pascalName}"
      />
      {/* 실제 컴포넌트를 아래에 작성해주세요 */}
      {/* 예시 코드 */}
      <DocCode
        code={\`<${pascalName} variant="primary">Click me</${pascalName}>\`}
      />

      {/* Playground는 편집 가능한 코드 블록입니다. */}
      <div className='mt-24'>
        <Playground code={code} scope={{ ${pascalName} }} />
      </div>
    </>
  );
}
`;

    // 1. 페이지 파일 생성
    fs.writeFileSync(filePath, template);
    console.log(`✅ ${pascalName}Doc.tsx 생성 완료!`);

    // 2. 라우터 수정
    const routesPath = path.resolve(__dirname, '../src/routes/index.tsx');
    const routesFile = fs.readFileSync(routesPath, 'utf-8');
    const newRoute = `      {
        path: '${name}',
        element: <${pascalName}Doc />,
      },`;

    if (!routesFile.includes(`${pascalName}Doc`)) {
      const importStatement = `import ${pascalName}Doc from '@pages/${pascalName}Doc';`;
      const updatedRoutes = routesFile
        .replace(/(path: 'button-example',[\s\S]+?},)/, `$1\n${newRoute}`)
        .replace(/(import LandingPage.*)/, `$1\n${importStatement}`);

      fs.writeFileSync(routesPath, updatedRoutes);
      console.log('✅ routes/index.tsx에 라우트 추가 완료!');
    }

    // 3. Sidebar 링크 추가
    const sidebarPath = path.resolve(__dirname, '../src/layouts/Sidebar.tsx');
    const sidebarFile = fs.readFileSync(sidebarPath, 'utf-8');
    const newNavItem = `            <SidebarNavItem label="${pascalName}" to="/docs/${name}" />`;

    if (!sidebarFile.includes(newNavItem)) {
      const updatedSidebar = sidebarFile.replace(/(\s*)<\/ul>/, `\n${newNavItem}$1</ul>`);

      fs.writeFileSync(sidebarPath, updatedSidebar);
      console.log('✅ Sidebar.tsx에 링크 추가 완료!');
      console.log('🎉 컴포넌트 문서화 작업이 완료되었습니다!');
    }

    rl.close();
  },
);
