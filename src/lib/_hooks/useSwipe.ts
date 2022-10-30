import { useRef } from 'react';
import { AnimatedList } from './AnimatedList';
import { useListener } from './useListener';

export const useSwipe = (animatedList: AnimatedList | null, forward: VoidFunction, back: VoidFunction) => {
  const screenX = useRef<number>();

  useListener(
    {
      type: ['mousedown', 'touchstart'],
      fn: (event: MouseEvent | TouchEvent) => {
        screenX.current = event instanceof MouseEvent ? event.screenX : event.touches[0]?.clientX;
      },
      element: animatedList?.element,
      disabled: !animatedList,
    },
    [animatedList],
  );
  useListener(
    {
      type: ['mouseup', 'touchend'],
      fn: (event: MouseEvent | TouchEvent) => {
        const lastScreenX = event instanceof MouseEvent ? event.screenX : event.changedTouches[0]?.clientX;
        if (screenX.current === null || screenX.current === undefined || lastScreenX === undefined) return;

        const difference = screenX.current - lastScreenX;
        difference > 0 && forward();
        difference < 0 && back();
        screenX.current = undefined;
      },
      element: animatedList?.element,
      disabled: !animatedList,
    },
    [animatedList],
  );
};
