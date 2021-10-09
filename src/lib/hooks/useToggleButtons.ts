import { useLayoutEffect } from 'react';
import { ContainerElement, ScrollableElement } from '../elements';

interface Props {
  listEl: ScrollableElement | null;
  containerEl: ContainerElement | null;
  fittedItemsCount: number;
}

export const useToggleButtons = ({ listEl, containerEl, fittedItemsCount }: Props) => {
  useLayoutEffect(() => {
    if (!containerEl || !listEl) return;

    const toggleButtons = () => {
      const allItemsFit = listEl.items.length <= fittedItemsCount;
      const scrollStartReached = listEl.scrollPosition <= 0;
      const scrollEndReached = listEl.scrollPosition >= listEl.scrollWidth - listEl.stepSize;
      containerEl.toggleButtons(allItemsFit, scrollStartReached, scrollEndReached);
    };

    toggleButtons();
    window.addEventListener('resize', toggleButtons);
    listEl.addScrollListener(toggleButtons);

    return () => {
      window.removeEventListener('resize', toggleButtons);
      listEl.clearScrollListener(toggleButtons);
    };
  }, [containerEl, fittedItemsCount, listEl]);
};
