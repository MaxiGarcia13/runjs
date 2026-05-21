import type { CollapsibleProps } from './types';
import { useId, useState } from 'react';
import { CollapsibleContext } from './collapsible-context';

export function Collapsible({
  children,
  className,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  ...props
}: CollapsibleProps) {
  const contentId = useId();
  const triggerId = useId();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;

  const toggle = () => {
    const next = !open;

    if (!isControlled) {
      setUncontrolledOpen(next);
    }

    onOpenChange?.(next);
  };

  return (
    <CollapsibleContext value={{ open, toggle, contentId, triggerId }}>
      <div className={className} {...props}>
        {children}
      </div>
    </CollapsibleContext>
  );
}
