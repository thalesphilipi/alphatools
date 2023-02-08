import { useCallback, useEffect, useState } from "react";

export default function useDebounce(value: any, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const [isDebouncing, setIsDebouncing] = useState(false);
    useEffect(
      () => {
        setIsDebouncing(true);
        const handler = setTimeout(() => {
          setDebouncedValue(value);
          setIsDebouncing(false);
        }, delay);
        return () => {
          clearTimeout(handler);
        };
      },
      [value, delay]
    );

    const resetDebouncedValue = useCallback(() => setDebouncedValue(value), []);
    return [debouncedValue, isDebouncing, resetDebouncedValue];
  }