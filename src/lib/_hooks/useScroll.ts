import { useEffect, useMemo } from 'react';
import { resetAsyncTimeouts, throttle } from './async-utils';
import { Order } from './Order';
import { ScrollType, useScrollReducer } from './reducer';

export const useScroll = (shownItemsCount: number, listEl: HTMLDivElement | null, type: ScrollType) => {
  const order = useMemo(() => new Order(listEl, shownItemsCount), [listEl, shownItemsCount]);
  const [, dispatch] = useScrollReducer(shownItemsCount, listEl, order, type);

  useEffect(() => () => resetAsyncTimeouts(), []);

  return {
    forward: () => throttle(() => dispatch('forward')),
    back: () => throttle(() => dispatch('back')),
  };
};
