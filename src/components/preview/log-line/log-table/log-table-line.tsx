import type { Output } from '../../types';
import { LogLineWrapper } from '../log-line-wrapper';
import { LogTable } from './log-table';
import { buildTable } from './table.utils';

export function LogTableLine({
  content,
  title,
  callSite,
}: Omit<Output, 'content'> & { content: string; title: string }) {
  const { columns, rows } = buildTable(content);

  return (
    <LogLineWrapper
      callSite={callSite}
      title={title}
      className="border-surface"
    >
      <LogTable columns={columns} rows={rows} />
    </LogLineWrapper>
  );
}
