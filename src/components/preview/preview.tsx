import { useEffect, useState } from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import { cn } from '@/utils/classes';
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
  const [loading, setLoading] = useState<boolean>(false);

  const html = () => {
    return previewHtml.replace('// your code here', code);
  };

  const formatOutput = (content: string) => {
    if (typeof content === 'object' || Array.isArray(content))
      return JSON.stringify(content, null, 2);

    return content;
  };

  useEffect(() => {
    setOutput([]);
    setLoading(true);

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

      setLoading(false);
    };

    window.removeEventListener('message', onMessage);
    window.addEventListener('message', onMessage);

    return () => window.removeEventListener('message', onMessage);
  }, [code]);

  return (
    <div className={cn('h-full overflow-auto', className)}>
      <iframe
        srcDoc={html()}
        className="hidden"
        title="preview-runtime"
        sandbox="allow-scripts"
      />

      <p className="h-full w-full pt-2 flex flex-col">
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
            : loading ? 'Loading...' : <EmptyOutput />
        }
      </p>
    </div>
  );
}
