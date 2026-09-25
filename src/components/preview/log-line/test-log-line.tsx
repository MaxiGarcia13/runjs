import type { Output, OutputTestContent } from '../types';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/collapsible';
import { LogLineContent } from './log-line-content';
import { LogLineIcon } from './log-line-icon';
import { LogLineWrapper } from './log-line-wrapper';

export function TestLogLine({
  content,
  title,
  callSite,
}: Omit<Output, 'content'> & {
  title: string;
  content?: OutputTestContent;
}) {
  const { expected, received, isPassed } = content ?? {};

  const testTitle = isPassed ? `${title} PASSED` : `${title} FAILED`;

  if (!received) {
    return (
      <LogLineWrapper
        callSite={callSite}
        title={testTitle}
        icon={<LogLineIcon type="test-log" isPassed={isPassed} />}
      >
        <span className="font-bold text-muted">Expected:</span>
        <LogLineContent content={expected} />
      </LogLineWrapper>
    );
  }

  return (
    <LogLineWrapper
      callSite={callSite}
      title={testTitle}
      icon={<LogLineIcon type="test-log" isPassed={isPassed} />}
    >
      <Collapsible role="group" aria-label="Received output" defaultOpen>
        <CollapsibleTrigger className="text-muted" aria-label="Toggle received output">
          <span className="font-bold text-muted">Received:</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <LogLineContent content={received} />
        </CollapsibleContent>
      </Collapsible>

      <Collapsible role="group" aria-label="Expected output" defaultOpen>
        <CollapsibleTrigger className="text-muted" aria-label="Toggle expected output">
          <span className="font-bold text-muted">Expected:</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <LogLineContent content={expected} />
        </CollapsibleContent>
      </Collapsible>

    </LogLineWrapper>
  );
}
