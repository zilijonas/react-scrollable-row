import { useEffect, useMemo } from 'react';
import { AnimatedList } from './AnimatedList';
import { resetAsyncTimeouts, throttle } from './async-utils';
import { ScrollType, useScrollReducer } from './reducer';

export const useScroll = (shownItemsCount: number, listEl: HTMLDivElement | null, type: ScrollType) => {
  const animatedList = useMemo(
    () => (listEl && shownItemsCount ? new AnimatedList(listEl, shownItemsCount) : null),
    [listEl, shownItemsCount],
  );
  const [, dispatch] = useScrollReducer(animatedList, type);

  useEffect(() => () => resetAsyncTimeouts(), []);

  return {
    forward: () => throttle(() => dispatch('forward')),
    back: () => throttle(() => dispatch('back')),
  };
};
