import { useLayoutEffect } from 'react';

export const useListener = <K extends keyof WindowEventMap, L extends HTMLElement>(
  type: K | K[],
  fn: Function,
  deps?: React.DependencyList,
  element?: L | null,
) =>
  useLayoutEffect(() => {
    try {
      fn();
      // eslint-disable-next-line no-empty
    } catch {}
    typeof type === 'string'
      ? (element || window).addEventListener(type, fn as VoidFunction, false)
      : type.forEach(t => (element || window).addEventListener(t, fn as VoidFunction, false));
    return () =>
      typeof type === 'string'
        ? (element || window).removeEventListener(type, fn as VoidFunction, false)
        : type.forEach(t => (element || window).removeEventListener(t, fn as VoidFunction, false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, ...(deps || [])]);
