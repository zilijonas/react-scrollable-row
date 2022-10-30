import { useLayoutEffect } from 'react';

type ListenerParams<K, L> = {
  type: K | K[];
  element?: L | null;
  disabled?: boolean;
  runOnInit?: boolean;
  fn: EventListenerOrEventListenerObject;
};

export const useListener = <K extends keyof WindowEventMap, L extends HTMLElement>(
  { type, element, disabled, runOnInit, fn }: ListenerParams<K, L>,
  deps?: React.DependencyList,
) =>
  useLayoutEffect(() => {
    if (disabled) return;
    if (runOnInit && typeof fn === 'function') {
      (fn as VoidFunction)();
    }
    typeof type === 'string'
      ? (element || window).addEventListener(type, fn, false)
      : type.forEach(t => (element || window).addEventListener(t, fn, false));
    return () =>
      typeof type === 'string'
        ? (element || window).removeEventListener(type, fn, false)
        : type.forEach(t => (element || window).removeEventListener(t, fn, false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, ...(deps || [])]);
