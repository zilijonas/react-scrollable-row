import { useLayoutEffect } from 'react';
import { AnimatedList } from './AnimatedList';
import { throttle } from './async-utils';
import { ScrollType, useScrollReducer } from './reducer';
import { useListener } from './useListener';

export const useScroll = (animatedList: AnimatedList | null, type: ScrollType) => {
  const [, dispatch] = useScrollReducer(animatedList, type);

  useLayoutEffect(() => {
    if (!animatedList) {
      return;
    }
    if (type === 'finite') {
      animatedList.disableBack();
    }
    if (animatedList.itemsCount <= animatedList.shownItemsCount) {
      animatedList.disableForward();
    }
  }, [animatedList, type]);

  useListener({ type: 'resize', fn: () => animatedList?.slide(0) }, [animatedList]);

  return {
    forward: () => throttle(() => dispatch('forward')),
    back: () => throttle(() => dispatch('back')),
  };
};
