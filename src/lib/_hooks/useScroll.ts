import { useEffect } from 'react';
import { resetAnimationTimeouts, throttle } from './animations';
import { ListType, useScrollReducer } from './reducer';

export const useScroll = (listEl: HTMLDivElement | null, itemsPerDisplay: number, type: ListType) => {
  const [, dispatch] = useScrollReducer(itemsPerDisplay, listEl, type);

  useEffect(() => () => resetAnimationTimeouts(), []);

  return {
    forward: () => throttle(() => dispatch('forward')),
    back: () => throttle(() => dispatch('back')),
  };
};
