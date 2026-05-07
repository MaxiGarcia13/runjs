import type { TooltipCoordinates, TooltipPosition } from './types';
import { useEffect, useState } from 'react';

const TOOLTIP_GAP = 8;

interface UseTooltipPositionOptions {
  isOpen: boolean;
  position: TooltipPosition;
  triggerElement: HTMLDivElement | null;
  tooltipElement: HTMLSpanElement | null;
}

export function useTooltipPosition({
  isOpen,
  position,
  triggerElement,
  tooltipElement,
}: UseTooltipPositionOptions) {
  const [coords, setCoords] = useState<TooltipCoordinates | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const updatePosition = () => {
      if (!triggerElement || !tooltipElement) {
        return;
      }

      const triggerRect = triggerElement.getBoundingClientRect();
      const tooltipRect = tooltipElement.getBoundingClientRect();

      if (position === 'top') {
        setCoords({
          top: triggerRect.top - tooltipRect.height - TOOLTIP_GAP,
          left: triggerRect.left + (triggerRect.width - tooltipRect.width) / 2,
        });
        return;
      }

      if (position === 'bottom') {
        setCoords({
          top: triggerRect.bottom + TOOLTIP_GAP,
          left: triggerRect.left + (triggerRect.width - tooltipRect.width) / 2,
        });
        return;
      }

      if (position === 'left') {
        setCoords({
          top: triggerRect.top + (triggerRect.height - tooltipRect.height) / 2,
          left: triggerRect.left - tooltipRect.width - TOOLTIP_GAP,
        });
        return;
      }

      setCoords({
        top: triggerRect.top + (triggerRect.height - tooltipRect.height) / 2,
        left: triggerRect.right + TOOLTIP_GAP,
      });
    };

    const animationFrameId = window.requestAnimationFrame(updatePosition);
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen, position, triggerElement, tooltipElement]);

  return coords;
}
