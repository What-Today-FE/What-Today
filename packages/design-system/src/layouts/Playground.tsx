import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';

type PlaygroundProps = {
  code: string;
  scope: Record<string, unknown>;
};

export default function Playground({ code, scope }: PlaygroundProps) {
  const wrappedCode = `render(
    <>
      ${code.trim()}
    </>
);`;

  return (
    <LiveProvider noInline code={wrappedCode} language='tsx' scope={scope}>
      <p className='mb-8 font-light text-gray-400'>4. Playground</p>
      <div className='rounded p-4'>
        <div className='mb-4'>
          <LiveEditor className='rounded-2xl bg-[#0B1522] p-10 font-mono text-sm' />
          <LiveError className='mt-2 text-sm text-red-500' />
        </div>
        <div className='mt-4 pt-4'>
          <p className='mb-8 font-light text-gray-400'>Output</p>
          <LivePreview />
        </div>
      </div>
    </LiveProvider>
  );
}
