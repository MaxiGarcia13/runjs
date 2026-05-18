import type { CallSite, Output, Variant } from './types';
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
  callSite?: CallSite;
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

  const mapOutput = (data: Message, offset: number) => {
    const line = (data.callSite?.line ?? 0) - offset;
    const column = data.callSite?.column;

    const base = {
      id: data.id,
      type: data.type as Variant,
      callSite: {
        line,
        column,
      },
    };

    if (data.type === 'error') {
      return {
        ...base,
        content: Array.isArray(data.payload) ? data.payload.join('\n') : data.payload,
      };
    } else if (data.type === 'test-log' && Array.isArray(data.payload)) {
      const [location, isPassed, expected, received] = data.payload;

      return {
        ...base,
        callSite: {
          line: location.line - offset,
          column: location.column,
        },
        content: {
          isPassed: Boolean(isPassed),
          received,
          expected,
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
      // Hardcoded offset for the try/catch block
      // TODO: Implement a more dynamic way to get the offset
      const offset = 14;

      setOutput(
        (prev) => {
          const existingItem = prev.find((item) => item.id === data.id);
          if (existingItem) {
            return prev.map((item) => item.id === data.id ? mapOutput(data, offset) : item);
          }

          return [...prev, mapOutput(data, offset)];
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
              <LogLine key={item.id} {...item} />
            );
          })
      }
    </div>
  );
}
