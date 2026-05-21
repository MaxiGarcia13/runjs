import { cn, isRecord, tryParseJson } from '@maxigarcia/js-utils';
import { indentValue } from '@/utils/value';
import { LogLineCopyButton } from './log-line-copy-button';

export function LogLineContent({ content }: { content: any }) {
  const parsedValue = tryParseJson(content);
  const formatted = indentValue(content);

  return (
    <>
      <LogLineCopyButton content={content} className="absolute top-0 right-0" />
      <pre
        role="region"
        className={
          cn(
            'w-full wrap-break-word whitespace-pre-wrap',
            (isRecord(parsedValue) || Array.isArray(parsedValue)) && 'rounded-md bg-surface/30 p-2',
          )
        }
        aria-label="Output"
      >
        {formatted}
      </pre>
    </>
  );
}
