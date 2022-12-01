import { useEffect, useLayoutEffect, useRef } from 'react';
import { throttle } from '../async';
import { SlideType } from '../types';
import { AnimatedList } from '../ui/AnimatedList';
import { useListener } from './useListener';
import { useScrollReducer } from './useScrollReducer';

export const useScroll = (
  animatedList: AnimatedList | null,
  type: SlideType,
  slideTime: number,
  intervalTime: number,
) => {
  const [, dispatch] = useScrollReducer(animatedList, type);
  const ref = useRef<NodeJS.Timer>();

  useLayoutEffect(() => {
    if (!animatedList) {
      return;
    }
    if (type === 'finite') {
      animatedList.disableBack();
    }
    if (animatedList.length <= animatedList.shownItemsCount) {
      animatedList.disableForward();
    }
    if (type === 'auto') {
      if (ref.current) return;
      ref.current = setInterval(() => throttle(() => dispatch('forward'), slideTime), slideTime);
    }
  }, [animatedList, type, slideTime, dispatch]);

  useEffect(() => {
    if ((type === 'auto' || type === 'auto-reverse') && !ref.current) {
      ref.current = setInterval(() => throttle(() => dispatch('forward'), slideTime), intervalTime);
    }
    return () => ref.current && clearInterval(ref.current);
  }, [type, slideTime, intervalTime, dispatch]);

  useListener(
    {
      type: 'resize',
      fn: () => {
        animatedList?.slide(0);
        animatedList?.updateItemsWidth();
      },
      disabled: !animatedList,
      runOnInit: true,
    },
    [animatedList],
  );

  return {
    forward: () => throttle(() => dispatch('forward'), slideTime),
    back: () => throttle(() => dispatch('back'), slideTime),
  };
};
