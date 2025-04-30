import { useEffect, useRef } from "react";

type DebounceFunction<T extends (...args: any[]) => unknown> = (
  ...args: Parameters<T>
) => unknown;

const useDebounce = <T extends (...args: any[]) => unknown>(
  callback: T,
  delay: number
): DebounceFunction<T> => {
  const callbackRef = useRef<T>(callback);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // so that we always have the latest value of callback function in our ref
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callbackRef.current(...args);
    }, delay);
  };
};

export default useDebounce;
