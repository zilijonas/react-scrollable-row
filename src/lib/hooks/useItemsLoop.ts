import { useLayoutEffect } from 'react';
import { ScrollableElement } from '../elements';

interface Props {
  listEl: ScrollableElement | null;
  looped: boolean;
}

export const useItemsLoop = ({ listEl, looped }: Props) => {
  useLayoutEffect(() => {
    if (!listEl) return;

    const createElementsForLoop = () => listEl.cloneElements();

    looped && listEl.addScrollListener(createElementsForLoop);

    return () => {
      listEl.clearScrollListener(createElementsForLoop);
    };
  }, [listEl, looped]);
};
