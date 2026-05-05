import { useState } from 'react';
import { cn } from '@/utils/classes';

interface ResizablePanelProps {
  className?: string;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  offset?: number;
  direction?: 'horizontal' | 'vertical';
}

export function ResizablePanel({
  className,
  leftContent,
  rightContent,
  direction = 'horizontal',
  offset = 100,
}: ResizablePanelProps) {
  const [leftWidth, setLeftWidth] = useState(undefined);
  const [leftHeight, setLeftHeight] = useState(undefined);

  const { mainClassName, containerClassName, cursorClassName, dividerClassName } = getClassNames({ className, direction });

  function onResize(event: MouseEvent) {
    if (direction === 'horizontal') {
      const isMaxWidth = event.clientX > (document.body.clientWidth - offset);
      const isMinWidth = event.clientX < offset;

      if (isMaxWidth || isMinWidth)
        return;

      setLeftWidth(event.clientX);
    } else {
      const isMaxHeight = event.clientY > (document.body.clientHeight - offset);
      const isMinHeight = event.clientY < offset;

      if (isMaxHeight || isMinHeight)
        return;

      setLeftHeight(event.clientY);
    }
  }

  function onResizeEnd() {
    document.body.classList.remove(cursorClassName);

    document.removeEventListener('mousemove', onResize);
    document.removeEventListener('mouseup', onResizeEnd);
  }

  function handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    document.body.classList.add(cursorClassName);

    document.addEventListener('mousemove', onResize);
    document.addEventListener('mouseup', onResizeEnd);

    event.stopPropagation();
  }

  return (
    <section className={mainClassName}>
      <div
        className={containerClassName}
        style={{ width: leftWidth, height: leftHeight }}
      >
        {leftContent}
      </div>
      <div
        className={cn(dividerClassName, 'bg-gray-700', cursorClassName)}
        onMouseDown={handleMouseDown}
      >
      </div>
      <div
        className={containerClassName}
        style={{ width: `calc(100% - ${leftWidth}px)`, height: `calc(100% - ${leftHeight}px)` }}
      >
        {rightContent}
      </div>
    </section>
  );
}

function getClassNames({ className, direction }: Partial<ResizablePanelProps>) {
  if (direction === 'horizontal') {
    return {
      mainClassName: cn(className, 'flex flex-row'),
      containerClassName: 'w-1/2',
      cursorClassName: 'cursor-col-resize',
      dividerClassName: 'w-px',
    };
  }

  return {
    mainClassName: cn(className, 'flex flex-col'),
    containerClassName: 'h-1/2',
    cursorClassName: 'cursor-row-resize',
    dividerClassName: 'h-px',
  };
}
