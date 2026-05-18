import type { Output, OutputTestContent, Variant } from './types';
import { cn, isRecord, tryParseJson } from '@maxigarcia/js-utils';

export function LogLine({ content, type }: Output) {
  const logKey: Partial<Record<Variant, string>> = {
    'perf-log': 'PERF',
    'test-log': 'TEST',
  };

  const title = logKey[type] ?? type.toUpperCase();
  return (
    <div className={
      cn(
        'flex flex-row gap-2  rounded-md',
        type === 'log' && 'text-gray-300 bg-gray-700/30',
        type === 'warn' && 'text-amber-300 bg-amber-900/30',
        type === 'error' && 'text-red-400 bg-red-900/30',
        type === 'info' && 'text-cyan-300 bg-cyan-900/30',
        type === 'perf-log' && 'text-blue-300 bg-blue-900/30',
        type !== 'test-log' && 'p-2',
      )
    }
    >
      {
        type === 'test-log' && content && typeof content === 'object'
          ? <TestLogLine content={content} title={title} />
          : <DefaultLogLine content={content as string} title={title} />
      }
    </div>
  );
}

export function TestLogLine({ content, title }: { title: string; content: OutputTestContent }) {
  const { expected, actual, isPassed } = content;
  const className = isPassed ? 'text-green-300 bg-green-900/30' : 'text-red-400 bg-red-900/30';

  return (
    <div className={cn('flex flex-col gap-2 w-full rounded-md p-2', className)}>
      <span>{`${title}: ${isPassed ? 'passed ✅' : 'failed ❌'}`}</span>

      <span>Expected:</span>
      {formatValue(expected)}
      <span>Received:</span>
      {formatValue(actual)}
    </div>
  );
}

export function DefaultLogLine({ content, title }: { title: string; content: string }) {
  return (
    <>
      <span>{`${title}: `}</span>
      <span>
        {formatValue(content)}
      </span>
    </>
  );
}

function formatValue(value: any) {
  const parsedValue = tryParseJson(value);

  if (isRecord(parsedValue) || Array.isArray(parsedValue)) {
    return (
      <pre className="rounded-md bg-gray-800/30 p-2">
        {JSON.stringify(parsedValue, null, 2)}
      </pre>
    );
  }

  return <span>{value}</span>;
}
