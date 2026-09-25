import type { Output } from './types';
import { LogLine } from './log-line';

interface OutputsProps {
  outputs: Output[];
}

export function Outputs({ outputs }: OutputsProps) {
  if (outputs.length === 0) {
    return null;
  }

  return (
    <div role="list" aria-label="Console messages" className="flex flex-col gap-0.5 px-2 py-1">
      {outputs.map((item) => (
        <LogLine key={item.id} {...item} />
      ))}
    </div>
  );
}
