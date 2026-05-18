import { isRecord, tryParseJson } from '@maxigarcia/js-utils';

export function LogLineContent({ content }: { content: any }) {
  const parsedValue = tryParseJson(content);

  if (isRecord(parsedValue) || Array.isArray(parsedValue)) {
    return (
      <pre className="w-full rounded-md bg-gray-800/30 p-2">
        {JSON.stringify(parsedValue, null, 2)}
      </pre>
    );
  }

  return <pre className="w-full whitespace-pre-wrap">{content}</pre>;
}
