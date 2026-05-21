import { cn, isRecord, tryParseJson } from '@maxigarcia/js-utils';
import { indentValue } from '@/utils/value';
import { LogLineCopyButton } from './log-line-copy-button';

export function LogLineContent({ content }: { content: any }) {
  const parsedValue = tryParseJson(content);
  const formatted = indentValue(content);
  const isJson = isRecord(parsedValue) || Array.isArray(parsedValue);

  return (
    <>
      <pre
        role="region"
        className={
          cn(
            'group w-full wrap-break-word whitespace-pre-wrap relative min-h-[45px] shrink-0',
            isJson && 'rounded-md bg-surface/30 p-2',
          )
        }
        aria-label="Output"
      >
        <LogLineCopyButton
          content={content}
          className={cn(
            'absolute hidden group-hover:block',
            isJson ? 'top-2 right-2' : 'top-0 right-0',
          )}
        />
        {formatted}
      </pre>
    </>
  );
}
