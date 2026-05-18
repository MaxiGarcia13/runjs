import type { Output, Variant } from './types';
import { cn, debounce } from '@maxigarcia/js-utils';
import { useEffect, useRef, useState } from 'react';
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
  const scrollRef = useRef<HTMLDivElement>(null);

  const html = previewHtml.replace('// your code here', code);

  const formatOutput = (content: string) => {
    if (typeof content === 'object' || Array.isArray(content))
      return JSON.stringify(content, null, 2);

    return content;
  };

  const mapOutput = (data: Message) => {
    const base = {
      id: data.id,
      type: data.type as Variant,
    };

    if (data.type === 'error') {
      return {
        ...base,
        content: Array.isArray(data.payload) ? data.payload.join('\n') : data.payload,
      };
    } else if (data.type === 'test-log') {
      const [isPassed, expected, actual] = data.payload;
      return {
        ...base,
        content: {
          isPassed,
          expected,
          actual,
        },
      };
    }

    return {
      ...base,
      content: Array.isArray(data.payload)
        ? data.payload.map(formatOutput).join('\n')
        : formatOutput(data.payload),
    };
  };

  const scrollToLastPosition = debounce((position: number) => {
    scrollRef.current?.scrollTo?.(0, position);
  }, 100);

  useEffect(() => {
    const lastPosition = scrollRef.current?.scrollTop ?? 0;

    setOutput([]);

    const onMessage = (event: MessageEvent) => {
      const data: Message = event.data;

      if (data.source !== 'runjs-preview')
        return;

      setOutput(
        (prev) => {
          const existingItem = prev.find((item) => item.id === data.id);
          if (existingItem) {
            return prev.map((item) => item.id === data.id ? mapOutput(data) : item);
          }

          return [...prev, mapOutput(data)];
        },
      );

      scrollToLastPosition(lastPosition);
    };

    window.removeEventListener('message', onMessage);
    window.addEventListener('message', onMessage);

    return () => window.removeEventListener('message', onMessage);
  }, [code]);

  return (
    <div
      ref={scrollRef}
      className={cn('h-full overflow-auto flex flex-col gap-2', className)}
    >
      <iframe
        srcDoc={html}
        className="hidden"
        title="preview-runtime"
        sandbox="allow-scripts"
      />

      {
        output
          .map((item) => {
            return (
              <LogLine
                key={item.id}
                {...item}
                content={item.content}
                type={item.type}
              />
            );
          })
      }
    </div>
  );
}
