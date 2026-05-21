import type { CallSite, Output, Variant } from './types';
import { cn, debounce } from '@maxigarcia/js-utils';
import { useEffect, useRef, useState } from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import { Iframe } from './iframe';
import { Outputs } from './outputs';

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

  const scrollRef = useRef<HTMLElement>(null);

  const [outputs, setOutputs] = useState<Output[]>([]);

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
        content:
        Array.isArray(data.payload)
          ? data.payload.join('\n')
          : data.payload,
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

  const onMessage = (lastPosition: number) => (event: MessageEvent) => {
    const data: Message = event.data;

    if (data.source !== 'runjs-preview')
      return;

    // Hardcoded offset for the try/catch block
    // TODO: Implement a more dynamic way to get the offset
    const offset = 14;

    setOutputs(
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

  useEffect(() => {
    const lastPosition = scrollRef.current?.scrollTop ?? 0;
    const handler = onMessage(lastPosition);
    setOutputs([]);

    window.removeEventListener('message', handler);
    window.addEventListener('message', handler);
    return () => {
      window.removeEventListener('message', handler);
    };
  }, [code]);

  return (
    <section
      ref={scrollRef}
      role="log"
      className={cn('h-full overflow-auto', className)}
      aria-label="Console output"
      aria-live="polite"
      aria-relevant="additions"
    >
      <Iframe code={code} />
      <Outputs outputs={outputs} />
    </section>
  );
}
