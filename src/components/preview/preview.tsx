import type { CallSite, Output, Variant } from './types';
import { cn, debounce } from '@maxigarcia/js-utils';
import { useEffect, useRef, useState } from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import { indentValue } from '@/utils/value';
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
  callSite?: CallSite | null;
}

export function Preview({ className }: PreviewProps) {
  const { code } = useEditorStore();

  const scrollRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [outputs, setOutputs] = useState<Output[]>([]);

  const formatOutput = (content: unknown) => {
    return indentValue(content);
  };

  const mapCallSite = (callSite: CallSite | null | undefined, offset: number): CallSite | undefined => {
    if (!callSite)
      return undefined;

    return {
      line: callSite.line - offset,
      column: callSite.column,
    };
  };

  const mapOutput = (data: Message, offset: number) => {
    const base = {
      id: data.id,
      type: data.type as Variant,
      callSite: mapCallSite(data.callSite, offset),
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
        callSite: mapCallSite(location, offset),
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
    if (event.source !== iframeRef.current?.contentWindow)
      return;

    const data: Message = event.data;

    if (!data || data.source !== 'runjs-preview' || typeof data.id !== 'string')
      return;

    // User code runs via eval, so stack lines are relative to the source string.
    const offset = 0;

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
      <Iframe ref={iframeRef} code={code} />
      <Outputs outputs={outputs} />
    </section>
  );
}
