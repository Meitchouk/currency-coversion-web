import { useState, useEffect } from 'react';

/**
 * Custom hook to handle component mount state for animations
 */
export function useMounted(delay = 0): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return mounted;
}
