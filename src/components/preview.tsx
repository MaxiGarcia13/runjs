import { useEffect, useState } from 'react';
import previewHtml from '@/assets/preview.html?raw';
import { useEditorStore } from '@/store/useEditorStore';
import { cn } from '@/utils/classes';

interface PreviewProps {
  className?: string;
}

export function Preview({ className }: PreviewProps) {
  const { code } = useEditorStore();

  const [output, setOutput] = useState<string[]>([]);

  const html = () => {
    return previewHtml.replace('// your code here', code);
  };

  useEffect(() => {
    setOutput([]);

    const onMessage = (event: MessageEvent) => {
      const data = event.data as {
        source?: string;
        payload?: string;
      };

      if (data.source !== 'runjs-preview')
        return;

      setOutput(prev => [...prev, data.payload]);
    };

    window.removeEventListener('message', onMessage);
    window.addEventListener('message', onMessage);

    return () => window.removeEventListener('message', onMessage);
  }, [code]);

  return (
    <div className={cn('h-full overflow-auto rounded-md border border-[#44475A] bg-[#282A36]', className)}>
      <iframe
        srcDoc={html()}
        className="hidden"
        title="preview-runtime"
        sandbox="allow-scripts"
      />

      <pre className="h-full w-full p-3 text-[#F8F8F2]">
        {
          output.length > 0
            ? output.join('\n')
            : (
                <span className="text-green-300">
                  Run log, warn, error, info to see output here.
                  <br />
                  <br />
                  log('Hello World');
                  <br />
                  warn('Hello World');
                  <br />
                  error('Hello World');
                  <br />
                  info('Hello World');
                </span>
              )
        }
      </pre>
    </div>
  );
}
