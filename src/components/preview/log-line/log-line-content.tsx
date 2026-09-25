import { indentValue } from '@/utils/value';
import { LogLineCopyButton } from './log-line-copy-button';

export function LogLineContent({ content }: { content: any }) {
  const formatted = indentValue(content);

  return (
    <pre
      role="region"
      className="group relative w-full shrink-0 wrap-break-word whitespace-pre-wrap"
      aria-label="Output"
    >
      <LogLineCopyButton
        content={content}
        className="absolute top-0 right-0 hidden group-hover:block"
      />
      {formatted}
    </pre>
  );
}
