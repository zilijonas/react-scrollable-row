import { useLayoutEffect } from 'react';

export const useListener = <K extends keyof WindowEventMap, L extends HTMLElement>(
  type: K | K[],
  fn: Function | boolean | null,
  deps?: React.DependencyList,
  el?: L | null,
) =>
  useLayoutEffect(() => {
    if (!fn || typeof fn !== 'function') return;
    fn();
    typeof type === 'string'
      ? (el || window).addEventListener(type, fn as VoidFunction, false)
      : type.forEach(t => (el || window).addEventListener(t, fn as VoidFunction, false));
    return () =>
      typeof type === 'string'
        ? (el || window).removeEventListener(type, fn as VoidFunction, false)
        : type.forEach(t => (el || window).removeEventListener(t, fn as VoidFunction, false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, ...(deps || [])]);
