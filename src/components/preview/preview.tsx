import { cn } from '@maxigarcia/js-utils';
import { useEffect, useState } from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import { EmptyOutput } from './empty-output';
import previewHtml from './preview.html?raw';

interface PreviewProps {
  className?: string;
}

interface Output {
  id: string;
  type: string;
  content: string;
}

interface Message {
  source?: string;
  payload?: string;
  type?: string;
  id: string;
}

export function Preview({ className }: PreviewProps) {
  const { code } = useEditorStore();

  const [output, setOutput] = useState<Output[]>([]);

  const html = previewHtml.replace('// your code here', code);

  const formatOutput = (content: string) => {
    if (typeof content === 'object' || Array.isArray(content))
      return JSON.stringify(content, null, 2);

    return content;
  };

  useEffect(() => {
    setOutput([]);

    const onMessage = (event: MessageEvent) => {
      const data: Message = event.data;

      if (data.source !== 'runjs-preview')
        return;

      if (data.type === 'error') {
        setOutput([{
          id: data.id,
          type: data.type,
          content: Array.isArray(data.payload) ? data.payload.join('\n') : data.payload,
        }]);
      } else {
        setOutput((prev) => [...prev, {
          id: data.id,
          type: data.type,
          content: Array.isArray(data.payload)
            ? data.payload.map(formatOutput).join('\n')
            : formatOutput(data.payload),
        }]);
      }
    };

    window.removeEventListener('message', onMessage);
    window.addEventListener('message', onMessage);

    return () => window.removeEventListener('message', onMessage);
  }, [code]);

  return (
    <div className={cn('h-full overflow-auto', className)}>
      <iframe
        srcDoc={html}
        className="hidden"
        title="preview-runtime"
        sandbox="allow-scripts"
      />

      <p className="flex h-full w-full flex-col pt-2">
        {

          output.length > 0
            ? output
                .map((item) => (
                  <span
                    key={item.id}
                    className={cn(
                      item.type === 'error' && 'text-red-400',
                      item.type === 'warn' && 'text-amber-300',
                      item.type === 'info' && 'text-cyan-300',
                      item.type === 'log' && 'text-slate-100',
                    )}
                  >
                    {item.content}
                  </span>
                ))
            : code.length !== 0 ? null : <EmptyOutput />
        }
      </p>
    </div>
  );
}
