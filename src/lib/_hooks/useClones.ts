import { useCallback, useRef, useState } from 'react';

export const useItemsShifter = (items: JSX.Element[]) => {
  const [shiftedItems, setShiftedItems] = useState(items.map((item, index) => ({ ...item, index })));
  const cachedItems = useRef<typeof shiftedItems>();

  return {
    shiftedItems,
    forward: useCallback((count = 1) => {
      setShiftedItems(list => {
        cachedItems.current = list.slice(0, count);
        return [...list.slice(count)];
      });
      setTimeout(() => setShiftedItems(list => [...list.slice(count), ...(cachedItems.current ?? [])]), 600);
    }, []),
    back: useCallback(
      (count = 1) =>
        setShiftedItems(list => [...list.slice(list.length - count), ...list.slice(0, list.length - count)]),
      [],
    ),
  };
};
