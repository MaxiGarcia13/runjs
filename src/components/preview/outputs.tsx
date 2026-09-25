import type { Output } from './types';
import { LogLine } from './log-line';
import { OUTPUT_LINE_HEIGHT_PX, withOutputGaps } from './utils/with-output-gaps';

interface OutputsProps {
  outputs: Output[];
}

export function Outputs({ outputs }: OutputsProps) {
  if (outputs.length === 0) {
    return null;
  }

  const items = withOutputGaps(outputs);

  return (
    <div role="list" aria-label="Console messages" className="flex flex-col gap-0.5 px-2 py-1">
      {items.map((item) => {
        if (item.kind === 'gap') {
          return (
            <div
              key={item.id}
              aria-hidden
              style={{ height: item.lines * OUTPUT_LINE_HEIGHT_PX }}
            />
          );
        }

        return <LogLine key={item.output.id} {...item.output} />;
      })}
    </div>
  );
}
