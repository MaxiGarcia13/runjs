import { isRecord, tryParseJson } from '@maxigarcia/js-utils';

export function LogLineContent({ content }: { content: any }) {
  const parsedValue = tryParseJson(content);

  if (isRecord(parsedValue) || Array.isArray(parsedValue)) {
    return (
      <pre className="w-full rounded-md bg-surface/30 p-2 text-foreground" aria-label="Structured output">
        {JSON.stringify(parsedValue, null, 2)}
      </pre>
    );
  }

  return <pre className="w-full whitespace-pre-wrap" aria-label="Output">{content}</pre>;
}
