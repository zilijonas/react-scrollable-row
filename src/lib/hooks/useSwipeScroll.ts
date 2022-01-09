import { useLayoutEffect, useRef } from 'react';
import { ScrollableElement } from '../elements';

export type ItemsPerScrollWidthConfig = { [pixels: number]: number } & { max: number };

interface Props {
  listEl: ScrollableElement | null;
  marginBetweenItems: number;
  fittedItemsCount: number;
  swipeable: boolean;
}

export const useSwipeScroll = ({ listEl, marginBetweenItems, fittedItemsCount, swipeable }: Props) => {
  const screenX = useRef<number>();

  useLayoutEffect(() => {
    if (!listEl) return;

    const setInitialMousePosition = (event: MouseEvent | TouchEvent) =>
      (screenX.current = event instanceof MouseEvent ? event.screenX : event.touches[0]?.clientX);
    const determineSwipeDirection = (event: MouseEvent | TouchEvent) => {
      const lastScreenX = event instanceof MouseEvent ? event.screenX : event.changedTouches[0]?.clientX;
      if (screenX.current === null || screenX.current === undefined || lastScreenX === undefined) {
        return;
      }

      const difference = screenX.current - lastScreenX;

      if (difference > 0) {
        listEl.scrollForward(marginBetweenItems, fittedItemsCount);
      }
      if (difference < 0) {
        listEl.scrollBack(marginBetweenItems);
      }

      screenX.current = undefined;
    };

    swipeable && listEl.addSwipeStartListener(setInitialMousePosition);
    swipeable && listEl.addSwipeEndListener(determineSwipeDirection);

    return () => {
      listEl.clearSwipeStartListener(setInitialMousePosition);
      listEl.clearSwipeEndListener(determineSwipeDirection);
    };
  }, [swipeable, fittedItemsCount, listEl, marginBetweenItems]);
};
