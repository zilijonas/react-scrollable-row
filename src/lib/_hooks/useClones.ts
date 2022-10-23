import { useCallback, useState } from 'react';

export const useItemsShifter = (items: JSX.Element[]) => {
  const [shiftedItems, setShiftedItems] = useState(items.map((item, index) => ({ ...item, index })));
  // const cachedItems = useRef<typeof shiftedItems>();

  // useEffect(() => console.log(shiftedItems.map(i => i.index)), [shiftedItems]);

  return {
    shiftedItems,
    back: useCallback((count = 1) => {
      setShiftedItems(list => {
        const items = list.slice(0, list.length - count);
        const lastItems = list
          .slice(list.length - count)
          .map((item, index) => ({ ...item, index: items[0].index - count + index }));
        return [...lastItems, ...items];
      });
      // setShiftedItems(list => list.map(item => ({ ...item, index: item.index - count })));
      // setShiftedItems(list => {
      //   cachedItems.current = list.slice(0, count);
      //   return [...list.slice(count)];
      // });
      // setTimeout(() => setShiftedItems(list => [...list.slice(count), ...(cachedItems.current ?? [])]), 600);
    }, []),
    forward: useCallback(
      (count = 1) =>
        setShiftedItems(list => {
          const items = list.slice(count);
          const firstItems = list
            .slice(0, count)
            .map((item, index) => ({ ...item, index: items[0].index + count - index }));
          return [...items, ...firstItems].map(item => ({ ...item, index: item.index + count }));
        }),
      // setShiftedItems(list => [...list.slice(list.length - count), ...list.slice(0, list.length - count)]),
      [],
    ),
  };
};
