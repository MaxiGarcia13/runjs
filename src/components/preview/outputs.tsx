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
    <div role="list" aria-label="Console messages" className="flex flex-col gap-2">
      {outputs.map((item) => (
        <LogLine key={item.id} id={item.id} {...item} />
      ))}
    </div>
  );
}
