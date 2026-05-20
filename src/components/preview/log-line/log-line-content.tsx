import { isRecord, tryParseJson } from '@maxigarcia/js-utils';

export function LogLineContent({ content }: { content: any }) {
  const parsedValue = tryParseJson(content);

  if (isRecord(parsedValue) || Array.isArray(parsedValue)) {
    return (
      <pre
        role="region"
        className="w-full rounded-md bg-surface/30 p-2 wrap-break-word whitespace-pre-wrap text-foreground"
        aria-label="Structured output"
      >
        {JSON.stringify(parsedValue, null, 2)}
      </pre>
    );
  }

  return (
    <pre
      role="region"
      className="w-full wrap-break-word whitespace-pre-wrap"
      aria-label="Output"
    >
      {content}
    </pre>
  );
}
