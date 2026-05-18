import type { Output, Variant } from './types';
import { cn } from '@maxigarcia/js-utils';
import { useEffect, useState } from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import { LogLine } from './log-line';
import previewHtml from './preview.html?raw';

interface PreviewProps {
  className?: string;
}

interface Message {
  source?: string;
  payload?: any[];
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
    const onMessage = (event: MessageEvent) => {
      const data: Message = event.data;

      if (data.source !== 'runjs-preview')
        return;
      const base = {
        id: data.id,
        type: data.type as Variant,
      };
      if (data.type === 'error') {
        setOutput([{
          ...base,
          content: Array.isArray(data.payload) ? data.payload.join('\n') : data.payload,
        }]);
      } else if (data.type === 'test-log') {
        const [isPassed, expected, actual] = data.payload;

        setOutput((prev) => [...prev, {
          ...base,
          content: {
            isPassed,
            expected,
            actual,
          },
        }]);
      } else {
        setOutput((prev) => [...prev, {
          ...base,
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
    <div className={cn('h-full overflow-auto flex flex-col gap-2', className)}>
      <iframe
        srcDoc={html}
        className="hidden"
        title="preview-runtime"
        sandbox="allow-scripts"
      />

      {
        output.length > 0
          ? (
              <>
                {output
                  .map((item) => {
                    return (
                      <LogLine
                        key={item.id}
                        {...item}
                        content={item.content}
                        type={item.type}
                      />
                    );
                  })}
              </>
            )
          : null
      }
    </div>
  );
}
