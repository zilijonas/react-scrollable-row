import { useMemo } from 'react';
import { throttle } from './animations';
import { Order } from './Order';
import { ScrollType, useScrollReducer } from './reducer';

export const useScroll = (itemsPerDisplay: number, listEl: HTMLDivElement | null, type: ScrollType) => {
  const order = useMemo(() => new Order(listEl, itemsPerDisplay), [listEl, itemsPerDisplay]);
  const [, dispatch] = useScrollReducer(itemsPerDisplay, listEl, order, type);

  return {
    forward: () => throttle(() => dispatch('forward')),
    back: () => throttle(() => dispatch('back')),
  };
};
