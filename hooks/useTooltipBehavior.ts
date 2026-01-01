import { useState, useEffect, useRef } from 'react';

interface UseTooltipBehaviorOptions {
  /**
   * Whether to manually control the tooltip state.
   * If true, the tooltip will only respond to click/tap on touch devices.
   * If false or undefined, the tooltip will use default hover behavior.
   */
  controlledMode?: boolean;
}

interface UseTooltipBehaviorReturn {
  /**
   * Whether the tooltip is currently opened
   */
  opened: boolean;
  /**
   * Whether the current device supports touch input
   */
  isTouchDevice: boolean;
  /**
   * Ref to attach to the trigger element for click-outside detection
   */
  triggerRef: React.RefObject<HTMLElement | null>;
  /**
   * Handler for click events on the trigger element
   */
  handleClick: (e: React.MouseEvent) => void;
  /**
   * Handler for mouse enter events (desktop only)
   */
  handleMouseEnter: () => void;
  /**
   * Handler for mouse leave events (desktop only)
   */
  handleMouseLeave: () => void;
  /**
   * The value to pass to Tooltip's `opened` prop
   */
  tooltipOpened: boolean | undefined;
}

/**
 * Custom hook to manage tooltip behavior for both desktop (hover) and mobile (click) devices.
 * 
 * Features:
 * - Automatically detects touch devices
 * - Provides different interaction modes for desktop (hover) and mobile (click)
 * - Handles click-outside to close tooltip on mobile
 * - Returns all necessary handlers and state for tooltip implementation
 * 
 * @example
 * ```tsx
 * const { triggerRef, handleClick, handleMouseEnter, handleMouseLeave, tooltipOpened } = useTooltipBehavior();
 * 
 * return (
 *   <Tooltip opened={tooltipOpened}>
 *     <button
 *       ref={triggerRef}
 *       onClick={handleClick}
 *       onMouseEnter={handleMouseEnter}
 *       onMouseLeave={handleMouseLeave}
 *     >
 *       Info
 *     </button>
 *   </Tooltip>
 * );
 * ```
 */
export function useTooltipBehavior(options: UseTooltipBehaviorOptions = {}): UseTooltipBehaviorReturn {
  const { controlledMode = true } = options;
  const [opened, setOpened] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  
  // Detect if device supports touch (only on client-side)
  const isTouchDevice = typeof window !== 'undefined' && 
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  // Close tooltip when clicking outside (only for touch devices in controlled mode)
  useEffect(() => {
    if (!controlledMode || !isTouchDevice || !opened) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setOpened(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [opened, isTouchDevice, controlledMode]);

  const handleClick = (e: React.MouseEvent) => {
    if (isTouchDevice && controlledMode) {
      e.preventDefault();
      e.stopPropagation();
      setOpened((o) => !o);
    }
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice && controlledMode) {
      setOpened(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice && controlledMode) {
      setOpened(false);
    }
  };

  // For touch devices, control the state manually. For desktop, let Mantine handle it (undefined).
  const tooltipOpened = controlledMode && isTouchDevice ? opened : undefined;

  return {
    opened,
    isTouchDevice,
    triggerRef,
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
    tooltipOpened,
  };
}
