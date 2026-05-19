import type { Output, OutputTestContent } from '../types';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/collapsible';
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

  const className = isPassed ? 'border-success' : 'border-danger';
  const testTitle = isPassed ? `${title} PASSED` : `${title} FAILED`;

  if (!received) {
    return (
      <LogLineWrapper
        callSite={callSite}
        className={className}
        title={testTitle}
      >
        <span className="font-bold text-muted">Expected:</span>
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
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="text-muted">
          <span className="font-bold text-muted">Received:</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <LogLineContent content={received} />
        </CollapsibleContent>
      </Collapsible>

      <Collapsible defaultOpen>
        <CollapsibleTrigger className="text-muted">
          <span className="font-bold text-muted">Expected:</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <LogLineContent content={expected} />
        </CollapsibleContent>
      </Collapsible>

    </LogLineWrapper>
  );
}
