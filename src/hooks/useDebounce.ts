import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce a rapidly changing value.
 * Useful for delaying search queries to prevent performance issues.
 * * @param value - The value to be debounced.
 * @param delay - The delay in milliseconds (e.g., 300).
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up a timer to update the value after the specified delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer if the value changes before the delay has passed
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}