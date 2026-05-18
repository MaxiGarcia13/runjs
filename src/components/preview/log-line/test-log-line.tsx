import type { Output, OutputTestContent } from '../types';
import { LogLineContent } from './log-line-content';
import { LogLineWrapper } from './log-line-wrapper';

export function TestLogLine({
  content,
  title,
  callSite,
}: Omit<Output, 'content'> & {
  title: string;
  content?: OutputTestContent;
}) {
  const { expected, received, isPassed } = content;

  const className = isPassed ? 'text-green-300 bg-green-900/30' : 'text-red-400 bg-red-900/30';
  const testTitle = isPassed ? `${title} PASSED` : `${title} FAILED`;

  if (!received) {
    return (
      <LogLineWrapper
        callSite={callSite}
        className={className}
        title={testTitle}
      >
        <span>Expected:</span>
        <LogLineContent content={expected} />
      </LogLineWrapper>
    );
  }

  return (
    <LogLineWrapper
      callSite={callSite}
      className={className}
      title={testTitle}
    >
      <span>Expected:</span>
      <LogLineContent content={expected} />
      <span>Received:</span>
      <LogLineContent content={received} />
    </LogLineWrapper>
  );
}
