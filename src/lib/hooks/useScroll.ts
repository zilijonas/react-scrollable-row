import { useLayoutEffect } from 'react';
import { throttle } from '../async';
import { AnimatedList } from '../ui/AnimatedList';
import { useListener } from './useListener';
import { ScrollType, useScrollReducer } from './useScrollReducer';

export const useScroll = (animatedList: AnimatedList | null, type: ScrollType) => {
  const [, dispatch] = useScrollReducer(animatedList, type);

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
  }, [animatedList, type]);

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
    forward: () => throttle(() => dispatch('forward')),
    back: () => throttle(() => dispatch('back')),
  };
};
