import { useLayoutEffect } from 'react';
import { ScrollableElement } from '../elements';

interface Props {
  listEl: ScrollableElement | null;
  fittedItemsCount: number;
  looped: boolean;
}

export const useItemsLoop = ({ listEl, fittedItemsCount, looped }: Props) => {
  useLayoutEffect(() => {
    if (!listEl) return;

    const createElementsForLoop = () => listEl.cloneElements(fittedItemsCount);

    looped && createElementsForLoop();
    looped && listEl.addScrollListener(createElementsForLoop);

    return () => {
      listEl.clearScrollListener(createElementsForLoop);
    };
  }, [listEl, looped, fittedItemsCount]);
};
